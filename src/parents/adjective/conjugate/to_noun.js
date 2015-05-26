// convert cute to cuteness
var adj_to_noun = (function() {
	
  var main = function(w, lang) {
		//::NODE::
		if (typeof module !== 'undefined' && module.exports) {
			if (typeof lang != 'string') lang = 'en';
			adjectives_decline = require('../../../data/'+lang+'/adjectives_decline');
		}
		//::
    if (!w) {return ''}
    if (adjectives_decline.to_noun.hasOwnProperty(w)) {
			return adjectives_decline.to_noun[w];
		}
		if (w.match(' ')) {return w}
    if (w.match(/w$/)){return w}
		
    var transforms=[
      {reg:/y$/, repl:'iness'},
      {reg:/le$/, repl:'ility'},
      {reg:/ial$/, repl:'y'},
      {reg:/al$/, repl:'ality'},
      {reg:/ting$/, repl:'ting'},
      {reg:/ring$/, repl:'ring'},
      {reg:/bing$/, repl:'bingness'},
      {reg:/sing$/, repl:'se'},
      {reg:/ing$/, repl:'ment'},
      {reg:/ess$/, repl:'essness'},
      {reg:/ous$/, repl:'ousness'},
    ];

    for(var i=0; i<transforms.length; i++){
      if(w.match(transforms[i].reg)){
        return w.replace(transforms[i].reg, transforms[i].repl)
      }
    }

    if (w.match(/s$/)) {
			return w;
		}
		return w + 'ness';
  };
	//::NODE::
  if (typeof module !== 'undefined' && module.exports)  module.exports = main;
	//::
  return main;
})()

// console.log(adj_to_noun('mysterious'));