/**
 * methods are classes performing standalone methods
 * @module src/methods/index
 */
// tokenization
var tokenize = require('./tokenize');
var sentencize = require('./tokenize/sentence');
var ngramize = require('./tokenize/ngram');
// normalization
var normalize = require('./transliterate/unicodeNormalize');
var syllabicate = require('./syllabicate');
// localization
var americanize = require('./localize/americanize');
var britishize = require('./localize/britishize');

module.exports = {
  sentence_parser: sentencize,
	tokenize: tokenize,
	ngram: ngramize,
	normalize: normalize,
	syllables: syllabicate,
	americanize: americanize,
	britishize: britishize
}