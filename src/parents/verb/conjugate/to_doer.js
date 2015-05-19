//somone who does this present-tense verb
//turn 'walk' into 'walker'
var verb_to_doer = (function() {
  var main = function(str) {
		if (typeof module !== 'undefined' && module.exports) {
			if (typeof lang != 'string') lang = 'en';
			var verbs_conjugate = require('../../../data/'+lang+'/verbs_conjugate');
		}
    str = str || '';
    var transforms = [{
      'reg': /e$/i,
      'repl': 'er'
    }, {
      'reg': /([aeiou])([mlgp])$/i,
      'repl': '$1$2$2er'
    }, {
      'reg': /([rlf])y$/i,
      'repl': '$1ier'
    }, {
      'reg': /^(.?.[aeiou])t$/i,
      'repl': '$1tter'
    }]

    if (verbs_conjugate.noDoers.hasOwnProperty(str)) {
      return null
    }
    if (verbs_conjugate.irregularDoers.hasOwnProperty(str)) {
      return verbs_conjugate.irregularDoers[str]
    }
    for (var i = 0; i < transforms.length; i++) {
      if (str.match(transforms[i].reg)) {
        return str.replace(transforms[i].reg, transforms[i].repl)
      }
    }
    return str + 'er'
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = main;
  }
  return main;
})();

// console.log(verb_to_doer('set'))
// console.log(verb_to_doer('sweep'))
// console.log(verb_to_doer('watch'))
