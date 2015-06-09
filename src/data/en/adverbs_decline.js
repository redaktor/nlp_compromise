// var types = ['adjective', 'adverb', 'comparative', 'superlative', 'noun'];
// 0 means 'return null' for adverbs OR 'conjugate without more/most' for comparative and superlative.
// 1 means 'default behavior'

// types: infinitive, gerund, past, present, doer, future

/* singular nouns having irregular plurals */

if (!lang) {var lang = 'en';}

var helpFns = require("./helpFns");
exports.zip = [ [ 'wholly', 'whole' ],
  [ 'idly', 'idle' ],
  [ 'fully', 'full' ],
  [ 'practically', 'practical' ],
  [ 'theoretically', 'theoretical' ],
  [ 'sporadically', 'sporadic' ],
  [ 'basically', 'basic' ],
  [ 'grammatically', 'grammatical' ],
  [ 'alphabetically', 'alphabetical' ],
  [ 'economically', 'economical' ],
  [ 'conically', 'conical' ],
  [ 'politically', 'political' ],
  [ 'vertically', 'vertical' ],
  [ 'critically', 'critical' ],
  [ 'fantastically', 'fantastic' ],
  [ 'mystically', 'mystical' ],
  [ 'pornographically', 'pornographic' ],
  [ 'jolly', 'jolly' ] ]
module.exports = (function () {
				var res = {};
				exports.zip.forEach(function(a) {
					res[a[0].replace('=', a[1])] = a[1];
				});
				return res;
			})()
