/*
    Crawl the property page to extract information
*/

const ipc = require("electron").ipcRenderer;
const fs = require('fs');

function readFile(path) {
    var fileContents = [];
        var file = "";
        file = fs.readFileSync(path).toString();
        file.split("\n").forEach(function(line) {              
            if(line != "")
            {
                fileContents.push(line);      
            }
        }, this);
        
    //Remove all empty lines
    // fs.writeFile("./pages/main-search/search-results.txt", fileContents.join("\n") + "\n", "utf8");

    return fileContents;
}

function getIdFromURL()
{
    var id = window.location.pathname.split("/")[7].substring(2, 9);
    return id;
}

function trimText(text) {
    return text.trim().split('\t').join('').split('\n').join('');
}

function ifContains(text, elements, defaultValue) {
    
    for (var i = 0; i < elements.length; i++) {
        if(text.indexOf(elements[i]) > -1) {
            return text.replace(elements[i], '');
        }
    }
    
    return defaultValue;
}

String.prototype.replaceAll = function(search, replacement) {
   var target = this;
   return target.replace(new RegExp(search, 'g'), replacement || '');
};

String.prototype.between = function(start, end) {
   return this.after(start).before(end);
};

String.prototype.after = function(str) {
   return this.split(str)[1];
};

String.prototype.before = function(str) {
   return this.split(str)[0];
};

