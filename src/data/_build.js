/* This will build the lexica from _dictionary !

// This MUST be used with node.js

// EITHER use it as a CLI-Tool:
//  LIST possible languages:
//    node _build -ls
//  GENERATE all languages :
//    node _build -l
//  GENERATE one language :
//    node _build -l en
//  GENERATE some languages :
//    node _build -l en,de

// OR as module:
//  all languages :
//    require('./_build')();
//  one language :
//    require('./_build')('en');
//  some languages :
//    require('./_build')(['en','de']);

// -->
// RETURNS compressed module files,
// written in folders named after the language, e.g.
// ./en/...
*/




/* TODO
// might be better to put reused strings in a 'constants' object
// phrasal_verbs
// firstnames
*/

var fs = require('fs');
var path = require('path');
var util = require('util');

var MYPATH = '.'; // changes to absolute path if used as module
var schema = require('./_dictionarySchema');
var dict = require('./_dictionary');
var name = require('./_dictionaryNames');
var rule = require('./_dictionaryRules');
var nodeExportStr = '\n//::NODE::\n  if (typeof module !== "undefined" && module.exports) module.exports = main;\n//::';
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
			toObjValues: function(zip, obj){
				if (!obj) {obj = {}}
				return Object.keys(zip).reduce(function(h, k) {
					zip[k].forEach(function(w) { h[w] = k; });
					return h;
				}, {});
			},
			repl: function(a,s,r){
				if (typeof a === 'undefined') {return null}
				var std = ['&','_','#','~','!','%',';','@','0','1','2','3','4','5','6','7','8','9','>','`'];
				if (!s && r) {
					s = std.slice(0, r.length);
				}
				if (!r) {
					r = std;
				}
				var _r = function(w){
					s.forEach(function(rS, i) { w = w.replace(new RegExp(rS, 'g'), r[i]) });
					return w;
				}
				return (a instanceof Array) ? a.map(_r) : _r(a);
			},
			replBase: function(a,s,r){
				if (typeof a === 'undefined') {return null}
				var _s = a[1].replace('=',a[0]).replace('<', a[0].slice(0,-2));
				return [a[0], ((typeof s !== 'undefined') ? helpFns.repl(_s, s, r) : _s) ];
			}
		};
	}
	var id = 'helpFns';
	var helpFns = _fns();
	var helpersStr = prefixFn(id).concat('var main = (', _fns.toString(), ')();', nodeExportStr, endFnStr);

	try { fs.mkdirSync(path.join(MYPATH, lang)); } catch (e) {};
	fs.writeFileSync(	path.join(MYPATH, lang, '/', id+'.js'), helpersStr	);
	var helpersImportStr = '//::NODE::\nif (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");\n//::\n';

	var results = {main:[[]], zip:[[]]}; //TODO minor - has first el. only for DEBUG - SHOULD be empty
	// some helpers for the generators
	var newRes = function(isZip) {
		var r = results[(isZip) ? 'zip' : 'main'];
		if (r.length-1 > 0) results[(isZip) ? 'zip' : 'main'].push([]);
		return [];
	}
	var val = function(o) { return (typeof o === 'string') ? o : o[lang]; }
	var did = function(s, isZip) {
		var r = results[(isZip) ? 'zip' : 'main'];
		var a = r[r.length-1];
		if (s instanceof Array) {
			results[(isZip) ? 'zip' : 'main'][r.length-1] = a.concat(s);
		} else {
			results[(isZip) ? 'zip' : 'main'][r.length-1].push(s);
		}
		return s;
	}
	var handled = function(s, isZip) {
		var r = results[(isZip) ? 'zip' : 'main'];
		var a = r[r.length-1];
		return a.indexOf(s) > -1;
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
	var rest = function(type, isZip) {
		return did(dict[type].words.filter(function(o, isZip) {
			return ( (o.hasOwnProperty(lang)) && !handled(o[lang], isZip) );
		}), isZip).map(val);
	}
	
	var meta = function(o, key, isZip) {
		if (o.hasOwnProperty('meta') && o.meta[key]) {
			var checkLang = (o.meta[key] instanceof Array) ? o.meta[key] : Object.keys(o.meta[key]);
			return (!handled(o[lang], isZip) && possible(o) && checkLang.indexOf(lang) > -1); 
		}
		return false;
	};
	var baseRepl = function(w, iStr, s) {
		w = w.replace(iStr, '=');
		var iSl = iStr.slice(0,-2);
		w = (iSl === '') ? w : w.replace(iSl, '<');
		return (s) ? helpFns.repl(w, s, 0) : w;
	}

	var allPossible = function() {
		var _all = [];
		for (var key in dict) {
			if (dict[key].hasOwnProperty('words')) _all = _all.concat(dict[key].words.filter(possible));
		}
		return _all;
	};
	var allPossibles = allPossible();

	var langStr = "\n//::NODE::\n  var lang = '".concat(lang, "';\n//::");
	// generate the DATA
	var generators = [

		// NOUN
		{ // 0 irregulars (plural), uncountables
			id: 'nouns_inflect',
			description: 'singular nouns having irregular plurals',
			// zip
			zip: function(lang, isZip) {
				var _irregulars = newRes(isZip);
				var res = {
					NN: [],
					PRP: [],
					PP: [],
					uc: []
				};
				[[dict.NN.words, dict.NNS.words], [dict.PRP.words], [dict.PP.words]].forEach(function(a, i) {
					a[0].filter(possibleOrig).forEach(function(o) {
						a[((a[1]) ? 1 : 0)].filter(possibleRef).forEach(function(op) {
							if (isRef(op, o)) {
								var nA = (isZip) ? [o[lang], baseRepl(op[lang], o[lang], ['es'])] : [o[lang], op[lang]];
								res[Object.keys(res)[i]].push(nA);
								_irregulars.push(nA);
							}
						});
					});
				});
				res.uc = dict.NN.words.filter(function(o) {
					return meta(o, 'uncountable', isZip);
				}).map(val);
				return res; // Note: the returned value becomes variable 'zip'
			},
			// expand
			unzip: function() {
				//::BROWSER::
				var repl = function(a) { return helpFns.replBase(a,0,['es']); }
				zip.NN = zip.NN.map(repl);
				zip.PRP = zip.PRP.map(repl);
				zip.PP = zip.PP.map(repl);
				//::
				zip.irregulars = zip.NN.concat(zip.PRP, zip.PP);
				zip.uncountables = zip.uc.reduce(helpFns.toObj,{});
				return zip;
			}
		},

		{ // 1 entityBlacklist, personBlacklist, prps
			id: 'nouns',
			description: '',
			// build
			zip: function(lang, isZip) {
				// TODO: 'it', 'one'
				var _all = dict.NN.words.concat(dict.PP.words, dict.DT.words, dict.NNAB.words, dict.CC.words).filter(possible);
				var _prps = dict.PRP.words.map(val);
				var _pps = dict.PP.words.filter(function(o) { return o.hasOwnProperty('meta') && o.meta.hasOwnProperty('parent') }).map(function(o) {
					return [o[lang], o.meta.parent];
				});
				var _black = function(type) {
					var b = _all.filter(function(o) { return meta(o, type+'Blacklist', isZip); }).map(val);
					b.push('&');
					return b;
				}
				return {
					personBlacklist: _black('person'), 
					entityBlacklist: _black('entity'),
					prps: _prps,
					pps: _pps
				};
			},
			// expand
			unzip: function () {
				var _pps = {};
				zip.pps.forEach(function(a) { _pps[a[0]] = zip.prps[a[1]]; });
				return {
					prps: zip.prps.reduce(helpFns.toObj, {}),
					pps: _pps,
					entityBlacklist: zip.entityBlacklist.reduce(helpFns.toObj, {}),
					personBlacklist: zip.personBlacklist,
				}
			}
		},


		// VERB :
		{ // 2 CP, MD, negate
			id: 'verbs_special',
			description: '',
			// compress
			zip: function(lang, isZip) {
				// TODO: 'it', 'one'
				var res = {CP:[], MD:[]};
				['CP', 'MD'].forEach(function(type) {
					dict[type].words.filter(possible).forEach(function(o) {
						var hasRef = 0;
						dict[type].words.filter(possibleRef).forEach(function(ov) {
							if (isRef(ov, o)) {
								hasRef = 1;
								res[type].push((isZip) ? [o[lang], baseRepl(ov[lang], o[lang], ['\'t']) ] : [o[lang], ov[lang]]);
							}
						});
						if (!hasRef) {
							res[type].push([o[lang], o[lang]+' not']); // TODO
						}
					});
				});
				return res;
			},
			// expand
			unzip: function () {
				var res = {};
				res.negate = {};
				['CP', 'MD'].forEach(function(type) {
					res[type] = {};
					zip[type].forEach(function(a) {
						//::BROWSER::
						a = helpFns.replBase(a,0,['\'t']);
						//::
						res[type][a[0]] = type;
						res[type][a[1]] = type;
						res.negate[a[0]] = a[1];
					});
				});
				return res;
			}
		},

		{ // 3 irregulars, noDoers, irregularDoers
			id: 'verbs_conjugate',
			description: '',
			prefix: '// types: infinitive, gerund, past, present, doer, future \n',
			// compress
			zip: function(lang, isZip) {
				var types = {
				/*VBP: 'infinitive',*/
					VBG: 'gerund',
					VBD: 'past',
					VBZ: 'present',
					NNA: 'doer'
				};
				var _irregulars = newRes(isZip);
				_irregulars = [
					[ 'be', 'being', 'was', 'is', 0 ]
				]; // TODO - FIXME : 'be' is listed twice in _irregulars, this one should be first ! FIXME goes to dictionary
				var _noDoers = {};
				//var irregularFlags = [];
				dict.VBP.words.filter(possibleOrig).forEach(function(o) {
					var conjugateds = (isZip) ? [helpFns.repl(o[lang], ['ing', 'er', 've'], 0)] : [o[lang]];
					for (var type in types) {
						var conjugated = 0;
						dict[type].words.filter(possibleRef).forEach(function(oc) {
							if (isRef(oc, o)) {
								conjugated = (isZip) ? baseRepl(oc[lang], o[lang], ['ing', 'er', 've']) : oc[lang];
							}
							did(o[lang], isZip);
						});
						conjugateds.push( (conjugated) ? conjugated : 0 );
					}
					// check noDoer
					if (!conjugateds[4] && (!o.hasOwnProperty('meta') || !o.meta.noDoer || o.meta.noDoer.indexOf(lang) < 0)) {
						conjugateds.pop();
					}

					_irregulars.push(conjugateds);
				});

				dict.VBP.words.filter(function(o) {
					return meta(o, 'noDoer', isZip);
				}).forEach(function(o) {
					_noDoers[did(o[lang], isZip)] = 1;
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
						//::BROWSER::
						if (s && i > 0) {
							s = s.replace('=',a[0]).replace('<', a[0].slice(0,-2));
						}
						if (s) {
							s = helpFns.repl(s, 0, ['ing', 'er', 've']);
						}
						//::
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
			zip: function(lang, isZip) {
				var a = rest('VBP', isZip).concat(dict.VB.words.filter(possible).map(val));
				return (isZip) ? helpFns.repl(JSON.stringify(a), ['re', 'er', 'co', 'es', '","'], 0) : a;
			},
			make: 0,
			unzip: 'JSON.parse(helpFns.repl(zip, 0, [\'re\', \'er\', \'co\', \'es\', \'","\']));'
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
			zip: function(lang, isZip) {
				var repJJ = function(s) { return ((typeof s === 'string') ? helpFns.repl(s, ['ight', 'ing', 'ent', 'er', 're', 'al', 'ed', 'ly', 'some'], 0) : s); }
				var types = {
					/*JJ: 'adjective',*/
					RB: 'adverb',
					JJR: 'comparative',
					JJS: 'superlative',
					NN: 'noun'
				};
				var irregulars = newRes(isZip);
				//var irregularFlags = [];
				dict.JJ.words.filter(possibleOrig).forEach(function(o) {
					var jjStr = o[lang];
					var declineds = (isZip) ? [repJJ(jjStr)] : [jjStr];
					for (var type in types) {
						var declined = 1;
						if (type === 'RB' && meta(o, 'noAdverb', isZip)) declined = 0;
						if ((type === 'JJR' || type === 'JJS')) { // TODO
							if (meta(o, 'noComparative', isZip)) {
								declined = -1;
							} else if (!o.hasOwnProperty('meta') || !o.meta.convertable) {
								declined = 0;
							}
						}
						if (declined > 0 || !o.hasOwnProperty('meta') || !o.meta.convertable) {
							dict[type].words.filter(possibleRef).forEach(function(oa) {
								if (isRef(oa, o)) {
									declined = (!isZip || typeof oa[lang] === 'number') ? oa[lang] : oa[lang].replace(jjStr, '=');
								}
							});
						}
						if (declined === -1) declined = 0;
						var _declined = (isZip) ? repJJ(declined) : declined;
						declineds.push( (declined) ? _declined : 0 );
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
				var r = results[(isZip) ? 'zip' : 'main'];
				var a = r[r.length-1];
				a.push(irregulars.map(function(declinedArr) { return declinedArr[0]; }));
				var possibleConvertable = function(o) { return meta(o, 'convertable', isZip); };
				dict.JJ.words.filter(possibleConvertable).forEach(function(o) {
					if (!handled(o[lang], isZip)) {
						irregulars.push((isZip) ? repJJ(o[lang]) : o[lang]);
						did(o[lang], isZip);
					}
				});
				/* TODO flags for all conjugated :  'I'.concat(flag(o.meta))) */
				return irregulars;
			},
			// node.js
			make: function() {
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
			},
			// expand
			unzip: function() {
				var repJJ = function(s) { return (typeof s !== 'string') ? s : helpFns.repl(s, 0, ['ight', 'ing', 'ent', 'er', 're', 'al', 'ed', 'ly', 'some']); }
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
			}


		},

		{ // 6
			id: 'adjectives_demonym',
			description: '',
			// compress
			zip: function(lang, isZip) {
				var demonyms = [];
				var possibleDemo = function(o) { return meta(o, 'demonym', isZip); };
				dict.JJ.words.filter(possibleDemo).forEach(function(o) {
					demonyms.push((isZip) ? helpFns.repl(o[lang], ['can', 'dan', 'ean', 'ian', 'ese', 'an', 'austr', 'ish'], 0) : o[lang]);
					did(o[lang], isZip);
				});
				return demonyms;
			},
			make: 0,
			// expand
			unzip: {
				array: 'zip',
				fn: function(w) {
					return helpFns.repl(w, 0, ['can', 'dan', 'ean', 'ian', 'ese', 'an', 'austr', 'ish']);
				}
			}
		},

		{ // 7
			id: 'adjectives',
			description: '',
			// build
			zip: function(lang, isZip) {
				var a = rest('JJ', isZip);
				if (!isZip) return a;
				return helpFns.repl(JSON.stringify(a), ['ight', 'ing', 'ant', 'ent', 're', 'er', 'al', 'ed', 'ly', 'en', 'es', 'ate', '","'], 0);
			},
			make: 0,
			// expand
			unzip: 'JSON.parse(helpFns.repl(zip, 0, [\'ight\', \'ing\', \'ant\', \'ent\', \'re\', \'er\', \'al\', \'ed\', \'ly\', \'en\', \'es\', \'ate\', \'","\']));'
		},


		// ADVERB
		{ // 8
			id: 'adverbs_decline',
			description: '',

			// build
			zip: function(lang, isZip) {
				var irregulars = newRes(isZip);
				dict.RB.words.filter(possibleOrig).forEach(function(o) {
					var adj = '';
					dict.JJ.words.filter(possibleRef).forEach(function(oj) {
						if (isRef(oj, o)) adj = did(oj[lang], isZip);
					});
					irregulars.push((isZip) ? [o[lang].replace(adj, '='), adj] : [o[lang], adj]);
				});
				/* TODO flags for all conjugated :  'I'.concat(flag(o.meta))) */
				return irregulars;
			},
			make: function() {
				var res = {};
				zip.forEach(function(a) {
					res[a[0]] = a[1];
				});
				return res;
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


		// OTHER : numbers, dates, honorifics, abbreviations, normalisations, multiples, suffixes
		{ // 9
			id: 'numbers',
			description: '',
			// build
			zip: function(lang, isZip) {
				newRes(isZip);
				var nrs = {};
				['ones', 'teens', 'tens', 'multiple'].forEach(function(_var) {
					var cat = dict.NU[_var];
					nrs[_var] = {};
					for (var i in cat) {
						if (cat[i].hasOwnProperty(lang)) {
							var words = (cat[i][lang] instanceof Array) ? cat[i][lang] : [cat[i][lang]];
							words.forEach(function(w) {
								nrs[_var][did(w, isZip)] = (_var==='multiple') ? Math.pow(10, parseInt(i)) : parseInt(i);
							});
						}
					}
				});
				return nrs;
			}
		},

		{ // 10
			id: 'dates',
			description: '',
			// build
			zip: function(lang, isZip) {
				var dates = {months: {}, monthAbbrevs: {}, days: {}};
				['month', 'day'].forEach(function(c, n) {
					// months are 0 based, days are 1 based
					dict.DA[c].forEach(function(o, i) {
						var a = (o[lang] instanceof Array) ? o[lang] : [o[lang]];
						a.forEach(function(w, j) {
							cat = (c === 'month' && j>0) ? 'monthAbbrevs' : c+'s';
							dates[cat][w] = i+n;
						});
					});
				});
				return dates;
			},
			// expand
			// TODO - res.monthsS isn't really cross language
			unzip: function() {
				var res = zip;
				for (var w in zip.monthAbbrevs) { zip.months[w] = zip.monthAbbrevs[w] }
				res.dayS = '\b('.concat(Object.keys(res.days).join('|'), ')\b');
				res.monthS = '('.concat(Object.keys(res.months).join('|'), ')');
				res.monthsS = res.monthS + ',?';
				return res;
			}
		},

		{ // 11
			id: 'honorifics',
			description: '',
			// build
			zip: function(lang, isZip) {
				newRes(isZip);
				var possibleHon = function(o) { return meta(o, 'honour', isZip); };
				return did(dict.NNAB.words.filter(possibleHon).map(val), isZip);
			}
		},

		{ // 12
			id: 'abbreviations',
			description: '',
			// build
			zip: function(lang, isZip) { 
				return rest('NNAB', isZip);
			},
			// concat honorifics
			unzip: function() {
				//::NODE::
				if (typeof module !== "undefined" && module.exports) honorifics = require('./honorifics');
				//::
				return zip.concat(honorifics);
			}
		},

		{ // 13
			id: 'multiples',
			description: '',
			// build
			zip: function(lang, isZip) {
				var res = {};
				for (var cat in dict.multiples) {
					var mult = dict.multiples[cat].filter(possible).map(val);
					mult.forEach(function(s) { 
						if (isZip) { s = helpFns.repl(s, ['at', ' ', 'united', 'new', 'in '], 0); }
						res[s] = cat; 
					});
				}
				return res;
			},
			make: 0,
			unzip: "helpFns.repl(zip, 0, ['at', ' ', 'united', 'new', 'in ']);"
		},

		{ // 14
			id: 'pos_data',
			description: '',
			// build
			zip: function(lang, isZip) {
				var res = { particles: [], cs: [], contractions: {}, ambiguousContractions: {} };
				var possibleParticle = function(o) { return meta(o, 'particle'); }
				res.particles = allPossibles.filter(possibleParticle).map(val);
				var possibleContraction = function(o) { return meta(o, 'contractions'); }
				if (dict.contractions.hasOwnProperty(lang)) {
					res.cs = dict.contractions[lang];
					var cs = res.cs.map(function(w){ 
						return w.replace('|', ''); 
					});
					var csAs = res.cs.map(function(w){ 
						var a = w.split('|'); return ((a[1]) ? '\''.concat(a[1]) : a[0]);
					});
					allPossibles.filter(possibleContraction).forEach(function(o){
						o.meta.contractions[lang].forEach(function(w) {
							var pos = cs.indexOf(w);
							if (pos > -1) {
								var key = o[lang]+csAs[pos];
								// ambiguous are the ones having multiple meanings for same extension
								// e.g. for 's, so
								if (res.contractions.hasOwnProperty(key)) {
									res.ambiguousContractions[key] = res.contractions[key][0]; 
									delete res.contractions[key];
								} else {
									res.contractions[key] = [o[lang], w];
								}
							}
						});
					});
				}
				return res;
			},
			// convert it to an easier format
			unzip: function() {
				zip.particles = zip.particles.reduce(helpFns.toObj, {});
				return zip;
			}
		},

		{ // 15
			id: 'negate_data',
			description: '',
			// build
			zip: function(lang, isZip) {
				return dict.negate.hasOwnProperty(lang) ? dict.negate[lang] : {};
			},
			// convert it to an easier format
			unzip: function() {
				//::NODE::
				if (typeof module !== "undefined" && module.exports) var verbs_special = require('./verbs_special');
				//::
				var negate = verbs_special.negate || {};
				for (var k in zip) { negate[k] = zip[k]; }
				for (var k in negate) { negate[negate[k]] = k; }
				return negate;
			}
		},

		{ // 16
			id: 'firstnames',
			description: '',
			// build
			zip: function(lang, isZip) {
				var replN = function(w) { return helpFns.repl(w, ['ie', 'na', 'la', 'ri', 'ne', 'ra', 'el', 'in', 'an', 'le', 'en', 'ia'], 0);
				}
				var names = {male: {}, female: {}, ambiguous: []};
				['male', 'female'].forEach(function(type) {
					if (name[type].hasOwnProperty(lang)) {
						names[type] = {};
						for (var k in name[type][lang]) {
							names[type][k] = (isZip) ? replN(name[type][lang][k]) : name[type][lang][k];
						}
					}
				});
				if (name.ambiguous.hasOwnProperty(lang)) { names.ambiguous = name.ambiguous[lang].map(replN); }
				return names;
			},
			// convert it to an easier format
			unzip: function() {
				//::BROWSER::
				var replN = function(w) { return helpFns.repl(w, 0, ['ie', 'na', 'la', 'ri', 'ne', 'ra', 'el', 'in', 'an', 'le', 'en', 'ia']) }
				//::
				var o = {};
				['male', 'female'].forEach(function(type) {
					for (var k in zip[type]) {
						//::NODE::
						var arr = zip[type][k].split(',');
						//::
						//::BROWSER::
						var arr = replN(zip[type][k]).split(',');
						//::
						arr.forEach(function(w, i) {
							o[k + w] = type.charAt(0);
						})
					}
				});
				//::NODE::
				zip.ambiguous = zip.ambiguous.reduce(function(h,s){ h[s]='a'; return h; }, o);
				//::
				//::BROWSER::
				zip.ambiguous = zip.ambiguous.map(replN).reduce(function(h,s){ h[s]='a'; return h; }, o);
				//::
				return o;
			}
		},

		{ // 17
			id: 'normalisations',
			description: 'approximate visual (not semantic) relationship between unicode and ascii characters',
			// compress
			zip: function(lang, isZip) {
				var res = {};
				rule.normalisations.forEach(function(a){
					if(!res.hasOwnProperty(a[1])) res[a[1]] = '';
					res[a[1]] = res[a[1]].concat(a[0]);
				});
				return did(res, isZip);
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

		{ // 18
			id: 'suffixes',
			description: '',
			// build
			zip: function(lang, isZip) {
				var o = {
					wordnet: rule.unambiguousSuffixes[lang],
					verbs: rule.verbSuffixes[lang]
				};
				var s = [ 'ed', 'er', 'le', 'es', 'ns', 'ant', 'nt', 'ise', 'ite', 'ive', 'ize', 'ish', 'ade', 'ate', 'ose', 'eed', 'end', 'est', 'use', '","' ];
				return (isZip) ? helpFns.repl(JSON.stringify(o), s, 0) : o;
			},
			// convert it to an easier format
			unzip: function() {
				//::BROWSER::
				zip = JSON.parse(helpFns.repl(zip, 0, [ 'ed', 'er', 'le', 'es', 'ns', 'ant', 'nt', 'ise', 'ite', 'ive', 'ize', 'ish', 'ade', 'ate', 'ose', 'eed', 'end', 'est', 'use', '","' ]));
				//::
				return {
					wordnet: helpFns.toObjValues(zip.wordnet),
					verbs: helpFns.toObjValues(zip.verbs)
				};
			}
		},

		{ // 19
			id: 'verb_rules',
			description: 'regex rules for verb conjugation\nused in combination with the generic "fallback" method',
			// build
			zip: function(lang, isZip) {
				var rs = rule.verbRules;
				if(!isZip) {
					for (var cat in rs) {
						rs[cat] = rs[cat].map(function(o){
							for (var key in o) { 
								if (typeof o[key] != 'string') { o[key] = 0; } 
							}
							return [o.regex, o.infinitive, o.present, o.gerund, o.past, o.doer];
						});
					}
				}
				return (isZip) ? helpFns.repl(JSON.stringify(rs), ['\\$1e', '\\$1s', '\\$1es', '\\$1ed', '\\$1ing', 'ing'], 0) : rs;
			},
			// convert it to an easier format
			unzip: function() {
				//::BROWSER::
				zip = JSON.parse(helpFns.repl(zip, 0, ['$1e', '$1s', '$1es', '$1ed', '$1ing', 'ing']));
				//::
				for (var cat in zip) {
					zip[cat] = zip[cat].map(function(a){
						return {
							reg: new RegExp(a[0],'i'),
							repl: {
								infinitive:a[1],
								present:a[2],
								gerund:a[3],
								past:a[4],
								doer:a[5]
							}
						};
					});
				}
				return zip;
			}
		},

		{ // 20
			id: 'word_rules',
			description: '',
			// build
			zip: function(lang, isZip) {
				return rule.wordRules;
			},
			// convert it to an easier format
			unzip: function() {
				var a = [];
				for (var k in zip) {
					zip[k].forEach(function(r){
						a.push({
							reg: new RegExp(r, 'i'),
							pos: k
						});
					});
				}
				return a;
			}
		},

		{ // 21
			id: 'schema',
			description: '',
			// compress
			zip: function(lang, isZip) {
				var o = {parents: [], tags: []};
				for (var tag in schema) {
					var name = schema[tag].hasOwnProperty(lang) ? schema[tag][lang] : schema[tag].en;
					var pPos = o.parents.indexOf(schema[tag].parent);
					if (pPos < 0) {
						o.parents.push(schema[tag].parent);
						pPos = o.parents.length-1;
					}
					var a = [tag, name, pPos];
					if (schema[tag].hasOwnProperty('tense')) a.push(schema[tag].tense);
					o.tags.push(a);
				}
				return o;
			},
			// expand
			unzip: function() {
				var res = {};
				zip.tags.forEach(function(a) {
					res[a[0]] = { name:a[1], parent:zip.parents[a[2]], tag:a[0] };
					if (a.length > 3) {
						res[a[0]].tense = a[3];
					}
				});
				return res;
			}
		}

	];

	var _generateLexi = function(lang, isZip) {
		// MAIN lexicon
		var _names = generators.map(function(g) { return g.id; })
		var _lMain = {};
		var _lZip = {};
		var m = {};
		var pm = {};
		function reqModule(n) { m[n] = require('./' + lang + '/' + n.concat('.js')); }
		function reqDmodule(n) { m[n] = require('./' + n.concat('.js')); }
		function reqPmodules() {
			pm.phrasal_verbs = require('../lexicon/phrasal_verbs'); // TODO - FIXME becomes data module
			['conjugate','to_doer'].forEach(function(n) {
				pm[n] = require('../../parents/verb/conjugate/' + n);
			});
			['to_adverb','to_superlative','to_comparative'].forEach(function(n) {
				pm[n] = require('../../parents/adjective/conjugate/' + n);
			});
		}
		_names.forEach(reqModule);
		// require the modules in the lexicon.js
		var nStr = util.inspect(_names, {depth: null}).replace(/ |\n/g,'');		
		var lStr = langStr.concat('\n//::NODE::\n  var m = {};\n  var pm = {};\n  ', reqDmodule.toString(), '\n  ', reqPmodules.toString(), '\n  ', nStr, '.forEach(reqDmodule);\n  reqPmodules();\n//::\n');
		
		// TODO - rest of VBN should be in lexicon.js already - also for sl "TODO adjectives_regular"
		var __VBN = dict.VBN.words.filter(function(o) { return (possible(o) && o.hasOwnProperty('ref')); }).map(val);

		// put words which are NOT yet in other modules in the lexicon now
		// the same function (without arguments) is used in the lexicon to add words which ARE in other modules ...
		
		// TODO FIXME 'a' MUST not be a NU
		var gen = function (cat){
			if (typeof window != 'undefined' && window.hasOwnProperty('nlp')) { m = window; pm = window; }
			var nrOnes = Object.keys(m.numbers.ones).filter(function(s){ return s!='a' }) 
			var did = {
				NN: m.nouns_inflect.NN.map(function(a){ return a[0]; }).concat(Object.keys(m.nouns_inflect.uncountables)),
				NNS: m.nouns_inflect.NN.map(function(a){ return a[1]; }),
				VBN: __VBN,
				VBD: m.verbs_conjugate.irregulars.map(function(o){ return o.past; }),
				VBG: m.verbs_conjugate.irregulars.map(function(o){ return o.gerund; }),
				RB: Object.keys(m.adverbs_decline).concat(Object.keys(m.adjectives_decline.adj_to_advs).map(function(s) { return m.adjectives_decline.adj_to_advs[s]; })),
			}
			var lexiZip = {
				NNA: Object.keys(m.verbs_conjugate.irregularDoers).map(function(s){ return m.verbs_conjugate.irregularDoers[s];  }),
				NNAB: m.abbreviations,
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
					//::BROWSER::
					zip[key] = helpFns.repl(zip[key], 0, ['selves', 'self', 'thing', 'what', 'how', 'ing', 'ally', 'ily', 'ly', 'ever', 'er', 'ed', 'es']);
					//:: 
					toMain(key, zip);
				}
				
				//add phrasal verbs - TODO FIXME
				Object.keys(pm.phrasal_verbs).forEach(function(s) {
					main[s] = pm.phrasal_verbs[s]
				});
				// conjugate all verbs. (~8ms, triples the lexicon size)
				m.verbs.forEach(function(v) {
					var c = pm.conjugate(v);
					var d = pm.to_doer(v);
					var map = {'infinitive': 'VBP', 'past': 'VBD', 'gerund': 'VBG', 'present': 'VBZ', 'participle': 'VBN'};
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
		
		var genStr = gen.toString().replace(/\bVBN:\s*__VBN\s*,\s*\n*/g,'');
		var _did = gen(1);
		['EX', 'NN', 'NNS', 'CC', 'VBD', 'VBN', 'VBG', 'DT', 'IN', 'PP', 'UH', 'FW', 'RB', 'RBR', 'RBS'].forEach(function(cat) {
			_lMain[cat] = [];
			_lZip[cat] = [];
			if (dict.hasOwnProperty(cat) && dict[cat].hasOwnProperty('words')) {
				var dw = dict[cat].words;
				
				if (cat === 'NN') dw = dw.filter(function(o) {
					if (o.hasOwnProperty('meta') && o.meta.noVerb) {
						var checkLang = (o.meta.noVerb instanceof Array) ? o.meta.noVerb : Object.keys(o.meta.noVerb);
						return (Object.keys(m.nouns_inflect.uncountables).indexOf(o[lang]) < 0 && checkLang.indexOf(lang) > -1);
					}
					return false;
				});
				if (cat === 'NNS') dw = dw.filter(function(o) {
					return (Object.keys(m.nouns_inflect.uncountables).indexOf(o[lang]) < 0);
				});
				
				var possibleLexi = function(w) { 
					if (_did[0].hasOwnProperty(cat)) {
						return (_did[0][cat].indexOf(w) < 0 && gen(cat).indexOf(w) < 0);
					}
					if (_did[1].hasOwnProperty(cat)) {
						return (_did[1][cat].indexOf(w) < 0 && gen(cat).indexOf(w) < 0);
					}
					return (gen(cat).indexOf(w) < 0); 
				}
				
				_lMain[cat] = dw.map(val).filter(possibleLexi);
				var repl = function(a) { return helpFns.repl(a, ['selves', 'self', 'thing', 'what', 'how', 'ing', 'ally', 'ily', 'ly', 'ever', 'er', 'ed', 'es'], 0); }
				_lZip[cat] = _lMain[cat].map(repl);
			}
		});
		lStr = lStr.concat('\n  var main = {};\n  var zip = ', util.inspect(((isZip) ? _lZip : _lMain), {depth: null}), '\n  var unzip = ', genStr, '\n  unzip();' );
		
		// write a file to simply log the data modules in the folder
		var namesRaw = _names.map(function(n) { return n.concat('.js') });
		namesRaw.push('lexicon.js');
		var names = JSON.stringify( namesRaw );
		var logStr = "var util = require('util'); \nvar names = " + names + ";".concat(
				"\nnames.forEach(function(n, i) { console.log( n ); console.log( util.inspect(require('./'+n), {depth: null}) ); });"
		);
		fs.writeFileSync(	path.join(MYPATH, lang, '/', 'logExpandedModules.js'), logStr	);
		return lStr;
	}



	var i = 0;
	var _generate = function(g, i) {
		/*TODO lang.mixin*/
		if (!(g.prefix)) g.prefix = '';
		if (!(g.suffix)) g.suffix = '';

		var id = g.id;
		var prefixZip = langStr.concat(prefixFn(id));
		if (g.hasOwnProperty('description') && g.description != '') {
			g.prefix = '/* '.concat(g.description, ' */\n', g.prefix);
		}
		if (g.hasOwnProperty('prefix')) {
			prefixZip = g.prefix.concat('\n', prefixZip);
		}
		var prefixMain = prefixZip;
		var suffixZip = g.suffix.concat(endFnStr);
		var suffixMain = g.suffix.concat(nodeExportStr, endFnStr);
		var _lMain = '; \n\n  var main = ';
		var unzipStr = 'zip;\n';
		var mainStr = '';
		
		var generatedMain = g.zip(lang);
		var main = util.inspect(generatedMain, { depth: null });
		var generatedZip = g.zip(lang, true);
		var zip = util.inspect(generatedZip, { depth: null });
		
		var clean = function(s, isZip) {
			if (isZip) {
				// we leave the ::NODE:: parts for debugging
				// they will be removed by grunt's concat	...
				return s.replace(/[ \t]+$/gm, '')
			}		
			return s.replace(/^.*\/\/::BROWSER::[\s\S]*?.*[\s\S]*?\/\/::.*?$/gm, '').replace(/[ \t]+$/gm, '');
		}
		
		if (g.hasOwnProperty('make') && g.make) {
			var str = g.make.toString(-1);
			if (str.indexOf('helpFns') > -1) prefixMain = prefixMain.concat('\n', helpersImportStr);
			mainStr = '('.concat(str, ')();\n');
		} else if (g.hasOwnProperty('make')) {
			mainStr = 'zip;\n';
		}
		if (g.hasOwnProperty('unzip')) {
			if (typeof g.unzip === 'string') {
				unzipStr = g.unzip;
			} else if (g.unzip.hasOwnProperty('array')) {
				var arr = (g.unzip.array === 'zip' || g.unzip.array === '') ? 'zip' : 'zip.'.concat(g.unzip.array);
				if (g.unzip.array != 'zip' && g.unzip.array != '') _lMain = _lMain.concat('zip;\n  main.', g.unzip.array, ' = ');
				unzipStr = arr.concat('.map(', g.unzip.fn.toString(-1), ');\n');
			} else {
				unzipStr = '('.concat(g.unzip.toString(-1), ')();\n');
			}
			if (unzipStr.indexOf('helpFns') > -1) prefixZip = prefixZip.concat('\n', helpersImportStr);
		}
		if (mainStr === '') {
			prefixMain = prefixZip;
			mainStr =	unzipStr;
		}
		prefixZip = clean(prefixZip, true);
		var resultMain = prefixMain.concat('var zip = ', main, _lMain, clean(mainStr), suffixMain);
		var resultZip = prefixZip.concat('var zip = ', zip, _lMain, clean(unzipStr, true), suffixZip);
		fs.writeFileSync( path.join(MYPATH, lang, '/', g.id.concat('.js')), resultMain);
		fs.writeFileSync( path.join(MYPATH, lang, '/', g.id.concat('.min.js')), resultZip);
		i++;
		var colors = ['',''];
		if (i === generators.length) {
			colors = ['\u001b[32m', '\u001b[39m'];
			var lexiPrefix = prefixFn('lexicon');
			
			var lexiMain = _generateLexi(lang);
			var lexiZip = _generateLexi(lang, true);
			var lMainStr = lexiPrefix.concat(clean(lexiMain), suffixMain);
			var lZipStr = lexiPrefix.concat(clean(lexiZip, true), suffixZip);
			fs.writeFileSync(	path.join(MYPATH, lang, '/', 'lexicon.js'), lMainStr);
			fs.writeFileSync(	path.join(MYPATH, lang, '/', 'lexicon.min.js'), lZipStr);
			console.log( 'wrote module lexicon for language', '"'+lang);
		}
		console.log( 'wrote module for language', '"'+lang+'"', colors[0], i+' of '+generators.length, colors[1], '('+g.id+')' );
		if (i === generators.length) { console.log( ' ' ); }
	}


	// Generate data part (lexica)
	generators.forEach(_generate);

}





// usage of the module ...
var main = function (langOrLangs) {
	console.log( '\033[4minfo\033[0m' );
	var stack = function () {
		var orig = Error.prepareStackTrace;
		Error.prepareStackTrace = function(_, stack){ return stack; };
		var err = new Error;
		Error.captureStackTrace(err, arguments.callee);
		var stack = err.stack;
		Error.prepareStackTrace = orig;
		return stack;
	}
	stack().forEach(function(site){
		var fnName = site.getFunctionName() || '?';
		var fName = site.getFileName();
		var lNr = site.getLineNumber();
		// log only us and grunt
		if (fnName != '?' && fnName.indexOf('Module.') != 0) {
	    console.log('  \033[36m%s\033[90m in %s:%d\033[0m', fnName, fName, lNr);
		}
		// determine our PATH
		if (fnName === 'main') {
			MYPATH = path.dirname(fName);
			console.log( '\033[90m  [\033[0m\033[32mdata path:\033[90m %s]\033[0m', MYPATH );
		}
  });
	console.log( ' ' );
	console.log( '\033[4mRunning build\033[0m' );
	
	if (!langOrLangs) {
		// all languages in the dictionary ...
		langOrLangs = possibleLanguages;
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