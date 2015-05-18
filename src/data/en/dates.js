
var lang = 'en';
var dates = (function() {
  var zip = { months: 
   { january: 0,
     jan: 0,
     february: 1,
     feb: 1,
     march: 2,
     mar: 2,
     april: 3,
     apr: 3,
     may: 4,
     june: 5,
     jun: 5,
     july: 6,
     jul: 6,
     august: 7,
     aug: 7,
     september: 8,
     sep: 8,
     sept: 8,
     october: 9,
     oct: 9,
     november: 10,
     nov: 10,
     december: 11,
     dec: 11 },
  days: 
   { monday: 1,
     tuesday: 2,
     wednesday: 3,
     thursday: 4,
     friday: 5,
     saturday: 6,
     sunday: 7 } }; 

  var main = (function () {
				var res = zip;
				res.rDaySearch = '\b('.concat(Object.keys(res.days).join('|'), ')\b');
				res.rMonthSearch = '('.concat(Object.keys(res.months).join('|'), ')');
				res.rMonths = res.monthSearch + ',?'; // TODO - this isn't really cross language
				return res;
			})();
  if (typeof module !== "undefined" && module.exports) module.exports = main;

  return main;
})();