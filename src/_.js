// helpers

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

module.exports = {
	// used for factories
	repl: function(a,s,r){
		// advanced data minifying - standard
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
		// advanced data minifying - also replace another array element (['fantastic', '=ally'])
		if (typeof a === 'undefined') {return null}
		var _s = a[1].replace('=',a[0]).replace('<', a[0].slice(0,-2));
		return [a[0], ((typeof s !== 'undefined') ? helpFns.repl(_s, s, r) : _s) ];
	},
	
	// helpers
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
