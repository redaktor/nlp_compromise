// turns 'quickly' into 'quick'
var to_adjective = (function() {	

  var main = function(str, lang) {
		if (typeof lang != 'string') lang = 'en';
		if (typeof module !== 'undefined' && module.exports) {
			var adverbs_decline = require('../../../data/'+lang+'/adverbs_decline');
		}
    var transforms = [{
      'reg': /bly$/i,
      'repl': 'ble'
    }, {
      'reg': /gically$/i,
      'repl': 'gical'
    }, {
      'reg': /([rsdh])ically$/i,
      'repl': '$1ical'
    }, {
      'reg': /ically$/i,
      'repl': 'ic'
    }, {
      'reg': /uly$/i,
      'repl': 'ue'
    }, {
      'reg': /ily$/i,
      'repl': 'y'
    }, {
      'reg': /(.{3})ly$/i,
      'repl': '$1'
    }];
    if (adverbs_decline.hasOwnProperty(str)) {
      return adverbs_decline[str];
    }
    for (var i = 0; i < transforms.length; i++) {
      if (str.match(transforms[i].reg)) {
        return str.replace(transforms[i].reg, transforms[i].repl);
      }
    }
    return str
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = main;
  }
  return main;
})();

// console.log(to_adjective('quickly') === 'quick')
// console.log(to_adjective('marvelously') === 'marvelous')