/**
 * spot named entities <br>
 * just a wrapper for text -> entities <br>
 * most of this logic is in ./parents/noun
 * @module src/pos/sentence
 */
exports.main = function(text, options) {
	options = options || {};
	// collect 'entities' from all nouns
	var sentences = this.pos(text, options).sentences;
	var arr = sentences.reduce(function(arr, s) {
		return arr.concat(s.entities(options));
	}, []);
	// for people, remove instances of 'george', and 'bush' after 'george bush'.
	var ignore = {};
	arr = arr.filter(function(o){
		// add tokens to blacklist
		if(o.analysis.is_person()){
			o.normalised.split(' ').forEach(function(s){
				ignore[s] = true;
			})
		}
		if(ignore[o.normalised]){
			return false;
		}
		return true;
	})

	return arr;
}

module.exports = exports.main;
	
// console.log(spot("Tony Hawk is cool. Tony eats all day.").map(function(s){return s}))
// console.log(spot("Tony eats all day. Tony Hawk is cool.").map(function(s){return s}))
// console.log(spot("My Hawk is cool").map(function(s){return s.normalised}))
