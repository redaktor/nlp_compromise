var _ = require("../../_");

exports.zip = { particles: 
   [ 'together',
     'in',
     'out',
     'on',
     'off',
     'away',
     'back',
     'over',
     'under',
     'up',
     'down',
     'together',
     'apart',
     'into',
     'for',
     'against',
     'after',
     'of',
     'about',
     'to',
     'through',
     'onto',
     'around',
     'behind',
     'above',
     'across',
     'ahead',
     'upon',
     'aback',
     'forth',
     'along',
     'way',
     'with' ],
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
     'she\'d': [ 'she', 'would' ],
     'she\'ll': [ 'she', 'will' ],
     'it\'ll': [ 'it', 'will' ],
     'we\'d': [ 'we', 'would' ],
     'we\'ll': [ 'we', 'will' ],
     'we\'ve': [ 'we', 'have' ],
     'we\'re': [ 'we', 'are' ],
     'they\'d': [ 'they', 'would' ],
     'they\'ll': [ 'they', 'will' ],
     'they\'ve': [ 'they', 'have' ],
     'they\'re': [ 'they', 'are' ],
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
     'how\'s': 'how' } }
module.exports = (function () {
				exports.zip.particles = exports.zip.particles.reduce(_.toObj, {});
				return exports.zip;
			})();