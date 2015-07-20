/**
 * wrapper module for adjective's methods
 * @module src/parents/adjective/index
 */
if (typeof lang != 'string') var lang = 'en';
var dPath = '../data/'+lang+'/';
var schema = require(dPath+'schema');
var data = require(dPath+'adjectives/decline');
var rules = require(dPath+'rules/adjective');
var _ = require('../_');
var cache = require('../cache');

function which() {
	var hasMatch = rules.which(this.word);
	if (hasMatch) { return hasMatch; }
	return schema['JJ'];
}
function decline(w) {
	w = this.word || w;
	if (!_.str(w)) { return ''; }
	var cached = cache.get(this.word, 'adjectiveConjugate');
	if (cached) { return cached; }
	return cache.set(this.word, {
		comparative: this.to_comparative(w),
		superlative: this.to_superlative(w),
		adverb: this.to_adverb(w),
		noun: this.to_noun(w)
	}, 'adjectiveConjugate');
}
function to(transform) {
	function value(w, v) {
		return cache[(v) ? 'set' : 'get'](w, v, ['to_',transform].join(''));
	}
	return function(w) {
		var convertables = { comparative: 1, superlative: 1 }
		w = this.word || w;
		if (!_.str(w)) { return ''; }
		var cached = value(w);
		if (cached) { return cached; }
		var r = rules[transform];
		var d = data[transform];
		// transform rules
		if (r && r.to) {
			var hasMatch = r.to(w);
			if (hasMatch) { return value(w, hasMatch); }
		}
		// data
		if (d && d.no && d.no[w]) { return value(w, null); }
		if (convertables[transform] && data.convertables.hasOwnProperty(w)) {
			return value(w, r.fn(w));
		}
		if (d.to && d.to.hasOwnProperty(w)) {
			return value(w, ((!d.to[w]) ? r.fallback(w) : d.to[w]));
		}
		// other rules - no comparative and regular
		if (r) {
			if (r.no && r.no(w)) { return value(w, r.fallback(w)); }
			if (r.regular && r.regular(w)) { return value(w, r.fn(w)); }
		}
		return value(w, r.fallback(w));
	}
}
function adjective(str, next, last, token) {
  this.word = str || '';
	cached = cache.get(this.word, 'adjectiveWhich');
  this.which = (cached) ? cached : cache.set(this.word, (which.bind(this))(), 'adjectiveWhich');
  return this;
};
adjective.prototype.to_comparative = to('comparative');
adjective.prototype.to_superlative = to('superlative');
adjective.prototype.to_adverb = to('adverb');
adjective.prototype.to_noun = to('noun');
adjective.prototype.conjugate = decline;
module.exports = adjective;