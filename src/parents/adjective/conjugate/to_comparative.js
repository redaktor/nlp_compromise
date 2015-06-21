/**
 * adjective to comparative: <br>
 * turn 'quick' into 'quicker'
 * @module src/parents/adjective/to_comparative
 */
if (typeof lang != 'string') var lang = 'en';
var adjectives_decline = require('../../../data/'+lang+'/adjectives/decline');
var cache = require('../../../cache');

module.exports = function(str) {
	if (typeof str != 'string' || str === '') { return ''; }
	var cached = cache.get(str, 'to_comparative');
	if (cached) {
		return cached;
	}
	var transforms = [{
		reg: /y$/i,
		repl: 'ier'
	}, {
		reg: /([aeiou])t$/i,
		repl: '$1tter'
	}, {
		reg: /([aeou])de$/i,
		repl: '$1der'
	}, {
		reg: /nge$/i,
		repl: 'nger'
	}];

	var matches = [
		/ght$/,
		/nge$/,
		/ough$/,
		/ain$/,
		/uel$/,
		/[au]ll$/,
		/ow$/,
		/old$/,
		/oud$/,
		/e[ae]p$/
	];

	var not_matches = [
		/ary$/,
		/ous$/
	];
	
	if (adjectives_decline.to_comparative[str]===0) {
		return cache.set(str, null, 'to_comparative');
	}
	for (i = 0; i < transforms.length; i++) {
		if (str.match(transforms[i].reg)) {
			return cache.set(str, str.replace(transforms[i].reg, transforms[i].repl), 'to_comparative');
		}
	}

	if (adjectives_decline.convertables.hasOwnProperty(str)) {
		return cache.set(str, ((str.match(/e$/)) ? str + 'r' : str + 'er'), 'to_comparative');
	}

	if (adjectives_decline.to_comparative.hasOwnProperty(str)) {
		return cache.set(str, adjectives_decline.to_comparative[str], 'to_comparative');
	}

	var i;
	for (i = 0; i < not_matches.length; i++) {
		if (str.match(not_matches[i])) {
			return cache.set(str, 'more ' + str, 'to_comparative');
		}
	}

	for (i = 0; i < matches.length; i++) {
		if (str.match(matches[i])) {
			return cache.set(str, str + 'er', 'to_comparative');
		}
	}
	return cache.set(str, 'more ' + str, 'to_comparative');
}

// console.log(to_comparative('dry'))
// console.log(to_comparative('cruel'))
