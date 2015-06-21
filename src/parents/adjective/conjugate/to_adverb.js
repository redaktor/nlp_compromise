/**
 * adjective to adverb: <br>
 * turn 'quick' into 'quickly'
 * @module src/parents/adjective/to_adverb
 */
if (typeof lang != 'string') var lang = 'en';
var adjectives_decline = require('../../../data/'+lang+'/adjectives/decline');
var cache = require('../../../cache');

module.exports = function(str) {
	if (typeof str != 'string' || str === '') { return ''; }
	var cached = cache.get(str, 'to_adverb');
	if (cached) {
		return cached;
	}
	var transforms = [{
		reg: /al$/i,
		repl: 'ally'
	}, {
		reg: /ly$/i,
		repl: 'ly'
	}, {
		reg: /(.{3})y$/i,
		repl: '$1ily'
	}, {
		reg: /que$/i,
		repl: 'quely'
	}, {
		reg: /ue$/i,
		repl: 'uly'
	}, {
		reg: /ic$/i,
		repl: 'ically'
	}, {
		reg: /ble$/i,
		repl: 'bly'
	}, {
		reg: /l$/i,
		repl: 'ly'
	}];

	var not_matches = [
		/airs$/,
		/ll$/,
		/ee.$/,
		/ile$/
	];

	if (adjectives_decline.adv_donts[str]) {
		return cache.set(str, null, 'to_adverb');
	}
	if (adjectives_decline.adj_to_advs[str]) {
		return cache.set(str, adjectives_decline.adj_to_advs[str], 'to_adverb');
	}
	if (str.length <= 3) {
		return cache.set(str, null, 'to_adverb');
	}
	var i;
	for (i = 0; i < not_matches.length; i++) {
		if (str.match(not_matches[i])) {
			return cache.set(str, null, 'to_adverb');
		}
	}
	for (i = 0; i < transforms.length; i++) {
		if (str.match(transforms[i].reg)) {
			return cache.set(str, str.replace(transforms[i].reg, transforms[i].repl), 'to_adverb');
		}
	}
	return cache.set(str, str + 'ly', 'to_adverb');
}

// console.log(adj_to_adv('direct'))
