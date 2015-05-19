//wrapper for verb's methods
var Verb = function(str, next, last, token) {
  var the = this;
  the.word = str || '';
  the.next = next;
  the.last = last;

  if (typeof module !== 'undefined' && module.exports) {
		if (typeof lang != 'string') lang = 'en';
    var parts_of_speech = require('../../data/parts_of_speech');
		
		var verbs = require('../../../data/'+lang+'/verbs_special');
    var verb_conjugate = require('../../../data/'+lang+'/verbs_conjugate').irregulars;
  }
	
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

  //which conjugation
  the.form = (function() {
    //don't choose infinitive if infinitive==present
    var order = [
      'past',
      'present',
      'gerund',
      'infinitive'
    ];
    var forms = verb_conjugate(the.word);
    for (var i = 0; i < order.length; i++) {
      if (forms[order[i]] === the.word) return order[i];
    }
  })()

  //past/present/future   //wahh?!
  the.tense = (function() {
    if (the.word.match(/\bwill\b/)) return 'future';
    if (the.form === 'present') return 'present';
    if (the.form === 'past') return 'past';
    return 'present';
  })()

  //the most accurate part_of_speech
  the.which = (function() {
    if (verbs.cps[the.word]) return parts_of_speech['CP'];
    if (the.word.match(/([aeiou][^aeiouwyrlm])ing$/)) return parts_of_speech['VBG'];
    var form = the.form;
    return parts_of_speech[tenses[form]];
  })()

  //is this verb negative already?
  the.negative = function() {
    if (the.word.match(/n't$/)) return true;
    if ((verbs.mds[the.word] || verbs.cps[the.word]) && the.next && the.next.normalised === 'not') {
      return true;
    }
    return false;
  }

  return the;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Verb;
}

// console.log(new Verb('will'))
// console.log(new Verb('stalking').tense)
