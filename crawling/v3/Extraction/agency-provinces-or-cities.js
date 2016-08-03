(function() {

	crawlThemAll.extractionScript = {
		extract: function() {

			var pages = $('td.align-left[nowrap] > a').toArray().getLinks();
			
			return pages;
		}
	}
})();
