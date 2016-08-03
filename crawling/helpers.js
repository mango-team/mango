function getParameterByName(name, url) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(url || window.location.search.toLowerCase());
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function trimText(text) {
    return text.trim().split('\t').join('').split('\n').join('');
}

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function ifContains(text, elements, defaultValue) {
    
    for (var i = 0; i < elements.length; i++) {
        if(text.indexOf(elements[i]) > -1) {
            return text.replace(elements[i], '');
        }
    }
    
    return defaultValue;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement || '');
};

String.prototype.between = function(start, end) {
    return this.after(start).before(end);
};

String.prototype.after = function(str) {
    return this.split(str)[1];
};

String.prototype.before = function(str) {
    return this.split(str)[0];
};

String.prototype.trimmed = function() {
    return trimText(this);
};

String.prototype.xpath = function() {
    return getElementByXpath(this);
};

function Crawler(options) {
    this.options = options;
}

Crawler.prototype = {
    run: function(){
        //debugger;
        var self = this;
        console.log('started crawling');
        
        var crawledPages = self.getCrawledPages();
        console.log('retrieved previous crawled pages', crawledPages);

        if(!crawledPages || !crawledPages.visited.length) {
            crawledPages = self.initializeCrawling();
            console.log('initialized crawling', crawledPages);
        }

        var pages = self.getPagesToCrawl();
        //console.log('retrieved pages to crawl', pages);

        var nextPageToCrawl = null;
        
        $.each(pages, function(idx, $page) {
            var url = $page.attr('href');
            var pageId = self.getPageId(url);
            
            if (crawledPages.visited.indexOf(pageId) < 0) {
                nextPageToCrawl = url;
                return false;
            }
        });
        //debugger;
        
        if(nextPageToCrawl) {
            location.assign(nextPageToCrawl);
        } else {
            self.stop();
        }
    },
    
    getCrawledPages: function() {
        var crawledPagesStorageKey = this.options.crawledPagesStorageKey;
        if(!crawledPagesStorageKey) {
            throw new Error('crawledPagesStorageKey is missing');
        }
        var crawledPages = localStorage.getItem(crawledPagesStorageKey);
        return crawledPages ? JSON.parse(crawledPages) : null;
    },
    
    initializeCrawling: function(){
        if(typeof this.options.onInitializeCrawling === 'function') {
            this.options.onInitializeCrawling();
        }
        
        var crawledPagesStorageKey = this.options.crawledPagesStorageKey;
        if(!crawledPagesStorageKey) {
            throw new Error('crawledPagesStorageKey is missing');
        }
        
        var crawledPages = { visited: [] };
        localStorage.setItem(crawledPagesStorageKey, JSON.stringify(crawledPages));
        return crawledPages;
    },
    
    getPagesToCrawl: function() {
        if(typeof this.options.getPagesToCrawl === 'function') {
            return this.options.getPagesToCrawl();
        }
        
        throw new Error('getPagesToCrawl is missing');
    },
    
    getPageId: function(url) {
        if(!this.options.pageIdParam) 
            throw new Error('pageIdParam is missing');
        
        return getParameterByName(this.options.pageIdParam, url);
    },
    
    stop: function() {
        if(typeof this.options.onStop === 'function') {
            this.options.onStop();
        }
    }
};



setTimeout(function() {
  var proGroup = localStorage.getItem('last-pro-group');
  if (proGroup) {
      var groups = JSON.parse(localStorage.getItem('groups-temp'));
      
      if (groups && groups.visited && groups.visited.indexOf(proGroup) > -1) {
          groups.visited.splice(groups.visited.indexOf(proGroup), 1);
          localStorage.setItem('groups-temp', JSON.stringify(groups));
      }
      
      var pro = localStorage.getItem('last-pro');
      if (pro) {
          var group = JSON.parse(localStorage.getItem(proGroup));
            
          if (group && group.visited && group.visited.indexOf(pro) > -1) {
              group.visited.splice(group.visited.indexOf(pro), 1);
              localStorage.setItem(proGroup, JSON.stringify(group));
          }
      }
  }
  
  location.reload(true);
}, 3000);