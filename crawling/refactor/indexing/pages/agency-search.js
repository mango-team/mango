/* global $ */
/* global Indexer */

(function($) {
    var index = function() {
        var SELECTORS = {
            SEARCH_BY_NETWORKS: '#column-central > table > tbody > tr:nth-child(3) > td.box-content > table:nth-child(6) > tbody a',
            SEARCH_BY_MAIN_BELGIUM_CITIES: '#column-central > table > tbody > tr:nth-child(3) > td.box-content > table:nth-child(9) > tbody a',
            SEARCH_BY_PROVINCE: '#column-central > table > tbody > tr:nth-child(3) > td.box-content > table:nth-child(2) > tbody > tr a'
        };
        var links = [];
        
        var aElementsSelectors = [
            SELECTORS.SEARCH_BY_NETWORKS, 
            SELECTORS.SEARCH_BY_MAIN_BELGIUM_CITIES, 
            SELECTORS.SEARCH_BY_PROVINCE  
        ];
        
        $.each(aElementsSelectors, function(i, aElementsSelector) {
           $(aElementsSelector).each(function(j, el) {
               var link = $(el).attr('href');
               links.push(link); 
           });
        });
        
        return links;
    };
    
    var options = {
        getPagesToIndex: index,
        onStop: function() {
            history.back();
        }
    };
    
    var indexer = new Indexer(options);
    indexer.start();
})(jQuery);