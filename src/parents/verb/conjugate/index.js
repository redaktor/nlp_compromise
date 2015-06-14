// parents/verb/conjugate
// turn a verb into its other grammatical forms.

// TODO - https://www.ego4u.de/de/cram-up/grammar/past-perfect-progressive
// also: 'Had he been' (?) pos ...

if (typeof lang != 'string') lang = 'en';
var dPath = '../../../data/'+lang+'/';
var suffixes = require(dPath+'suffixes');
var verbs_conjugate = require(dPath+'verbs_conjugate');
var verb_rules = require(dPath+'verb_rules');
var phrasalVerbs = require(dPath+'phrasalVerbs');
var schema = require(dPath+'schema');
var cache = require('../../../cache');
var to_doer = require('./to_doer');

//this method is the slowest in the whole library, basically TODO:whaaa
function predict(w) {
	var endsWith = function(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
	var arr = Object.keys(suffixes.verbs);
	for (i = 0; i < arr.length; i++) {
		if (endsWith(w, arr[i])) {
			return suffixes.verbs[arr[i]];
		}
	}
	return 'infinitive';
}

//fallback to this transformation if it has an unknown prefix
function fallback(w) {
	var infinitive;
	if (w.length > 4) {
		infinitive = w.replace(/ed$/, '');
	} else {
		infinitive = w.replace(/d$/, '');
	}
	var present, past, gerund, doer;
	if (w.match(/[^aeiou]$/)) {
		gerund = w + 'ing';
		past = w + 'ed';
		if (w.match(/ss$/)) {
			present = w + 'es'; //'passes'
		} else {
			present = w + 's';
		}
		doer = to_doer(infinitive);
	} else {
		gerund = w.replace(/[aeiou]$/, 'ing');
		past = w.replace(/[aeiou]$/, 'ed');
		present = w.replace(/[aeiou]$/, 'es');
		doer = to_doer(infinitive);
	}
	
	return {
		infinitive: infinitive,
		present: present,
		past: past,
		gerund: gerund,
		doer: doer,
		future: 'will ' + infinitive
	};
}

//make sure object has all forms
function fulfill(obj, prefix) {
	if (!obj.infinitive) { return obj; }
	if (!obj.gerund) {
		obj.gerund = obj.infinitive + 'ing'
	}
	if (!obj.present) {
		obj.present = obj.infinitive + 's'
	}
	if (!obj.past) {
		obj.past = obj.infinitive + 'ed'
	}
	if (!obj.doer) {
		obj.doer = to_doer(obj.infinitive)
	}
	// add the prefix to all forms, if it exists
	if (prefix) {
		Object.keys(obj).forEach(function(k) {
			obj[k] = prefix + obj[k];
		})
	}
	// future is 'will'+infinitive
	if (!obj.future) {
		obj.future = 'will ' + obj.infinitive
	}
	// perfect is 'have'+past-tense
	if (!obj.perfect) {
		obj.perfect = 'have ' + obj.past
	}
	// pluperfect is 'had'+past-tense
	if (!obj.pluperfect) {
		obj.pluperfect = 'had ' + obj.past
	}
	// future perfect is 'will have'+past-tense
	if (!obj.futurePerfect) {
		obj.futurePerfect = 'will have ' + obj.past;
	}
	
	return obj;
}

function result(conjugated, prefix) {
	var c = fulfill(conjugated, prefix);
	for (var i = 0; i < schema._tenseOrder.length; i++) {
		var w = conjugated[schema._tenseOrder[i]];
		cache.set(w, c, 'verbConjugate');
	}
	return c;
}


exports.main = function(w) {
	if (typeof w != 'string' || w === '') {
		return {};
	}
	var cached = cache.get(w, 'verbConjugate');
	if (cached) {
		return cached;
	}
	
	if(w.match(' ') && w.match(phrasalVerbs.particleRegex)){
		var splits = w.match(phrasalVerbs.particleRegex,'');
		var phrasal_verb = splits[1];
		var particle = splits[2];
		var res = module.exports(phrasal_verb); // recursive
		delete res['doer'];
		Object.keys(res).forEach(function(k){
			if(res[k]){
				res[k] += ' '+particle;
			}
		})
		return result(JSON.parse(JSON.stringify(res))); // shallow copy because deleted
	}

	// for pluperfect ('had tried') remove 'had' and call it past-tense
	if(w.match(/^had [a-z]/i)) {w = w.replace(/^had /i,'')}
	// for perfect ('have tried') remove 'have' and call it past-tense
	if(w.match(/^have [a-z]/i)) {w = w.replace(/^have /i,'')}
	// for future perfect ('will have tried') remove 'will have' and call it past-tense
	if(w.match(/^will have [a-z]/i)) {w = w.replace(/^will have /i,'')}

	// chop it if it's future-tense
	w = w.replace(/^will /i, '');
	// un-prefix the verb, and add it in later
	var prefix = (w.match(/^(over|under|re|anti|full)\-?/i) || [])[0];
	var verb = w.replace(/^(over|under|re|anti|full)\-?/i, '');
	// check irregulars
	var obj = {};
	var l = verbs_conjugate.irregulars.length;
	var c, i;
	// TODO FIXME
	/*
		noDoers: 
      { appear: 1,
		irregularDoers: 
      { begin: 'beginner',
	*/
	for (i = 0; i < l; i++) {
		c = verbs_conjugate.irregulars[i];
		if (verb === c.present || verb === c.gerund || verb === c.past || verb === c.infinitive) {
			obj = JSON.parse(JSON.stringify(verbs_conjugate.irregulars[i])); // object 'clone' hack ('shallow copy'), to avoid mem leak
			return result(obj, prefix)
		}
	}
	// guess the tense, so we know which transformation to make
	var predicted = predict(w) || 'infinitive';

	// check against verb rules
	l = verb_rules[predicted].length
	var r;
	for (i = 0; i < l; i++) {
		r = verb_rules[predicted][i];
		if (w.match(r.reg)) {
			obj[predicted] = w;
			Object.keys(r.repl).forEach(function(k) {
				if (k === predicted) {
					obj[k] = w;
				} else {
					obj[k] = w.replace(r.reg, r.repl[k]);
				}
			});
			return result(obj);
		}
	}

	// produce a generic transformation
	return result(fallback(w));
};

module.exports = exports.main;

// console.log(verb_conjugate('walking'))
// console.log(verb_conjugate('overtook'))
// console.log(verb_conjugate('watch out'))
// console.log(verb_conjugate('watch'))
// console.log(verb_conjugate('smash'))
// console.log(verb_conjugate('word'))
//broken
// console.log(verb_conjugate('read'))
// console.log(verb_conjugate('free'))
// console.log(verb_conjugate('flesh'))
// console.log(verb_conjugate('branch'))
// console.log(verb_conjugate('spred'))
// console.log(verb_conjugate('bog'))
// console.log(verb_conjugate('nod'))
// console.log(verb_conjugate('had tried'))
// console.log(verb_conjugate('have tried'))
