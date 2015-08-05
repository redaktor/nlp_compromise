// fluid language approach - cat = category, sys = system, w = words, s = symbol, p = prefix, u = unit ...
var rules = require('../../data/en/units');
var toNumber = require('./to_number');
var toDate = require('./to_date');
var _ = require('../../_');
function cat(ao){
	if (!ao) return ['quantity'];
	return (ao instanceof Array) ? rules.categories[(rules[ao[0]][ao[1][0]][ao[2][0]])]||['quantity'] : ((ao.category) ? ao.category[0] : ['quantity']); 
}
function getPrefixAndUnit(IUs) { // matches for prefix and unit
	if (!IUs || (!IUs[5] && !IUs[7])) { return false; }
	var p = (IUs[3]) ? rules.prefix.fn.w(IUs[3]).i : ((IUs[4]) ? rules.prefix.fn.s(IUs[4]).i : -1);
	var u = (IUs[5]) ? rules.unit.fn.w(IUs[5]).i : ((IUs[7]) ? rules.unit.fn.s(IUs[7]).i : -1);
	var a = (p > -1) ? rules.prefixes[p] : [false,'',''];
	p = (p > -1) ? {prefix:a[1], prefixText:a[2], toSI:{by:Math.pow(10,a[0]),plus:0}} : {prefix:false, prefixText:'', toSI:false};
	a = (u > -1) ? rules.units[IUs[5]?'w':'s'][u] : [['quantity'],0,'',''];
	if (a[5]) {
		p.toSI = (a[5] instanceof Array) ? {by:a[5][0],plus:a[5][1]||0} : {by:Math.pow(10,a[5]),plus:0};
	} else if (!(p.toSI) && a[1]===0 && a[2]) {
		p.toSI = {by:1,plus:0,base:a[2]};
	}
	if (_.hasL(a)) {
		u = {
			unit:a[2],
			unitExpo: (IUs[0]||IUs[8]) ? 2 : ((IUs[1]||IUs[9]) ? 3 : ((IUs[2]||IUs[10]) ? 4 : false)),
			unitText: _.first(a[3]),
			category: (a[0] instanceof Array) ? a[0] : rules.categories[a[0]],
			system: rules.systems[a[1]]
		};
	}
	var o = _.mixin(p, u);
	if ((p.toSI) && !(p.toSI.base) && typeof a[0] === 'number') { 
		var base = rules.units.s.filter(function(u){ return (u[0] === a[0] && !(u[1]) && !(u[5]) && !(u[6])) })
		if (_.hasL(base) && _.hasL(base[0],1)) { p.toSI.base = base[0][2]; }
	}
	o.input = (o.unit) ? [(o.unitExpo) ? rules.pows['_'+o.unitExpo][0]||'':'', (o.prefixText) ? o.prefixText||'':'', o.unitText ].join('') : '';
	if (cat(o) === 'time' && o.unitExpo) { // correct o.category for *unitExpo* first because of 'specific volume' ...
		o.category = [['time_',o.unitExpo].join(''),'time'];
	} else if (o.unitExpo && getObjKey([cat(o),o.unitExpo],rules.pows)){//_.has(cat(o),rules.pows) && rules.pows[cat(o)][o.unitExpo]) {
		o.category = rules.categories[(rules.pows[cat(o)][o.unitExpo])]||o.category||'quantity'; 
	}
	return o;
}
function toContext(o,a,i){
	if (!_.hasL(a[0].filter(_.str))) { return false; }
	if (!i) {
		o = getPrefixAndUnit(a[0]);
		if (o) { o.by = getPrefixAndUnit(a[1]); }
	} else {
		o.per = getPrefixAndUnit(a[0]);
		if (o.per) { o.per.by = getPrefixAndUnit(a[1]); }
	}
	return o;
}
function toNumerals(o, i){ // TODO (categorize check by reverse [unconventional]), multiple plus words, tags
	var res = { category:['quantity'], quantity:o.number, numeral:o.numeral, input:o.input, context:false };
	if (_.hasL(o.units)){ // units and categorize:
		o = o.units.reduce(toContext,{});
		if (o) {								 
			if (o.by && o.by.category && _.has(cat(o),rules.by) && _.has(cat(o.by),rules.by[cat(o)])){
				res.category = cat(['by',o.category,o.by.category]);
			} _.has(cat(o.per),rules.by)
			if (o.per && o.per.by && o.per.by.category && _.has(cat(o.per),rules.by) && _.has(cat(o.per.by),rules.by[cat(o.per)])){
				o.per.category = cat(['by',o.per.category,o.per.by.category]);
			}
			if (o.per && _.has(cat(o),rules.per) && _.has(cat(o.per),rules.per[cat(o)])){
				if (cat(o) != cat(o.per) || o.unit === o.per.unit) { // if mass/mass, 1 must be represented by e.g. kg/kg
					res.category = cat(['per',o.category,o.per.category]);
				}
			} else if (o.by && o.by.category && o.per) { 
				var byCat = [[cat(o), 'by', cat(o.by)].join(' ')];
				if (_.has(byCat,rules.per) && _.has(cat(o.per),rules.per[byCat])){
					res.category = cat(['per',byCat,o.per.category]);
				}
			} 
			if (res.category[0] === 'quantity' && o.per && o.per.by) { 
				var perByCat = [[cat(o.per), 'by', cat(o.per.by)].join(' ')];
				if (_.has(cat(o),rules.per) && _.has(perByCat,rules.per[cat(o)])){
					res.category = cat(['per',o.category,perByCat]);
				}
			} else if (res.category[0] === 'quantity' && o.category) {
					res.category = o.category;
			}
		}
		res.context = o;
	}
	return res;
}
function toByUnits(a){ return (a[11] || (a[5]&&a[17])) ? [a.slice(0,10),a.slice(12)] : [a]; }
function hasNumerals(str){
	str = (this.input||str||' ').trim();
	if (!_.str(str)) { return []; }
	var a = []; //var signs = ['+','-',',','.']; // TODO	'formulas other than units' ? ...
	var numStr = str;
	var repl = {};
	str.match(rules.numeral).forEach(function(s) {
		s = s.trim();
		var nr = toNumber(s);
		if (typeof nr == 'number') { numStr = numStr.replace(s,nr); }
		repl['_'+nr] = s;
	});
	this.numeric = numStr;
	this.dates = toDate(this.numeric);
	var noDate = str;
	this.dates = this.dates.map(function(o){ 
		if (str.indexOf(o.text) < 0) {
			o.text.match(/\d+/g).forEach(function(nr){
				var k = '_'+nr;
				if (repl[k]) {
					var nTxt = o.text.replace(nr.toString(), repl[k]);
					if ( _.getObject('to.text',o) === o.text) o.to.text = nTxt;
					o.text = nTxt;
					repl[k] = false;
				}
			});
		}
		noDate = noDate.replace(o.text,'');
		return o;
	});
	var numerals = noDate.match(rules.numeral);
	if (numerals) {
		var i,m;
		for (i=0; i<numerals.length; i++){
			while ((m = rules.numeral.exec(numerals[i])) !== null) {
				if (m.index === rules.numeral.lastIndex) { rules.numeral.lastIndex++; }
				var o = {input:m.shift().trim(), numeral:m.shift().trim(), units:(m[23] ? [m.slice(0,22),m.slice(24)] : [m])};
				o.number = toNumber(o.numeral);
				o.units = o.units.map(toByUnits);
				a.push(o);
			}
		}
		return a.map(toNumerals).filter(function(o){ return (typeof o.quantity === 'number'); });
	}
	return [];
}
/*
var util = require('util');
var RES = hasNumerals('this is two thousand five hundred and sixty km/h lorem ipsum three bananas'); //m³ per kg!'); //² 
console.log( util.inspect(RES, {depth:null}) );
*/
module.exports = hasNumerals;