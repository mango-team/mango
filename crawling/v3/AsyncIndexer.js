(function() {
  const ipc     = require('electron').ipcRenderer;

  const STORAGE_KEYS = {
		LAST_VISITED_URL: 'LAST_VISITED_URL',
		PAGES: 'PAGES'
	};

  crawlThemAll.Indexer = function (options, localStorageService, remoteStorageService, routeService) {
    this.defaults = {
      retries: 4,
      timeout: 10000,
      instanceName: '[INSTANCE_NAME]'
    };
    this.options = crawlThemAll.extend(this.defaults, options);
    this.localStorageService = localStorageService;
    this.remoteStorageService = remoteStorageService;
    this.routeService   = routeService;
  };//Indexer

  var proto = crawlThemAll.Indexer.prototype;

  proto.start = function () {
    var _this = this;
    if (crawlThemAll.debug) {
      debugger;
    }
    console.log(_this.options.instanceName);
    _this.setup();

    _this.crawlThisPage().then(function () {
      _this.crawNextPage().error(function () {
        _this.onError(arguments);
      })
    }).error(function () {
      _this.onError(arguments);
    });

  };//start

  proto.refreshOnTimeout = function () {
    setTimeout(function () {
      location.reload();
    }, this.timeout);
  };

  proto.setup = function () {
    if (!crawlThemAll.debug) {
      this.refreshOnTimeout();
    }
    this.localStorageService.setup(this.options.instanceName);
  };//setup

  proto.crawlThisPage = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
      _this.getLastPage()
           .error(reject)
           .then(function(page) {
             if(!page.done) {
               if (location.href.contains(page.url)) {
                 var additionalPages = null;

                 page.tried++;
                 page.attempts.push(new Date());

                 if (page.tried < _this.options.retries) {
                   try {
                     additionalPages = _this.getAdditionalPagesToVisit(page);
                     page.done = true;
                     page.failed = false;
                   } catch(err) {
                       page.errorLogs.push(err.stack);
                       page.failed = true;
                   }
                 } else {
                   page.done = true;
                 }

                 _this.savePage(page)
                      .error(reject)
                      .then(function () {
                        if(additionalPages && additionalPages.length > 0) {
                          _this.addToQueue(additionalPages)
                               .error(reject)
                               .then(resolve);
                        }
                      });
               } else {
                 _this.goto(page);
               }
             } else {
               resolve();
             }
           });
    });
  };//crawlThisPage

  proto.getLastPage = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
      var lastVisitedUrl = _this.localStorageService.get(STORAGE_KEYS.LAST_VISITED_URL);
      var newPage = {
        done: false,
        failed: false,
        tried: 0,
        url: location.href,
        errorLogs: [],
        attempts: []
      };
      if(!lastVisitedUrl) {
        resolve(newPage);
      } else {
        _this.remoteStorageService
             .getByUrl(lastVisitedUrl)
             .error(reject)
             .then(function (lastPage) {
               if(!lastPage) {
                 lastPage = newPage;
               }
               resolve(lastPage);
             });
      }
    });
  };//getLastPage

  proto.getAdditionalPagesToVisit = function (page) {
    var additionalPages  = null;
    var extractionStrict = this.getExtractionScript(page);
    if (extractionStrict) {
      additionalPages = extractionStrict.extract();
    }
    return additionalPages;
  };//getAdditionalPagesToVisit

  proto.getExtractionScript = function (page) {
      var script   = null;
      var pageName = this.routeService.determinePage(page.url);
      if (pageName) {
        script = this.routeService.readFile(pageName);
      }
      return script;
  };//getExtractionScript

  proto.addToQueue = function (additionalPages) {
    return this.remoteStorageService.addPages(additionalPages);
  };//addToQueue

  proto.savePage = function (page) {
    this.localStorageService.set(STORAGE_KEYS.LAST_VISITED_URL, page.url);
    return this.remoteStorageService.addPage(page);
  };//savePage

  proto.crawNextPage = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
      _this.remoteStorageService
           .getNextPageFromQueue()
           .error(reject)
           .then(function (nextPage) {
             if (nextPage) {
               _this.localStorageService.set(STORAGE_KEYS.LAST_VISITED_URL, nextPage.url);
               _this.goto(nextPage);
             } else {
               _this.quit();
             }
           });
    });
  };//crawNextPage

  proto.onError = function (err) {
    console.log(err);
    //this.quit();
  };

  proto.goto = function (page) {
    ipc.send('goto', page.url);
  };//goto

  proto.quit = function () {
    ipc.send('quit');
  };//quit

  if (document.body.textContent.trimmed() === "Veuillez patienter quelques secondes..." && !crawlThemAll.debug) {
    setTimeout(function() {
      location.reload();
    }, 10000);
  } else {
    var options = {};
    var localStorageService = new crawlThemAll.LocalStorageService();
    var remoteStorageService = new crawlThemAll.RemoteStorageService();
    var routeService = new crawlThemAll.RouteService();

    crawlThemAll.instance = new crawlThemAll.Indexer(options, localStorageService, remoteStorageService, routeService);
    crawlThemAll.instance.start();
  }

})();
