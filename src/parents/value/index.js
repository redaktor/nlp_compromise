/**
 * wrapper module for value's methods
 * @module src/parents/value/index
 */
if (typeof lang != 'string') lang = 'en';
var schema = require('../../data/'+lang+'/schema');
var _ = require('../../_');
var cache = require('../../cache');
var to_date = require('./to_date');
var to_number = require('./to_number');
var rNr = /(\d+)(?=\D|$)/g;

function which() {
	if (this._date) { return schema['DA']; }
	if (this._number){ return schema['NU']; }
	return schema['CD'];
}
function numeralInDates(o) {
	var m = o.text.match(rNr), i;
	if (_.hasL(m)) {
		for (i=0; i<m.length; i++) {
			var nr = parseInt(m[i],10);
			var index = isNaN(nr) ? -1 : this.numerals.indexOf(nr);
			if (index > -1) { this.numerals.splice(index, 1); }
		}
	}
}
function value(str, sentence, word_i) {
  this.word = str || '';
	this.numerals = to_number.prototype.hasNumeral(this.word);
	this.numbers = [];
	this.dates = [];
	this.values = [];
	this.date();
	this.dates.forEach(numeralInDates.bind(this));
	
	this.number();
	cached = cache.get(this.word, 'valueWhich');
  this.which = (cached) ? cached : cache.set(this.word, (which.bind(this))(), 'valueWhich');
  return this;
}
value.prototype.has_date = function(){ return _.hasL(this.dates); };
value.prototype.has_number = function(){ return _.hasL(this.numbers); };
value.prototype.date = to_date;
value.prototype.number = to_number;

module.exports = value;
// console.log(new Value("fifty five").number())
// console.log(new Value("june 5th 1998").date())
