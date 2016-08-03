/* global $ */
/* global Indexer */

(function($) {
    var index = function() {
        var SELECTORS = {
            AGENCY_SEARCH: '#column-left > div > div:nth-child(7) > ul > li:nth-child(1) > a',
            NOTORY_SEARCH: '#column-left > div > div:nth-child(7) > ul > li:nth-child(2) > a',
            PROMOTER_SEARCH: '#column-left > div > div:nth-child(7) > ul > li:nth-child(3) > a',
            SPECIFIC_SEARCH: '#column-left > div > div:nth-child(3) > ul > li:nth-child(2) > a',
            HOLIDAY_SEARCH: '#nav-menu > ul > li.vacances > a',
        };
        var links = [];
        
        var aElements = [
            SELECTORS.AGENCY_SEARCH,
            SELECTORS.NOTORY_SEARCH,
            SELECTORS.PROMOTER_SEARCH,
            SELECTORS.SPECIFIC_SEARCH,
            SELECTORS.HOLIDAY_SEARCH
        ];
        
        $.each(aElements, function(i, selector) {
            var link = $(selector).attr('href'); 
            links.push(link);
        });
        
        return links;
    };
    
    var options = {
        getPagesToIndex: index,
        onStop: function() {
            //require("electron").ipcRenderer.send('stop');
        }
    };
    
    var indexer = new Indexer(options);
    indexer.start();
})(jQuery);