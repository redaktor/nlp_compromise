// nlp_comprimise by @spencermountain  in 2014

/* *********************************************************************************************************
//	The main dictionary to build various language (or context) specific lexica -
//  part 4 : The "Schema" --> parts_of_speech
********************************************************************************************************* */

// see ./build.js for generating the lexica

var main = {
	//verbs
	VB: {
		en: 'verb, generic',
		parent: 'verb'
	},
	VBD: {
		en: 'past-tense verb',
		parent: 'verb',
		tense: 'past'
	},
	VBN: {
		en: 'past-participle verb',
		parent: 'verb',
		tense: 'past'
	},
	VBP: {
		en: 'infinitive verb',
		parent: 'verb',
		tense: 'present'
	},
	VBF: {
		en: 'future-tense verb',
		parent: 'verb',
		tense: 'future'
	},
	VBZ: {
		en: 'present-tense verb',
		tense: 'present',
		parent: 'verb'
	},
	CP: {
		en: 'copula',
		parent: 'verb'
	},
	VBG: {
		en: 'gerund verb',
		parent: 'verb'
	},

	//adjectives
	JJ: {
		en: 'adjective, generic',
		parent: 'adjective'
	},
	JJR: {
		en: 'comparative adjective',
		parent: 'adjective'
	},
	JJS: {
		en: 'superlative adjective',
		parent: 'adjective'
	},

	//adverbs
	RB: {
		en: 'adverb',
		parent: 'adverb'
	},
	RBR: {
		en: 'comparative adverb',
		parent: 'adverb'
	},
	RBS: {
		en: 'superlative adverb',
		parent: 'adverb'
	},

	//nouns
	NN: {
		en: 'noun, generic',
		parent: 'noun'
	},
	NNP: {
		en: 'singular proper noun',
		parent: 'noun'
	},
	NNA: {
		en: 'noun, active',
		parent: 'noun'
	},
	NNPA: {
		en: 'noun, acronym',
		parent: 'noun'
	},
	NNPS: {
		en: 'plural proper noun',
		parent: 'noun'
	},
	NNAB: {
		en: 'noun, abbreviation',
		parent: 'noun'
	},
	NNS: {
		en: 'plural noun',
		parent: 'noun'
	},
	NNO: {
		en: 'possessive noun',
		parent: 'noun'
	},
	NNG: {
		en: 'gerund noun',
		parent: 'noun'
	},

	//glue
	PP: {
		en: 'possessive pronoun',
		parent: 'glue'
	},
	FW: {
		en: 'foreign word',
		parent: 'glue'
	},
	CD: {
		en: 'cardinal value, generic',
		parent: 'value'
	},
	DA: {
		en: 'date',
		parent: 'value'
	},
	NU: {
		en: 'number',
		parent: 'value'
	},
	IN: {
		en: 'preposition',
		parent: 'glue'
	},
	MD: {
		en: 'modal verb',
		parent: 'verb', //dunno
	},
	CC: {
		en: 'co-ordating conjunction',
		parent: 'glue'
	},
	PRP: {
		en: 'personal pronoun',
		parent: 'noun'
	},
	DT: {
		en: 'determiner',
		parent: 'glue'
	},
	UH: {
		en: 'interjection',
		parent: 'glue'
	},
	EX: {
		en: 'existential there',
		parent: 'glue'
	}
}
if (typeof module !== 'undefined' && module.exports) module.exports = main;