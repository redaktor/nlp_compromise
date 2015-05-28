
var lang = 'en';
var verbs_special = (function() {
  
//::NODE::
if (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");
//::
var zip = { cps: 
   [ [ 'is', '=n&' ],
     [ 'am', 'ain&' ],
     [ 'are', '=n&' ],
     [ 'was', '=n&' ],
     [ 'were', '=n&' ],
     [ 'will be', 'won& be' ] ],
  mds: 
   [ [ 'did', '=n&' ],
     [ 'would', '=n&' ],
     [ 'could', '=n&' ],
     [ 'should', '=n&' ],
     [ 'can', '=&' ],
     [ 'will', 'won&' ],
     [ 'must', '=n&' ],
     [ 'shall', '<nt' ],
     [ 'shall', '<n&' ] ] }; 

  var main = (function () {
				var res = {};
				var negate = {};
				['cps', 'mds'].forEach(function(type) {
					res[type] = [];
					res[type] = res[type].concat.apply(res[type], zip[type].map(function(a) {
						var arr = helpFns.replBase(a,0,['\'t']);
						negate[arr[0]] = arr[1];
						return arr;
					}));
				});
				res.negate = negate;
				return res;
			})();

//::NODE::
  if (typeof module !== "undefined" && module.exports) module.exports = main;
//::

  return main;
})();