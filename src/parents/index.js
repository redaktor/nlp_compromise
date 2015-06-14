// Parents are classes for each main part of speech, with appropriate methods

var Adjective = require('./adjective');
var Noun = require('./noun');
var Adverb = require('./adverb');
var Verb = require('./verb');
var Value = require('./value');
		
exports.main = {
  adjective: function(str, next, last, token) {
    return new Adjective(str, next, last, token);
  },
  noun: function(str, next, last, token) {
    return new Noun(str, next, last, token, this);
  },
  adverb: function(str, next, last, token) {
    return new Adverb(str, next, last, token);
  },
  verb: function(str, next, last, token) {
    return new Verb(str, next, last, token);
  },
  value: function(str, next, last, token) {
    return new Value(str, next, last, token);
  },
  glue: function(str, next, last, token) {
    return {};
  }
}
module.exports = exports.main;