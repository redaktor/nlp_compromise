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
// jsDOC for lexicon (from original)
// DOC generators (functions to build and zip/unzip a module) ...
// DOC the {{}} stuff to real JSdoc for methods with return types etc. ...
// DOC the dictionaries to real JSdoc and use it to document data's methods "... 
// schema - maximized, readable module version and maybe as JSON Schema (could be reused for validation) ...
// phrasalVerbs - maximized, readable m. version
// verbs conjugation for lexicon - the multiple forms like futures (not tagged because were not used yet)
*/
var fs = require('fs');
var path = require('path');
var util = require('util');
// special util custom inspect fn (functions and regexes in obj)
var _;
var __ = require('./_');
var dict = require('./dictionary');
var name = require('./dictionaryNames');
var rule = require('./dictionaryRules');
var schema = require('./dictionarySchema');
var MYPATH = '.'; // changes to absolute path if used as module
var possibleLanguages = {}; // changes to all languages in the dictionary

function generateLanguage(lang) {
	if (possibleLanguages.indexOf(lang) < 0) { console.log( 'Language not found:', '"'+lang+'"' ); return false; }
	__.setLang(lang);
	var allPossibles = __.allPossible();
	// make lang and lang/lexicon directory
	try { fs.mkdirSync(path.join(MYPATH, lang)); } catch (e) {};
	try { fs.mkdirSync(path.join(MYPATH, lang, 'lexicon')); } catch (e) {};
	
		
	// generate the DATA MODULES from dictionaries
	// This is an array and not an object to support 'same' filenames in different folders
	// like for 'index' (think of uid as combination of folder+id) ...
	var generators = [
		{ // The schema
			id: 'schema',
			description: 'The schema for Parts Of Speech tagging',
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
				o.tense = schema.tenses;
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
					if (!exports.zip.tense.hasOwnProperty(tense)) {
						return {tag: null};
					}
					return exports.zip.tense[tense];
				}
				res._tense = exports.zip.tense;
				res._tenses = Object.keys(exports.zip.tense);
				res._baseTense = {};
				res._tenses.forEach(function(k) {
					if (res._tense[k].base) { res._baseTense[k] = res._tense[k]; }
				});
				res._baseTenses = Object.keys(res._baseTense);
				return res;
			}
		},
		// sort out multiple words
		{ // 1
			id: 'multiples',
			folder: 'lexicon',
			description: 'known "multiples" (words with more than one)\ne. g. "New York"',
			// build
			zip: function(lang, isZip) {
				__.newRes(isZip);
				var res = {};
				allPossibles.forEach(function(o) {
					var v = __.val(o);
					if (v.indexOf(' ') > -1) {
						var s = (isZip) ? _.repl(v, 0, ['at', ' ', 'united', 'new', 'in ']) : v;
						res[s] = o.tag;
					}
				});
				return res;
			},
			make: 0,
			unzip: "_.repl(exports.zip, ['at', ' ', 'united', 'new', 'in ']);"
		},

		// NOUN
		{ // 2 irregulars (plural), uncountables
			id: 'inflect',
			folder: 'nouns',
			description: ['singular nouns having irregular plurals\n',
										'and uncountable nouns\n',
										'{{.irregulars}} irregular singular/plural nouns (NN, PRP, PP),\n',
										'{{.uncountables}} uncountable nouns (NN, PRP, PP)'].join(''),
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
					a[0].filter(__.possibleOrig).forEach(function(o) {
						var singular = __.val(o);
						a[((a[1]) ? 1 : 0)].filter(__.possibleRef).forEach(function(op) {
							if (__.isRef(op, o)) {
								var plural = __.val(op);	
								var nA = (isZip) ? _.replBase([singular, plural], 0, ['es']) : [singular, plural];
								res[Object.keys(res)[i]].push(nA);
								_irregulars.push(nA);
							}
						});
					});
				});
				res.uc = dict.NN.words.filter(__.meta, {key: 'uncountable', isZip: isZip}).map(__.val);
				return res; // Note: the returned value becomes always variable 'exports.zip' in the module ...
			},
			// expand
			unzip: function() {
				//::BROWSER::
				var repl = function(a) { return _.replBase(a, ['es']); }
				exports.zip.NN = exports.zip.NN.map(repl);
				exports.zip.PRP = exports.zip.PRP.map(repl);
				exports.zip.PP = exports.zip.PP.map(repl);
				//::
				exports.zip.irregulars = exports.zip.NN.concat(exports.zip.PRP, exports.zip.PP);
				exports.zip.uncountables = exports.zip.uc.reduce(_.toObj, {});
				return exports.zip;
			}
		},

		{ // 3 other
			id: 'index',
			folder: 'nouns',
			description: ['singular nouns having irregular plurals\n',
										'and uncountable nouns\n',
										'{{.refs}} PRPs that can be a reference (e.g. "she"),\n',
										'{{.prps}} all PRP "nouns",',
										'{{.pps}} all PP "nouns",',
										'{{.entityBlacklist}},', // TODO doc
										'{{.personBlacklist}}'].join(''),
			// build
			zip: function(lang, isZip) {
				// TODO: 'it', 'one'
				var _all = dict.NN.words.concat(dict.PP.words, dict.DT.words, dict.NNAB.words, dict.CC.words).filter(__.possible);
				var _refs = [];
				var _prps = dict.PRP.words.map(function(o, i) {
					if(__.meta(o, {key: 'referable', isZip: isZip})) { _refs.push(i); }
					return __.val(o);
				});
				var _prpRefs = dict.PRP.words.filter(__.meta, {key: 'parent', noLang: 1}).map(function(o) {
					return [_prps.indexOf(__.val(o)), o.meta.parent];
				});
				var _pps = dict.PP.words.filter(__.meta, {key: 'parent', noLang: 1}).map(function(o) {
					return [__.val(o), o.meta.parent];
				});
				var _black = function(type) {
					var b = _all.filter(__.meta, {key: type+'Blacklist', isZip: isZip}).map(__.val);
					b.push('&');
					return b;
				}
				return {
					refs: _refs,
					prps: _prps,
					pps: _pps,
					prpRefs: _prpRefs,
					entityBlacklist: _black('entity'),
					personBlacklist: _black('person')
				};
			},
			// expand
			unzip: function () {
				var _ppRefs = {};
				exports.zip.pps.forEach(function(a) { _ppRefs[a[0]] = exports.zip.prps[a[1]]; });
				exports.zip.prpRefs.forEach(function(a) { _ppRefs[exports.zip.prps[a[0]]] = exports.zip.prps[a[1]]; });
				return {
					refs: exports.zip.refs.map(function(i) { return exports.zip.prps[i]; }),
					prps: exports.zip.prps.reduce(_.toObj, {}),
					pps: exports.zip.pps.reduce(_.toObj, {}),
					ppRefs: _ppRefs,
					entityBlacklist: exports.zip.entityBlacklist.reduce(_.toObj, {}),
					personBlacklist: exports.zip.personBlacklist,
				}
			}
		},


		// VERB :
		{ // 4 verbs - CP, MD, negate
			id: 'special',
			folder: 'verbs',
			description: ['special verbs\n',
										'{{.CP}} CP verbs,\n',
										'{{.MD}} MD verbs,\n',
										'{{.negate}} '].join(''),
			description: '',
			// compress
			zip: function(lang, isZip) {
				// TODO: 'it', 'one'
				var res = {CP:[], MD:[]};
				['CP', 'MD'].forEach(function(type) {
					dict[type].words.filter(__.possibleAndMulti).forEach(function(o) {
						var hasRef = 0;
						var pos = __.val(o);
						dict[type].words.filter(__.possibleRef).forEach(function(ov) {
							if (__.isRef(ov, o)) {
								hasRef = 1;
								var neg = __.val(ov);
								res[type].push((isZip) ? _.replBase([pos, neg], 0, ["'t"]) : [pos, neg]);
							}
						});
						if (hasRef < 1 && !(o.hasOwnProperty('ref')) && !(o.hasOwnProperty('uid'))) {
							neg = pos+' not';
							res[type].push([pos, neg]);
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
						a = _.replBase(a, ["'t"]);
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

		{ // 5 verbs conjugate - irregulars, noDoers, irregularDoers
			id: 'conjugate',
			folder: 'verbs',
			description: ['{{.irregulars}} irregular conjuagated verbs,\n',
										'{{.noDoers}} verbs without doers,\n',
										'{{.irregularDoers}} with irregular doers\n',
										'types: [infinitive, gerund, past, present, doer, future]'].join(''),
			prefix: "var types = ['infinitive','gerund','past','present','doer','future'];",
			// compress
			zip: function(lang, isZip) {
				var types = {
				/*VBP: 'infinitive',*/
					VBG: 'gerund',
					VBD: 'past',
					VBZ: 'present',
					NNA: 'doer'
				};
				var _irregulars = __.newRes(isZip);
				_irregulars = [
					[ 'be', 'being', 'was', 'is', 0 ]
				]; // TODO - FIXME : 'be' is listed twice in _irregulars, this one should be first ! FIXME goes to dictionary
				var _noDoers = {};
				//var irregularFlags = [];
				dict.VBP.words.filter(__.possibleOrig).forEach(function(o) {
					var inf = __.val(o);
					var cs = [inf];
					for (var type in types) {
						var conjugated = 0;
						dict[type].words.filter(__.possibleRef).forEach(function(oc) {
							if (__.isRef(oc, o)) {
								conjugated = __.val(oc);
							}
							__.did(inf, isZip);
						});
						cs.push( (conjugated) ? conjugated : 0 );
					}
					// check noDoer
					if (!cs[4] && (!o.hasOwnProperty('meta') || !o.meta.noDoer || o.meta.noDoer.indexOf(lang) < 0)) {
						cs.pop();
					}
					
					var conjugateds = (isZip) ? _.replBase(cs, 0, ['ing', 'er', 've']) : cs;
					_irregulars.push(conjugateds);
				});

				dict.VBP.words.filter(__.meta, {key: 'noDoer', isZip: isZip}).forEach(function(o) {
					_noDoers[__.val(o)] = 1;
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
					var obj = {};
					var r = function(s) {return s;}
					//::BROWSER::
					a = _.replBase(a, ['ing', 'er', 've']);
					//::
					a.forEach(function(s, i) {
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

		{ // 6
			id: 'index',
			folder: 'verbs',
			description: 'some other known verbs for conjugating',
			// build
			zip: function(lang, isZip) {
				var regular = __.rest('VBP', isZip).map(__.val).concat(dict.VB.words.filter(__.possible).map(__.val));
				return (isZip) ? _.repl(JSON.stringify(regular), 0, ['re', 'er', 'co', 'es', '","']) : regular;
			},
			make: 0,
			unzip: 'JSON.parse(_.repl(exports.zip, [\'re\', \'er\', \'co\', \'es\', \'","\']));'
		},


		// ADJECTIVE
		//
		{ // 7
			id: 'decline',
			folder: 'adjectives',
			description: ['{{.convertables}} regulars,\n',
										'{{.adverb.to}} to adverbs,\n',
										'{{.adverb.no}} having no adverb\n',
										'{{.comparative.to}} \n',
										'{{.superlative.to}} \n',
										'{{.noun.to}} \n',
										'types: [adjective, adverb, comparative, superlative, noun];\n',
										"0 means 'return null' for adverbs OR 'conjugate without more/most' for comparative and superlative.\n",
										"1 means 'default behavior'"].join(''),
			// compress
			zip: function(lang, isZip) {
				var repJJ = function(s) { return ((typeof s === 'string') ? _.repl(s, 0, ['ight', 'ing', 'ent', 'er', 're', 'al', 'ed', 'ly', 'some']) : s); }
				var types = {
					/*JJ: 'adjective',*/
					RB: 'adverb',
					JJR: 'comparative',
					JJS: 'superlative',
					NN: 'noun'
				};
				var irregulars = __.newRes(isZip);
				//var irregularFlags = [];
				dict.JJ.words.filter(__.possibleOrig).forEach(function(o) {
					var v = __.val(o);
					var declineds = (isZip) ? [repJJ(v)] : [v];
					for (var type in types) {
						var declined = 1;
						if (type === 'RB' && __.meta(o, {key: 'noAdverb', isZip: isZip})) {
							declined = 0;
						}
						if ((type === 'JJR' || type === 'JJS')) { // TODO
							if (__.meta(o, {key: 'noComparative', isZip: isZip})) {
								declined = -1;
							} else if (!o.hasOwnProperty('meta') || !o.meta.convertable) {
								declined = 0;
							}
						}
						if (declined > 0 || !o.hasOwnProperty('meta') || !o.meta.convertable) {
							dict[type].words.filter(__.possibleRef).forEach(function(oa) {
								if (__.isRef(oa, o)) {
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
				var r = __.getRes(isZip);
				var a = r[r.length-1];
				a.push(irregulars.map(function(declinedArr) { return declinedArr[0]; }));
				dict.JJ.words.filter(__.meta, {key: 'convertable', isZip: isZip}).forEach(function(o) {
					var v = __.val(o);
					if (!__.handled(v, isZip)) {
						irregulars.push((isZip) ? repJJ(v) : v);
						__.did(v, isZip);
					}
				});
				/* TODO flags for all conjugated :  'I'.concat(flag(o.meta))) */
				return irregulars;
			},
			// node.js
			make: function() {
				var res = { convertables: [], adverb: {to: {}, no:[]}, comparative: {to: {}}, superlative: {to: {}}, noun: {to: {}} };
				
				exports.zip.forEach(function(_a) {
					if (typeof _a === 'string') {
						res.convertables.push(_a);
					} else {
						var a = _a.map(function(w){ return w; });
						if (a.length > 1) {
							if (a[1] === 0) { res.adverb.no.push(a[0]); }
							if (typeof a[1] === 'string') { res.adverb.to[a[0]] = a[1]; }
						}
						if (a[2] && a[2] === 1) {
							res.convertables.push(a[0]);
						} else if (a.length>2) {
							res.comparative.to[a[0]] = a[2];
						}
						if (a.length>3 && a[3]!=1) {
							res.superlative.to[a[0]] = a[3];
						}
						if (a.length>4 && a[4]!=1) {
							res.noun.to[a[0]] = a[4];
						}
					}
				});
				res.convertables = res.convertables.reduce(_.toObj, {});
				res.adverb.no = res.adverb.no.reduce(_.toObj, {});
				return res;
			},
			// browser - expand
			unzip: function() {
				var repJJ = function(s) { return (typeof s !== 'string') ? s : _.repl(s, ['ight', 'ing', 'ent', 'er', 're', 'al', 'ed', 'ly', 'some']); }
				var res = { convertables: [], adverb: {to: {}, no:[]}, comparative: {to: {}}, superlative: {to: {}}, noun: {to: {}} };
				var expand = function (s, b) { return (s === 0) ? 0 : s.replace('=', b); }
				exports.zip.forEach(function(_a) {
					if (typeof _a === 'string') {
						res.convertables.push(repJJ(_a));
					} else {
						var a = _a.map(function(w){ return repJJ(w); });
						if (a.length > 1) {
							if (a[1] === 0) { res.adverb.no.push(a[0]); }
							if (typeof a[1] === 'string') { res.adverb.to[a[0]] = expand(a[1], a[0]); }
						}
						if (a[2] && a[2] === 1) {
							res.convertables.push(a[0])
						} else if (a.length>2) {
							res.comparative.to[a[0]] = expand(a[2], a[0])
						}
						if (a.length>3 && a[3]!=1) {
							res.superlative.to[a[0]] = expand(a[3], a[0])
						}
						if (a.length>4 && a[4]!=1) {
							res.noun.to[a[0]] = expand(a[4], a[0])
						}
					}
				});
				res.convertables = res.convertables.reduce(_.toObj, {});
				res.adverb.no = res.adverb.no.reduce(_.toObj, {});
				return res;
			}
		},

		{ // 8
			id: 'demonym',
			folder: 'adjectives',
			description: 'adjective demonyms, e.g. "australian"',
			// compress
			zip: function(lang, isZip) {
				var demonyms = [];
				dict.JJ.words.filter(__.meta, {key: 'demonym', isZip: isZip}).forEach(function(o) {
					demonyms.push((isZip) ? _.repl(o[lang], 0, ['can', 'dan', 'ean', 'ian', 'ese', 'an', 'austr', 'ish']) : o[lang]);
					__.did(o[lang], isZip);
				});
				return demonyms;
			},
			make: 0,
			// expand
			unzip: {
				array: 'zip',
				fn: function(w) {
					return _.repl(w, ['can', 'dan', 'ean', 'ian', 'ese', 'an', 'austr', 'ish']);
				}
			}
		},

		{ // 9
			id: 'index',
			folder: 'adjectives',
			description: 'some other adjectives',
			// build
			zip: function(lang, isZip) {
				var a = __.rest('JJ', isZip).map(__.val);
				if (!isZip) return a;
				return _.repl(JSON.stringify(a), 0, ['ight', 'ing', 'ant', 'ent', 're', 'er', 'al', 'ed', 'ly', 'en', 'es', 'ate', '","']);
			},
			make: 0,
			// expand
			unzip: 'JSON.parse(_.repl(exports.zip, [\'ight\', \'ing\', \'ant\', \'ent\', \'re\', \'er\', \'al\', \'ed\', \'ly\', \'en\', \'es\', \'ate\', \'","\']));'
		},


		// ADVERB
		{ // 10
			id: 'decline',
			folder: 'adverbs',
			description: 'adverbs to adjectives',

			// build
			zip: function(lang, isZip) {
				var irregulars = __.newRes(isZip);
				dict.RB.words.filter(__.possibleOrig).forEach(function(o) {
					var adj = '';
					dict.JJ.words.filter(__.possibleRef).forEach(function(oj) {
						if (__.isRef(oj, o)) adj = __.did(oj[lang], isZip);
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
		{ // 11
			id: 'numbers',
			folder: 'lexicon',
			description: 'for number recognition',
			// build
			zip: function(lang, isZip) {
				__.newRes(isZip);
				var nrs = {plus: __.val(dict.NU.plus), minus: __.val(dict.NU.minus), factors: __.val(dict.NU.factors), decimal: __.val(dict.NU.decimal)};
				['ones', 'teens', 'tens', 'multiple'].forEach(function(_var) {
					var cat = dict.NU[_var];
					nrs[_var] = {};
					for (var i in cat) {
						if (cat[i].hasOwnProperty(lang)) {
							var words = (cat[i][lang] instanceof Array) ? cat[i][lang] : [cat[i][lang]];
							words.forEach(function(w) {
								nrs[_var][__.did(w, isZip)] = (_var === 'multiple') ? Math.pow(10, parseInt(i)) : parseInt(i);
							});
						}
					}
				});
				return nrs;
			}
		},

		{ // 12
			id: 'dates',
			folder: 'lexicon',
			description: 'for date extraction',
			// build
			zip: function(lang, isZip) {
				var dates = {months: {}, monthsAbbrevs: {}, days: {}, daysAbbrevs: {}};
				['days', 'months'].forEach(function(c, n) {
					dict.DA[c].forEach(function(o, i) {
						var a = (o[lang] instanceof Array) ? o[lang] : [o[lang]];
						a.forEach(function(w, j) {
							cat = (j>0) ? [c,'Abbrevs'].join('') : c;
							dates[cat][w] = i+n;
						});
					});
				});
				return dates;
			},
			// expand
			unzip: function() {
				var res = exports.zip;
				['months', 'days'].forEach(function(c, n) {
					var ca = [c,'Abbrevs'].join('');
					if (res[ca]) {
						for (var w in res[ca]) { res[c][w] = exports.zip[ca][w]; }
					}
				});
				res.dayS = '\\b('.concat(Object.keys(res.days).join('|'), ')');
				res.monthS = '('.concat(Object.keys(res.months).join('|'), ')');
				return res;
			}
		},

		{ // 13
			id: 'honorifics',
			folder: 'lexicon',
			description: '',
			// build
			zip: function(lang, isZip) {
				__.newRes(isZip);
				return __.did(dict.NNAB.words.filter(__.meta, {key: 'honour', isZip: isZip}).map(__.val), isZip);
			}
		},

		{ // 14
			id: 'abbreviations',
			folder: 'lexicon',
			description: '',
			// build
			zip: function(lang, isZip) {
				var nonHonorifics = __.rest('NNAB', isZip);
				return {
					nouns: nonHonorifics.filter(function(o) { return !__.meta(o, {key: 'nonNoun'}); }).map(__.val),
					nonNouns: nonHonorifics.filter(__.meta, {key: 'nonNoun', isZip: isZip}).map(__.val)
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

		{ // 15
			id: 'pos',
			folder: 'lexicon',
			
			description: ['data for Parts Of Speech tagging', // TODO DOC
										'{{.particles}} ,\n',
										'{{.contractions}} ,\n',
										'{{.ambiguousContractions}}\n'].join(''),
			// build
			zip: function(lang, isZip) {
				var res = { particles: [], cs: [], contractions: {}, ambiguousContractions: {} };
				res.particles = allPossibles.filter(__.meta, {key: 'particle', isZip: isZip}).map(__.val);
				if (dict.contractions.hasOwnProperty(lang)) {
					res.cs = dict.contractions[lang];
					var cs = res.cs.map(function(w){ 
						return w.replace('|', ''); 
					});
					var csAs = res.cs.map(function(w){ 
						var a = w.split('|'); return ((a[1]) ? '\''.concat(a[1]) : a[0]);
					});
					allPossibles.filter(__.meta, {key: 'contractions'}).forEach(function(o){
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

		{ // 16
			id: 'negate',
			folder: 'lexicon',
			description: 'the complete negate data',
			// build
			zip: function(lang, isZip) {
				return __.val(dict.negate, {});
			},
			prefix: "var verbs_special = require('../verbs/special');\n",
			// convert it to an easier format
			unzip: function() {
				var negate = verbs_special.negate || {};
				for (var k in exports.zip) { negate[k] = exports.zip[k]; }
				for (var k in negate) { negate[negate[k]] = k; }
				return negate;
			}
		},

		{ // 17
			id: 'firstnames',
			folder: 'lexicon',
			description: 'first name recognition',
			// build
			zip: function(lang, isZip) {
				var replN = function(w) { 
					return _.repl(w, 0, ['ie', 'na', 'la', 'ri', 'ne', 'ra', 'el', 'in', 'an', 'le', 'en', 'ia']);
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
					return _.repl(w, ['ie', 'na', 'la', 'ri', 'ne', 'ra', 'el', 'in', 'an', 'le', 'en', 'ia']) 
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
		
		{ // 18
			id: 'phrasalVerbs',
			folder: 'lexicon',
			description: ['phrasal verbs',
										'{{.verbs}} base verbs,',
										'{{.symmetric}} behaviour (references),',
										'{{.asymmetric}} behaviour (references)'].join('\n'),
			prefix: ["var schema = require('../schema');",
							"var opposite = require('./negate');",
							"var verbs = require('../verbs');",
							"var conjugated = require('../verbs/conjugate');"].join('\n'),
			// build
			zip: function(lang, isZip) {
				var res = {
					verbs: dict.phrasalVerbs.words.filter(__.possible).map(__.val), 
					symmetric: {}, 
					asymmetric: {} 
				}
				
				var VBPs = require('./'+lang+'/verbs/conjugate').irregulars.map(function(o){
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
				dict.VBP.words.filter(__.meta, {key: 'phrasal', handled: 1, isZip: isZip}).forEach(toRes);
				dict.phrasalVerbs.words.forEach(toRes);
				res.verbs = res.verbs.join(',');
				res.symmetric = JSON.stringify(res.symmetric);
				res.asymmetric = JSON.stringify(res.asymmetric);
				return res;
			},
			unzip: function () {
				var res = {};
				var allVerbs = conjugated.irregulars.map(function(o){
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

		{ // 19
			id: 'normalisations',
			folder: 'rules',
			description: 'approximate visual (not semantic) relationship between unicode and ascii characters',
			// compress
			zip: function(lang, isZip) {
				var res = {};
				rule.normalisations.forEach(function(a){
					if(!res.hasOwnProperty(a[1])) res[a[1]] = '';
					res[a[1]] = res[a[1]].concat(a[0]);
				});
				return __.did(res, isZip);
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

		{ // 20
			id: 'wordnet',
			folder: 'rules',
			description: 'wordnet generated suffixes',
			// build
			zip: function(lang, isZip) {
				if (!rule.unambiguousSuffixes.hasOwnProperty(lang)) { return; }
				var s = [ 'ed', 'er', 'le', 'es', 'ns', 'ant', 'nt', 'ise', 'ite', 'ive', 'ize', 'ish', 'ade', 'ate', 'ose', 'eed', 'end', 'est', 'use', '","' ];
				return (isZip) ? _.repl(JSON.stringify(rule.unambiguousSuffixes[lang]), 0, s) : rule.unambiguousSuffixes[lang];
			},
			// convert it to an easier format
			unzip: function() {
				//::BROWSER::
				exports.zip = JSON.parse(_.repl(exports.zip, [ 'ed', 'er', 'le', 'es', 'ns', 'ant', 'nt', 'ise', 'ite', 'ive', 'ize', 'ish', 'ade', 'ate', 'ose', 'eed', 'end', 'est', 'use', '","' ]));
				//::
				return _.toObjValues(exports.zip);
			}
		},
		
		{ // 21
			id: 'pos',
			folder: 'rules',
			description: 'rules for Parts Of Speech tagging',
			// build
			zip: function(lang, isZip) {
				var o = {
					replacing: {},
					words: __.val(rule.pos.words, {}),
					strongDeterminers: __.val(rule.pos.strongDeterminers, {}),
					ambiguousContractions: __.val(rule.pos.ambiguousContractions, {}),
					set: __.val(rule.pos.set, {}),
					merge: __.val(rule.pos.merge, {}),
					special: __.val(rule.pos.special, {}),
				};
				for (var id in rule.pos.replacing) {
					if (rule.pos.replacing[id].hasOwnProperty(lang)) {
						o.replacing[id] = rule.pos.replacing[id][lang];
					}
				}
				return o;
			},
			// convert word rules to an easier format
			unzip: function() {
				var a = [];
				for (var k in exports.zip.words) {
					a = a.concat(exports.zip.words[k].map(function(r){ return [r,k]; }));
				}
				exports.zip.words = _.toObjDeep(a, ['matches', 'tag']);
				exports.zip.wordsMatch = _.tokenFn(exports.zip, 'words', 1);
				exports.zip.lexiReplace = _.tokenFn(exports.zip, 'replacing');
				exports.zip.set = _.tokenFn(exports.zip, 'set');
				exports.zip.special = _.tokenFn(exports.zip, 'special');
				return exports.zip;
			}
		},
		
		{ // 22
			id: 'sentence',
			folder: 'rules',
			description: 'rules for sentences\n(currently only .negate)',
			// build
			zip: function(lang, isZip) {
				return {
					negate: __.val(rule.sentence.negate, {})
				};
			}
		},
		
		{ // 23
			id: 'verb',
			folder: 'rules',
			description: 'regex rules and suffixes for verb conjugation\nused in combination with the generic "fallback" method',
			// build
			zip: function(lang, isZip) {
				if (!rule.verbs.conjugate.hasOwnProperty(lang)) { return; }
				var rs = rule.verbs.conjugate[lang];
				if(!isZip) {
					for (var cat in rs) {
						rs[cat] = rs[cat].map(function(o){
							for (var key in o) { 
								if (typeof o[key] != 'string') { o[key] = 0; } 
							}
							return [o.regex, o.infinitive, o.present, o.gerund, o.past, o.doer].map(function(w){ return (typeof w === 'undefined') ? 0 : w; });
						});
					}
				}
				var o = { 
					conjugate: (isZip) ? _.repl(JSON.stringify(rs), 0, ['\\$1e', '\\$1s', '\\$1es', '\\$1ed', '\\$1ing', 'ing']) : rs,
					detect: __.val(rule.verbs.detectFallbacks, {}),
					unPrefix: __.val(rule.verbs.unPrefix, {}),
					fallback: __.val(rule.verbs.fallback, {}),
					fulfill: __.val(rule.verbs.fulfill, {}),
					doer: __.val(rule.verbs.doer, {}),
					tenseReplace: {},
					suffixes: {}
				};
				for (var id in rule.verbs.tenseReplace) {
					if (rule.verbs.tenseReplace[id].hasOwnProperty(lang)) {
						o.tenseReplace[id] = rule.verbs.tenseReplace[id][lang];
					}
				}
				if (!rule.verbs.suffixes.hasOwnProperty(lang)) { return o; }
				var s = [ 'ed', 'er', 'le', 'es', 'ns', 'ant', 'nt', 'ise', 'ite', 'ive', 'ize', 'ish', 'ade', 'ate', 'ose', 'eed', 'end', 'est', 'use', '","' ];
				o.suffixes = (isZip) ? _.repl(JSON.stringify(__.val(rule.verbs.suffixes)), 0, s) : __.val(rule.verbs.suffixes);				
				return o;
			},
			// convert it to an easier format
			unzip: function() {
				//::BROWSER::
				exports.zip.conjugate= JSON.parse(_.repl(exports.zip.conjugate, ['$1e', '$1s', '$1es', '$1ed', '$1ing', 'ing']));
				exports.zip.suffixes = JSON.parse(_.repl(
					exports.zip.suffixes, 
					[ 'ed', 'er', 'le', 'es', 'ns', 'ant', 'nt', 'ise', 'ite', 'ive', 'ize', 'ish', 'ade', 'ate', 'ose', 'eed', 'end', 'est', 'use', '","' ]
				));
				//::
				exports.zip.detect = _.toObjDeep(exports.zip.detect, ['matches', 'returns']);
				exports.zip.detect = _.tokenFn(exports.zip, 'detect', 1);
				exports.zip.doer = _.toObjDeep(exports.zip.doer, ['matches', 'replacer']);
				exports.zip.doerReplace = _.tokenFn(exports.zip, 'doer');
				exports.zip.tenseReplace = _.tokenFn(exports.zip, 'tenseReplace');
				exports.zip.suffixes = _.toObjValues(exports.zip.suffixes);
				for (var cat in exports.zip.conjugate) {
					exports.zip.conjugate[cat] = exports.zip.conjugate[cat].map(function(a){
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
		
		{ // 24
			id: 'noun',
			folder: 'rules',
			description: 'regex rules and suffixes for nouns (inflect and indefinite article)',
			// build
			zip: function(lang, isZip) {
				return {
					which: __.val(rule.nouns.which, {}),
					gender: {
						to: __.val(rule.nouns.gender, {}),
						names: __.val(rule.nouns.genderNames, {}),
						female: __.val(rule.nouns.genderFallback.female, ''),
						male: __.val(rule.nouns.genderFallback.male, ''),
						fallback: __.val(rule.nouns.genderFallback.gender, ''),
						fallbackPlural: __.val(rule.nouns.genderFallback.plural, ''),
						fallbackNames: __.val(rule.nouns.genderFallback.names, '')
					},
					prepositionPhrase: __.val(rule.nouns.prepositionPhrase, ''),
					article: {
						fallback: __.val(rule.nouns.articles.fallback, ''),
						plural: __.val(rule.nouns.articles.plural, ''),
						irregular: __.val(rule.nouns.articles.irregulars, {}),
						regex: __.val(rule.nouns.articles.regexes, {}),
						fn: __.val(rule.nouns.articles.fn, function(){})
					},
					isPlural: {
						fallback: __.val(rule.nouns.isPluralFallback, function(){})
					},
					plural: {
						pronoun: __.val(rule.nouns.pluralPronoun, ''),
						to: __.val(rule.nouns.pluralize, []),
						indicators: __.val(rule.nouns.pluralIndicators, [])
					},
					singular: {
						to: __.val(rule.nouns.singularize, []),
						indicators: __.val(rule.nouns.singularIndicators, [])	
					}
				}
			},
			// convert it to functions
			unzip: function() {
				var m = 'matches', r = 'replacer', rt = 'returns';
				[['plural', 'to', [m, r]], ['plural', 'indicators', [m]], 
				 ['singular','to', [m, r]], ['singular','indicators', [m]],
				 ['gender','to', [m, rt]], ['gender','names', [m, rt]], ['which', [m, rt]]].forEach(function(a){
					var objKeys = a.pop();
					if (a[1]) { exports.zip[a[0]][a[1]] = _.toObjDeep(exports.zip[a[0]][a[1]], objKeys); }
					_.setObjKey(a, _.tokenFn(exports.zip, a, 1), exports.zip);
				});
				exports.zip.preposition = {
					phrase: new RegExp(exports.zip.prepositionPhrase),
					first: new RegExp('^'+exports.zip.prepositionPhrase)
				};
				return exports.zip;
			}
		},
		
		{ // 25
			id: 'adjective',
			folder: 'rules',
			description: 'regex rules and transforms for adjectives',
			// build
			zip: function(lang, isZip) {
				return {
					which: __.val(rule.adjectives.which, {}),
					adverb: {
						to: __.val(rule.adjectives.adverb.to, {}),
						no: __.val(rule.adjectives.adverb.no, {}),
						fallback: __.val(rule.adjectives.adverb.fallback, {})
					},
					comparative: {
						to: __.val(rule.adjectives.comparative.to, {}),
						no: __.val(rule.adjectives.comparative.no, {}),
						fn: __.val(rule.adjectives.comparative.fn, {}),
						regular: __.val(rule.adjectives.comparative.regular, {}),
						fallback: __.val(rule.adjectives.comparative.fallback, {})
					},
					superlative: {
						to: __.val(rule.adjectives.superlative.to, {}),
						no: __.val(rule.adjectives.superlative.no, {}),
						fn: __.val(rule.adjectives.superlative.fn, {}),
						regular: __.val(rule.adjectives.superlative.regular, {}),
						fallback: __.val(rule.adjectives.superlative.fallback, {})
					},
					noun: {
						to: __.val(rule.adjectives.noun.to, {}),
						no: __.val(rule.adjectives.noun.no, {}),
						fallback: __.val(rule.adjectives.noun.fallback, {})
					}
				}
			},
			unzip: function() {
				var m = 'matches', r = 'replacer', rt = 'returns';
				[['adverb', 'to', [m, r]], ['adverb', 'no', [m]], 
				 ['comparative','to',[m, r]], ['comparative','no',[m]], ['comparative','regular',[m]],
				 ['superlative','to',[m, r]], ['superlative','no',[m]],  ['superlative','regular',[m]], 
				 ['noun','to',[m, r]], ['noun','no',[m]],
				 ['which', [m, rt]]].forEach(function(a){
					var objKeys = a.pop();
					if (a[1]) { exports.zip[a[0]][a[1]] = _.toObjDeep(exports.zip[a[0]][a[1]], objKeys); }
					_.setObjKey(a, _.tokenFn(exports.zip, a, 1), exports.zip);
				});
				return exports.zip;
			}
		},
		
		{ // 26
			id: 'adverb',
			folder: 'rules',
			description: 'regex rules and transforms for adverbs',
			zip: function(lang, isZip) {
				return {
					which: __.val(rule.adverbs.which, {}),
					adjective: {
						to: __.val(rule.adverbs.adjective.to, {})
					}
				}
			},
			unzip: function() {
				var m = 'matches';
				[['adjective', 'to', [m, 'replacer']], ['which', [m, 'returns']]].forEach(function(a){
					var objKeys = a.pop();
					if (a[1]) { exports.zip[a[0]][a[1]] = _.toObjDeep(exports.zip[a[0]][a[1]], objKeys); }
					_.setObjKey(a, _.tokenFn(exports.zip, a, 1), exports.zip);
				});
				return exports.zip;
			}
		},
		/*
	split: {
			multiple: {en: ['and', 'or']},
			eventStart: {en: ['between', 'from']},
			eventEnd: {en: ['and', 'to']}
	},
	day: {
		suffix: {en: '(?:st|nd|rd|th)?(?:,\\s|\\sof\\s|$|\\s)'}
	},
	year:{
		suffix: { // TODO? - could be arrays - but check if it would be to unflexible for i18n
			bc: {en: ' before| vor| v.'},
			ad: {en: ' anno| nach| n.'}
		}
	}
		*/
		{ // 27
			id: 'number',
			folder: 'rules',
			description: 'regexes and functions for numbr parsing',
			// build
			zip: function(lang, isZip) {
				return {
					negative: __.val(rule.numbers.negative),
					factors: __.val(rule.numbers.factors),
					ordinals:	__.val(rule.numbers.ordinals)
				}	
			}
		},
		{ // 28
			id: 'date',
			folder: 'rules',
			description: 'regexes and functions for dates parsing',
			prefix: "var data = require('../lexicon/dates');",
			// build
			zip: function(lang, isZip) {
				var _d = 'day', _m = 'month', _y = 'year';
				var d = {nr: '(3[0-1]|[12][0-9]|0?[1-9])'}; 
				d.nrs = [d.nr,__.val(rule.dates.day.suffix)].join('');
				var m = {nr: '([1-9]|0[1-9]|1[0-2])'};
				var y = {
					nr: '(?:([0-9]{1,4})+)', 
					n:'(?:\\b| )[b]\\s?(?:.?)\\s?[c]\\s?(?:.?)\\s?[e]?\\s?(?:.?)', 
					p:'(?:\\b| )[a|c]\\s?(?:.?)\\s?[d|e]\\s?(?:.?)'
				};
				var rd = {	
					gregorian: {
						_1000: __.val(rule.dates.gregorian._1000, {}),
						_100: __.val(rule.dates.gregorian._100, {}),
						_10: __.val(rule.dates.gregorian._10, {}),
						_1: __.val(rule.dates.gregorian._1, {}),
						_m: __.val(rule.dates.gregorian._m, {}),
						_d: __.val(rule.dates.gregorian._d, {}),
						_h: __.val(rule.dates.gregorian._h, {}),
						_min: __.val(rule.dates.gregorian._min, {})
					},
					relative: {
						tmr: __.val(rule.dates.relative.tmr, {}),
						yda: __.val(rule.dates.relative.yda, {}),
						tni: __.val(rule.dates.relative.tni, {}),
						//links: __.val(rule.dates.relative.links, {}),
						morn: __.val(rule.dates.relative.morn, {}),
						noon: __.val(rule.dates.relative.noon, {}),
						anoon: __.val(rule.dates.relative.anoon, {}),
						eve: __.val(rule.dates.relative.eve, {}),
						night: __.val(rule.dates.relative.night, {})
					},
					split: {
						multiple: __.val(rule.dates.split.multiple, {}),
						eventStart: __.val(rule.dates.split.eventStart, {}),
						eventEnd: __.val(rule.dates.split.eventEnd, {})
					},
					pos: {
						pre: __.val(dict.DA.relative.positive.prefix,[]).join(' |'),
						suf: __.val(dict.DA.relative.positive.suffix,[]).join(' |')
					},
					neg: {
						pre: __.val(dict.DA.relative.negative.prefix,[]).join(' |'),
						suf: __.val(dict.DA.relative.negative.suffix,[]).join(' |')
					},
					dl: __.val(dict.DA.relative.deadline,[]).join('|')
				};
				var _ymd = {pattern:[_y,_m,_d]}, _dmy = {pattern:[_d,_m,_y]}, _mdy = {pattern:[_m,_d,_y]};
				var S='(?:', E='?)', st='(?: |^)', st2='(?:\\b|^)', toY=')(?:(?:.*?)', sRel='([0-9]+)?\\s*';
				var s0 = '(?:\\-)', s1='\\s?(?:\\-|\\/)+\\s?', s2='\\s?(?:\\.|\\/)+\\s?', s3='(?: ?\\- ?)';
				var eM = rd.split.multiple.join('(?= ) |'), eS = rd.split.eventStart.join('|');
				var eE = rd.split.eventEnd.filter(function(w){ if (rd.split.multiple.indexOf(w) < 0) return true; }).join('|');
				var m_s_y = {matches:_.r([m.w,' ',y.nr],0,'i'), parameters: {pattern:[_m,_y]}};
				var yOnly = {matches:_.r([st,y.nr],0,'i'), parameters: {pattern:[_y]}};
				//: 									4 HH    5 mm       6 ss        7 msec        8 Z 9 ±    	10 tzHH    11 tzmm
				var isoTime = '(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:\\.(\\d{3}))?)?(?:(Z)|([+\\-])(\\d{2})(?::(\\d{2}))?)?)?';	// TODO time
				var greg = ['(',_.values(rd.gregorian).join(')|('),')'].join('');
				var rels = ['(',_.values(rd.relative).join(')|('),')'].join('');
				var pnPrefix = ['(?:',rd.pos.pre,' )|(',rd.neg.pre,' )'].join('');
				var pnSuffix = ['(?:',rd.pos.suf,' )|(',rd.neg.suf,' )'].join('');
				var dl = ['(?:',st,'(?:',rd.dl,')\\s*(?:the\\s*)?(?:',pnPrefix,')',sRel,'(?:',greg,')\\s*(?=(?:\\W|$)))'].join('');
				var pn = ['(?:',st,pnPrefix,sRel,'(?:',greg,')\\s*)'].join('');
				var rel = ['(?:',st,rels,')?'].join('');
				return {
					range: _.r([st2,S,eS,')(.*)(?:\\s',eM,'\\s)(.*)|',st2,S,eS,')?(.*)(?:(?:\\s',eE,'\\s)|',s3,')(.+)'],0,'i'),
					multi: _.r([st,S,eM,'(?= ) )|(?: ?\\& ?)|(?: ?, ?)(?=\\d)'],0,'i'),
					iso: _.r([S,'(\\d{4}|[+\\-]\\d{6})',s0,m.nr,s0,d.nr,E,isoTime]),
					day: {
						suffix: __.val(rule.dates.day.suffix, {}),
						nr: new RegExp(d.nrs, 'i')
					},
					month: {
						nr: new RegExp(m.nr)
					},
					year: {
						nr: new RegExp(y.nr),
						neg: _.r([y.n,'\\s',y.nr,'|',y.nr,y.n,'|',__.val(rule.dates.year.suffix.bc, {})],0,'i'),
						pos: _.r([y.p,'\\s',y.nr,'|',y.nr,y.p,'|',__.val(rule.dates.year.suffix.ad, {})], 0,'i')
					},
					short: [ // 6/25 etc.
						{matches: _.r([S,m.nr,s1,d.nr,s1,y.nr,E]), parameters: _mdy},
						{matches: _.r([S,d.nr,s2,m.nr,s2,y.nr,E]), parameters: _dmy}	
					],
					dayFirst: [ // 25th of June etc.
						{matches: [S,st,S,S,d.nrs,')?)','{m.w}?(?:$| ?)',toY,y.nr,E], parameters:_dmy},				 
						0, yOnly
					],
					monthFirst: [ // June 25th etc.
						{matches: [S,st,'{m.w}(?:$| ))(?:',d.nrs,toY,y.nr,E], parameters:_mdy},
						0, yOnly
					],
					relative: [
						{matches: new RegExp(dl, 'i'), parameters: {fn:'gregorian', isRange:1}},
						{matches: new RegExp(pn, 'i'), parameters: {fn:'gregorian'}},
						{matches: new RegExp(rel,'i'), parameters: {fn:'dictionary'}}
					]
				};
			},
			unzip: function() {
				var _d = 'day', _m = 'month', _y = 'year';
				var w = {day: Object.keys(data.days).join('|'), month: ['(?:(',Object.keys(data.months).join('|'),'),?)'].join('')};
				var m_y = {matches:_.r([w.month,' ',exports.zip.year.nr],0,'i'), parameters: {pattern:[_m,_y]}};
				exports.zip.day.weekday = _.r(['(?:(',w.day,',?))'],0,'i'),
				exports.zip.month.w = _.r([w.month],0,'i');
				for (var k in w) {
					var a = exports.zip[k+'First'][0].matches.map(function(s){ return s.replace('{m.w}',w.month) });
					exports.zip[k+'First'][0].matches = _.r(a,0,'i');
					exports.zip[k+'First'][1] = m_y;
				}
				exports.zip.short.unshift({matches: exports.zip.iso, parameters: {pattern:[_y,_m,_d]}});
				return exports.zip;
			}
		}
		
	];
	
	// END of generators //


	// //////// //
	// LEXICON // 27
	// some string constants
	var C = {
		// TODO - this is a stub to make sure until anything is browserified we have a 'lang'
		// SHOULD be singleton language ::
		l: ["if (!lang) {var lang = '", lang, "';}\n"].join(''), // FIXME - merge local 'dev' fork
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
		mod: '\nmodule.exports = exports.zip;\n',
		doc1: '/**\n',
		doc2: ' */\n',
		docm: ' * @module ',
		doc: ' * '
	};
	function buildLexi(lang, isZip) {
		var data = {};
		var _lMain = {};
		var _lZip = {};
		var parents = require('../parents');
		
		// Now let's handle the module names
		// for data modules index and lexicon
		var _names = generators.map(function(g) {			 
			return {
				_var: [((g.folder && g.folder != 'lexicon') ? g.folder+'_' : ''), g.id].join('').replace('_index',''),
				_req: (g.folder) ? path.join(g.folder, g.id) : g.id
			}; 
		});
		
		// require data modules for use in build
		function reqModule(o) { data[o._var] = require(['./', path.join(lang, o._req)].join('')); }
		_names.forEach(reqModule);
		// TODO - rest of VBN should be in lexicon.js already - also for sl "// TODO adjectives_regular"
		var __VBN = dict.VBN.words.filter(function(o) { return (__.possible(o) && o.hasOwnProperty('ref')); }).map(__.val);
		
		// write the data modules INDEX for build, lexicon and as survey
		var names = [];
		var exports = [];
		_names.forEach(function(o){
			if (o._var.indexOf('rules_') === 0) {
				// TODO - we could write a separate index for /rules/ - STUB not needed yet
			} else {
				names.push( C._var, o._var, C.req1, o._req, C.req2 );
				exports.push(C.tab, o._var, C.col, o._var, ',', C._);
			}
		});
		
		var exportStr = exports.join('').slice(0,-2);
		names.push(C._, C.mod0, C.exp0, exportStr, C.exp2);
		fs.writeFileSync(	path.join(MYPATH, lang, '/index.js'), '// data index\n' + names.join('')	);
		fs.writeFileSync(	path.join(MYPATH, lang, '/index.min.js'), names.join('').replace(/'\);/gm, ".min');") );
		
		// now require this index module and other needed modules in the LEXICON
		var reqs = [
			C.l, C._,
			"var data = require('../');", C._,
			"var parents = require('../../../parents');", C._,
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
				RB: Object.keys(data.adverbs_decline).concat(Object.keys(data.adjectives_decline.adverb.to).map(function(s) { 
					return data.adjectives_decline.adverb.to[s];
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
				JJR: Object.keys(data.adjectives_decline.comparative.to).map(function(s){ return data.adjectives_decline.comparative.to[s]; }),
				JJS: Object.keys(data.adjectives_decline.superlative.to).map(function(s){ return data.adjectives_decline.superlative.to[s]; }),
				JJ: data.adjectives_demonym.concat(
						Object.keys(data.adjectives_decline.adverb.no), Object.keys(data.adjectives_decline.adverb.to),
						Object.keys(data.adjectives_decline.comparative.to), Object.keys(data.adjectives_decline.superlative.to),
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
					exports.zip[key] = _.repl(exports.zip[key], ['selves', 'self', 'thing', 'what', 'how', 'ing', 'ally', 'ily', 'ly', 'ever', 'er', 'ed', 'es']);
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
					c = parents.verb(verb).conjugate();
					for (var tense in c) {
						if (tense != 'doer') {
							phrasal = c[tense] + ' ' + particle;
							main[phrasal] = data.schema.getTense(tense).tag;
						}
					}
				}
				// conjugate all verbs: (~8ms, triples the lexicon size)
				c = {};
				data.verbs.forEach(function(verb) {
					c = parents.verb(verb).conjugate();
					for (var tense in data.schema._tense) {
						if (c[tense] && !main[c[tense]]) { 
							main[c[tense]] = data.schema.getTense(tense).tag;
						}
					}
				});
				// decline all adjectives to their adverbs_ (~13ms)
				// 'to_adverb','to_superlative','to_comparative'
				// to_methods are slightly more performant than .conjugate because we skip to_noun yet ...
				data.adjectives.concat(Object.keys(data.adjectives_decline.convertables)).forEach(function(adjective) {
					if (!main.hasOwnProperty(adjective)) {
						main[adjective] = 'JJ';
						var adj = parents.adjective(adjective);
						var o = { adverb: 'RB', comparative: 'JJR', superlative: 'JJS' };
						for (var k in o) {
							var tag = o[k];
							o[k] = adj[['to_',k].join('')];
							if (o[k] && o[k] !== adjective && !main[o[k]]) {
								main[k] = main[k] || 'RB';
							}
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
		// end of lexicon
		
		var _did = lexicon(1);
		['EX', 'NN', 'NNS', 'CC', 'VBD', 'VBN', 'VBG', 'DT', 'IN', 'PP', 'UH', 'FW', 'RB', 'RBR', 'RBS'].forEach(function(cat) {
			_lMain[cat] = [];
			_lZip[cat] = [];
			if (dict.hasOwnProperty(cat) && dict[cat].hasOwnProperty('words')) {
				var dw = dict[cat].words.filter(__.possible);
				
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
				
				_lMain[cat] = dw.map(__.val).filter(possibleLexi);
				var repl = function(a) { return _.repl(a, 0, ['selves', 'self', 'thing', 'what', 'how', 'ing', 'ally', 'ily', 'ly', 'ever', 'er', 'ed', 'es']); }
				_lZip[cat] = _lMain[cat].map(repl);
			}
		});
		
		
		var lexiconStr = util.inspect(((isZip) ? _lZip : _lMain), {depth: null});
		var genStr = lexicon.toString().replace(/\bVBN:\s*__VBN\s*,\s*\n*/g,''); // TODO FIXME
		reqs.push(C._exp, lexiconStr, C.un1, genStr, C.un2);
		lexiconStr = reqs.join('');	
		_names.push('lexicon.js');
		
		// return the lexicon in all its glory ...
		return lexiconStr;
	}
	// end of buildLexi


	// //////////////////// //
	// MAIN BUILD FUNCTION //
	var i = 0;
	var _regex = /\b(_)[\[.]["']*[a-zA-Z_]+["'\]]*/g;
	
	function build(g, i) {
		// finish fast
		if (!g.hasOwnProperty('zip')) { return; }
		if (i === 1) { _ = require('../_'); }
		var hasMake = 0;
		function clean(s) {
			// TODO - better beautifying HERE // TODO the tab bug
			if (this.isZip) {
				return s.trim()/*.replace(/[ \t]+$/gm, '')*/;
			}		
			return s.replace(/^.*\/\/::BROWSER::[\s\S]*?.*[\s\S]*?\/\/::.*?$/gm, '').trim()/*.replace(/[ \t]+$/gm, '\t')*/;
		}
		var replO = {};
		function format(o, wasKey) {
			var str = '';
			for (var k in o) {
				var res = o[k];
				if (typeof res === 'function' && !(res instanceof RegExp)) {
					var rKey = ['REPLACE+_+', wasKey||'_', k].join('');
					replO[rKey] = res;
					o[k] = rKey;
				} else if (typeof res === 'object' && !(res instanceof RegExp)) {
					format(res, k);	
				}
			}
			str = util.inspect(o, { depth: null });
			for (var rk in replO) {
				str = str.replace(["'",rk,"'"].join(''), replO[rk].toString(-1));
			}
			return str;
		}
		function addUnzip(arr) {
			var mainArr = arr.map(clean,{isZip: 0});
			var zipArr = arr.map(clean, {isZip: 1});
			gens.zip = gens.zip.concat(zipArr);
			if (!hasMake) { 
				gens.main = gens.main.concat(mainArr); 
			}
		}
		
		// folder
		var fUp = (g.hasOwnProperty('folder')) ? '../' : '';
		var _require = ['var _ = require("../../', fUp, '_");\n'].join('');
		var folder = '';
		if (fUp === '../') {
			folder = g.folder+'/';
			// make subfolder in {{lang}}
			try { fs.mkdirSync(path.join(MYPATH, lang, folder)); } catch (e) {};
		}
		
		// meta
		var nl = [' <br>', C._, C.doc].join('');
		var meta = [C.doc, 'data module, autogenerated by grunt.', nl];
		var cm = (g.folder === 'rules') ? 'dictionaryRules' : ((g.id === 'firstnames') ? 'dictionaryNames':'dictionary');
		meta.push('change and contribute to ', cm, nl, nl);
		var modu = [C.docm, 'data/', lang, '/', folder, g.id, C._];
		if (typeof g.description === 'string' && g.description != '') {
			meta = meta.concat([g.description.replace(/\n/gm, nl), nl]);
		}
		meta.push(nl, '@readonly', C._);
		var jsDocs = [C.doc1, meta.join(''), modu.join(''), C.doc2];
		var gens = {
			main: [jsDocs.join(''), g.prefix||'', C._, C._l],
			zip: [g.prefix||'', C._, C._l]
		};
		
		// generate
		var generatedMain = g.zip(lang);
		var mainStr = format(generatedMain);
		gens.main.push(C._exp, mainStr, C._);
		
		var generatedZip = g.zip(lang, true);
		var zipStr = format(generatedZip);
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
		mainStr = gens.main.join('').trim();
		zipStr = gens.zip.join('').trim();
		// check if any needs the _ helper module
		if (mainStr.match(_regex)) {
			mainStr = [_require, C._, mainStr].join('');
		}
		if (zipStr.match(_regex)) {
			zipStr = [_require, C._, zipStr].join('');
		}
		// TODO - run through beautifier
		fs.writeFileSync( path.join(MYPATH, lang, folder, g.id.concat('.js')), mainStr);
		fs.writeFileSync( path.join(MYPATH, lang, folder, g.id.concat('.min.js')), zipStr);
		
		i++;
		var colors = ['',''];		
		if (i === generators.length) {
			colors = ['\u001b[32m', '\u001b[39m'];
			var lexiMain = [clean(buildLexi(lang))];
			var lexiZip = [clean(buildLexi(lang, true))];
			var lexiStd = [C._, C.mod0, 'main;', C._];
			fs.writeFileSync(	path.join(MYPATH, lang, '/lexicon/index.js'), lexiMain.concat(lexiStd).join(''));
			fs.writeFileSync(	path.join(MYPATH, lang, '/lexicon/index.min.js'), lexiZip.concat(lexiStd).join(''));
			console.log( 'wrote', colors[0], 'lexicon', colors[1], 'for language', '"'+lang+'"');
		}
		meta = (g.folder) ? [folder, g.id].join('') : g.id;
		console.log( 'wrote module for language', '"'+lang+'"', colors[0], i+' of '+generators.length, colors[1], ['(', meta, ')'].join('') );
		if (i === generators.length) { console.log( ' ' ); }
	}


	// Generate data part (lexica)
	generators.forEach(build);

}


function setMyPath(site){
	// automatically set data path from the callsite (see module.exports)
	// = "I can be used anywhere, also in grunt ..."
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
possibleLanguages = Object.keys(plObj);

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