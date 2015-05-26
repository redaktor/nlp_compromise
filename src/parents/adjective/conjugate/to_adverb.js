// turn 'quick' into 'quickly'
var adj_to_adv = (function() {
	
  var main = function(str, lang) {
		//::NODE::
		if (typeof module !== 'undefined' && module.exports) {
			if (typeof lang != 'string') lang = 'en';
			var adjectives_decline = require('../../../data/'+lang+'/adjectives_decline');
		}
		//::
    var transforms = [{
      reg: /al$/i,
      repl: 'ally'
    }, {
      reg: /ly$/i,
      repl: 'ly'
    }, {
      reg: /(.{3})y$/i,
      repl: '$1ily'
    }, {
      reg: /que$/i,
      repl: 'quely'
    }, {
      reg: /ue$/i,
      repl: 'uly'
    }, {
      reg: /ic$/i,
      repl: 'ically'
    }, {
      reg: /ble$/i,
      repl: 'bly'
    }, {
      reg: /l$/i,
      repl: 'ly'
    }];

    var not_matches = [
      /airs$/,
      /ll$/,
      /ee.$/,
      /ile$/
    ];

    if (adjectives_decline.adv_donts[str]) {
			return null
		}
		if (adjectives_decline.adj_to_advs[str]) {
			return adjectives_decline.adj_to_advs[str]
		}
    if (str.length <= 3) {
			return null;
		}
    var i;
    for (i = 0; i < not_matches.length; i++) {
      if (str.match(not_matches[i])) {
				return null
			}
    }
    for (i = 0; i < transforms.length; i++) {
      if (str.match(transforms[i].reg)) {
        return str.replace(transforms[i].reg, transforms[i].repl);
      }
    }
    return str + 'ly';
  }
	//::NODE::
  if (typeof module !== 'undefined' && module.exports) module.exports = main;
	//::
  return main;
})();

// console.log(adj_to_adv('direct'))