/**
 * wrapper module for adjective's methods
 * @module src/parents/adjective/index
 */
if (typeof lang != 'string') var lang = 'en';
var schema = require('../../data/'+lang+'/schema');
var cache = require('../../cache');
var to_adverb = require('./conjugate');
var to_noun = require('./conjugate/to_noun');
var to_comparative = require('./conjugate/to_comparative');
var to_superlative = require('./conjugate/to_superlative');
	
module.exports = function(str, next, last, token) {
  var the = this;
  the.word = str || '';
	
  the.conjugate = function() {
		if (typeof the.word != 'string' || the.word === '') { return {}; }
		var cached = cache.get(the.word, 'adjectiveConjugate');
		if (cached) {
			return cached;
		}
    return cache.set(the.word, {
      comparative: to_comparative(the.word),
      superlative: to_superlative(the.word),
      adverb: to_adverb(the.word),
      noun: to_noun(the.word)
    }, 'adjectiveConjugate');
  }
	cached = cache.get(the.word, 'adjectiveWhich');
  the.which = (cached) ? cached : cache.set(the.word, (function() {
    if (the.word.match(/..est$/)) {return schema['JJS']}
    if (the.word.match(/..er$/))  {return schema['JJR']}
    return schema['JJ'];
  })(), 'adjectiveWhich');

  return the;
};

// console.log(new Adjective('crazy'))
