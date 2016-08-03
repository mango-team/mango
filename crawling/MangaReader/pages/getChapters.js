/*
getMangaInfo.js loops to create an array of manga information
*/

const fs = require('fs');
const ipc = require("electron").ipcRenderer;
const remote = require('electron').remote;

const mwId = remote.getCurrentWindow().id;
const firstRun = false; // DO NOT TOUCH : To be replaced by the firstRun parameter
const startFrom = -1; // DO NOT TOUCH : To be replaced by the startFrom parameter
const endBy = -1; // DO NOT TOUCH : To be replaced by the endBy parameter

function directoryExists(path, file) {
  try {
    if(file)
    {
        return !fs.statSync(path).isDirectory();
    }
    else
        return fs.statSync(path).isDirectory();
  }
  catch (err) {
    return false;
  }
}

function getFiles(dir){
    fileList = [];
 
    var files = fs.readdirSync(dir);
    for(var i in files){
        if (!files.hasOwnProperty(i)) continue;
        var name = dir+'/'+files[i];
        if (!fs.statSync(name).isDirectory()){
            fileList.push(name);
        }
    }
    return fileList;
}

function sanitize(input, replacement) {
    var illegalRe = /[\/\?<>\\:\*\|":]/g;
    var controlRe = /[\x00-\x1f\x80-\x9f]/g;
    var reservedRe = /^\.+$/;
    var windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
    var windowsTrailingRe = /[\. ]+$/;

    var sanitized = input
        .replace(illegalRe, replacement)
        .replace(controlRe, replacement)
        .replace(reservedRe, replacement)
        .replace(windowsReservedRe, replacement)
        .replace(windowsTrailingRe, replacement)
        .trim()
        .substring(0,255);
  return sanitized;
}

function readFile(path) {
    var fileContents = [];
        var file = "";
        file = fs.readFileSync(path).toString();
        file.split("\n").forEach(function(line) {              
            if(line != "")
            {
                fileContents.push(line);      
            }
        }, this);
        
    //Remove all empty lines
    // fs.writeFile("./pages/main-search/search-results.txt", fileContents.join("\n") + "\n", "utf8");

    return fileContents;
}

function readFiles() {
    var fileContents = [];
    for(var i = 0; i < arguments.length; i++) {
        var file = fs.readFileSync(arguments[i]);
        fileContents.push(file);
    }
    return fileContents;
}

function readJsonFile(path) {
    var json = readFiles(path);
    var jsonParsed = JSON.parse(json);
    return jsonParsed;
}

(function($) {
    
    ipc.send('log-error', 'getChapter ' + mwId + ', ' + firstRun + ', from ' + startFrom + ', to ' + endBy);

    var SELECTORS = {
        IsEnd : '#recom_info',
        Image : '#imgholder > a > img',
        Chapter : '#chapterMenu > option',
        NumberOfPage : '#selectpage',
        Next : '.next > a',
    };

    try
    {
    var start = remote.getGlobal('getChapterIterators')[mwId - 1].start;
    var next = remote.getGlobal('getChapterIterators')[mwId - 1].next;
    var current = remote.getGlobal('getChapterIterators')[mwId - 1].current;
    
    var defaultURL = "http://www.mangareader.net/popular";  

    var dirPath = "../crawled/mangas/";
    var fileList = getFiles(dirPath);

    if(firstRun)
    {
        start = 0;
        next = 0;
        current = startFrom;
    }  

    // Stop condition : reached the last mangaInfo crawled or last mangaInfo to crawl in this window
    if(current > fileList.length - 1 || current > endBy)    
        remote.getCurrentWindow().close();
    // If we reached the end of the current manga, go to the next!
    else if($(SELECTORS.IsEnd).length == 1)
    {        
        //debugger;
        remote.getGlobal('getChapterIterators')[mwId - 1].start = 0;
        remote.getGlobal('getChapterIterators')[mwId - 1].next = 0;
        remote.getGlobal('getChapterIterators')[mwId - 1].current = ++current;
        location.assign(defaultURL);
        this.stop();
    }    
    
    if(start == next)
    {
        var file = fileList[current];
        var manga = readJsonFile(file);
        var mangaName = sanitize(fileList[current].split('/')[fileList[current].split('/').length - 1].split('.json')[0], ' ');
        var chapterPath = "../crawled/mangas/" + mangaName + '/'
        var crawledChapterList;
        var chapter;

        if(directoryExists(chapterPath))
        {
            crawledChapterList = getFiles(chapterPath);
        }

        if(crawledChapterList != null && crawledChapterList.length > 0)
        {
            var chapterObject = readJsonFile(crawledChapterList[crawledChapterList.length - 1]);
            var chapterNumber = chapterObject.Chapter.split('Chapter ')[1].split(' ')[0];

            manga.Chapters.forEach(function(elem) {
                if(elem.number == chapterNumber)
                    chapter = elem.url;
            }, this);
            
        }
        else
         chapter = manga.Chapters[start].url;  

        remote.getGlobal('getChapterIterators')[mwId - 1].start = start;
        remote.getGlobal('getChapterIterators')[mwId - 1].next = start + 1;
        remote.getGlobal('getChapterIterators')[mwId - 1].current = current;
        location.assign(chapter);
    }
    else
    {
        var selectedChapter;
        var images = [];

        images.push($(SELECTORS.Image).attr('src'));

        $(SELECTORS.Chapter).each(function(j, el) {
             if(el.selected)
                selectedChapter = $(el).attr('innerHTML'); 
        });

        var chapterInfo = {
            Manga : sanitize(fileList[current].split('/')[fileList[current].split('/').length - 1].split('.json')[0], ' '),
            Chapter : sanitize(selectedChapter),
            NumberOfPage : $(SELECTORS.NumberOfPage).attr('innerHTML').split('of ')[1],
            Images : images,
        };

        remote.getGlobal('getChapterIterators')[mwId - 1].start = next;
        remote.getGlobal('getChapterIterators')[mwId - 1].next = next;
        remote.getGlobal('getChapterIterators')[mwId - 1].current = current;
        ipc.send('save-chapterInfo', chapterInfo);
        
        var nextPage = $(SELECTORS.Next)[0].href;
        remote.getGlobal('getChapterIterators')[mwId - 1].start = next;
        remote.getGlobal('getChapterIterators')[mwId - 1].next = next + 1;
        remote.getGlobal('getChapterIterators')[mwId - 1].current = current;
        location.assign(nextPage);
    }  

}
catch(e)
{
   ipc.send('log-error', "Exception : l" + e.stack + ", " + e);
   this.stop();
}

})(jQuery);