
var lang = 'en';
var adverbs_decline = (function() {
  var zip = [ [ 'wholly', 'whole' ],
  [ 'idly', 'idle' ],
  [ '=y', 'full' ],
  [ '=ly', 'practical' ],
  [ '=ly', 'theoretical' ],
  [ '=ally', 'sporadic' ],
  [ '=ally', 'basic' ],
  [ '=ly', 'grammatical' ],
  [ '=ly', 'alphabetical' ],
  [ '=ly', 'economical' ],
  [ '=ly', 'conical' ],
  [ '=ly', 'political' ],
  [ '=ly', 'vertical' ],
  [ '=ly', 'critical' ],
  [ '=ally', 'fantastic' ],
  [ '=ly', 'mystical' ],
  [ '=ally', 'pornographic' ],
  [ '=', 'jolly' ] ]; 

  var main = (function () {
				var res = {};
				zip.forEach(function(a) {
					res[a[0].replace('=', a[1])] = a[1];
				});
				return res;
			})();

  if (typeof module !== "undefined" && module.exports) module.exports = main;

  return main;
})();