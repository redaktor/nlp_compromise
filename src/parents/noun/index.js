// wrapper for noun's methods
var Noun = function(str, sentence, word_i) {
	
	//::NODE::
  if (typeof module !== 'undefined' && module.exports) {
		if (typeof lang != 'string') lang = 'en';
		var dPath = '../../data/'+lang+'/';
		indefinite_article = require('./indefinite_article');
		schema = require(dPath+'schema');
    firstnames = require(dPath+'firstnames');
		honourifics = require(dPath+'honorifics');
		nouns = require(dPath+'nouns');
		nouns_inflect = require(dPath+'nouns_inflect');
  }
	//::
	
  var the = this;
  var token, next;
  if(sentence!==undefined && word_i!==undefined){
    token=sentence.tokens[word_i];
    next=sentence.tokens[word_i+i];
  }
  the.word = str || '';

	
  the.is_acronym = function() {
    var s = the.word
    // no periods
    if (s.length <= 5 && s.match(/^[A-Z]*$/)) {
			return true;
		}
		// with periods
    if (s.length >= 4 && s.match(/^([A-Z]\.)*$/)) {
			return true;
		}
    return false;
  }

  the.is_entity = function() {
    if (!token) {return false}
    if (token.normalised.length < 3 || !token.normalised.match(/[a-z]/i)) {return false}
    // prepositions
    if (nouns.prps[token.normalised]) {return false}
    // blacklist
    if (nouns.entityBlacklist[token.normalised]) {return false}
    // discredit specific nouns forms
    if (token.pos) {
      if (token.pos.tag == 'NNA') {return false}
      if (token.pos.tag == 'NNO') {return false}
      if (token.pos.tag == 'NNG') {return false}
      if (token.pos.tag=='NNP') {return false}
    }
    // distinct capital is very good signal
    if (token.noun_capital) {return true}
    // multiple-word nouns are very good signal
    if (token.normalised.match(/ /)) {return true}
    // if it has an acronym/abbreviation, like 'business ltd.'
    if (token.normalised.match(/\./)) {return true}
    // appears to be a non-capital acronym, and not just caps-lock
    if (token.normalised.length < 5 && token.text.match(/^[A-Z]*$/)) {return true}
    // acronyms are a-ok
    if (the.is_acronym()) {return true}
    //else, be conservative
    return false;
  }

  the.conjugate = function() {
    return nouns_inflect.inflect(the.word);
  },

  the.is_plural = function() {
    return nouns_inflect.is_plural(the.word);
  }

  the.article = function() {
    return (the.is_plural()) ? "the" : indefinite_article(the.word);
  }

  the.pluralize = function() {
    return nouns_inflect.pluralize(the.word);
  }

  the.singularize = function() {
    return nouns_inflect.singularize(the.word);
  }

  // uses common first-name list + honourifics to guess if this noun is the name of a person
  the.is_person = function() {
    var i;
    //remove things that are often named after people
    var l = nouns.personBlacklist.length;
    for (i = 0; i < l; i++) {
      if(the.word.match(new RegExp('\\b' + nouns.personBlacklist[i] + '\\b','i'))) {return false}
    }
      //see if noun has an honourific, like 'jr.'
    l = honourifics.length;
    for (i = 0; i < l; i++) {
      if (the.word.match(new RegExp('\\b' + honourifics[i] + '\\.?\\b', 'i'))) {return true}
    }
    //see if noun has a first-name
    var names = Object.keys(firstnames)
    l = names.length
    var firstname=the.word.split(' ')[0].toLowerCase()
    for (i = 0; i < l; i++) {
      if (names[i]===firstname) {return true}
    }
    //if it has an initial between two words
    if(the.word.match(/[a-z]{3,20} [a-z]\.? [a-z]{3,20}/i)) {return true}
    return false;
  }

  // decides if it deserves a he, she, they, or it
  the.pronoun = function(){
    //if it's a person try to classify male/female
    if(the.is_person()){
			var nameType = function(t) { return (firstnames[names[0]]===t || firstnames[names[1]]==t); }
      var names=the.word.split(' ').map(function(a){
        return a.toLowerCase();
      })
      if (nameType('f')) {return 'she'}
      if (nameType('m')) {return 'he'}
      //test some honourifics
      if (the.word.match(/^(mrs|miss|ms|misses|mme|mlle)\.? /,'i')) {return 'she'}
      if (the.word.match(/\b(mr|mister|sr|jr)\b/,'i')) {return 'he'}
      //if it's a known unisex name, don't try guess it. be safe.
      if(nameType('a')) {return 'they'}
      //if we think it's a person, but still don't know the gender, do a little guessing
			//if it ends in a 'ee or ah', female
      if (names[0].match(/[aeiy]$/)) {return 'she'}
			//if it ends in a 'oh or uh', male
      if (names[0].match(/[ou]$/)) {return 'he'}
      //if it has double-consonants, female
      if(names[0].match(/(nn|ll|tt)/)){
        return 'she';
      }
      //fallback to 'singular-they'
      return 'they';
    }

    //not a person
    if(the.is_plural()){
      return 'they';
    }

    return 'it';
  }

  //list of pronouns that refer to this named noun. "[obama] is cool, [he] is nice."
  the.referenced_by = function() {
    //if it's named-noun, look forward for the pronouns pointing to it -> '... he'
    if(token && token.pos.tag!=="PRP" && token.pos.tag!=="PP"){
      var prp=the.pronoun();
      //look at rest of sentence
      var interested=sentence.tokens.slice(word_i+1, sentence.tokens.length);
      //add next sentence too, could go further..
      if(sentence.next){
        interested=interested.concat(sentence.next.tokens);
      }
      //find the matching pronouns, and break if another noun overwrites it
      var matches=[];
      for(var i=0; i<interested.length; i++){
        if(interested[i].pos.tag==="PRP" && (interested[i].normalised===prp || nouns.pps[interested[i].normalised]===prp)){
          //this pronoun points at our noun
          matches.push(interested[i]);
        }else if(interested[i].pos.tag==="PP" && nouns.pps[interested[i].normalised]===prp){
          //this posessive pronoun ('his/her') points at our noun
          matches.push(interested[i]);
        }else if(interested[i].pos.parent==="noun" && interested[i].analysis.pronoun()===prp){
          //this noun stops our further pursuit
          break;
        }
      }
      return matches;
    }
    return [];
  }

  // a pronoun that points at a noun mentioned previously '[he] is nice'
  the.reference_to = function() {
    //if it's a pronoun, look backwards for the first mention '[obama]... <-.. [he]'
    if(token && token.pos.tag==="PRP"){
      var prp=token.normalised
      //look at starting of this sentence
      var interested=sentence.tokens.slice(0, word_i)
      //add previous sentence, if applicable
      if(sentence.last){
        interested=sentence.last.tokens.concat(interested)
      }
      //reverse the terms to loop through backward..
      interested=interested.reverse()
      for(var i=0; i<interested.length; i++){
        //it's a match
        if(interested[i].pos.parent==="noun" && interested[i].pos.tag!=="PRP" && interested[i].analysis.pronoun()===prp){
          return interested[i]
        }
      }
    }
  }

  // specifically which pos it is
  the.which = (function() {
    // posessive
    if (the.word.match(/'s$/)) {return schema['NNO']}
    // plural
    // if (the.is_plural) {
    //   return schema['NNS']
    // }
    // generic
    return schema['NN'];
  })();

  return the;
}

//::NODE::
if (typeof module !== 'undefined' && module.exports) module.exports = Noun;
//::

// console.log(new Noun('farmhouse').is_entity())
// console.log(new Noun('FBI').is_acronym())
// console.log(new Noun('Tony Danza').is_person())
// console.time('h')
// console.log(new Noun('Tonys h. Danza').is_person())
// console.timeEnd('h')
