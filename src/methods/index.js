/**
 * methods are classes performing standalone methods
 * @module src/methods/index
 */
// tokenization
var sentence_parser = require('./tokenization/sentence');
var tokenize = require('./tokenization/tokenize');
var ngram = require('./tokenization/ngram');
// normalization
var normalize = require('./transliteration/unicode_normalisation');
var syllables = require('./syllables');
// localization
var americanize = require('./localization/americanize');
var britishize = require('./localization/britishize');

module.exports = {
  sentence_parser: sentence_parser,
	tokenize: tokenize,
	ngram: ngram,
	normalize: normalize,
	syllables: syllables,
	americanize: americanize,
	britishize: britishize
}