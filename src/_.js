/**
 * HELPER fns
 * @module src/_
 */
var defaultOptions = require('./_options');
// some logic is part of dojo.lang
// Copyright (c) 2005-2015, The Dojo Foundation
// All rights reserved.
function _getProp(/*Array*/parts, /*Boolean or Object*/create, /*Object*/context){
	if(!context){
		return {};
	}
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
	// advanced data minifying - standard
	if (typeof a === 'undefined') {return null}
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
	if (!(a instanceof Array)) {return null;}
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
function toCamelCase(str) {
	return str.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
}
function toReadable(str) {
	return str.replace(/([A-Z])/g, function($1){return [' ', $1.toLowerCase()].join('');});
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
// shorthand .pos...
function setPos(token, p, pr) {
	token.pos = p;
	token.pos_reason = toReadable(pr);
	return token;
}
function setToken(t, i, tokens, id, r, schema) {
	if (r._if && r._if(t, tokens[i+1], tokens[i-1], i)) {
		var token = (r.set) ? tokens[i+(r.set)] : t;
		setPos(token, schema[r.tag], toReadable(id));
	} else if (r.matches) {
		if (t.match(r.matches)) {
			if (r.tag) { setPos(token, schema[r.tag], toReadable(id)); }
			return (r.hasOwnProperty('returns')) ? r.returns : t.replace(r[(r.replaces) ? 'replaces':'matches'], r.replacer);
		}
		return false;
	}
}
// set token against data rules, general logic
function tokenFn(rules, type, schema) {
	return function(t, i, tokens) {
		var id;
		if (rules[type] instanceof Array) {
			for (id = 0; id < rules[type].length; i++) {
				var r = rules[type][id];
				var set = setToken(t, i, tokens, id, r, schema);
				if (set) return set;
			}
		} else {
			for (id in rules[type]) {
				var r = rules[type][id];
				var set = setToken(t, i, tokens, id, r, schema);
				if (set) return set;
			}
		}
		return t;
	}
}
// reduce
function toObj(h,s){
	h[(s instanceof Array) ? s[0] : s] = true; 
	return h;
}
// special reduce
function toObjValues(zip, obj){
	if (!obj) {obj = {}}
	return Object.keys(zip).reduce(function(h, k) {
		zip[k].forEach(function(w) { h[w] = k; });
		return h;
	}, {});
}
// array.indexOf
function has(str, a) {
	if (typeof str === 'string' && a.indexOf(str) > -1) return true;
	return false;
}

// general objects mixin
function mix(dest, sources){
	if(!dest){ dest = {}; }
	for(var i = 1, l = arguments.length; i < l; i++){
		_mix(dest, arguments[i]);
	}
	return dest; // Object
}
// mixin for fnOptions -> userDefaultOptions -> defaultOptions
function mixOptions(options, userDefaultOptions, key) {
	if (!key) { var key; for (key in options) { mixOptions(options, key); } }
	if (!options || Object.keys(options).length<1) { return defaultOptions[key]; }
	if (!key in defaultOptions) { defaultOptions[key] = options; }
	return mix(options, userDefaultOptions[key], defaultOptions[key]);
}
exports._ = {
	// used for factories (unzip)
	repl: repl,
	replBase: replBase,
	
	// helpers
	toCamelCase: toCamelCase,
	toReadable: toReadable,
	hash: hash,
	setPos: setPos,
	tokenFn: tokenFn,
	mixOptions: mixOptions,
	mix: mix,
	toObj: toObj,
	toObjValues: toObjValues,
	has: has,
	getObjKey: function(parts, create, o) {
		return !parts ? o : _getProp(parts, create, o); // Object	
	},
	setObjKey: function(parts, value, o) {
		var parts = parts.map(function(s){ 
			return (typeof s === 'string') ? s : this.hash(s);
		}.bind(this)); 
		var p = parts.pop(), obj = _getProp(parts, true, o);
		return obj && p ? (obj[p] = value) : undefined; // Object
	},
	getObject: function(name, create, o) {
		return !name ? o : _getProp(name.split("."), create, o); // Object	
	},
	setObject: function(name, value, o) {
		return this.setObjKey(name.split('.'), value, o);
	}
};
module.exports = exports._