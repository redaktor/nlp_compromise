// wrapper for verb's methods
module.exports = function(str, next, last, token) {
	if (typeof lang != 'string') lang = 'en';
	var dPath = '../../data/'+lang+'/';
	var schema = require(dPath+'schema');
	var verbs_special = require(dPath+'verbs_special');
	var verb_conjugate = require('./conjugate/conjugate');
	
  var the = this;
  the.word = str || '';
  the.next = next;
  the.last = last;
	
  var tenses = {
    past: 'VBD',
    participle: 'VBN',
    infinitive: 'VBP',
    present: 'VBZ',
    gerund: 'VBG'
  }

  the.conjugate = function() {
    return verb_conjugate(the.word);
  }

  the.to_past = function() {
    if (the.form === 'gerund') {
      return the.word;
    }
    return verb_conjugate(the.word).past;
  }

  the.to_present = function() {
    return verb_conjugate(the.word).present;
  }

  the.to_future = function() {
    return 'will ' + verb_conjugate(the.word).infinitive;
  }

  // which conjugation
  the.form = (function() {
    // don't choose infinitive if infinitive == present
    var order = [
      'past',
      'present',
      'gerund',
      'infinitive'
    ];
    var forms = verb_conjugate(the.word);
    for (var i = 0; i < order.length; i++) {
      if (forms[order[i]] === the.word) {
				return order[i]
			}
    }
  })()

  // past/present/future   //wahh?!
  the.tense = (function() {
    if (the.word.match(/\bwill\b/)) {return 'future'}
    if (the.form === 'present') {return 'present'}
    if (the.form === 'past') {return 'past'}
    return 'present';
  })()

  // the most accurate part_of_speech
  the.which = (function() {
    if (verbs_special.CP[the.word]) {return schema['CP']}
    if (the.word.match(/([aeiou][^aeiouwyrlm])ing$/)) {return schema['VBG']}
    var form = the.form;
    return schema[tenses[form]];
  })()

  // is this verb negative already?
  the.negative = function() {
    if (the.word.match(/n't$/)) {
					console.log( 'is neg.1', the.word );return true}
    if ((verbs_special.MD[the.word] || verbs_special.CP[the.word]) && the.next && the.next.normalised === 'not') {
					console.log( 'is neg.2', the.word );return true;
    }
    return false;
  }

  return the;
}

// console.log(new Verb('will'))
// console.log(new Verb('stalking').tense)
