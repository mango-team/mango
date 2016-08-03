(function() {

	var SELECTORS = {
	};

	crawlThemAll.extractionScript = {
		extract: function() {
			
			var pages = $('#IWEB_IFRAME_ID_RESGRP').contents().find('.annonce-data .align-left a').toArray().getLinks();

			return pages;
		}
	}
})();
