'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
let mainWindow;
const instanceName = newGuid();
//const instanceName = 'TEST_20160313_1';
//const instanceName = 'TEST_20160313_2';
//const instanceName = 'TEST_20160313_3';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

function createWindow () {
  // Create the browser window.
    mainWindow = new BrowserWindow({width: 1600, height: 1200});

    // Load the index.html of the app.
    mainWindow.loadURL('http://www.immoweb.be/fr/');

    // Open the DevTools.
    mainWindow.webContents.on('dom-ready', function(event) {
      mainWindow.webContents.openDevTools();
      injectStartupScripts();
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

ipc.on('quit', function(event) {
  app.quit();
});

ipc.on('goto', function(event, newLocation) {
  //console.log('navigating to', newLocation);
  const options = {"extraHeaders" : "pragma: no-cache\n"};

  mainWindow.loadURL(newLocation, options);
});

ipc.on('properties-to-file', function(event, properties) {
  var FILE_PATH = './Results/detail-pages.json';

  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 4));
  }

  var json = readFiles(FILE_PATH).toString();
  var detailPages = JSON.parse(json);

  properties.forEach(function(property) {
    if (detailPages.indexOf(property) < 0) {
        detailPages.push(property);
    }
  });

  fs.writeFile(FILE_PATH, JSON.stringify(detailPages, null, 4));
});

ipc.on('properties', function (event, properties) {
  var json = JSON.stringify(properties);
  var options = {
    host: 'localhost',
    port: '1000',
    path: '/property-link',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': json.length
    }
  };
  var req = http.request(options);
  req.write(json);
  req.end();
});

function readFiles(arr) {
    var list = typeof(arr) == 'object' ? arr : arguments;

    var fileContents = [];
    for(var i = 0; i < list.length; i++) {
        var file = fs.readFileSync(list[i]);
        fileContents.push(file);
    }
    return fileContents;
}

function injectStartupScripts() {
    var files = [
      'node_modules/bluebird/js/browser/bluebird.min.js',
      'helper.js',
      //'FileStorageService.js',
      'LocalStorageService.js',
      'RemoteStorageService.js',
      'RouteService.js',
      'AsyncIndexer.js'
    ];

    var js = readFiles(files).join('').split('[INSTANCE_NAME]').join(instanceName);
    mainWindow.webContents.executeJavaScript(js);
}

function newGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}
