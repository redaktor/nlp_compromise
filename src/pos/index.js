/**
 * parts of speech tagging (POS) module.
 * @module src/pos/index
 */
if (typeof lang != 'string') lang = 'en';
var dPath = '../data/'+lang+'/';
var lexicon = require(dPath+'lexicon');
var dates = require(dPath+'lexicon/dates');
var numbers = require(dPath+'lexicon/numbers');
var firstnames = require(dPath+'lexicon/firstnames');
var pos_data = require(dPath+'lexicon/pos');
// .particles (possible 2nd part in a phrasal verb) and .contractions:
var wordnet = require(dPath+'rules/wordnet');
var pos_rules = require(dPath+'rules/pos');
var schema = require(dPath+'schema');
var _ = require('../_');
//var cache = require('../cache');
var Sentence = require('./sentence');
var Section = require('./section');
// all 'CD'
var vs = Object.keys(dates.months).concat(Object.keys(dates.days));
for (var k in numbers) { vs = vs.concat(Object.keys(numbers[k])) }
var values = vs.reduce(function(h, s) { h[s] = 'CD'; return h; }, {});

// set token against data rules, general logic
function setTokenFn(type) {
	return function(t, i, tokens) {
		for (var id in pos_rules[type]) {
			var r = pos_rules[type][id];
			if (r._if && r._if(t, tokens[i+1], tokens[i-1], i)) {
				if (r.set) {
					tokens[i+(r.set)].pos = schema[r.tag];
					tokens[i+(r.set)].pos_reason = _.toReadable(id);
				} else {
					t.pos = schema[r.tag];
					t.pos_reason = _.toReadable(id);
				}
			}
		}
		return t;
	}
}
// combine tokens, general logic
function mergeTokens(a, b) {
	a.text += ' ' + b.text;
	a.normalised += ' ' + b.normalised;
	a.pos_reason += '|' + b.pos_reason;
	a.start = a.start || b.start;
	a.noun_capital = (a.noun_capital && b.noun_capital);
	a.punctuated = a.punctuated || b.punctuated;
	a.end = a.end || b.end;
	return a;
}
// combine multiple words
function merge(a, n, c) {
	var count = (!c || c < 1) ? 1 : c;
	var j, k;
	for (var i = 0; i < count; i++) {
		j = (c < 1) ? n-i : n+i;
		k = (c < 1) ? j : j+1;
		if (a[k]) {
			a[k] = mergeTokens(a[j], a[k]);
			a[j] = null;
		}
	}
	return a;
}
// automatically from any data/{{lang}}/pos_rules
function combine(tokens) {
	var arr = tokens || [];
	var r;
	for (var i = 0; i < arr.length; i++) {
		// combine adjacent neighbours, and special cases
		if (arr[i+1]) {
			for (var id in pos_rules.merge) {
				r = pos_rules.merge[id];
				if (r && arr[i] && r._if && r._if(arr[i], arr, i)) {
					arr = merge(arr, i, r.merge); // merge
					if (r.set) { // set pos	
						tokens[i+(r.set)].pos = schema[r.tag];
						arr[i+(r.set)].pos_reason = _.toReadable(id);
					}
					break;
				}
			}
		}
		// combine phrasal verbs
		// 'beef up' is one verb, and not some direction of beefing.
		if(!!(arr[i]) && !!(arr[i-1]) && pos_data.particles[arr[i].normalised]){
			// it matches a known phrasal-verb
			if(lexicon[ [arr[i-1].normalised, arr[i].normalised].join(' ') ]){
				arr = merge(arr, i, -1);
			}
		}
	}
	return arr.filter(function(r) {
		return r;
	})
	// TODO phrasal verbs: some known are 3-gram phrasal verbs, like 'get away from' !!!
	// - does not handle seperated phrasal verbs ('take the coat off' -> 'take off')
}
function lexi(w) {
	if (lexicon.hasOwnProperty(w)) { return schema[lexicon[w]]; }
	if (pos_rules.replace) {
		for (var key in pos_rules.replace) {
			if (w.match(pos_rules.replace[key].matches)) {
				var repl = (pos_rules.replace[key].hasOwnProperty('replaces')) ? 'replaces' : 'matches';
				var attempt = w.replace(pos_rules.replace[key][repl], pos_rules.replace[key].replacer);
				return schema[lexicon[attempt]];
			}
		}
	}
}
function wordRule(w) {
	for (var i = 0; i < pos_rules.words.length; i++) {
		if (w.length > 4 && w.match(pos_rules.words[i].reg)) {
			return schema[pos_rules.words[i].pos];
		}
	}
}
// shorthand .pos...
function setPos(token, p, pr, pIsSchema) {
	token.pos = (pIsSchema) ? p : schema[p];
	token.pos_reason = pr;
	return token;
}
// add a 'quiet' token for contractions so we can represent their grammar
function contract(isAmbiguous) {
	if (this.tokens.length < 2) { return this.tokens; } // nothing to contract
	// isAmbiguous contractions require (some) grammatical knowledge to disambigous properly (e.g "he's"=> ['he is', 'he was'])
	var before, after, fix;
	var type = (isAmbiguous) ? 'ambiguousContractions' : 'contractions';
	for (var i = 0; i < this.tokens.length; i++) {
		if (pos_data[type].hasOwnProperty(this.tokens[i].normalised)) {
			before = this.tokens.slice(0, i);
			after = this.tokens.slice(i + 1, this.tokens.length);
			fix = [{
				text: this.tokens[i].text,
				normalised: '',
				start: this.tokens[i].start,
			}, {
				text: '',
				normalised: '',
				start: undefined,
			}];
			if (isAmbiguous && pos_rules.hasOwnProperty(type)) {
				var chosen = pos_rules.ambiguousContractions(this.tokens, i);
				fix[0].normalised = pos_data.ambiguousContractions[this.tokens[i].normalised], // e.g. the 'he' part
				fix[0].pos = schema[lexicon[pos_data.ambiguousContractions[this.tokens[i].normalised]]];
				fix[0].pos_reason = 'ambiguous_contraction';
				fix[1].normalised = chosen, //e.g. 'is', 'was' or 'have'
				fix[1].pos = schema[lexicon[chosen]];
				fix[1].pos_reason = 'silent_contraction';
			} else {
				fix[0].normalised = pos_data.contractions[this.tokens[i].normalised][0];
				fix[1].normalised = pos_data.contractions[this.tokens[i].normalised][1];
			}
			this.tokens = before.concat(fix).concat(after);
			return contract(this.tokens, isAmbiguous); // recursive
		}
	}
	return this.tokens;
};
// The mapping of sentence tokens: 5 pass functions:
function passFn() {
	this.needs = null;
	this.reason = '';
	this.has = {};
	this.set = function(token, o) {
		if (o.pos) {
			token = setPos(token, o.pos, ((o.pos_reason) ? o.pos_reason : 'signal from '+this.reason));	
		} 
		if (token.pos) { this.has[token.pos.parent] = true; }
		if (o.hasOwnProperty('needs')) { this.needs = o.needs; }
		if (o.hasOwnProperty('reason')) { this.reason = o.reason; }
		return token;
	}
	return {
		// general rules
		one: function(token) {
			// first pass, word-level clues
			// it has a capital and isn't a month, etc.
			if (token.noun_capital && !values[token.normalised]) {
				return setPos(token, 'NN', 'noun_capitalised');
			}
			// known words list
			var lexiPos = lexi(token.normalised);
			if (lexiPos) {
				token.pos = lexiPos;
				token.pos_reason = 'lexicon';
				// if it's an abbreviation, forgive the punctuation (eg. 'dr.')
				if(token.pos.tag === 'NNAB'){ token.punctuated = false; }
				return token;
			}
			// handle punctuation like ' -- '
			if (!token.normalised) { return setPos(token, 'UH', 'wordless_string'); }
			// suffix pos signals from wordnet
			var l = token.normalised.length;
			if (l > 4) {
				var suffix = token.normalised.substr(l - 4, l - 1)
				if (wordnet.hasOwnProperty(suffix)) {
					return setPos(token, wordnet[suffix], 'wordnet suffix');
				}
			}
			// suffix regexes for words
			var r = wordRule(token.normalised);
			if (r) { return setPos(token, r, 'regex suffix', 1); }
			// see if it's a number
			if (parseFloat(token.normalised)) { return setPos(token, 'CD', 'parsefloat'); }
			return token;
		},
		// wrangles results a bit
		two: setTokenFn('set'),
		// seek verb or noun phrases after their signals
		three: function(token, i, tokens) {
			var next = tokens[i + 1];
			if (token.pos) {
				// suggest noun after some determiners (a|the), posessive pronouns (her|my|its) // TODO - MAYBE DECOUPLE (needs language check again)
				if ((pos_rules.strongDeterminers[token.normalised]) || token.pos.tag === 'PP') {
					return this.set(token, {needs: 'noun', reason: token.pos.name}); // proceed
				}
				// suggest verb after personal pronouns (he|she|they), modal verbs (would|could|should) // TODO - MAYBE DECOUPLE (needs language check again)
				if (token.pos.tag === 'PRP' && token.pos.tag !== 'PP' || token.pos.tag === 'MD') {
					return this.set(token, {needs: 'verb', reason: token.pos.name}); // proceed
				}
			}
			// satisfy need on a conflict, and fix a likely error
			if (token.pos) {
				if (this.needs == 'verb' && token.pos.parent == 'noun' && (!next || (next.pos && next.pos.parent != 'noun'))) {
					if (!next || !next.pos || next.pos.parent != this.needs) { // ensure needs not satisfied on the next one
						token = this.set(token, {needs: null, pos: 'VB'});
					}
				}
				if (this.needs == 'noun' && token.pos.parent == 'verb' && (!next || (next.pos && next.pos.parent != 'verb'))) {
					if (!next || !next.pos || next.pos.parent != this.needs) { // ensure needs not satisfied on the next one
						token = this.set(token, {needs: null, pos: 'NN'});
					}
				}
			}
			// satisfy need with an unknown pos
			if (this.needs && !token.pos) {
				if (!next || !next.pos || next.pos.parent != this.needs) { // ensure needs not satisfied on the next one
					token = this.set(token, {needs: null, pos: this.needs});
				}
			}
			// set them back as satisfied..
			if (this.needs === 'verb' && token.pos && token.pos.parent === 'verb') {
				this.needs = null;
			}
			if (this.needs === 'noun' && token.pos && token.pos.parent === 'noun') {
				this.needs = null;
			}
			return this.set(token, {});
		},
		// missing pos and sentences without verbs
		four: function(token) {
			if (!token.pos) {
				// if there is no verb in the sentence, and there needs to be.
				if (this.has['adjective'] && this.has['noun'] && !this.has['verb']) {
					return this.set(token, {pos: 'VB', pos_reason: 'needs one verb'});
				}
				// fallback to a noun
				token = this.set(token, {pos: 'NN', pos_reason: 'noun fallback'});
			}
			return token;
		},
		// error correction
		five: setTokenFn('special')
	};
}