String.prototype.trimmed = function() {
   return trimText(this);
};

    (function() {

    var SELECTORS = {
        LOCATION_DESCRIPTION : "ul.locationdescription > li",
        GENERAL_DESCRIPTION : "tr:nth-child(1) > td.box-white:nth-child(1) > table > tbody > tr:nth-child(2) >td.box-content:nth-child(2) > p",
        INTERIOR_DESCRIPTION : "tr:nth-child(1) > td.box-white:nth-child(3) > table > tbody > tr:nth-child(2) >td.box-content:nth-child(2) > p",
        EXTERIOR_DESCRIPTION : "tr:nth-child(3) > td.box-white:nth-child(1) > table > tbody > tr:nth-child(2) >td.box-content:nth-child(2) > p",            
        PRICE: 'li.pricefont > span',
        ONLINE_DATE: '#column-central > table.box-blue > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(1) > div:nth-child(3) > div:nth-child(1) > span:nth-child(2)',    
        ZIPCODE_AND_LOCALITY: 'ul.locationinfo li:nth-child(2)',
        TITLE: '#column-central > div > h2',
        DESCRIPTION: '#column-central > div[align=left]',
        DESCRIPTION_PLUS : "#spnShowB",
        PRO_REF: '#column-central > table > tbody > tr > td:nth-child(1) > table:nth-child(12) > tbody > tr > td > table > tbody > tr:nth-child(2) > td.box-content > table > tbody > tr > td.contact-agency-colright > p:nth-child(2)',
        PRO_NAME: '#column-central > table > tbody > tr > td:nth-child(1) > table:nth-child(12) > tbody > tr > td > table > tbody > tr:nth-child(2) > td.box-content > table > tbody > tr > td:nth-child(1) > ul > li.nom',
        PRO_ADDRESS: '#column-central > table > tbody > tr > td:nth-child(1) > table:nth-child(12) > tbody > tr > td > table > tbody > tr:nth-child(2) > td.box-content > table > tbody > tr > td:nth-child(1) > ul > li.adress',
        CONTACT_PHONE: '#popPhone > div > div.popDivTel',
        PICTURE: 'a.colorboxSlider.openBoxButton p', 
        PROPERTY_OFFLINE: 'table.box-stroke > tbody > tr:nth-child(2) > td[align=center] > ul', 
        IS_PROPERTY_RENTED: '#column-central > div[align=left] > h2'
    };

    function getDescription(){
        $(SELECTORS.ZIPCODE_AND_LOCALITY + ' font').remove();
            var id = getIdFromURL();
            
            //var proId = getParameterByName('xidclient', $('.logo-vendeur a').attr('href'));
            //var proReference = $(SELECTORS.PRO_REF).innerHTML.trimmed().replaceAll('&nbsp;').between('Agence:', '</b>');
            // var proName = $(SELECTORS.PRO_NAME).text();
            // var proAddress = $(SELECTORS.PRO_ADDRESS).innerHTML.trimmed().before('<br>');
            
            //debugger;
            
            // Get Location Description
            var locationDescription = $(SELECTORS.LOCATION_DESCRIPTION);
            var liveableSurface = "";
            var freedOn = "";
            var numberOfRooms = "";
            var fieldArea = "";
            
            locationDescription.each(function(idx, elem) {  
                //debugger; 
                var li = elem.innerHTML;             
                if(li.contains("chambres"))
                {
                    numberOfRooms = li.before('&nbsp;');
                }
                else if(li.contains("surface habitable de"))
                {
                    liveableSurface = li.between('surface habitable de ', ' m²');
                }
                else if(li.contains("Terrain de"))
                {
                    fieldArea = li.after("Terrain de").before("m²").trimmed();;
                }
                else if(li.contains("Libre le"))
                {                               
                    freedOn = li.after(':').trimmed();
                }
            });
            
            // Get General Description
            var generalDescription = $(SELECTORS.GENERAL_DESCRIPTION);
            var neighborhood = "";
            var residentialArea = false;
            var urbanArea = false;
            var otherGeneralDescription = "";
            var propertyCondition = "";
            var numberOfFront = 0;
            var numberOfLevel = 0;
            var numberOfLodging = 0;
            var tvDistribution = false;
            var parlophone = false;
            var sewerConnection = false;
            var buildingYear = "";
            var insideParking ="";
            var elevator = false;            
            var reconditionned = false;

            generalDescription.each(function(idx, elem) {  
                //debugger; 
                var p = elem.innerHTML;             
                if(p.contains("Quartier ou lieu-dit"))
                {
                    neighborhood =  p.before(':').trimmed();
                }
                else if(p.contains("Libre le"))
                {      
                    // Already taken in the location desctription                          
                    //freedOn = p.text().after('Libre le : ');
                }
                else if(p.contains("Résidentiel"))
                {
                    residentialArea = true;
                }
                else if(p.contains("Urbain"))
                {
                    urbanArea = true;
                }
                else if(p.contains("état"))
                {
                    propertyCondition = p.before("état").trimmed();
                }
                else if(p.contains("Nombre de façades"))
                {                               
                    numberOfFront = p.after(':').trimmed();
                }
                else if(p.contains("Nombre d'étages"))
                {                               
                    numberOfLevel = p.after(":").trimmed();
                }
                else if(p.contains("Nombre de logements"))
                {                               
                    numberOfLodging = p.after(':').trimmed();
                }
                else if(p.contains("Télédistribution"))
                {
                    tvDistribution = true;
                }
                else if(p.contains("Parlophone"))
                {
                    parlophone = true;
                }
                else if(p.contains("Raccordement à l'égout"))
                {
                    sewerConnection = true;
                }
                else if(p.contains("Année de construction"))
                {                               
                    buildingYear = p.after(":").trimmed();
                }
                else if(p.contains("Ascenseur"))
                {                               
                    elevator = true;
                }
                else if(p.contains("Raccordement à l'égout"))
                {
                    sewerConnection = true;
                }
                else if(p.contains("Remis à neuf"))
                {
                    reconditionned = true;
                }
                else
                {                    
                    otherGeneralDescription += p.trimmed() + ", ";
                }
            });
            
            // Interior description
            var interiorDescription = $(SELECTORS.INTERIOR_DESCRIPTION);
            var hasLivingroom = false;
            var hasEatingArea = false;
            var hasOffice = false;
            var numberOfBathroom = 0;
            var numberOfShower = 0;
            var typeOfKitchen = "";
            var hasCave = false;
            var numberOfToilet = 0;
            var hasLaundryRoom = false;
            var otherInteriorDescription = "";
            var bedrooms = "";            
            var openBonfire = 0;

            interiorDescription.each(function(idx, elem) {  
                //debugger; 
                var p = elem.innerHTML;             
                if(p.contains("Living"))
                {
                    hasLivingroom =  true;
                }
                else if(p.contains("Salle a manger"))
                {
                    hasEatingArea = true;
                }
                else if(p.contains("Bureau"))
                {
                    hasOffice = true;
                }
                else if(p.contains("Cuisine"))
                {                               
                    typeOfKitchen += p.after(':').trimmed() + ', ';
                }
                else if(p.contains("Salles de bains"))
                {                               
                    numberOfBathroom = p.after(":").trimmed();
                }
                else if(p.contains("Salles de douches"))
                {                               
                    numberOfShower = p.after(":").trimmed();
                }
                else if(p.contains("Cave"))
                {
                    hasCave = true;
                }
                else if(p.contains("Toilettes"))
                {
                    numberOfToilet = p.after(':').trimmed();
                }
                else if(p.contains("Buanderie"))
                {
                    hasLaundryRoom =  true;
                }
                else if (p.contains("Chambre"))
                {
                     bedrooms += p.after(':').trimmed() + ', ';
                } 
                else if(p.contains("Feux ouverts"))
                {
                    openBonfire = p.after(':').trimmed();
                }
                else
                {                    
                    otherInteriorDescription += p.trimmed() + ", ";
                }
            });
            // Exterior description
            var exteriorDescription = $(SELECTORS.EXTERIOR_DESCRIPTION);
            var privateGarden = "";
            var totalBuildableSurfaceOnSoil = "";
            var otherExteriorDescription = "";
            var gardenOrientation = "";
            var terrace = "";
            
            exteriorDescription.each(function(idx, elem) {  
                //debugger; 
                var p = elem.innerHTML;             
                if(p.contains("Jardin privé"))
                {
                    privateGarden += p.after(':').trimmed() + ', ';
                }
                else if(p.contains("Surface constructible totale au sol"))
                {
                    totalBuildableSurfaceOnSoil += p.after(':').trimmed() + ', ';
                }
                else if(p.contains("Aucune information disponible"))
                {
                    // Do nothing, all exterior description related properties are empty
                } 
                else if(p.contains("Orientation du jardin"))
                {
                    gardenOrientation += p.after(':').trimmed() + ', ';
                }
                else if(p.contains("Terrasse"))
                {
                    terrace = p.after(':').trimmed() + ', ';
                }               
                else
                {                    
                    otherExteriorDescription += p.trimmed() + ", ";
                }

            });
            
            // Other description on the page
            var contactPhone = $(SELECTORS.CONTACT_PHONE).text();        
            var price = $(SELECTORS.PRICE).text().trimmed().before(' ');            
            var priceReccurence = $('.locationprice .title b').text();
            var onlineDate = $(SELECTORS.ONLINE_DATE).text().before("Vues").replaceAll(' ');
            var zipCode = $(SELECTORS.ZIPCODE_AND_LOCALITY).text().before('-');
            var locality = $(SELECTORS.ZIPCODE_AND_LOCALITY).text().after('-'); 
            var title = $(SELECTORS.TITLE).text();
            var descripition = $(SELECTORS.DESCRIPTION).html().trimmed().after('<br>').before("<form") + "\n\nPlus d'informations :\n" +  ($(SELECTORS.DESCRIPTION_PLUS).html() != null ? $(SELECTORS.DESCRIPTION_PLUS).html().trimmed().before("<div") : "");
            var isAlreadyRented = $(SELECTORS.IS_PROPERTY_RENTED).html() != null ? $(SELECTORS.IS_PROPERTY_RENTED).html().contains('Ce bien est loué') ? "Yes" : "No" : "";
        return {
            id: id,
            
            // proId: proId,
            // proReference: proReference,
            // proName: proName,
            // proAddress: proAddress,
            
            contactPhone: contactPhone,        
            price: price,
            priceReccurence: priceReccurence,
            onlineDate: onlineDate,
            zipCode: zipCode,
            locality: locality,            
            title: title,
            descripition: descripition,
            isAlreadyRented : isAlreadyRented,
            // Location description
            liveableSurface: liveableSurface,
            numberOfRooms:  numberOfRooms,
            freedOn: freedOn,
            fieldArea : fieldArea,
            // General description
            neighborhood : neighborhood,
            residentialArea : residentialArea,
            urbanArea : urbanArea,
            otherGeneralDescription : otherGeneralDescription,
            propertyCondition : propertyCondition,
            numberOfFront : numberOfFront,
            numberOfLevel : numberOfLevel,
            numberOfLodging : numberOfLodging,
            tvDistribution : tvDistribution,
            parlophone : parlophone,
            sewerConnection : sewerConnection,
            buildingYear : buildingYear,
            insideParking : insideParking,
            elevator : elevator,         
            reconditionned : reconditionned,   
            // Interior description            
            hasLivingroom : hasLivingroom,
            hasEatingArea : hasEatingArea,
            hasOffice : hasOffice,
            numberOfBathroom : numberOfBathroom,
            numberOfShower : numberOfShower,
            typeOfKitchen : typeOfKitchen,
            hasCave : hasCave,
            numberOfToilet : numberOfToilet,
            hasLaundryRoom : hasLaundryRoom,
            otherInteriorDescription : otherInteriorDescription,
            bedrooms : bedrooms,
            // Exterior description
            privateGarden : privateGarden,
            totalBuildableSurfaceOnSoil : totalBuildableSurfaceOnSoil,
            otherExteriorDescription: otherExteriorDescription,
            gardenOrientation : gardenOrientation,
            terrace : terrace,
            openBonfire : openBonfire,
            
        };
    }

    function getLinks() {    
        var pictureList = $(SELECTORS.PICTURE);
        var pictureLinks = [];
        pictureList.each(function(idx, picture) {
            var pictureLink = $(picture).attr('style').after('background-image:url(').before(')');
                pictureLink = pictureLink.replace('/M_', '/');
                pictureLinks.push(pictureLink);
            });        
        return pictureLinks;
    }

try {
    var propertyPages = readFile("./pages/main-search/search-results.txt"); 
    var persistedData = readFile("../../crawled/persisted-data-property.txt");   
    var currentResultPageNb = parseInt(persistedData.find(function(item) {return item.contains("nextPropertyNb")}).replace(" ", "").split(":")[1]);  
    var currentPropertyToCrawl = propertyPages.length >= currentResultPageNb ? propertyPages[currentResultPageNb] : null;
    var nextPropertyNb = currentResultPageNb + 1;
    var nextPropertyToCrawl = propertyPages.length >= nextPropertyNb ? propertyPages[nextPropertyNb] : null; 
    var propertyProcessed = parseInt(persistedData.find(function(item) {return item.contains("propertyProcessed")}).replace(" ", "").split(":")[1]) + 1;   

    //debugger;

    // Resume at the property stopped previously
    if(!window.location.href.contains(currentPropertyToCrawl))
    {   
        location.assign(currentPropertyToCrawl);
    }
    
    var description = null;
    var links = [];
    
    if(!($(SELECTORS.PROPERTY_OFFLINE).html() != null && $(SELECTORS.PROPERTY_OFFLINE).html().contains("Désolé, mais ce bien est soit loué, soit vendu ou n'a jamais existé dans notre database.")))
    {
        description= getDescription();
        links = getLinks();   
    }
    else
    {
        //ipc.send('log-error', "Property page with no result");      
    }
    
    var data = {
        description,
        links,
        nextPropertyNb,
        propertyProcessed
    };    
    
    //debugger;
    
    if(data.description != null && (data.description.otherExteriorDescription != "" || data.description.otherInteriorDescription != "" || data.description.otherGeneralDescription != ""))
    {
        //ipc.send('log-error', "Forgotten description : " + data.description.id + " exterior : '" + data.description.otherExteriorDescription + "', interior : '" + data.description.otherInteriorDescription + "', general : '" + data.description.otherGeneralDescription + "'");      
    }
        
    ipc.send('crawled-property', data);

    if (nextPropertyToCrawl != null)
    {       
        location.assign(nextPropertyToCrawl);
    }
    else
    {
        this.stop();
    }
}
catch(e)
{
   ipc.send('log-error', "Exception : l" + e.stack + ", " + e);
   nextPropertyToCrawl = propertyPages.length >=  + 1 ? propertyPages[nextPropertyNb +1] : null; 
   if (nextPropertyToCrawl != null)
    {       
        location.assign(nextPropertyToCrawl);
    }
    else
    {
        this.stop();
    }      
}

})();