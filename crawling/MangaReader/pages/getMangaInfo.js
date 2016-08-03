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
    ipc.send('log-error', 'getMangaInfo, ' + mwId + ', ' + firstRun + ', from ' + startFrom + ', to ' + endBy);
    
    var SELECTORS = {
        Name : "#mangaproperties > table > tbody > tr:nth-child(1) > td:nth-child(2) > h2",
        AlternateName : "#mangaproperties > table > tbody > tr:nth-child(2) > td:nth-child(2)",
        YearOfRelease  : "#mangaproperties > table > tbody > tr:nth-child(3) > td:nth-child(2)",
        Status : "#mangaproperties > table > tbody > tr:nth-child(4) > td:nth-child(2)",
        Author : "#mangaproperties > table > tbody > tr:nth-child(5) > td:nth-child(2)",
        Artist : "#mangaproperties > table > tbody > tr:nth-child(6) > td:nth-child(2)",
        Genres : "#mangaproperties > table > tbody > tr:nth-child(8) > td:nth-child(2) > a > span",
        Description : "#readmangasum > p",
        Image : "#mangaimg > img",
        Chapters: "#chapterlist > table > tbody > tr",

    };

    try
    {
    var start = remote.getGlobal('getMangaInfoIterators')[mwId - 1].start;
    var next = remote.getGlobal('getMangaInfoIterators')[mwId - 1].next;
    var defaultURL = "http://www.mangareader.net/popular";  

    var jsonPath = "../crawled/mangaList.json";
    var mangaList = readJsonFile(jsonPath);

    if(start > mangaList.length || start > endBy)    
        remote.getCurrentWindow().close();

    if(firstRun)
    {
        start = startFrom;
        next = startFrom;
    }

    if(start == next)
    {
        var link = mangaList[start].url;
        remote.getGlobal('getMangaInfoIterators')[mwId - 1].start = start;
        remote.getGlobal('getMangaInfoIterators')[mwId - 1].next = start + 1;
        location.assign(link);
    }
    else
    {
        var genres = [];
        var chapters = [];
        $(SELECTORS.Genres).each(function(j, el) {
                var innerHtml = $(el).attr('innerHTML');
                genres.push(innerHtml); 
        });

        $(SELECTORS.Chapters).each(function(j, el) {
             if(el.children[0].nodeName == "TD")
             {
                var a = el.children[0].children[1];                
                var released = el.children[1].innerHTML;
                var number = a.innerHTML.split(' ')[a.innerHTML.split(' ').length - 1];
                var link = a.href;
                var chapter = {
                                number : number,
                                url : link,
                                released : released
                            };       
                chapters.push(chapter); 
             }
        });
        var mangaInfo = {
            Name : sanitize($(SELECTORS.Name).attr('innerHTML'), ' '),
            AlternateName : $(SELECTORS.AlternateName).attr('innerHTML'),
            YearOfRelease  : $(SELECTORS.YearOfRelease).attr('innerHTML'),
            Status : $(SELECTORS.Status).attr('innerHTML'),
            Author : $(SELECTORS.Author).attr('innerHTML'),
            Artist : $(SELECTORS.Artist).attr('innerHTML'),
            Genres : genres,
            Description : $(SELECTORS.Description).attr('innerHTML'),
            Image :  $(SELECTORS.Image).attr('src'),
            Chapters: chapters,
        };

        remote.getGlobal('getMangaInfoIterators')[mwId - 1].start = next;
        remote.getGlobal('getMangaInfoIterators')[mwId - 1].next = next;
        ipc.send('save-mangaInfo', mangaInfo);

        var link = mangaList[next].url;
;
        remote.getGlobal('getMangaInfoIterators')[mwId - 1].start = next;
        remote.getGlobal('getMangaInfoIterators')[mwId - 1].next = next + 1;
        location.assign(link);
    } 
}
catch(e)
{
   ipc.send('log-error', "Exception : l" + e.stack + ", " + e); 
}

})(jQuery);