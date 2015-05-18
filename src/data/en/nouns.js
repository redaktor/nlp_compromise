
var lang = 'en';
var nouns = (function() {
  var zip = { entityBlacklist: 
   [ 'west',
     'western',
     'east',
     'eastern',
     'north',
     'northern',
     'south',
     'southern',
     'today',
     'yesterday',
     'tomorrow',
     'era',
     'century',
     'my',
     'your',
     'itself',
     'the' ],
  prps: 
   [ 'it',
     'they',
     'i',
     'them',
     'you',
     'she',
     'me',
     'he',
     'him',
     'ourselves',
     'us',
     'we',
     'thou',
     'il',
     'elle',
     '\'em',
     'yourself' ] }; 

  var main = zip;
  if (typeof module !== "undefined" && module.exports) module.exports = main;

  return main;
})();