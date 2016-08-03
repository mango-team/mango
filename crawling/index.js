'use strict';

const fs = require('fs');
const path = require('path');
const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
let mainWindow;

function readFile(fileName, callback) {
    fs.readFile(fileName, 'utf8', function(err, data) {
          if(err) {
              console.log(err);
          } else if(callback) {
              callback(data);
          }
      });
}


var loadHelpers = function(newLocation) {
    readFile('helpers.js', function(helpersJS) {
            mainWindow.webContents.executeJavaScript(helpersJS);            
            readFile(newLocation, function(data) {
                mainWindow.webContents.executeJavaScript(data);            
            });
    });
}

var determinePage = function() {
    readFile('determine-page.js', function(newLocation) {
        mainWindow.webContents.executeJavaScript(newLocation);            
    });
}

var reloadPage = function() {
    //if (!mainWindow.webContents.isLoading() && !mainWindow.webContents.isWaitingForResponse) {
        readFile('relead-if-blocked.js', function(data) {
            mainWindow.webContents.executeJavaScript(data);            
        });
    //}
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

function writeJson(fileName, json){
    ensureDirectoryExistence(fileName);
    fs.writeFile(fileName, JSON.stringify(json, null, 4));    
}

function writeFileForGroup(data) {
    var fileName = './crawled/groups/'+ data.description.id + '.json';
    writeJson(fileName, data);
}

function writeFileForPro(data) {
    var fileName = './crawled/pros/'+ data.description.groupId + '/'+ data.description.id + '.json';
    writeJson(fileName, data);
}

function writeFileForPros(data) {
    var fileName = './crawled/pros.json';
    writeJson(fileName, data);
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

function createWindow () {
  // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    mainWindow.loadURL('http://www.immoweb.be/fr/recherche-agence-immobiliere-belgique.htm?typemot=age&mycurrent_section=global&');
    //mainWindow.loadURL('http://www.immoweb.be/fr/century-21-agences-immobilieres.htm?typemot=age&idres=cent21&id=2');
    //mainWindow.loadURL('http://www.immoweb.be/fr/global.Estate.cfm?IdBien=6215348&xgallery=estates&xpage=1');

    // Open the DevTools.
    mainWindow.webContents.on('did-finish-load', function(event) {
        //mainWindow.webContents.openDevTools();
        
        determinePage();      
    });

    mainWindow.webContents.on('did-navigate-in-page', function(event) {
        //mainWindow.webContents.openDevTools();
        determinePage();
    });
  
  

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
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

ipc.on('crawled-pros', function(event, data) {
    writeFileForPros(data);
});

ipc.on('crawled-pro-group', function(event, data) {
    writeFileForGroup(data);
});

ipc.on('crawled-pro', function(event, data) {
    writeFileForPro(data);
});

ipc.on('crawled-property', function(event, data) {
    console.log('crawled-property', data);
});

ipc.on('location-found', function(event, newLocation) {
    loadHelpers(newLocation);
});

ipc.on('stop', function(event, newLocation) {
    app.quit();
});

setInterval(function() {
    reloadPage();
}, 3000);
