/* global $ */
/* global Indexer */

(function($) {
    
    function getLinks() {
        var links = [];
    
        $('#IWEB_IFRAME_ID_PRF').contents().find('div[id] > a').each(function(i, el) {
            var link = $(el).attr('href');
            links.push(link);
        });
        
        return links;    
    }
    
    
    
    var index = function() {
        var links = getLinks();    
        require("electron").ipcRenderer.send('links-to-properties', links);
    
        return [];
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