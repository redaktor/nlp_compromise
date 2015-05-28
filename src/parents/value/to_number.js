// converts spoken numbers into integers  'fifty seven point eight' -> 57.8
//
// Spoken numbers take the following format
// [sixty five] (thousand) [sixty five] (hundred) [sixty five]
// aka: [one/teen/ten] (multiple) [one/teen/ten] (multiple) ...
// combile the [one/teen/ten]s as 'current_sum', then multiply it by its following multiple
// multiple not repeat

var to_number = (function() {
  'use strict';
  // these sets of numbers each have different rules
  // [tenth, hundreth, thousandth..] are ambiguous because they could be ordinal like fifth, or decimal like one-one-hundredth, so are ignored
  // var decimal_multiple={'tenth':0.1, 'hundredth':0.01, 'thousandth':0.001, 'millionth':0.000001,'billionth':0.000000001};
	//::NODE::
  if (typeof module !== 'undefined' && module.exports) numbers = require('../../data/'+lang+'/numbers');
	//::
  var main = function(s) {
    var ones = numbers.ones;
		var tens = numbers.tens;
		var teens = numbers.teens;
		var multiple = numbers.multiple;
		//remember these concerns for possible errors
		var did = {ones:0, teens:0, tens:0, multiple: {}};
    var total = 0;
    var global_multiplier = 1;
      //pretty-printed numbers
    s = s.replace(/, ?/g, '');
    //parse-out currency
    s = s.replace(/[$£€]/, '');
    //try to finish-fast
    if (s.match(/[0-9]\.[0-9]/) && parseFloat(s) == s) {
			return parseFloat(s)
		}
		if (parseInt(s, 10) == s) {
			return parseInt(s, 10)
		}
    //try to die fast. (phone numbers or times)
    if (s.match(/[0-9][\-:][0-9]/)) {
      return null;
    }
    //support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5
    var mults = [{
      reg: /^(minus|negative)[\s\-]/i,
      mult: -1
    }, {
      reg: /^(a\s)?half[\s\-](of\s)?/i,
      mult: 0.5
    }, {
      reg: /^(a\s)?quarter[\s\-]/i,
      mult: 0.25
    }];
    for (i = 0; i < mults.length; i++) {
      if (s.match(mults[i].reg)) {
        global_multiplier = mults[i].mult;
        s = s.replace(mults[i].reg, '');
        break;
      }
    }

    //do each word in turn..
    var words = s.toString().split(/[\s\-]+/);
    var w, x;
    var current_sum = 0;
    var local_multiplier = 1;
    var decimal_mode = false;
    for (var i = 0; i < words.length; i++) {
      w = words[i];

      //skip 'and' eg. five hundred and twelve
      if (w == 'and') {continue}

      //..we're doing decimals now
      if (w == 'point' || w == 'decimal') {
        if (decimal_mode) {return null} //two point one point six
        decimal_mode = true;
        total += current_sum;
        current_sum = 0;
        did.ones = 0;
        local_multiplier = 0.1;
        continue;
      }

      //handle special rules following a decimal
      if (decimal_mode) {
        x = null;
        //allow consecutive ones in decimals eg. 'two point zero five nine'
        if (ones[w] !== undefined) {
					x = ones[w]
				}
				if (teens[w] !== undefined) {
					x = teens[w]
				}
        if (parseInt(w, 10) == w) {
					x = parseInt(w, 10)
				}
        if (!x) {return null}
        if (x < 10) {
          total += x * local_multiplier;
          local_multiplier = local_multiplier * 0.1; // next number is next decimal place
          current_sum = 0;
          continue;
        }
        //two-digit decimals eg. 'two point sixteen'
        if (x < 100) {
          total += x * (local_multiplier * 0.1);
          local_multiplier = local_multiplier * 0.01; // next number is next decimal place
          current_sum = 0;
          continue;
        }
      }

      //if it's already an actual number
      if (w.match(/^[0-9]\.[0-9]$/)) {
        current_sum += parseFloat(w);
        continue;
      }
      if (parseInt(w, 10) == w) {
        current_sum += parseInt(w, 10);
        continue;
      }

      //ones rules
      if (ones[w] !== undefined) {
				// eg. five seven OR five seventeen
        if (did.ones || did.teens) {return null} 
        did.ones = true;
        current_sum += ones[w];
        continue;
      }
      //teens rules
      if (teens[w]) {
				// eg. five seven OR fifteen seventeen OR sixty fifteen
        if (did.ones || did.teens || did.tens) {return null}
        did.teens = true;
        current_sum += teens[w];
        continue;
      }
      //tens rules
      if (tens[w]) {
				// eg. five seventy OR fiveteen seventy OR twenty seventy
        if (did.ones || did.teens || did.tens) {return null}
        did.tens = true;
        current_sum += tens[w];
        continue;
      }
      //multiple rules
      if (multiple[w]) {
        if (did.multiple[w]) {return null} // eg. five hundred six hundred
        did.multiple[w] = true;
        //reset our concerns. allow 'five hundred five'
        did.ones = false;
        did.teens = false;
        did.tens = false;
        //case of 'hundred million', (2 consecutive multipliers)
        if (current_sum === 0) {
          total = total || 1; //dont ever multiply by 0
          total *= multiple[w];
        } else {
          current_sum *= multiple[w];
          total += current_sum;
        }
        current_sum = 0;
        continue;
      }
      //if word is not a known thing now, die
      return null;
    }
    if (current_sum) {
			total += (current_sum || 1) * local_multiplier
		}
    //combine with global multiplier, like 'minus' or 'half'
    total = total * global_multiplier;

    return total;
  }

  //::NODE::
  if (typeof module !== 'undefined' && module.exports) module.exports = main;
	//::
  return main;
})()

// console.log(to_number('sixteen hundred'))
// console.log(to_number('a hundred'))
// console.log(to_number('four point seven seven'))
