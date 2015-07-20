/**
 * converts nouns from plural and singular, and viceversases
 * @module src/parents/noun/conjugate/inflect
 */
// some regex borrowed from https://github.com/pksunkara/inflect
if (typeof lang != 'string') lang = 'en';
var dPath = '../../data/'+lang+'/';
var data = require(dPath+'nouns/inflect');
var rules = require(dPath+'rules/noun');
var _ = require('../../_');
var cache = require('../../cache');

function prepositionPhrase(w, is1) {
	return w.match(rules.preposition[(is1) ? 'first' : 'phrase']);
}
function isPlural(w) {
	w = _.normalise(w||this.word);
	// handle 'mayors of chicago'
	var preposition = prepositionPhrase(w);
	if (_.hasL(preposition, 1)) { w = preposition[1]; }
	// if it's a known irregular case
	for (var i = 0; i < data.irregulars.length; i++) {
		if (data.irregulars[i][1] === w) { return true; }
		if (data.irregulars[i][0] === w) { return false; }
	}
	// check indicator rules
	if (rules.plural.indicators(w)) { return true; }
	if (rules.singular.indicators(w)) { return false; }
	return rules.isPlural.fallback(w);
}
// to singular / plural
function to(to, w) {
	var low = _.normalise(w);
	var cached = cache.get(low, to);
	if (cached) { return cached; }
	var p = (to === 'plural');
	// is it uncountable or already plural/singular?
	if (data.uncountables[low] || isPlural(low) === p) { return w; }
	// irregular
	var found = data.irregulars.filter(function(r) { return r[(p ? 0 : 1)] === low; });
	if (found[0]) {
		var i = (p ? 1 : 0);
		if (_.toTitlecase(low) === w) { // handle capitalisation properly
			return cache.set(low, _.toTitlecase(found[0][i]), to);
		} else {
			return cache.set(low, found[0][i], to);
		}
	}
	// inflect first word of preposition-phrase
	var preposition = prepositionPhrase(w);
	if (_.hasL(preposition, 1)) {
		var better_first = to(to, preposition[1]);
		return cache.set(low, [better_first, w.replace(preposition[1], '')].join(''), to);
	}
	// regular
	var hasMatch = rules[to].to(w);
	return cache.set(low, (hasMatch) ? hasMatch : w, to);
}
function pluralize(w) { return to('plural', w||this.word); }
function singularize(w) { return to('singular', w||this.word); }
function inflect(w, l) {
	w = w||this.word;
	var cached = cache.get(w, 'nounInflect');
	if (cached) { return cached; }
	if (data.uncountables[w]) { // uncountables shouldn't ever inflect
		return { plural: w, singular: w, isPlural: false };
	}
	if (isPlural(w)) {
		var singular = singularize(w);
		cache.set(w, w, 'plural');
		return cache.set(w, { singular: singular, plural: w, isPlural: true }, 'nounInflect');
	} else {
		var plural = pluralize(w);
		cache.set(w, w, 'singular');
		return cache.set(w, { singular: w, plural: pluralize(w), isPlural: false }, 'nounInflect');
	}
}

module.exports = { 
	inflect: inflect, 
	isPlural: isPlural, 
	singularize: singularize, 
	pluralize: pluralize 
};

// console.log(inflect.singularize('kisses')=="kiss")
// console.log(inflect.singularize('kiss')=="kiss")
// console.log(inflect.singularize('children')=="child")
// console.log(inflect.singularize('child')=="child")
// console.log(inflect.pluralize('gas')=="gases")
// console.log(inflect.pluralize('narrative')=="narratives")
// console.log(inflect.singularize('gases')=="gas")
// console.log(inflect.pluralize('video')=="videos")
// console.log(inflect.pluralize('photo')=="photos")
// console.log(inflect.pluralize('stomach')=="stomachs")
// console.log(inflect.pluralize('database')=="databases")
// console.log(inflect.pluralize('kiss')=="kisses")
// console.log(inflect.pluralize('towns')=="towns")
// console.log(inflect.pluralize('mayor of chicago')=="mayors of chicago")
// console.log(inflect.inflect('Index').plural=='Indices')
// console.log(inflect.isPlural('octopus')==false)
// console.log(inflect.isPlural('octopi')==true)
// console.log(inflect.isPlural('eyebrow')==false)
// console.log(inflect.isPlural('eyebrows')==true)
// console.log(inflect.isPlural('child')==false)
// console.log(inflect.isPlural('children')==true)
// console.log(inflect.singularize('mayors of chicago')=="mayor of chicago")
