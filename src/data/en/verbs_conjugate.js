// types: infinitive, gerund, past, present, doer, future 

var lang = 'en';
var verbs_conjugate = (function() {
  
//::NODE::
if (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");
//::
var zip = { irregulars: 
   [ [ 'be', '=&', 'was', 'is', 0 ],
     [ 'ha#', '<v&', '<d', '<s', 0 ],
     [ 'do', '=&', 'did', '=es' ],
     [ 'begin', '=n&', '<an', '=s', '=n_' ],
     [ 'go', '=&', 'went', '=es' ],
     [ 'say', '=&', '<aid', '=<', 0 ],
     [ 'hear', '=&', '=d', '=s' ],
     [ 'show', '=&', '=ed', '=s' ],
     [ 'br&', '=&', 'brought', '=s' ],
     [ 'take', '<k&', 'took', '=s' ],
     [ 'put', '=t&', '=', '=s' ],
     [ 'gi#', '<v&', 'ga#', '=s' ],
     [ 'find', '=&', 'found', '=s' ],
     [ 'speak', '=&', 'spoke', '=s' ],
     [ 'make', '<k&', '<de', '=s' ],
     [ 'know', '=&', '<ew', '=s' ],
     [ 'see', '=&', '<aw', '=<' ],
     [ 'come', '<m&', 'came', '=s' ],
     [ 'lea#', '<v&', 'left', '=s' ],
     [ 'set', '=t&', '=', '=<' ],
     [ 'get', '=tin<', '<ot', '=s' ],
     [ 'und_stand', '=&', 'und_stood', '=s', 0 ],
     [ 'arise', '<s&', 'arose', '=s' ],
     [ 'babysit', '=t&', '<at', '=s' ],
     [ 'beat', '=&', '=', '=s' ],
     [ 'become', '<m&', 'became', '=s' ],
     [ 'bend', '=&', '<nt', '=s' ],
     [ 'bet', '=t&', '=', '=s', 0 ],
     [ 'bind', '=&', 'bound', '=s' ],
     [ 'bite', '<t&', '<t', '=s' ],
     [ 'bleed', '=&', '<d', '=s' ],
     [ 'blow', '=&', '<ew', '=s' ],
     [ 'break', '=&', 'broke', '=s' ],
     [ 'breed', '=&', '<d', '=s' ],
     [ 'broadcast', '=&', '=', '=s' ],
     [ 'build', '=&', '<lt', '=s' ],
     [ 'buy', '=&', '<ought', '=s' ],
     [ 'catch', '=&', 'caught', '=es' ],
     [ 'choose', '<s&', 'chose', '=s' ],
     [ 'cost', '=&', '=', '=s' ],
     [ 'cut', '=t&', '=', '=s' ],
     [ 'deal', '=&', '=t', '=s', '=_' ],
     [ 'dig', '=g&', '<ug', '=s' ],
     [ 'draw', '=&', '<ew', '=s' ],
     [ 'drink', '=&', 'drank', '=s' ],
     [ 'dri#', '<v&', 'dro#', '=s' ],
     [ 'eat', '=&', 'at<', '=s' ],
     [ 'fall', '=&', 'fell', '=s' ],
     [ 'feed', '=&', '<d', '=s' ],
     [ 'feel', '=&', '<lt', '=s' ],
     [ 'fight', '=&', 'fought', '=s' ],
     [ 'fly', '=&', '<lew', '=s' ],
     [ 'forbid', '=&', '<ade', '=s', 0 ],
     [ 'forget', '=&', '<ot', '=s' ],
     [ 'forgi#', '<v&', 'forga#', '=s' ],
     [ 'freeze', '<z&', 'froze', '=s' ],
     [ 'grow', '=&', '<ew', '=s' ],
     [ 'hang', '=&', 'hung', '=s' ],
     [ 'hide', '<d&', '<d', '=s' ],
     [ 'hit', '=t&', '=', '=s' ],
     [ 'hold', '=&', 'held', '=s' ],
     [ 'hurt', '=&', '=', '=s' ],
     [ 'relay', '=&', '=ed', '=s' ],
     [ 'lay', '=&', '<aid', '=s' ],
     [ 'lead', '=&', '<d', '=s' ],
     [ 'lend', '=&', '<nt', '=s' ],
     [ 'let', '=t&', '=', '=s' ],
     [ 'lie', '<y&', '<ay', '=s' ],
     [ 'light', '=&', 'lit', '=s' ],
     [ 'lose', '<s&', '<st', '=s' ],
     [ 'mean', '=&', '=t', '=s' ],
     [ 'meet', '=&', '<t', '=s' ],
     [ 'pay', '=&', '<aid', '=s' ],
     [ 'quit', '=t&', '=', '=s' ],
     [ 'read', '=&', '=', '=s' ],
     [ 'ride', '<d&', 'rode', '=s' ],
     [ 'r&', '=&', 'rang', '=s' ],
     [ 'rise', '<s&', 'rose', '=s' ],
     [ 'run', '=n&', '<an', '=s', '=ne<' ],
     [ 'sell', '=&', 'sold', '=s' ],
     [ 'send', '=&', '<nt', '=s' ],
     [ 'shake', '<k&', 'shook', '=s' ],
     [ 'shine', '<n&', 'shone', '=s' ],
     [ 'shoot', '=&', '<t', '=s' ],
     [ 'shut', '=t&', '=', '=s' ],
     [ 's&', '=&', 'sang', '=s' ],
     [ 'sink', '=&', 'sank', '=s' ],
     [ 'sit', '=t&', '<at', '=<' ],
     [ 'slide', '<d&', '<d', '=s' ],
     [ 'spend', '=&', '<nt', '=s' ],
     [ 'spin', '=n&', '<un', '=s', '=n_' ],
     [ 'spread', '=&', '=', '=s' ],
     [ 'stand', '=&', 'stood', '=s' ],
     [ 'steal', '=&', 'stole', '=s' ],
     [ 'stick', '=&', 'stuck', '=s' ],
     [ 'st&', '=&', 'stung', '=s' ],
     [ 'strike', '<k&', 'struck', '=s' ],
     [ 'swear', '=&', 'swore', '=s' ],
     [ 'swim', '=&', '<am', '=s' ],
     [ 'sw&', '=&', 'swung', '=s' ],
     [ 'teach', '=&', 'taught', '=s' ],
     [ 'tear', '=&', 'tore', '=s' ],
     [ 'tell', '=&', 'told', '=s' ],
     [ 'think', '=&', 'thought', '=s' ],
     [ 'throw', '=&', '<ew', '=s' ],
     [ 'wake', '<k&', 'woke', '=s' ],
     [ 'wear', '=&', 'wore', '=s' ],
     [ 'win', '=n&', '<on', '=s', '=n_' ],
     [ 'withdraw', '=&', '<ew', '=s' ],
     [ 'write', '<t&', 'wrote', '=s' ],
     [ 'tie', '<y&', '=d', '=s', '=r' ],
     [ 'obey', '=&', '=ed', '=s' ],
     [ 'ski', '=&', '=ied', '=<' ],
     [ 'boil', '=&', '=ed', '=s' ],
     [ 'bear', '=&', 'bore', '=s' ],
     [ 'miss', '=&', '=ed', '=' ],
     [ 'act', '=&', '=ed', '=s' ],
     [ 'compete', '<t&', '=d', '=s' ],
     [ 'be&', 'are', 'w_e', 'are' ],
     [ 'imply', '=&', '<lied', '<lies' ],
     [ 'ice', '<c&', '=d', '=s' ],
     [ 'beget', '=t&', '<ot', '=s' ],
     [ 'de#lop', '=&', '=', '=s' ],
     [ 'wait', '=&', '=ed', '=s' ],
     [ 'aim', '=&', '=ed', '=s' ],
     [ 'spill', '=&', '<lt', '=s' ],
     [ 'burst', '=&', '=', '=s' ],
     [ 'cast', '=&', '=', '=s' ],
     [ 'crow', '=&', '=ed', '=s' ],
     [ 'flee', '<e&', '<ed', '=s' ],
     [ 'fly', '=&', '<lew', '<lies' ],
     [ 'forsake', '<k&', 'forsook', '=s' ],
     [ 'grind', '=&', 'ground', '=s' ],
     [ 'melt', '=&', '=ed', '=s' ],
     [ 'mow', '=&', '=ed', '=s' ],
     [ 'pen', '=&', '=t', '=s' ],
     [ 'pro#', '<v&', '=d', '=s' ],
     [ 'rid', '=&', '=', '=es' ],
     [ 'shine', '<n&', 'shone', '=s' ],
     [ 'shrink', '=&', 'shrank', '=s' ],
     [ 'shut', '=t&', '=', '=s' ],
     [ 'slay', '=&', '<ew', '=s' ],
     [ 'slink', '=&', 'slunk', '=s' ],
     [ 'smite', '<t&', 'smote', '=s' ],
     [ 'spit', '=t&', '<at', '=s' ],
     [ 'spread', '=&', '=', '=s' ],
     [ 'stink', '=&', 'stank', '=s' ],
     [ 'stri#', '<v&', 'stro#', '=s' ],
     [ 'thrust', '=&', '=', '=s' ],
     [ 'tread', '=&', 'trod', '=s' ],
     [ 'wea#', '<v&', 'wo#', '=s' ],
     [ 'wed', '=d&', '=', '=s' ],
     [ 'win', '=n&', '<on', '=s' ],
     [ 'dream', '=&', '=t', '=s', '=_' ],
     [ 'sail', '=&', '=ed', '=s', '=_' ],
     [ 'rub', '=b&', '=bed', '=s', '=be<' ],
     [ 'claim', '=&', '=ed', '=s', '=ant' ] ],
  noDoers: { appear: 1, happen: 1, seem: 1, try: 1, aid: 1, fail: 1, marry: 1 },
  irregularDoers: {} }; 

  var main = zip;
  main.irregulars = zip.irregulars.map(function (a) {
					var types = ['infinitive','gerund','past','present','doer','future'];
					var obj = {};
					var r = function(s) {return s;}
					a.forEach(function(s, i) {
						if (s && i > 0) {
							s = s.replace('=',a[0]).replace('<', a[0].slice(0,-2));
						}
						if (s) {
							s = helpFns.repl(s, 0, ['ing', 'er', 've']);
						}
						if (i > 3 && !s) {
							main.noDoers[r(a[0])] = 1;
						} else if (i > 3) {
							main.irregularDoers[r(a[0])] = s;
						} else {
							obj[types[i]] = s;
						}
					});
					return obj;
				});

//::NODE::
  if (typeof module !== "undefined" && module.exports) module.exports = main;
//::

  return main;
})();