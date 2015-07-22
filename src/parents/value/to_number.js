/**
 * converts spoken numbers into integers <br>
 * e.g. 'fifty seven point eight' -> 57.8 <br><br>
 *
 * Spoken numbers take the following format <br>
 * [sixty five] (thousand) [sixty five] (hundred) [sixty five] <br>
 * aka: [one/teen/ten] (multiple) [one/teen/ten] (multiple) ... <br>
 * combine the [one/teen/ten]s as 'this.current_sum', then multiply it by its following multiple <br> <br>
 *
 * each set of numbers has different rules <br>
 * [tenth, hundreth, thousandth..] are ambiguous because they could be ordinal like fifth, or decimal like one-one-hundredth, so ignore <br>
 * @module src/parents/value/to_number
 */
if (typeof lang != 'string') lang = 'en';
var dPath = '../../data/'+lang+'/';
var data = require(dPath+'lexicon/numbers');
var rules = require(dPath+'rules/number');
var _ = require('../../_');
var cache = require('../../cache');
data.plus.push('\\+'); data.minus.push('\\-');
var _numerals = Object.keys(data.ones);
var dN = _numerals.concat(Object.keys(data.teens),Object.keys(data.tens),Object.keys(data.multiple),data.plus,data.minus,data.factors,data.decimal,'\\d+').join('|');
rules.multiple = new RegExp(['\\b',data.plus.join(' |\\b'),' (?=',dN,')'].join(''), 'i');
rules.multiEnd = new RegExp([' ',data.plus.join('|'),'(?= |$)'].join(''), 'gi');
rules.numeral = new RegExp(['(',dN,')+(?: |\\b|$)'].join(''), 'gi');
rules.float = /\d+ ?(\.|,) ?\d+/g;
//console.log(rules.multiEnd)
function set(t, w, multi, total) {
	if (t && w && (this.did.ones || this.did.teens)) { return null; }
	if (t && w && this.did.tens && t != 'ones') { return null; }
	if (total) { this.total += total; }
	if (t in this.did) { this.did[t] = (w); }
	if (!w) {
		this.current_sum = 0;
	} else {
		this.current_sum += (typeof t === 'string') ? data[t][w] : t;
	}
	if (multi) { this.local_multiplier = multi; }
	return true;
}
function wOrNum(num){
	num = num.replace(rules.multiEnd, ''); 
	var nrW = num.replace(/ /g,''), nr;
	if (rules.float.test(nrW)) {
		nr = parseFloat(nrW);
	} else {
		nr = parseInt(nrW, 10);
	}
	return (nr == nrW) ? nr : num;
}
function hasNumeral(w){	
	w = (this.word||w||' ').trim();
	if (!_.str(w)) { return null; }	
	var a = [[]], signs = ['+','-',',','.'], id;
	var numerals = w.split(rules.numeral).filter(_.str);
	for (id=0; id<numerals.length; id++){
	  if (id === numerals.length-1 && !(rules.numeral.test(numerals[id]))) { break; }
		if (/\W/.test(numerals[id].slice(-1)) && signs.indexOf(numerals[id]) < 0 ) { 
			a.push([]);
		} else {
			a[a.length-1].push(numerals[id]);
		} 
	}
	return a.map(function(_a){ return _a.join(' '); }).filter(_.str).map(wOrNum);
}

