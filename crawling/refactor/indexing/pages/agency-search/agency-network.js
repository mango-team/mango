/* global $ */
/* global Indexer */

(function($) {
    var index = function() {
        var links = [];
        
        $('#IWEB_IFRAME_ID_RESGRP').contents().find('.annonce-data .align-left a').each(function(i, aElementsSelector) {
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