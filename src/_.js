// helpers - TODO DOC
var defaultOptions = require('./_options');
// some logic is part of dojo.lang
// Copyright (c) 2005-2015, The Dojo Foundation
// All rights reserved.
exports.getProp = function(/*Array*/parts, /*Boolean or Object*/create, /*Object*/context){
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

exports._ = {
	// used for factories
	repl: function(a, r, s){
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
	},
	replBase: function(a, r, s, baseI){
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
	},
	
	// helpers
	mixOptions: function(key, options) {
		if (!options || Object.keys(options).length<1) { return defaultOptions[key]; }
		if (!key in defaultOptions) { defaultOptions[key] = options; }
		return this.mix(options, defaultOptions[key]);
	},
	_mix: function(dest, source, copyFunc){
		var name, s, i, empty = {};
		for(name in source){
			s = source[name];
			if(!(dest.hasOwnProperty(name))){
				dest[name] = copyFunc ? copyFunc(s) : s;
			}
		}        
		return dest; // Object
	},    
	mix: function(dest, sources){
		if(!dest){ dest = {}; }
		for(var i = 1, l = arguments.length; i < l; i++){
			this._mix(dest, arguments[i]);
		}
		return dest; // Object
	},
	toCamelCase: function(str) {
		return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
	},
	toReadable: function(str) {
		return str.replace(/([A-Z])/g, function($1){return [' ', $1.toLowerCase()].join('');});
	},
	toObj: function(h,s){
		h[s] = true; 
		return h;
	},
	toObjValues: function(zip, obj){
		if (!obj) {obj = {}}
		return Object.keys(zip).reduce(function(h, k) {
			zip[k].forEach(function(w) { h[w] = k; });
			return h;
		}, {});
	},
	has: function(str, a) {
		if (typeof str === 'string' && a.indexOf(str) > -1) return true;
		return false;
	},
	hash: function(str) {
		if (typeof str != 'string') {
			str = JSON.stringify(str);
		}
		var hash = 0, i, chr, len;
		if (str.length == 0) return hash;
		for (i = 0, len = str.length; i < len; i++) {
			chr   = str.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0;
		}
		return hash;
	},
	getObjKey: function(parts, create, o) {
		return !parts ? o : exports.getProp(parts, create, o); // Object	
	},
	setObjKey: function(parts, value, o) {
		var parts = parts.map(function(s){ 
			return (typeof s === 'string') ? s : this.hash(s);
		}.bind(this)); 
		var p = parts.pop(), obj = exports.getProp(parts, true, o);
		return obj && p ? (obj[p] = value) : undefined; // Object
	},
	getObject: function(name, create, o) {
		return !name ? o : exports.getProp(name.split("."), create, o); // Object	
	},
	setObject: function(name, value, o) {
		return this.setObjKey(name.split('.'), value, o);
	}
};
module.exports = exports._