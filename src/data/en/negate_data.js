// var types = ['adjective', 'adverb', 'comparative', 'superlative', 'noun'];
// 0 means 'return null' for adverbs OR 'conjugate without more/most' for comparative and superlative.
// 1 means 'default behavior'

// types: infinitive, gerund, past, present, doer, future

/* singular nouns having irregular plurals */

if (!lang) {var lang = 'en';}

var helpFns = require("./helpFns");
exports.zip = { everyone: 'no one',
  everybody: 'nobody',
  someone: 'no one',
  somebody: 'nobody',
  always: 'never',
  away: 'back',
  in: 'out',
  on: 'off',
  over: 'under',
  together: 'apart',
  up: 'down' }
module.exports = (function () {
				//::NODE::
				if (typeof module !== "undefined" && module.exports) var verbs_special = require('./verbs_special');
				//::
				var negate = verbs_special.negate || {};
				for (var k in exports.zip) { negate[k] = exports.zip[k]; }
				for (var k in negate) { negate[negate[k]] = k; }
				return negate;
			})()
