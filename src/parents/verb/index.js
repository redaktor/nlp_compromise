/**
 * wrapper module for verb's methods
 * @module src/parents/verb/index
 */
// TODO - maybe i18n 'infinitive', 'present' etc., goes to schema
if (typeof lang != 'string') lang = 'en';
var dPath = '../../data/'+lang+'/';
var schema = require(dPath+'schema');
var verbs_special = require(dPath+'verbs/special');
var cache = require('../../cache');
var verb_conjugate = require('./conjugate');

exports.main = function(str, sentence, word_i) {
  var the = this;
	
  var token, next;
  if (sentence !== undefined && word_i !== undefined) {
    token = sentence.tokens[word_i];
    next = sentence.tokens[word_i + i];
  }
  the.word = str || '';
	the.conjugated = verb_conjugate(the.word);
	
	the.conjugate = function() {
		return the.conjugated;
	}
	
  the.to_past = function() {
    if (the.form === 'gerund') {
      return the.word; 
    }
    return the.conjugated.past;
  }

  the.to_present = function() {
    return the.conjugated.present;
  }

  the.to_future = function() {
    return 'will ' + the.conjugated.infinitive;
  }
	
	
  // which conjugation
	var cached = cache.get(the.word, 'verbForm');
	the.form = (cached) ? cached : cache.set(the.word, (function() {
		// don't choose infinitive if infinitive == present
		for (var i = 0; i < schema._tenseOrder.length; i++) {
			if (the.conjugated[schema._tenseOrder[i]] === the.word) {
				return schema._tenseOrder[i];
			}
		}
	})(), 'verbForm');

	
  // past/present/future   //wahh?!
	cached = cache.get(the.word, 'verbTense');
  the.tense = (cached) ? cached : cache.set(the.word, (function() {
    if (the.word.match(/\bwill\b/)) {return 'future';}
    if (the.form === 'present') {return 'present';}
    if (the.form === 'past') {return 'past';}
    return 'present';
  })(), 'verbTense');

  // the most accurate part_of_speech
	cached = cache.get(the.word, 'verbWhich');
  the.which = (cached) ? cached : cache.set(the.word, (function() {
    if (verbs_special.CP[the.word]) { return schema['CP']; }
    if (the.word.match(/([aeiou][^aeiouwyrlm])ing$/)) { return schema['VBG']; }
    return schema.getTense(the.form).tag;
  })(), 'verbWhich');

  // is this verb negative already?
  the.negative = function() {
		cached = cache.get(the.word, 'verbNeg');
		if (cached) { return cached; }
    var isN = ( (the.word.match(/n't$/)) || ((verbs_special.MD[the.word] || verbs_special.CP[the.word]) && next && next.normalised === 'not') );
		return cache.set(the.word, isN, 'verbNeg');
  }
  return the;
}
module.exports = exports.main;

// console.log(new Verb('will'))
// console.log(new Verb('stalking').tense)
