// wrapper for Adverb's methods
module.exports = function(str, next, last, token) {
	if (typeof lang != 'string') lang = 'en';
	var to_adjective = require("./conjugate/to_adjective");
	var schema = require('../../data/'+lang+'/schema');
		
  var the = this;
  the.word = str || '';
  the.next = next;
  the.last = last;

  the.conjugate = function() {
    return {
      adjective: to_adjective(the.word)
    }
  }

  the.which = (function() {
    if (the.word.match(/..est$/)) {return schema['RBS']}
    if (the.word.match(/..er$/)) {return schema['RBR']}
    return schema['RB'];
  })()

  return the;
}

// console.log(new Adverb("suddenly").conjugate())
// console.log(adverbs.conjugate('powerfully'))
