var ipc = require("electron").ipcRenderer;


var currentPage; 
if (window.location.search.toLowerCase().indexOf('idres') >= 0 )
    currentPage = 'crawl-pro-group.js';
else if(window.location.search.toLowerCase().indexOf('idclient') >= 0 )
    currentPage = 'crawl-pro.js';
else if(window.location.search.toLowerCase().indexOf('idbien') >= 0 )
    currentPage = 'crawl-property.js';
else if(window.location.pathname.toLowerCase().indexOf('recherche-agence-immobiliere-belgique') >= 0)
    currentPage = 'crawl-pros.js';

if(currentPage) {
    ipc.send('location-found', currentPage);
}