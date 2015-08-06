/**
 * generates properly-formatted dates from free-text date forms -<br><br>
 *
 * date parsing <br>
 * TODO DOC
 * @module src/parents/value/to_date
 */
 
// NOTE - this is a WIP, it works like a charm but it introduces API changes !!! TODO DOC
// NOTE - due to a much more detailed structure - this breaks the tests !!! TODO rewrite TESTS

/* note: Using \\s instead of a literal space to include half width spaced dates ... */
/* TODO
- hebrew, julian etc.
observe pattern or setter: 
- whenever year/month/day... changes, DO update .Date, localized

- make years negative if b.c. (check suffixes) --> negCheck

- weekday fallback (rules, but no detection yet for mon.|monday etc., we have the data, so TODO) 
- cache sets
- I think all further date (i18n and format) methods are not scope of this project, 
  so maybe TODO an optional "hook" for moment.js and a moment instead of js Date ...
*/
if (typeof lang != 'string') lang = 'en';
var dPath = '../../data/'+lang+'/';
var data = require(dPath+'lexicon/dates');
var rules = require(dPath+'rules/date');
var _ = require('../../_');
var cache = require('../../cache');

var _d = 'day', _m = 'month', _y = 'year', _wd = 'weekDay';
var _methods = {day:'UTCDate', month:'UTCMonth', year:'UTCFullYear', weekDay:'UTCDay'};
var last_dates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
if (lang != 'en') { rules.short = rules.short.reverse(); } // TODO

