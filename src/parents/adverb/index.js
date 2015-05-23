//wrapper for Adverb's methods
var Adverb = function(str, next, last, token) {
  if (typeof module !== "undefined" && module.exports) {
    to_adjective = require("./conjugate/to_adjective");
		schema = require('../../data/'+lang+'/schema');
  }
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
    if (the.word.match(/..est$/)) return schema['RBS'];
    if (the.word.match(/..er$/)) return schema['RBR'];
    return schema['RB'];
  })()

  return the;
}

if (typeof module !== "undefined" && module.exports) module.exports = Adverb;

// console.log(new Adverb("suddenly").conjugate())
// console.log(adverbs.conjugate('powerfully'))
