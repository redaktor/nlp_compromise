
var lang = 'en';
var nouns = (function() {
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
     'ss',
     'for' ],
  prps: 
   [ 'it',
     'they',
     'i',
     'them',
     'you',
     'she',
     'me',
     'he',
     'him',
     'ourselves',
     'us',
     'we',
     'thou',
     'il',
     'elle',
     '\'em',
     'yourself' ] }; 

  var main = (function () {
				var toO = function(h,s){ h[s]=true; return h; };
				return { 
					prps: zip.prps.reduce(toO, {}), 
					entityBlacklist: zip.entityBlacklist.reduce(toO, {}), 
					personBlacklist: zip.personBlacklist
				}
			})();

  if (typeof module !== "undefined" && module.exports) module.exports = main;

  return main;
})();