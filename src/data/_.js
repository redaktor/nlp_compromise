/**
 * special util custom inspect fn (functions and regexes in obj)
 * makes util.inspect logging nested objects with functions and regexes
 * 
 * not used in the project itself, only used by ./_build
 *
 * @readonly
 * @module data/_
 */
function inspectFn(depth, ctx) {
	// 
	var m = ['{\n\t'];
	var x = 0;
	var l = Object.keys(this).length-1;
	var level = 0; // TODO
	
	function format(t, a, k) {
		if (!a) { a = []; }
		if (k) { a.push('\t', k, ': '); }
		if (typeof t === 'object' && !(t instanceof Array) && !(t instanceof RegExp)) {
			a = a.concat(formatO(t));
		} else if (typeof t === 'string') {
			a.push("'", t.replace("'", '\\\''), "'");
		} else {
			a.push((typeof t === 'function' || t instanceof RegExp) ? (t.toString()) : (t));
		}
		return a;
	}
	
	function formatO(o) {
		var om = ['{\n\t\t'];
		var ox = 0;
		var ol = Object.keys(o).length;
		for (var k in o) {
			ox++;
			var _t = o[k];
			if (_t instanceof Array) {
				var fA = _t.map(function(t){ return format(t).join(''); });
				om.push('\t', k, ': [', fA, ']');
			} else {
				om = format(_t, om, k);
			}
			om.push((ox < ol) ? ',\n\t\t' : '\n\t\t');
		}
		om.push('}');
		return om;
	}
	for (var key in this) {
		if (key != 'inspect') {
			x++;
			var _t = this[key];
			if (typeof _t === 'object' && !(_t instanceof Array) && !(_t instanceof RegExp)) {
				m.push(key, ': ');
				m = m.concat(formatO(_t));
			} else if (typeof _t === 'string') {
				m.push(key, ': ', "'", _t, "'");
			} else {
				m.push(key, ': ', (typeof _t === 'function' || _t instanceof RegExp) ? (_t.toString()) : (_t));
			}
			m.push((x<l) ? ',\n\t' : '\n');
		}
	}
	m.push('}');
	return m.join('');
}

module.exports = {
	inspectFn: inspectFn
};