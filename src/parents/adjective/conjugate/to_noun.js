/**
 * adjective to noun: 
 * convert cute to cuteness
 * @module src/parents/adjective/to_noun
 */
if (typeof lang != 'string') var lang = 'en';
var adjectives_decline = require('../../../data/'+lang+'/adjectives/decline');
var cache = require('../../../cache');

module.exports = function(str) {
	if (typeof str != 'string' || str === '') { return ''; }
	var cached = cache.get(str, 'to_noun');
	if (cached) {
		return cached;
	}
	if (adjectives_decline.to_noun.hasOwnProperty(str)) {
		return cache.set(str, adjectives_decline.to_noun[str], 'to_noun');
	}
	if (str.match(' ') || str.match(/w$/)) { return cache.set(str, str, 'to_noun'); }
	
	var transforms=[
		{reg:/y$/, repl:'iness'},
		{reg:/le$/, repl:'ility'},
		{reg:/ial$/, repl:'y'},
		{reg:/al$/, repl:'ality'},
		{reg:/ting$/, repl:'ting'},
		{reg:/ring$/, repl:'ring'},
		{reg:/bing$/, repl:'bingness'},
		{reg:/sing$/, repl:'se'},
		{reg:/ing$/, repl:'ment'},
		{reg:/ess$/, repl:'essness'},
		{reg:/ous$/, repl:'ousness'},
	];

	for(var i=0; i<transforms.length; i++){
		if(str.match(transforms[i].reg)){
			return cache.set(str, str.replace(transforms[i].reg, transforms[i].repl), 'to_noun');
		}
	}
	if (str.match(/s$/)) {
		return cache.set(str, str, 'to_noun');
	}
	return cache.set(str, str + 'ness', 'to_noun');
};

// console.log(adj_to_noun('mysterious'));
