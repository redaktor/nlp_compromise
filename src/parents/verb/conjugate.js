/**
 * turn a verb into its other grammatical forms.
 * @module src/parents/verb/conjugate/index
 */
// TODO - https://www.ego4u.de/de/cram-up/grammar/past-perfect-progressive
// also: 'Had he been' (?) p.o.s ... (see bottom)
if (typeof lang != 'string') lang = 'en';
var dPath = '../../data/'+lang+'/';
var verbs_conjugate = require(dPath+'verbs/conjugate');
var phrasalVerbs = require(dPath+'lexicon/phrasalVerbs');
var rules = require(dPath+'rules/verb');
var schema = require(dPath+'schema');
var _ = require('../../_');
var cache = require('../../cache');

function blank() {
	return schema._tenses.reduce(function(h,s){ h[s]=''; return h; }, {});
}
// somone who does this present-tense verb: e.g. turns 'walk' into 'walker'
function toDoer(w) {
	w = w || '';
	if (verbs_conjugate.noDoers.hasOwnProperty(w)) { return null; }
	if (verbs_conjugate.irregularDoers.hasOwnProperty(w)) {
		return verbs_conjugate.irregularDoers[w];
	}
	var hasMatch = rules.doerReplace(w);
	if (hasMatch) return hasMatch;
	return w + 'er';
}
// suffixes prediction
function predict(w) {
	for (var i = -4; i < 0; i++) {
		var sliced = w.slice(i);
		if (rules.suffixes.hasOwnProperty(sliced)) { return rules.suffixes[sliced]; }
	}
	return 'infinitive';
}
// make sure object has all forms
function fulfill(o, prefix) {
	if (!o.infinitive) { return o; }	
	if (prefix) {
		schema._baseTenses.forEach(function(k){ o[k] = [prefix, o[k]].join(''); });
	}
	if (!o.doer) { o.doer = toDoer(o.infinitive); }
	var fills = rules.fulfill(o), k;
	for (k in fills) {
		if (!o[k] && fills[k] && fills[k] instanceof Array) { o[k] = fills[k].join(''); }
	}
	return o;
}
// fulfill + cache
function result(c, prefix) {
	var conjugated = fulfill(c, prefix);
	cache.set(this.verb, conjugated, 'verbConjugate');
	for (var i = 0; i < schema._tenses.length; i++) {
		var w = conjugated[schema._tenses[i]];
		if (w != this.verb) { cache.set(w, conjugated, 'verbConjugate'); }
	}
	return conjugated;
}
// e.g. phrasal verbs
function handleParticles(w) {
	if(w.match(' ') && w.match(phrasalVerbs.particleRegex)){
		var splits = w.match(phrasalVerbs.particleRegex,'');
		var phrasal_verb = splits[1];
		var particle = splits[2];
		var res = module.exports(phrasal_verb); // recursive
		res['doer'] = null;
		Object.keys(res).forEach(function(k){
			if(res[k]){ res[k] = [res[k], particle].join(' '); }
		})
		return result(this.verb, res);
	}
	return w;
}

function conjugate(w) {
	w = this.word || w;
	if (typeof w != 'string' || w === '') { return blank(); }
	this.verb = w; // as permanent cache setter, won't change
	var cached = cache.get(this.verb, 'verbConjugate');
	if (cached) { return cached; }
	
	this.result = result, this.handleParticles = handleParticles;
	// remove spec. tenses prefixes like 'have ', 'had ', 'will '
	w = rules.tenseReplace(this.handleParticles(w));
	// un-prefix the verb, and add it in later
	var prefix = (w.match(rules.unPrefix) || [])[0];
	var _verb = w.replace(rules.unPrefix, '');
	// check irregulars
	var l = verbs_conjugate.irregulars.length;
	var c, i;
	for (i = 0; i < l; i++) {
		c = verbs_conjugate.irregulars[i];
		if (_verb === c.present || _verb === c.gerund || _verb === c.past || _verb === c.infinitive) {
			return this.result(JSON.parse(JSON.stringify(verbs_conjugate.irregulars[i])), prefix) // 'shallow copy', avoid mem leak
		}
	}
	// guess the tense, so we know which transformation to make
	var predicted = predict(w);
	// check verb against conjugate rules
	var obj = {};
	var hasDoer = !(verbs_conjugate.noDoers.hasOwnProperty(w));
	var l = rules.conjugate[predicted].length, r;
	for (i = 0; i < l; i++) {
		r = rules.conjugate[predicted][i];
		if (w.match(r.reg)) {		
			obj[predicted] = w;
			Object.keys(r.repl).forEach(function(k) {
				if (k === predicted) {
					obj[k] = w;
				} else {
					if (!hasDoer && k === 'doer') {
						obj[k] = null;
					} else {
						obj[k] = w.replace(r.reg, r.repl[k]);
					}
				}
			});
			return this.result(obj);
		}
	}
	// produce a generic transformation
	return this.result(rules.fallback(w, blank()));
};

module.exports = conjugate;
// console.log(verb_conjugate('walking'))
// console.log(verb_conjugate('overtook'))
// console.log(verb_conjugate('watch out'))
// console.log(verb_conjugate('watch'))
// console.log(verb_conjugate('smash'))
// console.log(verb_conjugate('word'))
// broken TODO
// console.log(verb_conjugate('read'))
// console.log(verb_conjugate('free'))
// console.log(verb_conjugate('flesh'))
// console.log(verb_conjugate('branch'))
// console.log(verb_conjugate('spred'))
// console.log(verb_conjugate('bog'))
// console.log(verb_conjugate('nod'))
// console.log(verb_conjugate('had tried'))
// console.log(verb_conjugate('have tried'))
