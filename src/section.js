// a section is a block of text, with an arbitrary number of sentences
// these methods are just wrappers around the ones in sentence.js

exports.fn = function(type, todo) {
	if (todo === 'reduce') {
		return function(options) {
			return this.sentences.map(function(s) {
				return s[type](options);
			}).reduce(function(arr, a) {
				return arr.concat(a);
			}, []);
		}
	}
	if (todo === 'transform') {
		return function() {
			this.sentences = this.sentences.map(function(s) {
				return s[type]();
			});
			return this;
		}
	}
	return function() {
		return this.sentences.map(function(s) {
			return s[type]();
		});
	}
}

exports.Section = function(sentences) {
  this.sentences = sentences || [];

  this.text = function() {
    return this.sentences.map(function(s) {
      return s.text();
    }).join(' ');
  }
  this.tense = exports.fn('tense');

  // pluck out wanted data from sentences
  this.tags = exports.fn('tags');
  this.entities = exports.fn('entities', 'reduce');
  this.people = exports.fn('people', 'reduce');
	this.nouns = exports.fn('nouns', 'reduce');
  this.adjectives = exports.fn('adjectives', 'reduce');
  this.verbs = exports.fn('verbs', 'reduce');
  this.adverbs = exports.fn('adverbs', 'reduce');
  this.values = exports.fn('values', 'reduce');
	
  // transform the sentences
  this.negate = exports.fn('negate', 'transform');
  this.to_past = exports.fn('to_past', 'transform');
  this.to_present = exports.fn('to_present', 'transform');
  this.to_future = exports.fn('to_future', 'transform');
}

module.exports = exports.Section;
