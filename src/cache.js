// TODO
// caching by sentence, so unchanged-sentences aren't re-parsed on keystroke -> set: function (key, val) { cache.nlp.sentences[key] = val; } (hashing ?)
// caching per method -> set: function (method, key, val) { cache.nlp[method][key] = val; }

exports.cache = {};

// 'module.exports.setObject' logic and exports.getProp is parts of dojo.lang
// Copyright (c) 2005-2015, The Dojo Foundation
// All rights reserved.
exports.getProp = function(/*Array*/parts, /*Boolean*/create, /*Object*/context){
	if(!context){
		return {};
	}
	try{
		for(var i = 0; i < parts.length; i++){
			var p = parts[i];
			if(!(p in context)){
				if(create){
					context[p] = {};
				}else{
					return;		// return undefined
				}
			}
			context = context[p];
		}
		return context; // mixed
	} catch(e) { }
}

module.exports = (function () {
		/*
		if (options.cache.db) {
			exports.cache = // TODO - write something for redis here	
		} else  if (hasDefine){ 
			exports.cache = // TODO AMD Module
		} else 
		*/
		if (typeof module !== 'undefined' && module.exports) {
			exports.cache = require.cache;
		} else if (typeof window != 'undefined') {
			exports.cache = window.cache;
		}
		exports.cache.nlp = {};
		
    return {
			hash: function(str) {
				if (typeof str === 'number') {
					return str.toString();
				} else if (typeof str != 'string') {
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
				return !parts ? o : exports.getProp(parts, create, (o) ? o : exports.cache.nlp); // Object	
			},
			setObjKey: function(parts, value, o) {
				var parts = parts.map(function(s){ 
					return (typeof s === 'string') ? s : this.hash(s);
				}.bind(this)); 
				var p = parts.pop(), obj = exports.getProp(parts, true, (o) ? o : exports.cache.nlp);
				return obj && p ? (obj[p] = value) : undefined; // Object
			},
			getObject: function(name, create, o) {
				return !name ? o : exports.getProp(name.split("."), create, o); // Object	
			},
			setObject: function(name, value, o) {
				return this.setObjKey(name.split('.'), value, o)
			},
			empty: function(_method) {
				if (!_method) {
					exports.cache.nlp = {};
				} else {
					exports.cache.nlp[_method] = {};
				}
				return true;
			},
			get: function(key, params, hashKey) {
				if (params instanceof Array) {
					params.push(key);
					return this.getObjKey(params, false);
				} else {
					var method = (!params) ? 'main' : params;
					if (!exports.cache.nlp.hasOwnProperty(method) || !exports.cache.nlp[method].hasOwnProperty((hashKey) ? this.hash(key) : key)) {
						return null;
					}
				}
				return exports.cache.nlp[method][(hashKey) ? this.hash(key) : key]; 
			},
			set: function(key, val, params, hashKey) {
				if (typeof val === 'undefined') { return null; }
				if (params instanceof Array) {
					params.push(key);
					this.setObjKey(params, val);
				} else {
					var method = (!params) ? 'main' : params;
					if (!exports.cache.nlp.hasOwnProperty(method)) {
						exports.cache.nlp[method] = {};
					}
					exports.cache.nlp[method][(hashKey) ? this.hash(key) : key] = val;
				}
				return val;
			}
    }
})();
