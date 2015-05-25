    //generated from test data
 var suffix_rules = (function() {

    var zip = {
      'gerund':[
        'ing'
      ],
      'infinitive':[
        'ate',
        'ize',
        'tion',
        'rify',
        'ress',
        'ify',
        'age',
        'nce',
        'ect',
        'ise',
        'ine',
        'ish',
        'ace',
        'ash',
        'ure',
        'tch',
        'end',
        'ack',
        'and',
        'ute',
        'ade',
        'ock',
        'ite',
        'ase',
        'ose',
        'use',
        'ive',
        'int',
        'nge',
        'lay',
        'est',
        'ain',
        'ant',
        'eed',
        'er',
        'le'
      ],
      'past':[
        'ed',
        'lt',
        'nt',
        'pt',
        'ew',
        'ld'
      ],
      'present':[
        'rks',
        'cks',
        'nks',
        'ngs',
        'mps',
        'tes',
        'zes',
        'ers',
        'les',
        'acks',
        'ends',
        'ands',
        'ocks',
        'lays',
        'eads',
        'lls',
        'els',
        'ils',
        'ows',
        'nds',
        'ays',
        'ams',
        'ars',
        'ops',
        'ffs',
        'als',
        'urs',
        'lds',
        'ews',
        'ips',
        'es',
        'ts',
        'ns',
        's'
        ]
    }
    var suffix_rules = Object.keys(zip).reduce(function(h, k) {
			zip[k].forEach(function(w) { h[w] = k; })
			return h;
		}, {});
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = suffix_rules;
  }
  return suffix_rules;
})();
