/* regex rules for verb conjugation
used in combination with the generic "fallback" method */


//::NODE::
  var lang = 'en';
//::
//::NODE::
if (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");
//::
var zip = { infinitive: 
   [ [ '(eed)$', undefined, '$1s', '$1ing', '$1ed', '$1er' ],
     [ '(e)(ep)$', undefined, '$1$2s', '$1$2ing', '$1pt', '$1$2er' ],
     [ '(a[tg]|i[zn]|ur|nc|gl|is)e$',
       undefined,
       '$1es',
       '$1ing',
       '$1ed',
       undefined ],
     [ '([i|f|rr])y$', undefined, '$1ies', '$1ying', '$1ied', undefined ],
     [ '([td]er)$', undefined, '$1s', '$1ing', '$1ed', undefined ],
     [ '([bd]l)e$', undefined, '$1es', '$1ing', '$1ed', undefined ],
     [ '(ish|tch|ess)$', undefined, '$1es', '$1ing', '$1ed', undefined ],
     [ '(ion|end|e[nc]t)$',
       undefined,
       '$1s',
       '$1ing',
       '$1ed',
       undefined ],
     [ '(om)e$', undefined, '$1es', '$1ing', 'ame', undefined ],
     [ '([aeiu])([pt])$',
       undefined,
       '$1$2s',
       '$1$2$2ing',
       '$1$2',
       undefined ],
     [ '(er)$', undefined, '$1s', '$1ing', '$1ed', undefined ],
     [ '(en)$', undefined, '$1s', '$1ing', '$1ed', undefined ] ],
  present: 
   [ [ '(ies)$', 'y', undefined, 'ying', 'ied', undefined ],
     [ '(tch|sh)es$', '$1', undefined, '$1ing', '$1ed', undefined ],
     [ '(ss)es$', '$1', undefined, '$1ing', '$1ed', undefined ],
     [ '([tzlshicgrvdnkmu])es$',
       '$1e',
       undefined,
       '$1ing',
       '$1ed',
       undefined ],
     [ '(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$',
       '$1',
       undefined,
       '$1ing',
       '$1ed',
       undefined ],
     [ '(ow)s$', '$1', undefined, '$1ing', 'ew', undefined ],
     [ '(op)s$', '$1', undefined, '$1ping', '$1ped', undefined ],
     [ '([eirs])ts$', '$1t', undefined, '$1tting', '$1tted', undefined ],
     [ '(ll)s$', '$1', undefined, '$1ing', '$1ed', undefined ],
     [ '(el)s$', '$1', undefined, '$1ling', '$1led', undefined ],
     [ '(ip)es$', '$1e', undefined, '$1ing', '$1ed', undefined ],
     [ 'ss$', 'ss', undefined, 'ssing', 'ssed', undefined ],
     [ 's$', '', undefined, 'ing', 'ed', undefined ] ],
  gerund: 
   [ [ 'pping$', 'p', 'ps', undefined, 'pped', undefined ],
     [ 'lling$', 'll', 'lls', undefined, 'lled', undefined ],
     [ 'tting$', 't', 'ts', undefined, 't', undefined ],
     [ 'ssing$', 'ss', 'sses', undefined, 'ssed', undefined ],
     [ 'gging$', 'g', 'gs', undefined, 'gged', undefined ],
     [ '([^aeiou])ying$', '$1y', '$1ies', undefined, '$1ied', '$1ier' ],
     [ '(i.)ing$', '$1e', '$1es', undefined, '$1ed', undefined ],
     [ '(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$',
       '$1e',
       '$1es',
       undefined,
       '$1ed',
       undefined ],
     [ '(ch|sh)ing$', '$1', '$1es', undefined, '$1ed', undefined ],
     [ '(..)ing$', '$1', '$1s', undefined, '$1ed', undefined ] ],
  past: 
   [ [ '(ued)$', undefined, 'ues', 'uing', 'ued', 'uer' ],
     [ '(e|i)lled$', undefined, '$1lls', '$1lling', '$1lled', '$1ller' ],
     [ '(sh|ch)ed$', '$1', '$1es', '$1ing', undefined, '$1er' ],
     [ '(tl|gl)ed$', '$1e', '$1es', '$1ing', undefined, '$1er' ],
     [ '(ss)ed$', '$1', '$1es', '$1ing', undefined, '$1er' ],
     [ 'pped$', 'p', 'ps', 'pping', undefined, 'pper' ],
     [ 'tted$', 't', 'ts', 'tting', undefined, 'tter' ],
     [ 'gged$', 'g', 'gs', 'gging', undefined, 'gger' ],
     [ '(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$',
       '$1',
       '$1s',
       '$1ing',
       undefined,
       '$1er' ],
     [ '(..[^aeiou])ed$', '$1e', '$1es', '$1ing', undefined, '$1er' ],
     [ 'ied$', 'y', 'ies', 'ying', undefined, 'ier' ],
     [ '(.o)ed$', '$1o', '$1os', '$1oing', undefined, '$1oer' ],
     [ '(.i)ed$', '$1', '$1s', '$1ing', undefined, '$1er' ],
     [ '([rl])ew$', '$1ow', '$1ows', '$1owing', undefined, undefined ],
     [ '([pl])t$', '$1t', '$1ts', '$1ting', undefined, undefined ] ] }; 

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
