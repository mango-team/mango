var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Promise = require('bluebird');

var connectToDb = function (config, callback) {
  var db = mongoose.connect(config.db, config.options, function (err) {
    if (err) {
      console.error('Could not connect to MongoDB!');
      console.error(err);
    } else {
      mongoose.set('debug', config.debug);
    }

    if (callback && typeof callback == 'function') {
      callback(err, db);
    }
  });
};

var setupMongooseModels = function () {
  var Schema = mongoose.Schema;

  var PageSchema = new Schema({
    url: { type: String, required: true, unique: true, dropDups: true },
    done: Boolean,
    failed: Boolean,
    tried: Number,
    errorLogs: [],
    attempts: [Date]
  });
  mongoose.model('Page', PageSchema);

  var PropertyLinkSchema = new Schema({
    url: { type: String, required: true, unique: true, dropDups: true },
  });
  mongoose.model('PropertyLink', PropertyLinkSchema);
};

var setupExpressMiddlewares = function(app) {
  //enable cors
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};

var setupExpressRoutes = function(app) {
  var Page = mongoose.model('Page');
  var PropertyLink = mongoose.model('PropertyLink');

  app.get('/', function(req, res) {
    res.send('Hello World!');
  });

  app.post('/pages/byUrl', function (req, res) {
    if (!req.body || !req.body.url) {
      res.status(404).end();
    } else {
      Page.findOne({ url: req.body.url }).lean().exec(function (err, page) {
        if (err) {
          res.status(501).end(err);
        } else {
          res.json(page);
        }
      });
    }
  });

  app.post('/pages', function (req, res) {
    var additionalPages = req.body;

    if (!additionalPages || additionalPages.length < 1) {
      res.end('OK');
    } else {
      var requests = [];
      additionalPages.forEach(function (url) {
        var request = new Promise(function (resolve, reject) {
          Page.findOne({ url: url}, 'url', function (err, page) {
            if (err) {
              reject(err);
            } else {
              if (!page) {
                var newPage = new Page({
                  done: false,
                  failed: false,
                  tried: 0,
                  url: url,
                  errors: [],
                  attempts: []
                });

                newPage.save(function (err) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve();
                  }
                });
              } else {
                resolve();
              }
            }
          });

        });

        requests.push(request);
      });

      Promise.all(requests)
             .then(function () {
               res.end('OK');
             }).error(function (e) {
               res.status(501).end(e);
             });
    }
  });

  app.post('/pages/add', function (req, res) {
    if (!req.body || !req.body.url) {
      res.status(404).end();
    } else {
      Page.findOne({ url: req.body.url }, 'url', function (err, page) {
        if (err) {
          res.status(501).end(err);
        } else {
          if (page) {
            page.update(req.body, function (err) {
              if (err) {
                res.status(501).end(err);
              } else {
                res.end('OK');
              }
            });
          } else {
            var newPage = new Page(req.body);
            newPage.save(function (err) {
              if (err) {
                res.status(501).end(err);
              } else {
                res.end('OK');
              }
            });
          }
        }
      });
    }
  });

  app.get('/pages/next', function (req, res) {
    Page.count({ done: false }).exec(function (err, count) {
      if (err) {
        res.status(501).end(err);
      } else {
        if (!count) {
          res.json(null);
        } else {
          var random = Math.floor(Math.random() * count);
          Page.find({done: false}).skip(random).limit(1).lean().exec(function (err, pages) {
            if (err) {
              res.status(501).end(err);
            } else {
              res.json(pages[0]);
            }
          });
        }
      }
    });
  });

  app.post('/property-link', function (req, res) {
    var links = req.body;

    if (!links || links.length < 1) {
      res.end('OK');
    } else {
      var requests = [];
      links.forEach(function (url) {
        var request = new Promise(function (resolve, reject) {
          PropertyLink.findOne({ url: url}, 'url', function (err, link) {
            if (err) {
              reject(err);
            } else {
              if (!link) {
                var newLink = new PropertyLink({ url: url });

                newLink.save(function (err) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve();
                  }
                });
              } else {
                resolve();
              }
            }
          });

        });

        requests.push(request);
      });

      Promise.all(requests)
             .then(function () {
               res.end('OK');
             }).error(function (e) {
               res.status(501).end(e);
             });
    }
  });
};

module.exports = {
  start: function(config) {

    connectToDb(config.mongoose, function (err) {
      if (err) {
        return;
      }

      setupMongooseModels();

      var app = express();

      setupExpressMiddlewares(app);
      setupExpressRoutes(app);

      app.listen(config.port, function() {
        console.log('Process ' + process.pid + ' is listening to all incoming requests on port:' + config.port);
      });
    });
  }
};
