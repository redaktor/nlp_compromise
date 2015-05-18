/* This will build the lexica from _dictionary !

// use it as a CLI-Tool:
//  LIST possible languages:
//    node _build -ls
//  GENERATE all languages :
//    node _build -l
//  GENERATE one language :
//    node _build -l en
//  GENERATE some languages :
//    node _build -l en,de

// or as module:
//  all languages :
//    require('./_build')();
//  one language :
//    require('./_build')('en');
//  some languages :
//    require('./_build')(['en','de']);

// -->
// RETURNS module files, written in folders named after the language, e.g.
// ./en/...
*/

var fs = require('fs');
var path = require('path');
var util = require('util');

var dict = require('./_dictionary');

var flag = function(meta, lang) {
	// return flags compressed, like 'IAW'
	var flagStr = '';
	var flags = {
		stopword: 'S',
		filler: 'F',
		entitySubstitution: 'E',
		aux: 'A',
		weak: 'W',
		irregular: 'I',
		passive: 'P',
		demonstrative: 'D',
		wh: 'w',
		unconfirmed: 'u',
		vulgar: 'v',
		entitySubstitutionCheck: 'x'
	};
	for (var key in meta) {
		if (flags.hasOwnProperty(key) && flags[key]) {
			if (typeof meta[key] === 'boolean' || meta[key].indexOf(lang)) {
				flagStr = flagStr.concat(flags[key]);
			}
		}
	}
	return flagStr;
};

var possibleLanguage = {};
var ignores = ['uid', 'ref', 'title', 'description', 'meta'];
for (var cat in dict) {
	if (dict[cat].hasOwnProperty('words')) {
		dict[cat].words.forEach(function(o) {
			for (var k in o) {
				if (ignores.indexOf(k) < 0) { 
					if (!possibleLanguage.hasOwnProperty(k)) possibleLanguage[k] = 0;
					possibleLanguage[k]++;
				}
			}
		});
	}
}
var possibleLanguages = Object.keys(possibleLanguage);

