/**
 * somone who does this present-tense verb: <br>
 * turn 'walk' into 'walker'
 * @module src/parents/verb/conjugate/to_doer
 */

if (typeof lang != 'string') lang = 'en';
var verbs_conjugate = require('../../../data/'+lang+'/verbs/conjugate');

exports.main = function(str) {	
	str = str || '';
	/// console.log( str );
	
	var transforms = [{
		reg: /e$/i,
		repl: 'er'
	}, {
		reg: /([aeiou])([mlgp])$/i,
		repl: '$1$2$2er'
	}, {
		reg: /([rlf])y$/i,
		repl: '$1ier'
	}, {
		reg: /^(.?.[aeiou])t$/i,
		repl: '$1tter'
	}];

	if (verbs_conjugate.noDoers.hasOwnProperty(str)) {
		/// console.log( '0', str );
		return null;
	}
	if (verbs_conjugate.irregularDoers.hasOwnProperty(str)) {
		/// console.log( '1', verbs_conjugate.irregularDoers[str] );
		return verbs_conjugate.irregularDoers[str];
	}
	for (var i = 0; i < transforms.length; i++) {
		if (str.match(transforms[i].reg)) {
			var replaced = str.replace(transforms[i].reg, transforms[i].repl);
			/// console.log( '2', str, replaced, str.replace(transforms[i].reg, transforms[i].repl) );
			if (replaced) {
				return str.replace(transforms[i].reg, transforms[i].repl);
			}
		}
	}
	/// console.log('3', str + 'er');
	return str + 'er';
}
module.exports = exports.main;

// console.log(verb_to_doer('set'))
// console.log(verb_to_doer('sweep'))
// console.log(verb_to_doer('watch'))
