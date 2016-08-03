(function() {

	const ipc = require("electron").ipcRenderer;

	var STORAGE_KEYS = {
		LAST_VISITED_URL: 'LAST_VISITED_URL',
		PAGES: 'PAGES'
	};

    crawlThemAll.Indexer = function (options, storageService, routeService) {
        this.storageService = storageService;
        this.routeService = routeService;
        this.defaults = {
            maxNrOfRetries: 4,
            reloadTimeout: 10000
        };
        this.options = crawlThemAll.extend(this.defaults, options);
    };
    
    crawlThemAll.Indexer.prototype = {
        //main indexing function
        // the goal is to go from page to page
        // when you arrive on a page, it checks if there is any page it would like to visit
        // If there is any page new page to index, it is added to the queue of page to visit
        // It then goes to the next page if there is one
        start: function() {
        	//debugger;
            this.initialize();
            
            var currentPage = this.getLastPage();
            if (!currentPage.done) {
                currentPage.nrOfRetries++;
                currentPage.lastAttempt = new Date();


                if(currentPage.nrOfRetries < this.options.maxNrOfRetries) {
                    try {
                        var additionalPages = this.getAdditionalPagesToVisit(currentPage);
                        if(additionalPages && additionalPages.length > 0) {
                            this.addToQueue(additionalPages);
                        }
                        currentPage.done = true;
                        currentPage.failed = false;
                        currentPage.lastError = null;
        
                    } catch(err) {
                        currentPage.lastError = err.stack;
                        currentPage.failed = true;
                    }
                } else {
                    currentPage.done = true;
                }

                this.savePage(currentPage);
            }
            
            var nextPage = this.getNextPageFromQueue();
            if (nextPage) {
                this.goto(nextPage);
            } else {
                this.quit();
            }
        },
        
        //Setup a timeout so that if we are bloqued, we either reload the current page, or we go to the next one.
        initialize: function() {
        	setTimeout(function() {
        		location.reload();
        	}, this.options.reloadTimeout);
        },
        
        getLastPage: function() {
        	var lastPage = null;
        	var lastVisitedUrl = this.storageService.get(STORAGE_KEYS.LAST_VISITED_URL);

        	if (lastVisitedUrl) {
        		lastPage = this.getAllPages()[lastVisitedUrl];	
        	}

        	if (!lastPage) {
        		lastPage = { done: false, nrOfRetries: 0, url: location.href };
        	}

        	return lastPage;
        },

        getAdditionalPagesToVisit: function(page) {
        	var additionalPages = null;
        	var extractionStrict = this.getExtractionScript(page);
        	if (extractionStrict) {
        		additionalPages = extractionStrict.extract();
        	}

        	return additionalPages;
        },

        getExtractionScript: function(page) {
    		var extractionStrict = null;
    		var pageName = this.routeService.determinePage(page.url);
    		if (pageName) {
    			extractionStrict = this.routeService.readFile(pageName);
    		}
    		return extractionStrict;
        },

        addToQueue: function(additionalPages) {
        	var pages = this.getAllPages();
        	additionalPages.forEach(function(url) {
        		if (!pages[url]) {
        			pages[url] = { done: false, nrOfRetries: 0, url: url };
        		}
        	});
        	this.storageService.set(STORAGE_KEYS.PAGES, pages);
        },

        savePage: function(page) {
        	var pages = this.getAllPages();
        	pages[page.url] = page;
        	this.storageService.set(STORAGE_KEYS.PAGES, pages);
            this.storageService.set(STORAGE_KEYS.LAST_VISITED_URL, page.url);
        },

        getNextPageFromQueue: function() {
        	var nextPage = null;

        	var pages = this.getAllPages();

        	for(var url in pages) {
        		var page = pages[url];
        		if (page.url && !page.done) {
        			nextPage = page;
        			break;
        		}
        	}

            if (nextPage) {
                this.storageService.set(STORAGE_KEYS.LAST_VISITED_URL, nextPage.url);
            }

        	return nextPage;
        },
        
        goto: function(page) {
            ipc.send('goto', page.url);
        },

        quit: function() {
        	ipc.send('quit');
        },

        getAllPages: function() {
        	var pages = this.storageService.get(STORAGE_KEYS.PAGES) || {};
        	this.storageService.set(STORAGE_KEYS.PAGES, pages);
        	return pages;
        }
    };

    if (document.body.textContent.trimmed() === "Veuillez patienter quelques secondes...") {

    	setTimeout(function() {
    		location.reload();
    	}, 10000);

    } else { 
		var options = {};
	    var storageService = new crawlThemAll.FileStorageService();
	    var routeService = new crawlThemAll.RouteService();

	    crawlThemAll.instance = new crawlThemAll.Indexer(options, storageService, routeService);
	    
	    crawlThemAll.instance.start();
	}

    
})();