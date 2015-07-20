/**
 * wrapper module for noun's methods
 * @module src/parents/noun/index
 */
if (typeof lang != 'string') lang = 'en';
var dPath = '../../data/'+lang+'/';
var schema = require(dPath+'schema');
var firstnames = require(dPath+'lexicon/firstnames');
var honorifics = require(dPath+'lexicon/honorifics');
var nouns = require(dPath+'nouns');
var rules = require(dPath+'rules/noun');
var _ = require('../../_');
var cache = require('../../cache');
var inflect = require('./inflect');

function which() {
	// check language rules for other tags, yet only possessive noun
	var hasMatch = rules.which(this.word);
	if (hasMatch) { return hasMatch; };
	// plural - TODO (?), was commented out in original
	if (this.is_plural) { return schema['NNS'] }
	// singular
	return schema['NN'];
}
//
function article(w) {
	w = this.word || w;
	if (!w) { return null; }
	if (this.is_plural()) return rules.article.plural;
	// explicit irregular forms
	var article;
	for (article in rules.article.irregular) {
		if (rules.article.irregular[article].hasOwnProperty(w)) { return article; }
	}
	// 'correction' function, e.g. acronyms
	var corrected = rules.article.fn.bind(this)();
	if (corrected) return corrected;
	// rules
	for (article in rules.article.regex) {
		for (var i = 0; i < rules.article.regex[article].length; i++) {
			if (w.match(rules.article.regex[article][i])) { return article; }
		}
	}
	return rules.article.fallback;
}
//
function _isAcronym(w) {
	w = w || this.word; //!
	// no periods and with periods
	return ((w.length <= 5 && w.match(/^[A-Z]*$/)) || (w.length >= 4 && w.match(/^([A-Z]\.)*$/)));
}
//
function isEntity() {
	if (!this.token) { return false; }
	var w = this.token.normalised;
	// nonsense, prepositions or blacklisted
	if (w.length < 3 || !w.match(/[a-z]/i || nouns.prps[w] || nouns.entityBlacklist[w])) { return false; }
	// discredit specific nouns forms
	if (this.token.pos) {
		var tag = this.token.pos.tag;
		if (tag == 'NNA' || tag == 'NNO' || tag == 'NNG') { return false; } // eg. 'singer', "spencer's" or 'walking'
		if (tag == 'NNP') { return true; } // yes! eg. 'Edinburough'
	}
	// distinct capitals or multiple-word nouns or abbrev. (like 'business ltd.'), very good signal
	if (this.token.noun_capital || w.match(/(\s|\.)/)) { return true; }
	// appears to be a non-capital acronym, and not just caps-lock, acronyms are a-ok
	if (this.is_acronym()||_isAcronym(this.token.text)) { return true; }
	// else, be conservative
	return false;
}
//
function isPerson() {
	// uses common first-name list + honorifics to guess if this noun is the name of a person
	var i;
	// remove things that are often named after people
	for (i = 0; i < nouns.personBlacklist.length; i++) {
		if(this.word.match(new RegExp('\\b' + nouns.personBlacklist[i] + '\\b','i'))) { return false; }
	}
	// see if noun has an honourific, like 'jr.'
	for (i = 0; i < honorifics.length; i++) {
		if (this.word.match(new RegExp('\\b' + honorifics[i] + '\\.?\\b', 'i'))) { return true; }
	}
	// see if noun has a first-name (or test middle name too, if there's one)
	var names = _.toNames(this.word);
	if ((firstnames[names[0]]) || (names.length > 2 && firstnames[names[1]])) {
		return true;
	}
	// if it has an initial between two words
	if(this.word.match(/[a-z]{3,20} [a-z]\.? [a-z]{3,20}/i)) { return true; }
	return false;
}
//
function pronoun(){
	// decides if it deserves a he, she, they, or it
	// if it's a person try to classify male / female
	if(this.is_person()){
		var nameType = function(t) { 
			return (firstnames[names[0]] === t || firstnames[names[1]] === t); 
		}
		var names = _.toNames(this.word);
		if (nameType('m')) { return rules.gender.male; }
		if (nameType('f')) { return rules.gender.female; }
		// test some honorifics
		var hasMatch = rules.gender.to(this.word);
		if (hasMatch) return hasMatch;
		// if it's a known unisex name, don't try guess it. be safe.
		if(nameType('a')) { return rules.gender.fallbackNames; }
		// if we think it's a person, but still don't know the gender, do a little guessing
		hasMatch = rules.gender.names(this.word);
		if (hasMatch) return hasMatch;
		// fallback to 'singular-they'
		return rules.gender.fallbackNames;
	}
	// not a person
	if(this.is_plural()){ return rules.gender.fallbackPlural; }
	return rules.gender.fallback;
}
//
function referencedBy() { // TODO - empire style self reflexives like (his|her|your) + (royal|majesty|highness|spyness|lordship|ladyship) :
	// list of pronouns that refer to this named noun. "[obama] is cool, [he] is nice."
	// if it's named-noun, look forward for the pronouns pointing to it -> '... he'
	if(this.token && this.token.pos.tag !== 'PRP' && this.token.pos.tag !== 'PP'){
		var prp = this.pronoun();
		// look at rest of sentence
		var interested = this.sentence.tokens.slice(this.i+1, this.sentence.tokens.length);
		// add next sentence too, could go further..
		if(this.sentence.next){
			interested = interested.concat(this.sentence.next.tokens);
		}
		// find the matching pronouns, and break if another noun overwrites it
		var matches = [], i;
		for (i = 0; i < interested.length; i++){
			if(interested[i].pos.tag === 'PRP' && (interested[i].normalised === prp || nouns.ppRefs[interested[i].normalised] === prp)) {
				// this pronoun points at our noun
				matches.push(interested[i]);
			} else if(interested[i].pos.tag === 'PP' && nouns.ppRefs[interested[i].normalised] === prp) {
				// this posessive pronoun ('his/her') points at our noun
				matches.push(interested[i]);
			} else if(interested[i].pos.parent === 'noun' && interested[i].analysis.pronoun() === prp) {
				// this noun stops our further pursuit
				break;
			}
		}
		return matches;
	}
	return [];
}
//
function referenceTo() {
	// a pronoun that points at a noun mentioned previously '[he] is nice'
	// if it's a pronoun, look backwards for the first mention '[obama]... <-.. [he]'
	if (this.token && (this.token.pos.tag === 'PRP' || this.token.pos.tag === 'PP')) {
		var prp = this.token.normalised;
		// support possessives
		if(nouns.ppRefs.hasOwnProperty(prp)){ prp = nouns.ppRefs[prp]; }
		// look at starting of this sentence
		var interested = this.sentence.tokens.slice(0, this.i);
		// add previous sentence, if applicable
		if(this.sentence.last){
			interested = this.sentence.last.tokens.concat(interested);
		}
		var i = interested.length;
		while(i--) {
			if(interested[i].pos.parent === 'noun' && interested[i].pos.tag !== 'PRP' && interested[i].analysis.pronoun() === prp){
				return interested[i]; // it's a match
			}
		}
	}
}

exports.noun = function(str, sentence, word_i) {
  this.word = str || '';
  if(sentence !== undefined && word_i !== undefined){
		this.i = word_i;
		this.sentence = sentence;
		this.token = sentence.tokens[word_i];
  }
  // specifically which pos it is
  this.which = (which.bind(this))();
  return this;
}
exports.noun.prototype.is_acronym = _isAcronym;
exports.noun.prototype.is_entity = isEntity;
exports.noun.prototype.is_person = isPerson;
exports.noun.prototype.referenced_by = referencedBy;
exports.noun.prototype.reference_to = referenceTo;
exports.noun.prototype.article = article;
exports.noun.prototype.conjugate = inflect.inflect;
exports.noun.prototype.is_plural = inflect.isPlural;
exports.noun.prototype.pluralize = inflect.pluralize;
exports.noun.prototype.singularize = inflect.singularize;
exports.noun.prototype.pronoun = pronoun;

module.exports = exports.noun;

// console.log(new Noun('farmhouse').is_entity())
// console.log(new Noun('FBI').is_acronym())
// console.log(new Noun('Tony Danza').is_person())
// console.time('h')
// console.log(new Noun('Tonys h. Danza').is_person())
// console.timeEnd('h')
