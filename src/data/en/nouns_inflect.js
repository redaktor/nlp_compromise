/* singular nouns having irregular plurals */

var lang = 'en';
var nouns_inflect = (function() {
  
if (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");
var zip = { irregulars: 
   [ [ 'child', '=ren' ],
     [ 'person', 'people' ],
     [ 'leaf', '<av_' ],
     [ 'database', '=s' ],
     [ 'quiz', '=z_' ],
     [ 'goose', 'ge_e' ],
     [ 'phenomenon', '<a' ],
     [ 'barracks', '=' ],
     [ 'deer', '=' ],
     [ 'syllabus', '<i' ],
     [ 'index', '<ic_' ],
     [ 'appendix', '<ic_' ],
     [ 'criterion', '<a' ],
     [ 'man', '<en' ],
     [ 'sex', '=e<' ],
     [ 'narrative', '=s' ],
     [ 'addendum', '<a' ],
     [ 'alga', '=e' ],
     [ 'alumna', '=e' ],
     [ 'alumnus', '<i' ],
     [ 'bacillus', '<i' ],
     [ 'beau', '=x' ],
     [ 'cactus', '=_' ],
     [ 'château', '=x' ],
     [ 'corpus', '<ora' ],
     [ 'curriculum', '<a' ],
     [ 'die', '<ice' ],
     [ 'echo', '=_' ],
     [ 'embargo', '=_' ],
     [ 'foot', 'feet' ],
     [ 'formula', '=s' ],
     [ 'genus', '<era' ],
     [ 'graffito', '<ti' ],
     [ 'hippopotamus', '<i' ],
     [ 'larva', '=e' ],
     [ 'libretto', '<ti' ],
     [ 'loaf', '<av_' ],
     [ 'matrix', '<ic_' ],
     [ 'memorandum', '<a' ],
     [ 'mosquito', '=_' ],
     [ 'opus', '<era' ],
     [ 'ovum', '<a' ],
     [ 'ox', '=en' ],
     [ 'radius', '=_' ],
     [ 'referendum', '<a' ],
     [ 'tableau', '=x' ],
     [ 'that', '<ose' ],
     [ 'that', '<__' ],
     [ 'thief', '<ev_' ],
     [ 'this', '<_e' ],
     [ 'tooth', 'teeth' ],
     [ 'vita', '=e' ],
     [ 'i', 'we' ],
     [ 'he', 't=y' ],
     [ 'she', 'they' ],
     [ 'mine', 'ours' ],
     [ 'myself', 'yourselv_' ],
     [ 'myself', 'ourselv_' ],
     [ 'yourself', 'themselv_' ],
     [ 'his', 't<eirs' ],
     [ 'himself', 'themselv_' ],
     [ 'her', 't<eirs' ],
     [ 'hers', 't<irs' ],
     [ 'herself', 'themselv_' ],
     [ 'its', 'the<rs' ],
     [ 'theirs', '=' ],
     [ 'themself', '<lv_' ] ],
  uc: 
   [ 'oxen',
     'grammar',
     'series',
     'sheep',
     'fish',
     'aircraft',
     'bass',
     'bison',
     'fowl',
     'halibut',
     'moose',
     'salmon',
     'spacecraft',
     'tuna',
     'trout',
     'advice',
     'information',
     'knowledge',
     'trouble',
     'enjoyment',
     'fun',
     'recreation',
     'relaxation',
     'meat',
     'rice',
     'bread',
     'cake',
     'coffee',
     'ice',
     'water',
     'oil',
     'grass',
     'hair',
     'fruit',
     'wildlife',
     'equipment',
     'machinery',
     'furniture',
     'mail',
     'luggage',
     'jewelry',
     'clothing',
     'money',
     'mathematics',
     'economics',
     'physics',
     'civics',
     'ethics',
     'gymnastics',
     'mumps',
     'measles',
     'news',
     'tennis',
     'baggage',
     'currency',
     'soap',
     'toothpaste',
     'food',
     'sugar',
     'butter',
     'flour',
     'research',
     'leather',
     'wool',
     'wood',
     'coal',
     'weather',
     'homework',
     'cotton',
     'silk',
     'patience',
     'impatience',
     'vinegar',
     'art',
     'beef',
     'blood',
     'cash',
     'chaos',
     'cheese',
     'chewing',
     'conduct',
     'confusion',
     'education',
     'electricity',
     'entertainment',
     'fiction',
     'forgiveness',
     'gold',
     'gossip',
     'ground',
     'happiness',
     'history',
     'honey',
     'hospitality',
     'importance',
     'justice',
     'laughter',
     'leisure',
     'lightning',
     'literature',
     'luck',
     'melancholy',
     'milk',
     'mist',
     'music',
     'noise',
     'oxygen',
     'paper',
     'pay',
     'peace',
     'peanut',
     'pepper',
     'petrol',
     'plastic',
     'pork',
     'power',
     'pressure',
     'rain',
     'recognition',
     'sadness',
     'safety',
     'salt',
     'sand',
     'scenery',
     'shopping',
     'silver',
     'snow',
     'softness',
     'space',
     'speed',
     'steam',
     'sunshine',
     'tea',
     'thunder',
     'time',
     'traffic',
     'trousers',
     'violence',
     'warmth',
     'wine',
     'steel',
     'soccer',
     'hockey',
     'golf',
     'gum',
     'liquid',
     'species',
     'fahrenheit',
     'celcius',
     'kelvin',
     'hertz' ] }; 

  var main = (function () {
				return {
					irregulars: zip.irregulars.map(function(a) { return helpFns.replBase(a,0,['es']); }),
					uncountables: zip.uc.reduce(helpFns.toObj,{})
				};
			})();

  if (typeof module !== "undefined" && module.exports) module.exports = main;

  return main;
})();