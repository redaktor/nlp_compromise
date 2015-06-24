/**
 * converts spoken numbers into integers <br>
 * e.g. 'fifty seven point eight' -> 57.8 <br><br>
 *
 * Spoken numbers take the following format <br>
 * [sixty five] (thousand) [sixty five] (hundred) [sixty five] <br>
 * aka: [one/teen/ten] (multiple) [one/teen/ten] (multiple) ... <br>
 * combine the [one/teen/ten]s as 'this.current_sum', then multiply it by its following multiple <br> <br>
 *
 * these sets of numbers each have different rules <br>
 * [tenth, hundreth, thousandth..] are ambiguous because they could be ordinal like fifth, or decimal like one-one-hundredth, so ignore <br>
 * @module src/parents/value/to_number
 */
var numbers = require('../../data/'+lang+'/lexicon/numbers');
var cache = require('../../cache');
// TODO DECOUPLE
var negativeReg = /^(-|minus|negative)[\s\-]/i;
var factors = [{
	reg: /\b(a)?(one-)?(\s)?half([\s\-])?(of\s)?/i,
	mult: 0.5
}, {
	reg: /\b(a)?(one-)?(\s)?quarter([\s\-])?(of\s)?/i,
	mult: 0.25
}];
function checkNum(s) {
	// try to finish-fast
	if (s.match(/[0-9]\.[0-9]/) && parseFloat(s) == s) {
		return parseFloat(s);
	}
	if (parseInt(s, 10) == s) {
		return parseInt(s, 10);
	}
}
function setParams(t, w, multi, total) {
	if (t && w && (this.did.ones || this.did.teens)) { return null; }
	if (t && w && this.did.tens && t != 'ones') { return null; }
	if (total) { this.total += total; }
	if (t in did) { this.did[t] = (w); }
	if (!w) {
		this.current_sum = 0;
	} else {
		this.current_sum += (typeof t === 'string') ? numbers[t][w] : t;
	}
	if (multi) { this.local_multiplier = multi; }
	return true;
}
function numeral2number(s, j, a) {
	s = s.toString().trim();
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
	for (i = 0; i < factors.length; i++) {
		var hasMatch = s.match(factors[i].reg)
		if (hasMatch) {
			if (s === hasMatch[0]) { return this.numbers.push(factors[i].mult); }
			this.multiplier = factors[i].mult;
			s = s.replace(factors[i].reg, '');
			break;
		}
	}	
	// do each word in turn..
	var words = s.split(/[\s\-]+/);

	checkWords: for (i = 0; i < words.length; i++) {
		w = words[i];
		// skip 'a' e.g. a hundred
		if (w === 'a') { continue; }
		var nr = checkNum(w);
		if (typeof nr === 'number') { 
			this.numbers.push(nr);
			continue;
		}
		if (w == 'point' || w == 'decimal') {
			 //... we're doing decimals now
			if (decimalMode) { continue; } // two point one point six
			decimalMode = true;
			this.setParams('ones', 0, 0.1, this.current_sum);
			continue;
		}
		// handle special rules following a decimal
		if (decimalMode) {
			n = null;
			// allow consecutive ones in decimals eg. 'two point zero five nine'
			if (numbers.ones[w] !== undefined) { n = numbers.ones[w]; }
			if (numbers.teens[w] !== undefined){ n = numbers.teens[w]; }
			if (parseInt(w, 10) == w) {	n = parseInt(w, 10); }
			if (!n) { continue; }
			if (n < 10) {
				this.setParams('special', 0, this.local_multiplier*0.1, this.local_multiplier*n);
				continue;
			}
			// two-digit decimals eg. 'two point sixteen'
			if (n < 100) {
				this.setParams('special', 0, this.local_multiplier*0.01, (this.local_multiplier*0.1)*n);
				continue;
			}
		}
		// if it's already an actual number
		if (w.match(/^[0-9]\.[0-9]$/)) { this.setParams(parseFloat(w)); continue; }
		if (parseInt(w, 10) == w) { this.setParams(parseInt(w, 10)); continue; }
		for(var k in did){
			// ones rules, e.g. five seven OR five seventeen
			// teens rules, e.g. five seven OR fifteen seventeen OR sixty fifteen
			// tens rules, e.g. five seventy OR fiveteen seventy OR twenty seventy
			if (numbers[k].hasOwnProperty(w)) {
				if (this.setParams(k, w)) { continue checkWords; } else { return null; }
			}
		};
		// multiple rules
		if (numbers.multiple[w]) {
			if (this.didMultiple[w]) { return null; } // eg. five hundred six hundred
			this.didMultiple[w] = true;
			//reset our concerns. allow 'five hundred five'
			for(var k in did){ did[k] = false; }
			//case of 'hundred million', (2 consecutive multipliers)
			if (this.current_sum === 0) {
				this.total = this.total || 1; //dont ever multiply by 0
				this.total *= numbers.multiple[w];
			} else {
				this.current_sum *= numbers.multiple[w];
				this.total += this.current_sum;
			}
			this.current_sum = 0;
			continue;
		}
		//if word is not a known thing now, die
		return null;
	}
	if (this.current_sum) {
		this.total += (this.current_sum || 1) * this.local_multiplier
	}
	var prev = this.numbers[this.numbers.length-1];
	// combine with global multiplier, like 'minus' or 'half'
	if (prev && prev < this.total) {
		this.numbers[this.numbers.length-1] = Math.abs(prev)*this.total;
		// only add this if there was an ' and ' before
		this.total = (this.strings[j-1]) ? this.total*this.multiplier : 0;
	} else {
		this.total = this.total * this.multiplier;
	}
	return this.numbers.push(this.total);
}

module.exports = function(s) {
	var input = s;
	var cached = cache.get(input, 'number');
	if (cached) {
		return cached;
	}
	this.isNegative = s.match(negativeReg);
	// pretty-printed numbers and parse-out currency
	s = s.trim().toLowerCase().replace(/, ?/g, '').replace(/[$£€]/, '').replace(negativeReg, '');
	var nr = checkNum(s);
	if (typeof nr === 'number') { return nr; }
	// already number, phone numbers or times
	if (s.match(/[0-9][\-:][0-9]/)) { return null; }
	this.setParams = setParams;
	this.numeral2number = numeral2number;
	// split the string by the + words // e.g. 'and a', 'and'
	this.strings = s.split(/\band\b/);
	this.numbers = [];
	this.strings.forEach(this.numeral2number);
	if (!(this.numbers.length)) { return null; }
	this.numbers = this.numbers.filter(function(n) { return n; });
	var result = (this.numbers.length < 2) ? this.numbers[0] : this.numbers.reduce(function(a, b) { return a + b; });
	return cache.set(input, this.isNegative ? -(result) : result, 'number');
}

// console.log(to_number('sixteen hundred'))
// console.log(to_number('a hundred'))
// console.log(to_number('four point seven seven'))