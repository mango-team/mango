(function($) {
    var Indexer = function (options) {
        var defaults = {
            indexingFunction: function(pageToIndex) {
                location.assign(pageToIndex);
            },
            getPageId: function(url) {
                return url;
            }
        };
        this.options = $.extend(defaults, options);
    };
    
    Indexer.prototype = {
        start: function() {
            console.log('starting indexing', location.href);
            window.$indexer = this;
            
            var indexedPages = this.getIndexedPages();
            if (!indexedPages || !indexedPages.length) {
                indexedPages = [];
            }
            
            var pagesToIndex = this.getPagesToIndex();
            console.log('retrieved pages to index', pagesToIndex);
            
            var nextPageToIndex = this.getNextPageToIndex(pagesToIndex, indexedPages);
            console.log('retrieved next page to index', nextPageToIndex);
            
            if(nextPageToIndex) {
                this.indexPage(nextPageToIndex);
            } else {
                this.saveProgression();
                console.log('stopping');
                this.stop();
            }
        },
        
        getIndexedPages: function() {
            var json = localStorage.getItem(location.href);
            var indexedPages = json ? JSON.parse(json) : null;

            console.log('retrieved previously indexed pages', indexedPages);
            return indexedPages;
        },
        
        getPagesToIndex: function() {
            var getPagesToIndex = this.options.getPagesToIndex;
            if(typeof getPagesToIndex != 'function') {
                throw new Error('getPagesToIndex missing');
            }
            
            var pagesToIndex = getPagesToIndex();
            
            $.each(pagesToIndex, function(i, page) {
                localStorage.setItem('parent-of-'+ page, location.href);
            });
            
            return pagesToIndex;
        },
        
        getNextPageToIndex: function(pagesToIndex, indexedPages) {
            for(var i = 0; i < pagesToIndex.length; i++) {
                var url = pagesToIndex[i];
                
                if(indexedPages.indexOf(url) < 0) {
                    return url;
                }
            }
            
            return null;
        },
        
        indexPage: function(pageToIndex) {
            var indexingFunction = this.options.indexingFunction;
            if (typeof indexingFunction != 'function') {
                throw new Error('indexingFunction missing');
            }
            
            console.log('switched to indexing page', pageToIndex);
            indexingFunction(pageToIndex);
        },
        
        stop: function() {
            var onStop = this.options.onStop;
            if(typeof onStop != 'function') {
                throw new Error('onStop missing');
            }
            
            onStop();
        },
        
        saveProgression: function() {
            var parent = localStorage.getItem('parent-of-' +  location.href);
            if(parent) {
                var json = localStorage.getItem(parent);
                var visitedPages = json ? JSON.parse(json) : [];
                
                if (visitedPages && visitedPages.indexOf(location.href) < 0) {
                    visitedPages.push(location.href);
                    json = JSON.stringify(visitedPages);
                    localStorage.setItem(parent, json);
                }
            }
        }
    };
    
    window.Indexer = Indexer;
    
})(jQuery);