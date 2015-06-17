// data index
var multiples = require('./multiples');
var nouns_inflect = require('./nouns_inflect');
var nouns = require('./nouns');
var verbs_special = require('./verbs_special');
var verbs_conjugate = require('./verbs_conjugate');
var verbs = require('./verbs');
var adjectives_decline = require('./adjectives_decline');
var adjectives_demonym = require('./adjectives_demonym');
var adjectives = require('./adjectives');
var adverbs_decline = require('./adverbs_decline');
var numbers = require('./numbers');
var dates = require('./dates');
var honorifics = require('./honorifics');
var abbreviations = require('./abbreviations');
var pos_data = require('./pos_data');
var negate_data = require('./negate_data');
var firstnames = require('./firstnames');
var normalisations = require('./normalisations');
var suffixes = require('./suffixes');
var phrasalVerbs = require('./phrasalVerbs');
var pos_rules = require('./pos_rules');
var sentence_rules = require('./sentence_rules');
var verb_rules = require('./verb_rules');
var word_rules = require('./word_rules');
var schema = require('./schema');

module.exports = {
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
  pos_rules: pos_rules,
  sentence_rules: sentence_rules,
  verb_rules: verb_rules,
  word_rules: word_rules,
  schema: schema
};