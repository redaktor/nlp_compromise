var util = require('util'); 
var names = ["nouns_inflect.js","nouns.js","verbs_special.js","verbs_conjugate.js","verbs.js","adjectives_decline.js","adjectives_demonym.js","adjectives.js","adverbs_irregular.js","numbers.js","dates.js","honorifics.js","abbreviations.js","normalizations.js","multiples.js","unambigousSuffixes.js","lexicon.js"];
names.forEach(function(n, i) { console.log( n ); console.log( require('./'+n) ); });