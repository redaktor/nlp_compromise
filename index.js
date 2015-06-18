/**
 * nlp_comprimise by @spencermountain in 2014
 * a Natural-Language-Processing library in Javascript, small-enough for the browser, and quick-enough to run on keypress -
 * it does tons of clever things. it's smaller than jquery, and scores 86% on the Penn treebank.
 * @module index
 * @param {object} options
 * @returns {object}
 * @summary Natural-Language-Processing library in .js
 */

// most files are self-contained modules that optionally export for nodejs
// this file loads them all together
// if we're server-side, grab files, otherwise assume they're prepended already
// let's init cache 1st
var cache = require('./src/cache');
// parents (word types) and methods
var parents = require('./src/parents');
var methods = require('./src/methods');
// part of speech tagging
var pos = require('./src/pos');
// named_entity_recognition
var spot = require('./src/spot');

/** nlp API */
exports.nlp = function(options) {
  this.pos = pos;
  this.spot = spot;
  this.adjective = parents.adjective;
  this.adverb = parents.adverb;
  this.noun = parents.noun;
  this.value = parents.value;
  this.verb = parents.verb;
  this.glue = parents.glue;
  this.sentences = methods.sentence_parser;
  this.ngram = methods.ngram;
  this.tokenize = methods.tokenize;
  this.americanize = methods.americanize;
  this.britishize = methods.britishize;
  this.syllables = methods.syllables;
  this.normalize = methods.normalize.normalize;
  this.denormalize = methods.normalize.denormalize;
	this.destroy = function() {
		cache.empty();	
	}
	return this;
}

// export it for client-side
if ((!module || !module.exports) && typeof window !== 'undefined') { // TODO - is this right?
  window.nlp = exports.nlp;
}

// export it for server-side
module.exports = exports.nlp;

// console.timeEnd('nlp_boot')
// console.log( nlp.pos('she sells seashells by the seashore').sentences[0].negate().text() )
// console.log( nlp.pos('i will slouch'));
// console.log( nlp.pos('Sally Davidson sells seashells by the seashore. Joe Biden said so.').people() )