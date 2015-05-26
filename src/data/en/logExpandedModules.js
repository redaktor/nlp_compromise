var util = require('util'); 
var names = ["nouns_inflect.js","nouns.js","verbs_special.js","verbs_conjugate.js","verbs.js","adjectives_decline.js","adjectives_demonym.js","adjectives.js","adverbs_decline.js","numbers.js","dates.js","honorifics.js","abbreviations.js","multiples.js","pos_data.js","negate_data.js","firstnames.js","normalizations.js","suffixes.js","verb_rules.js","word_rules.js","schema.js","lexicon.js"];
names.forEach(function(n, i) { console.log( n ); console.log( util.inspect(require('./'+n), {depth: null}) ); });