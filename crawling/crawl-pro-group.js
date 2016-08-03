(function() {

var ipc = require("electron").ipcRenderer;

var SELECTORS= {
    IFRAME: '#IWEB_IFRAME_ID_RESGRP',
    IFRAME_TABLE: 'table.annonce-data', 
    IFRAME_TABLE_ROWS: 'tbody tr', 
    IFRAME_TABLE_AGENCY_LINK: 'thead td:first'
};

//debugger;
var PARENT_STORAGE_NAME = 'groups-temp';

function onInitializeCrawling() {
    var crawledData = { 
        links: { 
            general: {}, 
            subAgencies: {} 
        } 
    };
    
     $('h2.nopadding :first').children().remove();
     
    crawledData.description = {
        id: getParameterByName('idres'),
        agencyName: $('h2.nopadding').text().trim().split('(')[0].trim(), 
        numberOfActiveProperties: parseInt( $('h2.nopadding').text().split('(')[1].split('b')[0].trim() ), 
        numberOfAgencies: parseInt($('h2.nopadding').text().split('/')[1].split('a')[0].trim()),
        website: $('.Photo').attr('title'),
        pictureUrl: $('.Photo').attr('src')
    };
    
    $('a[href="#onglet"]').each(function(index) {
        if (index === 0) 
            crawledData.links.general.numberOfPropertiesForSale = parseInt($(this).text().split('b')[0].trim());
        if (index === 1) 
            crawledData.links.general.numberOfPropertiesToRent = parseInt($(this).text().split('b')[0].trim());
        if (index === 2) 
            crawledData.links.general.numberOfNewPropertiesForSale = parseInt($(this).text().split('b')[0].trim());
        if (index === 3) 
            crawledData.links.general.numberOfNewPropertiesToRent = parseInt($(this).text().split('b')[0].trim());
        if (index === 4) 
            crawledData.links.general.numberOfPropertiesForSaleWithNewPrices = parseInt($(this).text().split('b')[0].trim());
        if (index === 5) 
            crawledData.links.general.numberOfPropertiesToRentWithNewPrices = parseInt($(this).text().split('b')[0].trim());
            
    });
    
    $(SELECTORS.IFRAME).contents().find(SELECTORS.IFRAME_TABLE).each(function() {
        var province = $(this).find('thead td:first').text();
        crawledData.links.subAgencies[province] = [];
        
        $(this).find(SELECTORS.IFRAME_TABLE_ROWS).each(function (_index, el) {
            var $columns = $(el).find('td');
            
            var agency = {
                id: getParameterByName('idclient', $columns.find('a').attr('href')),
                link: $columns.find('a').attr('href'),
                name: $columns[1].innerText,
                commune: $columns[2].innerText,
                numberOfProperties: parseInt($columns[3].innerText)  
            };
            crawledData.links.subAgencies[province].push(agency);
        });
    });
    
    ipc.send('crawled-pro-group', crawledData);
    
    var parent = JSON.parse(localStorage.getItem(PARENT_STORAGE_NAME));
    
    parent.visited.push(crawledData.description.id);
    
    localStorage.setItem(PARENT_STORAGE_NAME, JSON.stringify(parent));
}

function getPagesToCrawl() {
    var links = [];
    $(SELECTORS.IFRAME).contents().find(SELECTORS.IFRAME_TABLE).each(function() {
        $(this).find(SELECTORS.IFRAME_TABLE_ROWS).each(function (_index, el) {
            var $link = $(el).find('td').find('a').first();
            links.push($link);
        });
    });
    return links; 
}

function onStop() {
    var parent = JSON.parse(localStorage.getItem(PARENT_STORAGE_NAME)) || {visited: []};

    if(parent.visited.indexOf(options.crawledPagesStorageKey) < 0) {
        parent.visited.push(options.crawledPagesStorageKey);
        localStorage.setItem(PARENT_STORAGE_NAME, JSON.stringify(parent));
    }
    
    history.back();
}

var options = {
    crawledPagesStorageKey: getParameterByName('idres'),
    pageIdParam: 'idclient',      
    onInitializeCrawling,
    getPagesToCrawl,
    onStop
};

localStorage.setItem('last-pro-group', options.crawledPagesStorageKey);

var crawler = new Crawler(options);
crawler.run();

})();
