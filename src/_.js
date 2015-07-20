/**
 * HELPER fns
 * @module src/_
 */
if (typeof lang != 'string') lang = 'en';
var schema = require('./data/'+lang+'/schema');
var defaultOptions = require('./_options');
// some logic is part of dojo.lang
// Copyright (c) 2005-2015, The Dojo Foundation
// All rights reserved.
// private functions, crossbrowser
function _getProp(/*Array*/parts, /*Boolean or Object*/create, /*Object*/context){
	if(!context){ return {}; }
	try{
		for(var i = 0; i < parts.length; i++){
			var p = parts[i];
			if(!(p in context)){
				if (typeof create === 'object' && create.hasOwnProperty('default')) {
					context[p] = create.default;
				} else if (create) {
					context[p] = {};
				} else {
					return;
				}
			}
			context = context[p];
		}
		return context; // mixed
	} catch(e) { }
}
function _mix(dest, source, copyFunc){
	var name, s;
	for(name in source){
		s = source[name];
		if(!(name in dest)){
			dest[name] = copyFunc ? copyFunc(s) : s;
		}
	}        
	return dest; // Object
}

// used for factories (unzip)
function repl(a, r, s){
	// advanced data minifying, general logic
	if (typeof a === 'undefined') { return null; }
	var std = ['&','_','#','~','!','%',';','@','0','1','2','3','4','5','6','7','8','9','>','`'];
	if (!s && r) { s = std.slice(0, r.length); }
	if (!r) { r = std; }
	function _r(w){
		s.forEach(function(rS, i) { w = w.replace(new RegExp(rS, 'g'), r[i]) });
		return w;
	}
	return (a instanceof Array) ? a.map(_r) : _r(a);
}
function replBase(a, r, s, baseI){
	// advanced data minifying - also replace another array element (['fantastic', '=ally'])
	if (!(a instanceof Array)) { return null; }
	if (!baseI) baseI = 0;
	return a.map(function(w, i) {
		if (typeof w != 'string') {
			return w;
		} else if (i === baseI) {
			return (r||s) ? this.repl(w, r, s) : w;
		} else if (r) {
			var _w = w.replace('=', a[baseI]).replace('<', a[baseI].slice(0,-2));
		} else { // do zip
			var _w = w.replace(a[baseI], '=').replace(a[baseI].slice(0,-2), '<');
		}
		return (r||s) ? this.repl(_w, r, s) : _w;
	}.bind(this));
}
// helpers
function normalise (str, exclDot, leaveCase) {
	// TODO - does it handle all european languages?
	if (!str) { return ''; }
	if (!leaveCase) { str = str.toLowerCase(); }
	str = str.trim().replace(/[,\.!:;\?\(\)]/, '');
	// single curly quotes
	str = str.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g, "'");
	// double curly quotes
	str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g, '"');
	if (!exclDot) str = str.replace(/\./g, '');
	if (!str.match(/[a-z0-9]/i)) { return '' }
	return str;
}
function addNextLast(o, i, a) {
	// add next / last
	o.last = a[i-1];
	o.next = a[i+1];
	return o;
}
// map shorthand fn
function mapFn(key) {
	return function(o) { return getObject(key, false, o); }
}
// reduce
function toObj(o,s) {
	o[(this.key) ? this.key : ((s instanceof Array) ? s[0] : s)] = (this.key) ? s : true; 
	return o;
}
// special reduces
function toObjValues(zip, obj) {
	if (!obj) {obj = {}}
	return Object.keys(zip).reduce(function(h, k) {
		zip[k].forEach(function(w) { h[w] = k; });
		return h;
	}, {});
}
function toObjDeep(arr, keys) {
	return arr.map(function(a) {
		var res = {};
		if (!(a instanceof Array)) { a = [a]; };
		a.forEach(function(s, i) {
			res[keys[i]||s] = s;
		});
		return res;
	});
}
// array.indexOf
function has(str, a) {
	if (typeof str === 'string' && a.indexOf(str) > -1) return true;
	return false;
}
// array.length
function hasL(a, l) {
	if (!l) l = 0;
	return (a && a instanceof Array && a.length > l) ? a.length : 0; 
}
// string, non empty
function str(w) {
	return (typeof w === 'string' && w.trim() != '');
}
// number
function nr(n) { return (typeof n === 'number'); }
// object
function obj(o) { return (o && typeof o === 'object' && !(o instanceof Array)); }
function shallow(o) { return (obj(o) ? JSON.parse(JSON.stringify(o)) : o); }
function values(o) { return (obj(o) ? Object.keys(o).map(function(k){return o[k];}) : o); }
// general objects mixin
function mixin(dest, sources){
	if(!dest){ dest = {}; }
	for(var i = 1, l = arguments.length; i < l; i++){
		_mix(dest, arguments[i]);
	}
	return dest; // Object
}
function toTitlecase(str) {
	return (!str) ? '' : str.charAt(0).toUpperCase() + str.slice(1);
}
function toCamelCase(str) {
	return (!str) ? '' : str.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
}
function toReadable(str) {
	return (!str) ? '' : str.replace(/([A-Z])/g, function($1){return [' ', $1.toLowerCase()].join('');});
}
function toNames(str) { 
	return (!str) ? '' : str.split(' ').map(function (a) { return a.toLowerCase(); }); 
}
function r(a, j, f) {
		if (!j) {j = ''}
    return new RegExp(a.join(j), f||'');
}
function hash(str) {
	if (typeof str != 'string') { str = JSON.stringify(str); }
	var hash = 0, i, chr, len;
	if (str.length == 0) return hash;
	for (i = 0, len = str.length; i < len; i++) {
		chr   = str.charCodeAt(i);
		hash  = ((hash << 5) - hash) + chr;
		hash |= 0;
	}
	return hash;
}
// input string and options
function w_options (wOo) {
	return (typeof wOo === 'string') ? {
		w: this.word || wOo || '',
		options: {}
	} : {
		w: this.word || '',
		options: (obj(wOo)) ? wOo : {}
	}
}
// shorthand .pos...
function setPos(token, p, pr) {
	token.pos = p;
	token.pos_reason = toReadable(pr);
	return token;
}
function setToken(t, i, tokens, id, r) {
	if (r._if && r._if(t, tokens[i+1], tokens[i-1], i)) {
		var token = (r.set) ? tokens[i+(r.set)] : t;
		setPos(token, schema[r.tag], toReadable(id));
	} else if (r.matches) {
		var matches = t.match(r.matches);
		if (matches) {
			if (r.tag) { return schema[r.tag]; }
			if (r.hasOwnProperty('returns')) { return r.returns; }
			if (r.hasOwnProperty('replacer')) { return t.replace(r[(r.replaces) ? 'replaces':'matches'], r.replacer); }
			if (r.parameters) { 
				for (var k in r.parameters) { matches[k] = r.parameters[k]; }
				return matches;
			}
			return true;
		}
		return false;
	} else if (r.hasOwnProperty('replacer')) { 
		return t.replace(r.replaces, r.replacer); 
	}
}
// set token against data rules, general logic - huge workhouse, saves much typing
function tokenFn(rules, type, noFallback) {
	if (type instanceof Array) {
		var r = _getProp(type, false, rules);
	} else {
		var r = (rules.hasOwnProperty(type)) ? rules[type] : 0;
	}
	return function(t, i, tokens) {
		if (!r) return false;
		var id;
		if (r instanceof Array) {
			for (id = 0; id < r.length; id++) {
				var rule = r[id];
				var set = setToken(t, i, tokens, rule.tag+'Rule_'+id, rule);
				if (set) return set;
			}
		} else {
			for (id in r) {
				var rule = r[id];
				var set = setToken(t, i, tokens, id, rule);
				if (set) return set;
			}
		}
		return (noFallback) ? false : t;
	}
}
function getObjKey(parts, create, o) {
	return !parts ? o : _getProp(parts, create, o); // Object	
}
function getObject(name, create, o) {
	return !name ? o : _getProp(name.split('.'), create, o); // Object	
}
function setObjKey(parts, value, o) {
	var parts = parts.map(function(s){ 
		return (typeof s === 'string') ? s : hash(s);
	}); 
	var p = parts.pop(), obj = _getProp(parts, true, o);
	return obj && p ? (obj[p] = value) : undefined; // Object
}
function setObject(name, value, o) {
	return this.setObjKey(name.split('.'), value, o);
}
// mixin for fnOptions -> userDefaultOptions -> defaultOptions
function mixOptions(options, userDefaultOptions, key) {
	if (!obj(userDefaultOptions)) userDefaultOptions = {};
	if (!key) { var key; for (key in options) { mixOptions(options, key); } }
	if (!options || Object.keys(options).length<1) { return defaultOptions[key]; }
	if (!key in defaultOptions) { defaultOptions[key] = options; }
	return mixin(options, userDefaultOptions[key], defaultOptions[key]);
}

function sugarProto(prefix, o, _proto) {
	var k;
	for (k in o) {
		_proto[[prefix,k].join('')] = (function(k) { 
				return function() { return this.conjugated[k]; }
		 })(k);
	}
	return _proto;
}
exports._ = {
	// if we'd have to deal with callbacks
	noOp: function(){},
	// used for factories (unzip)
	repl: repl,
	replBase: replBase,
	// helpers
	normalise: normalise,
	addNextLast: addNextLast,
	toTitlecase: toTitlecase,
	toCamelCase: toCamelCase,
	toReadable: toReadable,
	toNames: toNames,
	hash: hash,
	r: r,
	w_options: w_options,
	setPos: setPos,
	tokenFn: tokenFn,
	mixOptions: mixOptions,
	mixin: mixin,
	mapFn: mapFn,
	toObj: toObj,
	toObjValues: toObjValues,
	toObjDeep: toObjDeep,
	has: has,
	hasL: hasL,
	str: str,
	obj: obj,
	shallow: shallow,
	values: values,
	nr: nr,
	getObjKey: getObjKey,
	getObject: getObject,
	setObjKey: setObjKey,
	setObject: setObject,
	sugarProto: sugarProto
};
module.exports = exports._