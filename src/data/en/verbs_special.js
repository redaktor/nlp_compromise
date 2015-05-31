
var lang = 'en';
var verbs_special = (function() {
  
//::NODE::
if (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");
//::
var zip = { cps: 
   [ [ 'is', 'isn\'t' ],
     [ 'am', 'ain\'t' ],
     [ 'are', 'aren\'t' ],
     [ 'was', 'wasn\'t' ],
     [ 'were', 'weren\'t' ],
     [ 'will be', 'won\'t be' ] ],
  mds: 
   [ [ 'did', 'didn\'t' ],
     [ 'would', 'wouldn\'t' ],
     [ 'could', 'couldn\'t' ],
     [ 'should', 'shouldn\'t' ],
     [ 'can', 'can\'t' ],
     [ 'will', 'won\'t' ],
     [ 'must', 'mustn\'t' ],
     [ 'shall', 'shant' ],
     [ 'shall', 'shan\'t' ] ] }; 

  var main = (function () {
				var res = {};
				var negate = {};
				['cps', 'mds'].forEach(function(type) {
					res[type] = [];
					res[type] = res[type].concat.apply(res[type], zip[type].map(function(a) {

						negate[a[0]] = a[1];
						return a;
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