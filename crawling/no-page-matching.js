/* global Indexer */
(function() {
    var index = function() {
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
})();