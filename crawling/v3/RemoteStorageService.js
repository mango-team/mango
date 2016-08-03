(function () {
  var http = require('http');

  var httpRequest = function (method, path, data, isJson, callback) {
    var options = {
      host: 'localhost',
      port: '1000',
      path: path,
      method: method,
    };

    if (isJson && data) {
      data = JSON.stringify(data);
      options.headers = {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }

    var req = http.request(options, function (response) {
      var responseBody = '';
      response.on('data', function (chunk) {
        responseBody += chunk;
      });

      response.on('end', function () {
        if (response
        &&  response.headers["content-type"]
        &&  response.headers["content-type"].indexOf("json") > -1) {
          responseBody = JSON.parse(responseBody);
        }
        callback(null, responseBody);
      });
    });

    req.on('error', (e) => {
      callback(e);
    });

    if (data) {
      req.write(data);
    }

    req.end();
  };

  crawlThemAll.RemoteStorageService = function () {

  };

  var proto = crawlThemAll.RemoteStorageService.prototype;

  proto.getByUrl = function (url) {
    return new Promise(function (resolve, reject) {
      httpRequest('POST', '/pages/byUrl', {url:url}, true, function (err, data) {
        if (err) {
          reject(err);
        }else {
          resolve(data);
        }
      });
    });
  };

  proto.addPages = function (additionalPages) {
    return new Promise(function (resolve, reject) {
      httpRequest('POST', '/pages', additionalPages, true, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

  proto.addPage = function (page) {
    return new Promise(function (resolve, reject) {
      httpRequest('POST', '/pages/add', page, true, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

  proto.getNextPageFromQueue = function () {
    return new Promise(function (resolve, reject) {
      httpRequest('GET', '/pages/next', null, false, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

})();
