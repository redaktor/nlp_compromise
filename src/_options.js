/**
 * default OPTIONS <br>
 * for mixin in modules <br>
 * WIP <br>
 * @module src/_options
 */
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