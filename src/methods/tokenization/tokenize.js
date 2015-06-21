/**
 * split a string into 'words' - as intended to be most helpful for this library.
 *
 * @module src/methods/tokenization/tokenize
 */
if (typeof lang != 'string') lang = 'en';
var multiples = require('../../data/'+lang+'/lexicon/multiples');
var sentence_parser = require('./sentence');

// these expressions ought to be one token, not two, because they are a distinct POS together
var multi_words = Object.keys(multiples).map(function(m) {
	return m.split(' ');
});

function normalise (str) {
	// TODO - does it handle all european languages?
	if (!str) { return ''; }
	str = str.toLowerCase();
	str = str.replace(/[,\.!:;\?\(\)]/, '');
	// single curly quotes
	str = str.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g, "'");
	// double curly quotes
	str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g, '"');
	if (!str.match(/[a-z0-9]/i)) { return '' }
	return str
}

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
		return normalise(a)
	}); // cached results
	
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

module.exports = function(str) {	
	var sentences = sentence_parser(str);
	return sentences.map(function(sentence) {
		var arr = sentence.split(' ');
		arr = combine_multiples(arr);
		var tokens = arr.map(function(w, i) {
			return {
				text: w,
				normalised: normalise(w),
				title_case: (w.match(/^[A-Z][a-z]/) !== null), //use for merge-tokens
				noun_capital: i > 0 && (w.match(/^[A-Z][a-z]/) !== null), //use for noun signal
				punctuated: (w.match(/[,;:\(\)']/) !== null) || undefined,
				end: (i === (arr.length - 1)) || undefined,
				start: (i === 0) || undefined
			}
		});
		
		return {
			sentence: sentence,
			tokens: tokens,
			type: sentence_type(sentence)
		}
	});
}
	
// console.log(tokenize('i live in new york')[0].tokens.length==4)
// console.log(tokenize('I speak optimistically of course.')[0].tokens.length==4)
// console.log(tokenize('Joe is 9')[0].tokens.length==3)
// console.log(tokenize('Joe in Toronto')[0].tokens.length==3)
// console.log(tokenize('I am mega-rich')[0].tokens.length==3)
