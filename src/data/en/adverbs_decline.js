

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
var helpFns = require("./helpFns");
module.exports = (function () {
				var res = {};
				exports.zip.forEach(function(a) {
					res[a[0]] = a[1];
				});
				return res;
			})();
