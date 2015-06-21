/**
 * adjective to superlative: 
 * turn 'quick' into 'quickest'
 * @module src/parents/adjective/to_superlative
 */
if (typeof lang != 'string') var lang = 'en';
var adjectives_decline = require('../../../data/'+lang+'/adjectives/decline');
var cache = require('../../../cache');

module.exports = function(str) {
	if (typeof str != 'string' || str === '') { return ''; }
	var cached = cache.get(str, 'to_superlative');
	if (cached) {
		return cached;
	}
	
	var transforms = [{
		reg: /y$/i,
		repl: 'iest'
	}, {
		reg: /([aeiou])t$/i,
		repl: '$1ttest'
	}, {
		reg: /([aeou])de$/i,
		repl: '$1dest'
	}, {
		reg: /nge$/i,
		repl: 'ngest'
	}];

	var matches = [
		/ght$/,
		/nge$/,
		/ough$/,
		/ain$/,
		/uel$/,
		/[au]ll$/,
		/ow$/,
		/oud$/,
		/...p$/
	];

	var not_matches = [
		/ary$/
	];

	var generic_transformation = function(str) {
		if (str.match(/e$/)) {
			return cache.set(str, [str, 'st'].join(''), 'to_superlative');
		} else {
			return cache.set(str, [str, 'est'].join(''), 'to_superlative');
		}
	}

	for (i = 0; i < transforms.length; i++) {
		if (str.match(transforms[i].reg)) {
			return cache.set(str, str.replace(transforms[i].reg, transforms[i].repl), 'to_superlative');
		}
	}
	var std = ['most', str].join(' ');

	if (adjectives_decline.convertables.hasOwnProperty(str)) {
		return cache.set(str, generic_transformation(str), 'to_superlative');
	}
	if (!(adjectives_decline.to_superlative[str])) {
		return cache.set(str, std, 'to_superlative');
	}
	if (adjectives_decline.to_superlative.hasOwnProperty(str)) {
		return cache.set(str, adjectives_decline.to_superlative[str], 'to_superlative');
	}
	var i;
	for (i = 0; i < not_matches.length; i++) {
		if (str.match(not_matches[i])) {
			return cache.set(str, std, 'to_superlative');
		}
	}

	for (i = 0; i < matches.length; i++) {
		if (str.match(matches[i])) {
			return cache.set(str, generic_transformation(str), 'to_superlative');
		}
	}
	return cache.set(str, std, 'to_superlative');
}

// console.log(to_superlative('dry'))
// console.log(to_superlative('rich'))