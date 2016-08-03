(function() {

var ipc = require("electron").ipcRenderer;

var SELECTORS = {
    GROUPS_TABLE: '#column-central > table > tbody > tr:nth-child(3) > td.box-content > table:nth-child(6)',  
    GROUP_ROW: 'tbody tr', 
    GROUP_NR_OF_PROPERTIES_COL: 'td :not(:first)',
    GROUP_NAME_COL: 'td :first a'
};

function onInitializeCrawling() {
    var groups = [];

    $(SELECTORS.GROUPS_TABLE).find(SELECTORS.GROUP_ROW).each(function(idx, row) {
        var $link = $(row).find(SELECTORS.GROUP_NAME_COL),
            link  = $link.attr('href');
        
        var group = {
            numberOfActiveProperties: parseInt(  $(row).find(SELECTORS.GROUP_NR_OF_PROPERTIES_COL).text() ),
            name: $link.text(),
            link,
            id: getParameterByName('idres', link),
            dbId: getParameterByName('id', link)            
        };
        
        groups.push(group);
    });
    
    var crawledData = { groups };
    
    ipc.send('crawled-pros', crawledData);
}
 
function getPagesToCrawl() {
    var links = [];
    $(SELECTORS.GROUPS_TABLE).find(SELECTORS.GROUP_ROW).each(function(idx, row) {
        var $link = $(row).find(SELECTORS.GROUP_NAME_COL);
        links.push($link);
    });
    return links; 
}

function onStop() {
    ipc.send('stop');
}

var options = {
    crawledPagesStorageKey: 'groups-temp',
    pageIdParam: 'idres',      
    onInitializeCrawling,
    getPagesToCrawl,
    onStop
};

//debugger;
var crawler = new Crawler(options);
crawler.run();

})();