function get(D, t, doSet) {
	var method = ['get',_methods[t]].join('');
	return (D && method && doSet) ? D[method]()+((t==='month')?1:0) : false;
}
function set(o) {
	// the Date bug "2 digit years always in last century" is fixed in function 'year'
	// now prevent the Date bug "setting the Date to final value if month or date is null"
	var d = new Date(Date.UTC(o[_y]||null, o[_m]-1||0, o[_d]||1, 0, 0, 0, 0 /*, hour, minute, second, millisecond*/));
	// and finally prevent the "year < 1900 // y2k" bug
	// can anybody confirm the above internally uses setYear instead of setFullYear ?
	d.setUTCFullYear((typeof o[_y] === 'number') ? o[_y] : this.now.getUTCFullYear());
	return d;
}
function negCheck(o) {
	// negative years ... TODO
	if (o.integer > 0 && rules[_y].negative.hasOwnProperty(o.normalised)) return -(o.integer);
	return o.integer;
}
function year(o) {
		var is = {n: o.text.match(rules[_y].neg), p: o.text.match(rules[_y].pos)}, k;
		for (k in is) { if (!_.hasL(is[k]) || is[k][0].indexOf(o[_y].toString()) < 0) { is[k] = false; } }
		if (o[_y] < 0) { return o[_y]; }
		// 2 digit years, prefer modern - TODO -> options ? strict = true/false
    var nowY = this.now.getUTCFullYear();
    var century = Math.floor(nowY/1000)*1000;
    if (!is.n && !is.p && o[_d] && o[_y]<=((nowY+5)-century) ) { return century+o[_y]; }
    return (is.n) ? -(o[_y]) : o[_y];
}
function lastDay(o) {
	var i = o[_m]-1; // leap years:
	return (i === 1 && new Date(o[_y], 1, 29).getMonth() == 1) ? last_dates[i]+1 : last_dates[i];
}
function blank(nowD,doSet){
	if (!nowD) { return {text: this.text.trim(), relativeTo:false, day:false, month:false, year:false, weekDay:false}; }
	return {
		text: this.text.trim(), relativeTo: false,
		day:get(nowD,_d,doSet), month:get(nowD,_m,doSet), year:get(nowD,_y,doSet), weekDay:get(nowD,_wd,doSet),
		Date: nowD||{}, to: false
	};
}
rules.fn = _.tokenFn(rules, 'short', 1);
rules.dayFirstFn = _.tokenFn(rules, 'dayFirst', 1);
rules.monthFirstFn = _.tokenFn(rules, 'monthFirst', 1);
rules.relativeFn = _.tokenFn(rules, 'relative', 1);
rules.relativeFns = {
	gregorian: function (o,i,summand,isNeg) {
		// super flexible, for all languages with gregorian calendar ! :
		var n = (1000/Math.pow(10, i));
		if (n>=1 && o.year) { o.year = Math.floor((isNeg ? o.year-n : o.year+n)/n)*n; return o; }
		var a = ['month','day','hour','minute']; // TODO goes to blank (object keys) when 'time' TODO is done
		var k = a[((+n).toFixed(a.length)).split(/(?:\.|1)/g)[1].length];
		var D = new Date(o.Date);
		D['set'+_methods[k]](D['get'+_methods[k]]() + (isNeg ? -(summand) : summand));
		return blank(D,1);
	},
	dictionary: function (o,i) { // sets known dates w. times (tommorrow evening)
		var a = [[1],[-1],[-1,22],[0,22],[0,22],[0,6],[0,12],[0,15],[0,18]];
		if (a[i][0]) { o.day += a[i][0]; }
		if (a[i][1]) { o.hour = a[i][1]; }
		return o;
	}
}
function hyphenatedDates(str, recover) {
	var i;
	for (i=0; i<2; i++) {
		var rule = rules.short[i].matches;
    var r = (recover) ? new RegExp(rule.source.replace(/\D\-/g, '_'), 'g') : new RegExp(rule.source, 'g');
    var find = (recover) ? /_/g : /\-/g, repl = (recover) ? '-' : '_', a;
    while ((a = r.exec(str)) !== null) {
      str = str.replace(a[0], a[0].replace(find, repl));
    }
	}
  return str;
}
function range(ranges) {
	var range = ranges[0];
	if (ranges.length > 1) {
		var o = {range:ranges[0], to:ranges[1]};
		if (!o.range[_m]) { o.range[_m] = o.to[_m]; }
		if (!o.range[_y]) { o.range[_y] = o.to[_y]; }
		if (!o.to[_m]) { o.to[_m] = o.range[_m]; }
		if (!o.to[_d]) { o.to[_d] = o.range[_d]; }
		range = o.range;
		range.to = o.to;
	}
	return range;
}
function index(a, st){
	var n = -1, i;
	for (i=st+1; i<a.length; i++){ if(a[i]) { return i-1-st; } }
}
function knows(matches) {
	if (matches.fn) { // usually *relative* dates
		var _o = _.mixin({text: matches.shift().trim()||matches.input}, blank(this.options.now,1));
		var isNeg = !!(matches[0]); // TODO suffixes
		var sum = ((matches[1]) ? parseInt(matches[1],10) : 1);
		var res = rules.relativeFns[matches.fn](_.shallow(_o), index(matches, 1), sum, isNeg);
		res.text = _o.text;
		if (matches.isRange || sum > 1) {
			if (isNeg) { res.to = _o; } else { _o.to = res; res = _o; }
		}
		res.relativeTo = this.options.now;
	} else { // usually *absolute* dates
		var _o = {text: matches.shift().trim()||matches.input};
		var res = matches.pattern.reduce(function(o,c,i) {
			if (!matches[i] || !_.str(matches[i])) { return o; }
			var n = parseInt(matches[i], 10);
			o[c] = (n) ? n : data.months[matches[i].toLowerCase()];
			return o;
		}, _.mixin(_o, blank()));
	}	
	this.parts = this.parts.concat(res);
	return res;
}
function postprocess(o, i) {
	if (!o.text || o.text.length < 3) { this.results[i] = false; return false; }
	// make sure date is in that month...
	if (o[_d] !== false && (o[_d] > 31 || (o[_m] !== false && o[_d] > lastDay(o)))) {
		return null;	
	}
	o.Date = set(o);
	// toISOString has crossbrowser issues and automatically 'fills', 
	// see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString#Polyfill - TODO ???
	// o.iso = o.Date.toISOString();
	o.localized = new Intl.DateTimeFormat(this.options.locale||lang, this.options.localized).format(o.Date);
	if (o.to) { 
		delete o.to.to;
		delete o.to.relativeTo
		o.to = JSON.parse(JSON.stringify(o.to));
		o.to.Date = set(o.to);
		if(o.to.Date) { 
			var hasToD = 1;
			o.localized = new Intl.DateTimeFormat(this.options.locale||lang, this.options.localized).format(o.to.Date);	
		}
	}
	if (o.Date && hasToD) { 
		// make sure to-date > date
		var toTooSmall = ((isFinite(o.Date.valueOf()) && isFinite(o.to.Date.valueOf())?(o.Date>o.to.Date)-(o.Date<o.to.Date):NaN) > -1);
		if (toTooSmall) { return blank(); }
	}
	if (o.Date && o[_d] && o[_m] && o[_y] && !o[_wd]) { o[_wd] = get(o.Date,_wd,1); }
	if (hasToD && o.to[_d] && o.to[_m] && o.to[_y] && !o.to[_wd]) { o.to[_wd] = get(o.to.Date,_wd,1); }
	return o;
}
function parseDate(w, i, a){
	w = hyphenatedDates(w, 1);
	function known() { // recursive rules
		['fn', 'relativeFn', 0].forEach(function(fn) {
			if (!fn) {
				var mdO = {month:w.search(rules[_m].w), day:w.search(rules[_d].nr)}; 
				fn = (mdO[_d] > -1 && mdO[_m] > -1 && mdO[_m] < mdO[_d]) ? 'monthFirstFn' : 'dayFirstFn';
			}
			var hasMatches = rules[fn](w);
			if (hasMatches && _.hasL(hasMatches.filter(_.str), 1)){
				var o = this.knows(hasMatches);
				if (o.text) { w = w.replace(o.text, ''); }
				known();
			}
		}.bind(this));
	}
	known.bind(this)();
	return this.parts;
}
function toDate(w, input, options){
	this.options = _.mixOptions(options, this.options, 'dates');
	if (!_.str(w)) { return blank(); }
	this.results = [];
	this.now = new Date();
	this._year = year;
	this.knows = knows;
	this.input = input;
	this.text = hyphenatedDates(w);
	if (!this.options.now) { this.options.now = this.now; }
	
	var ranges = this.text.split(rules.range).filter(_.str);
	var rL = _.hasL(ranges);
	if (rL) {
		this.parts = [];
		var multis = [];
		ranges = ranges.map(function(part) {
			var parts = part.split(rules.multi).filter(_.str);
			if (_.hasL(parts,1)) {
				part = parts.shift();
				multis = multis.concat(parts);
			}
			return part.trim();
		}).filter(_.str);
		if (rL < 2) {
			multis.unshift(ranges[0]);
		} else {
			if (rL > 2) { multis = multis.concat(ranges.slice(2)); }
			ranges.map(parseDate, this);	
			if (this.parts[0].to||this.parts[1].to) {
				this.results = this.results.concat(this.parts);
			} else {
				this.results = this.results.concat(range(this.parts));
			}
		}
		if (_.hasL(multis)) { 
			this.parts = [];
			multis.map(parseDate, this);	
			this.results = this.results.concat(this.parts);  
		}    
	}
	return this.results.map(postprocess, this).filter(_.obj);
}
function to_date(w){
	var wo = _.w_options.bind(this)(w);
	if (_.hasL(this.dates) && !wo.options.now) { return this.dates; }
	w = wo.w;
	if (!_.str(w)) { return []; }
	var cached = cache.get(wo.w, ['to_date', this.options||{}]);
	if (cached) { return cached; }
	var res = toDate(w, wo.w, wo.options).filter(_.obj);
	this.dates = (this.dates||[]).concat(res);
	this.dates.__proto__ = Object.create(Array.prototype);
	var text = wo.w;
	this.dates.forEach(function(o){ text = text.replace(o.text, o.localized) });
	this.dates.__proto__._text = text;
	this.dates.__proto__.text = function(){ return this._text; }
	return cache.set(wo.w, this.dates, ['to_date', this.options||{}]);
}
module.exports = to_date;

/* // TODO ??? we could fullfill month/year if 'multiple' dates - but that is maybe not bulletproof
// postprocess -->
var j;
if (!o[_y]) {
	for (j=i; j<this.results.length; j++){
		if (this.results[j][_y] && !(this.results[j].relativeTo)) { 
			o[_y] = this.results[j][_y]; break; }
	}
}
if (!o[_m]) {
	for (j=0; j<this.results.length; j++){
		if (this.results[j][_m] && !(this.results[j].relativeTo)) { o[_m] = this.results[j][_m]; break; }
	}	
}
*/
//tests.map(function(a){ return a[0]; }).forEach(to_date);
// TODO tests