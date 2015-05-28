// var types = ['adjective', 'adverb', 'comparative', 'superlative', 'noun'];
// 0 means 'return null' for adverbs OR 'conjugate without more/most' for comparative and superlative.
// 1 means 'default behavior'

var lang = 'en';
var adjectives_decline = (function() {
  
//::NODE::
if (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");
//::
var zip = [ [ 'wrong', '=' ],
  [ 'public', '=ly' ],
  [ 'vague', '=ly', 1 ],
  [ 'icy', 'icily' ],
  [ 's_le', 's_ly' ],
  [ 'fem!e', 'womanly' ],
  [ 'm!e', 'manly' ],
  [ 'simple', 'simply', 1 ],
  [ 'whole', 'wholly' ],
  [ 'speci!', 'e=ly' ],
  [ 'stra&', '=', 1 ],
  [ 'gay', '=' ],
  [ 'fast', '=', 1 ],
  [ 'hard', '=', 1, '=est' ],
  [ 'late', '=', 1, '=st' ],
  [ 'early', '=', 1 ],
  [ 'best', '=' ],
  [ 'latt~', '=' ],
  [ 'bad', '=ly', 'worse', 'worst' ],
  [ 'idle', 'idly' ],
  [ 'black', 0, 1 ],
  [ 'white', 0, 1 ],
  [ 'green', 0, '=~', 1 ],
  [ 'r%', 0, '=d~', 1 ],
  [ 'blue', 0, 1 ],
  [ 'yellow', 0, '=~', 1 ],
  [ 'cyan', 0 ],
  [ 'mag#a', 0 ],
  [ 'brown', 0, 1 ],
  [ 'orange', 0, 1 ],
  [ 'gold', 0 ],
  [ 'grey', 0, '=~', 0 ],
  [ 'gray', 0, '=~', 0 ],
  [ 'foreign', 0 ],
  [ 'mod~n', 0 ],
  [ 'next', 0 ],
  [ 'difficult', 0 ],
  [ 'degen~ate', 0 ],
  [ 'young', 0, 1 ],
  [ 'awake', 0 ],
  [ 'back', 0 ],
  [ 'complex', 0 ],
  [ 'cool', 0, 1 ],
  [ 'dirty', 0, 1 ],
  [ 'done', 0 ],
  [ 'empty', 0, 1 ],
  [ 'fat', 0, 1 ],
  [ 'f~tile', 0 ],
  [ 'frozen', 0 ],
  [ 'm%ium', 0 ],
  [ 'par!lel', 0 ],
  [ 'outdoor', 0 ],
  [ 'unknown', 0 ],
  [ 'und~siz%', 0 ],
  [ 'us%', 0 ],
  [ 'welcome', 0 ],
  [ 'fix%', 0 ],
  [ 'mix%', 0 ],
  [ 'sup~', 0 ],
  [ 'sup~b', 0 ],
  [ 'guilty', 0 ],
  [ 'tiny', 0 ],
  [ 'able', 0 ],
  [ 'unable', 0 ],
  [ 'same', 0 ],
  [ 'adult', 0 ],
  [ 'good', 'well', 'bett~', 'best' ],
  [ 'sad', 1, '=d~', 1 ],
  [ 'ov~we&', 1 ],
  [ 'main', 1 ],
  [ 'nearby', 1 ],
  [ 'asleep', 1 ],
  [ 'weekly', 1 ],
  [ 'secret', 1, 'more =', 'top =' ],
  [ 'c~tain', 1 ],
  [ 'ready', 1, 'readi~', 'readiest' ],
  [ 'nice', 1, 1, '=st' ],
  [ 'inn~', 1, 0, '=most' ],
  [ 'out~', 1, 0, '=most' ],
  [ 'far', 1, 'furth~', 'furthest' ],
  [ 'clean', 1, 1, 1, '=liness' ],
  [ 'naive', 1, 0, 0, '=ty' ],
  'stra&',
  'r%',
  'full',
  'absurd',
  '!~t',
  '!ive',
  'big',
  'bitt~',
  'brash',
  'brave',
  'brief',
  'br&',
  'broad',
  'c!m',
  'charm_',
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
  'eag~',
  'easy',
  'even',
  'extreme',
  'faint',
  'fair',
  'fanc',
  'feeble',
  'few',
  'fi~ce',
  'fine',
  'firm',
  'flat',
  'forgetful',
  'frail',
  'free',
  'fresh',
  'funny',
  'g#le',
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
  'l&',
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
  'p!e',
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
  'sh!low',
  'sharp',
  'short',
  'shrill',
  'slim',
  'slow',
  'sm!l',
  'smooth',
  'soft',
  'soon',
  'sore',
  'sour',
  'square',
  'st!e',
  'steep',
  'stiff',
  'strange',
  'strict',
  'strong',
  'sweet',
  'swift',
  't!l',
  'tame',
  'tart',
  'tend~',
  'tense',
  'thick',
  'thin',
  't&',
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
  'bor%',
  'bor_',
  'effici#',
  'gruesome',
  'handsome',
  'innoc#',
  'lean',
  'little',
  'long',
  'mean',
  'norm!',
  'proud',
  'rapid',
  'scar%',
  'smart',
  'thirsty',
  'hungry',
  'clear',
  'happy',
  'lucky',
  'pretty',
  'int~est_',
  'attractive',
  'dang~ous',
  'intellig#',
  'intelleg#',
  'form!',
  'tir%',
  'solid',
  'angry' ]; 

  var main = (function () {
				var repJJ = function(s) { return (typeof s !== 'string') ? s : helpFns.repl(s, 0, ['ight', 'ing', 'ent', 'er', 'al', 'ed']); }
				var res = { convertables: [], adj_to_advs: {}, adv_donts: [], to_comparative: {}, to_superlative: {}, to_noun: {} };
				var expand = function (s, b) { return (s === 0) ? 0 : s.replace('=', b); }
				zip.forEach(function(_a) {
					if (typeof _a === 'string') {
						res.convertables.push(repJJ(_a));
					} else {
						var a = _a.map(function(w){ return repJJ(w); });
						if (a.length > 1) {
							if (a[1] === 0) { res.adv_donts.push(a[0]); }
							if (typeof a[1] === 'string') { res.adj_to_advs[a[0]] = expand(a[1], a[0]); }
						}
						if (a[2] && a[2] === 1) {
							res.convertables.push(a[0])
						} else if (a.length>2) {
							res.to_comparative[a[0]] = expand(a[2], a[0])
						}
						if (a.length>3 && a[3]!=1) {
							res.to_superlative[a[0]] = expand(a[3], a[0])
						}
						if (a.length>4 && a[4]!=1) {
							res.to_noun[a[0]] = expand(a[4], a[0])
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