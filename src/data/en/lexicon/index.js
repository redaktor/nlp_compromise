if (!lang) {var lang = 'en';}

var data = require('../');
var conjugate = require('../../../parents/verb/conjugate');
var to_doer = require('../../../parents/verb/conjugate/to_doer');
var to_adverb = require('../../../parents/adjective/conjugate/to_adverb');
var to_comparative = require('../../../parents/adjective/conjugate/to_comparative');
var to_superlative = require('../../../parents/adjective/conjugate/to_superlative');
var main = {};

  exports.zip = { EX: [ 'there' ],
  NN: 
   [ 'president',
     'dollar',
     'student',
     'patent',
     'funding',
     'morning',
     'banking',
     'ceiling',
     'energy',
     'secretary',
     'purpose',
     'event' ],
  NNS: [ 'friends', 'sons', 'partners' ],
  CC: 
   [ 'how',
     'or',
     'while',
     'nor',
     'though',
     'because',
     'but',
     'for',
     'and',
     'if',
     'however',
     'before',
     'although',
     'not',
     'whether',
     'yet',
     'therefore',
     'plus',
     'versus' ],
  VBD: [ 'walked', 'where\'d', 'when\'d', 'how\'d', 'what\'d' ],
  VBN: [ 'born' ],
  VBG: [ 'according', 'resulting', 'staining' ],
  DT: 
   [ 'that',
     'this',
     'these',
     'those',
     'such',
     'neither',
     'which',
     'what',
     'the',
     'no',
     'any',
     'each',
     'whatever',
     'whichever',
     'whenever',
     'whoever',
     'wherever',
     'an',
     'a',
     'own',
     'few',
     'both',
     'much',
     'some',
     'enough',
     'every',
     'another',
     'plenty',
     'least',
     'various',
     'either',
     'else',
     'la',
     'le',
     'les',
     'des',
     'de',
     'du',
     'el' ],
  IN: 
   [ 'in',
     'out',
     'on',
     'off',
     'away',
     'back',
     'over',
     'under',
     'up',
     'down',
     'together',
     'apart',
     'into',
     'for',
     'against',
     'after',
     'before',
     'of',
     'about',
     'to',
     'round',
     'through',
     'onto',
     'around',
     'behind',
     'above',
     'across',
     'ahead',
     'upon',
     'aback',
     'forth',
     'along',
     'way',
     'with',
     'without',
     'until',
     'except',
     'by',
     'between',
     'at',
     'as',
     'from',
     'among',
     'amid',
     'since',
     'within',
     'during',
     'per',
     'throughout',
     'than',
     'via',
     'despite',
     'above',
     'below',
     'unless',
     'whereas',
     'unlike',
     'towards',
     'besides',
     'amidst',
     'amongst',
     'apropos',
     'atop',
     'barring',
     'chez',
     'mid',
     'midst',
     'notwithstanding',
     'qua',
     'sans',
     'vis-a-vis',
     'thru',
     'till',
     'versus',
     'w/o',
     '\'o',
     'o\'',
     'a\'' ],
  PP: 
   [ 'my',
     'myself',
     'your',
     'yourself',
     'yourselves',
     'himself',
     'herself',
     'itself',
     'ourselves',
     'themself',
     'themselves',
     'none',
     'who',
     'whom',
     'whose',
     'something',
     'anything',
     'anyone',
     'lot',
     'nothing',
     'everything' ],
  UH: 
   [ 'uhh',
     'uh-oh',
     'ugh',
     'sheesh',
     'eww',
     'pff',
     'voila',
     'oy',
     'eep',
     'hurrah',
     'yuck',
     'ow',
     'duh',
     'oh',
     'hmm',
     'yeah',
     'whoa',
     'ooh',
     'whee',
     'ah',
     'bah',
     'gah',
     'yaa',
     'phew',
     'gee',
     'ahem',
     'eek',
     'meh',
     'yahoo',
     'oops',
     'd\'oh',
     'psst',
     'argh',
     'grr',
     'nah',
     'shhh',
     'whew',
     'mmm',
     'yay',
     'uh-huh',
     'boo',
     'wow',
     'nope' ],
  FW: [ 'ie', 'etc' ],
  RB: 
   [ 'when',
     'whence',
     'where',
     'why',
     'now',
     'again',
     'here',
     'so',
     'very',
     'just',
     'too',
     'quite',
     'then',
     'once',
     'maybe',
     'rather',
     'anyway',
     'hence',
     'further',
     'already',
     'soon',
     'directly',
     'toward',
     'forever',
     'apart',
     'instead',
     'yes',
     'alone',
     'ago',
     'indeed',
     'ever',
     'perhaps',
     'thus',
     'often',
     'never',
     'always',
     'sometimes',
     'also',
     'several',
     'randomly',
     'abroad',
     'almost',
     'twice',
     'somewhat',
     'somehow',
     'meanwhile',
     'furthermore',
     'aside',
     'moreover',
     'anymore',
     'newly',
     'damn',
     'absolutely',
     'actually',
     'apparently',
     'approximately',
     'certainly',
     'clearly',
     'completely',
     'definitely',
     'easily',
     'effectively',
     'entirely',
     'essentially',
     'exactly',
     'extremely',
     'fairly',
     'frankly',
     'frequently',
     'generally',
     'hardly',
     'heavily',
     'highly',
     'hopefully',
     'largely',
     'literally',
     'mostly',
     'necessarily',
     'nicely',
     'obviously',
     'particularly',
     'possibly',
     'primarily',
     'probably',
     'precisely',
     'really',
     'relatively',
     'seriously',
     'significantly',
     'slightly',
     'specifically',
     'strongly',
     'surely',
     'totally',
     'truly',
     'typically',
     'ultimately',
     'usually',
     'virtually',
     'widely' ],
  RBR: [ 'more' ],
  RBS: [ 'most' ] }
  var unzip = function lexicon(cat){
			if (typeof window != 'undefined' && window.hasOwnProperty('nlp')) { data = window; }
			var nrOnes = Object.keys(data.numbers.ones).filter(function(s){ return s!='a' }) 
			var did = {
				NN: data.nouns_inflect.NN.map(function(a){ return a[0]; }).concat(Object.keys(data.nouns_inflect.uncountables)),
				NNS: data.nouns_inflect.NN.map(function(a){ return a[1]; }),
				VBD: data.verbs_conjugate.irregulars.map(function(o){ return o.past; }),
				VBG: data.verbs_conjugate.irregulars.map(function(o){ return o.gerund; }),
				RB: Object.keys(data.adverbs_decline).concat(Object.keys(data.adjectives_decline.adj_to_advs).map(function(s) { 
					return data.adjectives_decline.adj_to_advs[s];
				})),
			}
			var lexiZip = {
				NNA: Object.keys(data.verbs_conjugate.irregularDoers).map(function(s){ return data.verbs_conjugate.irregularDoers[s];  }),
				NNAB: data.abbreviations.nouns,
				NNP: Object.keys(data.firstnames),
				PP: Object.keys(data.nouns.pps),
				PRP: Object.keys(data.nouns.prps),
				CP: Object.keys(data.verbs_special.CP),
				MD: Object.keys(data.verbs_special.MD),
				VBP: data.verbs_conjugate.irregulars.map(function(o){ return o.infinitive; }),
				VBZ: data.verbs_conjugate.irregulars.map(function(o){ return o.present; }),
				JJR: Object.keys(data.adjectives_decline.to_comparative).map(function(s){ return data.adjectives_decline.to_comparative[s]; }),
				JJS: Object.keys(data.adjectives_decline.to_superlative).map(function(s){ return data.adjectives_decline.to_superlative[s]; }),
				JJ: data.adjectives_demonym.concat(
						Object.keys(data.adjectives_decline.adv_donts), Object.keys(data.adjectives_decline.adj_to_advs),
						Object.keys(data.adjectives_decline.to_comparative), Object.keys(data.adjectives_decline.to_superlative),
						Object.keys(data.adverbs_decline).map(function(s) { return data.adverbs_decline[s]; })
				),
				CD: nrOnes.concat( 
					Object.keys(data.numbers.teens), 
					Object.keys(data.numbers.tens), 
					Object.keys(data.numbers.multiple),
					Object.keys(data.dates.months),
					Object.keys(data.dates.days)
				)
			}
			//::NODE::
			if (cat===1) {return [did,lexiZip]}
			//::
			
			if (!cat) {
				var toMain = function(key, o) {
					o[key].forEach(function(w) { if (w && !main[w]) {main[w] = key} });
				}
				// irregulars to main
				for (var key in did) { toMain(key, did) }
				for (var key in lexiZip) { toMain(key, lexiZip) }
				// zip to main
				for (var key in exports.zip) {

					toMain(key, exports.zip);
				}
				
				// conjugate all phrasal verbs:
				var c = {};
				var splits, verb, particle, phrasal;
				for (var pv in data.phrasalVerbs) {
					splits = pv.split(' ');
					verb = splits.shift();
					particle = splits.join(' ');
					c = conjugate(verb);
					for (var tense in c) {
						if (tense != 'doer') {
							phrasal = c[tense] + ' ' + particle;
							main[phrasal] = data.schema.getTense(tense).tag;
						}
					}
				}
				// conjugate all verbs: (~8ms, triples the lexicon size)
				c = {};
				data.verbs.forEach(function(v) {
					c = conjugate(v);
					for (var tense in data.schema._tenses) {
						if (c[tense] && !main[c[tense]]) { 
							main[c[tense]] = data.schema.getTense(tense).tag;
						}
					}
				});
				// decline all adjectives to their adverbs_ (~13ms)
				// 'to_adverb','to_superlative','to_comparative'
				data.adjectives.concat(Object.keys(data.adjectives_decline.convertables)).forEach(function(j) {
					if (!main.hasOwnProperty(j)) {
						main[j] = 'JJ';
						var adv = to_adverb(j);
						if (adv && adv !== j && !main[adv]) {
							main[adv] = main[adv] || 'RB';
						}
						var c = to_comparative(j);
						if (c && !c.match(/^more ./) && c !== j && !main[c]) {
							main[c] = main[c] || 'JJR';
						}
						var s = to_superlative(j);
						if (s && !s.match(/^most ./) && s !== j && !main[s]) {
							main[s] = main[s] || 'JJS';
						}
					}
				});
				// Make sure CP are CP and not conjugated verb type
				// TODO FIXME
				lexiZip.CP.forEach(function(w) {
					main[w] = 'CP';
				});
				
				return main;
			}
			if (cat in did) { return did[cat] }
			return [];
		}
  unzip();
module.exports = main;
