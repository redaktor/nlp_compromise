var multiples = require('./multiples.js');
var nouns_inflect = require('./nouns_inflect.js');
var nouns = require('./nouns.js');
var verbs_special = require('./verbs_special.js');
var verbs_conjugate = require('./verbs_conjugate.js');
var verbs = require('./verbs.js');
var adjectives_decline = require('./adjectives_decline.js');
var adjectives_demonym = require('./adjectives_demonym.js');
var adjectives = require('./adjectives.js');
var adverbs_decline = require('./adverbs_decline.js');
var numbers = require('./numbers.js');
var dates = require('./dates.js');
var honorifics = require('./honorifics.js');
var abbreviations = require('./abbreviations.js');
var pos_data = require('./pos_data.js');
var negate_data = require('./negate_data.js');
var firstnames = require('./firstnames.js');
var normalisations = require('./normalisations.js');
var suffixes = require('./suffixes.js');
var phrasalVerbs = require('./phrasalVerbs.js');
var verb_rules = require('./verb_rules.js');
var word_rules = require('./word_rules.js');
var schema = require('./schema.js');

exports.zip = {
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
  pos_data: pos_data,
  negate_data: negate_data,
  firstnames: firstnames,
  normalisations: normalisations,
  suffixes: suffixes,
  phrasalVerbs: phrasalVerbs,
  verb_rules: verb_rules,
  word_rules: word_rules,
  schema: schema
};
module.exports = exports.zip;