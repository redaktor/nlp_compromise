
var lang = 'en';
var pos_data = (function() {
  
if (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");
var zip = { particles: 
   [ 'do',
     'together',
     'in',
     'out',
     'on',
     'off',
     'of',
     'with',
     'over',
     'under',
     'up',
     'down',
     'about',
     'before',
     'after',
     'to',
     'through',
     'onto',
     'around',
     'behind',
     'above',
     'away',
     'across',
     'ahead',
     'upon',
     'aback',
     'forth',
     'along',
     'apart',
     'way' ],
  cs: [ 'woul|d', 'wi|ll', 'ha|ve', 'a|m', 'i|s', 'a|re', 'not' ],
  contractions: 
   { would: [ 2 ],
     could: [ 2 ],
     should: [ 2 ],
     can: [ 6 ],
     i: [ 0, 1, 2, 3 ],
     he: [ 0, 1, 4 ],
     she: [ 0, 1, 4 ],
     it: [ 1, 4 ],
     we: [ 0, 1, 2, 5 ],
     they: [ 0, 1, 2, 5 ] } }; 

  var main = (function () {
				zip.particles = zip.particles.reduce(helpFns.toObj, {});
				var c = zip.contractions;
				var _cs = [];
				for (var k in c) { c[k].forEach(function(i){ var a = zip.cs[i].split('|'); _cs[k+((a[1]) ? "'"+a[1] : a[0])] = [k,a.join('')]; }) }
				zip.contractions = _cs;
				return zip;
			})();

  if (typeof module !== "undefined" && module.exports) module.exports = main;

  return main;
})();