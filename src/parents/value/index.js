// wrapper for value's methods
if (typeof lang != 'string') lang = 'en';
var schema = require('../../data/'+lang+'/schema');
var dates = require('../../data/'+lang+'/dates');
var cache = require('../../cache');
var to_number = require('./to_number');
var date_extractor = require('./date_extractor');
	
module.exports = function(str, sentence, word_i) {
	var cached = null;
  var the = this;
  the.word = str || '';
	
  the.is_date = function() {
		return (the.word.match(new RegExp(dates.monthS, 'i')) || the.word.match(new RegExp(dates.dayS, 'i')) || the.word.match(/1?[0-9]:[0-9]{2}/));
	}
	
  the.date = function(options) {
    return date_extractor(the.word, options);
  }

  the.number = function() {
    if (the.is_date()) { return null; }
    return to_number(the.word);
  }

	cached = cache.get(the.word, 'valueWhich');
  the.which = (cached) ? cached : cache.set(the.word, (function() {
    if (the.date()) { return schema['DA']; }
    if (the.number()){ return schema['NU']; }
    return schema['CD'];
  })(), 'valueWhich');

  return the;
}

// console.log(new Value("fifty five").number())
// console.log(new Value("june 5th 1998").date())
