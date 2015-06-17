var _ = require("../../_");

exports.zip = {
	strongDeterminers: {
			the: 1,
			a: 1,
			an: 1
		},
	ambiguousContractions: function (a, i) {
		// look for the next verb, and if it's past-tense (he's walked -> he has walked)
		for(var j = i+1; j < a.length; j++){
			if(a[j] && a[j].pos && a[j].pos.tag=='VBD'){ // past tense
				return 'has';
			}
		}
		return 'is';
	},
	replace: {
			prefix: {
			matches: /^(over|under|out|-|un|re|en).{4}/,
			replaces: /^(over|under|out|.*?-|un|re|en)/,
			replacer: ''
		}
		},
	set: {
			ed: {
			tag: 'VB',
			_if: function (t,n,l) { return (t.pos_reason!=='lexicon' && t.normalised.match(/.ed$/)); }
		}
		},
	merge: {
			NN_NN: {
			_if: function (t,a,i) { return (t.pos.tag === a[i+1].pos.tag && t.punctuated !== true && t.noun_capital == a[i+1].noun_capital ); }
		},
			CD_CD: {
			_if: function (t,a,i) { return (t.pos.tag === 'CD' && a[i+1].pos.tag ==='CD'); }
		},
			CD_w_CD: {
			_if: function (t,a,i) { return (t.pos.tag === 'CD' && (a[i+1].normalised === 'and' || a[i+1].normalised === 'the') && a[i+2] && a[i+2].pos.tag === 'CD'); }
		},
			NNAB_NN: {
			_if: function (t,a,i) { return ((t.pos.tag === 'NNAB' && a[i+1].pos.parent ==='noun') || (t.pos.parent==='noun' && a[i+1].pos.tag==='NNAB')); }
		},
			VB_VB: {
			_if: function (t,a,i) { return (t.normalised === 'will' && a[i+1].pos.parent === 'verb'); }
		},
			NNP_NN: {
			tag: 'NNP',
			set: 1,
			_if: function (t,a,i) { return ((t.pos.tag === 'NNP' && a[i+1].pos.tag ==='NN') || (t.pos.tag === 'NN' && a[i+1].pos.tag === 'NNP')); }
		},
			DT1: {
			merge: 2,
			_if: function (t,a,i) { return (t.pos.tag=='NN' && t.noun_capital && (a[i+1].normalised == 'of' || a[i+1].normalised == 'and') && a[i+2] && a[i+2].noun_capital); }
		},
			DT2: {
			merge: 3,
			_if: function (t,a,i) { return (t.noun_capital && a[i+1].normalised == 'of' && a[i+2] && a[i+2].pos.tag == 'DT' && a[i+3] && a[i+3].noun_capital); }
		}
		},
	special: {
			mayIsDate: {
			tag: 'CD',
			_if: function (t,n,l) { return (_.has(t.normalised, ['march','april','may']) && ((n && n.pos.tag=='CD') || (l && l.pos.tag=='CD'))); }
		},
			beforeModal: {
			tag: 'NN',
			_if: function (t,n,l) { return (n && !_.has(t.pos.parent, ['noun','glue']) && n.pos.tag === 'MD'); }
		},
			afterWill: {
			tag: 'VB',
			_if: function (t,n,l) { return (l && l.normalised == 'will' && !l.punctuated && t.pos.parent == 'noun' && !_.has(t.pos.tag, ['PRP', 'PP'])); }
		},
			afterI: {
			tag: 'VB',
			_if: function (t,n,l) { return (l && l.normalised == 'i' && !l.punctuated && t.pos.parent == 'noun'); }
		},
			afterAdverb: {
			tag: 'VB',
			_if: function (t,n,l) { return (l && t.pos.parent === 'noun' && t.pos.tag !== 'PRP' && t.pos.tag !== 'PP' && l.pos.tag === 'RB' && !l.start); }
		},
			consecutiveAdjectives: {
			tag: 'RB',
			_if: function (t,n,l) { return (n && t.pos.parent === 'adjective' && n.pos.parent === 'adjective' && !t.punctuated); }
		},
			determinerVerb: {
			tag: 'NN',
			_if: function (t,n,l) { return (l && t.pos.parent === 'verb' && _.has(l.pos.normalised, ['the','a','an']) && t.pos.tag != 'CP'); }
		},
			copulaAdjective: {
			tag: 'JJ',
			_if: function (t,n,l) { return (l && l.pos.tag === 'CP' && !_.has(t.pos.tag, ['DT','RB','PRP']) && !_.has(t.pos.parent, ['adjective','value'])); }
		},
			copulaAdverbAdjective: {
			tag: 'JJ',
			set: 1,
			_if: function (t,n,l) { return (l && n && l.pos.tag === 'CP' && t.pos.tag === 'RB' && n.pos.parent === 'verb'); }
		},
			beforeHimHerIt: {
			tag: 'VB',
			_if: function (t,n,l) { return (n && n.pos.tag == 'PRP' && t.pos.tag !== 'PP' && t.pos.parent == 'noun' && !t.punctuated); }
		},
			determinerAdjectiveNoun: {
			tag: 'JJ',
			_if: function (t,n,l) { return (l && n && l.pos.tag === 'DT' && n.pos.parent === 'noun' && t.pos.parent === 'verb'); }
		},
			adjectiveAfterPronoun: {
			tag: 'VB',
			_if: function (t,n,l) { return (l && l.pos.tag==='PRP' && t.pos.tag==='JJ' ); }
		}
		}
}
module.exports = exports.zip;