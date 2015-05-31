

//::NODE::
  var lang = 'en';
//::
var schema = (function() {
  var zip = { parents: [ 'verb', 'adjective', 'adverb', 'noun', 'glue', 'value' ],
  tags: 
   [ [ 'VB', 'verb, generic', 0 ],
     [ 'VBD', 'past-tense verb', 0, 'past' ],
     [ 'VBN', 'past-participle verb', 0, 'past' ],
     [ 'VBP', 'infinitive verb', 0, 'present' ],
     [ 'VBF', 'future-tense verb', 0, 'future' ],
     [ 'VBZ', 'present-tense verb', 0, 'present' ],
     [ 'CP', 'copula', 0 ],
     [ 'VBG', 'gerund verb', 0 ],
     [ 'JJ', 'adjective, generic', 1 ],
     [ 'JJR', 'comparative adjective', 1 ],
     [ 'JJS', 'superlative adjective', 1 ],
     [ 'RB', 'adverb', 2 ],
     [ 'RBR', 'comparative adverb', 2 ],
     [ 'RBS', 'superlative adverb', 2 ],
     [ 'NN', 'noun, generic', 3 ],
     [ 'NNP', 'singular proper noun', 3 ],
     [ 'NNA', 'noun, active', 3 ],
     [ 'NNPA', 'noun, acronym', 3 ],
     [ 'NNPS', 'plural proper noun', 3 ],
     [ 'NNAB', 'noun, abbreviation', 3 ],
     [ 'NNS', 'plural noun', 3 ],
     [ 'NNO', 'possessive noun', 3 ],
     [ 'NNG', 'gerund noun', 3 ],
     [ 'PP', 'possessive pronoun', 4 ],
     [ 'FW', 'foreign word', 4 ],
     [ 'CD', 'cardinal value, generic', 5 ],
     [ 'DA', 'date', 5 ],
     [ 'NU', 'number', 5 ],
     [ 'IN', 'preposition', 4 ],
     [ 'MD', 'modal verb', 0 ],
     [ 'CC', 'co-ordating conjunction', 4 ],
     [ 'PRP', 'personal pronoun', 3 ],
     [ 'DT', 'determiner', 4 ],
     [ 'UH', 'interjection', 4 ],
     [ 'EX', 'existential there', 4 ] ] }; 

  var main = (function () {
				var res = {};
				zip.tags.forEach(function(a) {
					res[a[0]] = { name:a[1], parent:zip.parents[a[2]], tag:a[0] };
					if (a.length > 3) {
						res[a[0]].tense = a[3];
					}
				});
				return res;
			})();

//::NODE::
  if (typeof module !== "undefined" && module.exports) module.exports = main;
//::

  return main;
})();