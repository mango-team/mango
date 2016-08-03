/*
search.js loops to create search results links based on post codes for each transaction type and each property type
*/

const fs = require('fs');
const ipc = require("electron").ipcRenderer;

function readPostCodeFile(path) {
    var fileContents = [];
        var file = "";
        file = fs.readFileSync(path).toString();
        file.split("\n").forEach(function(postCode) {  
            var cleanPostCode = postCode;            
            cleanPostCode = postCode.split(',')[0].toLowerCase().replace("é","e").replace("è","e").replace("ê","e").replace("ë","e").replace("ç","c").replace("\r", "");              
            //debugger;    
            fileContents.push(cleanPostCode);      
        }, this); 
    return fileContents;
}

(function($) {
    
    
    const TRANSACTIONS_TYPES = [
       "a-louer",
       "a-vendre"
    ]
       ;
    const PROPERTY_TYPES= [
       "maison",
        "bureau", 
        "industrie",
        "immeuble-de-rapport",
        "commerce", 
        "appartement",
        "terrain",
        "garage", 
        "autre",
        "projet-immobilier-neuf/maison-neuve",
        "projet-immobilier-neuf/appartement-neuf"
    ];
    
    var POST_CODES = readPostCodeFile("./pages/main-search/post-codes.txt"); 
    var links = []

    TRANSACTIONS_TYPES.forEach(function(transactionType) {    
        PROPERTY_TYPES.forEach(function(propertyType) {
            POST_CODES.forEach(function(postCode) {
            var countyName = postCode.split(";")[1];
            var postCodeNumber = postCode.split(";")[0];
            var url = "http://www.immoweb.be/fr/recherche/" + propertyType + "/" + transactionType + "/" + countyName + "/" + postCodeNumber;
            links.push(url);
                }, this);
        }, this);
    }, this);
      
    ipc.send('save-search-result-link', links);    

})(jQuery);