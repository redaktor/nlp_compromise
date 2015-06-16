// up to date status: includes last commit d4feb704d3e7ae527566cc12dc14af01679e8798
// of https://github.com/spencermountain/nlp_compromise

/* This will build the lexica from dictionary !

// This MUST be used with node.js
// we recommend you to simply run it with

// grunt 

// OR use it as a CLI-Tool:
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
// schema - maximized, readable module version
// phrasalVerbs - maximized, readable m. version
*/

var fs = require('fs');
var path = require('path');
var util = require('util');
var _ = require('../_.js');
var dict = require('./dictionary');
var name = require('./dictionaryNames');
var rule = require('./dictionaryRules');
var schema = require('./dictionarySchema');

var MYPATH = '.'; // changes to absolute path if used as module
function setMyPath(site){
	// automatically set data path from the callsite (see module.exports)
	// = can be used anywhere, also in grunt ...
	var fnName = site.getFunctionName() || '?';
	var fName = site.getFileName();
	var lNr = site.getLineNumber();
	// log only us and grunt
	if (fnName != '?' && fnName.indexOf('Module.') != 0) {
		console.log('  \033[36m%s\033[90m in %s:%d\033[0m', fnName, fName, lNr);
	}
	// determine our PATH
	if (fnName === 'exports.main') {
		MYPATH = path.dirname(fName);
		console.log( '\033[90m  [\033[0m\033[32mfound the data path:\033[90m %s]\033[0m', MYPATH );
	}
}

// TODO - could become vice-versa: a whitelist of ISO-languages ...
var plObj = {};
var ignores = ['uid', 'ref', 'title', 'description', 'meta'];
for (var cat in dict) {
	if (dict[cat].hasOwnProperty('words')) {
		dict[cat].words.forEach(function(o) {
			for (var k in o) {
				if (ignores.indexOf(k) < 0) {
					if (!plObj.hasOwnProperty(k)) plObj[k] = 0;
					plObj[k]++;
				}
			}
		});
	}
}
var possibleLanguages = Object.keys(plObj);
var results = {main:[[]], zip:[[]]};

function inspectFn(depth) {
	// makes util.inspect logging nested objects with written functions
	var m = ['{\n\t'];
	var x = 0;
	var l = Object.keys(this).length-1;
	var level = 0; // TODO
	function formatO(o) {
		var om = ['{\n\t\t'];
		var ox = 0;
		var ol = Object.keys(o).length;
		for (var k in o) {
			ox++;
			var _t = o[k];
			if (typeof _t === 'object' && !(_t instanceof Array) && !(_t instanceof RegExp)) {
				om.push('\t', k, ': ');
				om = om.concat(formatO(_t));
			} else if (typeof _t === 'string') {
				om.push('\t', k, ': ', "'", _t, "'");
			} else {
				om.push('\t', k, ': ', (typeof _t === 'function' || _t instanceof RegExp) ? (_t.toString()) : (_t));
			}
			om.push((ox < ol) ? ',\n\t\t' : '\n\t\t');
		}
		om.push('}');
		return om;
	}
	for (var key in this) {
		if (key != 'inspect') {
			x++;
			var _t = this[key];
			if (typeof _t === 'object' && !(_t instanceof Array) && !(_t instanceof RegExp)) {
				m.push(key, ': ');
				m = m.concat(formatO(_t));
			} else if (typeof _t === 'string') {
				m.push(key, ': ', "'", _t, "'");
			} else {
				m.push(key, ': ', (typeof _t === 'function' || _t instanceof RegExp) ? (_t.toString()) : (_t));
			}
			m.push((x<l) ? ',\n\t' : '\n');
		}
	}
	m.push('}');
	return m.join('');
}

