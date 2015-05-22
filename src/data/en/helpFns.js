
var helpFns = (function() {
  var main = (function () {
		return {
			toObj: function(h,s){ h[s]=true; return h; },
			repl: function(a,s,r){
				if (typeof a === 'undefined') return null;
				var _r = function(w){
					s.forEach(function(rS, i) { w = w.replace(new RegExp(rS, 'g'), r[i]) });
					return w;
				}
				return (a instanceof Array) ? a.map(_r) : _r(a);
			},
			replBase: function(a,s,r){
				if (typeof a === 'undefined') return null;
				var _s = a[1].replace('=',a[0]).replace('_', a[0].slice(0,-2));
				return [a[0], ((s instanceof Array) ? helpFns.repl(_s, s, r) : _s) ];
			}
		};
	})();
  if (typeof module !== "undefined" && module.exports) module.exports = main;

  return main;
})();