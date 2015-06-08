

//::NODE::
  var lang = 'en';
//::

  var zip = { everyone: 'no one',
  everybody: 'nobody',
  someone: 'no one',
  somebody: 'nobody',
  always: 'never',
  away: 'back',
  in: 'out',
  on: 'off',
  over: 'under',
  together: 'apart',
  up: 'down' }; 

  var main = (function () {
				//::NODE::
				if (typeof module !== "undefined" && module.exports) var verbs_special = require('./verbs_special');
				//::
				var negate = verbs_special.negate || {};
				for (var k in zip) { negate[k] = zip[k]; }
				for (var k in negate) { negate[negate[k]] = k; }
				return negate;
			})();

//::NODE::
  if (typeof module !== "undefined" && module.exports) module.exports = main;
//::
