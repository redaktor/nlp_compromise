

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
     [ 'will be', 'won\'t be' ],
     [ 'isn\'t', 'isn\'t not' ],
     [ 'ain\'t', 'ain\'t not' ],
     [ 'aren\'t', 'aren\'t not' ],
     [ 'wasn\'t', 'wasn\'t not' ],
     [ 'weren\'t', 'weren\'t not' ],
     [ 'won\'t be', 'won\'t be not' ] ],
  MD: 
   [ [ 'did', 'didn\'t' ],
     [ 'would', 'wouldn\'t' ],
     [ 'could', 'couldn\'t' ],
     [ 'should', 'shouldn\'t' ],
     [ 'can', 'can\'t' ],
     [ 'will', 'won\'t' ],
     [ 'must', 'mustn\'t' ],
     [ 'shall', 'shant' ],
     [ 'shall', 'shan\'t' ],
     [ 'didn\'t', 'didn\'t not' ],
     [ 'wouldn\'t', 'wouldn\'t not' ],
     [ 'couldn\'t', 'couldn\'t not' ],
     [ 'shouldn\'t', 'shouldn\'t not' ],
     [ 'can\'t', 'can\'t not' ],
     [ 'won\'t', 'won\'t not' ],
     [ 'mustn\'t', 'mustn\'t not' ],
     [ 'shant', 'shant not' ],
     [ 'shan\'t', 'shan\'t not' ],
     [ 'might', 'might not' ],
     [ 'may', 'may not' ],
     [ 'lets', 'lets not' ],
     [ 'let\'s', 'let\'s not' ],
     [ 'who\'d', 'who\'d not' ],
     [ 'ought', 'ought not' ] ] }; 

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