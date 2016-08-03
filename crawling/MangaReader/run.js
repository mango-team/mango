'use strict';

const fs = require('fs')
const path = require('path')
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain
let mainWindows
let firsts
let mangaInfoToCrawl = { nbOfPageToCrawl: 0 }
let chapterToCrawl = { nbOfPageToCrawl: 0 }
const nbOfPageToCrawlByWindow = 50
const nbOfWindow = 1
let savedPageToCrawl = []

// Globals
global.getMangaInfoIterators = []
global.getChapterIterators = []

const mwIdParameter = 'const mwId = -1;'

function getObjectInformation (obj) {
    return "Object type : " + typeof (obj) +
        ", Object name : " + obj.constructor.name +
        "\nObject properties : " + Object.getOwnPropertyNames(obj);
}

function readFiles () {
    var fileContents = [];
    for (var i = 0; i < arguments.length; i++) {
        var file = fs.readFileSync(arguments[i]);
        fileContents.push(file);
    }
    return fileContents;
}

var determinePage = function (mwId) {
    var js = readFiles('helpers.js', 'determine-page.js').join('');
    BrowserWindow.fromId(mwId).webContents.executeJavaScript(js);
}

function readJsonFile (path) {
    var json = readFiles(path);
    var jsonParsed = JSON.parse(json);
    return jsonParsed;
}

