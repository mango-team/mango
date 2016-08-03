(function() {
    
String.prototype.equals = function(text, invariantComparaison) {
    invariantComparaison = invariantComparaison || true;
    
    if(invariantComparaison)
        return this.toLowerCase() === text.toLowerCase(); 
    
    return this === text; 
};

String.prototype.contains = function(text, invariantComparaison) {
    invariantComparaison = invariantComparaison || true;
    
    if(invariantComparaison)
        return this.toLowerCase().indexOf(text.toLowerCase()) > -1; 
    
    return this.indexOf(text) > -1; 
};

String.prototype.textAfter = function(str) {
    return this.split(str)[1];
};

String.prototype.replace = function(element, replacement) {
    return this.split(element).join(replacement || '');
};

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

String.prototype.xpath = function() {
    return getElementByXpath(this);
};

window.$blockedInterval = setInterval(function() {
    //if(document.body.textContent.contains('Veuillez patienter quelques secondes...')) {
        location.reload(true);
    //}
}, 7000);

})();
