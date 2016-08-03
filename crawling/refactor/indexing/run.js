'use strict';

const fs = require('fs');
const path = require('path');
const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const Download = require('download');
let mainWindow;

function readFiles() {
    var fileContents = [];
    for(var i = 0; i < arguments.length; i++) {
        var file = fs.readFileSync(arguments[i]);
        fileContents.push(file);
    }
    return fileContents;
}

var determinePage = function() {
    var js = readFiles('helpers.js', 'determine-page.js').join('');
    mainWindow.webContents.executeJavaScript(js);            
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (directoryExists(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function directoryExists(path) {
  try {
    return fs.statSync(path).isDirectory();
  }
  catch (err) {
    return false;
  }
}

function log (errorMessage)
{
    const FILE_PATH_LOG_ERROR = "../../crawled/log-error.txt";
    var dateNow = new Date();
    var errorTemplate = dateNow.toUTCString() + " : " + errorMessage;
    
    if(errorMessage != "START" && errorMessage != "EXIT")
    {
        errorTemplate += " at " + mainWindow.webContents.getURL();
    }
    
    errorTemplate += "\n";
    
    try
    {
        fs.appendFile(FILE_PATH_LOG_ERROR, errorTemplate, "utf8");          
    }
    catch (e)
    {
        fs.writeFile(FILE_PATH_LOG_ERROR, errorTemplate, "utf8");
    }
}

function DownloadPicture(uri, dir, filename)
{    
    function dlCallback (filename){
    console.log('Done downloading ' + filename);
  };
 
    new Download({mode: '755'})
    .get(uri)
    .dest(dir)
    .rename(filename + ".jpg")
    .run(dlCallback(filename));
}


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

function createWindow () {
  // Create the browser window.
    mainWindow = new BrowserWindow({width: 1600, height: 1200});
    
    // Load the index.html of the app.
    //mainWindow.loadURL('http://www.immoweb.be/fr/');
    
    // Generate search result links
    //mainWindow.loadURL('http://www.immoweb.be/fr/immo/a-vendre');
    
    // No search result
    //mainWindow.loadURL('http://www.immoweb.be/fr/recherche/industrie/a-vendre/bierges/1301');
    
    // More than 500 search results
    //mainWindow.loadURL('http://www.immoweb.be/fr/recherche/maison/a-vendre');
    
    // First search result page
    //mainWindow.loadURL('http://www.immoweb.be/fr/recherche/maison/a-louer/bruxelles/1000');
    
    // First property page
    mainWindow.loadURL('http://www.immoweb.be/fr/annonce/maison/a-louer/bruxelles-ville/1000/id6118376');
    //mainWindow.loadURL('http://www.immoweb.be/fr/annonce/maison/a-louer/auderghem/1160/id6209722');

     log("START");

    // Open the DevTools.
    mainWindow.webContents.on('dom-ready', function(event) {
        mainWindow.webContents.openDevTools();
        determinePage();      
    });

    mainWindow.webContents.on('did-navigate-in-page', function(event) {
        //mainWindow.webContents.openDevTools();
        //console.log('did-navigate-in-page');
        //determinePage();
    });   

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    log("EXIT");
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipc.on('location-found', function (event, page) {
    console.log(page);
    var js = readFiles('helpers.js', 'Indexer.js', page).join('');
    mainWindow.webContents.executeJavaScript(js);         
});

ipc.on('stop', function(event, newLocation) {
    app.quit();
});

ipc.on('links-to-properties', function(event, links) {
    var FILE_PATH = '../crawled/detail-pages.json';
    var json = readFiles(FILE_PATH);
    var detailPages = JSON.parse(json);
    
    for(var i = 0; i < links.length; i ++) {
        if (detailPages.indexOf(links[i]) < 0) {
            detailPages.push(links[i]);
        }
    }
    
    fs.writeFile(FILE_PATH, JSON.stringify(detailPages, null, 4));
});

// Save the search results links as JSON object
ipc.on('save-search-result-link', function(event, links) {
    const FILE_PATH = "../../crawled/search-result-links.txt"; 
    fs.writeFile(FILE_PATH, links.join("\n"), "utf8", "w");
    console.log("Search result links generated");
    app.quit();
});

// Save the ad for a property
ipc.on('crawled-property', function(event, data) {    
    const FILE_PATH_PERSISTED_DATA = "../../crawled/persisted-data-property.txt";
    var newPersistedData = "nextPropertyNb : " + data.nextPropertyNb + "\n" + "propertyProcessed : " + data.propertyProcessed;
    
    // Save persisted data
    fs.writeFile(FILE_PATH_PERSISTED_DATA, newPersistedData, "utf8", "w");
    
    if(data.description != null)
    {
        const FILE_PATH = "../../crawled/properties/" + data.description.id + "/";
        var jsonFilename = FILE_PATH + data.description.id +".json";     
        ensureDirectoryExistence(jsonFilename);
        fs.writeFile(jsonFilename, JSON.stringify(data.description, null, 4), "utf8", "w");
        
        data.links.forEach(function(link) {  
            var beforeJPGSlashSplit = link.split('.jpg?')[0].split('/');
            var pictureFilename = beforeJPGSlashSplit[beforeJPGSlashSplit.length - 1 ];
            DownloadPicture(link, FILE_PATH,  pictureFilename)
        });
    }
    else
    {
        console.log("Empty data description : " + data.description);
    }   
});

// Save search results
ipc.on('crawled-search-result', function(event, data) {
    const FILE_PATH_SEARCH_RESULTS = "../../crawled/search-results.txt"; 
    const FILE_PATH_PERSISTED_DATA = "../../crawled/persisted-data.txt";   
    
    var nextPageNb = data.currentPageNb;
    var nextResultPageNb = data.currentResultPageNb;
    
     if(data.nextPageToCrawl != null)
    { 
        nextPageNb++;
    }
    else if (data.nextResultPageToCrawl != null)
    {
        nextResultPageNb++;
        nextPageNb = 0;
    }
    
    var newPersistedData = "nextPageNb : " + nextPageNb + "\n" + "nextResultPageNb : " + nextResultPageNb + "\n" + "resultPagesProcessed : " + data.resultPagesProcessed;    
    
    try
    {
        fs.appendFile(FILE_PATH_SEARCH_RESULTS, data.propertyLinks.join("\n") + "\n", "utf8");          
    }
    catch(e)
    {
        fs.writeFile(FILE_PATH_SEARCH_RESULTS, data.propertyLinks.join("\n") + "\n", "utf8");
    }
    
    if(data.nextPageToCrawl != null)
    {        
        fs.writeFile(FILE_PATH_PERSISTED_DATA, newPersistedData, "utf8", "w");
        console.log("Next page : " + nextPageNb);
    }
    else if (data.nextResultPageToCrawl != null)
    {
        fs.writeFile(FILE_PATH_PERSISTED_DATA, newPersistedData, "utf8", "w");
        console.log("Next result page : " + nextResultPageNb);
    }
    else
    {
        app.quit();
    }
});

// Save log error
ipc.on('log-error', function(event, errorMessage) {    
    log(errorMessage);
});
