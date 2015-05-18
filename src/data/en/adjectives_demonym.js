
var lang = 'en';
var adjectives_demonym = (function() {
  var zip = [ 'afghan',
  'alban$',
  'alger$',
  'argentine',
  'armen$',
  'austral$',
  'aussie',
  'austr$',
  'bangladeshi',
  'belg$',
  'boliv$',
  'bosn$',
  'brazil$',
  'bulgar$',
  'cambod$',
  'canad$',
  'chilean',
  'chin=',
  'colomb$',
  'croat',
  'cuban',
  'czech',
  'dominican',
  'egypt$',
  'british',
  'eston$',
  'ethiop$',
  'finnish',
  'french',
  'gamb$',
  'georg$',
  'german',
  'greek',
  'hait$',
  'hungar$',
  'ind$',
  'indones$',
  'iran$',
  'iraqi',
  'irish',
  'israeli',
  'ital$',
  'jamaican',
  'japan=',
  'jordan$',
  'kenyan',
  'korean',
  'kuwaiti',
  'latv$',
  'leban=',
  'liber$',
  'libyan',
  'lithuan$',
  'macedon$',
  'malays$',
  'mexican',
  'mongol$',
  'moroccan',
  'dutch',
  'nicaraguan',
  'niger$',
  'norweg$',
  'omani',
  'pakistani',
  'palestin$',
  'filipino',
  'polish',
  'portugu=',
  'qatari',
  'roman$',
  'russ$',
  'rwandan',
  'samoan',
  'saudi',
  'scottish',
  'senegal=',
  'serb$',
  'singaporean',
  'slovak',
  'somali',
  'sudan=',
  'swedish',
  'swiss',
  'syr$',
  'taiwan=',
  'thai',
  'tunis$',
  'ugandan',
  'ukrain$',
  'american',
  'hindi',
  'spanish',
  'venezuelan',
  'vietnam=',
  'welsh',
  'african',
  'european',
  'as$',
  'californ$' ]; 

  var main = zip.map(function (s) {
					switch (lang) {
						default:
							return s.replace('$', 'ian').replace('=', 'ese');
						break;
					}
				});
  if (typeof module !== "undefined" && module.exports) module.exports = main;

  return main;
})();