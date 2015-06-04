// turn 'quick' into 'quickest'

module.exports = function(str, lang) {
	if (typeof lang != 'string') lang = 'en';
	var adjectives_decline = require('../../../data/'+lang+'/adjectives_decline');
	
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
			return str + 'st'
		} else {
			return str + 'est'
		}
	}

	for (i = 0; i < transforms.length; i++) {
		if (str.match(transforms[i].reg)) {
			return str.replace(transforms[i].reg, transforms[i].repl)
		}
	}

	if (adjectives_decline.convertables.hasOwnProperty(str)) {
		return generic_transformation(str)
	}
	if (!(adjectives_decline.to_superlative[str])) {
		return 'most '.concat(str)
	}
	if (adjectives_decline.to_superlative.hasOwnProperty(str)) {
		return adjectives_decline.to_superlative[str]
	}
	var i;
	for (i = 0; i < not_matches.length; i++) {
		if (str.match(not_matches[i])) {
			return 'most ' + str;
		}
	}

	for (i = 0; i < matches.length; i++) {
		if (str.match(matches[i])) {
			return generic_transformation(str);
		}
	}
	return 'most ' + str;
}

// console.log(to_superlative('dry'))
// console.log(to_superlative('rich'))