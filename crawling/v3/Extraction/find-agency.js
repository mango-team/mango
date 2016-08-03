(function() {

	var SELECTORS = {
		NETWORKS: '#column-central > table > tbody > tr:nth-child(3) > td.box-content > table:nth-child(6) > tbody a',
        MAIN_BELGIUM_CITIES: '#column-central > table > tbody > tr:nth-child(3) > td.box-content > table:nth-child(9) > tbody a',
        PROVINCES: '#column-central > table > tbody > tr:nth-child(3) > td.box-content > table:nth-child(2) > tbody > tr a'
    };

	crawlThemAll.extractionScript = {
		extract: function() {

			var pages = [ SELECTORS.NETWORKS , SELECTORS.MAIN_BELGIUM_CITIES, SELECTORS.PROVINCES ].getLinks();

			//var pages = ['http://www.immoweb.be/fr/myimmo-agences-immobilieres.htm?typemot=age&idres=myimmo&id=11'];
			return pages;
		}
	}
})();
