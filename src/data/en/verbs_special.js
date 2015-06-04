

//::NODE::
  var lang = 'en';
//::
var verbs_special = (function() {
  
//::NODE::
if (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");
//::
var zip = { CP: 
   [ [ 'is', 'isn\'t' ],
     [ 'am', 'ain\'t' ],
     [ 'are', 'aren\'t' ],
     [ 'was', 'wasn\'t' ],
     [ 'were', 'weren\'t' ],
     [ 'will be', 'won\'t be' ] ],
  MD: 
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
				res.negate = {};
				['CP', 'MD'].forEach(function(type) {
					res[type] = {};
					zip[type].forEach(function(a) {

						res[type][a[0]] = type;
						res[type][a[1]] = type;
						res.negate[a[0]] = a[1];
					});
				});
				return res;
			})();

//::NODE::
  if (typeof module !== "undefined" && module.exports) module.exports = main;
//::

  return main;
})();