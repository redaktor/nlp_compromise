

//::NODE::
  var lang = 'en';
//::
var pos_data = (function() {
  
//::NODE::
if (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");
//::
var zip = { particles: 
   [ 'together',
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
     'back',
     'forth',
     'along',
     'apart',
     'way' ],
  cs: 
   [ 'woul|d',
     'wi|ll',
     'ha|ve',
     'a|m',
     'i|s',
     'wa|s',
     'ha|s',
     'a|re',
     'not' ],
  contractions: 
   { 'would\'ve': [ 'would', 'have' ],
     'could\'ve': [ 'could', 'have' ],
     'should\'ve': [ 'should', 'have' ],
     cannot: [ 'can', 'not' ],
     'i\'d': [ 'i', 'would' ],
     'i\'ll': [ 'i', 'will' ],
     'i\'ve': [ 'i', 'have' ],
     'i\'m': [ 'i', 'am' ],
     'he\'d': [ 'he', 'would' ],
     'he\'ll': [ 'he', 'will' ],
     'he\'s': [ 'he', 'was' ],
     'she\'d': [ 'she', 'would' ],
     'she\'ll': [ 'she', 'will' ],
     'she\'s': [ 'she', 'was' ],
     'it\'ll': [ 'it', 'will' ],
     'it\'s': [ 'it', 'was' ],
     'we\'d': [ 'we', 'would' ],
     'we\'ll': [ 'we', 'will' ],
     'we\'ve': [ 'we', 'have' ],
     'we\'re': [ 'we', 'are' ],
     'they\'d': [ 'they', 'would' ],
     'they\'ll': [ 'they', 'will' ],
     'they\'ve': [ 'they', 'have' ],
     'they\'re': [ 'they', 'are' ],
     'who\'s': [ 'who', 'was' ],
     'when\'s': [ 'when', 'was' ],
     'where\'s': [ 'where', 'was' ],
     'why\'s': [ 'why', 'was' ],
     'how\'s': [ 'how', 'was' ],
     'that\'s': [ 'that', 'is' ],
     'what\'s': [ 'what', 'is' ] },
  ambiguousContractions: 
   { 'he\'s': 'he',
     'she\'s': 'she',
     'it\'s': 'it',
     'who\'s': 'who',
     'when\'s': 'when',
     'where\'s': 'where',
     'why\'s': 'why',
     'how\'s': 'how' } }; 

  var main = (function () {
				zip.particles = zip.particles.reduce(helpFns.toObj, {});
				return zip;
			})();

//::NODE::
  if (typeof module !== "undefined" && module.exports) module.exports = main;
//::

  return main;
})();