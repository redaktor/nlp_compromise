/* regex rules for verb conjugation
used in combination with the generic "fallback" method */

var lang = 'en';
var verb_rules = (function() {
  
if (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");
var zip = '{"infinitive":[["(eed)$",0,"_","!","&d","&r"],["(e)(ep)$",0,"$1$2s","$1$2%","$1pt","$1$2er"],["(a[tg]|i[zn]|ur|nc|gl|is)e$",0,"&s","!","&d",0],["([i|f|rr])y$",0,"$1ies","$1y%","$1ied",0],["([td]er)$",0,"_","!","&d",0],["([bd]l)e$",0,"&s","!","&d",0],["(ish|tch|ess)$",0,"&s","!","&d",0],["(ion|end|e[nc]t)$",0,"_","!","&d",0],["(om)e$",0,"&s","!","ame",0],["([aeiu])([pt])$",0,"$1$2s","$1$2$2%","$1$2",0],["(er)$",0,"_","!","&d",0],["(en)$",0,"_","!","&d",0]],"present":[["(ies)$","y",0,"y%","ied",0],["(tch|sh)es$","$1",0,"!","&d",0],["(ss)es$","$1",0,"!","&d",0],["([tzlshicgrvdnkmu])es$","&",0,"!","&d",0],["(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$","$1",0,"!","&d",0],["(ow)s$","$1",0,"!","ew",0],["(op)s$","$1",0,"$1p%","$1ped",0],["([eirs])ts$","$1t",0,"$1tt%","$1tted",0],["(ll)s$","$1",0,"!","&d",0],["(el)s$","$1",0,"$1l%","$1led",0],["(ip)es$","&",0,"!","&d",0],["ss$","ss",0,"ss%","ssed",0],["s$",0,0,"%","ed",0]],"gerund":[["pp%$","p","ps",0,"pped",0],["ll%$","ll","lls",0,"lled",0],["tt%$","t","ts",0,"t",0],["ss%$","ss","sses",0,"ssed",0],["gg%$","g","gs",0,"gged",0],["([^aeiou])y%$","$1y","$1ies",0,"$1ied","$1ier"],["(i.)%$","&","&s",0,"&d",0],["(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)%$","&","&s",0,"&d",0],["(ch|sh)%$","$1","&s",0,"&d",0],["(..)%$","$1","_",0,"&d",0]],"past":[["(ued)$",0,"ues","u%","ued","uer"],["(e|i)lled$",0,"$1lls","$1ll%","$1lled","$1ller"],["(sh|ch)ed$","$1","&s","!",0,"&r"],["(tl|gl)ed$","&","&s","!",0,"&r"],["(ss)ed$","$1","&s","!",0,"&r"],["pped$","p","ps","pp%",0,"pper"],["tted$","t","ts","tt%",0,"tter"],["gged$","g","gs","gg%",0,"gger"],["(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$","$1","_","!",0,"&r"],["(..[^aeiou])ed$","&","&s","!",0,"&r"],["ied$","y","ies","y%",0,"ier"],["(.o)ed$","$1o","$1os","$1o%",0,"$1oer"],["(.i)ed$","$1","_","!",0,"&r"],["([rl])ew$","$1ow","$1ows","$1ow%",0,0],["([pl])t$","$1t","$1ts","$1t%",0,0]]}'; 

  var main = (function () {
				var rs = JSON.parse(helpFns.repl(zip, 0, ['$1e', '$1s', '$1es', '$1ed', '$1ing', 'ing']));
				for (var cat in rs) {
					rs[cat] = rs[cat].map(function(a){
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
				return rs;
			})();

  if (typeof module !== "undefined" && module.exports) module.exports = main;

  return main;
})();