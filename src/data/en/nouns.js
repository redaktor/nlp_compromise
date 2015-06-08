

//::NODE::
  var lang = 'en';
//::

//::NODE::
if (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");
//::
var zip = { personBlacklist: 
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
     'partner',
     'the',
     'ave',
     'blvd',
     'uss',
     'ss',
     'for',
     'and',
     '&' ],
  entityBlacklist: 
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
     'the',
     '&' ],
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
   [ [ 'yours', 1 ],
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
					prps: zip.prps.reduce(helpFns.toObj, {}),
					pps: _pps,
					entityBlacklist: zip.entityBlacklist.reduce(helpFns.toObj, {}),
					personBlacklist: zip.personBlacklist,
				}
			})();

//::NODE::
  if (typeof module !== "undefined" && module.exports) module.exports = main;
//::