function generateLanguage(lang) {
	if (possibleLanguages.indexOf(lang) < 0) {
		console.log( 'Language not found:', '"'+lang+'"' );
		return false;
	}
	// make lang and lang/rules directory
	try { fs.mkdirSync(path.join(MYPATH, lang)); } catch (e) {};
	// for metrics module TODO
	function flag(meta) {
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
	
	// some helpers (only for the generators), other helpers go to ../_.js
	function newRes(isZip) {
		var r = results[(isZip) ? 'zip' : 'main'];
		if (r.length-1 > 0) results[(isZip) ? 'zip' : 'main'].push([]);
		return [];
	}
	function val(o) {
		return (typeof o === 'string') ? o : o[lang]; 
	}
	function did(s, isZip) {
		var r = results[(isZip) ? 'zip' : 'main'];
		var a = r[r.length-1];
		if (s instanceof Array) {
			results[(isZip) ? 'zip' : 'main'][r.length-1] = a.concat(s);
		} else {
			results[(isZip) ? 'zip' : 'main'][r.length-1].push(s);
		}
		return s;
	}
	function handled(s, isZip) {
		var r = results[(isZip) ? 'zip' : 'main'];
		var a = r[r.length-1];
		return a.indexOf(s) > -1;
	}
	function possibleAndMulti(o) {
		return ( o.hasOwnProperty(lang) );
	};
	function possible(o) {
		return ( o.hasOwnProperty(lang) && o[lang].indexOf(' ') < 0 );
	};
	function possibleOrig(o) {
		return ( o.hasOwnProperty(lang)) && (o.hasOwnProperty('uid') && o[lang].indexOf(' ') < 0 );
	};
	function possibleRef(o) {
		return ( o.hasOwnProperty(lang) && o.hasOwnProperty('ref') );
	};
	function isRef(oa, o) {
		return ((oa.ref instanceof Array && oa.ref.indexOf(o.uid) > -1) || oa.ref === o.uid);
	}
	function rest(type, isZip) {
		return did(dict[type].words.filter(function(o, isZip) {
			return ( o.hasOwnProperty(lang) && o[lang].indexOf(' ') < 0 && !handled(o[lang], isZip) );
		}), isZip);
	}
	function meta(o, i) {
    var args = (typeof i === 'object') ? i : this;
		if (o.hasOwnProperty('meta') && o.meta[args.key]) {
			var unhandled = args.hasOwnProperty('handled') ? true : (!handled(o[lang], args.isZip||0));
			if (args.hasOwnProperty('noLang')) {
				return (unhandled && possible(o));
			}
			if (o.meta[args.key] instanceof Array) { 
				var checkLang = o.meta[args.key];
			} else {
				var checkLang = Object.keys(o.meta[args.key]);
			}
			return (unhandled && possible(o) && checkLang.indexOf(lang) > -1); 
		}
		return false;
	}
	function baseRepl(w, iStr, s) {
		w = w.replace(iStr, '=');
		var iSl = iStr.slice(0,-2);
		w = (iSl === '') ? w : w.replace(iSl, '<');
		return (s) ? _.repl(w, s, 0) : w;
	}

	function allPossible() {
		var _all = [];
		for (var key in dict) {
			if (dict[key].hasOwnProperty('words')) {
				_all = _all.concat(dict[key].words.filter(possibleAndMulti).map(function(o){
					o.tag = key;
					return o;	
				}));
			}
		}
		return _all;
	};
	var allPossibles = allPossible();
	
	
	// TODO - DOC generators ...
	
	// generate the DATA MODULES from dictionaries
	var generators = [
	
		// sort out multiple words
		{ // 0
			id: 'multiples',
			description: '',
			// build
			zip: function(lang, isZip) {
				newRes(isZip);
				var res = {};
				allPossibles.forEach(function(o) {
					var v = val(o);
					if (v.indexOf(' ') > -1) {
						var s = (isZip) ? _.repl(v, ['at', ' ', 'united', 'new', 'in '], 0) : v;
						res[s] = o.tag;
					}
				});
				return res;
			},
			make: 0,
			unzip: "_.repl(exports.zip, 0, ['at', ' ', 'united', 'new', 'in ']);"
		},

		// NOUN
		{ // 1 irregulars (plural), uncountables
			id: 'nouns_inflect',
			description: 'singular nouns having irregular plurals',
			// zip
			zip: function(lang, isZip) {
				var _irregulars = [];
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
								var v = val(o);
								var nA = (isZip) ? [v, baseRepl(op[lang], v, ['es'])] : [v, op[lang]];
								res[Object.keys(res)[i]].push(nA);
								_irregulars.push(nA);
							}
						});
					});
				});
				res.uc = dict.NN.words.filter(meta, {key: 'uncountable', isZip: isZip}).map(val);
				return res; // Note: the returned value becomes always variable 'exports.zip' in the module ...
			},
			// expand
			unzip: function() {
				//::BROWSER::
				var repl = function(a) { return _.replBase(a,0,['es']); }
				exports.zip.NN = exports.zip.NN.map(repl);
				exports.zip.PRP = exports.zip.PRP.map(repl);
				exports.zip.PP = exports.zip.PP.map(repl);
				//::
				exports.zip.irregulars = exports.zip.NN.concat(exports.zip.PRP, exports.zip.PP);
				exports.zip.uncountables = exports.zip.uc.reduce(_.toObj,{});
				return exports.zip;
			}
		},

		{ // 2 entityBlacklist, personBlacklist, prps
			id: 'nouns',
			description: '',
			// build
			zip: function(lang, isZip) {
				// TODO: 'it', 'one'
				var _all = dict.NN.words.concat(dict.PP.words, dict.DT.words, dict.NNAB.words, dict.CC.words).filter(possible);
				var _prps = dict.PRP.words.map(val);
				var _pps = dict.PP.words.filter(meta, {key: 'parent', noLang: 1}).map(function(o) {
					return [o[lang], o.meta.parent];
				});
				var _black = function(type) {
					var b = _all.filter(meta, {key: type+'Blacklist', isZip: isZip}).map(val);
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
				exports.zip.pps.forEach(function(a) { _pps[a[0]] = exports.zip.prps[a[1]]; });
				return {
					prps: exports.zip.prps.reduce(_.toObj, {}),
					pps: _pps,
					entityBlacklist: exports.zip.entityBlacklist.reduce(_.toObj, {}),
					personBlacklist: exports.zip.personBlacklist,
				}
			}
		},


		// VERB :
		{ // 3 CP, MD, negate
			id: 'verbs_special',
			description: '',
			// compress
			zip: function(lang, isZip) {
				// TODO: 'it', 'one'
				var res = {CP:[], MD:[]};
				['CP', 'MD'].forEach(function(type) {
					dict[type].words.filter(possibleAndMulti).forEach(function(o) {
						var hasRef = 0;
						var v = val(o);
						dict[type].words.filter(possibleRef).forEach(function(ov) {
							if (isRef(ov, o)) {
								hasRef = 1;
								res[type].push((isZip) ? [v, baseRepl(ov[lang], v, ['\'t']) ] : [v, ov[lang]]);
							}
						});
						if (hasRef < 1 && !(o.hasOwnProperty('ref')) && !(o.hasOwnProperty('uid'))) {
							res[type].push([v, v+' not']);
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
					exports.zip[type].forEach(function(a) {
						//::BROWSER::
						a = _.replBase(a,0,['\'t']);
						//::
						res[type][a[0]] = type;
						res[type][a[1]] = type;
						res.negate[a[1]] = a[0];
						res.negate[a[0]] = a[1];
					});
				});
				return res;
			}
		},

		{ // 4 irregulars, noDoers, irregularDoers
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
					var v = val(o);
					var conjugateds = (isZip) ? [_.repl(v, ['ing', 'er', 've'], 0)] : [v];
					for (var type in types) {
						var conjugated = 0;
						dict[type].words.filter(possibleRef).forEach(function(oc) {
							if (isRef(oc, o)) {
								conjugated = (isZip) ? baseRepl(oc[lang], v, ['ing', 'er', 've']) : oc[lang];
							}
							did(v, isZip);
						});
						conjugateds.push( (conjugated) ? conjugated : 0 );
					}
					// check noDoer
					if (!conjugateds[4] && (!o.hasOwnProperty('meta') || !o.meta.noDoer || o.meta.noDoer.indexOf(lang) < 0)) {
						conjugateds.pop();
					}

					_irregulars.push(conjugateds);
				});

				dict.VBP.words.filter(meta, {key: 'noDoer', isZip: isZip}).forEach(function(o) {
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
				array: 'zip.irregulars',
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
							s = _.repl(s, 0, ['ing', 'er', 've']);
						}
						//::
						if (i > 3 && !s) {
							exports.zip.noDoers[r(a[0])] = 1;
						} else if (i > 3) {
							exports.zip.irregularDoers[r(a[0])] = s;
						} else {
							obj[types[i]] = s;
						}
					});
					return obj;
				}
			}
		},

		{ // 5
			id: 'verbs',
			description: '',
			// build
			zip: function(lang, isZip) {
				var regular = rest('VBP', isZip).map(val).concat(dict.VB.words.filter(possible).map(val));
				return (isZip) ? _.repl(JSON.stringify(regular), ['re', 'er', 'co', 'es', '","'], 0) : regular;
			},
			make: 0,
			unzip: 'JSON.parse(_.repl(exports.zip, 0, [\'re\', \'er\', \'co\', \'es\', \'","\']));'
		},


		// ADJECTIVE
		//
		{ // 6
			id: 'adjectives_decline',
			description: '',
			prefix: "// var types = ['adjective', 'adverb', 'comparative', 'superlative', 'noun'];\n"+
			"// 0 means 'return null' for adverbs OR 'conjugate without more/most' for comparative and superlative.\n"+
			"// 1 means 'default behavior'\n",
			// compress
			zip: function(lang, isZip) {
				var repJJ = function(s) { return ((typeof s === 'string') ? _.repl(s, ['ight', 'ing', 'ent', 'er', 're', 'al', 'ed', 'ly', 'some'], 0) : s); }
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
					var v = val(o);
					var declineds = (isZip) ? [repJJ(v)] : [v];
					for (var type in types) {
						var declined = 1;
						if (type === 'RB' && meta(o, {key: 'noAdverb', isZip: isZip})) {
							declined = 0;
						}
						if ((type === 'JJR' || type === 'JJS')) { // TODO
							if (meta(o, {key: 'noComparative', isZip: isZip})) {
								declined = -1;
							} else if (!o.hasOwnProperty('meta') || !o.meta.convertable) {
								declined = 0;
							}
						}
						if (declined > 0 || !o.hasOwnProperty('meta') || !o.meta.convertable) {
							dict[type].words.filter(possibleRef).forEach(function(oa) {
								if (isRef(oa, o)) {
									declined = (!isZip || typeof oa[lang] === 'number') ? oa[lang] : oa[lang].replace(v, '=');
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
				dict.JJ.words.filter(meta, {key: 'convertable', isZip: isZip}).forEach(function(o) {
					var v = val(o);
					if (!handled(v, isZip)) {
						irregulars.push((isZip) ? repJJ(v) : v);
						did(v, isZip);
					}
				});
				/* TODO flags for all conjugated :  'I'.concat(flag(o.meta))) */
				return irregulars;
			},
			// node.js
			make: function() {
				var res = { convertables: [], adj_to_advs: {}, adv_donts: [], to_comparative: {}, to_superlative: {}, to_noun: {} };
				exports.zip.forEach(function(_a) {
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
				res.convertables = res.convertables.reduce(_.toObj, {});
				res.adv_donts = res.adv_donts.reduce(_.toObj, {});
				return res;
			},
			// browser - expand
			unzip: function() {
				var repJJ = function(s) { return (typeof s !== 'string') ? s : _.repl(s, 0, ['ight', 'ing', 'ent', 'er', 're', 'al', 'ed', 'ly', 'some']); }
				var res = { convertables: [], adj_to_advs: {}, adv_donts: [], to_comparative: {}, to_superlative: {}, to_noun: {} };
				var expand = function (s, b) { return (s === 0) ? 0 : s.replace('=', b); }
				exports.zip.forEach(function(_a) {
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
				res.convertables = res.convertables.reduce(_.toObj, {});
				res.adv_donts = res.adv_donts.reduce(_.toObj, {});
				return res;
			}
		},

		{ // 7
			id: 'adjectives_demonym',
			description: '',
			// compress
			zip: function(lang, isZip) {
				var demonyms = [];
				dict.JJ.words.filter(meta, {key: 'demonym', isZip: isZip}).forEach(function(o) {
					demonyms.push((isZip) ? _.repl(o[lang], ['can', 'dan', 'ean', 'ian', 'ese', 'an', 'austr', 'ish'], 0) : o[lang]);
					did(o[lang], isZip);
				});
				return demonyms;
			},
			make: 0,
			// expand
			unzip: {
				array: 'zip',
				fn: function(w) {
					return _.repl(w, 0, ['can', 'dan', 'ean', 'ian', 'ese', 'an', 'austr', 'ish']);
				}
			}
		},

		{ // 8
			id: 'adjectives',
			description: '',
			// build
			zip: function(lang, isZip) {
				var a = rest('JJ', isZip).map(val);
				if (!isZip) return a;
				return _.repl(JSON.stringify(a), ['ight', 'ing', 'ant', 'ent', 're', 'er', 'al', 'ed', 'ly', 'en', 'es', 'ate', '","'], 0);
			},
			make: 0,
			// expand
			unzip: 'JSON.parse(_.repl(exports.zip, 0, [\'ight\', \'ing\', \'ant\', \'ent\', \'re\', \'er\', \'al\', \'ed\', \'ly\', \'en\', \'es\', \'ate\', \'","\']));'
		},


		// ADVERB
		{ // 9
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
				exports.zip.forEach(function(a) {
					res[a[0]] = a[1];
				});
				return res;
			},
			// expand
			unzip: function() {
				var res = {};
				exports.zip.forEach(function(a) {
					res[a[0].replace('=', a[1])] = a[1];
				});
				return res;
			}
		},


		// OTHER : numbers, dates, honorifics, abbreviations, normalisations, multiples, suffixes
		{ // 10
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
								nrs[_var][did(w, isZip)] = (_var === 'multiple') ? Math.pow(10, parseInt(i)) : parseInt(i);
							});
						}
					}
				});
				return nrs;
			}
		},

		{ // 11
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
				var res = exports.zip;
				for (var w in res.monthAbbrevs) { res.months[w] = exports.zip.monthAbbrevs[w] }
				res.dayS = '\b('.concat(Object.keys(res.days).join('|'), ')\b');
				res.monthS = '('.concat(Object.keys(res.months).join('|'), ')');
				res.monthsS = res.monthS + ',?';
				return res;
			}
		},

		{ // 12
			id: 'honorifics',
			description: '',
			// build
			zip: function(lang, isZip) {
				newRes(isZip);
				return did(dict.NNAB.words.filter(meta, {key: 'honour', isZip: isZip}).map(val), isZip);
			}
		},

		{ // 13
			id: 'abbreviations',
			description: '',
			// build
			zip: function(lang, isZip) {
				var nonHonorifics = rest('NNAB', isZip);
				return {
					nouns: nonHonorifics.filter(function(o) { return !meta(o, {key: 'nonNoun'}); }).map(val),
					nonNouns: nonHonorifics.filter(meta, {key: 'nonNoun', isZip: isZip}).map(val)
				};
			},
			prefix: "var honorifics = require('./honorifics');\n",
			// concat honorifics
			unzip: function() {
				return {
					nouns: exports.zip.nouns.concat(honorifics),
					nonNouns: exports.zip.nonNouns
				};
			}
		},

		{ // 14
			id: 'pos_data',
			description: '',
			// build
			zip: function(lang, isZip) {
				var res = { particles: [], cs: [], contractions: {}, ambiguousContractions: {} };
				res.particles = allPossibles.filter(meta, {key: 'particle', isZip: isZip}).map(val);
				if (dict.contractions.hasOwnProperty(lang)) {
					res.cs = dict.contractions[lang];
					var cs = res.cs.map(function(w){ 
						return w.replace('|', ''); 
					});
					var csAs = res.cs.map(function(w){ 
						var a = w.split('|'); return ((a[1]) ? '\''.concat(a[1]) : a[0]);
					});
					allPossibles.filter(meta, {key: 'contractions'}).forEach(function(o){
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
				exports.zip.particles = exports.zip.particles.reduce(_.toObj, {});
				return exports.zip;
			}
		},

		{ // 15
			id: 'negate_data',
			description: '',
			// build
			zip: function(lang, isZip) {
				return dict.negate.hasOwnProperty(lang) ? dict.negate[lang] : {};
			},
			prefix: "var verbs_special = require('./verbs_special');\n",
			// convert it to an easier format
			unzip: function() {
				var negate = verbs_special.negate || {};
				for (var k in exports.zip) { negate[k] = exports.zip[k]; }
				for (var k in negate) { negate[negate[k]] = k; }
				return negate;
			}
		},

		{ // 16
			id: 'firstnames',
			description: '',
			// build
			zip: function(lang, isZip) {
				var replN = function(w) { 
					return _.repl(w, ['ie', 'na', 'la', 'ri', 'ne', 'ra', 'el', 'in', 'an', 'le', 'en', 'ia'], 0);
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
				var replN = function(w) { 
					return _.repl(w, 0, ['ie', 'na', 'la', 'ri', 'ne', 'ra', 'el', 'in', 'an', 'le', 'en', 'ia']) 
				}
				//::
				var o = {};
				['male', 'female'].forEach(function(type) {
					for (var k in exports.zip[type]) {
						//::NODE::
						var arr = exports.zip[type][k].split(',');
						//::
						//::BROWSER::
						var arr = replN(exports.zip[type][k]).split(',');
						//::
						arr.forEach(function(w, i) {
							o[k + w] = type.charAt(0);
						})
					}
				});
				//::NODE::
				exports.zip.ambiguous = exports.zip.ambiguous.reduce(function(h,s){ h[s]='a'; return h; }, o);
				//::
				//::BROWSER::
				exports.zip.ambiguous = exports.zip.ambiguous.map(replN).reduce(function(h,s){ h[s]='a'; return h; }, o);
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
				for (var normCh in exports.zip) {
						exports.zip[normCh].split('').forEach(function(grCh){
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
				if (!rule.unambiguousSuffixes.hasOwnProperty(lang) || !rule.verbSuffixes.hasOwnProperty(lang)) { return; }
				var o = {
					wordnet: rule.unambiguousSuffixes[lang],
					verbs: rule.verbSuffixes[lang]
				};
				var s = [ 'ed', 'er', 'le', 'es', 'ns', 'ant', 'nt', 'ise', 'ite', 'ive', 'ize', 'ish', 'ade', 'ate', 'ose', 'eed', 'end', 'est', 'use', '","' ];
				return (isZip) ? _.repl(JSON.stringify(o), s, 0) : o;
			},
			// convert it to an easier format
			unzip: function() {
				//::BROWSER::
				exports.zip = JSON.parse(_.repl(exports.zip, 0, [ 'ed', 'er', 'le', 'es', 'ns', 'ant', 'nt', 'ise', 'ite', 'ive', 'ize', 'ish', 'ade', 'ate', 'ose', 'eed', 'end', 'est', 'use', '","' ]));
				//::
				return {
					wordnet: _.toObjValues(exports.zip.wordnet),
					verbs: _.toObjValues(exports.zip.verbs)
				};
			}
		},
		
		{ // 19
			id: 'phrasalVerbs',
			description: '',
			prefix: "var schema = require('./schema');\n"+
							"var opposite = require('./negate_data');\n"+
							"var verbs = require('./verbs');\n"+
							"var verbs_conjugate = require('./verbs_conjugate');\n"+
							"var conjugate = require('../../parents/verb/conjugate');",
			// build
			zip: function(lang, isZip) {
				var res = {
					verbs: dict.phrasalVerbs.words.filter(possible).map(val), 
					symmetric: {}, 
					asymmetric: {} 
				}
				
				var VBPs = require('./'+lang+'/verbs_conjugate').irregulars.map(function(o){
					return o.infinitive;	
				}).concat( require('./'+lang+'/verbs'), res.verbs );
				
				function toRes(o){
					o.meta.phrasal[lang].forEach(function(a) {
						var type = (a instanceof Array) ? 'symmetric' : 'asymmetric';
						var s = (type === 'asymmetric') ? a : a[0];
						if (!res[type].hasOwnProperty(s))	{
							res[type][s] = [];
						}
						res[type][s].push(VBPs.indexOf(o[lang]));
					});
				}
				dict.VBP.words.filter(meta, {key: 'phrasal', handled: 1, isZip: isZip}).forEach(toRes);
				dict.phrasalVerbs.words.forEach(toRes);
				res.verbs = res.verbs.join(',');
				res.symmetric = JSON.stringify(res.symmetric);
				res.asymmetric = JSON.stringify(res.asymmetric);
				return res;
			},
			unzip: function () {
				var res = {};
				var allVerbs = verbs_conjugate.irregulars.map(function(o){
					return o.infinitive;	
				}).concat( verbs, exports.zip.verbs.split(',') );
				
				var regexArr = [];
				function buildPhrasals(t) {
					var o = JSON.parse(exports.zip[t]);
					for (var k in o) {
						o[k].reduce(function (h, i) {
							h[allVerbs[i]+' '+ k] = 'VBP';
							if (regexArr.indexOf(k) < 0) {
								regexArr.push(k);
							}
							if (t === 'symmetric' && opposite.hasOwnProperty(k)) {
								h[allVerbs[i]+' '+ opposite[k]] = 'VBP';
								if (regexArr.indexOf(opposite[k]) < 0) {
									regexArr.push(opposite[k]);
								}
							}
							return h;
						}, res);
					}
				}
				['symmetric', 'asymmetric'].forEach(buildPhrasals);
				
				res.particleRegex = ['^(.*?)(', regexArr.join('|'), ')$'].join('');
				return res;
			}
		},
		
		{ // 20
			id: 'pos_rules',
			description: '',
			// build
			zip: function(lang, isZip) {
				var o = {
					replace: {},
					set: (rule.set_pos.hasOwnProperty(lang)) ? rule.set_pos[lang] : {},
					merge: (rule.merge_pos.hasOwnProperty(lang)) ? rule.merge_pos[lang] : {},
					special: (rule.special_pos.hasOwnProperty(lang)) ? rule.special_pos[lang] : {},
					inspect: inspectFn
				};
				for (var id in rule.replace_pos) {
					if (rule.replace_pos[id].hasOwnProperty(lang)) {
						o.replace[id] = rule.replace_pos[id][lang];
					}
				}
				return o;
			}
		},
		/*
		{ // 21
			id: '',
			description: '',
			// build
			zip: function(lang, isZip) {
				
			}
		},
		*/
		{ // 22
			id: 'verb_rules',
			description: 'regex rules for verb conjugation\nused in combination with the generic "fallback" method',
			// build
			zip: function(lang, isZip) {
				if (!rule.verbRules.hasOwnProperty(lang)) { return; }
				var rs = rule.verbRules[lang];
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
				return (isZip) ? _.repl(JSON.stringify(rs), ['\\$1e', '\\$1s', '\\$1es', '\\$1ed', '\\$1ing', 'ing'], 0) : rs;
			},
			// convert it to an easier format
			unzip: function() {
				//::BROWSER::
				exports.zip = JSON.parse(_.repl(exports.zip, 0, ['$1e', '$1s', '$1es', '$1ed', '$1ing', 'ing']));
				//::
				for (var cat in exports.zip) {
					exports.zip[cat] = exports.zip[cat].map(function(a){
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
				return exports.zip;
			}
		},

		{ // 23
			id: 'word_rules',
			description: '',
			// build
			zip: function(lang, isZip) {
				if (!rule.wordRules.hasOwnProperty(lang)) { return; }
				return rule.wordRules[lang];
			},
			// convert it to an easier format
			unzip: function() {
				var a = [];
				for (var k in exports.zip) {
					exports.zip[k].forEach(function(r){
						a.push({
							reg: new RegExp(r, 'i'),
							pos: k
						});
					});
				}
				return a;
			}
		},

		{ // 24
			id: 'schema',
			description: '',
			// compress
			zip: function(lang, isZip) {
				var o = {parents: [], tags: []};
				var tags = schema.tags;
				for (var tag in tags) {
					var name = tags[tag].hasOwnProperty(lang) ? tags[tag][lang] : tags[tag].en;
					var pPos = o.parents.indexOf(tags[tag].parent);
					if (pPos < 0) {
						o.parents.push(tags[tag].parent);
						pPos = o.parents.length-1;
					}
					var a = [tag, name, pPos];
					if (tags[tag].hasOwnProperty('tense')) a.push(tags[tag].tense);
					o.tags.push(a);
				}
				o.tenses = schema.tenses;
				return o;
			},
			// expand
			unzip: function() {
				var res = {};
				exports.zip.tags.forEach(function(a) {
					res[a[0]] = { name:a[1], parent:exports.zip.parents[a[2]], tag:a[0] };
					if (a.length > 3) {
						res[a[0]].tense = a[3];
					}
				});
				res.getTense = function(tense) {
					if (!exports.zip.tenses.hasOwnProperty(tense)) {
						return {tag: null};
					}
					return exports.zip.tenses[tense];
				}
				res._tenses = exports.zip.tenses;
				res._tenseOrder = [ 'past', 'present', 'gerund', 'infinitive' ];
				return res;
			}
		}

	];


	// //////// //
	// LEXICON //
	// some string constants
	var C = {
		// TODO - this is a stub to make sure until anything is browserified we have a 'lang'
		// would be singleton language ::
		// FIXME - merge local 'dev' fork
		l: ["if (!lang) {var lang = '", lang, "';}\n"].join(''),
		_: '\n',
		_var: 'var ',
		tab: '  ',
		col: ': ',
		eq: ' = ',
		req1: " = require('./",
		req2: "');\n",
		exp0: '{\n',
		exp1: '\nexports.zip = {\n',
		exp2: '\n};',
		_exp: '\n  exports.zip = ',
		un1: '\n  var unzip = ',
		un2: '\n  unzip();\n',
		map1: '.map(',
		map2: ');\n',
		main: 'var main = {};\n',
		mod0: 'module.exports = ',
		mod1: 'module.exports = (',
		mod2: ')();\n',
		mod: '\nmodule.exports = exports.zip;\n'
	};
	function buildLexi(lang, isZip) {
		var data = {};
		var _lMain = {};
		var _lZip = {};
		var conjugate = require('../parents/verb/conjugate');
		var to_doer = require('../parents/verb/conjugate/to_doer');
		var to_adverb = require('../parents/adjective/conjugate/to_adverb');
		var to_comparative = require('../parents/adjective/conjugate/to_comparative');
		var to_superlative = require('../parents/adjective/conjugate/to_superlative');
		
		// Now let's handle the module names
		// for data modules index and lexicon
		var _names = generators.map(function(g) { return g.id; });
		// require data modules for use in build
		function reqModule(n) { data[n] = require('./' + lang + '/' + n); }
		_names.forEach(reqModule);
		// TODO - rest of VBN should be in lexicon.js already - also for sl "// TODO adjectives_regular"
		var __VBN = dict.VBN.words.filter(function(o) { return (possible(o) && o.hasOwnProperty('ref')); }).map(val);
		
		// write the data modules INDEX
		var names = [];
		var expNames = [];
		_names.forEach(function(n){ 
			names.push(C._var, n, C.req1, n, C.req2);
			expNames.push(C.tab, n, C.col, n, ',', C._);
		});
		var expStr = expNames.join('').slice(0,-2);
		names.push(C._, C.mod0, C.exp0, expStr, C.exp2);
		fs.writeFileSync(	path.join(MYPATH, lang, '/index.js'), '// data index\n' + names.join('')	);
		fs.writeFileSync(	path.join(MYPATH, lang, '/index.min.js'), names.join('').replace(/'\);/gm, ".min');") );	
		
		// now require this index module and other needed modules in the LEXICON
		var reqs = [
			C.l, C._,
			"var data = require('./');", C._,
			"var conjugate = require('../../parents/verb/conjugate');", C._,
			"var to_doer = require('../../parents/verb/conjugate/to_doer');", C._,
			"var to_adverb = require('../../parents/adjective/conjugate/to_adverb');", C._,
			"var to_comparative = require('../../parents/adjective/conjugate/to_comparative');", C._,
			"var to_superlative = require('../../parents/adjective/conjugate/to_superlative');", C._,
			C.main
		];
		
		// put words which are NOT yet in other modules in the lexicon NOW
		// the same function (without arguments) is used in the lexicon to add words which ARE in other modules LATER...
		// TODO FIXME 'a' MUST NOT be a NU
		function lexicon(cat){
			if (typeof window != 'undefined' && window.hasOwnProperty('nlp')) { data = window; }
			var nrOnes = Object.keys(data.numbers.ones).filter(function(s){ return s!='a' }) 
			var did = {
				NN: data.nouns_inflect.NN.map(function(a){ return a[0]; }).concat(Object.keys(data.nouns_inflect.uncountables)),
				NNS: data.nouns_inflect.NN.map(function(a){ return a[1]; }),
				VBN: __VBN,
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
					//::BROWSER::
					exports.zip[key] = _.repl(exports.zip[key], 0, ['selves', 'self', 'thing', 'what', 'how', 'ing', 'ally', 'ily', 'ly', 'ever', 'er', 'ed', 'es']);
					//:: 
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
					//var d = to_doer(v);
					for (var tense in data.schema._tenses) {
						if (c[tense] && !main[c[tense]]) { 
							main[c[tense]] = data.schema.getTense(tense).tag;
						}
						//if (d && !main[d]) { main[d] = 'NNA' }
					}
				});
				// decline all adjectives to their adverbs_ (~13ms)
				// 'to_adverb','to_superlative','to_comparative'
				data.adjectives.concat(Object.keys(data.adjectives_decline.convertables)).forEach(function(j) {
					main[j] = 'JJ';
					var adv = to_adverb(j);
					if (adv && adv !== j && !main[adv]) {
						main[adv] = main[adv] || 'RB'
					}
					var c = to_comparative(j);
					if (c && !c.match(/^more ./) && c !== j && !main[c]) {
						main[c] = main[c] || 'JJR'
					}
					var s = to_superlative(j);
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
		// end of lexicon
		
		var _did = lexicon(1);
		['EX', 'NN', 'NNS', 'CC', 'VBD', 'VBN', 'VBG', 'DT', 'IN', 'PP', 'UH', 'FW', 'RB', 'RBR', 'RBS'].forEach(function(cat) {
			_lMain[cat] = [];
			_lZip[cat] = [];
			if (dict.hasOwnProperty(cat) && dict[cat].hasOwnProperty('words')) {
				var dw = dict[cat].words.filter(possible);
				
				if (cat === 'NN') dw = dw.filter(function(o) {
					if (o.hasOwnProperty('meta') && o.meta.noVerb) {
						var checkLang = (o.meta.noVerb instanceof Array) ? o.meta.noVerb : Object.keys(o.meta.noVerb);
						return (Object.keys(data.nouns_inflect.uncountables).indexOf(o[lang]) < 0 && checkLang.indexOf(lang) > -1);
					}
					return false;
				});
				if (cat === 'NNS') dw = dw.filter(function(o) {
					return (Object.keys(data.nouns_inflect.uncountables).indexOf(o[lang]) < 0);
				});
				
				var possibleLexi = function(w) { 
					if (_did[0].hasOwnProperty(cat)) {
						return (_did[0][cat].indexOf(w) < 0 && lexicon(cat).indexOf(w) < 0);
					}
					if (_did[1].hasOwnProperty(cat)) {
						return (_did[1][cat].indexOf(w) < 0 && lexicon(cat).indexOf(w) < 0);
					}
					return (lexicon(cat).indexOf(w) < 0); 
				}
				
				_lMain[cat] = dw.map(val).filter(possibleLexi);
				var repl = function(a) { return _.repl(a, ['selves', 'self', 'thing', 'what', 'how', 'ing', 'ally', 'ily', 'ly', 'ever', 'er', 'ed', 'es'], 0); }
				_lZip[cat] = _lMain[cat].map(repl);
			}
		});
		
		
		var lexiconStr = util.inspect(((isZip) ? _lZip : _lMain), {depth: null});
		var genStr = lexicon.toString().replace(/\bVBN:\s*__VBN\s*,\s*\n*/g,''); // TODO FIXME
		reqs.push(C._exp, lexiconStr, C.un1, genStr, C.un2);
		lexiconStr = reqs.join('');
		
		
		// write a file to simply log the data modules in the folder // TODO FIXME only for .min
		_names.push('lexicon.js');
		var logStr = "var util = require('util'); \nvar names = " + JSON.stringify( _names ) + ";".concat(
				"\nnames.forEach(function(n, i) { console.log( n ); console.log( util.inspect(require('./'+n), {depth: null}) ); });"
		);
		fs.writeFileSync(	path.join(MYPATH, lang, '/', 'logExpandedModules.js'), logStr	);
		
		// return the lexicon in all its glory ...
		return lexiconStr;
	}
	// end of buildLexi


	// //////////////////// //
	// MAIN BUILD FUNCTION //
	var i = 0;
	var _regex = /\b(_)[\[.]["']*[a-zA-Z_]+["'\]]*/g;
	var _require = 'var _ = require("../../_");\n';
	
	
	function build(g, i) {
		var hasMake = 0;
		function clean(s) {
			// TODO - better beautifying HERE
			if (this.isZip) {
				return s.trim()/*.replace(/[ \t]+$/gm, '')*/;
			}		
			return s.replace(/^.*\/\/::BROWSER::[\s\S]*?.*[\s\S]*?\/\/::.*?$/gm, '').trim()/*.replace(/[ \t]+$/gm, '\t')*/;
		}
		function addUnzip(arr) {
			var mainArr = arr.map(clean,{isZip: 0});
			var zipArr = arr.map(clean, {isZip: 1});
			gens.zip = gens.zip.concat(zipArr);
			if (!hasMake) { 
				gens.main = gens.main.concat(mainArr); 
			}
		}
		
		var desc = (g.description) ? ['// ', g.description.replace(/\n/gm, '\n// '), C._].join('') : '';
		var gens = {
			main: [desc, g.prefix||'', C._, C._l],
			zip: [g.prefix||'', C._, C._l]
		};
		
		// generate
		var generatedMain = g.zip(lang);
		var mainStr = util.inspect(generatedMain, { depth: null });
		gens.main.push(C._exp, mainStr, C._);
		
		var generatedZip = g.zip(lang, true);
		var zipStr = util.inspect(generatedZip, { depth: null });
		gens.zip.push(C._exp, zipStr, C._);
		
		hasMake = g.hasOwnProperty('make');
		if (hasMake && g.make) {
			gens.main.push(C.mod1, g.make.toString(), C.mod2);
		} else if (hasMake) {
			gens.main.push(C.mod);
		}
		
		if (g.hasOwnProperty('unzip')) {
			var unzips = [];
			var unzStr = '';
			if (typeof g.unzip === 'string') {
				unzStr = g.unzip;
				unzips = [C._, C.mod0, g.unzip];
			} else if (g.unzip.hasOwnProperty('array')) {
				unzStr = g.unzip.fn.toString();
				var _ex = 'exports.';
				unzips = [C._, _ex, g.unzip.array, C.eq, _ex, g.unzip.array, C.map1, unzStr, C.map2, C.mod];
			} else {
				// it should be a function
				unzStr = g.unzip.toString();
				unzips = [C._, C.mod1, unzStr, C.mod2];
			}
			addUnzip(unzips);
		} else {
			addUnzip([C.mod]);
		}
		
		// WRITE the generated ...
		var mainStr = gens.main.join('').trim();
		var zipStr = gens.zip.join('').trim();
		// check if any needs the _ helper module
		if (mainStr.match(_regex)) {
			mainStr = [_require, C._, mainStr].join('');
		}
		if (zipStr.match(_regex)) {
			zipStr = [_require, C._, zipStr].join('');
		}
		// TODO - run through beautifier
		fs.writeFileSync( path.join(MYPATH, lang, '/', g.id.concat('.js')), mainStr);
		fs.writeFileSync( path.join(MYPATH, lang, '/', g.id.concat('.min.js')), zipStr);
		
		i++;
		var colors = ['',''];		
		if (i === generators.length) {
			colors = ['\u001b[32m', '\u001b[39m'];
			var lexiMain = buildLexi(lang);
			var lexiZip = buildLexi(lang, true);
			var lMainStr = [clean(lexiMain), C.mod0, 'main;', C._].join('');
			var lZipStr = [clean(lexiZip, true), C._, C.mod0, 'main;', C._].join('');
			fs.writeFileSync(	path.join(MYPATH, lang, '/', 'lexicon.js'), lMainStr);
			fs.writeFileSync(	path.join(MYPATH, lang, '/', 'lexicon.min.js'), lZipStr);
			console.log( 'wrote', colors[0], 'lexicon', colors[1], 'for language', '"'+lang+'"');
		}
		console.log( 'wrote module for language', '"'+lang+'"', colors[0], i+' of '+generators.length, colors[1], '('+g.id+')' );
		if (i === generators.length) { console.log( ' ' ); }
	}


	// Generate data part (lexica)
	generators.forEach(build);

}




// API
// usage of the module ...
exports.main = function (langOrLangs) {
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
	stack().forEach(setMyPath);
	console.log( ':) ' );
	console.log( '\033[4mRunning build\033[0m' );
	
	if (!langOrLangs) {
		// all languages in the dictionary ...
		langOrLangs = possibleLanguages;
	} else if (!(langOrLangs instanceof Array)) {
		langOrLangs = [langOrLangs];
	}
	langOrLangs.forEach(generateLanguage);
}

module.exports = exports.main;

// CLI
var langOrLangs;
var CLIpos = process.argv.indexOf("-ls");
// TODO minor - language metrics are absolute, e.g. en: 3200 (words)
// once we have multiple languages, convert in 'translated' percents:
// {en: 100, de: 80}
var units = 'words';
var pl = {};
for (var k in plObj) { pl[k] = plObj[k]+' '+units; }
if(CLIpos > -1){
	console.log( pl );
} else {
	CLIpos = process.argv.indexOf("-l");
	if(CLIpos > -1){
		if (!(process.argv[CLIpos + 1])) {
			console.log( 'Generating', pl );
			exports.main(possibleLanguages);
		} else {
			langOrLangs = process.argv[CLIpos + 1].replace(/ /g, '');
			if (langOrLangs.indexOf(',') > -1) {
				exports.main(langOrLangs.split(','));
			} else {
				exports.main(langOrLangs)
			}
		}
	}
}