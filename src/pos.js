var pos = (function() {
  // 'use strict';

  if (typeof module !== 'undefined' && module.exports) {
		lexicon = require('./data/'+lang+'/lexicon');
    dates = require('./data/'+lang+'/dates');
    numbers = require('./data/'+lang+'/numbers');
    firstnames = require('./data/'+lang+'/firstnames');
		// .particles (possible 2nd part in a phrasal verb) and .contractions:
		pos_data = require('./data/'+lang+'/pos_data');
				
    wordnet_suffixes = require('./data/'+lang+'/unambiguousSuffixes');
		schema = require('./data/'+lang+'/schema');
    word_rules = require('./data/word_rules'); // TODO - some are localized !
    tokenize = require('./methods/tokenization/tokenize').tokenize;
    Sentence = require('./sentence');
    Section = require('./section');
    parents = require('./parents/parents');
  }
	
	var vs = Object.keys(dates.months).concat(Object.keys(dates.days));
	for (var k in numbers) vs = vs.concat(Object.keys(numbers[k]));
	var values = vs.reduce(function(h, s) { h[s] = 'CD'; return h; }, {});

  var merge_tokens = function(a, b) {
    a.text += ' ' + b.text;
    a.normalised += ' ' + b.normalised;
    a.pos_reason += '|' + b.pos_reason;
    a.start = a.start || b.start;
    a.noun_capital = (a.noun_capital && b.noun_capital);
    a.punctuated = a.punctuated || b.punctuated;
    a.end = a.end || b.end;
    return a;
  }

  //combine adjacent neighbours, and special cases
  var combine_tags = function(sentence) {
    var arr = sentence.tokens || [];
    for (var i = 0; i <= arr.length; i++) {
      var next = arr[i + 1];
			if (arr[i] && next) {
				var q = {
					// 'joe smith' are both NN, for example
					NN: (tag === next.pos.tag && arr[i].punctuated !== true && arr[i].noun_capital == next.noun_capital ),
					// merge NNP and NN, like firstname, lastname
					NNP_NN: ((tag === 'NNP' && next.pos.tag ==='NN') || (tag==='NN' && next.pos.tag==='NNP')),
					// merge dates manually, which often have punctuation
					CD: (tag === 'CD' && next.pos.tag ==='CD'),
					//'hundred and fifty', 'march the 5th'
					CDn: (tag === 'CD' && (next.normalised === 'and' || next.normalised === 'the') && arr[i + 2] && arr[i + 2].pos.tag === 'CD'),
					// merge abbreviations with nouns manually, eg. 'Joe jr.'
					NNAB: ((tag === 'NNAB' && next.pos.parent ==='noun') || (arr[i].pos.parent==='noun' && next.pos.tag==='NNAB')),
					//'will walk' -> future-tense verb
					future: (arr[i].normalised === 'will' && next.pos.parent === 'verb'),
					// capitals surrounding a preposition  'United States of America'
					NNc: (tag=='NN' && arr[i].noun_capital && (next.normalised == 'of' || next.normalised == 'and') && arr[i + 2] && arr[i + 2].noun_capital),
					//capitals surrounding two prepositions  'Phantom of the Opera'
					NNc2: (arr[i].noun_capital && next.normalised == 'of' && arr[i + 2] && arr[i + 2].pos.tag == 'DT' && arr[i + 3] && arr[i + 3].noun_capital)
				};
				if (q._NN || q._NNP_NN || q.CD || q.CDn || q.NNAB || q.future || q.NNc || q.NNc2) {
					arr[i + 1] = merge_tokens(arr[i], arr[i + 1]);
          arr[i] = null;
					if (q._NNP_NN) {
						arr[i + 1].pos = schema['NNP'];
					} else if (q.NNc || q.NNc2) {
						arr[i + 2] = merge_tokens(arr[i + 1], arr[i + 2]);
          	arr[i + 1] = null;
						if (q.NNc2) {
							arr[i + 3] = merge_tokens(arr[i + 2], arr[i + 3]);
          		arr[i + 2] = null;
						}
					}
				}
			}
    }
    sentence.tokens = arr.filter(function(r) {
      return r;
    })
    return sentence;
  }


  //some prepositions are clumped onto the back of a verb 'looked for', 'looks at'
  //they should be combined with the verb, sometimes.
  //does not handle seperated phrasal verbs ('take the coat off' -> 'take off')
  var combine_phrasal_verbs = function(sentence) {
    var arr = sentence.tokens || [];
    for (var i = 1; i < arr.length; i++) {
      if(pos_data.particles[arr[i].normalised]){
        //it matches a known phrasal-verb
        if(lexicon[arr[i-1].normalised + ' ' + arr[i].normalised]){
          // console.log(arr[i-1].normalised + ' ' + arr[i].normalised)
          arr[i] = merge_tokens(arr[i-1], arr[i]);
          arr[i-1] = null;
        }
      }
    }
    sentence.tokens = arr.filter(function(r) {
      return r;
    })
    return sentence;
  }


  var lexicon_pass = function(w) {
    if (lexicon.hasOwnProperty(w)) return schema[lexicon[w]];
    //try to match it without a prefix - eg. outworked -> worked
    if (w.match(/^(over|under|out|-|un|re|en).{4}/)) {
      var attempt = w.replace(/^(over|under|out|.*?-|un|re|en)/, '');
      return schema[lexicon[attempt]];
    }
  }

  var rules_pass = function(w) {
    for (var i = 0; i < word_rules.length; i++) {
      if (w.length> 4 && w.match(word_rules[i].reg)) {
        return schema[word_rules[i].pos];
      }
    }
  }

  var fourth_pass = function(token, i, sentence) {
    var last = sentence.tokens[i - 1];
    var next = sentence.tokens[i + 1];
    var strong_determiners = { // TODO
			'the': 1,
			'a': 1,
			'an': 1
		};
		var setPos = function(p, pr) {
			token.pos = schema[p];
			token.pos_reason = pr;
		}
    //resolve ambiguous 'march','april','may' with dates
    if((token.normalised=='march'||token.normalised=='april'||token.normalised=='may') && ( (next && next.pos.tag=='CD') || (last && last.pos.tag=='CD') ) ){
      setPos('CD', 'may_is_date');
    }
      //if it's before a modal verb, it's a noun -> lkjsdf would
    if (next && token.pos.parent !== 'noun' && token.pos.parent !== 'glue' && next.pos.tag === 'MD') {
      setPos('NN', 'before_modal');
    }
    //if it's after the word 'will' its probably a verb/adverb
    if (last && last.normalised == 'will' && !last.punctuated && token.pos.parent == 'noun' && token.pos.tag !== 'PRP' && token.pos.tag !== 'PP') {
      setPos('VB', 'after_will');
    }
    //if it's after the word 'i' its probably a verb/adverb
    if (last && last.normalised == 'i' && !last.punctuated && token.pos.parent == 'noun') {
      setPos('VB', 'after_i');
    }
    //if it's after an adverb, it's not a noun -> quickly acked
    //support form 'atleast he is..'
    if (last && token.pos.parent === 'noun' && token.pos.tag !== 'PRP' && token.pos.tag !== 'PP' && last.pos.tag === 'RB' && !last.start) {
      setPos('VB', 'after_adverb');
    }
    //no consecutive, unpunctuated adjectives -> real good
    if (next && token.pos.parent === 'adjective' && next.pos.parent === 'adjective' && !token.punctuated) {
      setPos('RB', 'consecutive_adjectives');
    }
    //if it's after a determiner, it's not a verb -> the walk
    if (last && token.pos.parent === 'verb' && strong_determiners[last.pos.normalised] && token.pos.tag != 'CP') {
      setPos('NN', 'determiner-verb');
    }
    //copulas are followed by a determiner ('are a ..'), or an adjective ('are good')
    if (last && last.pos.tag === 'CP' && token.pos.tag !== 'DT' && token.pos.tag !== 'RB' && token.pos.parent !== 'adjective' && token.pos.parent !== 'value') {
      setPos('JJ', 'copula-adjective');
    }
    //copula, adverb, verb -> copula adverb adjective -> is very lkjsdf
    if (last && next && last.pos.tag === 'CP' && token.pos.tag === 'RB' && next.pos.parent === 'verb') {
      sentence.tokens[i + 1].pos = schema['JJ'];
      sentence.tokens[i + 1].pos_reason = 'copula-adverb-adjective';
    }
    // the city [verb] him.
    if (next && next.pos.tag == 'PRP' && token.pos.tag !== 'PP' && token.pos.parent == 'noun' && !token.punctuated) {
      setPos('VB', 'before_[him|her|it]');
    }
    //the misled worker -> misled is an adjective, not vb
    if (last && next && last.pos.tag === 'DT' && next.pos.parent === 'noun' && token.pos.parent === 'verb') {
      setPos('JJ', 'determiner-adjective-noun');
    }

    return token;
  }

  //add a 'quiet' token for contractions so we can represent their grammar
  var handle_contractions = function(arr) {
    var before, after, fix;
    for (var i = 0; i < arr.length; i++) {
      if (pos_data.contractions.hasOwnProperty(arr[i].normalised)) {
        before = arr.slice(0, i);
        after = arr.slice(i + 1, arr.length);
        fix = [{
          text: '',
          normalised: pos_data.contractions[arr[i].normalised][0],
          start: arr[i].start
        }, {
          text: arr[i].text,
          normalised: pos_data.contractions[arr[i].normalised][1],
          start: undefined
        }];
        arr = before.concat(fix);
        arr = arr.concat(after);
        return handle_contractions(arr);
      }
    }
    return arr;
  }

  ////////////////
  ///party-time//
  var main = function(text, options) {
    options = options || {};
    if (!text || !text.match(/[a-z0-9]/i)) return new Section([]);
    var sentences = tokenize(text);
		
		var setPos = function(token, p, pr) {
			token.pos = schema[p];
			token.pos_reason = pr;
			return token;
		}

    sentences.forEach(function(sentence) {

      // first, let's handle the capitalisation-of-the-first-word issue
      var first = sentence.tokens[0];
      if (first) {
        // if second word is a noun-capital, give more sympathy to this capital
        if(sentence.tokens[1] && sentence.tokens[1].noun_capital && !lexicon_pass(first.normalised)){
          sentence.tokens[0].noun_capital = true;
        }
      }
      // smart handling of contractions
      sentence.tokens = handle_contractions(sentence.tokens);

      // first pass, word-level clues
      sentence.tokens = sentence.tokens.map(function(token) {
        // it has a capital and isn't a month, etc.
        if (token.noun_capital && !values[token.normalised]) return setPos(token, 'NN', 'noun_capitalised');
        // known words list
        var lex = lexicon_pass(token.normalised);
        if (lex) {
          token.pos = lex;
          token.pos_reason = 'lexicon';
          // if it's an abbreviation, forgive the punctuation (eg. 'dr.')
          if(token.pos.tag === 'NNAB'){
            token.punctuated = false;
          }
          return token;
        }

        // handle punctuation like ' -- '
        if (!token.normalised) return setPos(token, 'UH', 'wordless_string');

        // suffix pos signals from wordnet
        var len = token.normalised.length;
        if (len > 4) {
          var suffix = token.normalised.substr(len - 4, len - 1)
          if (wordnet_suffixes.hasOwnProperty(suffix)) return setPos(token, wordnet_suffixes[suffix], 'wordnet suffix');
        }

        // suffix regexes for words
        var r = rules_pass(token.normalised);
        if (r) {
          token.pos = r;
          token.pos_reason = 'regex suffix'
          return token
        }

        // see if it's a number
        if (parseFloat(token.normalised)) return setPos(token, 'CD', 'parsefloat');

        return token;
      })

      // second pass, wrangle results a bit
      sentence.tokens = sentence.tokens.map(function(token, i) {
        // set ambiguous 'ed' endings as either verb/adjective
        if ( token.pos_reason!=='lexicon' && token.normalised.match(/.ed$/)) {
          token.pos = schema['VB'];
          token.pos_reason = 'ed';
        }
        return token;
      })

      // third pass, seek verb or noun phrases after their signals
      var need = null;
      var reason = '';
      sentence.tokens = sentence.tokens.map(function(token, i) {
        var next = sentence.tokens[i + 1];
        if (token.pos) {
          // suggest noun after some determiners (a|the), posessive pronouns (her|my|its)
          if (token.normalised == 'the' || token.normalised == 'a' || token.normalised == 'an' || token.pos.tag === 'PP') {
            need = 'noun';
            reason = token.pos.name;
            return token; // proceed
          }
          // suggest verb after personal pronouns (he|she|they), modal verbs (would|could|should)
          if (token.pos.tag === 'PRP' && token.pos.tag !== 'PP' || token.pos.tag === 'MD') {
            need = 'verb';
            reason = token.pos.name;
            return token; // proceed
          }

        }
        // satisfy need on a conflict, and fix a likely error
        if (token.pos) {
          if (need == 'verb' && token.pos.parent == 'noun' && (!next || (next.pos && next.pos.parent != 'noun'))) {
            if (!next || !next.pos || next.pos.parent != need) { // ensure need not satisfied on the next one
							token = setPos(token, 'VB', 'signal from '+reason);
              need = null;
            }
          }
          if (need == 'noun' && token.pos.parent == 'verb' && (!next || (next.pos && next.pos.parent != 'verb'))) {
            if (!next || !next.pos || next.pos.parent != need) { // ensure need not satisfied on the next one
							token = setPos(token, 'NN', 'signal from '+reason);
              need = null;
            }
          }
        }
        // satisfy need with an unknown pos
        if (need && !token.pos) {
          if (!next || !next.pos || next.pos.parent != need) { // ensure need not satisfied on the next one
						token = setPos(token, need, 'signal from '+reason);
            need = null;
          }
        }
        // set them back as satisfied..
        if (need === 'verb' && token.pos && token.pos.parent === 'verb') {
          need = null;
        }
        if (need === 'noun' && token.pos && token.pos.parent === 'noun') {
          need = null;
        }
        return token;
      })

      // third pass, identify missing clauses, fallback to noun
      var has = {};
      sentence.tokens.forEach(function(token) {
        if (token.pos) has[token.pos.parent] = true;
      })
      sentence.tokens = sentence.tokens.map(function(token, i) {
        if (!token.pos) {
          // if there is no verb in the sentence, and there needs to be.
          if (has['adjective'] && has['noun'] && !has['verb']) {
            has['verb'] = true;
						return setPos(token, 'VB', 'need one verb');
          }

          // fallback to a noun
					token = setPos(token, 'NN', 'noun fallback');
        }
        return token;
      })

      // fourth pass, error correction
      sentence.tokens = sentence.tokens.map(function(token, i) {
        return fourth_pass(token, i, sentence);
      })
      // run the fourth-pass again!
      sentence.tokens = sentence.tokens.map(function(token, i) {
        return fourth_pass(token, i, sentence);
      })
    })

    // combine neighbours
    if (!options.dont_combine) {
      sentences = sentences.map(function(s) {
        return combine_tags(s);
      })
      sentences = sentences.map(function(s){
        return combine_phrasal_verbs(s);
      })
    }

    // make them Sentence objects
    sentences = sentences.map(function(s) {
      var sentence = new Sentence(s.tokens);
      sentence.type = s.type;
      return sentence;
    })
    // add analysis on each token
    sentences = sentences.map(function(s) {
      s.tokens = s.tokens.map(function(token, i) {
        token.analysis = parents[token.pos.parent](token.normalised, s, i);
        return token;
      })
      return s;
    })

    // add next-last references
    sentences = sentences.map(function(sentence,i) {
      sentence.last=sentences[i-1];
      sentence.next=sentences[i+1];
      return sentence;
    })
    // return a Section object, with its methods
    return new Section(sentences);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = main;
  }
  return main;
})()

