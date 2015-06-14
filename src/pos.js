
if (typeof lang != 'string') lang = 'en';
var dPath = './data/'+lang+'/';
var lexicon = require(dPath+'lexicon');
var dates = require(dPath+'dates');
var numbers = require(dPath+'numbers');
var firstnames = require(dPath+'firstnames');
// .particles (possible 2nd part in a phrasal verb) and .contractions:
var pos_data = require(dPath+'pos_data');		
var suffixes = require(dPath+'suffixes');
var schema = require(dPath+'schema');
var word_rules = require(dPath+'word_rules');
var parents = require('./parents');
var tokenize = require('./methods/tokenization/tokenize');
var Sentence = require('./sentence');
var Section = require('./section');
var cache = require('./cache');

var vs = Object.keys(dates.months).concat(Object.keys(dates.days));
for (var k in numbers) {
	vs = vs.concat(Object.keys(numbers[k]))
}
var values = vs.reduce(function(h, s) { h[s] = 'CD'; return h; }, {});

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
	
// combine adjacent neighbours, and special cases
function combineTags(sentence) {
	var arr = sentence.tokens || [];
	
	function merge() {
		arr[i + 1] = mergeTokens(arr[i], arr[i + 1]);
		arr[i] = null;
	}
	function has(i, n) { // TODO - now decouple as data -> 'en'
		var tag = arr[i].pos.tag;
		var next = arr[i + 1];
		if (next) {
			if (n === 'NN_NN') { return (tag === next.pos.tag && arr[i].punctuated !== true && arr[i].noun_capital == next.noun_capital ); }
			if (n === 'CD_CD') { return (tag === 'CD' && next.pos.tag ==='CD'); }
			if (n === 'CD__CD') { return (tag === 'CD' && (next.normalised === 'and' || next.normalised === 'the') && arr[i + 2] && arr[i + 2].pos.tag === 'CD'); }
			if (n === 'NNAB_NN') { return ((tag === 'NNAB' && next.pos.parent ==='noun') || (arr[i].pos.parent==='noun' && next.pos.tag==='NNAB')); }
			if (n === 'VB_VB') { return (arr[i].normalised === 'will' && next.pos.parent === 'verb'); }
			if (n === 'NNP_NN') { return ((tag === 'NNP' && next.pos.tag ==='NN') || (tag === 'NN' && next.pos.tag === 'NNP')); }
			if (n === 'DT1') { return (tag=='NN' && arr[i].noun_capital && (next.normalised == 'of' || next.normalised == 'and') && arr[i + 2] && arr[i + 2].noun_capital); }
			if (n === 'DT2') { return (arr[i].noun_capital && next.normalised == 'of' && arr[i + 2] && arr[i + 2].pos.tag == 'DT' && arr[i + 3] && arr[i + 3].noun_capital); }
		}
		return false;
	}
	for (var i = 0; i <= arr.length; i++) {
		if (arr[i]) {
			var tag = arr[i].pos.tag;
			if (has(i, 'NN_NN') || has(i, 'CD_CD') || has(i, 'CD__CD') || has(i, 'NNAB_NN') || has(i, 'VB_VB')) {
				merge();	
			} else if (has(i, 'NNP_NN')) {
				merge();
				arr[i + 1].pos = schema['NNP'];
			} else if (has(i, 'DT1')) {
				merge();
				arr[i + 2] = mergeTokens(arr[i + 1], arr[i + 2]);
				arr[i + 1] = null;
			} else if (has(i, 'DT2')) {
				merge();
				arr[i + 2] = mergeTokens(arr[i + 1], arr[i + 2]);
				arr[i + 1] = null;
				arr[i + 3] = mergeTokens(arr[i + 2], arr[i + 3]);
				arr[i + 2] = null;
			}
		}
	}
	sentence.tokens = arr.filter(function(r) {
		return r;
	})
	return sentence;
}

// combine phrasal verbs
// some prepositions are clumped onto the back of a verb 'looked for', 'looks at'
// they should be combined with the verb, sometimes.
// TODO - some known are 3-gram phrasal verbs, like 'get away from' !!!
// TODO - does not handle seperated phrasal verbs ('take the coat off' -> 'take off')
function combinePhrasals(sentence) {
	var arr = sentence.tokens || [];
	for (var i = 1; i < arr.length; i++) {
		if(pos_data.particles[arr[i].normalised]){
			// it matches a known phrasal-verb
			if(lexicon[arr[i-1].normalised + ' ' + arr[i].normalised]){
				arr[i] = mergeTokens(arr[i-1], arr[i]);
				arr[i-1] = null;
			}
		}
	}
	sentence.tokens = arr.filter(function(r) {
		return r;
	})
	return sentence;
}


