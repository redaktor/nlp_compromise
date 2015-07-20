/**
 * wrapper module for adverb's methods
 * @module src/parents/adverb/index
 */
if (typeof lang != 'string') lang = 'en';
var dPath = '../data/'+lang+'/';
var schema = require(dPath+'schema');
var data = require(dPath+'adverbs/decline');
var rules = require(dPath+'rules/adverb');
var _ = require('../_');
var cache = require('../cache');
var c = ['adverbConjugate', 'toAdjective', 'adverbWhich'];

function which() {
	var hasMatch = rules.which(this.word);
	if (hasMatch) { return hasMatch; }
	return schema['RB'];
}
function decline(w) {
	w = this.word || w;
	if (!_.str(w)) { return ''; }
	var cached = cache.get(this.word, c[0]);
	if (cached) { return cached; }
	return cache.set(this.word, {
		adjective: to_adjective(this.word)
	}, c[0]);
}
function to_adjective(w) {
	w = this.word || w;
	var cached = cache.get(w, c[1]);
	if (cached) { return cached; }
	if (data.hasOwnProperty(w)) {
		return cache.set(w, data[w], c[1]);
	}
	if (rules && rules.adjective.to) {
		var hasMatch = rules.adjective.to(w);
		if (hasMatch) { return cache.set(w, hasMatch, c[1]); }
	}
	return cache.set(w, w, c[1]);
}
function adverb(str, next, last, token) {
  this.word = str || '';
	cached = cache.get(this.word, c[2]);
  this.which = (cached) ? cached : cache.set(this.word, (which.bind(this))(), c[2]);
  return this;
}

adverb.prototype.to_adjective = to_adjective;
adverb.prototype.conjugate = decline;
module.exports = adverb;

// console.log(new Adverb("suddenly").conjugate())
// console.log(adverbs.conjugate('powerfully'))
