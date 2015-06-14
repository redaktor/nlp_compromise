var verbs_special = require('./verbs_special');


  exports.zip = { everyone: 'no one',
  everybody: 'nobody',
  someone: 'no one',
  somebody: 'nobody',
  always: 'never',
  away: 'back',
  into: 'out of',
  on: 'off',
  over: 'under',
  together: 'apart',
  up: 'down',
  in: 'out',
  for: 'against',
  'up for': 'up against',
  'out for': 'out against',
  'it in': 'it out',
  'on with': 'off with' }
module.exports = (function () {
				var negate = verbs_special.negate || {};
				for (var k in exports.zip) { negate[k] = exports.zip[k]; }
				for (var k in negate) { negate[negate[k]] = k; }
				return negate;
			})();