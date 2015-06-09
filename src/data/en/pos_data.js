// var types = ['adjective', 'adverb', 'comparative', 'superlative', 'noun'];
// 0 means 'return null' for adverbs OR 'conjugate without more/most' for comparative and superlative.
// 1 means 'default behavior'

// types: infinitive, gerund, past, present, doer, future

/* singular nouns having irregular plurals */

if (!lang) {var lang = 'en';}

var helpFns = require("./helpFns");
exports.zip = { particles: 
   [ 'together',
     'in',
     'out',
     'on',
     'off',
     'of',
     'over',
     'under',
     'up',
     'down',
     'apart',
     'before',
     'after',
     'with',
     'about',
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
				exports.zip.particles = exports.zip.particles.reduce(helpFns.toObj, {});
				return exports.zip;
			})()
