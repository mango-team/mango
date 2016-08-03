(function() {
    
    const ipc = require("electron").ipcRenderer;
    
    function determineCurrentPage() {
        if (window.location.pathname.equals('/fr/'))
            return 'pages/home.js';
        if(window.location.search.contains('typemot=age&mycurrent_section=global'))
            return 'pages/agency-search.js';
        if(window.location.search.contains('typemot=age&idres='))
            return 'pages/agency-search/agency-network.js';
        if(window.location.search.contains('typemot=age&idclient='))
            return 'pages/agency-search/agency.js';
        if(window.location.pathname.contains('global.prf.cfm'))
            return 'pages/agency-search/agency/global.js';

        // Main search pages to rent and to sell
        if(window.location.pathname.equals('/fr/immo/a-vendre') || window.location.pathname.equals('/fr/immo/a-louer'))
            return 'pages/main-search/search.js';
        // Result page
        if(window.location.pathname.contains('fr/recherche/'))
            return 'pages/main-search/search-result.js';
        // Property page
        if(window.location.pathname.contains('/fr/annonce/'))
            return 'pages/main-search/property.js';
        
        ipc.send('log-error', "No page matching");
        
        //debugger;
        return 'no-page-matching.js';
    }
    
    setTimeout(function (){
        var currentPage = determineCurrentPage();
        if(currentPage) 
            ipc.send('location-found', currentPage);
    }, 500);
    
})();