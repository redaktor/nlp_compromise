exports.zip = {
	negate: {
			infinitive: {
			prefix: 'don\'t',
			tense: 'infinitive',
			_if: function (t/*, a, i*/) { return (t.analysis.form === 'infinitive' && t.analysis.tense != 'future'); }
		},
			gerund: {
			prefix: 'not',
			_if: function (t) { return (t.analysis.form === 'gerund'); }
		},
			past: {
			prefix: 'didn\'t',
			tense: 'infinitive',
			_if: function (t) { return (t.analysis.tense === 'past'); }
		},
			present: {
			prefix: 'doesn\'t',
			tense: 'infinitive',
			_if: function (t) { return (t.analysis.tense === 'present'); }
		},
			future: {
			prefix: 'won\'t',
			tense: 'infinitive',
			_if: function (t) { return (t.analysis.tense === 'future' && t.normalised.match(/will\b/)); }
		}
		}
}
module.exports = exports.zip;