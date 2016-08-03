(function() {

    const fs = require('fs');

	window.crawlThemAll = window.crawlThemAll || {};


	crawlThemAll.FileStorageService = function (options) {
    this.defaults = {
      pathTemplate: './Storage/[INSTANCE]/[KEY].json'
    };
    this.options = crawlThemAll.extend(this.defaults, options);
  };

  crawlThemAll.FileStorageService.prototype = {
    setup: function (instanceName) {
        this.options.pathTemplate = this.options.pathTemplate.replace('[INSTANCE]', instanceName);
    },

    get: function(key) {
      var filePath = this.options.pathTemplate.replace('[KEY]', key);
      if (!fs.existsSync(filePath)) {
        return null;
      }

      var content = fs.readFileSync(filePath).toString();
      if(content) {
        var storageItem = JSON.parse(content);
        return storageItem.value;
      }
      return null;
    },

    set: function (key, value) {
      if (!key) return;
      var filePath = this.options.pathTemplate.replace('[KEY]', key);

      var storageItem = {
        value: value,
        addedOn: new Date()
      };

      fs.writeFileSync(filePath, JSON.stringify(storageItem, null, 4), { flag: 'w' });
    }
  };
})();
