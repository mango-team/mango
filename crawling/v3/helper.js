String.prototype.replaceAll = function(search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement || '');
};

String.prototype.replace = function(element, replacement) {
    return this.split(element).join(replacement || '');
};

String.prototype.trimmed = function() {
    return this.trim().split('\t').join('').split('\n').join('');
};

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

String.prototype.between = function(start, end) {
    return this.after(start).before(end);
};

String.prototype.after = function(str) {
    return this.split(str)[1];
};

String.prototype.before = function(str) {
    return this.split(str)[0];
};


Array.prototype.getLinks = function () {
	var list = [];
	this.forEach(function(selector) {
		jQuery(selector).each(function() {
			var $link = $(this);
			var href = $link.attr('href');
			list.push(href);
		});
	});

	return list;
};

window.crawlThemAll = window.crawlThemAll || {};

crawlThemAll.extend = function(target, source) {
  target = target || {};
  for (var prop in source) {
    if (typeof source[prop] === 'object') {
      target[prop] = extend(target[prop], source[prop]);
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
};

crawlThemAll.autoRefresh = function (timeout) {
  setTimeout(function() {
    location.reload();
  }, timeout);
};

crawlThemAll.debug = false;
if (!crawlThemAll.debug) {
  crawlThemAll.autoRefresh(60000);
}
