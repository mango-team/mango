(function() {

var ipc = require("electron").ipcRenderer;

var SELECTORS = {
    GROUP_NAME: '#column-central > h2 > span:nth-child(1) > a',  
};

var PARENT_STORAGE_NAME = localStorage.getItem('last-pro-group');

function getDescription() {
    var groupName = $(SELECTORS.GROUP_NAME).text().after('Cette agence fait partie de ');
    $('h2.nopadding :first').children().remove();
    return {
        groupName,
        groupId: PARENT_STORAGE_NAME,
        id: getParameterByName('idclient'), 
        name: $('h2.nopadding').text().trim().split('(')[0].trim(), 
        numberOfActiveProperties: parseInt( $('h2.nopadding').text().split('(')[1].split('b')[0].trim() ), 
        pictureUrl: $('.Photo').attr('src'),
        phoneNumber: $('#popPhone:first .popDivTel').text().trim(),
        faxNumber: $('#popPhone:first .popDivFax').text().trim(),
        disponibilite: $('#popPhone:first .popDivALL').text().trim(),
        address: trimText($('.contact-agency .adress').text()).split('   ')[0],
        commune: trimText($('.contact-agency .adress').text()).split('   ')[1] + trimText($('.contact-agency .adress').text()).split('   ')[2],
        ipiNumber: trimText($('.Photo').parent().siblings('p').text()).replace('Agréé IPI n° ', ''),
        descriptionPictureUrl: $('td.img img').attr('src'),
    };
}

function getLinks() {
    var links = { general: {} };
    $('a[href="#onglet"]').each(function(index) {
        switch (index) {
            case 0:
                links.general.numberOfPropertiesForSale = parseInt($(this).text().split('b')[0].trim());
                break;
            case 1:
                links.general.numberOfPropertiesToRent = parseInt($(this).text().split('b')[0].trim());
                break;
            case 2:
                links.general.numberOfNewPropertiesForSale = parseInt($(this).text().split('b')[0].trim());
                break;
            case 3:
                links.general.numberOfNewPropertiesToRent = parseInt($(this).text().split('b')[0].trim());
                break;
            case 4:
                links.general.numberOfPropertiesForSaleWithNewPrices = parseInt($(this).text().split('b')[0].trim());
                break;
            case 5:
                links.general.numberOfPropertiesToRentWithNewPrices = parseInt($(this).text().split('b')[0].trim());
                break;
            default:
                break;
        }
    });
    
    return links;
}

var data = {
    description: getDescription(),
    links: getLinks()
};
ipc.send('crawled-pro', data);

localStorage.setItem('last-pro', data.description.id);


var parent = JSON.parse(localStorage.getItem(PARENT_STORAGE_NAME)) || {visited: []};

if(parent.visited.indexOf(data.description.id) < 0) {
    parent.visited.push(data.description.id);
    localStorage.setItem(PARENT_STORAGE_NAME, JSON.stringify(parent));
    history.back();    
} else {
    history.back();    
}

})();