function lexiPass(w) {
	if (lexicon.hasOwnProperty(w)) {
		return schema[lexicon[w]];
	}
	// try to match it without a prefix - eg. outworked -> worked
	if (w.match(/^(over|under|out|-|un|re|en).{4}/)) {
		var attempt = w.replace(/^(over|under|out|.*?-|un|re|en)/, '');
		return schema[lexicon[attempt]];
	}
}

function rulePass(w) {
	for (var i = 0; i < word_rules.length; i++) {
		if (w.length> 4 && w.match(word_rules[i].reg)) {
			return schema[word_rules[i].pos];
		}
	}
}

function lastPass(token, i, sentence) {
	var last = sentence.tokens[i - 1];
	var next = sentence.tokens[i + 1];
	var strong_determiners = { // TODO decouple as data -> 'en'
		'the': 1,
		'a': 1,
		'an': 1
	};
	
	function setPos(p, pr) {
		token.pos = schema[p];
		token.pos_reason = pr;
	}
	
	// resolve ambiguous 'march','april','may' with dates
	if((token.normalised=='march'||token.normalised=='april'||token.normalised=='may') && ( (next && next.pos.tag=='CD') || (last && last.pos.tag=='CD') ) ){
		setPos('CD', 'may_is_date');
	}
		// if it's before a modal verb, it's a noun -> lkjsdf would
	if (next && token.pos.parent !== 'noun' && token.pos.parent !== 'glue' && next.pos.tag === 'MD') {
		setPos('NN', 'before_modal');
	}
	// if it's after the word 'will' its probably a verb/adverb
	if (last && last.normalised == 'will' && !last.punctuated && token.pos.parent == 'noun' && token.pos.tag !== 'PRP' && token.pos.tag !== 'PP') {
		setPos('VB', 'after_will');
	}
	// if it's after the word 'i' its probably a verb/adverb
	if (last && last.normalised == 'i' && !last.punctuated && token.pos.parent == 'noun') {
		setPos('VB', 'after_i');
	}
	// if it's after an adverb, it's not a noun -> quickly acked
	// support form 'atleast he is..'
	if (last && token.pos.parent === 'noun' && token.pos.tag !== 'PRP' && token.pos.tag !== 'PP' && last.pos.tag === 'RB' && !last.start) {
		setPos('VB', 'after_adverb');
	}
	// no consecutive, unpunctuated adjectives -> real good
	if (next && token.pos.parent === 'adjective' && next.pos.parent === 'adjective' && !token.punctuated) {
		setPos('RB', 'consecutive_adjectives');
	}
	// if it's after a determiner, it's not a verb -> the walk
	if (last && token.pos.parent === 'verb' && strong_determiners[last.pos.normalised] && token.pos.tag != 'CP') {
		setPos('NN', 'determiner-verb');
	}
	// copulas are followed by a determiner ('are a ..'), or an adjective ('are good')
	if (last && last.pos.tag === 'CP' && token.pos.tag !== 'DT' && token.pos.tag !== 'RB' && token.pos.tag !== 'PRP' && token.pos.parent !== 'adjective' && token.pos.parent !== 'value') {
		setPos('JJ', 'copula-adjective');
	}
	// copula, adverb, verb -> copula adverb adjective -> is very lkjsdf
	if (last && next && last.pos.tag === 'CP' && token.pos.tag === 'RB' && next.pos.parent === 'verb') {
		sentence.tokens[i + 1].pos = schema['JJ'];
		sentence.tokens[i + 1].pos_reason = 'copula-adverb-adjective';
	}
	//  the city [verb] him.
	if (next && next.pos.tag == 'PRP' && token.pos.tag !== 'PP' && token.pos.parent == 'noun' && !token.punctuated) {
		setPos('VB', 'before_[him|her|it]');
	}
	// the misled worker -> misled is an adjective, not vb
	if (last && next && last.pos.tag === 'DT' && next.pos.parent === 'noun' && token.pos.parent === 'verb') {
		setPos('JJ', 'determiner-adjective-noun');
	}
	
	// where's he gone -> gone=VB, not JJ
	if (last && last.pos.tag==='PRP' && token.pos.tag==='JJ' ) {
		setPos('VB', 'adjective-after-pronoun');
	}

	return token;
}

