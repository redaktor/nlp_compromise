
var lang = 'en';
var adjectives_demonym = (function() {
  
if (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");
var zip = [ 'afgh!',
  'alb!#',
  'alger#',
  'argentine',
  'armen#',
  'austral#',
  'aussie',
  'austr#',
  'b!gladeshi',
  'belg#',
  'boliv#',
  'bosn#',
  'brazil#',
  'bulgar#',
  'cambod#',
  ':ad#',
  'chil_',
  'chin§',
  'colomb#',
  'croat',
  'cub!',
  'czech',
  'domini:',
  'egypt#',
  'british',
  'eston#',
  'ethiop#',
  'finnish',
  'french',
  'gamb#',
  'georg#',
  'germ!',
  'greek',
  'hait#',
  'hungar#',
  'ind#',
  'indones#',
  'ir!#',
  'iraqi',
  'irish',
  'israeli',
  'ital#',
  'jamai:',
  'jap!§',
  'jor&#',
  'keny!',
  'kor_',
  'kuwaiti',
  'latv#',
  'leb!§',
  'liber#',
  'liby!',
  'lithu!#',
  'macedon#',
  'malays#',
  'mexi:',
  'mongol#',
  'moroc:',
  'dutch',
  'nicaragu!',
  'niger#',
  'norweg#',
  'om!i',
  'pakist!i',
  'palestin#',
  'filipino',
  'polish',
  'portugu§',
  'qatari',
  'rom!#',
  'russ#',
  'rw!&',
  'samo!',
  'saudi',
  'scottish',
  'senegal§',
  'serb#',
  'singapor_',
  'slovak',
  'somali',
  'su&§',
  'swedish',
  'swiss',
  'syr#',
  'taiw!§',
  'thai',
  'tunis#',
  'ug!&',
  'ukrain#',
  'ameri:',
  'hindi',
  'sp!ish',
  'venezuel!',
  'vietnam§',
  'welsh',
  'afri:',
  'europ_',
  'as#',
  'californ#' ]; 

  var main = zip.map(function (w) {
					return helpFns.repl(w, [':', '&', '_', '#', '§', '!'], ['can', 'dan', 'ean', 'ian', 'ese', 'an'])
				});

  if (typeof module !== "undefined" && module.exports) module.exports = main;

  return main;
})();