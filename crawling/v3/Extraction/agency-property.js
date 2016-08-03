(function() {

	const ipc = require("electron").ipcRenderer;

	var SELECTORS = {
	};

	var BASE_URL = 'http://www.immoweb.be/fr/global.prf.cfm?'; //'http://www.immoweb.be/fr/gallery?'

	crawlThemAll.extractionScript = {
		extract: function() {

			var pages = [];

			//TODO: multiple result pages
			
			var properties = $('#IWEB_IFRAME_ID_PRF').contents().find('.result-m > a').toArray().getLinks();

			ipc.send('properties', properties);

			return pages;
		}
	}
})();
