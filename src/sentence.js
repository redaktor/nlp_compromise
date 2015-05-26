// methods that hang on a parsed set of words
// accepts parsed tokens
var Sentence = function(tokens) {
	if (typeof module !== 'undefined' && module.exports) negate_data = require('./data/'+lang+'/negate_data');
  var the = this;
  the.tokens = tokens || [];

  var capitalise = function(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  the.tense = function() {
    var verbs = the.tokens.filter(function(token) {
      return token.pos.parent === 'verb';
    })
    return verbs.map(function(v) {
      return v.analysis.tense;
    })
  }

  the.to_past = function() {
    the.tokens = the.tokens.map(function(token) {
      if (token.pos.parent === 'verb') {
        token.text = token.analysis.to_past();
        token.normalised = token.text;
      }
      return token;
    })
    return the;
  }

  the.to_present = function() {
    the.tokens = the.tokens.map(function(token) {
      if (token.pos.parent === 'verb') {
        token.text = token.analysis.to_present();
        token.normalised = token.text;
      }
      return token;
    })
    return the;
  }

  the.to_future = function() {
    the.tokens = the.tokens.map(function(token) {
      if (token.pos.parent === 'verb') {
        token.text = token.analysis.to_future();
        token.normalised = token.text;
      }
      return token;
    })
    return the;
  }

  the.insert = function(token, i) {
    if (i && token) the.tokens.splice(i, 0, token);
  }

  // negate makes the sentence mean the opposite thing.
  the.negate = function() {
    // these are cheap ways to negate the meaning
    // ('none' is ambiguous because it could mean (all or some) )
    // loop through each term..
    for (var i = 0; i < the.tokens.length; i++) {
      var tok = the.tokens[i];
      //turn 'is' into 'isn't', etc - make sure 'is' isnt followed by a 'not', too
      if (negate_data[tok.normalised] && (!the.tokens[i + 1] || the.tokens[i + 1].normalised != 'not')) {
        tok.text = negate_data[tok.normalised];
        tok.normalised = negate_data[tok.normalised];
        if (tok.capitalised) {
          tok.text = capitalise(tok.text);
        }
        return the;
      }

      // find the first verb..
      if (tok.pos.parent == 'verb') {
        // if verb is already negative, make it not negative
        if (tok.analysis.negative()) {
          if (the.tokens[i + 1] && the.tokens[i + 1].normalised == 'not') {
            the.tokens.splice(i + 1, 1);
          }
          return the;
        }
        // turn future-tense 'will go' into 'won't go'
        if (tok.normalised.match(/^will /i)) {
          tok.text = tok.text.replace(/^will /i, "won't ")
          tok.normalised = tok.text;
          if (tok.capitalised) {
            tok.text = capitalise(tok.text);
          }
          return the;
        }
        // - INFINITIVE-
        // 'i walk' -> 'i don't walk'
        if (tok.analysis.form == 'infinitive' && tok.analysis.form != 'future') {
          tok.text = "don't " + (tok.analysis.conjugate().infinitive || tok.text);
          tok.normalised = tok.text.toLowerCase();
          return the;
        }
        // - GERUND-
        // if verb is gerund, 'walking' -> 'not walking'
        if (tok.analysis.form == 'gerund') {
          tok.text = 'not ' + tok.text;
          tok.normalised = tok.text.toLowerCase();
          return the;
        }
        // - PAST-
        // if verb is past-tense, 'he walked' -> 'he did't walk'
        if (tok.analysis.tense == 'past') {
          tok.text = "didn't " + (tok.analysis.conjugate().infinitive || tok.text);
          tok.normalised = tok.text.toLowerCase();
          return the;
        }
        // - PRESENT-
        // if verb is present-tense, 'he walks' -> 'he doesn't walk'
        if (tok.analysis.tense == 'present') {
          tok.text = "doesn't " + (tok.analysis.conjugate().infinitive || tok.text);
          tok.normalised = tok.text.toLowerCase();
          return the;
        }
        // - FUTURE-
        // if verb is future-tense, 'will go' -> won't go. easy-peasy
        if (tok.analysis.tense == 'future') {
          if (tok.normalised == 'will') {
            tok.normalised = "won't";
            tok.text = "won't";
          } else {
            tok.text = tok.text.replace(/^will /i, "won't ");
            tok.normalised = tok.normalised.replace(/^will /i, "won't ");
          }
          if (tok.capitalised) tok.text = capitalise(tok.text);
          return the;
        }

        return the;
      }
    }

    return the;
  }

  the.entities = function(options) {
    var spots = [];
    options = options || {};
    the.tokens.forEach(function(token) {
      if (token.pos.parent === 'noun' && token.analysis.is_entity()) {
        spots.push(token);
      }
    })
    if (options.ignore_gerund) {
      spots = spots.filter(function(t) {
        return t.pos.tag !== 'VBG';
      })
    }
    return spots;
  }

  //noun-entities that look like person names..
  the.people = function(){
    return the.entities({}).filter(function(o){
      return o.analysis.is_person();
    })
  }

  the.text = function() {
    return the.tokens.map(function(s) {
      return s.text;
    }).join(' ');
  }

  //sugar 'grab' methods
  the.verbs = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == 'verb';
    })
  }

  the.adverbs = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == 'adverb';
    })
  }

  the.nouns = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == 'noun';
    })
  }

  the.adjectives = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == 'adjective';
    })
  }

  the.values = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == 'value';
    })
  }

  the.tags = function() {
    return the.tokens.map(function(t) {
      return t.pos.tag;
    })
  }

  return the;
}

if (typeof module !== 'undefined' && module.exports) module.exports = Sentence;
