// data index
var schema = require('./schema');
var multiples = require('./lexicon/multiples');
var nouns_inflect = require('./nouns/inflect');
var nouns = require('./nouns/index');
var verbs_special = require('./verbs/special');
var verbs_conjugate = require('./verbs/conjugate');
var verbs = require('./verbs/index');
var adjectives_decline = require('./adjectives/decline');
var adjectives_demonym = require('./adjectives/demonym');
var adjectives = require('./adjectives/index');
var adverbs_decline = require('./adverbs/decline');
var numbers = require('./lexicon/numbers');
var dates = require('./lexicon/dates');
var honorifics = require('./lexicon/honorifics');
var abbreviations = require('./lexicon/abbreviations');
var pos = require('./lexicon/pos');
var negate = require('./lexicon/negate');
var firstnames = require('./lexicon/firstnames');
var phrasalVerbs = require('./lexicon/phrasalVerbs');
var units = require('./units');

module.exports = {
  schema: schema,
  multiples: multiples,
  nouns_inflect: nouns_inflect,
  nouns: nouns,
  verbs_special: verbs_special,
  verbs_conjugate: verbs_conjugate,
  verbs: verbs,
  adjectives_decline: adjectives_decline,
  adjectives_demonym: adjectives_demonym,
  adjectives: adjectives,
  adverbs_decline: adverbs_decline,
  numbers: numbers,
  dates: dates,
  honorifics: honorifics,
  abbreviations: abbreviations,
  pos: pos,
  negate: negate,
  firstnames: firstnames,
  phrasalVerbs: phrasalVerbs,
  units: units
};