////////////////
///party-time//
function sentencePos(sentence) {
	// run the passes above for current sentence
	this.tokens = sentence.tokens || {};
	this.pass = passFn();
	this.contract = contract;
	// first, let's handle the capitalisation-of-the-first-word issue
	if (this.tokens[1]) {
		// if second word is a noun-capital, give more sympathy to this capital
		if(this.tokens[1] && this.tokens[1].noun_capital && !lexi(this.tokens[0].normalised)){
			this.tokens[0].noun_capital = true;
		}
	}
	// Pass 1 and 2
	this.tokens = this.contract().map(this.pass.one).map(this.pass.two);
	// split-out more difficult contractions, like "he's"->["he is", "he was"] (now that we have enough pos data)
	this.tokens = this.contract(1); // ambiguous
	// Pass 3, 4, 5
	this.tokens = this.tokens.map(this.pass.three).map(this.pass.four).map(this.pass.five);
	// run the fifth pass again!
	sentence.tokens = this.tokens.map(this.pass.five);
	return sentence;
}
function toSentence(_s) {
	// make them Sentence objects
	var sentence = new Sentence( (this.options.combine) ? combine(_s.tokens) : _s.tokens );
	sentence.type = _s.type;
	// add analysis on each token
	sentence.tokens = sentence.tokens.map(function(token, i) {
		token.analysis = this[token.pos.parent](token.normalised, sentence, i);
		return token;
	}.bind(this));
	return sentence;
}
function addNextLast(sentence, i, sentences) {
	// add next / last
	sentence.last = sentences[i-1];
	sentence.next = sentences[i+1];
	return sentence;
}

