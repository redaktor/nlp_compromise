
var lang = 'en';
var negate_data = (function() {
  var zip = { everyone: 'no one',
  everybody: 'nobody',
  someone: 'no one',
  somebody: 'nobody',
  always: 'never' }; 

  var main = (function () {
				if (typeof module !== "undefined" && module.exports) var verbs_special = require('./verbs_special');
				var negate = verbs_special.negate || {};
				for (var k in zip) { negate[k] = zip[k]; }
				return negate;
			})();

  if (typeof module !== "undefined" && module.exports) module.exports = main;

  return main;
})();