function generateLanguage(lang) {
	if (possibleLanguages.indexOf(lang) < 0) {
		console.log( 'Language not found:', '"'+lang+'"' );
		return false;
	}
	var results = [[]]; //TODO minor - has first el. only for DEBUG - SHOULD be empty
	// some helpers for the generators
	var newRes = function() {
		if (results[results.length-1] > 0) results.push([]);
		return [];
	}
	var did = function(s) {
		var l = results[results.length-1];
		if (s instanceof Array) {
			results[results.length-1] = l.concat(s);	
		} else {
			results[results.length-1].push(s);
		}
		return s;
	}
	var handled = function(s) {
		return results[results.length-1].indexOf(s) > -1;
	}
	var possible = function(o) { 
		return ( o.hasOwnProperty(lang) ); 
	};
	var possibleRef = function(o) { 
		return ( o.hasOwnProperty(lang) && o.hasOwnProperty('ref') ); 
	};
	var possibleIrreg = function(o) { 
		return ( (o.hasOwnProperty(lang)) && (o.hasOwnProperty('uid')) ); 
	};
	var possibleRest = function(o) { 
		return ( (o.hasOwnProperty(lang)) && !handled(o[lang]) ); 
	};
	var meta = function(o, key) {
		return (!handled(o[lang]) && possible(o) && o.hasOwnProperty('meta') && o.meta[key] && o.meta[key].indexOf(lang) > -1);
	};
	var val = function(o) { return o[lang]; }
	//
	
	var langStr = "var lang = '".concat(lang, "';");
	// generate the DATA
	var generators = [
	
		// NOUN : _irregulars, _uncountables, _entityBlacklist
		{ // 0
			id: 'nouns_inflect',
			description: 'singular nouns having irregular plurals',
			// zip
			zip: function(lang) { 
				var _irregulars = newRes();
				var _uncountables = dict.NN.words.filter(function(o) { 
					return meta(o, 'uncountable');
				}).map(val);
				dict.NN.words.filter(possibleIrreg).forEach(function(o) { 
					dict.NNS.words.filter(possibleRef).forEach(function(op) {
						if (op.ref === o.uid) {
							_irregulars.push([o[lang], op[lang].replace(o[lang], '=').replace(o[lang].slice(0,-2), '_').replace(/es/g, '$')]);
						}
					});
				});
				return {
					irregulars: _irregulars,
					uncountables: _uncountables
				};
			},
			// expand
			unzip: {
				array: 'irregulars',
				fn: function(a) { a[1] = a[1].replace('=',a[0]).replace('_', a[0].slice(0,-2)).replace(/\$/g,'es'); return a; }
			}
		},
		
		
		{ // 1
			id: 'nouns',
			description: '',
			// build
			zip: function(lang) { 
				// TODO: 'it', 'one'
				return {
					entityBlacklist: dict.NN.words.concat(dict.PP.words, dict.DT.words).filter(function(o) { 
						return meta(o, 'entityBlacklist');
					}).map(val),
					prps: dict.PRP.words.map(val)
				};
			}
		},
	
		
		// VERB : _irregulars, _noDoers, _comparatives, _superlatives, _regulars
		{ // 2
			id: 'verbs_special',
			description: '',
			// build
			zip: function(lang) { 
				// TODO: 'it', 'one'
				return {
					cps: dict.CP.words.map(val),
					mds: dict.MD.words.map(val)
				};
			}
		},
		
		{ // 3
			id: 'verbs_conjugate',
			description: '',
			prefix: '// types: infinitive, gerund, past, present, doer, future \n',
			// compress
			zip: function(lang) {
				var types = {
				/*VBP: 'infinitive',*/
					VBG: 'gerund',
					VBD: 'past',
					VBZ: 'present',
					NNA: 'doer'
				};
				var _irregulars = newRes();
				var _noDoers = {};
				//var irregularFlags = [];
				dict.VBP.words.filter(possibleIrreg).forEach(function(o) {
					var iStr = o[lang];
					var conjugateds = [iStr.replace('ing', '$').replace('er', '_')];
					for (var type in types) {
						var conjugated = 0;
						dict[type].words.filter(possibleRef).forEach(function(oc) {
							if (oc.ref === o.uid) {
								switch (lang) {
									default:
										conjugated = oc[lang].replace(iStr, '=').replace('ing', '$').replace('er', '_');
									break;
								}
								did(o[lang]);
							}
						});
						conjugateds.push( (conjugated) ? conjugated : 0 );
						/*
						TODO - CHECK participle / future error in last change of original repo !
						*/
					}
					// check noDoer
					if (!conjugateds[4] && (!o.hasOwnProperty('meta') || !o.meta.noDoer || o.meta.noDoer.indexOf(lang) < 0)) {
						conjugateds.pop();
					}
					
					_irregulars.push(conjugateds);
				});
				
				dict.VBP.words.filter(function(o) { 
					return meta(o, 'noDoer');
				}).forEach(function(o) {
					_noDoers[did(o[lang])] = 1;
				});
				
				
				/* TODO flags for all conjugated :  'I'.concat(flag(o.meta))) */
				return {
					irregulars: _irregulars,
					noDoers: _noDoers,
					irregularDoers: {}
				};
			},
			
			// expand
			unzip: {
				array: 'irregulars',
				fn: function(a) {
					var types = ['infinitive','gerund','past','present','doer','future'];
					var obj = {};
					switch (lang) {
						default:
							var r = function(s) {return s;}
							a.forEach(function(s, i) {
								if (s && i>0) s = s.replace('=', a[0]);
								if (s) s = s.replace(/\$/g, 'ing').replace(/_/g, 'er');
								if (i > 3 && !s) {
									main.noDoers[r(a[0])] = 1;
								} else if (i > 3) {
									main.irregularDoers[r(a[0])] = s;
								} else {
									obj[types[i]] = s;
								}
							});
						break;
					}
					return obj;
				}
			}
		},
				
		{ // 4
			id: 'verbs',
			description: '',
			// build
			zip: function(lang) { 
				return dict.VBP.words.filter(possibleRest).map(function(o) { 
					return did(o[lang]);
				}).concat(dict.VB.words.filter(possible).map(val));
			}
		},
		
		
		// ADJECTIVE : _irregulars, _demonyms, _regulars
		{ // 5
			id: 'adjectives_decline',
			description: '',
			prefix: "// var types = ['adjective', 'adverb', 'comparative', 'superlative', 'noun'];\n"+
			"// 0 means 'return null' for adverbs OR 'conjugate without more/most' for comparative and superlative.\n"+
			"// 1 means 'default behavior'\n",
			// compress
			zip: function(lang) {
				var types = {
					/*JJ: 'adjective',*/ 
					RB: 'adverb', 
					JJR: 'comparative', 
					JJS: 'superlative',
					NN: 'noun'
				};
				var irregulars = newRes();
				//var irregularFlags = [];
				dict.JJ.words.filter(possibleIrreg).forEach(function(o) {
					var jjStr = o[lang];
					var declineds = [jjStr];
					for (var type in types) {
						var declined = 1;
						if (type === 'RB' && meta(o, 'noAdverb')) declined = 0;
						if ((type === 'JJR' || type === 'JJS')) { // TODO
							if (meta(o, 'noComparative')) {
								declined = -1; 
							} else if (!o.hasOwnProperty('meta') || !o.meta.convertable) {
								declined = 0;
							}
						}
						if (declined > 0 || !o.hasOwnProperty('meta') || !o.meta.convertable) {
							dict[type].words.filter(possibleRef).forEach(function(oa) {
								if (oa.ref === o.uid) {
									switch (lang) {
										default:
											declined = (typeof oa[lang] === 'number') ? oa[lang] : oa[lang].replace(jjStr, '=').replace('ly', '$');
										break;
									}
								} 
							});
						}
						if (declined === -1) declined = 0;
						declineds.push( (declined) ? declined : 0 );
					}
					
					if (declineds.length > 4 && declineds[4] === 1) declineds.pop();
					if (declineds.length === 4 && declineds[2] === 0 && declineds[3] === 0) {
						declineds.splice(2, 2);
					} else if (declineds.length === 4 && declineds[2] === 1 && declineds[3] === 1) {
						declineds.pop();
					}
					irregulars.push(declineds);
				});
				
				// add the rest which are convertable
				results.push(irregulars.map(function(declinedArr) { return declinedArr[0]; }));
				var possibleConvertable = function(o) { return meta(o, 'convertable'); };
				dict.JJ.words.filter(possibleConvertable).forEach(function(o) {
					if (!handled(o[lang])) {
						irregulars.push(o[lang]);
						did(o[lang]);
					}
				});
				/* TODO flags for all conjugated :  'I'.concat(flag(o.meta))) */
				return irregulars;	
			},
			
			// expand
			unzip: function () {
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
				return res;
			}
			
			
		},
		
		{ // 6
			id: 'adjectives_demonym',
			description: '',
			// compress
			zip: function(lang) {
				var demonyms = [];
				var possibleDemo = function(o) { return meta(o, 'demonym'); };
				dict.JJ.words.filter(possibleDemo).forEach(function(o) {
					demonyms.push( o[lang].replace('ian', '$').replace('ese', '=') );
					did(o[lang]);
				});
				return demonyms;
			},
			
			// expand
			unzip: {
				array: 'zip',
				fn: function(s) {
					switch (lang) {
						default:
							return s.replace('$', 'ian').replace('=', 'ese');
						break;
					}
				}
			}
		},
		
		{ // 7
			id: 'adjectives',
			description: '',
			// build
			zip: function(lang) { 
				return did(dict.JJ.words.filter(possibleRest).map(val));
			}
		},
		
		
		// ADVERBS : _irregulars
		{ // 8
			id: 'adverbs_irregular',
			description: '',
			
			// build
			zip: function(lang) { 
				var irregulars = newRes();
				dict.RB.words.filter(possibleIrreg).forEach(function(o) {
					var iStr = o[lang];
					var adj = '';
					dict.JJ.words.filter(possibleRef).forEach(function(oj) {
						if (oj.ref === o.uid) adj = did(oj[lang]);
					});
					irregulars.push([iStr.replace(adj, '='), adj]);
				});
				/* TODO flags for all conjugated :  'I'.concat(flag(o.meta))) */
				return irregulars;
			},
			
			unzip: function(a) {
				var res = {};
				zip.forEach(function(a) {
					res[a[0].replace('=', a[1])] = a[1];
				});
				return res;
			}
		},
		
		
		{ // 9
			id: 'numbers',
			description: '',
			// build
			zip: function(lang) { 
				newRes();
				var nrs = {};
				for (var _var in dict.NU) {
					var cat = dict.NU[_var];
					nrs[_var] = {};
					for (var i in cat) {
						if (cat[i].hasOwnProperty(lang)) {
							var words = (cat[i][lang] instanceof Array) ? cat[i][lang] : [cat[i][lang]];
							words.forEach(function(w) {
								if (!handled(w)) nrs[_var][did(w)] = (_var==='multiple') ? Math.pow(10, parseInt(i)) : parseInt(i);
							});
						}
					}
				}
				return nrs; 
			}
		},
		
		{ // 10
			id: 'dates',
			description: '',
			// build
			zip: function(lang) { 
				var dates = {month: {}, day: {}};
				['month', 'day'].forEach(function(cat) {
					for (var i in dict.DA[cat]) {
						var a = (dict.DA[cat][i][lang] instanceof Array) ? dict.DA[cat][i][lang] : [dict.DA[cat][i][lang]];
						a.forEach(function(w) {
							dates[cat][w] = parseInt(i, 10);
						});
					}
				});
				
				return {months: dates.month, days: dates.day};
			},
			
			unzip: function() {
				var res = zip;
				res.rDaySearch = '\b('.concat(Object.keys(res.days).join('|'), ')\b');
				res.rMonthSearch = '('.concat(Object.keys(res.months).join('|'), ')');
				res.rMonths = res.monthSearch + ',?'; // TODO - this isn't really cross language
				return res;
			}
		},
		
		{ // 11
			id: 'honorifics',
			description: '',
			// build
			zip: function(lang) { 
				newRes();
				var possibleHon = function(o) { return meta(o, 'honour'); };
				return did(dict.NNAB.words.filter(possibleHon).map(val)); 
			}
		},
		
		{ // 12
			id: 'abbreviations',
			description: '',
			// build
			zip: function(lang) { return did(dict.NNAB.words.filter(possibleRest).map(val)); }
		},
		
		{ // 13
			id: 'normalizations',
			description: {},
			// compress
			zip: function(lang) { 
				var res = {};
				dict.normalizations.forEach(function(a){
					if(!res.hasOwnProperty(a[1])) res[a[1]] = '';
					res[a[1]] = res[a[1]].concat(a[0]);
				});
				return did(res);
			},
			
			// expand
			unzip: function(a) {
				var res = { normaler: {}, greek: {}	};
				for (var normCh in zip) {
						zip[normCh].split('').forEach(function(grCh){
							res.normaler[grCh] = normCh;
							res.greek[normCh] = grCh;
						});
				}
				return res;
			}
		},
		{ // 14
			id: 'multiples',
			description: '',
			// build
			zip: function(lang) { 
				var res = {};
				for (var cat in dict.multiples) {
					var mult = dict.multiples[cat].filter(possible).map(val);
					mult.forEach(function(s) { res[s] = cat; });
				}
				return res;
			}
		},
		{ // 15
			id: 'unambigousSuffixes',
			description: '',
			// build
			zip: function(lang) { 
				return dict.unambigousSuffixes[lang];
			},
			//convert it to an easier format
			unzip: function() {
				return Object.keys(zip).reduce(function(h, k) {
					zip[k].forEach(function(w) { h[w] = k; });
					return h;
				}, {});
			}
		}
	];
	
	var _generateLexi = function() {
		// MAIN lexicon
		var _names = generators.map(function(g) { return g.id; })
		
		var _compact = {};
		var _lexicon = {};
		
		var m = {};
		var pm = {};
		function reqModule(n) { m[n] = require('./' + lang + '/' + n.concat('.js')); }
		function reqDmodule(n) { m[n] = require('./' + n.concat('.js')); }
		function reqPmodules() { 
			['conjugate','to_doer'].forEach(function(n) {
				pm[n] = require('../../parents/verb/conjugate/' + n);
			});
			['to_adverb','to_superlative','to_comparative', 'convertables'].forEach(function(n) {
				pm[n] = require('../../parents/adjective/conjugate/' + n);
			});
		}
		_names.forEach(reqModule);
		
		// require the modules in the lexicon.js
		var nStr = util.inspect(_names).replace(/ |\n/g,'');
		/*
		verb_conjugate = require("../parents/verb/conjugate/conjugate")
		verb_to_doer = require("../parents/verb/conjugate/to_doer")
		verb_irregulars = require("../parents/verb/conjugate/verb_irregulars")
		adj_to_adv = require("../parents/adjective/conjugate/to_adverb")
		to_superlative = require("../parents/adjective/conjugate/to_superlative")
		to_comparative = require("../parents/adjective/conjugate/to_comparative")
		convertables = require("../parents/adjective/conjugate/convertables")
		*/
		var lStr = langStr.concat('\n  var m = {};\n  var pm = {};\n  ', reqDmodule.toString(), '\n  ', reqPmodules.toString(), '\n  ', nStr, '.forEach(reqDmodule);\n  reqPmodules();\n  ');
		// TODO - rest of VBN should be in lexicon.js already - also for sl "TODO adjectives_regular"
		var __VBN = dict.VBN.words.filter(function(o) { return (possible(o) && o.hasOwnProperty('ref')); }).map(val);
		
		// put words which are NOT yet in other modules in the lexicon now
		// the same function (without arguments) is used in the lexicon to add words which ARE in other modules ...
		var gen = function (cat){
			var did = {
				NN: m.nouns_inflect.irregulars.map(function(a){ return a[0]; }).concat(m.nouns_inflect.uncountables), 
				NNS: m.nouns_inflect.irregulars.map(function(a){ return a[1]; }), 
				VBN: __VBN, 
				VBD: m.verbs_conjugate.irregulars.map(function(o){ return o.past; }), 
				VBG: m.verbs_conjugate.irregulars.map(function(o){ return o.gerund; }), 
				RB: Object.keys(m.adverbs_irregular).concat(Object.keys(m.adjectives_decline.adj_to_advs).map(function(s) { return m.adjectives_decline.adj_to_advs[s]; })),
			}
			if (!cat) {
				var lexiZip = {
					NNA: Object.keys(m.verbs_conjugate.irregularDoers).map(function(s){ return m.verbs_conjugate.irregularDoers[s];  }), 
					NNAB: m.honorifics.concat(m.abbreviations), 
					PRP: m.nouns.prps, 
					CP: m.verbs_special.cps, 
					MD: m.verbs_special.mds, 
					VBP: m.verbs_conjugate.irregulars.map(function(o){ return o.infinitive; }), 
					VBZ: m.verbs_conjugate.irregulars.map(function(o){ return o.present; }), 
					JJR: Object.keys(m.adjectives_decline.to_comparative).map(function(s){ return m.adjectives_decline.to_comparative[s]; }), 
					JJS: Object.keys(m.adjectives_decline.to_superlative).map(function(s){ return m.adjectives_decline.to_superlative[s]; }), 
					JJ: m.adjectives_demonym.concat(
							m.adjectives_decline.adv_donts, Object.keys(m.adjectives_decline.adj_to_advs), 
							Object.keys(m.adjectives_decline.to_comparative), Object.keys(m.adjectives_decline.to_superlative), 
							Object.keys(m.adverbs_irregular).map(function(s) { return m.adverbs_irregular[s]; })
					), 
					//CD
					NU: Object.keys(m.numbers.ones).concat( Object.keys(m.numbers.teens), Object.keys(m.numbers.tens), Object.keys(m.numbers.multiple) ),
					DA: Object.keys(m.dates.months).concat( Object.keys(m.dates.days) )
				}
				
				var toMain = function(key, o) {
					o[key].forEach(function(w) { if (!main[w]) main[w] = key; });
				}
				// irregulars to main
				for (var key in did) toMain(key, did);
				for (var key in lexiZip) toMain(key, lexiZip);
				// zip to main
				for (var key in zip) toMain(key, zip);
				
				// conjugate all verbs. (~8ms, triples the lexicon size)
				m.verbs.forEach(function(v) {
					var c = pm.conjugate(v);
					var d = pm.to_doer(v);
					var map = {'infinitive': 'VBP', 'past': 'VBD', 'gerund': 'VBG', 'present': 'VBZ', 'participle': 'VBN'};
					for (var type in map) {
						if (c[type] && !main[c[type]]) main[c[type]] = map[type];
						if (d && !main[d]) main[d] = 'NNA';
					}
				});
				// decline all adjectives to their adverbs. (13ms)
				// 'to_adverb','to_superlative','to_comparative' 
				m.adjectives.concat(m.adjectives_decline.convertables).forEach(function(j) {
					main[j] = 'JJ';
					var adv = pm.to_adverb(j);
					if (adv && adv !== j && !main[adv]) main[adv] = main[adv] || 'RB';
					var c = pm.to_comparative(j);
					if (c && !c.match(/^more ./) && c !== j && !main[c]) main[c] = main[c] || 'JJR';
					var s = pm.to_superlative(j);
					if (s && !s.match(/^most ./) && s !== j && !main[s]) main[s] = main[s] || 'JJS';
				});
				
				
				
				return main;
			}
			if (cat in did) return did[cat];
			return [];
		}
		var genStr = gen.toString().replace(/\bVBN:\s*__VBN\s*,\s*\n*/g,'');
		
		['EX', 'NN', 'NNS', 'CC', 'VBD', 'VBN', 'VBG', 'DT', 'IN', 'PP', 'UH', 'FW', 'RB', 'RBR', 'RBS'].forEach(function(cat) {
			_compact[cat] = [];
			if (dict.hasOwnProperty(cat) && dict[cat].hasOwnProperty('words')) {
				_compact[cat] = dict[cat].words.map(val).filter(function(w) { return (gen(cat).indexOf(w) < 0); });
			}
		});
		
		lStr = lStr.concat('\n  var main = {};\n  var zip = ', util.inspect(_compact, {depth: null}), '\n  var unzip = ', genStr, '\n  unzip();' );
		
		// write a file to simply log the data modules in the folder
		var namesRaw = _names.map(function(n) { return n.concat('.js') });
		namesRaw.push('lexicon.js');
		var names = JSON.stringify( namesRaw );
		var logStr = "var util = require('util'); \nvar names = " + names + ";".concat(	
				"\nnames.forEach(function(n, i) { console.log( n ); console.log( require('./'+n) ); });"
		);
		fs.writeFileSync(	path.join('./', lang, '/', 'logExpandedModules.js'), logStr	);
		return lStr;
	}
	
	var i = 0;
	var _prefix = function(id) { return '\nvar '.concat(id,' = (function() {\n  '); }
	var _generate = function(g, i) { 
		/*TODO lang.mixin*/
		if (!(g.prefix)) g.prefix = '';
		
		var id = g.id;
		var generated = g.zip(lang);
		var zip = util.inspect(generated, { depth: null });
		var prefix = langStr.concat(_prefix(id));
		if (g.hasOwnProperty('description') && g.description != '') {
			g.prefix = '/* '.concat(g.description, ' */\n', g.prefix);
		}
		if (g.hasOwnProperty('prefix')) {
			prefix = g.prefix.concat('\n', prefix);
		}
		var suffix = '\n  if (typeof module !== "undefined" && module.exports) module.exports = main;\n\n'+
		'  return main;\n'+
		'})();';
		var _main = '; \n\n  var main = ';
		var unzip = 'zip;';
		if (g.hasOwnProperty('unzip') && g.unzip.hasOwnProperty('array')) {
			var arr = (g.unzip.array === 'zip' || g.unzip.array === '') ? 'zip' : 'zip.'.concat(g.unzip.array); 
			if (g.unzip.array != 'zip' && g.unzip.array != '') _main = _main.concat('zip;\n  main.', g.unzip.array, ' = ');
			unzip = arr.concat('.map(', g.unzip.fn.toString(-1), ');');
		} else if (g.hasOwnProperty('unzip')) {
			unzip = '('.concat(g.unzip.toString(-1), ')();');
		}
		
		var result = prefix.concat('var zip = ', zip, _main, unzip, suffix);
		
		fs.writeFile( path.join('./', lang, '/', g.id.concat('.js')), result, function(e, res) {
			if (e) throw e;
			i++;
			var colors = ['',''];
			if (i === generators.length) {
				colors = ['\u001b[32m', '\u001b[39m'];
				
				var rStr = _prefix('lexicon').concat(_generateLexi(), suffix);
				fs.writeFileSync(	path.join('./', lang, '/', 'lexicon.js'), rStr);
				
				// Generate rules ... TODO				
				
			}
			console.log( 'wrote module for language', '"'+lang+'"', colors[0], i+' of '+generators.length, colors[1] );
		});
	}
	
	
	// Generate data part (lexica)
	try { fs.mkdirSync(path.join('./', lang)); } catch (e) {};
	generators.forEach(_generate);
	
}

var main = function (langOrLangs) {
	if (!langOrLangs) {
		// all languages in the dictionary ...
		var langs = possibleLanguages;
	} else if (!(langOrLangs instanceof Array)) {
		langOrLangs = [langOrLangs];
	}
	langOrLangs.forEach(generateLanguage);
}

if (typeof module !== "undefined" && module.exports) module.exports = main;

var langOrLangs;
var CLIpos = process.argv.indexOf("-ls");
if(CLIpos > -1){
	// TODO minor - language metrics are absolute, e.g. en: 3200 (words)
	// once we have multiple languages, convert in 'translated' percents:
	// {en: 100, de: 80}
	console.log( possibleLanguage );
} else {
	CLIpos = process.argv.indexOf("-l");
	if(CLIpos > -1){
		if (!(process.argv[CLIpos + 1])) {
			console.log( 'Generating', possibleLanguage );
			main(possibleLanguages);
		} else {
			langOrLangs = process.argv[CLIpos + 1].replace(/ /g, '');
			if (langOrLangs.indexOf(',') > -1) {
				main(langOrLangs.split(','));	
			} else {
				main(langOrLangs)
			}
		}
	}
}