/**
 * split a string into 'words' - as intended to be most helpful for this library.
 *
 * @module src/methods/tokenization/tokenize
 */
if (typeof lang != 'string') lang = 'en';
var multiples = require('../../data/'+lang+'/lexicon/multiples');
var _ = require('../../_');
var sentence_parser = require('./sentence');
// constant regexes
var r = {
	C: /^[A-Z][a-z]/,
	p: /[\.,;:\(\)']/,
	int: /[0-9\.,\/]/
};
// these expressions ought to be one token, not two, because they are a distinct POS together
var multi_words = Object.keys(multiples).map(function(m) {
	return m.split(' ');
});
function sentence_type(sentence) {
	if (sentence.match(/\?$/)) {
		return 'interrogative';
	} else if (sentence.match(/\!$/)) {
		return 'exclamative';
	}
	return 'declarative';
}
// some multi-word tokens should be combined here
function combine_multiples(arr) {
	var better = [];
	var normalised = arr.map(function(a){
		return _.normalise(a)
	}); // TODO cached results
	arr.forEach(function(w, i) {
		for (var o = 0; o < multi_words.length; o++) {
			if (arr[i + 1] && normalised[i] === multi_words[o][0] && normalised[i+1] === multi_words[o][1]) { 
				// we have a match
				arr[i] = w + ' ' + arr[i + 1];
				arr[i + 1] = null;
				break;
			}
		}
		better.push(arr[i]);
	});
	return better.filter(function(w) { return w; })
}
function toTokens(w, i, a) {
	var title_cases = (w.match(r.C)||[]).filter(_.str);
	var punctuations = (w.match(r.p)||[]).filter(_.str);
	var int = (w.match(r.int)||[]).filter(_.str);
	var is0 = (0 === i);
	var tc = _.hasL(title_cases);
	return {
		text: w.trim(),
		normalised: _.normalise(w),
		title_case: tc,
		noun_capital: (!(is0) && tc), //use for noun signal
		punctuated: (_.hasL(punctuations)) ? punctuations[0] : false,
		integer: (_.hasL(int)) ? parseInt(int[0], 10) : false,
		end: (i === (a.length - 1)),
		start: is0
	}
}

module.exports = function(str, isSentence) {
	var a = (isSentence ? [str] : sentence_parser(str));
	a = a.map(function(sentence) {
		var words = sentence.split(/\s/g);
		var tokens = combine_multiples(words).filter(_.str).map(toTokens);
		return {
			sentence: sentence,
			tokens: tokens,
			type: sentence_type(sentence)
		}
	});
	return isSentence ? a[0] : a;
}
	
// console.log(tokenize('i live in new york')[0].tokens.length==4)
// console.log(tokenize('I speak optimistically of course.')[0].tokens.length==4)
// console.log(tokenize('Joe is 9')[0].tokens.length==3)
// console.log(tokenize('Joe in Toronto')[0].tokens.length==3)
// console.log(tokenize('I am mega-rich')[0].tokens.length==3)
