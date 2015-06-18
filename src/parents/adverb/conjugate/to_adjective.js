/**
 * adverb to adjective: 
 * turns 'quickly' into 'quick'
 * @module src/parents/adverb/to_adjective
 */
if (typeof lang != 'string') lang = 'en';
var cache = require('../../../cache');
var adverbs_decline = require('../../../data/'+lang+'/adverbs_decline');

module.exports = function(str, lang) {
	var cached = cache.get(str, 'to_adjective');
	if (cached) {
		return cached;
	}
	var transforms = [{
		'reg': /bly$/i,
		'repl': 'ble'
	}, {
		'reg': /gically$/i,
		'repl': 'gical'
	}, {
		'reg': /([rsdh])ically$/i,
		'repl': '$1ical'
	}, {
		'reg': /ically$/i,
		'repl': 'ic'
	}, {
		'reg': /uly$/i,
		'repl': 'ue'
	}, {
		'reg': /ily$/i,
		'repl': 'y'
	}, {
		'reg': /(.{3})ly$/i,
		'repl': '$1'
	}];
	
	if (adverbs_decline.hasOwnProperty(str)) {
		return cache.set(str, adverbs_decline[str], 'to_adjective');
	}
	for (var i = 0; i < transforms.length; i++) {
		if (str.match(transforms[i].reg)) {
			return cache.set(str, str.replace(transforms[i].reg, transforms[i].repl), 'to_adjective');
		}
	}
	return cache.set(str, str, 'to_adjective');
}

// console.log(to_adjective('quickly') === 'quick')
// console.log(to_adjective('marvelously') === 'marvelous')