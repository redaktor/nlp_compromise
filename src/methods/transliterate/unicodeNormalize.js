/**
 * a hugely-ignorant, and widely subjective transliteration <br>
 * of latin, cryllic, greek unicode characters to english ascii. <br>
 * http://en.wikipedia.org/wiki/List_of_Unicode_characters <br>
 * https://docs.google.com/spreadsheet/ccc?key=0Ah46z755j7cVdFRDM1A2YVpwa1ZYWlpJM2pQZ003M0E
 *
 * @module src/methods/transliteration/unicode_normalisation
 */
if (typeof lang != 'string') lang = 'en';
var normalisations = require('../../data/'+lang+'/rules/normalisations');

var normalize = function(str, options) {
	options = options || {};
	options.percentage = options.percentage || 50;
	var arr = str.split('').map(function(s) {
		var r = Math.random() * 100;
		if (normalisations.normaler[s] && r < options.percentage) {
			return normalisations.normaler[s] || s;
		} else {
			return s;
		}
	})
	return arr.join('');
}

var denormalize = function(str, options) {
	options = options || {};
	options.percentage = options.percentage || 50;
	var arr = str.split('').map(function(s) {
		var r = Math.random() * 100;
		if (normalisations.greek[s] && r < options.percentage) {
			return normalisations.greek[s] || s;
		} else {
			return s;
		}
	})
	return arr.join('');
}


module.exports = {
	normalize: normalize,
	denormalize: denormalize
}

// s = "ӳžŽżźŹźӳžŽżźŹźӳžŽżźŹźӳžŽżźŹźӳžŽżźŹź"
// s = "Björk"
// console.log(normalize.normalize(s, {
//   percentage: 100
// }))

// s = "The quick brown fox jumps over the lazy dog"
// console.log(normalize.denormalize(s, {
//   percentage: 100
// }))