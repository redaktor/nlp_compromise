//wrapper for Adjective's methods
module.exports = function(str, next, last, token) {
  var the = this;
  the.word = str || '';
	
	var schema = require('../../data/'+lang+'/schema');
  var to_comparative = require('./conjugate/to_comparative');
  var to_superlative = require('./conjugate/to_superlative');
  var to_adverb = require('./conjugate/to_adverb');
  var to_noun = require('./conjugate/to_noun');
	
  the.conjugate = function() {
    return {
      comparative: to_comparative(the.word),
      superlative: to_superlative(the.word),
      adverb: to_adverb(the.word),
      noun: to_noun(the.word)
    };
  }

  the.which = (function() {
    if (the.word.match(/..est$/)) {return schema['JJS']}
    if (the.word.match(/..er$/))  {return schema['JJR']}
    return schema['JJ'];
  })()

  return the;
};

// console.log(new Adjective('crazy'))
