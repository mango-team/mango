(function() {

	const ipc = require("electron").ipcRenderer;

	var SELECTORS = {
	};

	var BASE_URL = 'http://www.immoweb.be/fr/global.prf.cfm?'; //'http://www.immoweb.be/fr/gallery?'

	crawlThemAll.extractionScript = {
		extract: function() {

			var pages = [];

			$('.annonce-data td[align=left] a').each(function() {
				var $link = $(this);
				var link = BASE_URL + $link.attr('onclick').between('?', "'");
				pages.push(link);
			});

			$('#IWEB_IFRAME_ID_PRF').contents().find('.annonce-data td[align=left] a').each(function() {
				var $link = $(this);
				var link = BASE_URL + $link.attr('onclick').between('?', "'");
				pages.push(link);
			});
			
			return pages;
		}
	}
})();