// add a 'quiet' token for contractions so we can represent their grammar
function handleContractions(arr) {
	var before, after, fix;
	for (var i = 0; i < arr.length; i++) {
		if (pos_data.contractions.hasOwnProperty(arr[i].normalised)) {
			before = arr.slice(0, i);
			after = arr.slice(i + 1, arr.length);
			fix = [{
				text: arr[i].text,
				normalised: pos_data.contractions[arr[i].normalised][0],
				start: arr[i].start
			}, {
				text: '',
				normalised: pos_data.contractions[arr[i].normalised][1],
				start: undefined
			}];
			arr = before.concat(fix);
			arr = arr.concat(after);
			return handleContractions(arr); // recursive
		}
	}
	return arr;
}

// these contractions require (some) grammatical knowledge to disambigous properly (e.g "he's"=> ['he is', 'he was']
function handleAmbiguousContractions(arr) {
	// TODO 'been' forces 'has' ...
	var before, after, fix;
	for (var i = 0; i < arr.length; i++) {
		if (pos_data.ambiguousContractions.hasOwnProperty(arr[i].normalised)) {
			before = arr.slice(0, i);
			after = arr.slice(i + 1, arr.length);
			// choose which verb this contraction should have..
			var chosen = 'is';
			// look for the next verb, and if it's past-tense (he's walked -> he has walked)
			for(var o=i+1; o<arr.length; o++){
				if(arr[o] && arr[o].pos && arr[o].pos.tag=='VBD'){ // past tense
					chosen = 'has';
					break;
				}
			}
			fix = [{
				text: arr[i].text,
				normalised: pos_data.ambiguousContractions[arr[i].normalised], // the "he" part
				start: arr[i].start,
				pos: schema[lexicon[pos_data.ambiguousContractions[arr[i].normalised]]],
				pos_reason:'ambiguous_contraction'
			}, {
				text: '',
				normalised: chosen, //is,was,or have
				start: undefined,
				pos: schema[lexicon[chosen]],
				pos_reason:'silent_contraction'
			}];
			arr = before.concat(fix);
			arr = arr.concat(after);
			return handleAmbiguousContractions(arr); // recursive
		}
	}
	return arr;
}

////////////////
///party-time//
exports.pos = function(text, options) {
	
	//console.log( 'CACHE TEST', cache.get('test') );
	
	options = options || {};
	if (!text || !text.match(/[a-z0-9]/i)) {
		return new Section([]);
	}
	var sentences = tokenize(text);
	
	function setPos(token, p, pr) {
		token.pos = schema[p];
		token.pos_reason = pr;
		return token;
	}

	sentences.forEach(function(sentence) {

		// first, let's handle the capitalisation-of-the-first-word issue
		var first = sentence.tokens[0];
		if (first) {
			// if second word is a noun-capital, give more sympathy to this capital
			if(sentence.tokens[1] && sentence.tokens[1].noun_capital && !lexiPass(first.normalised)){
				sentence.tokens[0].noun_capital = true;
			}
		}
		// smart handling of contractions
		sentence.tokens = handleContractions(sentence.tokens);

		// first pass, word-level clues
		sentence.tokens = sentence.tokens.map(function(token) {
			// it has a capital and isn't a month, etc.
			if (token.noun_capital && !values[token.normalised]) {
				return setPos(token, 'NN', 'noun_capitalised');
			}
			// known words list
			var lex = lexiPass(token.normalised);
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
			if (!token.normalised) {
				return setPos(token, 'UH', 'wordless_string');
			}
			// suffix pos signals from wordnet
			var len = token.normalised.length;
			if (len > 4) {
				var suffix = token.normalised.substr(len - 4, len - 1)
				if (suffixes.wordnet.hasOwnProperty(suffix)) {
					return setPos(token, suffixes.wordnet[suffix], 'wordnet suffix');
				}
			}

			// suffix regexes for words
			var r = rulePass(token.normalised);
			if (r) {
				token.pos = r;
				token.pos_reason = 'regex suffix'
				return token
			}

			// see if it's a number
			if (parseFloat(token.normalised)) {
				return setPos(token, 'CD', 'parsefloat')
			}
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
		
		//split-out more difficult contractions, like "he's"->["he is", "he was"]
		// (now that we have enough pos data to do this)
		sentence.tokens = handleAmbiguousContractions(sentence.tokens);
		
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
			if (token.pos) {
				has[token.pos.parent] = true;
			}
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
			return lastPass(token, i, sentence);
		})
		// run the fourth-pass again!
		sentence.tokens = sentence.tokens.map(function(token, i) {
			return lastPass(token, i, sentence);
		})
	})

	// combine neighbours
	if (!options.dont_combine) {
		sentences = sentences.map(function(s) {
			return combineTags(s);
		})
		sentences = sentences.map(function(s){
			return combinePhrasals(s);
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
		sentence.last = sentences[i-1];
		sentence.next = sentences[i+1];
		return sentence;
	})
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
