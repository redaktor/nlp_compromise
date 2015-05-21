// turn 'quick' into 'quicker'
var to_comparative = (function() {

  var main = function(str, lang) {
		if (typeof lang != 'string') lang = 'en';
		if (typeof module !== 'undefined' && module.exports) {
			adjectives_decline = require('../../../data/'+lang+'/adjectives_decline');
		}
		
    var transforms = [{
      reg: /y$/i,
      repl: 'ier'
    }, {
      reg: /([aeiou])t$/i,
      repl: '$1tter'
    }, {
      reg: /([aeou])de$/i,
      repl: '$1der'
    }, {
      reg: /nge$/i,
      repl: 'nger'
    }];

    var matches = [
      /ght$/,
      /nge$/,
      /ough$/,
      /ain$/,
      /uel$/,
      /[au]ll$/,
      /ow$/,
      /old$/,
      /oud$/,
      /e[ae]p$/
    ];

    var not_matches = [
      /ary$/,
      /ous$/
    ];
		
    if (!(adjectives_decline.to_comparative[str])) return null;

    for (i = 0; i < transforms.length; i++) {
      if (str.match(transforms[i].reg)) {
        return str.replace(transforms[i].reg, transforms[i].repl);
      }
    }

    if (adjectives_decline.convertables.hasOwnProperty(str)) {
      return (str.match(/e$/)) ? str + 'r' : str + 'er';
    }

    if (adjectives_decline.to_comparative.hasOwnProperty(str)) {
      return adjectives_decline.to_comparative[str];
    }

    var i;
    for (i = 0; i < not_matches.length; i++) {
      if (str.match(not_matches[i])) {
        return 'more ' + str;
      }
    }


    for (i = 0; i < matches.length; i++) {
      if (str.match(matches[i])) {
        return str + 'er';
      }
    }
    return 'more ' + str;
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = main;
  return main;
})();

// console.log(to_comparative('dry'))
// console.log(to_comparative('cruel'))