function numeral2number(s, j, a) {
	if (typeof s === 'number') { return this.numbers.push({text:s.toString(), number:s}); }
	s = s.trim();
	// remember these concerns for possible errors
	this.did = {ones:0, teens:0, tens:0};
	this.didMultiple = {};
	this.current_sum = 0;
	this.local_multiplier = 1;
	this.multiplier = 1;
	this.total = 0;
	var i, w, n;
	var decimalMode = false;
	// support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5
	for (i = 0; i < rules.factors.length; i++) {
		var hasMatch = s.match(rules.factors[i].reg)
		if (hasMatch) {
			if (s === hasMatch[0]) { return this.numbers.push(rules.factors[i].mult); }
			this.multiplier = rules.factors[i].mult;
			s = s.replace(rules.factors[i].reg, '');
			break;
		}
	}
	// do each word in turn..
	var words = s.split(/[ \-]+/);
	checkWords: for (i = 0; i < words.length; i++) {
		w = words[i];
		// phone numbers or iso date or times ... already number but ambiguous, '-' could mean minus;
		// TODO - splits to values (e.g. phone) or dates !!!
		if (w.match(/[0-9][\-:][0-9]/)) { continue; }
		// skip 'a' e.g. a hundred
		if (w === 'a') { continue; } // TODO decouple, is already 'infinite article'
		if (data.decimal.indexOf(w) > -1) {
			 //... we're doing decimals now
			if (decimalMode) { continue; } // two point one point six
			decimalMode = true;
			this.set('ones', 0, 0.1, this.current_sum);
			continue;
		}
		// handle special rules following a decimal
		if (decimalMode) {
			n = null;
			// allow consecutive ones in decimals eg. 'two point zero five nine'
			if (data.ones[w] !== undefined) { n = data.ones[w]; }
			if (data.teens[w] !== undefined){ n = data.teens[w]; }
			if (parseInt(w, 10) == w) {	n = parseInt(w, 10); }
			if (!n) { continue; }
			if (n < 10) {
				this.set('special', 0, this.local_multiplier*0.1, this.local_multiplier*n);
				continue;
			}
			// two-digit decimals eg. 'two point sixteen'
			if (n < 100) {
				this.set('special', 0, this.local_multiplier*0.01, (this.local_multiplier*0.1)*n);
				continue;
			}
		}
		for(var k in this.did){
			// ones rules, e.g. five seven OR five seventeen
			// teens rules, e.g. five seven OR fifteen seventeen OR sixty fifteen
			// tens rules, e.g. five seventy OR fiveteen seventy OR twenty seventy
			if (data[k].hasOwnProperty(w)) {
				if (this.set(k, w)) { 
					continue checkWords; 
				} else { 
					break checkWords; 
				}
			}
		};
		// multiple rules
		if (data.multiple[w]) {
			if (this.didMultiple[w]) { break checkWords; } // eg. five hundred six hundred
			this.didMultiple[w] = true;
			// reset our concerns. allow 'five hundred five'
			for(var k in this.did){ this.did[k] = false; }
			// case of 'hundred million', (2 consecutive multipliers)
			if (this.current_sum === 0) {
				this.total = this.total || 1; //dont ever multiply by 0
				this.total *= data.multiple[w];
			} else {
				this.current_sum *= data.multiple[w];
				this.total += this.current_sum;
			}
			this.current_sum = 0;
			continue;
		} // if word is not a known thing now, continue checkWords ...
	}
	if (this.current_sum) {
		this.total += (this.current_sum || 1) * this.local_multiplier
	}
	var prev = this.numbers[this.numbers.length-1];
	// combine with global multiplier, like 'minus' or 'half'
	if (prev && prev < this.total) {
		this.numbers[this.numbers.length-1] = Math.abs(prev)*this.total;
		// only add this if there was an ' and ' before
		this.total = (this.numeral[j-1]) ? this.total*this.multiplier : 0;
	} else {
		this.total = this.total * this.multiplier;
	}
	
	var isNeg = rules.negative.test(s);
	return this.numbers.push({text:s, number: (isNeg) ? -(this.total) : this.total});
}
function toNumber(w) {
	if (_.hasL(this.numbers)) { return this.numbers; }
	var wo = _.w_options.bind(this)(w);
	w = wo.w, options = wo.options;
	this.options = _.mixOptions(options, this.options, 'numbers');
	if (!_.str(w)) { return null; }
	// pretty-printed numbers and parse-out currency
	var input = w, i;
	var cached = cache.get(input, 'number');
	if (cached) { return cached; }
	this.set = set;
	w = w.trim().toLowerCase(); //.replace(/, ?/g, '').replace(/[$£€]/, '').replace(rules.negative, ''); // ! TODO !!!
	var numerals = this.numerals || hasNumeral(w);
	console.log( '!!', numerals );
	if (!_.hasL(numerals)) { return []; }
	for (i=0; i<numerals.length; i++) {
		this.numeral = (typeof numerals[i] == 'number') ? [numerals[i]] : numerals[i].split(rules.multiple);
		this.numeral.map(numeral2number, this);
	}
	var nrText = input;
	this.numbers.map(function(o){
		var a = o.text.split(' ');
		var r = new RegExp(((a.length === 1) ? ['(',a[0],')'] : ['(',a[0],'(.*)',a[a.length-1],')']).join(''),'i');
		nrText = nrText.replace(r, o.number.toString())		
	});
	this.numbers.__proto__ = Object.create(Array.prototype);
	this.numbers.__proto__._text = nrText;
	this.numbers.__proto__.text = function(){ return this._text; }
	return cache.set(input, this.numbers, 'number');
}
toNumber.prototype.hasNumeral = hasNumeral;

module.exports = toNumber;
// console.log(to_number('sixteen hundred'))
// console.log(to_number('a hundred'))
// console.log(to_number('four point seven seven'))