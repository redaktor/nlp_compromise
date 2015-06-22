/**
 * default OPTIONS <br>
 * for mixin in modules <br>
 * WIP <br>
 * @module src/_options
 */

// note: if we want the alternative of setting the subkeys flat,
// like {combine:false, min_count:2}, they must be unique ...
 
// TODO - WIP
module.exports = {
	cache: {
		size: 256, 
		db: false
	},
	pos: {
		combine: true
	},
	ngram: {
		min_count: 1, 
		max_size: 5
	},
	normalize: {
		percentage: 50
	}
};