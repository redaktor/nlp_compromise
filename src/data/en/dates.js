// var types = ['adjective', 'adverb', 'comparative', 'superlative', 'noun'];
// 0 means 'return null' for adverbs OR 'conjugate without more/most' for comparative and superlative.
// 1 means 'default behavior'

// types: infinitive, gerund, past, present, doer, future

/* singular nouns having irregular plurals */

if (!lang) {var lang = 'en';}

var helpFns = require("./helpFns");
exports.zip = { months: 
   { january: 0,
     february: 1,
     march: 2,
     april: 3,
     may: 4,
     june: 5,
     july: 6,
     august: 7,
     september: 8,
     october: 9,
     november: 10,
     december: 11 },
  monthAbbrevs: 
   { jan: 0,
     feb: 1,
     mar: 2,
     apr: 3,
     jun: 5,
     jul: 6,
     aug: 7,
     sep: 8,
     sept: 8,
     oct: 9,
     nov: 10,
     dec: 11 },
  days: 
   { monday: 1,
     tuesday: 2,
     wednesday: 3,
     thursday: 4,
     friday: 5,
     saturday: 6,
     sunday: 7 } }
module.exports = (function () {
				var res = exports.zip;
				for (var w in res.monthAbbrevs) { res.months[w] = exports.zip.monthAbbrevs[w] }
				res.dayS = '\b('.concat(Object.keys(res.days).join('|'), ')\b');
				res.monthS = '('.concat(Object.keys(res.months).join('|'), ')');
				res.monthsS = res.monthS + ',?';
				return res;
			})()
