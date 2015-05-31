// var types = ['adjective', 'adverb', 'comparative', 'superlative', 'noun'];
// 0 means 'return null' for adverbs OR 'conjugate without more/most' for comparative and superlative.
// 1 means 'default behavior'

var lang = 'en';
var adjectives_decline = (function() {
  
//::NODE::
if (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");
//::
var zip = [ [ 'wrong', 'wrong' ],
  [ 'public', 'publicly' ],
  [ 'vague', 'vaguely', 1 ],
  [ 'icy', 'icily' ],
  [ 'single', 'singly' ],
  [ 'female', 'womanly' ],
  [ 'male', 'manly' ],
  [ 'simple', 'simply', 1 ],
  [ 'whole', 'wholly' ],
  [ 'special', 'especially' ],
  [ 'straight', 'straight', 1 ],
  [ 'gay', 'gay' ],
  [ 'fast', 'fast', 1 ],
  [ 'hard', 'hard', 1, 'hardest' ],
  [ 'late', 'late', 1, 'latest' ],
  [ 'early', 'early', 1 ],
  [ 'best', 'best' ],
  [ 'latter', 'latter' ],
  [ 'bad', 'badly', 'worse', 'worst' ],
  [ 'idle', 'idly' ],
  [ 'black', 0, 1 ],
  [ 'white', 0, 1 ],
  [ 'green', 0, 'greener', 1 ],
  [ 'red', 0, 'redder', 1 ],
  [ 'blue', 0, 1 ],
  [ 'yellow', 0, 'yellower', 1 ],
  [ 'cyan', 0 ],
  [ 'magenta', 0 ],
  [ 'brown', 0, 1 ],
  [ 'orange', 0, 1 ],
  [ 'gold', 0 ],
  [ 'grey', 0, 'greyer', 0 ],
  [ 'gray', 0, 'grayer', 0 ],
  [ 'foreign', 0 ],
  [ 'modern', 0 ],
  [ 'next', 0 ],
  [ 'difficult', 0 ],
  [ 'degenerate', 0 ],
  [ 'young', 0, 1 ],
  [ 'awake', 0 ],
  [ 'back', 0 ],
  [ 'complex', 0 ],
  [ 'cool', 0, 1 ],
  [ 'dirty', 0, 1 ],
  [ 'done', 0 ],
  [ 'empty', 0, 1 ],
  [ 'fat', 0, 1 ],
  [ 'fertile', 0 ],
  [ 'frozen', 0 ],
  [ 'medium', 0 ],
  [ 'parallel', 0 ],
  [ 'outdoor', 0 ],
  [ 'unknown', 0 ],
  [ 'undersized', 0 ],
  [ 'used', 0 ],
  [ 'welcome', 0 ],
  [ 'fixed', 0 ],
  [ 'mixed', 0 ],
  [ 'super', 0 ],
  [ 'superb', 0 ],
  [ 'guilty', 0 ],
  [ 'tiny', 0 ],
  [ 'able', 0 ],
  [ 'unable', 0 ],
  [ 'same', 0 ],
  [ 'adult', 0 ],
  [ 'good', 'well', 'better', 'best' ],
  [ 'sad', 1, 'sadder', 1 ],
  [ 'overweight', 1 ],
  [ 'main', 1 ],
  [ 'nearby', 1 ],
  [ 'asleep', 1 ],
  [ 'weekly', 1 ],
  [ 'secret', 1, 'more secret', 'top secret' ],
  [ 'certain', 1 ],
  [ 'ready', 1, 'readier', 'readiest' ],
  [ 'nice', 1, 1, 'nicest' ],
  [ 'inner', 1, 0, 'innermost' ],
  [ 'outer', 1, 0, 'outermost' ],
  [ 'far', 1, 'further', 'furthest' ],
  [ 'clean', 1, 1, 1, 'cleanliness' ],
  [ 'naive', 1, 0, 0, 'naivety' ],
  'vague',
  'simple',
  'straight',
  'fast',
  'hard',
  'late',
  'early',
  'black',
  'white',
  'green',
  'red',
  'blue',
  'yellow',
  'brown',
  'orange',
  'young',
  'cool',
  'dirty',
  'empty',
  'fat',
  'sad',
  'nice',
  'clean',
  'full',
  'absurd',
  'alert',
  'alive',
  'big',
  'bitter',
  'brash',
  'brave',
  'brief',
  'bright',
  'broad',
  'calm',
  'charming',
  'cheap',
  'close',
  'cold',
  'cruel',
  'curly',
  'cute',
  'damp',
  'dark',
  'dead',
  'dear',
  'deep',
  'drunk',
  'dry',
  'dull',
  'eager',
  'easy',
  'even',
  'extreme',
  'faint',
  'fair',
  'fanc',
  'feeble',
  'few',
  'fierce',
  'fine',
  'firm',
  'flat',
  'forgetful',
  'frail',
  'free',
  'fresh',
  'funny',
  'gentle',
  'glad',
  'glib',
  'grand',
  'great',
  'harsh',
  'heavy',
  'high',
  'hollow',
  'hot',
  'impolite',
  'important',
  'keen',
  'kind',
  'lame',
  'large',
  'loose',
  'loud',
  'low',
  'lush',
  'macho',
  'mad',
  'mature',
  'meek',
  'mellow',
  'mundane',
  'narrow',
  'near',
  'neat',
  'new',
  'noisy',
  'odd',
  'old',
  'pale',
  'pink',
  'plain',
  'poor',
  'pure',
  'purple',
  'quick',
  'quiet',
  'rare',
  'raw',
  'rich',
  'round',
  'rude',
  'safe',
  'scarce',
  'shallow',
  'sharp',
  'short',
  'shrill',
  'slim',
  'slow',
  'small',
  'smooth',
  'soft',
  'soon',
  'sore',
  'sour',
  'square',
  'stale',
  'steep',
  'stiff',
  'strange',
  'strict',
  'strong',
  'sweet',
  'swift',
  'tall',
  'tame',
  'tart',
  'tender',
  'tense',
  'thick',
  'thin',
  'tight',
  'tough',
  'true',
  'vast',
  'vulgar',
  'warm',
  'weak',
  'weird',
  'wet',
  'wild',
  'windy',
  'wise',
  'aggressive',
  'awesome',
  'beautiful',
  'bored',
  'boring',
  'efficient',
  'gruesome',
  'handsome',
  'innocent',
  'lean',
  'little',
  'long',
  'normal',
  'proud',
  'rapid',
  'scared',
  'smart',
  'thirsty',
  'hungry',
  'clear',
  'happy',
  'lucky',
  'pretty',
  'interesting',
  'attractive',
  'dangerous',
  'intelligent',
  'intellegent',
  'formal',
  'tired',
  'solid',
  'angry' ]; 

  var main = (function () {
				var res = { convertables: [], adj_to_advs: {}, adv_donts: [], to_comparative: {}, to_superlative: {}, to_noun: {} };
				zip.forEach(function(_a) {
					if (typeof _a === 'string') {
						res.convertables.push(_a);
					} else {
						var a = _a.map(function(w){ return w; });
						if (a.length > 1) {
							if (a[1] === 0) { res.adv_donts.push(a[0]); }
							if (typeof a[1] === 'string') { res.adj_to_advs[a[0]] = a[1]; }
						}
						if (a[2] && a[2] === 1) {
							res.convertables.push(a[0]);
						} else if (a.length>2) {
							res.to_comparative[a[0]] = a[2];
						}
						if (a.length>3 && a[3]!=1) {
							res.to_superlative[a[0]] = a[3];
						}
						if (a.length>4 && a[4]!=1) {
							res.to_noun[a[0]] = a[4];
						}
					}
				});
				res.convertables = res.convertables.reduce(helpFns.toObj, {});
				res.adv_donts = res.adv_donts.reduce(helpFns.toObj, {});
				return res;
			})();

//::NODE::
  if (typeof module !== "undefined" && module.exports) module.exports = main;
//::

  return main;
})();