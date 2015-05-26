
var lang = 'en';
var nouns = (function() {
  
//::NODE::
if (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");
//::
var zip = { entityBlacklist: 
   [ 'west',
     'western',
     'east',
     'eastern',
     'north',
     'northern',
     'south',
     'southern',
     'today',
     'yesterday',
     'tomorrow',
     'era',
     'century',
     'my',
     'your',
     'itself',
     'the' ],
  personBlacklist: 
   [ 'center',
     'house',
     'park',
     'square',
     'centre',
     'memorial',
     'school',
     'bridge',
     'university',
     'college',
     'foundation',
     'institute',
     'club',
     'museum',
     'hall',
     'arena',
     'stadium',
     'the',
     'ave',
     'blvd',
     'uss',
     'ss',
     'for' ],
  prps: 
   [ 'i',
     'you',
     'he',
     'she',
     'it',
     'we',
     'they',
     'me',
     'him',
     'her',
     'us',
     'them',
     'thou',
     'il',
     'elle',
     '\'em' ],
  pps: 
   [ [ 'mine', 0 ],
     [ 'yours', 1 ],
     [ 'his', 2 ],
     [ 'her', 3 ],
     [ 'its', 4 ],
     [ 'our', 5 ],
     [ 'their', 6 ],
     [ 'them', 6 ] ] }; 

  var main = (function () {
				var _pps = {}; 
				zip.pps.forEach(function(a) { _pps[a[0]] = zip.prps[a[1]]; });
				return { 
					pps: _pps,
					prps: zip.prps.reduce(helpFns.toObj, {}), 
					entityBlacklist: zip.entityBlacklist.reduce(helpFns.toObj, {}), 
					personBlacklist: zip.personBlacklist,
				}
			})();

//::NODE::
  if (typeof module !== "undefined" && module.exports) module.exports = main;
//::

  return main;
})();