(function() {

var ipc = require("electron").ipcRenderer;

var SELECTORS = {
    ONLINE_DATE: '#column-central > table.box-blue > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(1) > div:nth-child(3) > div > span:nth-child(2)',
    ZIPCODE: '#column-central > table.box-blue > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(3) > ul:nth-child(4) > span:nth-child(3) > li',
    LIVEABLE_SURFACE: '#column-central > table.box-blue > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(3) > ul.locationdescription > li:nth-child(2)',
    FREED_ON: '#column-central > table.box-blue > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(3) > ul.locationdescription > li:nth-child(3)',
    PRICE: '#column-central > table.box-blue > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(3) > ul.locationprice > li.pricefont > span',
    NR_OF_ROOMS: '#column-central > table.box-blue > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(3) > ul.locationdescription > li:nth-child(1)',
    ZIPCODE_AND_LOCALITY: '#column-central > table.box-blue > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(3) > ul:nth-child(4) > span:nth-child(3) > li',
    TITLE: '#column-central > div > h2',
    DESCRIPTION: '#column-central > div[align=left]',
    PRO_REF: '#column-central > table > tbody > tr > td:nth-child(1) > table:nth-child(12) > tbody > tr > td > table > tbody > tr:nth-child(2) > td.box-content > table > tbody > tr > td.contact-agency-colright > p:nth-child(2)',
    PRO_NAME: '#column-central > table > tbody > tr > td:nth-child(1) > table:nth-child(12) > tbody > tr > td > table > tbody > tr:nth-child(2) > td.box-content > table > tbody > tr > td:nth-child(1) > ul > li.nom',
    PRO_ADDRESS: '#column-central > table > tbody > tr > td:nth-child(1) > table:nth-child(12) > tbody > tr > td > table > tbody > tr:nth-child(2) > td.box-content > table > tbody > tr > td:nth-child(1) > ul > li.adress',
    CONTACT_PHONE: '#popPhone > div > div.popDivTel',
};

function getDescription(){
    $(SELECTORS.ZIPCODE_AND_LOCALITY + ' font').remove();
    
    return {
        id: getParameterByName('idbien'),
        
        proId: getParameterByName('xidclient', $('.logo-vendeur a').attr('href')),
        proReference: $(SELECTORS.PRO_REF).html().trimmed().replaceAll('&nbsp;').between('Agence:', '</b>'),
        proName: $(SELECTORS.PRO_NAME).text(),
        proAddress: $(SELECTORS.PRO_ADDRESS).html().trimmed().before('<br>'),
        
        contactPhone: $(SELECTORS.CONTACT_PHONE).text(),
        
        price: $(SELECTORS.PRICE).text().trimmed().before(' '),
        numberOfRooms:  $(SELECTORS.NR_OF_ROOMS).html().before('&nbsp;'),
        priceReccurence: $('.locationprice .title b').text(),
        onlineDate: $(SELECTORS.ONLINE_DATE).text().replaceAll(' '),
        zipCode: $(SELECTORS.ZIPCODE_AND_LOCALITY).text().before('-'),
        locality: $(SELECTORS.ZIPCODE_AND_LOCALITY).text().after('-'),
        liveableSurface: $(SELECTORS.LIVEABLE_SURFACE).text().between('surface habitable de ', ' m²'),
        freedOn: $(SELECTORS.FREED_ON).text().after('Libre le : '),
        title: $(SELECTORS.TITLE).text(),
        descripition: $(SELECTORS.DESCRIPTION).html().trimmed().after('<br>'),
    };
}

function getLinks() {
    var links = { pictures: [] };
    
    return links;
}

var description = getDescription();
var links = getLinks();

var data = {
    description,
    links
};

ipc.send('crawled-property', data);
history.back();

})();