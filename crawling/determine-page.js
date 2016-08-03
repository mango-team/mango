(function() {
    
    const ipc = require("electron").ipcRenderer;    
    const remote = require('electron').remote;
    
    const mwId = remote.getCurrentWindow().id;
    
    function determineCurrentPage() {
        debugger;
        console.log(window.location.pathname.split('/').length);
        console.log(window.location.pathname);
        if(window.location.pathname.equals('/alphabetical'))
        return 'pages/getManga.js';
        else if(window.location.pathname.split('/').length == 3 || window.location.pathname.split('/').length == 4)       
        return 'pages/getChapters.js';
        else if (window.location.pathname.split('/').length == 2)
        return 'pages/getMangaInfo.js';

        ipc.send('log-error', "No page matching");
        
        //debugger;
        return 'no-page-matching.js';
    }
    
    setTimeout(function (){   
        var currentPage = determineCurrentPage();          

        var data = {currentPage, mwId};
        if(currentPage) 
            ipc.send('location-found', data);
    }, 500);
    
})();