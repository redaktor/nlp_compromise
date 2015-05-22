
var lang = 'en';
var verbs_special = (function() {
  
if (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");
var zip = { cps: 
   [ [ 'is', '=n_' ],
     [ 'am', 'ain_' ],
     [ 'are', '=n_' ],
     [ 'was', '=n_' ],
     [ 'were', '=n_' ],
     [ 'will be', 'won_ be' ] ],
  mds: 
   [ [ 'did', '=n_' ],
     [ 'would', '=n_' ],
     [ 'could', '=n_' ],
     [ 'should', '=n_' ],
     [ 'can', '=_' ],
     [ 'will', 'won_' ],
     [ 'must', '=n_' ],
     [ 'shall', '<nt' ],
     [ 'shall', '<n_' ] ] }; 

  var main = (function () {
				var res = {};
				var negate = {};
				['cps', 'mds'].forEach(function(type) {
					res[type] = [];
					res[type] = res[type].concat.apply(res[type], zip[type].map(function(a) { 
						var arr = helpFns.replBase(a,['_'],['\'t']);
						negate[arr[0]] = arr[1];
						return arr; 
					}));
				});
				res.negate = negate;
				return res;
			})();

  if (typeof module !== "undefined" && module.exports) module.exports = main;

  return main;
})();