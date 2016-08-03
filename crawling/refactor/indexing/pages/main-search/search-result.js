/*
search-result.js get the results page to crawl and loop through it then through its pagination to save all property links
*/

    const ipc = require("electron").ipcRenderer;
    const fs = require('fs');

function readFile(path) {
    var fileContents = [];
        var file = "";
        file = fs.readFileSync(path).toString();
        file.split("\n").forEach(function(line) {              
            fileContents.push(line);      
        }, this); 
    return fileContents;
}

(function() {

    var SELECTORS = {
        PAGINATION : ".nav-nummer > li > a",
        PROPERTY_LINK : "#result > div > a",
        NUMBER_OF_RESULTS : ".result-title-bolder",
    };
    
try {
    
    var persistedData = readFile("../../crawled/persisted-data.txt");             
    var resultPageLinks = readFile("../../crawled/search-result-links.txt");  
    var currentResultPageNb = parseInt(persistedData.find(function(item) {return item.contains("nextResultPageNb")}).replace(" ", "").split(":")[1]);  
    var currentResultPageToCrawl = resultPageLinks.length >= currentResultPageNb ? resultPageLinks[currentResultPageNb] : null;  
    var resultPagesProcessed = parseInt(persistedData.find(function(item) {return item.contains("propertyProcessed")}).replace(" ", "").split(":")[1]);   
    
    // Resume at the result page stopped previously
    if(!window.location.href.contains(currentResultPageToCrawl))
    {   
        location.assign(currentResultPageToCrawl);
    }
    
    var numberOfResults = parseInt($(SELECTORS.NUMBER_OF_RESULTS).html().split("annonces")[0].trim());
    
    if(isNaN(numberOfResults))
    {  
        var moreThan500Results = $(SELECTORS.NUMBER_OF_RESULTS).html().split("annonces")[0].split("de");
                
        if(moreThan500Results.length == 2)
        { // More than 500 results
            numberOfResults = parseInt(moreThan500Results[1].trim());
        }
        else // No results
        {            
            numberOfResults = 0;
        }
    }
    
    var currentPageNb = parseInt(persistedData.find(function(item) {return item.contains("nextPageNb")}).replace(" ", "").split(":")[1]);    
    var pageLinks = [];
    var propertyLinks = [];
    
    if(numberOfResults == 0)
    {
        ipc.send('log-error', "Result page with no result");        
    }
    else if(numberOfResults >= 500)
    {
        ipc.send('log-error', "Result page with full results"); 
        currentPageNb = null;
    }
    else
    {
        var pagination = $(SELECTORS.PAGINATION);    
        var aLinks = $(SELECTORS.PROPERTY_LINK);
        
        aLinks.each(function(idx, a) {
           var propertyLink = $(a).attr('href');
              propertyLinks.push(propertyLink);
        });
        
        pagination.each(function(idx, page) {
           var pageLink = $(page).attr('href');
           if($.inArray(pageLink, pageLinks) == -1 && $(page).attr('class') != "next")
           {        
              pageLinks.push(pageLink);
           }
        });
    }
    
    var nextPageToCrawl = pageLinks.length >= currentPageNb ? pageLinks[currentPageNb] : null;      
    var nextResultPageToCrawl = resultPageLinks.length >= currentResultPageNb + 1 ? resultPageLinks[currentResultPageNb + 1] : null;  
    resultPagesProcessed += propertyLinks.length;
      
    var data = {
        nextResultPageToCrawl,
        nextPageToCrawl,
        currentPageNb,
        currentResultPageNb,
        propertyLinks,
        resultPagesProcessed        
    };    
    
    //debugger;
    ipc.send('crawled-search-result', data); 
    
    if(data.nextPageToCrawl != null)
    {   
        location.assign(data.nextPageToCrawl);
    }
    else if (data.nextResultPageToCrawl != null)
    {
        location.assign(data.nextResultPageToCrawl);
    }
    else
    {
        this.stop();
    }
}
catch(e)
{
  ipc.send('log-error', "Exception :" + e);
  this.stop();      
}

})();