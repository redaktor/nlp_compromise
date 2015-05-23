//wrapper for value's methods
var Value = function(str, next, last, token) {
  var the = this
  the.word = str || '';

  if (typeof module !== 'undefined' && module.exports) {
		schema = require('../../data/'+lang+'/schema');
    to_number = require('./to_number');
    date_extractor = require('./date_extractor');
  }

  the.date = function(options) {
    options = options || {}
    return date_extractor(the.word, options)
  }

  the.is_date = function() {
    var months = /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|aug|sept|oct|nov|dec)/i
    var times = /1?[0-9]:[0-9]{2}/
    var days = /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tues|wed|thurs|fri|sat|sun)\b/i
    if (the.word.match(months) || the.word.match(times) || the.word.match(days)) {
      return true
    }
    return false
  }

  the.number = function() {
    if (the.is_date()) {
      return null
    }
    return to_number(the.word)
  }

  the.which = (function() {
    if (the.date()) {
      return schema['DA']
    }
    if (the.number()) {
      return schema['NU']
    }
    return schema['CD']
  })()

  return the;
};
if (typeof module !== "undefined" && module.exports) {
  module.exports = Value;
}

// console.log(new Value("fifty five").number())
// console.log(new Value("june 5th 1998").date())
