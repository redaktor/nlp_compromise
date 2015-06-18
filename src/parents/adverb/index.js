/**
 * wrapper module for adverb's methods
 * @module src/parents/adverb/index
 */
if (typeof lang != 'string') lang = 'en';
var schema = require('../../data/'+lang+'/schema');
var cache = require('../../cache');
var to_adjective = require('./conjugate/to_adjective');
module.exports = function(str, next, last, token) {
  var the = this;
  the.word = str || '';
  the.next = next;
  the.last = last;
  the.conjugate = function() {
		var cached = cache.get(the.word, 'adverbConjugate');
		if (cached) {
			return cached;
		}
    return cache.set(the.word, {
      adjective: to_adjective(the.word)
    }, 'adverbConjugate');
  }
	cached = cache.get(the.word, 'adverbWhich');
  the.which = (cached) ? cached : cache.set(the.word, (function() {
    if (the.word.match(/..est$/)) {return schema['RBS']}
    if (the.word.match(/..er$/)) {return schema['RBR']}
    return schema['RB'];
  })(), 'adverbWhich');

  return the;
}

// console.log(new Adverb("suddenly").conjugate())
// console.log(adverbs.conjugate('powerfully'))
