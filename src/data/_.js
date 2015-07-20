/**
 * special util custom inspect fn (functions and regexes in obj)
 * makes util.inspect logging nested objects with functions and regexes
 * 
 * and build helpers
 * not used in the project itself, only used by ./_build
 *
 * @readonly
 * @module data/_
 */
var dict = require('./dictionary');
var lang = 'en';
var results = {main:[[]], zip:[[]]};

function setLang(l) {
	lang = l;
}
function getRes(isZip) {
	return (isZip) ? results.zip : results.main;
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
// some helpers (only for _build)
function newRes(isZip) {
	var r = results[(isZip) ? 'zip' : 'main'];
	if (r.length-1 > 0) results[(isZip) ? 'zip' : 'main'].push([]);
	return [];
}
function val(o, fb) {
	if (fb) {
		return (o.hasOwnProperty(lang)) ? o[lang] : fb;
	}
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
}
function possible(o) {
	return ( o.hasOwnProperty(lang) && o[lang].indexOf(' ') < 0 );
}
function possibleOrig(o) {
	return ( o.hasOwnProperty(lang)) && (o.hasOwnProperty('uid') && o[lang].indexOf(' ') < 0 );
}
function possibleRef(o) {
	return ( o.hasOwnProperty(lang) && o.hasOwnProperty('ref') );
}
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
	if (o.hasOwnProperty('meta') && o.meta.hasOwnProperty(args.key)) {
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
module.exports = {
	allPossible: allPossible,
	setLang: setLang,
	getRes: getRes,
	newRes: newRes,
	val: val,
	did: did,
	handled: handled,
	possibleAndMulti: possibleAndMulti,
	possible: possible,
	possibleOrig: possibleOrig,
	possibleRef: possibleRef,
	isRef: isRef,
	rest: rest,
	meta: meta
};