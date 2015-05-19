// types: infinitive, gerund, past, present, doer, future 

var lang = 'en';
var verbs_conjugate = (function() {
  var zip = { irregulars: 
   [ [ 'be', '=$', 'was', 'is', 0 ],
     [ 'have', 'hav$', 'had', 'has', 0 ],
     [ 'do', '=$', 'did', '=es' ],
     [ 'begin', '=n$', 'began', '=s', '=n_' ],
     [ 'go', '=$', 'went', '=es' ],
     [ 'say', '=$', 'said', '=s', 0 ],
     [ 'hear', '=$', '=d', '=s' ],
     [ 'show', '=$', '=ed', '=s' ],
     [ 'br$', '=$', 'brought', '=s' ],
     [ 'take', 'tak$', 'took', '=s' ],
     [ 'put', '=t$', '=', '=s' ],
     [ 'give', 'giv$', 'gave', '=s' ],
     [ 'find', '=$', 'found', '=s' ],
     [ 'speak', '=$', 'spoke', '=s' ],
     [ 'make', 'mak$', 'made', '=s' ],
     [ 'know', '=$', 'knew', '=s' ],
     [ 'see', '=$', 'saw', '=s' ],
     [ 'come', 'com$', 'came', '=s' ],
     [ 'leave', 'leav$', 'left', '=s' ],
     [ 'set', '=t$', '=', '=s' ],
     [ 'get', '=t$', 'got', '=s' ],
     [ 'und_stand', '=$', 'und_stood', '=s', 0 ],
     [ 'arise', 'aris$', 'arose', '=s' ],
     [ 'babysit', '=t$', 'babysat', '=s' ],
     [ 'beat', '=$', '=', '=s' ],
     [ 'become', 'becom$', 'became', '=s' ],
     [ 'bend', '=$', 'bent', '=s' ],
     [ 'bet', '=t$', '=', '=s', 0 ],
     [ 'bind', '=$', 'bound', '=s' ],
     [ 'bite', 'bit$', 'bit', '=s' ],
     [ 'bleed', '=$', 'bled', '=s' ],
     [ 'blow', '=$', 'blew', '=s' ],
     [ 'break', '=$', 'broke', '=s' ],
     [ 'breed', '=$', 'bred', '=s' ],
     [ 'broadcast', '=$', '=', '=s' ],
     [ 'build', '=$', 'built', '=s' ],
     [ 'buy', '=$', 'bought', '=s' ],
     [ 'catch', '=$', 'caught', '=es' ],
     [ 'choose', 'choos$', 'chose', '=s' ],
     [ 'cost', '=$', '=', '=s' ],
     [ 'cut', '=t$', '=', '=s' ],
     [ 'deal', '=$', '=t', '=s', '=_' ],
     [ 'dig', '=g$', 'dug', '=s' ],
     [ 'draw', '=$', 'drew', '=s' ],
     [ 'drink', '=$', 'drank', '=s' ],
     [ 'drive', 'driv$', 'drove', '=s' ],
     [ 'eat', '=$', 'ate', '=s' ],
     [ 'fall', '=$', 'fell', '=s' ],
     [ 'feed', '=$', 'fed', '=s' ],
     [ 'feel', '=$', 'felt', '=s' ],
     [ 'fight', '=$', 'fought', '=s' ],
     [ 'fly', '=$', 'flew', '=s' ],
     [ 'forbid', '=$', 'forbade', '=s', 0 ],
     [ 'forget', '=$', 'forgot', '=s' ],
     [ 'forgive', 'forgiv$', 'forgave', '=s' ],
     [ 'freeze', 'freez$', 'froze', '=s' ],
     [ 'grow', '=$', 'grew', '=s' ],
     [ 'hang', '=$', 'hung', '=s' ],
     [ 'hide', 'hid$', 'hid', '=s' ],
     [ 'hit', '=t$', '=', '=s' ],
     [ 'hold', '=$', 'held', '=s' ],
     [ 'hurt', '=$', '=', '=s' ],
     [ 'relay', '=$', '=ed', '=s' ],
     [ 'lay', '=$', 'laid', '=s' ],
     [ 'lead', '=$', 'led', '=s' ],
     [ 'lend', '=$', 'lent', '=s' ],
     [ 'let', '=t$', '=', '=s' ],
     [ 'lie', 'ly$', 'lay', '=s' ],
     [ 'light', '=$', 'lit', '=s' ],
     [ 'lose', 'los$', 'lost', '=s' ],
     [ 'mean', '=$', '=t', '=s' ],
     [ 'meet', '=$', 'met', '=s' ],
     [ 'pay', '=$', 'paid', '=s' ],
     [ 'quit', '=t$', '=', '=s' ],
     [ 'read', '=$', '=', '=s' ],
     [ 'ride', 'rid$', 'rode', '=s' ],
     [ 'r$', '=$', 'rang', '=s' ],
     [ 'rise', 'ris$', 'rose', '=s' ],
     [ 'run', '=n$', 'ran', '=s', '=n_' ],
     [ 'sell', '=$', 'sold', '=s' ],
     [ 'send', '=$', 'sent', '=s' ],
     [ 'shake', 'shak$', 'shook', '=s' ],
     [ 'shine', 'shin$', 'shone', '=s' ],
     [ 'shoot', '=$', 'shot', '=s' ],
     [ 'shut', '=t$', '=', '=s' ],
     [ 's$', '=$', 'sang', '=s' ],
     [ 'sink', '=$', 'sank', '=s' ],
     [ 'sit', '=t$', 'sat', '=s' ],
     [ 'slide', 'slid$', 'slid', '=s' ],
     [ 'spend', '=$', 'spent', '=s' ],
     [ 'spin', '=n$', 'spun', '=s', '=n_' ],
     [ 'spread', '=$', '=', '=s' ],
     [ 'stand', '=$', 'stood', '=s' ],
     [ 'steal', '=$', 'stole', '=s' ],
     [ 'stick', '=$', 'stuck', '=s' ],
     [ 'st$', '=$', 'stung', '=s' ],
     [ 'strike', 'strik$', 'struck', '=s' ],
     [ 'swear', '=$', 'swore', '=s' ],
     [ 'swim', '=$', 'swam', '=s' ],
     [ 'sw$', '=$', 'swung', '=s' ],
     [ 'teach', '=$', 'taught', '=s' ],
     [ 'tear', '=$', 'tore', '=s' ],
     [ 'tell', '=$', 'told', '=s' ],
     [ 'think', '=$', 'thought', '=s' ],
     [ 'throw', '=$', 'threw', '=s' ],
     [ 'wake', 'wak$', 'woke', '=s' ],
     [ 'wear', '=$', 'wore', '=s' ],
     [ 'win', '=n$', 'won', '=s', '=n_' ],
     [ 'withdraw', '=$', 'withdrew', '=s' ],
     [ 'write', 'writ$', 'wrote', '=s' ],
     [ 'tie', 'ty$', '=d', '=s', '=r' ],
     [ 'obey', '=$', '=ed', '=s' ],
     [ 'ski', '=$', '=ied', '=s' ],
     [ 'boil', '=$', '=ed', '=s' ],
     [ 'bear', '=$', 'bore', '=s' ],
     [ 'miss', '=$', '=ed', '=' ],
     [ 'act', '=$', '=ed', '=s' ],
     [ 'compete', 'compet$', '=d', '=s' ],
     [ 'be$', 'are', 'w_e', 'are' ],
     [ 'imply', '=$', 'implied', 'implies' ],
     [ 'ice', 'ic$', '=d', '=s' ],
     [ 'beget', '=t$', 'begot', '=s' ],
     [ 'develop', '=$', '=', '=s' ],
     [ 'wait', '=$', '=ed', '=s' ],
     [ 'aim', '=$', '=ed', '=s' ],
     [ 'spill', '=$', 'spilt', '=s' ],
     [ 'burst', '=$', '=', '=s' ],
     [ 'cast', '=$', '=', '=s' ],
     [ 'crow', '=$', '=ed', '=s' ],
     [ 'flee', 'fle$', 'fled', '=s' ],
     [ 'fly', '=$', 'flew', 'flies' ],
     [ 'forsake', 'forsak$', 'forsook', '=s' ],
     [ 'grind', '=$', 'ground', '=s' ],
     [ 'melt', '=$', '=ed', '=s' ],
     [ 'mow', '=$', '=ed', '=s' ],
     [ 'pen', '=$', '=t', '=s' ],
     [ 'prove', 'prov$', '=d', '=s' ],
     [ 'rid', '=$', '=', '=es' ],
     [ 'shine', 'shin$', 'shone', '=s' ],
     [ 'shrink', '=$', 'shrank', '=s' ],
     [ 'shut', '=t$', '=', '=s' ],
     [ 'slay', '=$', 'slew', '=s' ],
     [ 'slink', '=$', 'slunk', '=s' ],
     [ 'smite', 'smit$', 'smote', '=s' ],
     [ 'spit', '=t$', 'spat', '=s' ],
     [ 'spread', '=$', '=', '=s' ],
     [ 'stink', '=$', 'stank', '=s' ],
     [ 'strive', 'striv$', 'strove', '=s' ],
     [ 'thrust', '=$', '=', '=s' ],
     [ 'tread', '=$', 'trod', '=s' ],
     [ 'weave', 'weav$', 'wove', '=s' ],
     [ 'wed', '=d$', '=', '=s' ],
     [ 'win', '=n$', 'won', '=s' ],
     [ 'dream', '=$', '=t', '=s', '=_' ],
     [ 'sail', '=$', '=ed', '=s', '=_' ],
     [ 'rub', '=b$', '=bed', '=s', '=b_' ],
     [ 'claim', '=$', '=ed', '=s', '=ant' ] ],
  noDoers: { appear: 1, happen: 1, seem: 1, try: 1, aid: 1, fail: 1, marry: 1 },
  irregularDoers: {} }; 

  var main = zip;
  main.irregulars = zip.irregulars.map(function (a) {
					var types = ['infinitive','gerund','past','present','doer','future'];
					var obj = {};
					switch (lang) {
						default:
							var r = function(s) {return s;}
							a.forEach(function(s, i) {
								if (s && i>0) s = s.replace('=', a[0]);
								if (s) s = s.replace(/\$/g, 'ing').replace(/_/g, 'er');
								if (i > 3 && !s) {
									main.noDoers[r(a[0])] = 1;
								} else if (i > 3) {
									main.irregularDoers[r(a[0])] = s;
								} else {
									obj[types[i]] = s;
								}
							});
						break;
					}
					return obj;
				});

  if (typeof module !== "undefined" && module.exports) module.exports = main;

  return main;
})();