// console.log( pos('Geroge Clooney walked, quietly into a bank. It was cold.') )
// console.log( pos('it is a three-hundred and one').tags() )
// console.log( pos('funny funny funny funny').sentences[0].tokens )
// pos('In March 2009, while Secretary of State for Energy and Climate Change, Miliband attended the UK premiere of climate-change film The Age of Stupid, where he was ambushed').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '  '+t.text)})
// pos('the Energy and Climate Change, Miliband').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '  '+t.text)})
// console.log(pos('Energy and Climate Change, Miliband').sentences[0].tokens)
// console.log(pos('http://google.com').sentences[0].tokens)
// console.log(pos('may live').tags())
// console.log(pos('may 7th live').tags())
// console.log(pos('She and Marc Emery married on July 23, 2006.').tags())
// console.log(pos('Toronto is fun. Spencer and heather quickly walked. it was cool').sentences[0].referables())
// console.log(pos('a hundred').sentences[0].tokens)
// console.log(pos('Tony Reagan skates').sentences[0].tokens)
// console.log(pos('She and Marc Emery married on July 23, 2006').sentences[0].tokens)
// console.log(pos('Tony Hawk walked quickly to the store.').sentences[0].tokens)
// console.log(pos('jahn j. jacobheimer').sentences[0].tokens[0].analysis.is_person())
// pos('Dr. Conrad Murray recieved a guilty verdict').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '  '+t.text)})
// pos('the Phantom of the Opera').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '  '+t.text)})
// pos('Tony Hawk is nice').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '  '+t.text)})
// pos('tony hawk is nice').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '  '+t.text)})
// console.log(pos('look after a kid').sentences[0].tags())
// pos('Sather tried to stop the deal, but when he found out that Gretzky').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '  '+t.text+'  '+t.pos_reason)})
// pos('Gretzky had tried skating').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '  '+t.text+'  '+t.pos_reason)})

// console.log(pos('i think Tony Danza is cool. He rocks and he is golden.').sentences[0].tokens[2].analysis.referenced_by())
// console.log(pos('i think Tony Danza is cool and he is golden.').sentences[0].tokens[6].analysis.reference_to())
// console.log(pos('Tina grabbed her shoes. She is lovely.').sentences[0].tokens[0].analysis.referenced_by())
// console.log(pos('Tina grabbed her shoes. She is lovely.').sentences[0].tokens[0].analysis.referenced_by())