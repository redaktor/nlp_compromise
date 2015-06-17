// TODO
// derives from 'redaktor' 's fork, note by author:
// this is very cheap. while it might be desired to maintain one set cache for all nlp instances, empty it SHOULD be per instance.
// caching by sentence, so unchanged-sentences aren't re-parsed on keystroke -> set: function (method, key, val) { cache.nlp.sentences[key] = val; } (hashing ?)
// caching per method -> set: function (method, key, val) { cache.nlp[method][key] = val; }
var _ = require('./_');
exports.cache = {};

module.exports = (function () {
		/* TODO
		if (options.cache.db) {
			exports.cache = // TODO - write something for redis here	
		} else if (hasDefine ...) { 
			exports.cache = // TODO AMD cache ...
		} else 
		*/
		if (typeof module !== 'undefined' && module.exports) {
			exports.cache = require.cache;
		} else if (typeof window != 'undefined') {
			exports.cache = window.cache;
		}
		exports.cache.nlp = {};
		
    return {
			empty: function(_method) {
				if (!_method) {
					exports.cache.nlp = null;
				} else {
					exports.cache.nlp[_method] = null;
				}
				return true;
			},
			get: function(key, params, hashKey) {
				if (params instanceof Array) {
					params.push(key);
					return _.getObjKey(params, false, exports.cache.nlp);
				} else {
					var method = (!params) ? 'main' : params;
					if (!exports.cache.nlp.hasOwnProperty(method) || !exports.cache.nlp[method].hasOwnProperty((hashKey) ? _.hash(key) : key)) {
						return null;
					}
				}
				return exports.cache.nlp[method][(hashKey) ? _.hash(key) : key]; 
			},
			set: function(key, val, params, hashKey) {
				if (typeof val === 'undefined') { return null; }
				if (params instanceof Array) {
					params.push(key);
					_.setObjKey(params, val, exports.cache.nlp);
				} else {
					var method = (!params) ? 'main' : params;
					if (!exports.cache.nlp.hasOwnProperty(method)) {
						exports.cache.nlp[method] = {};
					}
					exports.cache.nlp[method][(hashKey) ? _.hash(key) : key] = val;
				}
				return val;
			}
    }
})();
