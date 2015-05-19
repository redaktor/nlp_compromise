// var types = ['adjective', 'adverb', 'comparative', 'superlative', 'noun'];
// 0 means 'return null' for adverbs OR 'conjugate without more/most' for comparative and superlative.
// 1 means 'default behavior'

var lang = 'en';
var adjectives_decline = (function() {
  var zip = [ [ 'wrong', '=' ],
  [ 'public', '=$' ],
  [ 'vague', '=$', 1 ],
  [ 'icy', 'ici$' ],
  [ 'single', 'sing$' ],
  [ 'female', 'woman$' ],
  [ 'male', 'man$' ],
  [ 'simple', 'simp$', 1 ],
  [ 'whole', 'whol$' ],
  [ 'special', 'e=$' ],
  [ 'straight', '=', 1 ],
  [ 'gay', '=' ],
  [ 'fast', '=', 1 ],
  [ 'hard', '=', 1, '=est' ],
  [ 'late', '=', 1, '=st' ],
  [ 'early', '=', 1 ],
  [ 'best', '=' ],
  [ 'latter', '=' ],
  [ 'bad', '=$', 'worse', 'worst' ],
  [ 'idle', 'id$' ],
  [ 'black', 0, 1 ],
  [ 'white', 0, 1 ],
  [ 'green', 0, '=er', 1 ],
  [ 'red', 0, '=der', 1 ],
  [ 'blue', 0, 1 ],
  [ 'yellow', 0, '=er', 1 ],
  [ 'cyan', 0 ],
  [ 'magenta', 0 ],
  [ 'brown', 0, 1 ],
  [ 'orange', 0, 1 ],
  [ 'gold', 0 ],
  [ 'grey', 0, '=er', 0 ],
  [ 'gray', 0, '=er', 0 ],
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
  [ 'sad', 1, '=der', 1 ],
  [ 'overweight', 1 ],
  [ 'main', 1 ],
  [ 'nearby', 1 ],
  [ 'asleep', 1 ],
  [ 'weekly', 1 ],
  [ 'secret', 1, 'more =', 'top =' ],
  [ 'certain', 1 ],
  [ 'ready', 1, 'readier', 'readiest' ],
  [ 'nice', 1, 1, '=st' ],
  [ 'inner', 1, 0, '=most' ],
  [ 'outer', 1, 0, '=most' ],
  [ 'far', 1, 'further', 'furthest' ],
  [ 'clean', 1, 1, 1, '=liness' ],
  [ 'naive', 1, 0, 0, '=ty' ],
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
  'light',
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
  'mean',
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
  'intellegent',
  'formal',
  'tired',
  'solid',
  'angry' ]; 

  var main = (function () {
				var res = { convertables: [], adj_to_advs: {}, adv_donts: [], to_comparative: {}, to_superlative: {}, to_noun: {} };
				var expand = function (s, b) { return (s === 0) ? 0 : s.replace('=', b).replace('$', 'ly'); }
				zip.forEach(function(a) {
					if (typeof a === 'string') {
						res.convertables.push(a); 
					} else {
						if (a.length > 1) {
							if (a[1] === 0) res.adv_donts.push(a[0]);
							if (typeof a[1] === 'string') res.adj_to_advs[a[0]] = expand(a[1], a[0]);
						}
						if (a[2] && a[2] === 1) {
							res.convertables.push(a[0]);
						} else if (a.length>2) {
							res.to_comparative[a[0]] = expand(a[2], a[0]);
						}
						if (a.length>3 && a[3]!=1) res.to_superlative[a[0]] = expand(a[3], a[0]);
						if (a.length>4 && a[4]!=1) res.to_noun[a[0]] = expand(a[4], a[0]);
					}
				});
				var toO = function(h,s){ h[s]=true; return h; };
				res.convertables = res.convertables.reduce(toO, {});
				res.adv_donts = res.adv_donts.reduce(toO, {});
				return res;
			})();

  if (typeof module !== "undefined" && module.exports) module.exports = main;

  return main;
})();