exports.pos = function(text, options) {
	this.options = _.mixOptions('pos', options);
	if (!text || !text.match(/[a-z0-9]/i)) { return new Section([]); }
	// split to sentences, for each sentence run pos, make it a sentence object and add next/last :
	var sentences = this.tokenize(text).map(sentencePos).map(toSentence.bind(this)).map(addNextLast);
	// return a Section object, with its methods
	return new Section(sentences);
}
module.exports = exports.pos;

// console.log( pos('Geroge Clooney walked, quietly into a bank. It was cold.') )
// console.log( pos('it is a three-hundred and one').tags() )
// console.log( pos('funny funny funny funny').sentences[0].tokens )
// pos('In March 2009, while Secretary of State for Energy and Climate Change, Miliband attended the UK premiere of climate-change film The Age of Stupid, where he was ambushed').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '	'+t.text)})
// pos('the Energy and Climate Change, Miliband').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '	'+t.text)})
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
// pos('Dr. Conrad Murray recieved a guilty verdict').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '	'+t.text)})
// pos('the Phantom of the Opera').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '	'+t.text)})
// pos('Tony Hawk is nice').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '	'+t.text)})
// pos('tony hawk is nice').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '	'+t.text)})
// console.log(pos('look after a kid').sentences[0].tags())
// pos('Sather tried to stop the deal, but when he found out that Gretzky').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '	'+t.text+'	'+t.pos_reason)})
// pos('Gretzky had tried skating').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '	'+t.text+'	'+t.pos_reason)})

