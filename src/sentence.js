// methods that hang on a parsed set of words
// accepts parsed tokens

if (typeof lang != 'string') lang = 'en';
var negate_data = require('./data/'+lang+'/negate_data');

exports.fn = function(type, todo) {
	if (todo === 'tokens') {
		return function() {
			this.tokens = this.tokens.map(function(token) {
				if (token.pos.parent === 'verb') {
					token.text = token.analysis[type]();
					token.normalised = token.text;
				}
				return token;
			})
			return this;
		}
	}
	return function() {
		return this.tokens.filter(function(t) {
			return t.pos.parent == type;
		})
	}
}

exports.Sentence = function(tokens) {
  this.tokens = tokens || [];

  function capitalise(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

	this.text = function() {
    return this.tokens.map(function(s) {
      return s.text;
    }).join(' ');
  }
  this.tense = function() {
    return this.tokens.filter(function(token) {
			return token.pos.parent === 'verb';
		}).map(function(v) {
			return v.analysis.tense;
		});
  }
  this.tags = function() {
    return this.tokens.map(function(t) {
      return t.pos.tag;
    })
  }
	// sugar 'grab' methods
	this.verbs = exports.fn('verb');
  this.adverbs = exports.fn('adverb');
  this.nouns = exports.fn('noun');
  this.adjectives = exports.fn('adjective');
  this.values = exports.fn('value');
	
	// conjugate
  this.to_past = exports.fn('to_past', 'tokens');
  this.to_present = exports.fn('to_present', 'tokens');
  this.to_future = exports.fn('to_future', 'tokens');
	
  this.insert = function(token, i) {
    if (i && token) { this.tokens.splice(i, 0, token); }
  }

  this.entities = function(options) {
    var spots = [];
    options = options || {};
    this.tokens.forEach(function(t) {
			var optCond = (options.ignore_gerund) ? (t.pos.tag !== 'VBG') : (t.pos);
      if (optCond && t.pos.parent === 'noun' && t.analysis.is_entity()) {
        spots.push(t);
      }
    });
    return spots;
  }

  // noun-entities that look like person names..
	this.people = function(){
    return this.entities({}).filter(function(o){
      return o.analysis.is_person();
    })
  }

	//find the 'it', 'he', 'she', and 'they' of this sentence
  //these are the words that get 'exported' to be used in other sentences
  this.referables = function(){
    var pronouns = { he: undefined, she: undefined, they: undefined, it: undefined };
    this.tokens.forEach(function(t){
      if(t.pos.parent=="noun" && t.pos.tag!="PRP"){
        pronouns[t.analysis.pronoun()] = t;
      }
    })
    return pronouns;
  }
	
  // negate makes the sentence mean the opposite thing.
	// these are cheap ways to negate the meaning
	// ('none' is ambiguous because it could mean (all or some) )
  this.negate = function() {
		function setNegative(i, txt, norm, capitalize) {
			this.tokens[i].text = txt;
			this.tokens[i].normalised = norm;
			if (capitalize) {
				this.tokens[i].text = capitalise(this.tokens[i].text);
			}
			return this;
			
		}
		function negative(i, w, inf) {
			var t = this.tokens[i];
			var a = [w, ((inf) ? (t.analysis.conjugate().infinitive || t.text) : t.text)];
			this.tokens[i].text = a.join(' ');
			this.tokens[i].normalised = this.tokens[i].text.toLowerCase();
			return this;
		}
		
    // loop through each term..
    for (var i = 0; i < this.tokens.length; i++) {
      var tok = this.tokens[i];
      // turn 'is' into 'isn't', etc - make sure 'is' isnt followed by a 'not', too
      if (negate_data[tok.normalised] && (!this.tokens[i + 1] || this.tokens[i + 1].normalised != 'not')) {
				return setNegative.bind(this)(i, negate_data[tok.normalised], negate_data[tok.normalised], tok.capitalised);
      }
      // find the first verb..
      if (tok.pos.parent == 'verb') {
        // if verb is already negative, make it not negative
        if (tok.analysis.negative()) {
          if (this.tokens[i + 1] && this.tokens[i + 1].normalised == 'not') {
            this.tokens.splice(i + 1, 1);
          }
          return this;
        }
        // turn future-tense 'will go' into 'won't go'
        if (tok.normalised.match(/^will /i)) {
					return setNegative.bind(this)(i, tok.text.replace(/^will /i, "won't "), tok.text, tok.capitalised);
        }
        // - INFINITIVE-
        // 'i walk' -> 'i don't walk'
        if (tok.analysis.form == 'infinitive' && tok.analysis.form != 'future') {
					return negative.bind(this)(i, "don't", 1);
        }
        // - GERUND-
        // if verb is gerund, 'walking' -> 'not walking'
        if (tok.analysis.form == 'gerund') {
					return negative.bind(this)(i, 'not');
        }
        // - PAST-
        // if verb is past-tense, 'he walked' -> 'he did't walk'
        if (tok.analysis.tense == 'past') {
					return negative.bind(this)(i, "didn't", 1);
        }
        // - PRESENT-
        // if verb is present-tense, 'he walks' -> 'he doesn't walk'
        if (tok.analysis.tense == 'present') {
					return negative.bind(this)(i, "doesn't", 1);
        }
        // - FUTURE-
        // if verb is future-tense, 'will go' -> won't go. easy-peasy
        if (tok.analysis.tense == 'future') {
					var isWill = (tok.normalised == 'will');
					var text = ((isWill) ? "won't" : tok.text.replace(/^will /i, "won't "));
					var norm = ((isWill) ? "won't" : tok.normalised.replace(/^will /i, "won't "));
					return setNegative.bind(this)(i, text, norm, tok.capitalised);
        }
        return this;
      }
    }
    return this;
  }

  return this;
}

module.exports = exports.Sentence;
