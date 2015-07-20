// TODO
// derives from 'redaktor' fork, note by author:
// this is very cheap. while it might be desired to maintain one set cache for all nlp instances, empty it SHOULD be per instance.
// caching by sentence, so unchanged-sentences aren't re-parsed on keystroke -> set: function (method, key, val) { cache.nlp.sentences[key] = val; } (hashing ?)
// caching per method -> set: function (method, key, val) { cache.nlp[method][key] = val; }
var _ = require('./_');
exports.cache = {};
function toStr(p){ return (typeof p === 'string') ? p : JSON.stringify(p); }
function c(){
	if (typeof module !== 'undefined' && module.exports) {
		return require.cache;
	} else if (typeof window != 'undefined') {
		return window.cache;
	}
	return exports.cache;
}

module.exports = (function () {
		/* TODO
		if (options.cache.db) {
			exports.cache = // TODO - write something for redis here	
		} else if (hasDefine ...) { 
			exports.cache = // TODO AMD cache ...
		} else 
		*/
		c().nlp = {};
		
    return {
			empty: function(_method) {
				if (!_method) {
					c().nlp = {};
				} else {
					c().nlp[_method] = {};
				}
				return true;
			},
			get: function(key, params, hashKey) {
				if (params instanceof Array) {
					params.push(key);
					return _.getObjKey(params, false, c().nlp);
				} else {
					var method = (!params) ? 'main' : params;
					if (!c().nlp.hasOwnProperty(method) || !c().nlp[method].hasOwnProperty((hashKey) ? _.hash(key) : key)) {
						return null;
					}
				}
				return c().nlp[method][(hashKey) ? _.hash(key) : key]; 
			},
			set: function(key, val, params, hashKey) {
				if (typeof val === 'undefined') { return null; }
				if (params instanceof Array) {
					params.push(key);
					_.setObjKey(params, val, c().nlp);
				} else {
					var method = (!params) ? 'main' : params;
					if (!c().nlp.hasOwnProperty(method)) {
						c().nlp[method] = {};
					}
					c().nlp[method][(hashKey) ? _.hash(key) : key] = val;
				}
				return val;
			}
    }
})();
