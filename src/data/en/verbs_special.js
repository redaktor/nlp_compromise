
var lang = 'en';
var verbs_special = (function() {
  var zip = { cps: [ 'is', 'am', 'are', 'was', 'were', 'isn\'t', 'ain\'t', 'aren\'t' ],
  mds: 
   [ 'can',
     'could',
     'couldn\'t',
     'might',
     'may',
     'must',
     'mustn\'t',
     'will',
     'would',
     'wouldn\'t',
     'shall',
     'should',
     'shouldn\'t',
     'shan\'t',
     'shant',
     'lets',
     'let\'s',
     'who\'d',
     'ought' ] }; 

  var main = zip;

  if (typeof module !== "undefined" && module.exports) module.exports = main;

  return main;
})();