function ensureDirectoryExistence (filePath) {
    var dirname = path.dirname(filePath);
    if (directoryExists(dirname, false)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

function directoryExists (path, file) {
    try {
        if (file) {
            return !fs.statSync(path).isDirectory();
        }
        else
            return fs.statSync(path).isDirectory();
    }
    catch (err) {
        return false;
    }
}

function log (errorMessage, currentMW) {
    const FILE_PATH_LOG_ERROR = "../crawled/log-error-mangareader.txt";
    var dateNow = new Date();
    var errorTemplate = dateNow.toUTCString() + " : " + errorMessage;

    if (errorMessage.indexOf("START") < 0 && !errorMessage.indexOf("EXIT") < 0) {
        errorTemplate += " at " + BrowserWindow.fromId(currentMW).webContents.getURL() + ", mW : " + currentMW;
    }

    errorTemplate += "\n";

    ensureDirectoryExistence(FILE_PATH_LOG_ERROR);

    try {
        fs.appendFile(FILE_PATH_LOG_ERROR, errorTemplate, "utf8");
    }
    catch (e) {
        fs.writeFile(FILE_PATH_LOG_ERROR, errorTemplate, "utf8");
    }
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

function createWindow() {
    // Create the browser window.
    mainWindows = [];
    firsts = [];
    var urls = ['http://www.mangareader.net/alphabetical',
        'http://www.mangareader.net/junjou-drop',
        'http://www.mangareader.net/000000-ultra-black/1'];

    var urls2 = ['http://www.mangareader.net/alphabetical',
        'http://www.mangareader.net/junjou-drop',
        'http://www.mangareader.net/000000-ultra-black/1'];

    for (var i = 0; i < nbOfWindow; i++) {
        mainWindows.push(new BrowserWindow({ width: 1600, height: 1200 }));
        firsts.push(true);
        savedPageToCrawl.push(null);
        global.getMangaInfoIterators.push({ start: 0, next: 0 });
        global.getChapterIterators.push({ start: 0, next: 0, current: 0 });
    }

    //var urlToLad = "http://www.mangareader.net/alphabetical"; // GetManga
    //var urlToLad = "http://www.mangareader.net/junjou-drop" // GetMangaInfo
    var urlToLad = "http://www.mangareader.net/000000-ultra-black/1"; // GetChapters
    //var urlToLad = 'http://www.mangareader.net/hunter-x-hunter/359'; // GetChapters last chapter

    // Load 
    for (var i = 0; i < nbOfWindow; i++) {
        mainWindows[i].loadURL(urls[0]);

        log("START" + mainWindows[i].id);

        // Open the DevTools.
        mainWindows[i].webContents.on('dom-ready', function (event) {
            //log(getObjectInformation(event.sender.getOwnerBrowserWindow()));           
            log("Dom-ready " + event.sender.getOwnerBrowserWindow().id);
            event.sender.openDevTools();
            determinePage(event.sender.getOwnerBrowserWindow().id);
        });

        mainWindows[i].webContents.on('did-navigate-in-page', function (event) {
            //mainWindow.webContents.openDevTools();
            //console.log('did-navigate-in-page');
            //determinePage();
        });

        // Emitted when the window is closing.
        mainWindows[i].on('close', function (event) {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element. 
            log("EXIT " + event.sender.id);
            mainWindows[mainWindows.indexOf(event.sender)] = null;
        });
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

ipc.on('location-found', function (event, data) {
    var js = readFiles('helpers.js', 'Indexer.js', data.currentPage).join('');

    if (firsts[data.mwId - 1]) {
        replacement = 'const firstRun = ' + firsts[data.mwId - 1] + ';';
        js = js.replace('const firstRun = false;', replacement)

        switch (data.currentPage) {
            case 'pages/getChapters.js':
                var toSave = {
                    startFrom: chapterToCrawl.nbOfPageToCrawl,
                    endBy: chapterToCrawl.nbOfPageToCrawl + nbOfPageToCrawlByWindow
                };
                chapterToCrawl.nbOfPageToCrawl += nbOfPageToCrawlByWindow;
                savedPageToCrawl[data.mwId - 1] = toSave;
                break;
            case 'pages/getMangaInfo.js':
                var toSave = {
                    startFrom: mangaInfoToCrawl.nbOfPageToCrawl,
                    endBy: mangaInfoToCrawl.nbOfPageToCrawl + nbOfPageToCrawlByWindow
                };
                mangaInfoToCrawl.nbOfPageToCrawl += nbOfPageToCrawlByWindow;
                savedPageToCrawl[data.mwId - 1] = toSave;
                break;
        }
        if(data.currentPage == 'pages/getChapters.js' || data.currentPage == 'pages/getMangaInfo.js')
            console.log('location-found : ' + data.mwId + ', ' + firsts[data.mwId - 1] + ', from ' + savedPageToCrawl[data.mwId - 1].startFrom + ', ' + savedPageToCrawl[data.mwId - 1].endBy);
        else
            console.log('location-found : ' + data.mwId + ', ' + firsts[data.mwId - 1]);

        firsts[data.mwId - 1] = false;
    }
    else {
        var logMessage = 'location-found : ' +
            data.mwId
            + ', ' + firsts[data.mwId - 1];
            
            if(data.currentPage == 'pages/getChapters.js' || data.currentPage == 'pages/getMangaInfo.js') 
                logMessage += ', from ' + savedPageToCrawl[data.mwId - 1].startFrom +
                ', ' + savedPageToCrawl[data.mwId - 1].endBy;

        if(data.currentPage == 'pages/getMangaInfo.js') {
            logMessage += ', ' + global.getMangaInfoIterators[data.mwId - 1].start +
            ', ' + global.getMangaInfoIterators[data.mwId - 1].next;
            
        }
        else if(data.currentPage == 'pages/getChapters.js') {
            logMessage += ', ' + global.getChapterIterators[data.mwId - 1].start +
            ', ' + global.getChapterIterators[data.mwId - 1].next +
            ', ' + global.getChapterIterators[data.mwId - 1].current;
        }

        console.log(logMessage);
    }

    var replacement;
    switch (data.currentPage) {
        case 'pages/getChapters.js':
        case 'pages/getMangaInfo.js':
            replacement = 'const startFrom = ' + savedPageToCrawl[data.mwId - 1].startFrom + ';';
            js = js.replace('const startFrom = -1;', replacement)
            replacement = 'const endBy = ' + savedPageToCrawl[data.mwId - 1].endBy + ';'
            js = js.replace('const endBy = -1;', replacement)
            break;
    }

    BrowserWindow.fromId(data.mwId).webContents.executeJavaScript(js);
});

ipc.on('stop', function (event, newLocation) {
    BrowserWindow.fromId(data.mwId)
});

ipc.on('stop-window', function (event, data) {
    app.quit();
});

ipc.on('links-to-properties', function (event, links) {
    var FILE_PATH = '../crawled/detail-pages.json';
    var json = readFiles(FILE_PATH);
    var detailPages = JSON.parse(json);

    for (var i = 0; i < links.length; i++) {
        if (detailPages.indexOf(links[i]) < 0) {
            detailPages.push(links[i]);
        }
    }

    fs.writeFile(FILE_PATH, JSON.stringify(detailPages, null, 4));
});

// Save manga list into a JSON object
ipc.on('save-mangaList', function (event, mangaList) {
    const FILE_PATH = "../crawled/mangaList.json";
    ensureDirectoryExistence(FILE_PATH);
    fs.writeFile(FILE_PATH, JSON.stringify(mangaList, null, 4), "utf8", "w");
    console.log("Manga list generated at " + FILE_PATH);
});

// Save the manga information as JSON
ipc.on('save-mangaInfo', function (event, mangaInfo) {
    const FILE_PATH = "../crawled/mangas/";
    var jsonFilename = FILE_PATH + mangaInfo.Name + ".json";
    ensureDirectoryExistence(jsonFilename);
    fs.writeFile(jsonFilename, JSON.stringify(mangaInfo, null, 4), "utf8", "w");
});

// Save the chapter information as JSON
ipc.on('save-chapterInfo', function (event, data) {
    const FILE_PATH = "../crawled/mangas/" + data.Manga + '/';
    var jsonFilename = FILE_PATH + data.Chapter + ".json";

    if (directoryExists(jsonFilename, true)) {
        var oldChapter = readJsonFile(jsonFilename);
        oldChapter.Images.push(data.Images[0])
        data = oldChapter;
    }
    else
        ensureDirectoryExistence(jsonFilename);

    fs.writeFile(jsonFilename, JSON.stringify(data, null, 4), "utf8", "w");
});

// Save log error
ipc.on('log-error', function (event, errorMessage) {
    log(errorMessage);
});
