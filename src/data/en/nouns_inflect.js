var _ = require("../../_");

// singular nouns having irregular plurals


  exports.zip = { NN: 
   [ [ 'child', 'children' ],
     [ 'person', 'people' ],
     [ 'leaf', 'leaves' ],
     [ 'database', 'databases' ],
     [ 'quiz', 'quizzes' ],
     [ 'goose', 'geese' ],
     [ 'phenomenon', 'phenomena' ],
     [ 'barracks', 'barracks' ],
     [ 'deer', 'deer' ],
     [ 'syllabus', 'syllabi' ],
     [ 'index', 'indices' ],
     [ 'appendix', 'appendices' ],
     [ 'criterion', 'criteria' ],
     [ 'man', 'men' ],
     [ 'sex', 'sexes' ],
     [ 'narrative', 'narratives' ],
     [ 'addendum', 'addenda' ],
     [ 'alga', 'algae' ],
     [ 'alumna', 'alumnae' ],
     [ 'alumnus', 'alumni' ],
     [ 'bacillus', 'bacilli' ],
     [ 'beau', 'beaux' ],
     [ 'cactus', 'cactuses' ],
     [ 'château', 'châteaux' ],
     [ 'corpus', 'corpora' ],
     [ 'curriculum', 'curricula' ],
     [ 'die', 'dice' ],
     [ 'echo', 'echoes' ],
     [ 'embargo', 'embargoes' ],
     [ 'foot', 'feet' ],
     [ 'formula', 'formulas' ],
     [ 'genus', 'genera' ],
     [ 'graffito', 'graffiti' ],
     [ 'hippopotamus', 'hippopotami' ],
     [ 'larva', 'larvae' ],
     [ 'libretto', 'libretti' ],
     [ 'loaf', 'loaves' ],
     [ 'matrix', 'matrices' ],
     [ 'memorandum', 'memoranda' ],
     [ 'mosquito', 'mosquitoes' ],
     [ 'opus', 'opera' ],
     [ 'ovum', 'ova' ],
     [ 'ox', 'oxen' ],
     [ 'radius', 'radiuses' ],
     [ 'referendum', 'referenda' ],
     [ 'tableau', 'tableaux' ],
     [ 'that', 'those' ],
     [ 'thief', 'thieves' ],
     [ 'tooth', 'teeth' ],
     [ 'vita', 'vitae' ] ],
  PRP: [ [ 'i', 'we' ], [ 'he', 'they' ], [ 'she', 'they' ] ],
  PP: 
   [ [ 'mine', 'ours' ],
     [ 'myself', 'yourselves' ],
     [ 'myself', 'ourselves' ],
     [ 'yourself', 'themselves' ],
     [ 'his', 'theirs' ],
     [ 'himself', 'themselves' ],
     [ 'her', 'theirs' ],
     [ 'hers', 'theirs' ],
     [ 'herself', 'themselves' ],
     [ 'its', 'theirs' ],
     [ 'theirs', 'theirs' ],
     [ 'themself', 'themselves' ] ],
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
     'hertz' ] }
module.exports = (function () {

				exports.zip.irregulars = exports.zip.NN.concat(exports.zip.PRP, exports.zip.PP);
				exports.zip.uncountables = exports.zip.uc.reduce(_.toObj,{});
				return exports.zip;
			})();