/**
 * methods that hang on a parsed set of words <br>
 * accepts parsed tokens
 * @module src/pos/sentence
 */
if (typeof lang != 'string') lang = 'en';
var dPath = '../data/'+lang+'/';
var nouns = require(dPath+'nouns');
var negate_data = require(dPath+'lexicon/negate');
var sentence_rules = require(dPath+'rules/sentence');

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

	// find the 'it', 'he', 'she', and 'they' of this sentence
  // these are the words that get 'exported' to be used in other sentences
  this.referables = function(){
    var pronouns = nouns.refs.reduce(function(o, w) { o[w] = undefined; return o; }, {});
    this.tokens.forEach(function(t){
      if(t.pos.parent === 'noun' && t.pos.tag != 'PRP'){
        pronouns[t.analysis.pronoun()] = t;
      }
    })
    return pronouns;
  }
	
  // negate makes the sentence mean the opposite thing.
	// these are cheap ways to negate the meaning
	// ('none' is ambiguous because it could mean (all or some) )
  this.negate = function() {
		var o = sentence_rules.negate;
    var t, txt, arr;
		// loop through each term.. 
		for (var i = 0; i < this.tokens.length; i++) {
			t = this.tokens[i];
			
      // turn 'is' into 'isn't', etc - make sure 'is' isnt followed by a 'not', too
      if (negate_data[t.normalised] && (!this.tokens[i + 1] || this.tokens[i + 1].normalised != 'not')) {
				this.tokens[i].text = negate_data[t.normalised];
				this.tokens[i].normalised = negate_data[t.normalised];
				if (t.capitalised) {
					this.tokens[i].text = capitalise(this.tokens[i].text);
				}
				return this;
      }
      // find the first verb..
      if (t.pos.parent == 'verb') {
				// if verb is already negative, make it not negative
        if (t.analysis.negative()) {
          if (this.tokens[i + 1] && this.tokens[i + 1].normalised == 'not') {
            this.tokens.splice(i + 1, 1);
          }
          return this;
        }
				for (var id in o) {
					if (o[id]._if && o[id]._if(t, this.tokens, i)) {
						txt = (o[id].tense) ? (t.analysis.conjugate()[o[id].tense] || t.text) : t.text;
						arr = (o[id].prefix) ? [o[id].prefix, txt] : [txt, o[id].suffix||''];
						this.tokens[i].text = arr.join(' ');
						if (t.capitalised) {
							this.tokens[i].text = capitalise(this.tokens[i].text);
						}
						this.tokens[i].normalised = (t.normalised) ? t.normalised : this.tokens[i].text.toLowerCase();
						return this;
					}
				}
        return this;
			}
		}
    return this;
  }
  return this;
}

module.exports = exports.Sentence;
