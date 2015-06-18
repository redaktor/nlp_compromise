// TODO - stub, WIP, not used yet

exports.nlpOptions = {
	cache: {db:false},
	pos: {dont_combine:true},
	ngram: {min_count:1, max_size:5},
	normalize: {percentage:50}
};
module.exports = function (db) {
		if (typeof module !== 'undefined' && module.exports) {
			exports.nlpOptions = require.nlpOptions;
		} else if (typeof window != 'undefined') {
			exports.nlpOptions = window.nlpOptions;
		}
		nlpOptions.nlp = {};

    return {
        get: function (key) { return exports.nlpOptions.nlp[key]; },
        set: function (key, val) { return exports.nlpOptions.nlp[key] = val; }
    }
};