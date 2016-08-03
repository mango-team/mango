(function() {
	const webFrame = require('electron').webFrame;
	const fs = require('fs');
	
	crawlThemAll.RouteService = function() {

	};

	crawlThemAll.RouteService.prototype = {
		determinePage: function(pageUrl) {
			if (pageUrl == 'http://www.immoweb.be/fr/') {
				return 'Extraction/home.js';
			}

			if (pageUrl == 'http://www.immoweb.be/fr/recherche-agence-immobiliere-belgique.htm?typemot=age&mycurrent_section=global&') {
				return 'Extraction/find-agency.js';
			}

			if (pageUrl.contains('typemot=age') && pageUrl.contains('idres=')) {
				return 'Extraction/agency-networks.js';
			}

			if (pageUrl.contains('typemot=age') && pageUrl.contains('idclient')) {
				return 'Extraction/agency.js';
			}

			if (pageUrl.contains('http://www.immoweb.be/fr/global.prf.cfm?')) {
				return 'Extraction/agency-property.js';
			}

			if (pageUrl.contains('typemot=age&mycurrent_section=global&zip=') || pageUrl.contains('typemot=age&mycurrent_section=global&prv=')) {
				return 'Extraction/agency-provinces-or-cities.js';
			}

			return null;
		},

		readFile: function(fileName) {
			var js = fs.readFileSync(fileName).toString();
			webFrame.executeJavaScript(js);
			return crawlThemAll.extractionScript;
		}
	};

})();
