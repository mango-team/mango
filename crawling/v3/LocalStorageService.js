(function() {
	window.crawlThemAll = window.crawlThemAll || {};

	crawlThemAll.LocalStorageService = function () {
	};

	crawlThemAll.LocalStorageService.prototype = {
		setup: function (instanceName) {
			this.keyPrefix = instanceName;
		},

		get: function(key) {
			var stringifiedValue = localStorage.getItem(this.keyPrefix + '__' + key);
			if(stringifiedValue) {
				var storageItem = JSON.parse(stringifiedValue);
				return storageItem.value;
			}
			return null;
    },

		set: function (key, value) {
			if (!key) return;
			var storageItem = {
				value: value,
				addedOn: new Date()
			};

			var stringifiedValue = JSON.stringify(storageItem);
			localStorage.setItem(this.keyPrefix + '__' + key, stringifiedValue);
		}
	};
})();
