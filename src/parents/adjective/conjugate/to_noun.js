// convert cute to cuteness
var adj_to_noun = (function() {
	
  var main = function(w, lang) {
		if (typeof lang != 'string') lang = 'en';
		if (typeof module !== 'undefined' && module.exports) {
			decline = require('../../../data/'+lang+'/adjectives_decline');
		}
    if (!w) return '';
    if (decline.to_noun.hasOwnProperty(w)) return decline.to_noun[w];
    if (w.match(' ')) return w;
    if (w.match(/w$/))return w;
		
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
        return w.replace(transforms[i].reg, transforms[i].repl);
      }
    }

    if (w.match(/s$/)) return w;
    return w + 'ness';
  };
  if (typeof module !== 'undefined' && module.exports)  module.exports = main;
  return main;
})()

// console.log(adj_to_noun('mysterious'));