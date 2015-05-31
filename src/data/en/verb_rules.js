/* regex rules for verb conjugation
used in combination with the generic "fallback" method */


//::NODE::
  var lang = 'en';
//::
var verb_rules = (function() {
  
//::NODE::
if (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");
//::
var zip = { infinitive: 
   [ [ '(eed)$', 0, '$1s', '$1ing', '$1ed', '$1er' ],
     [ '(e)(ep)$', 0, '$1$2s', '$1$2ing', '$1pt', '$1$2er' ],
     [ '(a[tg]|i[zn]|ur|nc|gl|is)e$', 0, '$1es', '$1ing', '$1ed', 0 ],
     [ '([i|f|rr])y$', 0, '$1ies', '$1ying', '$1ied', 0 ],
     [ '([td]er)$', 0, '$1s', '$1ing', '$1ed', 0 ],
     [ '([bd]l)e$', 0, '$1es', '$1ing', '$1ed', 0 ],
     [ '(ish|tch|ess)$', 0, '$1es', '$1ing', '$1ed', 0 ],
     [ '(ion|end|e[nc]t)$', 0, '$1s', '$1ing', '$1ed', 0 ],
     [ '(om)e$', 0, '$1es', '$1ing', 'ame', 0 ],
     [ '([aeiu])([pt])$', 0, '$1$2s', '$1$2$2ing', '$1$2', 0 ],
     [ '(er)$', 0, '$1s', '$1ing', '$1ed', 0 ],
     [ '(en)$', 0, '$1s', '$1ing', '$1ed', 0 ] ],
  present: 
   [ [ '(ies)$', 'y', 0, 'ying', 'ied', 0 ],
     [ '(tch|sh)es$', '$1', 0, '$1ing', '$1ed', 0 ],
     [ '(ss)es$', '$1', 0, '$1ing', '$1ed', 0 ],
     [ '([tzlshicgrvdnkmu])es$', '$1e', 0, '$1ing', '$1ed', 0 ],
     [ '(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$',
       '$1',
       0,
       '$1ing',
       '$1ed',
       0 ],
     [ '(ow)s$', '$1', 0, '$1ing', 'ew', 0 ],
     [ '(op)s$', '$1', 0, '$1ping', '$1ped', 0 ],
     [ '([eirs])ts$', '$1t', 0, '$1tting', '$1tted', 0 ],
     [ '(ll)s$', '$1', 0, '$1ing', '$1ed', 0 ],
     [ '(el)s$', '$1', 0, '$1ling', '$1led', 0 ],
     [ '(ip)es$', '$1e', 0, '$1ing', '$1ed', 0 ],
     [ 'ss$', 'ss', 0, 'ssing', 'ssed', 0 ],
     [ 's$', 0, 0, 'ing', 'ed', 0 ] ],
  gerund: 
   [ [ 'pping$', 'p', 'ps', 0, 'pped', 0 ],
     [ 'lling$', 'll', 'lls', 0, 'lled', 0 ],
     [ 'tting$', 't', 'ts', 0, 't', 0 ],
     [ 'ssing$', 'ss', 'sses', 0, 'ssed', 0 ],
     [ 'gging$', 'g', 'gs', 0, 'gged', 0 ],
     [ '([^aeiou])ying$', '$1y', '$1ies', 0, '$1ied', '$1ier' ],
     [ '(i.)ing$', '$1e', '$1es', 0, '$1ed', 0 ],
     [ '(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$',
       '$1e',
       '$1es',
       0,
       '$1ed',
       0 ],
     [ '(ch|sh)ing$', '$1', '$1es', 0, '$1ed', 0 ],
     [ '(..)ing$', '$1', '$1s', 0, '$1ed', 0 ] ],
  past: 
   [ [ '(ued)$', 0, 'ues', 'uing', 'ued', 'uer' ],
     [ '(e|i)lled$', 0, '$1lls', '$1lling', '$1lled', '$1ller' ],
     [ '(sh|ch)ed$', '$1', '$1es', '$1ing', 0, '$1er' ],
     [ '(tl|gl)ed$', '$1e', '$1es', '$1ing', 0, '$1er' ],
     [ '(ss)ed$', '$1', '$1es', '$1ing', 0, '$1er' ],
     [ 'pped$', 'p', 'ps', 'pping', 0, 'pper' ],
     [ 'tted$', 't', 'ts', 'tting', 0, 'tter' ],
     [ 'gged$', 'g', 'gs', 'gging', 0, 'gger' ],
     [ '(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$',
       '$1',
       '$1s',
       '$1ing',
       0,
       '$1er' ],
     [ '(..[^aeiou])ed$', '$1e', '$1es', '$1ing', 0, '$1er' ],
     [ 'ied$', 'y', 'ies', 'ying', 0, 'ier' ],
     [ '(.o)ed$', '$1o', '$1os', '$1oing', 0, '$1oer' ],
     [ '(.i)ed$', '$1', '$1s', '$1ing', 0, '$1er' ],
     [ '([rl])ew$', '$1ow', '$1ows', '$1owing', 0, 0 ],
     [ '([pl])t$', '$1t', '$1ts', '$1ting', 0, 0 ] ] }; 

  var main = (function () {

				for (var cat in zip) {
					zip[cat] = zip[cat].map(function(a){
						return {
							reg: new RegExp(a[0],'i'),
							repl: {
								infinitive:a[1],
								present:a[2],
								gerund:a[3],
								past:a[4],
								doer:a[5]
							}
						};
					});
				}
				return zip;
			})();

//::NODE::
  if (typeof module !== "undefined" && module.exports) module.exports = main;
//::

  return main;
})();