// console.log(pos('i think Tony Danza is cool. He rocks and he is golden.').sentences[0].tokens[2].analysis.referenced_by())
// console.log(pos('i think Tony Danza is cool and he is golden.').sentences[0].tokens[6].analysis.reference_to())
// console.log(pos('Tina grabbed her shoes. She is lovely.').sentences[0].tokens[0].analysis.referenced_by())
// console.log(pos('Tina grabbed her shoes. She is lovely.').sentences[0].tokens[0].analysis.referenced_by())

// console.log(pos("it's gotten the best features").sentences[0].tokens[1].normalised=="has") //bug

// console.log(pos("he's fun").sentences[0].tokens[1].normalised=="is")
// console.log(pos("she's walking").sentences[0].tokens[1].normalised=="is")
// console.log(pos("he's walked").sentences[0].tokens[1].normalised=="has")
// console.log(pos("it's got the best features").sentences[0].tokens[1].normalised=="has")
// console.log(pos("it's achieved each goal").sentences[0].tokens[1].normalised=="has")
// console.log(pos("where's waldo").sentences[0].tokens[1].normalised=="is")

// console.log(pos("where's he going?").sentences[0].tokens[1].normalised=="is")
// console.log(pos("where's the pencil?").sentences[0].tokens[1].normalised=="is")
// console.log(pos("where's he disappeared to?").sentences[0].tokens[1].normalised=="has")
// console.log(pos("where's the pencil disappeared to?").sentences[0].tokens[1].normalised=="has")