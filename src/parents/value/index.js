/**
 * wrapper module for value's methods
 * @module src/parents/value/index
 */
if (typeof lang != 'string') lang = 'en';
var schema = require('../../data/'+lang+'/schema');
var _ = require('../../_');
var cache = require('../../cache');
var toValue = require('./to_value');
/* //var rNr = /(\d+)(?=\D|$)/g;
function which(o) {
	if (this._date) { return schema['DA']; }
	if (this._number){ return schema['NU']; }
	return schema['CD'];
}
*/
function _get(filter){
	// covers more than 80 categories:
	return function(o){
		return (typeof o === 'object' && _.has('category',o) && o.category.indexOf(filter) > -1);
	}
}
function get(filter){
	return (filter === 'date' || filter === 'number') ? this[filter]() : this.values.filter(_get(filter));
}
function date(){ return this.dates; }
function number(w){ 
	if (!(this.numbers)) {
		var qs = this.values.filter(_get('quantity'));
		this.numbers = qs.map(function(o){ return {number:o.quantity, numeral:o.numeral, input:o.input} });
	}
	return this.numbers; 
}
function value(str, sentence, word_i) {
  this.input = str || '';
	this.numeric = this.input;
	this.numbers = false;
	this.dates = [];
	this.values = this.value();
	this.number();
	//cached = cache.get(this.input, 'valueWhich');
  //this.which = (cached) ? cached : cache.set(this.input, (which.bind(this))(), 'valueWhich');
  return this;
}
value.prototype.value = toValue;
value.prototype.date = date;
value.prototype.number = number;
value.prototype.get = get;
value.prototype.has_date = function(){ return _.hasL(this.dates); };
value.prototype.has_number = function(){ return _.hasL(this.numbers); };

module.exports = value;
// console.log(new Value("fifty five").number())
// console.log(new Value("june 5th 1998").date())
