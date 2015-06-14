// nlp_comprimise by @spencermountain  in 2014

// most files are self-contained modules that optionally export for nodejs
// this file loads them all together
// if we're server-side, grab files, otherwise assume they're prepended already
// console.time('nlp_boot')

// init cache 1st
var cache = require('./src/cache');
// parents (word types) and methods
var parents = require("./src/parents");
var methods = require("./src/methods");
// part of speech tagging
var pos = require('./src/pos');
// named_entity_recognition
var spot = require('./src/spot');

console.log( 'nlp factory' );

// API
exports.nlp = {	
  noun: parents.noun,
  adjective: parents.adjective,
  verb: parents.verb,
  adverb: parents.adverb,
  value: parents.value,

  sentences: methods.sentence_parser,
  ngram: methods.ngram,
  tokenize: methods.tokenize,
  americanize: methods.americanize,
  britishize: methods.britishize,
  syllables: methods.syllables,
  normalize: methods.normalize.normalize,
  denormalize: methods.normalize.denormalize,
  pos: pos,
  spot: spot
}

// export it for client-side
if (typeof window !== "undefined") { // TODO - is this right?
  window.nlp = exports.nlp;
}


// export it for server-side
module.exports = exports.nlp;

// console.timeEnd('nlp_boot')
// console.log( nlp.pos('she sells seashells by the seashore').sentences[0].negate().text() )
// console.log( nlp.pos('i will slouch'));
// console.log( nlp.pos('Sally Davidson sells seashells by the seashore. Joe Biden said so.').people() )
