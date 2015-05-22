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

/* TODO 
- phrasal_verbs
- firstnames
*/	

var fs = require('fs');
var path = require('path');
var util = require('util');

var dict = require('./_dictionary');
var nodeExportStr = '\n  if (typeof module !== "undefined" && module.exports) module.exports = main;';
var prefixFn = function(id) { return '\nvar '.concat(id,' = (function() {\n  '); }
var endFnStr = '\n\n  return main;\n})();';

var possibleLanguage = {};
// TODO - could become vice-versa: a whitelist of ISO-languages ...
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
	
	
	// for metrics module TODO
	var flag = function(meta) {
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
	
	// for helpers module
	var _fns = function() {
		return {
			toObj: function(h,s){ h[s]=true; return h; },
			repl: function(a,s,r){
				if (typeof a === 'undefined') return null;
				var _r = function(w){
					s.forEach(function(rS, i) { w = w.replace(new RegExp(rS, 'g'), r[i]) });
					return w;
				}
				return (a instanceof Array) ? a.map(_r) : _r(a);
			},
			replBase: function(a,s,r){
				if (typeof a === 'undefined') return null;
				var _s = a[1].replace('=',a[0]).replace('_', a[0].slice(0,-2));
				return [a[0], ((s instanceof Array) ? helpFns.repl(_s, s, r) : _s) ];
			}
		};
	}
	var id = 'helpFns';
	var helpFns = _fns(); 
	var helpersStr = prefixFn(id).concat('var main = (', _fns.toString(), ')();', nodeExportStr, endFnStr);
	
	try { fs.mkdirSync(path.join('./', lang)); } catch (e) {};
	fs.writeFileSync(	path.join('./', lang, '/', id+'.js'), helpersStr	);
	var helpersImportStr = 'if (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");\n';
	
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
	var possibleOrig = function(o) { 
		return ( (o.hasOwnProperty(lang)) && (o.hasOwnProperty('uid')) ); 
	};
	var possibleRef = function(o) { 
		return ( o.hasOwnProperty(lang) && o.hasOwnProperty('ref') ); 
	};
	var isRef = function(oa, o) {
		return ((oa.ref instanceof Array && oa.ref.indexOf(o.uid) > -1) || oa.ref === o.uid);	
	}
	var possibleRest = function(o) { 
		return ( (o.hasOwnProperty(lang)) && !handled(o[lang]) ); 
	};
	var meta = function(o, key) {
		if (o.hasOwnProperty('meta') && o.meta[key]) {
			var checkLang = (o.meta[key] instanceof Array) ? o.meta[key] : Object.keys(o.meta[key]);
			return (!handled(o[lang]) && possible(o) && checkLang.indexOf(lang) > -1);
		}
		return false;
	};
	var val = function(o) { return o[lang]; }
	var baseRepl = function(w, iStr) { 
		var w = w.replace(iStr, '=');
		var iSl = iStr.slice(0,-2);
		return (iSl === '') ? w : w.replace(iSl, '_'); 
	}
	
	var allPossible = function() { 
		var _all = [];
		for (var key in dict) {
			if (dict[key].hasOwnProperty('words')) _all = _all.concat(dict[key].words.filter(possible));
		}
		return _all;
	};
	var allPossibles = allPossible();
	
	var langStr = "var lang = '".concat(lang, "';");
	// generate the DATA
	var generators = [
	
		// NOUN 
		{ // 0 irregulars (plural), uncountables
			id: 'nouns_inflect',
			description: 'singular nouns having irregular plurals',
			// zip
			zip: function(lang) { 
				var _irregulars = newRes();
				var _uncountables = dict.NN.words.filter(function(o) { 
					return meta(o, 'uncountable');
				}).map(val);
				[[dict.NN.words, dict.NNS.words], [dict.PRP.words], [dict.PP.words]].forEach(function(a) {
					a[0].filter(possibleOrig).forEach(function(o) { 
						a[((a[1]) ? 1 : 0)].filter(possibleRef).forEach(function(op) {
							if (isRef(op, o)) {
								_irregulars.push([o[lang], baseRepl(op[lang], o[lang]).replace(/es/g, '_')]);
							}
						});
					});
				});
				return {
					irregulars: _irregulars,
					uc: _uncountables
				};
			},
			// expand
			unzip: function() {
				return {
					irregulars: zip.irregulars.map(function(a) { return helpFns.replBase(a,['_'],['es']); }),
					uncountables: zip.uc.reduce(helpFns.toObj,{})
				};
			}
		},
			
		{ // 1 entityBlacklist, personBlacklist, prps
			id: 'nouns',
			description: '',
			// build
			zip: function(lang) { 
				// TODO: 'it', 'one'
				var _all = dict.NN.words.concat(dict.PP.words, dict.DT.words, dict.NNAB.words, dict.CC.words).filter(possible);
				var _prps = dict.PRP.words.map(val);
				var _pps = dict.PP.words.filter(function(o) { return o.hasOwnProperty('meta') && o.meta.hasOwnProperty('parent') }).map(function(o) {
					return [o[lang], o.meta.parent];
				});
				return {
					entityBlacklist: _all.filter(function(o) { return meta(o, 'entityBlacklist'); }).map(val),
					personBlacklist: _all.filter(function(o) { return meta(o, 'personBlacklist'); }).map(val),
					prps: _prps,
					pps: _pps
				};
			},
			// expand
			unzip: function () {
				var _pps = {}; 
				zip.pps.forEach(function(a) { _pps[a[0]] = zip.prps[a[1]]; });
				return { 
					pps: _pps,
					prps: zip.prps.reduce(helpFns.toObj, {}), 
					entityBlacklist: zip.entityBlacklist.reduce(helpFns.toObj, {}), 
					personBlacklist: zip.personBlacklist,
				}
			}
		},
	
		
		// VERB : 
		{ // 2 cps, mds, negate
			id: 'verbs_special',
			description: '',
			// compress
			zip: function(lang) { 
				// TODO: 'it', 'one'
				var res = {cps:[], mds:[]};
				['CP', 'MD'].forEach(function(type) {
					dict[type].words.filter(possibleOrig).forEach(function(o) {
						dict[type].words.filter(possibleRef).forEach(function(ov) {
							if (isRef(ov, o)) {
								res[type.toLowerCase()+'s'].push([o[lang], baseRepl(ov[lang], o[lang]).replace('\'t','_') ]);
							}
						});
					});
				});
				return res;
			},
			// expand
			unzip: function () {
				var res = {};
				var negate = {};
				['cps', 'mds'].forEach(function(type) {
					res[type] = [];
					res[type] = res[type].concat.apply(res[type], zip[type].map(function(a) { 
						var arr = helpFns.replBase(a,['_'],['\'t']);
						negate[arr[0]] = arr[1];
						return arr; 
					}));
				});
				res.negate = negate;
				return res;
			}
		},
		
		{ // 3 irregulars, noDoers, irregularDoers
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
				dict.VBP.words.filter(possibleOrig).forEach(function(o) {
					var conjugateds = [helpFns.repl(o[lang], ['ing', 'er', 've'], ['&', '_', '#'])];
					for (var type in types) {
						var conjugated = 0;
						dict[type].words.filter(possibleRef).forEach(function(oc) {
							if (isRef(oc, o)) conjugated = helpFns.repl(baseRepl(oc[lang], o[lang]), ['ing', 'er', 've'], ['&', '_', '#']);
							did(o[lang]);
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
					var r = function(s) {return s;}
					a.forEach(function(s, i) {
						if (s && i > 0) s = s.replace('=',a[0]).replace('_', a[0].slice(0,-2));
						if (s) s = helpFns.repl(s, ['&', '_', '#'], ['ing', 'er', 've']);
						if (i > 3 && !s) {
							main.noDoers[r(a[0])] = 1;
						} else if (i > 3) {
							main.irregularDoers[r(a[0])] = s;
						} else {
							obj[types[i]] = s;
						}
					});
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
		
		
		// ADJECTIVE
		// 
		{ // 5
			id: 'adjectives_decline',
			description: '',
			prefix: "// var types = ['adjective', 'adverb', 'comparative', 'superlative', 'noun'];\n"+
			"// 0 means 'return null' for adverbs OR 'conjugate without more/most' for comparative and superlative.\n"+
			"// 1 means 'default behavior'\n",
			// compress
			zip: function(lang) {
				var repJJ = function(s) { return ((typeof s === 'string') ? helpFns.repl(s, ['ight', 'ing', 'ent', 'er', 'al', 'ed'], [':', '&', '_', '#', '§', '!']) : s); }
				var types = {
					/*JJ: 'adjective',*/ 
					RB: 'adverb', 
					JJR: 'comparative', 
					JJS: 'superlative',
					NN: 'noun'
				};
				var irregulars = newRes();
				//var irregularFlags = [];
				dict.JJ.words.filter(possibleOrig).forEach(function(o) {
					var jjStr = o[lang];
					var declineds = [repJJ(jjStr)];
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
								if (isRef(oa, o)) {
									switch (lang) {
										default:
											declined = (typeof oa[lang] === 'number') ? oa[lang] : oa[lang].replace(jjStr, '=');
										break;
									}
								} 
							});
						}
						if (declined === -1) declined = 0;
						declineds.push( (declined) ? repJJ(declined) : 0 );
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
						irregulars.push(repJJ(o[lang]));
						did(o[lang]);
					}
				});
				/* TODO flags for all conjugated :  'I'.concat(flag(o.meta))) */
				return irregulars;	
			},
			
			// expand
			unzip: function () {
				var repJJ = function(s) { return (typeof s !== 'string') ? s : helpFns.repl(s, [':', '&', '_', '#', '§', '!'], ['ight', 'ing', 'ent', 'er', 'al', 'ed']); }
				var res = { convertables: [], adj_to_advs: {}, adv_donts: [], to_comparative: {}, to_superlative: {}, to_noun: {} };
				var expand = function (s, b) { return (s === 0) ? 0 : s.replace('=', b); }
				zip.forEach(function(_a) {
					if (typeof _a === 'string') {
						res.convertables.push(repJJ(_a)); 
					} else {
						var a = _a.map(function(w){ return repJJ(w); });
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
				res.convertables = res.convertables.reduce(helpFns.toObj, {});
				res.adv_donts = res.adv_donts.reduce(helpFns.toObj, {});
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
					demonyms.push( helpFns.repl(o[lang], ['can', 'dan', 'ean', 'ian', 'ese', 'an'], [':', '&', '_', '#', '§', '!']) );
					did(o[lang]);
				});
				return demonyms;
			},
			
			// expand
			unzip: {
				array: 'zip',
				fn: function(w) {
					return helpFns.repl(w, [':', '&', '_', '#', '§', '!'], ['can', 'dan', 'ean', 'ian', 'ese', 'an'])
				}
			}
		},
		
		{ // 7
			id: 'adjectives',
			description: '',
			// build
			zip: function(lang) { 
				return did(dict.JJ.words.filter(possibleRest).map(val).map(function(w) {
					return helpFns.repl(w, ['ight', 'ing', 'ant', 'ent', 'er', 'al', 'ed', 'ly'], [':', '&', '_', '#', '§', '!', '%', '>'/*, '<', '-'*/]);
				}));
			},
			unzip: function() {
				return zip.map(function(w) { return helpFns.repl(w, [':', '&', '_', '#', '§', '!', '%', '>'], ['ight', 'ing', 'ant', 'ent', 'er', 'al', 'ed', 'ly']); });
			}
		},
		
		
		// ADVERB
		{ // 8
			id: 'adverbs_decline',
			description: '',
			
			// build
			zip: function(lang) { 
				var irregulars = newRes();
				dict.RB.words.filter(possibleOrig).forEach(function(o) {
					var adj = '';
					dict.JJ.words.filter(possibleRef).forEach(function(oj) {
						if (isRef(oj, o)) adj = did(oj[lang]);
					});
					irregulars.push([o[lang].replace(adj, '='), adj]);
				});
				/* TODO flags for all conjugated :  'I'.concat(flag(o.meta))) */
				return irregulars;
			},
			// expand
			unzip: function() {
				var res = {};
				zip.forEach(function(a) {
					res[a[0].replace('=', a[1])] = a[1];
				});
				return res;
			}
		},
		
		
		// OTHER : numbers, dates, honorifics, abbreviations, normalizations, multiples, unambigousSuffixes
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
			// expand
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
			id: 'posData',
			description: '',
			// build
			zip: function(lang) { 
				var res = { particles: [], cs: [], contractions: {} };
				var possibleParticle = function(o) { return meta(o, 'particle'); }
				res.particles = allPossibles.filter(possibleParticle).map(val);
				var possibleContraction = function(o) { return meta(o, 'contractions'); }
				if (dict.contractions.hasOwnProperty(lang)) {
					res.cs = dict.contractions[lang];
					var cs = res.cs.map(function(w){ return w.replace('|', ''); });
					allPossibles.filter(possibleContraction).forEach(function(o){ 
						o.meta.contractions[lang].forEach(function(cw) {
							var pos = cs.indexOf(cw);
							if (pos > -1) {
								if (!(res.contractions.hasOwnProperty(o[lang]))) res.contractions[o[lang]] = [];
								res.contractions[o[lang]].push(pos);
							}
						});
					});
				}
				return res;
			},
			//convert it to an easier format
			unzip: function() {
				zip.particles = zip.particles.reduce(helpFns.toObj, {});
				var c = zip.contractions;
				var _cs = [];
				for (var k in c) { c[k].forEach(function(i){ var a = zip.cs[i].split('|'); _cs[k+((a[1]) ? "'"+a[1] : a[0])] = [k,a.join('')]; }) }
				zip.contractions = _cs;
				return zip;
			}
		},
		
		{ // 16
		// 
		/* TODO : verbs_special.negate +
		// + some logical ones work
        "everyone": "no one",
        "everybody": "nobody",
        "someone": "no one",
        "somebody": "nobody",
        // everything:"nothing",
        "always": "never",
		*/
			id: 'negateData',
			description: '',
			// build
			zip: function(lang) { 
				return 1;
			},
			//convert it to an easier format
			unzip: function() {
				return 1;
			}
		},
		
		{ // 17
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
		var nStr = util.inspect(_names, {depth: null}).replace(/ |\n/g,'');
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
				NN: m.nouns_inflect.irregulars.map(function(a){ return a[0]; }).concat(Object.keys(m.nouns_inflect.uncountables)), 
				NNS: m.nouns_inflect.irregulars.map(function(a){ return a[1]; }), 
				VBN: __VBN, 
				VBD: m.verbs_conjugate.irregulars.map(function(o){ return o.past; }), 
				VBG: m.verbs_conjugate.irregulars.map(function(o){ return o.gerund; }), 
				RB: Object.keys(m.adverbs_decline).concat(Object.keys(m.adjectives_decline.adj_to_advs).map(function(s) { return m.adjectives_decline.adj_to_advs[s]; })),
			}
			if (!cat) {
				var lexiZip = {
					NNA: Object.keys(m.verbs_conjugate.irregularDoers).map(function(s){ return m.verbs_conjugate.irregularDoers[s];  }), 
					NNAB: m.honorifics.concat(m.abbreviations), 
					PRP: Object.keys(m.nouns.prps), 
					CP: m.verbs_special.cps, 
					MD: m.verbs_special.mds, 
					VBP: m.verbs_conjugate.irregulars.map(function(o){ return o.infinitive; }), 
					VBZ: m.verbs_conjugate.irregulars.map(function(o){ return o.present; }), 
					JJR: Object.keys(m.adjectives_decline.to_comparative).map(function(s){ return m.adjectives_decline.to_comparative[s]; }), 
					JJS: Object.keys(m.adjectives_decline.to_superlative).map(function(s){ return m.adjectives_decline.to_superlative[s]; }), 
					JJ: m.adjectives_demonym.concat(
							Object.keys(m.adjectives_decline.adv_donts), Object.keys(m.adjectives_decline.adj_to_advs), 
							Object.keys(m.adjectives_decline.to_comparative), Object.keys(m.adjectives_decline.to_superlative), 
							Object.keys(m.adverbs_decline).map(function(s) { return m.adverbs_decline[s]; })
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
				m.adjectives.concat(Object.keys(m.adjectives_decline.convertables)).forEach(function(j) {
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
	var _generate = function(g, i) { 
		/*TODO lang.mixin*/
		if (!(g.prefix)) g.prefix = '';
		if (!(g.suffix)) g.suffix = '';
		
		var id = g.id;
		var generated = g.zip(lang);
		var zip = util.inspect(generated, { depth: null });
		var prefix = langStr.concat(prefixFn(id));
		if (g.hasOwnProperty('description') && g.description != '') {
			g.prefix = '/* '.concat(g.description, ' */\n', g.prefix);
		}
		if (g.hasOwnProperty('prefix')) {
			prefix = g.prefix.concat('\n', prefix);
		}
		var suffix = g.suffix.concat(nodeExportStr, endFnStr);
		var _main = '; \n\n  var main = ';
		var unzip = 'zip;\n';
		if (g.hasOwnProperty('unzip') && g.unzip.hasOwnProperty('array')) {
			var str = g.unzip.fn.toString(-1);
			if (str.indexOf('helpFns.' > -1)) prefix = prefix.concat('\n', helpersImportStr); 
			var arr = (g.unzip.array === 'zip' || g.unzip.array === '') ? 'zip' : 'zip.'.concat(g.unzip.array); 
			if (g.unzip.array != 'zip' && g.unzip.array != '') _main = _main.concat('zip;\n  main.', g.unzip.array, ' = ');
			unzip = arr.concat('.map(', g.unzip.fn.toString(-1), ');\n');
		} else if (g.hasOwnProperty('unzip')) {
			var str = g.unzip.toString(-1);
			if (str.indexOf('helpFns' > -1)) prefix = prefix.concat('\n', helpersImportStr);
			unzip = '('.concat(str, ')();\n');
		}
		
		var result = prefix.concat('var zip = ', zip, _main, unzip, suffix);
		
		fs.writeFile( path.join('./', lang, '/', g.id.concat('.js')), result, function(e, res) {
			if (e) throw e;
			i++;
			var colors = ['',''];
			if (i === generators.length) {
				colors = ['\u001b[32m', '\u001b[39m'];
				
				var rStr = prefixFn('lexicon').concat(_generateLexi(), suffix);
				fs.writeFileSync(	path.join('./', lang, '/', 'lexicon.js'), rStr);
				
				// Generate rules ... TODO				
				
			}
			console.log( 'wrote module for language', '"'+lang+'"', colors[0], i+' of '+generators.length, colors[1] );
		});
	}
	
	
	// Generate data part (lexica)
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