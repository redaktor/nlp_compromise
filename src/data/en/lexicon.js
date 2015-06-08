
//::NODE::
  var lang = 'en';
//::
//::NODE::
  var m = require('./');
  var pm = {};
  function reqPmodules() {
			pm.phrasal_verbs = require('../lexicon/phrasal_verbs'); // TODO - FIXME becomes data module
			['index','to_doer'].forEach(function(n) {
				pm[n] = require('../../parents/verb/conjugate/' + n);
			});
			['to_adverb','to_superlative','to_comparative'].forEach(function(n) {
				pm[n] = require('../../parents/adjective/conjugate/' + n);
			});
		}
    reqPmodules();
//::

  var main = {};
  var zip = { EX: [ 'there' ],
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
     'of',
     'over',
     'under',
     'up',
     'down',
     'together',
     'apart',
     'before',
     'after',
     'with',
     'without',
     'about',
     'to',
     'round',
     'through',
     'onto',
     'around',
     'behind',
     'above',
     'away',
     'across',
     'ahead',
     'upon',
     'aback',
     'back',
     'forth',
     'along',
     'way',
     'until',
     'into',
     'against',
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
   [ 'mine',
     'my',
     'myself',
     'your',
     'yourself',
     'yourselves',
     'himself',
     'hers',
     'herself',
     'itself',
     'ours',
     'ourselves',
     'theirs',
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
  var unzip = function gen(cat){
			if (typeof window != 'undefined' && window.hasOwnProperty('nlp')) { m = window; pm = window; }
			var nrOnes = Object.keys(m.numbers.ones).filter(function(s){ return s!='a' })
			var did = {
				NN: m.nouns_inflect.NN.map(function(a){ return a[0]; }).concat(Object.keys(m.nouns_inflect.uncountables)),
				NNS: m.nouns_inflect.NN.map(function(a){ return a[1]; }),
				VBD: m.verbs_conjugate.irregulars.map(function(o){ return o.past; }),
				VBG: m.verbs_conjugate.irregulars.map(function(o){ return o.gerund; }),
				RB: Object.keys(m.adverbs_decline).concat(Object.keys(m.adjectives_decline.adj_to_advs).map(function(s) { return m.adjectives_decline.adj_to_advs[s]; })),
			}
			var lexiZip = {
				NNA: Object.keys(m.verbs_conjugate.irregularDoers).map(function(s){ return m.verbs_conjugate.irregularDoers[s];  }),
				NNAB: m.abbreviations.nouns,
				NNP: Object.keys(m.firstnames),
				PP: Object.keys(m.nouns.pps),
				PRP: Object.keys(m.nouns.prps),
				CP: Object.keys(m.verbs_special.CP),
				MD: Object.keys(m.verbs_special.MD),
				VBP: m.verbs_conjugate.irregulars.map(function(o){ return o.infinitive; }),
				VBZ: m.verbs_conjugate.irregulars.map(function(o){ return o.present; }),
				JJR: Object.keys(m.adjectives_decline.to_comparative).map(function(s){ return m.adjectives_decline.to_comparative[s]; }),
				JJS: Object.keys(m.adjectives_decline.to_superlative).map(function(s){ return m.adjectives_decline.to_superlative[s]; }),
				JJ: m.adjectives_demonym.concat(
						Object.keys(m.adjectives_decline.adv_donts), Object.keys(m.adjectives_decline.adj_to_advs),
						Object.keys(m.adjectives_decline.to_comparative), Object.keys(m.adjectives_decline.to_superlative),
						Object.keys(m.adverbs_decline).map(function(s) { return m.adverbs_decline[s]; })
				),
				CD: nrOnes.concat(
					Object.keys(m.numbers.teens),
					Object.keys(m.numbers.tens),
					Object.keys(m.numbers.multiple),
					Object.keys(m.dates.months),
					Object.keys(m.dates.days)
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
				for (var key in zip) {

					toMain(key, zip);
				}

				//add phrasal verbs - TODO FIXME
				Object.keys(pm.phrasal_verbs).forEach(function(s) {
					main[s] = pm.phrasal_verbs[s]
				});
				// conjugate all verbs. (~8ms, triples the lexicon size)
				m.verbs.forEach(function(v) {
					var c = pm.index(v);
					var d = pm.to_doer(v);
					var map = {infinitive: 'VBP', past: 'VBD', gerund: 'VBG', present: 'VBZ', future: 'VBF', participle: 'VBN'};
					for (var type in map) {
						if (c[type] && !main[c[type]]) { main[c[type]] = map[type] }
						if (d && !main[d]) { main[d] = 'NNA' }
					}
				});
				// decline all adjectives to their adverbs. (13ms)
				// 'to_adverb','to_superlative','to_comparative'
				m.adjectives.concat(Object.keys(m.adjectives_decline.convertables)).forEach(function(j) {
					main[j] = 'JJ';
					var adv = pm.to_adverb(j);
					if (adv && adv !== j && !main[adv]) {
						main[adv] = main[adv] || 'RB'
					}
					var c = pm.to_comparative(j);
					if (c && !c.match(/^more ./) && c !== j && !main[c]) {
						main[c] = main[c] || 'JJR'
					}
					var s = pm.to_superlative(j);
					if (s && !s.match(/^most ./) && s !== j && !main[s]) {
						main[s] = main[s] || 'JJS'
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
//::NODE::
  if (typeof module !== "undefined" && module.exports) module.exports = main;
//::