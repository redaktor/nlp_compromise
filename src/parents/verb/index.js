// wrapper for verb's methods

if (typeof lang != 'string') lang = 'en';
var dPath = '../../data/'+lang+'/';
var schema = require(dPath+'schema');
var verbs_special = require(dPath+'verbs_special');
var verb_conjugate = require('./conjugate');

exports.main = function(str, sentence, word_i) {
  var the = this;
	
  var token, next;
  if (sentence !== undefined && word_i !== undefined) {
    token = sentence.tokens[word_i];
    next = sentence.tokens[word_i + i];
  }
  the.word = str || '';
	the.conjugated = {};
	
  var tenses = {
    past: 'VBD',
    participle: 'VBN',
    infinitive: 'VBP',
    present: 'VBZ',
    gerund: 'VBG'
  }

	the.conjugate = function() {
		if (the.conjugated) {
			return the.conjugated;
		}
		verb_conjugate = require('./conjugate');
		return verb_conjugate(the.word);
	}
	
  the.to_past = function() {
    if (the.form === 'gerund') {
      return the.word;
    }
    return verb_conjugate(the.word).past;
  }

  the.to_present = function() {
    return verb_conjugate(the.word).present;
  }

  the.to_future = function() {
    return 'will ' + verb_conjugate(the.word).infinitive;
  }

  // which conjugation
	the.form = (function() {
		// don't choose infinitive if infinitive == present
		var order = [
			'past',
			'present',
			'gerund',
			'infinitive'
		];
		the.conjugated = verb_conjugate(the.word);
		for (var i = 0; i < order.length; i++) {
			if (the.conjugated[order[i]] === the.word) {
				return order[i];
			}
		}
	})()

  // past/present/future   //wahh?!
  the.tense = (function() {
    if (the.word.match(/\bwill\b/)) {return 'future'}
    if (the.form === 'present') {return 'present'}
    if (the.form === 'past') {return 'past'}
    return 'present';
  })()

  // the most accurate part_of_speech
  the.which = (function() {
    if (verbs_special.CP[the.word]) { return schema['CP']; }
    if (the.word.match(/([aeiou][^aeiouwyrlm])ing$/)) { return schema['VBG']; }
    var form = the.form;
    return schema[tenses[form]];
  })()

  // is this verb negative already?
  the.negative = function() {
    if (the.word.match(/n't$/)) {
			return true
		}
    if ((verbs_special.MD[the.word] || verbs_special.CP[the.word]) && next && next.normalised === 'not') {
			return true;
    }
    return false;
  }
  return the;
}
module.exports = exports.main;

// console.log(new Verb('will'))
// console.log(new Verb('stalking').tense)
