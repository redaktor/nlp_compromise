//wrapper for value's methods
var Value = function(str, next, last, token) {
  var the = this
  the.word = str || '';
	//::NODE::
  if (typeof module !== 'undefined' && module.exports) {
		schema = require('../../data/'+lang+'/schema');
		dates = require('../../data/'+lang+'/dates');
    to_number = require('./to_number');
    date_extractor = require('./date_extractor');
  }
	//::
  the.date = function(options) {
    options = options || {};
    return date_extractor(the.word, options);
  }

  the.is_date = function() {
    var times = /1?[0-9]:[0-9]{2}/;
    if (the.word.match(new RegExp(dates.dayS)) || the.word.match(new RegExp(dates.monthS)) || the.word.match(times)) {
      return true;
    }
    return false;
  }

  the.number = function() {
    if (the.is_date()) {return null}
    return to_number(the.word);
  }

  the.which = (function() {
    if (the.date()) { return schema['DA']}
    if (the.number()){return schema['NU']}
    return schema['CD'];
  })()

  return the;
};
//::NODE::
if (typeof module !== "undefined" && module.exports) module.exports = Value;
//::

// console.log(new Value("fifty five").number())
// console.log(new Value("june 5th 1998").date())
