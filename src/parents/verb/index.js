/**
 * wrapper module for verb's methods
 * @module src/parents/verb/index
 */
// TODO - maybe i18n type explanations like 'infinitive', 'present' etc., goes to schema
if (typeof lang != 'string') lang = 'en';
var dPath = '../../data/'+lang+'/';
var schema = require(dPath+'schema');
var special = require(dPath+'verbs/special');
var rules = require(dPath+'rules/verb');
var _ = require('../../_');
var cache = require('../../cache');
var conjugate = require('./conjugate');
function form() {
	for (var i = 0; i < schema._tenses.length; i++) {
		if (this.conjugated[schema._tenses[i]] === this.word) { return schema._tenses[i]; }
	}
	if (this.rulesDetect === 'future') { return this.rulesDetect; }
}
function tense() {
	if (this.rulesDetect === 'future') { return this.rulesDetect; }
	if (this.form === 'present' || this.form === 'past') { return this.form; }
	return 'present';
}
function which() {
	if (special.CP[this.word]) { return schema['CP']; }
	if (this.rulesDetect && this.rulesDetect in schema._tense) { return schema[schema._tense[this.rulesDetect]]; }
	return schema.getTense(this.form).tag;
}
// is this verb negative ?
function isNegative() {
	cached = cache.get(this.word, 'verbNeg');
	if (cached) { return cached; }
	var rulesN = (this.rulesDetect === 'negative');
	var isN = ( rulesN || ((special.MD[this.word] || special.CP[this.word]) && this.next && this.next.normalised === 'not') );
	return cache.set(this.word, isN, 'verbNeg');
}

exports.verb = function(str, sentence, word_i) {
  if (sentence !== undefined && word_i !== undefined) {
    this.next = sentence.tokens[word_i + i];
  }
  this.word = str || '';
	this.rulesDetect = rules.detect(this.word);	
	// .conjugated (maintaining its own cache for all conjugation forms)
	this.conjugated = (conjugate.bind(this))();
  // .form (current conjugation type)
	var cached = cache.get(str, 'verbForm');
	this.form = (cached) ? cached : cache.set(str, (form.bind(this))(), 'verbForm');
  // .tense (past/present/future)
	cached = cache.get(this.word, 'verbTense');
  this.tense = (cached) ? cached : cache.set(this.word, (tense.bind(this))(), 'verbTense');
  // .which - the most accurate part_of_speech
	cached = cache.get(this.word, 'verbWhich');
  this.which = (cached) ? cached : cache.set(this.word, (which.bind(this))(), 'verbWhich');
  return this;
}
// VERB core methods :
exports.verb.prototype.conjugate = function() { return this.conjugated; }
exports.verb.prototype.form = function() { return this.form; }
exports.verb.prototype.tense = function() { return this.tense; }
exports.verb.prototype.which = function() { return this.which; }
exports.verb.prototype.negative = isNegative;
// shorthands ...
exports.verb.prototype = _.sugarProto('to_', conjugate(), exports.verb.prototype);
module.exports = exports.verb;

// console.log(new Verb('will'))
// console.log(new Verb('stalking').tense)
