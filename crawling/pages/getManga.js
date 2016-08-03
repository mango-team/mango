/*
getManga.js loops to create an array of mangas with name and url
*/

const fs = require('fs');
const ipc = require("electron").ipcRenderer;
const remote = require('electron').remote;
const mwId = remote.getCurrentWindow().id;
const firstRun = false; // DO NOT TOUCH : To be replaced by the firstRun parameter

(function($) {

    ipc.send('log-error', 'getManga ' + mwId + ', ' + firstRun);
    
    var SELECTORS = {
        a_elem : ".series_alpha > li > a",
    };

    var mangaList = []

   $(SELECTORS.a_elem).each(function(j, el) {
                var name = $(el).attr('innerHTML');
                var link = "http://www.mangareader.net" + $(el).attr('href');
                var manga = {
                                name : name,
                                url : link
                            };       
                mangaList.push(manga); 
            });
    //debugger;
    ipc.send('save-mangaList', mangaList); 
    remote.getCurrentWindow().close();   

})(jQuery);