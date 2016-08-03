(function() {
	var SELECTORS = {
		FIND_AGENCIES: '#column-left > div > div:nth-child(7) > ul > li:nth-child(1) > a'
	};

	crawlThemAll.extractionScript = {
		extract: function() {
			
			var pages = [ SELECTORS.FIND_AGENCIES ].getLinks();

			return pages;
		}
	}
})();
