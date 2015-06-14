
  exports.zip =  (function _fns() {
		return {
			toObj: function(h,s){ h[s] = true; return h; },
			toObjValues: function(zip, obj){
				if (!obj) {obj = {}}
				return Object.keys(zip).reduce(function(h, k) {
					zip[k].forEach(function(w) { h[w] = k; });
					return h;
				}, {});
			},
			repl: function(a,s,r){
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
				if (typeof a === 'undefined') {return null}
				var _s = a[1].replace('=',a[0]).replace('<', a[0].slice(0,-2));
				return [a[0], ((typeof s !== 'undefined') ? helpFns.repl(_s, s, r) : _s) ];
			}
		};
	})();
module.exports = exports.zip;
