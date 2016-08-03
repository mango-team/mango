/* global $ */
/* global Indexer */

(function($) {
    var SELECTORS = {
       FOR_SALE_PROPERTIES : '#ads > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(6) > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr:nth-child(1) > td > ul > li:nth-child(1) > a', 
       TO_RENT_PROPERTIES : '#ads > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(6) > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr:nth-child(1) > td > ul > li:nth-child(2) > a', 
    }
    var index = function() {
        var links = [];
        
        var selectors = [SELECTORS.FOR_SALE_PROPERTIES, SELECTORS.TO_RENT_PROPERTIES];
        
        $(selectors.join(' , ')).each(function(i, selector) {
           var onclickLink = $(selector).attr('onclick').replace("'", '').textAfter('prf_Results.cfm?');
           if (onclickLink) {
               var link = 'http://www.immoweb.be/fr/global.prf.cfm?' + onclickLink;
               links.push(link);   
           }
        });
        
        //debugger;
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