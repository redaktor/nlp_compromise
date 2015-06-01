/*! nlp_compromise  0.5.2  by @spencermountain 2015-06-01  MIT */
var nlp = (function() {

var helpFns = (function() {
  var main = (function () {
		return {
			toObj: function(h,s){ h[s]=true; return h; },
			toObjValues: function(zip, obj){
				if (!obj) {obj = {}}
				return Object.keys(zip).reduce(function(h, k) {
					zip[k].forEach(function(w) { h[w] = k; });
					return h;
				}, {});
			},
			repl: function(a,s,r){
				if (typeof a === 'undefined') {return null}
				var std = ['&','_','#','~','!','%',';','@','0','1','2','3','4','5','6','7','8','9','>','`'];
				if (!s && r) {
					s = std.slice(0, r.length);
				}
				if (!r) {
					r = std;
				}
				var _r = function(w){
					s.forEach(function(rS, i) { w = w.replace(new RegExp(rS, 'g'), r[i]) });
					return w;
				}
				return (a instanceof Array) ? a.map(_r) : _r(a);
			},
			replBase: function(a,s,r){
				if (typeof a === 'undefined') {return null}
				var _s = a[1].replace('=',a[0]).replace('<', a[0].slice(0,-2));
				return [a[0], ((typeof s !== 'undefined') ? helpFns.repl(_s, s, r) : _s) ];
			}
		};
	})();


  return main;
})();



var multiples = (function() {
  var zip = { 'ad hominem': 'NN',
  'new york': 'NN',
  'new england': 'NN',
  'new hampshire': 'NN',
  'new delhi': 'NN',
  'new jersey': 'NN',
  'new mexico': 'NN',
  'united states': 'NN',
  'united kingdom': 'NN',
  'great britain': 'NN',
  'head start': 'NN',
  'will be': 'CP',
  'ought to': 'MD',
  'a la': 'IN',
  'a priori': 'FW',
  'et cetera': 'FW',
  'on board': 'JJ',
  'vice versa': 'JJ',
  'en route': 'JJ',
  'upside down': 'JJ',
  'up front': 'JJ',
  'in situ': 'JJ',
  'in vitro': 'JJ',
  'ad hoc': 'JJ',
  'de facto': 'JJ',
  'ad infinitum': 'JJ',
  'for keeps': 'JJ',
  'off guard': 'JJ',
  'spot on': 'JJ',
  'ipso facto': 'JJ',
  'fed up': 'JJ',
  'brand new': 'JJ',
  'old fashioned': 'JJ',
  'bona fide': 'JJ',
  'well off': 'JJ',
  'far off': 'JJ',
  'straight forward': 'JJ',
  'hard up': 'JJ',
  'sui generis': 'JJ',
  'en suite': 'JJ',
  'avant garde': 'JJ',
  'sans serif': 'JJ',
  'gung ho': 'JJ',
  'super duper': 'JJ',
  'of course': 'RB',
  'at least': 'RB',
  'no longer': 'RB',
  'sort of': 'RB',
  'at first': 'RB',
  'once again': 'RB',
  'once more': 'RB',
  'up to': 'RB',
  'by now': 'RB',
  'all but': 'RB',
  'just about': 'RB',
  'a lot': 'RB',
  'by far': 'RB',
  'at best': 'RB',
  'at large': 'RB',
  'for good': 'RB',
  'for sure': 'RB',
  'at most': 'RB',
  'per se': 'RB',
  'at worst': 'RB',
  'upwards of': 'RB',
  'en masse': 'RB',
  'point blank': 'RB',
  'ad nauseam': 'RB',
  'not withstanding': 'RB',
  'de jure': 'RB',
  'par excellence': 'RB',
  'de trop': 'RB',
  'a posteriori': 'RB' };

  var main = zip;



  return main;
})();
// types: infinitive, gerund, past, present, doer, future



var verbs_conjugate = (function() {


var zip = { irregulars:
   [ [ 'be', 'being', 'was', 'is', 0 ],
     [ 'have', 'having', 'had', 'has', 0 ],
     [ 'do', 'doing', 'did', 'does' ],
     [ 'begin', 'beginning', 'began', 'begins', 'beginner' ],
     [ 'go', 'going', 'went', 'goes' ],
     [ 'say', 'saying', 'said', 'says', 0 ],
     [ 'hear', 'hearing', 'heard', 'hears' ],
     [ 'show', 'showing', 'showed', 'shows' ],
     [ 'bring', 'bringing', 'brought', 'brings' ],
     [ 'take', 'taking', 'took', 'takes' ],
     [ 'put', 'putting', 'put', 'puts' ],
     [ 'give', 'giving', 'gave', 'gives' ],
     [ 'find', 'finding', 'found', 'finds' ],
     [ 'speak', 'speaking', 'spoke', 'speaks' ],
     [ 'make', 'making', 'made', 'makes' ],
     [ 'know', 'knowing', 'knew', 'knows' ],
     [ 'see', 'seeing', 'saw', 'sees' ],
     [ 'come', 'coming', 'came', 'comes' ],
     [ 'leave', 'leaving', 'left', 'leaves' ],
     [ 'set', 'setting', 'set', 'sets' ],
     [ 'get', 'getting', 'got', 'gets' ],
     [ 'understand', 'understanding', 'understood', 'understands', 0 ],
     [ 'arise', 'arising', 'arose', 'arises' ],
     [ 'babysit', 'babysitting', 'babysat', 'babysits' ],
     [ 'beat', 'beating', 'beat', 'beats' ],
     [ 'become', 'becoming', 'became', 'becomes' ],
     [ 'bend', 'bending', 'bent', 'bends' ],
     [ 'bet', 'betting', 'bet', 'bets', 0 ],
     [ 'bind', 'binding', 'bound', 'binds' ],
     [ 'bite', 'biting', 'bit', 'bites' ],
     [ 'bleed', 'bleeding', 'bled', 'bleeds' ],
     [ 'blow', 'blowing', 'blew', 'blows' ],
     [ 'break', 'breaking', 'broke', 'breaks' ],
     [ 'breed', 'breeding', 'bred', 'breeds' ],
     [ 'broadcast', 'broadcasting', 'broadcast', 'broadcasts' ],
     [ 'build', 'building', 'built', 'builds' ],
     [ 'buy', 'buying', 'bought', 'buys' ],
     [ 'catch', 'catching', 'caught', 'catches' ],
     [ 'choose', 'choosing', 'chose', 'chooses' ],
     [ 'cost', 'costing', 'cost', 'costs' ],
     [ 'cut', 'cutting', 'cut', 'cuts' ],
     [ 'deal', 'dealing', 'dealt', 'deals', 'dealer' ],
     [ 'dig', 'digging', 'dug', 'digs' ],
     [ 'draw', 'drawing', 'drew', 'draws' ],
     [ 'drink', 'drinking', 'drank', 'drinks' ],
     [ 'drive', 'driving', 'drove', 'drives' ],
     [ 'eat', 'eating', 'ate', 'eats' ],
     [ 'fall', 'falling', 'fell', 'falls' ],
     [ 'feed', 'feeding', 'fed', 'feeds' ],
     [ 'feel', 'feeling', 'felt', 'feels' ],
     [ 'fight', 'fighting', 'fought', 'fights' ],
     [ 'fly', 'flying', 'flew', 'flys' ],
     [ 'forbid', 'forbiding', 'forbade', 'forbids', 0 ],
     [ 'forget', 'forgeting', 'forgot', 'forgets' ],
     [ 'forgive', 'forgiving', 'forgave', 'forgives' ],
     [ 'freeze', 'freezing', 'froze', 'freezes' ],
     [ 'grow', 'growing', 'grew', 'grows' ],
     [ 'hang', 'hanging', 'hung', 'hangs' ],
     [ 'hide', 'hiding', 'hid', 'hides' ],
     [ 'hit', 'hitting', 'hit', 'hits' ],
     [ 'hold', 'holding', 'held', 'holds' ],
     [ 'hurt', 'hurting', 'hurt', 'hurts' ],
     [ 'relay', 'relaying', 'relayed', 'relays' ],
     [ 'lay', 'laying', 'laid', 'lays' ],
     [ 'lead', 'leading', 'led', 'leads' ],
     [ 'lend', 'lending', 'lent', 'lends' ],
     [ 'let', 'letting', 'let', 'lets' ],
     [ 'lie', 'lying', 'lay', 'lies' ],
     [ 'light', 'lighting', 'lit', 'lights' ],
     [ 'lose', 'losing', 'lost', 'loses' ],
     [ 'mean', 'meaning', 'meant', 'means' ],
     [ 'meet', 'meeting', 'met', 'meets' ],
     [ 'pay', 'paying', 'paid', 'pays' ],
     [ 'quit', 'quitting', 'quit', 'quits' ],
     [ 'read', 'reading', 'read', 'reads' ],
     [ 'ride', 'riding', 'rode', 'rides' ],
     [ 'ring', 'ringing', 'rang', 'rings' ],
     [ 'rise', 'rising', 'rose', 'rises' ],
     [ 'run', 'running', 'ran', 'runs', 'runner' ],
     [ 'sell', 'selling', 'sold', 'sells' ],
     [ 'send', 'sending', 'sent', 'sends' ],
     [ 'shake', 'shaking', 'shook', 'shakes' ],
     [ 'shine', 'shining', 'shone', 'shines' ],
     [ 'shoot', 'shooting', 'shot', 'shoots' ],
     [ 'shut', 'shutting', 'shut', 'shuts' ],
     [ 'sing', 'singing', 'sang', 'sings' ],
     [ 'sink', 'sinking', 'sank', 'sinks' ],
     [ 'sit', 'sitting', 'sat', 'sits' ],
     [ 'slide', 'sliding', 'slid', 'slides' ],
     [ 'spend', 'spending', 'spent', 'spends' ],
     [ 'spin', 'spinning', 'spun', 'spins', 'spinner' ],
     [ 'spread', 'spreading', 'spread', 'spreads' ],
     [ 'stand', 'standing', 'stood', 'stands' ],
     [ 'steal', 'stealing', 'stole', 'steals' ],
     [ 'stick', 'sticking', 'stuck', 'sticks' ],
     [ 'sting', 'stinging', 'stung', 'stings' ],
     [ 'strike', 'striking', 'struck', 'strikes' ],
     [ 'swear', 'swearing', 'swore', 'swears' ],
     [ 'swim', 'swiming', 'swam', 'swims' ],
     [ 'swing', 'swinging', 'swung', 'swings' ],
     [ 'teach', 'teaching', 'taught', 'teachs' ],
     [ 'tear', 'tearing', 'tore', 'tears' ],
     [ 'tell', 'telling', 'told', 'tells' ],
     [ 'think', 'thinking', 'thought', 'thinks' ],
     [ 'throw', 'throwing', 'threw', 'throws' ],
     [ 'wake', 'waking', 'woke', 'wakes' ],
     [ 'wear', 'wearing', 'wore', 'wears' ],
     [ 'win', 'winning', 'won', 'wins', 'winner' ],
     [ 'withdraw', 'withdrawing', 'withdrew', 'withdraws' ],
     [ 'write', 'writing', 'wrote', 'writes' ],
     [ 'tie', 'tying', 'tied', 'ties', 'tier' ],
     [ 'obey', 'obeying', 'obeyed', 'obeys' ],
     [ 'ski', 'skiing', 'skiied', 'skis' ],
     [ 'boil', 'boiling', 'boiled', 'boils' ],
     [ 'bear', 'bearing', 'bore', 'bears' ],
     [ 'miss', 'missing', 'missed', 'miss' ],
     [ 'act', 'acting', 'acted', 'acts' ],
     [ 'compete', 'competing', 'competed', 'competes' ],
     [ 'being', 'are', 'were', 'are' ],
     [ 'imply', 'implying', 'implied', 'implies' ],
     [ 'ice', 'icing', 'iced', 'ices' ],
     [ 'beget', 'begetting', 'begot', 'begets' ],
     [ 'develop', 'developing', 'develop', 'develops' ],
     [ 'wait', 'waiting', 'waited', 'waits' ],
     [ 'aim', 'aiming', 'aimed', 'aims' ],
     [ 'spill', 'spilling', 'spilt', 'spills' ],
     [ 'burst', 'bursting', 'burst', 'bursts' ],
     [ 'cast', 'casting', 'cast', 'casts' ],
     [ 'crow', 'crowing', 'crowed', 'crows' ],
     [ 'flee', 'fleing', 'fled', 'flees' ],
     [ 'fly', 'flying', 'flew', 'flies' ],
     [ 'forsake', 'forsaking', 'forsook', 'forsakes' ],
     [ 'grind', 'grinding', 'ground', 'grinds' ],
     [ 'melt', 'melting', 'melted', 'melts' ],
     [ 'mow', 'mowing', 'mowed', 'mows' ],
     [ 'prove', 'proving', 'proved', 'proves' ],
     [ 'rid', 'riding', 'rid', 'rides' ],
     [ 'shine', 'shining', 'shone', 'shines' ],
     [ 'shrink', 'shrinking', 'shrank', 'shrinks' ],
     [ 'shut', 'shutting', 'shut', 'shuts' ],
     [ 'slay', 'slaying', 'slew', 'slays' ],
     [ 'slink', 'slinking', 'slunk', 'slinks' ],
     [ 'smite', 'smiting', 'smote', 'smites' ],
     [ 'spit', 'spitting', 'spat', 'spits' ],
     [ 'spread', 'spreading', 'spread', 'spreads' ],
     [ 'stink', 'stinking', 'stank', 'stinks' ],
     [ 'strive', 'striving', 'strove', 'strives' ],
     [ 'thrust', 'thrusting', 'thrust', 'thrusts' ],
     [ 'tread', 'treading', 'trod', 'treads' ],
     [ 'weave', 'weaving', 'wove', 'weaves' ],
     [ 'wed', 'wedding', 'wed', 'weds' ],
     [ 'win', 'winning', 'won', 'wins' ],
     [ 'dream', 'dreaming', 'dreamt', 'dreams' ],
     [ 'sail', 'sailing', 'sailed', 'sails', 'dreamer' ],
     [ 'rub', 'rubbing', 'rubbed', 'rubs', 'sailer' ],
     [ 'claim', 'claiming', 'claimed', 'claims', 'rubber' ] ],
  noDoers: { appear: 1, happen: 1, seem: 1, try: 1, aid: 1, fail: 1, marry: 1 },
  irregularDoers: {} };

  var main = zip;
  main.irregulars = zip.irregulars.map(function (a) {
					var types = ['infinitive','gerund','past','present','doer','future'];
					var obj = {};
					var r = function(s) {return s;}
					a.forEach(function(s, i) {

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



  return main;
})();



var verbs_special = (function() {


var zip = { cps:
   [ [ 'is', 'isn\'t' ],
     [ 'am', 'ain\'t' ],
     [ 'are', 'aren\'t' ],
     [ 'was', 'wasn\'t' ],
     [ 'were', 'weren\'t' ],
     [ 'will be', 'won\'t be' ] ],
  mds:
   [ [ 'did', 'didn\'t' ],
     [ 'would', 'wouldn\'t' ],
     [ 'could', 'couldn\'t' ],
     [ 'should', 'shouldn\'t' ],
     [ 'can', 'can\'t' ],
     [ 'will', 'won\'t' ],
     [ 'must', 'mustn\'t' ],
     [ 'shall', 'shant' ],
     [ 'shall', 'shan\'t' ] ] };

  var main = (function () {
				var res = {};
				var negate = {};
				['cps', 'mds'].forEach(function(type) {
					res[type] = [];
					res[type] = res[type].concat.apply(res[type], zip[type].map(function(a) {

						negate[a[0]] = a[1];
						return a;
					}));
				});
				res.negate = negate;
				return res;
			})();



  return main;
})();



var verbs = (function() {
  var zip = [ 'use',
  'form',
  'hope',
  'consider',
  'work',
  'like',
  'achieve',
  'suppose',
  'watch',
  'occur',
  'change',
  'fix',
  'exist',
  'create',
  'help',
  'serve',
  'maintain',
  'start',
  'stay',
  'move',
  'want',
  'receive',
  'need',
  'finish',
  'produce',
  'introduce',
  'convert',
  'collapse',
  'stake',
  'forsee',
  'suck',
  'answer',
  'argue',
  'tend',
  'examine',
  'depend',
  'figure',
  'mind',
  'surround',
  'suspect',
  'reflect',
  'wonder',
  'end',
  'thank',
  'file',
  'regard',
  'report',
  'imagine',
  'ensure',
  'cause',
  'enter',
  'stop',
  'defeat',
  'surge',
  'launch',
  'turn',
  'control',
  'relate',
  'remember',
  'join',
  'listen',
  'train',
  'spring',
  'enjoy',
  'recognize',
  'obtain',
  'learn',
  'fill',
  'announce',
  'prevent',
  'realize',
  'involve',
  'remove',
  'visit',
  'test',
  'prepare',
  'ask',
  'carry',
  'determine',
  'raise',
  'love',
  'pull',
  'improve',
  'contain',
  'offer',
  'talk',
  'pick',
  'care',
  'express',
  'remain',
  'operate',
  'close',
  'add',
  'mention',
  'support',
  'decide',
  'walk',
  'vary',
  'demand',
  'describe',
  'agree',
  'allow',
  'suffer',
  'study',
  'press',
  'contribute',
  'compare',
  'apply',
  'direct',
  'discuss',
  'indicate',
  'require',
  'reach',
  'expect',
  'play',
  'permit',
  'kill',
  'charge',
  'increase',
  'believe',
  'continue',
  'live',
  'represent',
  'edit',
  'cover',
  'extend',
  'design',
  'supply',
  'suggest',
  'approach',
  'call',
  'include',
  'save',
  'discover',
  'establish',
  'keep',
  'assume',
  'attend',
  'unite',
  'explain',
  'publish',
  'accept',
  'settle',
  'reduce',
  'look',
  'interact',
  'concern',
  'labor',
  'return',
  'select',
  'die',
  'provide',
  'seek',
  'wish',
  'follow',
  'disagree',
  'attack',
  'attempt',
  'brake',
  'brush',
  'burn',
  'bang',
  'bomb',
  'budget',
  'comfort',
  'cook',
  'copy',
  'cough',
  'crush',
  'cry',
  'check',
  'claw',
  'clip',
  'combine',
  'damage',
  'desire',
  'doubt',
  'drain',
  'dance',
  'decrease',
  'defect',
  'deposit',
  'drift',
  'dip',
  'dive',
  'divorce',
  'exchange',
  'envy',
  'exert',
  'exercise',
  'export',
  'fold',
  'flood',
  'focus',
  'forecast',
  'fracture',
  'grip',
  'guide',
  'guard',
  'guarantee',
  'guess',
  'hate',
  'heat',
  'handle',
  'hire',
  'host',
  'hunt',
  'hurry',
  'import',
  'judge',
  'jump',
  'jam',
  'kick',
  'kiss',
  'knock',
  'laugh',
  'lift',
  'lock',
  'lecture',
  'link',
  'load',
  'loan',
  'lump',
  'message',
  'murder',
  'neglect',
  'overlap',
  'overtake',
  'overuse',
  'print',
  'protest',
  'pump',
  'push',
  'post',
  'progress',
  'promise',
  'purchase',
  'regret',
  'request',
  'reward',
  'roll',
  'rent',
  'repair',
  'scale',
  'screw',
  'shock',
  'sleep',
  'slip',
  'smash',
  'smell',
  'smoke',
  'sneeze',
  'snow',
  'surprise',
  'scratch',
  'search',
  'share',
  'shave',
  'splash',
  'stain',
  'stress',
  'switch',
  'taste',
  'touch',
  'trade',
  'trick',
  'twist',
  'trap',
  'travel',
  'tune',
  'undergo',
  'undo',
  'uplift',
  'vote',
  'wash',
  'wave',
  'whistle',
  'wreck',
  'yawn',
  'betray',
  'restrict',
  'perform',
  'worry',
  'point',
  'activate',
  'fear',
  'plan',
  'note',
  'face',
  'predict',
  'differ',
  'deserve',
  'torture',
  'recall',
  'count',
  'admit',
  'insist',
  'lack',
  'pass',
  'belong',
  'complain',
  'constitute',
  'rely',
  'refuse',
  'range',
  'cite',
  'flash',
  'arrive',
  'reveal',
  'consist',
  'observe',
  'notice',
  'trust',
  'display',
  'view',
  'stare',
  'acknowledge',
  'owe',
  'gaze',
  'treat',
  'account',
  'gather',
  'address',
  'confirm',
  'estimate',
  'manage',
  'participate',
  'sneak',
  'drop',
  'mirror',
  'experience',
  'arch',
  'dislike',
  'favor',
  'earn',
  'emphasize',
  'match',
  'question',
  'emerge',
  'encourage',
  'matter',
  'name',
  'head',
  'line',
  'slam',
  'list',
  'warn',
  'ignore',
  'resemble',
  'feature',
  'place',
  'reverse',
  'accuse',
  'spoil',
  'retain',
  'survive',
  'praise',
  'function',
  'please',
  'date',
  'remind',
  'deliver',
  'echo',
  'engage',
  'deny',
  'yield',
  'center',
  'gain',
  'anticipate',
  'reason',
  'side',
  'thrive',
  'defy',
  'dodge',
  'enable',
  'applaud',
  'persist',
  'pose',
  'reject',
  'attract',
  'await',
  'inhibit',
  'declare',
  'process',
  'risk',
  'urge',
  'value',
  'block',
  'confront',
  'credit',
  'cross',
  'amuse',
  'dare',
  'resent',
  'smile',
  'gloss',
  'threaten',
  'collect',
  'depict',
  'dismiss',
  'submit',
  'benefit',
  'step',
  'deem',
  'limit',
  'sense',
  'issue',
  'embody',
  'force',
  'govern',
  'replace',
  'bother',
  'cater',
  'adopt',
  'empower',
  'outweigh',
  'alter',
  'enrich',
  'influence',
  'prohibit',
  'pursue',
  'warrant',
  'convey',
  'approve',
  'reserve',
  'rest',
  'strain',
  'wander',
  'adjust',
  'dress',
  'market',
  'mingle',
  'disapprove',
  'evaluate',
  'flow',
  'inhabit',
  'pop',
  'rule',
  'depart',
  'roam',
  'assert',
  'disappear',
  'envision',
  'pause',
  'afford',
  'challenge',
  'grab',
  'grumble',
  'house',
  'portray',
  'revel',
  'base',
  'conduct',
  'review',
  'stem',
  'crave',
  'mark',
  'store',
  'target',
  'unlock',
  'weigh',
  'resist',
  'drag',
  'pour',
  'reckon',
  'assign',
  'cling',
  'rank',
  'attach',
  'decline',
  'destroy',
  'interfere',
  'paint',
  'skip',
  'sprinkle',
  'wither',
  'allege',
  'retire',
  'score',
  'monitor',
  'expand',
  'honor',
  'pack',
  'assist',
  'float',
  'appeal',
  'stretch',
  'undermine',
  'assemble',
  'boast',
  'bounce',
  'grasp',
  'install',
  'borrow',
  'crack',
  'elect',
  'shout',
  'contrast',
  'overcome',
  'relax',
  'relent',
  'strengthen',
  'conform',
  'dump',
  'pile',
  'scare',
  'relive',
  'resort',
  'rush',
  'boost',
  'cease',
  'command',
  'excel',
  'plug',
  'plunge',
  'proclaim',
  'discourage',
  'endure',
  'ruin',
  'stumble',
  'abandon',
  'cheat',
  'convince',
  'merge',
  'harm',
  'multiply',
  'overwhelm',
  'chew',
  'invent',
  'bury',
  'wipe',
  'has',
  'does',
  'added',
  'took',
  'define',
  'goes',
  'measure',
  'enhance',
  'distinguish',
  'avoid',
  'hit',
  'don\'t',
  'won\'t',
  'what\'s' ];

  var main = zip;



  return main;
})();
/* singular nouns having irregular plurals */



var nouns_inflect = (function() {


var zip = { NN:
   [ [ 'child', 'children' ],
     [ 'person', 'people' ],
     [ 'leaf', 'leaves' ],
     [ 'database', 'databases' ],
     [ 'quiz', 'quizzes' ],
     [ 'goose', 'geese' ],
     [ 'phenomenon', 'phenomena' ],
     [ 'barracks', 'barracks' ],
     [ 'deer', 'deer' ],
     [ 'syllabus', 'syllabi' ],
     [ 'index', 'indices' ],
     [ 'appendix', 'appendices' ],
     [ 'criterion', 'criteria' ],
     [ 'man', 'men' ],
     [ 'sex', 'sexes' ],
     [ 'narrative', 'narratives' ],
     [ 'addendum', 'addenda' ],
     [ 'alga', 'algae' ],
     [ 'alumna', 'alumnae' ],
     [ 'alumnus', 'alumni' ],
     [ 'bacillus', 'bacilli' ],
     [ 'beau', 'beaux' ],
     [ 'cactus', 'cactuses' ],
     [ 'château', 'châteaux' ],
     [ 'corpus', 'corpora' ],
     [ 'curriculum', 'curricula' ],
     [ 'die', 'dice' ],
     [ 'echo', 'echoes' ],
     [ 'embargo', 'embargoes' ],
     [ 'foot', 'feet' ],
     [ 'formula', 'formulas' ],
     [ 'genus', 'genera' ],
     [ 'graffito', 'graffiti' ],
     [ 'hippopotamus', 'hippopotami' ],
     [ 'larva', 'larvae' ],
     [ 'libretto', 'libretti' ],
     [ 'loaf', 'loaves' ],
     [ 'matrix', 'matrices' ],
     [ 'memorandum', 'memoranda' ],
     [ 'mosquito', 'mosquitoes' ],
     [ 'opus', 'opera' ],
     [ 'ovum', 'ova' ],
     [ 'ox', 'oxen' ],
     [ 'radius', 'radiuses' ],
     [ 'referendum', 'referenda' ],
     [ 'tableau', 'tableaux' ],
     [ 'that', 'those' ],
     [ 'thief', 'thieves' ],
     [ 'this', 'these' ],
     [ 'tooth', 'teeth' ],
     [ 'vita', 'vitae' ] ],
  PRP: [ [ 'i', 'we' ], [ 'he', 'they' ], [ 'she', 'they' ] ],
  PP:
   [ [ 'mine', 'ours' ],
     [ 'myself', 'yourselves' ],
     [ 'myself', 'ourselves' ],
     [ 'yourself', 'themselves' ],
     [ 'his', 'theirs' ],
     [ 'himself', 'themselves' ],
     [ 'her', 'theirs' ],
     [ 'hers', 'theirs' ],
     [ 'herself', 'themselves' ],
     [ 'its', 'theirs' ],
     [ 'theirs', 'theirs' ],
     [ 'themself', 'themselves' ] ],
  uc:
   [ 'oxen',
     'grammar',
     'series',
     'sheep',
     'fish',
     'aircraft',
     'bass',
     'bison',
     'fowl',
     'halibut',
     'moose',
     'salmon',
     'spacecraft',
     'tuna',
     'trout',
     'advice',
     'information',
     'knowledge',
     'trouble',
     'enjoyment',
     'fun',
     'recreation',
     'relaxation',
     'meat',
     'rice',
     'bread',
     'cake',
     'coffee',
     'ice',
     'water',
     'oil',
     'grass',
     'hair',
     'fruit',
     'wildlife',
     'equipment',
     'machinery',
     'furniture',
     'mail',
     'luggage',
     'jewelry',
     'clothing',
     'money',
     'mathematics',
     'economics',
     'physics',
     'civics',
     'ethics',
     'gymnastics',
     'mumps',
     'measles',
     'news',
     'tennis',
     'baggage',
     'currency',
     'soap',
     'toothpaste',
     'food',
     'sugar',
     'butter',
     'flour',
     'research',
     'leather',
     'wool',
     'wood',
     'coal',
     'weather',
     'homework',
     'cotton',
     'silk',
     'patience',
     'impatience',
     'vinegar',
     'art',
     'beef',
     'blood',
     'cash',
     'chaos',
     'cheese',
     'chewing',
     'conduct',
     'confusion',
     'education',
     'electricity',
     'entertainment',
     'fiction',
     'forgiveness',
     'gold',
     'gossip',
     'ground',
     'happiness',
     'history',
     'honey',
     'hospitality',
     'importance',
     'justice',
     'laughter',
     'leisure',
     'lightning',
     'literature',
     'luck',
     'melancholy',
     'milk',
     'mist',
     'music',
     'noise',
     'oxygen',
     'paper',
     'pay',
     'peace',
     'peanut',
     'pepper',
     'petrol',
     'plastic',
     'pork',
     'power',
     'pressure',
     'rain',
     'recognition',
     'sadness',
     'safety',
     'salt',
     'sand',
     'scenery',
     'shopping',
     'silver',
     'snow',
     'softness',
     'space',
     'speed',
     'steam',
     'sunshine',
     'tea',
     'thunder',
     'time',
     'traffic',
     'trousers',
     'violence',
     'warmth',
     'wine',
     'steel',
     'soccer',
     'hockey',
     'golf',
     'gum',
     'liquid',
     'species',
     'fahrenheit',
     'celcius',
     'kelvin',
     'hertz' ] };

  var main = (function () {

				zip.irregulars = zip.NN.concat(zip.PRP, zip.PP);
				zip.uncountables = zip.uc.reduce(helpFns.toObj,{});
				return zip;
			})();



  return main;
})();



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
  personBlacklist:
   [ 'center',
     'house',
     'park',
     'square',
     'centre',
     'memorial',
     'school',
     'bridge',
     'university',
     'college',
     'foundation',
     'institute',
     'club',
     'museum',
     'hall',
     'arena',
     'stadium',
     'the',
     'ave',
     'blvd',
     'uss',
     'ss',
     'for' ],
  prps:
   [ 'i',
     'you',
     'he',
     'she',
     'it',
     'we',
     'they',
     'me',
     'him',
     'her',
     'us',
     'them',
     'thou',
     'il',
     'elle',
     '\'em' ],
  pps:
   [ [ 'mine', 0 ],
     [ 'yours', 1 ],
     [ 'his', 2 ],
     [ 'her', 3 ],
     [ 'its', 4 ],
     [ 'our', 5 ],
     [ 'their', 6 ],
     [ 'them', 6 ] ] };

  var main = (function () {
				var _pps = {};
				zip.pps.forEach(function(a) { _pps[a[0]] = zip.prps[a[1]]; });
				return {
					prps: zip.prps.reduce(helpFns.toObj, {}),
					pps: _pps,
					entityBlacklist: zip.entityBlacklist.reduce(helpFns.toObj, {}),
					personBlacklist: zip.personBlacklist,
				}
			})();



  return main;
})();
// var types = ['adjective', 'adverb', 'comparative', 'superlative', 'noun'];
// 0 means 'return null' for adverbs OR 'conjugate without more/most' for comparative and superlative.
// 1 means 'default behavior'



var adjectives_decline = (function() {


var zip = [ [ 'wrong', 'wrong' ],
  [ 'public', 'publicly' ],
  [ 'vague', 'vaguely', 1 ],
  [ 'icy', 'icily' ],
  [ 'single', 'singly' ],
  [ 'female', 'womanly' ],
  [ 'male', 'manly' ],
  [ 'simple', 'simply', 1 ],
  [ 'whole', 'wholly' ],
  [ 'special', 'especially' ],
  [ 'straight', 'straight', 1 ],
  [ 'gay', 'gay' ],
  [ 'fast', 'fast', 1 ],
  [ 'hard', 'hard', 1, 'hardest' ],
  [ 'late', 'late', 1, 'latest' ],
  [ 'early', 'early', 1 ],
  [ 'best', 'best' ],
  [ 'latter', 'latter' ],
  [ 'bad', 'badly', 'worse', 'worst' ],
  [ 'idle', 'idly' ],
  [ 'black', 0, 1 ],
  [ 'white', 0, 1 ],
  [ 'green', 0, 'greener', 1 ],
  [ 'red', 0, 'redder', 1 ],
  [ 'blue', 0, 1 ],
  [ 'yellow', 0, 'yellower', 1 ],
  [ 'cyan', 0 ],
  [ 'magenta', 0 ],
  [ 'brown', 0, 1 ],
  [ 'orange', 0, 1 ],
  [ 'gold', 0 ],
  [ 'grey', 0, 'greyer', 0 ],
  [ 'gray', 0, 'grayer', 0 ],
  [ 'foreign', 0 ],
  [ 'modern', 0 ],
  [ 'next', 0 ],
  [ 'difficult', 0 ],
  [ 'degenerate', 0 ],
  [ 'young', 0, 1 ],
  [ 'awake', 0 ],
  [ 'back', 0 ],
  [ 'complex', 0 ],
  [ 'cool', 0, 1 ],
  [ 'dirty', 0, 1 ],
  [ 'done', 0 ],
  [ 'empty', 0, 1 ],
  [ 'fat', 0, 1 ],
  [ 'fertile', 0 ],
  [ 'frozen', 0 ],
  [ 'medium', 0 ],
  [ 'parallel', 0 ],
  [ 'outdoor', 0 ],
  [ 'unknown', 0 ],
  [ 'undersized', 0 ],
  [ 'used', 0 ],
  [ 'welcome', 0 ],
  [ 'fixed', 0 ],
  [ 'mixed', 0 ],
  [ 'super', 0 ],
  [ 'superb', 0 ],
  [ 'guilty', 0 ],
  [ 'tiny', 0 ],
  [ 'able', 0 ],
  [ 'unable', 0 ],
  [ 'same', 0 ],
  [ 'adult', 0 ],
  [ 'good', 'well', 'better', 'best' ],
  [ 'sad', 1, 'sadder', 1 ],
  [ 'overweight', 1 ],
  [ 'main', 1 ],
  [ 'nearby', 1 ],
  [ 'asleep', 1 ],
  [ 'weekly', 1 ],
  [ 'secret', 1, 'more secret', 'top secret' ],
  [ 'certain', 1 ],
  [ 'ready', 1, 'readier', 'readiest' ],
  [ 'nice', 1, 1, 'nicest' ],
  [ 'inner', 1, 0, 'innermost' ],
  [ 'outer', 1, 0, 'outermost' ],
  [ 'far', 1, 'further', 'furthest' ],
  [ 'clean', 1, 1, 1, 'cleanliness' ],
  [ 'naive', 1, 0, 0, 'naivety' ],
  'vague',
  'simple',
  'straight',
  'fast',
  'hard',
  'late',
  'early',
  'black',
  'white',
  'green',
  'red',
  'blue',
  'yellow',
  'brown',
  'orange',
  'young',
  'cool',
  'dirty',
  'empty',
  'fat',
  'sad',
  'nice',
  'clean',
  'full',
  'absurd',
  'alert',
  'alive',
  'big',
  'bitter',
  'brash',
  'brave',
  'brief',
  'bright',
  'broad',
  'calm',
  'charming',
  'cheap',
  'close',
  'cold',
  'cruel',
  'curly',
  'cute',
  'damp',
  'dark',
  'dead',
  'dear',
  'deep',
  'drunk',
  'dry',
  'dull',
  'eager',
  'easy',
  'even',
  'extreme',
  'faint',
  'fair',
  'fanc',
  'feeble',
  'few',
  'fierce',
  'fine',
  'firm',
  'flat',
  'forgetful',
  'frail',
  'free',
  'fresh',
  'funny',
  'gentle',
  'glad',
  'glib',
  'grand',
  'great',
  'harsh',
  'heavy',
  'high',
  'hollow',
  'hot',
  'impolite',
  'important',
  'keen',
  'kind',
  'lame',
  'large',
  'loose',
  'loud',
  'low',
  'lush',
  'macho',
  'mad',
  'mature',
  'meek',
  'mellow',
  'mundane',
  'narrow',
  'near',
  'neat',
  'new',
  'noisy',
  'odd',
  'old',
  'pale',
  'pink',
  'plain',
  'poor',
  'pure',
  'purple',
  'quick',
  'quiet',
  'rare',
  'raw',
  'rich',
  'round',
  'rude',
  'safe',
  'scarce',
  'shallow',
  'sharp',
  'short',
  'shrill',
  'slim',
  'slow',
  'small',
  'smooth',
  'soft',
  'soon',
  'sore',
  'sour',
  'square',
  'stale',
  'steep',
  'stiff',
  'strange',
  'strict',
  'strong',
  'sweet',
  'swift',
  'tall',
  'tame',
  'tart',
  'tender',
  'tense',
  'thick',
  'thin',
  'tight',
  'tough',
  'true',
  'vast',
  'vulgar',
  'warm',
  'weak',
  'weird',
  'wet',
  'wild',
  'windy',
  'wise',
  'aggressive',
  'awesome',
  'beautiful',
  'bored',
  'boring',
  'efficient',
  'gruesome',
  'handsome',
  'innocent',
  'lean',
  'little',
  'long',
  'normal',
  'proud',
  'rapid',
  'scared',
  'smart',
  'thirsty',
  'hungry',
  'clear',
  'happy',
  'lucky',
  'pretty',
  'interesting',
  'attractive',
  'dangerous',
  'intelligent',
  'intellegent',
  'formal',
  'tired',
  'solid',
  'angry' ];

  var main = (function () {
				var res = { convertables: [], adj_to_advs: {}, adv_donts: [], to_comparative: {}, to_superlative: {}, to_noun: {} };
				zip.forEach(function(_a) {
					if (typeof _a === 'string') {
						res.convertables.push(_a);
					} else {
						var a = _a.map(function(w){ return w; });
						if (a.length > 1) {
							if (a[1] === 0) { res.adv_donts.push(a[0]); }
							if (typeof a[1] === 'string') { res.adj_to_advs[a[0]] = a[1]; }
						}
						if (a[2] && a[2] === 1) {
							res.convertables.push(a[0]);
						} else if (a.length>2) {
							res.to_comparative[a[0]] = a[2];
						}
						if (a.length>3 && a[3]!=1) {
							res.to_superlative[a[0]] = a[3];
						}
						if (a.length>4 && a[4]!=1) {
							res.to_noun[a[0]] = a[4];
						}
					}
				});
				res.convertables = res.convertables.reduce(helpFns.toObj, {});
				res.adv_donts = res.adv_donts.reduce(helpFns.toObj, {});
				return res;
			})();



  return main;
})();



var adjectives_demonym = (function() {
  var zip = [ 'afghan',
  'albanian',
  'algerian',
  'argentine',
  'armenian',
  'australian',
  'aussie',
  'austrian',
  'bangladeshi',
  'belgian',
  'bolivian',
  'bosnian',
  'brazilian',
  'bulgarian',
  'cambodian',
  'canadian',
  'chilean',
  'chinese',
  'colombian',
  'croat',
  'cuban',
  'czech',
  'dominican',
  'egyptian',
  'british',
  'estonian',
  'ethiopian',
  'finnish',
  'french',
  'gambian',
  'georgian',
  'german',
  'greek',
  'haitian',
  'hungarian',
  'indian',
  'indonesian',
  'iranian',
  'iraqi',
  'irish',
  'israeli',
  'italian',
  'jamaican',
  'japanese',
  'jordanian',
  'kenyan',
  'korean',
  'kuwaiti',
  'latvian',
  'lebanese',
  'liberian',
  'libyan',
  'lithuanian',
  'macedonian',
  'malaysian',
  'mexican',
  'mongolian',
  'moroccan',
  'dutch',
  'nicaraguan',
  'nigerian',
  'norwegian',
  'omani',
  'pakistani',
  'palestinian',
  'filipino',
  'polish',
  'portuguese',
  'qatari',
  'romanian',
  'russian',
  'rwandan',
  'samoan',
  'saudi',
  'scottish',
  'senegalese',
  'serbian',
  'singaporean',
  'slovak',
  'somali',
  'sudanese',
  'swedish',
  'swiss',
  'syrian',
  'taiwanese',
  'thai',
  'tunisian',
  'ugandan',
  'ukrainian',
  'american',
  'hindi',
  'spanish',
  'venezuelan',
  'vietnamese',
  'welsh',
  'african',
  'european',
  'asian',
  'californian' ];

  var main = zip;



  return main;
})();



var adjectives = (function() {
  var zip = [ 'wrong',
  'public',
  'icy',
  'single',
  'female',
  'male',
  'whole',
  'special',
  'gay',
  'best',
  'latter',
  'bad',
  'idle',
  'cyan',
  'magenta',
  'gold',
  'grey',
  'gray',
  'foreign',
  'modern',
  'next',
  'difficult',
  'degenerate',
  'awake',
  'back',
  'complex',
  'done',
  'fertile',
  'frozen',
  'medium',
  'parallel',
  'outdoor',
  'unknown',
  'undersized',
  'used',
  'welcome',
  'fixed',
  'mixed',
  'super',
  'superb',
  'guilty',
  'tiny',
  'able',
  'unable',
  'same',
  'adult',
  'good',
  'overweight',
  'main',
  'nearby',
  'asleep',
  'weekly',
  'secret',
  'certain',
  'ready',
  'inner',
  'outer',
  'far',
  'naive',
  'practical',
  'theoretical',
  'sporadic',
  'basic',
  'grammatical',
  'alphabetical',
  'economical',
  'conical',
  'political',
  'vertical',
  'critical',
  'fantastic',
  'mystical',
  'pornographic',
  'jolly',
  'colonial',
  'moody',
  'literal',
  'actual',
  'probable',
  'apparent',
  'usual',
  'aberrant',
  'ablaze',
  'absolute',
  'aboard',
  'abrupt',
  'absent',
  'absorbing',
  'abundant',
  'accurate',
  'afraid',
  'agonizing',
  'aloof',
  'amazing',
  'arbitrary',
  'arrogant',
  'astonishing',
  'average',
  'aware',
  'awkward',
  'bankrupt',
  'bawdy',
  'beneficial',
  'bent',
  'better',
  'bizarre',
  'bloody',
  'bouncy',
  'brilliant',
  'broken',
  'burly',
  'busy',
  'cagey',
  'careful',
  'caring',
  'chief',
  'chilly',
  'civil',
  'clever',
  'closed',
  'cloudy',
  'colossal',
  'commercial',
  'common',
  'complete',
  'concerned',
  'concrete',
  'congruent',
  'constant',
  'cooing',
  'correct',
  'cowardly',
  'craven',
  'cuddly',
  'daily',
  'damaged',
  'damaging',
  'dapper',
  'dashing',
  'deadpan',
  'deeply',
  'defiant',
  'delicate',
  'delightful',
  'desperate',
  'determined',
  'didactic',
  'discreet',
  'double',
  'doubtful',
  'downtown',
  'dreary',
  'east',
  'eastern',
  'elderly',
  'elegant',
  'elfin',
  'elite',
  'eminent',
  'encouraging',
  'entire',
  'erect',
  'ethereal',
  'exact',
  'expert',
  'extra',
  'exuberant',
  'exultant',
  'false',
  'fancy',
  'faulty',
  'financial',
  'first',
  'fit',
  'flagrant',
  'foamy',
  'foolish',
  'foregoing',
  'former',
  'fortunate',
  'frantic',
  'freezing',
  'frequent',
  'fretful',
  'friendly',
  'fun',
  'furry',
  'future',
  'gainful',
  'gaudy',
  'giant',
  'giddy',
  'gigantic',
  'gleaming',
  'global',
  'gone',
  'goofy',
  'graceful',
  'grateful',
  'gratis',
  'groovy',
  'gross',
  'guarded',
  'half',
  'handy',
  'hanging',
  'hateful',
  'heady',
  'heavenly',
  'hellish',
  'helpful',
  'hesitant',
  'highfalutin',
  'homely',
  'honest',
  'huge',
  'humdrum',
  'hurried',
  'ignorant',
  'ill',
  'illegal',
  'immediate',
  'immense',
  'imminent',
  'impartial',
  'imperfect',
  'imported',
  'initial',
  'innate',
  'inside',
  'irate',
  'juicy',
  'junior',
  'juvenile',
  'kaput',
  'kindly',
  'knowing',
  'labored',
  'languid',
  'learned',
  'left',
  'legal',
  'lethal',
  'level',
  'lewd',
  'likely',
  'literate',
  'lively',
  'living',
  'lonely',
  'longing',
  'loutish',
  'lovely',
  'loving',
  'lowly',
  'luxuriant',
  'lying',
  'macabre',
  'madly',
  'magenta',
  'major',
  'makeshift',
  'mammoth',
  'married',
  'measly',
  'meaty',
  'mere',
  'middle',
  'miniature',
  'minor',
  'miscreant',
  'mobile',
  'moldy',
  'mute',
  'necessary',
  'neighborly',
  'nimble',
  'nonchalant',
  'nondescript',
  'nonstop',
  'north',
  'nosy',
  'obeisant',
  'obese',
  'obscene',
  'observant',
  'obsolete',
  'offbeat',
  'official',
  'ok',
  'open',
  'opposite',
  'organic',
  'outgoing',
  'oval',
  'over',
  'overall',
  'overt',
  'overwrought',
  'painful',
  'past',
  'peaceful',
  'perfect',
  'petite',
  'picayune',
  'placid',
  'plant',
  'pleasant',
  'polite',
  'potential',
  'pregnant',
  'premium',
  'present',
  'pricey',
  'prickly',
  'primary',
  'prior',
  'private',
  'profuse',
  'proper',
  'pumped',
  'puny',
  'quack',
  'quaint',
  'quickest',
  'rabid',
  'racial',
  'real',
  'rebel',
  'recondite',
  'redundant',
  'relevant',
  'remote',
  'resolute',
  'resonant',
  'right',
  'rightful',
  'ripe',
  'ritzy',
  'robust',
  'romantic',
  'roomy',
  'rotten',
  'rough',
  'royal',
  'salty',
  'scary',
  'scientific',
  'screeching',
  'second',
  'secure',
  'sedate',
  'seemly',
  'selfish',
  'senior',
  'separate',
  'severe',
  'shiny',
  'shocking',
  'shy',
  'sick',
  'significant',
  'silly',
  'sincere',
  'skinny',
  'slight',
  'slimy',
  'smelly',
  'snobbish',
  'social',
  'somber',
  'sordid',
  'sorry',
  'southern',
  'spare',
  'specific',
  'spicy',
  'splendid',
  'squeamish',
  'standard',
  'standing',
  'steadfast',
  'steady',
  'stereotyped',
  'still',
  'striped',
  'stupid',
  'sturdy',
  'subdued',
  'subsequent',
  'substantial',
  'sudden',
  'superficial',
  'supreme',
  'sure',
  'taboo',
  'tan',
  'tasteful',
  'tawdry',
  'telling',
  'temporary',
  'terrific',
  'tested',
  'thoughtful',
  'tidy',
  'top',
  'torpid',
  'tranquil',
  'trite',
  'ugly',
  'ultra',
  'unbecoming',
  'understood',
  'uneven',
  'unfair',
  'unlikely',
  'unruly',
  'unsightly',
  'untidy',
  'unwritten',
  'upbeat',
  'upper',
  'uppity',
  'upset',
  'upstairs',
  'uptight',
  'useful',
  'utter',
  'uttermost',
  'vagabond',
  'vanilla',
  'various',
  'vengeful',
  'verdant',
  'violet',
  'volatile',
  'wanting',
  'wary',
  'wasteful',
  'weary',
  'western',
  'wholesale',
  'wide',
  'wiry',
  'wistful',
  'wooden',
  'woozy',
  'wound',
  'wry',
  'zany',
  'sacred',
  'detailed',
  'ongoing',
  'prominent',
  'permanent',
  'diverse',
  'partial',
  'moderate',
  'contemporary',
  'intense',
  'widespread',
  'ultimate',
  'ideal',
  'adequate',
  'sophisticated',
  'naked',
  'dominant',
  'precise',
  'intact',
  'adverse',
  'genuine',
  'subtle',
  'universal',
  'resistant',
  'routine',
  'distant',
  'unexpected',
  'soviet',
  'blind',
  'artificial',
  'mild',
  'legitimate',
  'unpublished',
  'superior',
  'intermediate',
  'everyday',
  'dumb',
  'excess',
  'sexy',
  'fake',
  'monthly',
  'premature',
  'sheer',
  'generic',
  'insane',
  'contrary',
  'twin',
  'upcoming',
  'bottom',
  'costly',
  'indirect',
  'sole',
  'unrelated',
  'hispanic',
  'improper',
  'underground',
  'legendary',
  'reluctant',
  'beloved',
  'inappropriate',
  'corrupt',
  'irrelevant',
  'justified',
  'obscure',
  'profound',
  'hostile',
  'influential',
  'inadequate',
  'abstract',
  'timely',
  'authentic',
  'bold',
  'intimate',
  'straightforward',
  'rival',
  'right-wing',
  'racist',
  'symbolic',
  'unprecedented',
  'loyal',
  'talented',
  'troubled',
  'noble',
  'instant',
  'incorrect',
  'dense',
  'blond',
  'deliberate',
  'blank',
  'rear',
  'feminine',
  'apt',
  'stark',
  'alcoholic',
  'teenage',
  'vibrant',
  'humble',
  'vain',
  'covert',
  'bland',
  'trendy',
  'foul',
  'populist',
  'alarming',
  'hooked',
  'wicked',
  'deaf',
  'left-wing',
  'lousy',
  'malignant',
  'stylish',
  'upscale',
  'hourly',
  'refreshing',
  'cozy',
  'slick',
  'dire',
  'yearly',
  'inbred',
  'part-time',
  'finite',
  'backwards',
  'nightly',
  'unauthorized',
  'cheesy',
  'indoor',
  'surreal',
  'bald',
  'masculine',
  'shady',
  'spirited',
  'eerie',
  'horrific',
  'smug',
  'stern',
  'hefty',
  'savvy',
  'bogus',
  'elaborate',
  'gloomy',
  'pristine',
  'extravagant',
  'serene',
  'advanced',
  'perverse',
  'devout',
  'crisp',
  'rosy',
  'slender',
  'melancholy',
  'faux',
  'phony',
  'danish',
  'lofty',
  'nuanced',
  'lax',
  'adept',
  'barren',
  'shameful',
  'sleek',
  'solemn',
  'vacant',
  'dishonest',
  'brisk',
  'fluent',
  'insecure',
  'humid',
  'menacing',
  'moot',
  'soothing',
  'self-loathing',
  'far-reaching',
  'harrowing',
  'scathing',
  'perplexing',
  'calming',
  'unconvincing',
  'unsuspecting',
  'unassuming',
  'surprising',
  'unappealing',
  'vexing',
  'unending',
  'easygoing',
  'appetizing',
  'disgruntled',
  'retarded',
  'undecided',
  'unregulated',
  'unsupervised',
  'unrecognized',
  'crazed',
  'distressed',
  'jagged',
  'paralleled',
  'cramped',
  'warped',
  'antiquated',
  'fabled',
  'deranged',
  'diseased',
  'ragged',
  'intoxicated',
  'hallowed',
  'crowded',
  'ghastly',
  'disorderly',
  'saintly',
  'wily',
  'sly',
  'sprightly',
  'ghostly',
  'oily',
  'hilly',
  'grisly',
  'earthly',
  'friendly',
  'unwieldy',
  'other',
  'many',
  'last',
  'expected',
  'due',
  'less',
  'divine',
  'all',
  'together',
  'only',
  'outside',
  'multiple',
  'appropriate',
  'approximate',
  'evil',
  'favorite',
  'limited',
  'random',
  'republican',
  'okay',
  'essential',
  'secondary',
  'south',
  'pro',
  'northern',
  'urban',
  'acute',
  'prime',
  'arab',
  'overnight',
  'crucial',
  'beyond',
  'against',
  'under',
  'definite',
  'effective',
  'especial',
  'hopeful',
  'obvious',
  'particular',
  'possible',
  'relative',
  'serious',
  'typical',
  'virtual' ];

  var main = zip;



  return main;
})();



var adverbs_decline = (function() {
  var zip = [ [ 'wholly', 'whole' ],
  [ 'idly', 'idle' ],
  [ 'fully', 'full' ],
  [ 'practically', 'practical' ],
  [ 'theoretically', 'theoretical' ],
  [ 'sporadically', 'sporadic' ],
  [ 'basically', 'basic' ],
  [ 'grammatically', 'grammatical' ],
  [ 'alphabetically', 'alphabetical' ],
  [ 'economically', 'economical' ],
  [ 'conically', 'conical' ],
  [ 'politically', 'political' ],
  [ 'vertically', 'vertical' ],
  [ 'critically', 'critical' ],
  [ 'fantastically', 'fantastic' ],
  [ 'mystically', 'mystical' ],
  [ 'pornographically', 'pornographic' ],
  [ 'jolly', 'jolly' ] ];

  var main = (function () {
				var res = {};
				zip.forEach(function(a) {
					res[a[0]] = a[1];
				});
				return res;
			})();



  return main;
})();



var abbreviations = (function() {
  var zip = [ 'ave',
  'blvd',
  'uss',
  'ss',
  'arc',
  'al',
  'cl',
  'ct',
  'cres',
  'exp',
  'rd',
  'st',
  'dist',
  'mt',
  'ft',
  'fy',
  'hwy',
  'la',
  'pd',
  'pl',
  'plz',
  'tce',
  'vs',
  'etc',
  'esp',
  'llb',
  'md',
  'bl',
  'ma',
  'ba',
  'lit',
  'fl',
  'ex',
  'eg',
  'ie',
  'ala',
  'ariz',
  'ark',
  'cal',
  'calif',
  'colo',
  'conn',
  'del',
  'fed',
  'fla',
  'ga',
  'ida',
  'ind',
  'ia',
  'kan',
  'kans',
  'ken',
  'ky',
  'la',
  'md',
  'mich',
  'minn',
  'mont',
  'neb',
  'nebr',
  'nev',
  'okla',
  'penna',
  'penn',
  'pa',
  'dak',
  'tenn',
  'tex',
  'ut',
  'vt',
  'va',
  'wash',
  'wis',
  'wisc',
  'wy',
  'wyo',
  'usafa',
  'alta',
  'ont',
  'que',
  'sask',
  'yuk',
  'bc',
  'dept',
  'univ',
  'assn',
  'bros',
  'inc',
  'ltd',
  'co',
  'yahoo',
  'joomla',
  'jeopardy' ];

  var main = (function () {

				return zip.concat(honorifics);
			})();



  return main;
})();



var honorifics = (function() {
  var zip = [ 'jr',
  'mr',
  'mrs',
  'ms',
  'dr',
  'prof',
  'sr',
  'sen',
  'corp',
  'rep',
  'gov',
  'atty',
  'supt',
  'det',
  'rev',
  'col',
  'gen',
  'lt',
  'cmdr',
  'adm',
  'capt',
  'sgt',
  'cpl',
  'maj',
  'misses',
  'mister',
  'sir',
  'esq',
  'mstr',
  'phd',
  'adj',
  'adv',
  'asst',
  'bldg',
  'brig',
  'comdr',
  'hon',
  'hc',
  'messrs',
  'mlle',
  'mme',
  'op',
  'ord',
  'pvt',
  'reps',
  'res',
  'sens',
  'sfc',
  'surg' ];

  var main = zip;



  return main;
})();



var dates = (function() {
  var zip = { months:
   { january: 0,
     february: 1,
     march: 2,
     april: 3,
     may: 4,
     june: 5,
     july: 6,
     august: 7,
     september: 8,
     october: 9,
     november: 10,
     december: 11 },
  monthAbbrevs:
   { jan: 0,
     feb: 1,
     mar: 2,
     apr: 3,
     jun: 5,
     jul: 6,
     aug: 7,
     sep: 8,
     sept: 8,
     oct: 9,
     nov: 10,
     dec: 11 },
  days:
   { monday: 1,
     tuesday: 2,
     wednesday: 3,
     thursday: 4,
     friday: 5,
     saturday: 6,
     sunday: 7 } };

  var main = (function () {
				var res = zip;
				for (var w in zip.monthAbbrevs) { zip.months[w] = zip.monthAbbrevs[w] }
				res.dayS = '\b('.concat(Object.keys(res.days).join('|'), ')\b');
				res.monthS = '('.concat(Object.keys(res.months).join('|'), ')');
				res.monthsS = res.monthS + ',?';
				return res;
			})();



  return main;
})();



var numbers = (function() {
  var zip = { ones:
   { zero: 0,
     null: 0,
     nil: 0,
     a: 1,
     one: 1,
     first: 1,
     two: 2,
     second: 2,
     three: 3,
     third: 3,
     four: 4,
     fourth: 4,
     five: 5,
     fifth: 5,
     six: 6,
     sixth: 6,
     seven: 7,
     seventh: 7,
     eight: 8,
     eighth: 8,
     nine: 9,
     ninth: 9 },
  teens:
   { ten: 10,
     teenth: 10,
     eleven: 11,
     eleventh: 11,
     twelve: 12,
     twelfth: 12,
     thirteen: 13,
     thirteenth: 13,
     fourteen: 14,
     fourteenth: 14,
     fifteen: 15,
     fifteenth: 15,
     sixteen: 16,
     sixteenth: 16,
     seventeen: 17,
     seventeenth: 17,
     eighteen: 18,
     eighteenth: 18,
     nineteen: 19,
     nineteenth: 19 },
  tens:
   { twenty: 20,
     twentieth: 20,
     thirty: 30,
     thirtieth: 30,
     forty: 40,
     fortieth: 40,
     fifty: 50,
     fiftieth: 50,
     sixty: 60,
     sixtieth: 60,
     seventy: 70,
     seventieth: 70,
     eighty: 80,
     eightieth: 80,
     ninety: 90,
     ninetieth: 90 },
  multiple:
   { hundred: 100,
     grand: 1000,
     thousand: 1000,
     million: 1000000,
     billion: 1000000000,
     trillion: 1000000000000,
     quadrillion: 1000000000000000,
     quintillion: 1000000000000000000,
     sextillion: 1e+21,
     septillion: 1e+24,
     octillion: 1e+27,
     nonillion: 1e+30,
     decillion: 1.0000000000000001e+33 } };

  var main = zip;



  return main;
})();



var firstnames = (function() {


var zip = { male:
   { will: 'iam,ie,ard,is,iams',
     fred: ',erick,die,rick,dy',
     marc: 'us,,o,os,el',
     darr: 'ell,yl,en,el,in',
     fran: 'k,cis,cisco,klin,kie',
     terr: 'y,ance,ence,ell',
     rand: 'y,all,olph,al',
     brad: 'ley,,ford,y',
     jeff: 'rey,,ery,ry',
     john: ',ny,nie,athan',
     greg: 'ory,,g,orio',
     mar: 'k,tin,vin,io,shall,ty,lon,lin',
     car: 'l,los,lton,roll,y,ey',
     ken: 'neth,,t,ny,dall,drick',
     har: 'old,ry,vey,ley,lan,rison',
     ste: 'ven,phen,ve,wart,phan,rling',
     jer: 'ry,emy,ome,emiah,maine,ald',
     mic: 'hael,heal,ah,key,hel',
     dar: 'yl,in,nell,win,ius',
     dan: 'iel,ny,,e',
     wil: 'bur,son,bert,fred,fredo',
     ric: 'hard,ky,ardo,k,key',
     cli: 'fford,nton,fton,nt,ff',
     cla: 'rence,ude,yton,rk,y',
     ben: 'jamin,,nie,ny,ito',
     rod: 'ney,erick,olfo,ger,',
     rob: 'ert,erto,bie,',
     gar: 'y,ry,rett,land',
     sam: 'uel,,my,mie',
     and: 'rew,re,y,res',
     jos: 'eph,e,hua,h',
     joe: ',l,y,sph',
     leo: 'nard,n,,nardo',
     tom: ',my,as,mie',
     bry: 'an,ant,ce,on',
     ant: 'hony,onio,oine,on',
     jac: 'k,ob,kson',
     cha: 'rles,d,rlie,se',
     sha: 'wn,ne,un',
     bre: 'nt,tt,ndan,t',
     jes: 'se,us,s',
     al: 'bert,an,len,fred,exander,ex,vin,lan,fredo,berto,ejandro,fonso,ton,,onzo,i,varo',
     ro: 'nald,ger,y,nnie,land,n,ss,osevelt,gelio,lando,man,cky,yce,scoe,ry',
     de: 'nnis,rek,an,rrick,lbert,vin,wey,xter,wayne,metrius,nis,smond',
     ja: 'mes,son,y,red,vier,ke,sper,mal,rrod',
     el: 'mer,lis,bert,ias,ijah,don,i,ton,liot,liott,vin,wood',
     ma: 'tthew,nuel,urice,thew,x,tt,lcolm,ck,son',
     do: 'nald,uglas,n,nnie,ug,minic,yle,mingo,minick',
     er: 'ic,nest,ik,nesto,ick,vin,nie,win',
     ra: 'ymond,lph,y,mon,fael,ul,miro,phael',
     ed: 'ward,win,die,gar,uardo,,mund,mond',
     co: 'rey,ry,dy,lin,nrad,rnelius',
     le: 'roy,wis,ster,land,vi',
     lo: 'uis,nnie,renzo,ren,well,uie,u,gan',
     da: 'vid,le,ve,mon,llas,mian,mien',
     jo: 'nathan,n,rge,rdan,nathon,aquin',
     ru: 'ssell,ben,dolph,dy,fus,ssel,sty',
     ke: 'vin,ith,lvin,rmit',
     ar: 'thur,nold,mando,turo,chie,mand',
     re: 'ginald,x,ynaldo,uben,ggie',
     ge: 'orge,rald,ne,rard,offrey,rardo',
     la: 'rry,wrence,nce,urence,mar,mont',
     mo: 'rris,ses,nte,ises,nty',
     ju: 'an,stin,lio,lian,lius,nior',
     pe: 'ter,dro,rry,te,rcy',
     tr: 'avis,oy,evor,ent',
     he: 'nry,rbert,rman,ctor,ath',
     no: 'rman,el,ah,lan,rbert',
     em: 'anuel,il,ilio,mett,manuel',
     wa: 'lter,yne,rren,llace,de',
     mi: 'ke,guel,lton,tchell,les',
     sa: 'lvador,lvatore,ntiago,ul,ntos',
     ch: 'ristopher,ris,ester,ristian,uck',
     pa: 'ul,trick,blo,t',
     st: 'anley,uart,an',
     hu: 'gh,bert,go,mberto',
     br: 'ian,uce,andon,ain',
     vi: 'ctor,ncent,rgil,cente',
     ca: 'lvin,meron,leb',
     gu: 'y,illermo,stavo',
     lu: 'is,ther,ke,cas',
     gr: 'ant,ady,over,aham',
     ne: 'il,lson,al,d',
     t: 'homas,imothy,odd,ony,heodore,im,yler,ed,yrone,aylor,erence,immy,oby,eddy,yson',
     s: 'cott,ean,idney,ergio,eth,pencer,herman,ylvester,imon,heldon,cotty,olomon',
     r: 'yan',
     n: 'icholas,athan,athaniel,ick,icolas',
     a: 'dam,aron,drian,ustin,ngelo,braham,mos,bel,gustin,ugust,dolfo',
     b: 'illy,obby,arry,ernard,ill,ob,yron,lake,ert,oyd,illie,laine,art,uddy,urton',
     e: 'ugene,arl,verett,nrique,van,arnest,frain,than,steban',
     h: 'oward,omer,orace,ans,al',
     p: 'hillip,hilip,reston,hil,ierre',
     c: 'raig,urtis,lyde,ecil,esar,edric,leveland,urt',
     j: 'immy,im,immie',
     g: 'lenn,ordon,len,ilbert,abriel,ilberto',
     m: 'elvin,yron,erle,urray',
     k: 'yle,arl,urt,irk,ristopher',
     o: 'scar,tis,liver,rlando,mar,wen,rville,tto',
     l: 'loyd,yle,ionel',
     f: 'loyd,ernando,elix,elipe,orrest,abian,idel',
     w: 'esley,endell,m,oodrow,inston',
     d: 'ustin,uane,wayne,wight,rew,ylan',
     z: 'achary',
     v: 'ernon,an,ance',
     i: 'an,van,saac,ra,rving,smael,gnacio,rvin',
     q: 'uentin,uinton',
     x: 'avier' },
  female:
   { mari: 'a,e,lyn,an,anne,na,ssa,bel,sa,sol,tza',
     kris: 'ten,tin,tina,ti,tine,ty,ta,tie',
     jean: 'ette,ne,nette,nie,ine,nine',
     chri: 'stine,stina,sty,stie,sta,sti',
     marg: 'aret,ie,arita,uerite,ret,o',
     ange: 'la,lica,lina,lia,line',
     fran: 'ces,cine,cisca',
     kath: 'leen,erine,y,ryn,arine',
     sher: 'ry,ri,yl,i,rie',
     caro: 'l,lyn,line,le,lina',
     dian: 'e,a,ne,na',
     jenn: 'ifer,ie,y,a',
     luci: 'lle,a,nda,le',
     kell: 'y,i,ey,ie',
     rosa: ',lie,lind',
     jani: 'ce,e,s,ne',
     stac: 'y,ey,ie,i',
     shel: 'ly,ley,ia',
     laur: 'a,en,ie,el',
     trac: 'y,ey,i,ie',
     jane: 't,,lle,tte',
     bett: 'y,ie,e,ye',
     rose: 'mary,marie,tta',
     joan: ',ne,n,na',
     mar: 'y,tha,jorie,cia,lene,sha,yann,cella,ta,la,cy,tina',
     lor: 'i,raine,etta,a,ena,ene,na,ie',
     sha: 'ron,nnon,ri,wna,nna,na,una',
     dor: 'othy,is,a,een,thy,othea',
     cla: 'ra,udia,ire,rice,udette',
     eli: 'zabeth,sa,sabeth,se,za',
     kar: 'en,la,a,i,in',
     tam: 'my,ara,i,mie,ika',
     ann: 'a,,e,ie,ette',
     car: 'men,rie,la,a,mela',
     mel: 'issa,anie,inda',
     ali: 'ce,cia,son,sha,sa',
     bri: 'ttany,dget,ttney,dgette',
     lyn: 'n,da,ne,ette',
     del: 'ores,la,ia,oris',
     ter: 'esa,ri,i',
     son: 'ia,ya,ja,dra',
     deb: 'orah,ra,bie,ora',
     jac: 'queline,kie,quelyn,lyn',
     lat: 'oya,asha,onya,isha',
     che: 'ryl,lsea,ri,rie',
     vic: 'toria,ki,kie,ky',
     sus: 'an,ie,anne,ana',
     rob: 'erta,yn',
     est: 'her,elle,ella,er',
     lea: 'h,,nne,nn',
     lil: 'lian,lie,a,y',
     ma: 'ureen,ttie,xine,bel,e,deline,ggie,mie,ble,ndy,ude,yra,nuela,vis,gdalena,tilda',
     jo: 'yce,sephine,,di,dy,hanna,sefina,sie,celyn,lene,ni,die',
     be: 'verly,rtha,atrice,rnice,th,ssie,cky,linda,ulah,rnadette,thany,tsy,atriz',
     ca: 'therine,thy,ssandra,ndace,ndice,mille,itlin,ssie,thleen,llie',
     le: 'slie,na,ona,ticia,igh,la,nora,ola,sley,ila',
     el: 'aine,len,eanor,sie,la,ena,oise,vira,sa,va,ma',
     sa: 'ndra,rah,ra,lly,mantha,brina,ndy,die,llie',
     mi: 'chelle,ldred,chele,nnie,riam,sty,ndy,randa,llie',
     co: 'nnie,lleen,nstance,urtney,ra,rinne,nsuelo,rnelia',
     ju: 'lie,dith,dy,lia,anita,ana,stine',
     da: 'wn,nielle,rlene,na,isy,rla,phne',
     re: 'becca,nee,na,bekah,ba',
     al: 'ma,lison,berta,exandra,yssa,ta',
     ra: 'chel,mona,chael,quel,chelle',
     an: 'drea,ita,a,gie,toinette,tonia',
     ge: 'raldine,rtrude,orgia,nevieve,orgina',
     de: 'nise,anna,siree,na,ana,e',
     ja: 'smine,na,yne',
     lu: 'cy,z,la,pe,ella,isa',
     je: 'ssica,nifer,well,ri',
     ad: 'a,rienne,die,ele,riana,eline',
     pa: 'tricia,mela,ula,uline,tsy,m,tty,ulette,tti,trice,trica,ige',
     ke: 'ndra,rri,isha,ri',
     mo: 'nica,lly,nique,na,llie',
     lo: 'uise,is,la',
     he: 'len,ather,idi,nrietta,lene,lena',
     me: 'gan,rcedes,redith,ghan,agan',
     wi: 'lma,lla,nnie',
     ga: 'il,yle,briela,brielle,le',
     er: 'in,ica,ika,ma,nestine',
     ce: 'cilia,lia,celia,leste,cile',
     ka: 'tie,y,trina,yla,te',
     ol: 'ga,ivia,lie,a',
     li: 'nda,sa,ndsay,ndsey,zzie',
     na: 'ncy,talie,omi,tasha,dine',
     la: 'verne,na,donna,ra',
     vi: 'rginia,vian,ola',
     ha: 'rriet,nnah',
     pe: 'ggy,arl,nny,tra',
     br: 'enda,andi,ooke',
     ki: 'mberly,m,mberley,rsten',
     au: 'drey,tumn,dra',
     bo: 'nnie,bbie,nita,bbi',
     do: 'nna,lores,lly,minique',
     gl: 'oria,adys,enda,enna',
     tr: 'icia,ina,isha,udy',
     ta: 'ra,nya,sha,bitha',
     ro: 'sie,xanne,chelle,nda',
     am: 'y,anda,ber,elia',
     fa: 'ye,nnie,y',
     ni: 'cole,na,chole,kki',
     ve: 'ronica,ra,lma,rna',
     gr: 'ace,etchen,aciela,acie',
     b: 'arbara,lanca,arbra,ianca',
     r: 'uth,ita,honda',
     s: 'hirley,tephanie,ylvia,heila,uzanne,ue,tella,ophia,ilvia,ophie,tefanie,heena,ummer,elma,ocorro,ybil,imone',
     c: 'ynthia,rystal,indy,harlene,ristina,leo',
     e: 'velyn,mily,dna,dith,thel,mma,va,ileen,unice,ula,ssie,ffie,tta,ugenia',
     a: 'shley,pril,gnes,rlene,imee,bigail,ida,bby,ileen',
     t: 'heresa,ina,iffany,helma,onya,oni,herese,onia',
     i: 'rene,da,rma,sabel,nez,ngrid,va,mogene,sabelle',
     w: 'anda,endy,hitney',
     p: 'hyllis,riscilla,olly',
     n: 'orma,ellie,ora,ettie,ell',
     f: 'lorence,elicia,lora,reda,ern,rieda',
     v: 'alerie,anessa',
     j: 'ill,illian',
     y: 'vonne,olanda,vette',
     g: 'ina,wendolyn,wen,oldie',
     l: 'ydia',
     m: 'yrtle,yra,uriel,yrna',
     h: 'ilda',
     o: 'pal,ra,felia',
     k: 'rystal',
     d: 'ixie,ina',
     u: 'rsula' },
  ambiguous:
   [ 'casey',
     'jam&',
     '1e',
     'jaime',
     'jess&',
     'morg0',
     're!',
     'rob@',
     'devon',
     'kerry',
     'a1xis',
     'guadalupe',
     'b#ir',
     'kasey',
     'je0',
     'ma~on',
     'aubrey',
     'sh;by',
     'j0',
     'shea',
     'jade',
     'k2yatta',
     'k;sey',
     'shay',
     '#shawn',
     't~nity',
     'reg0',
     'jamm&',
     'cassidy',
     'chey2!',
     'reag0',
     'shiloh',
     'marlo',
     '0d%',
     'dev0',
     'rosa~o',
     '1e' ] };

  var main = (function () {

				var o = {};
				['male', 'female'].forEach(function(type) {
					for (var k in zip[type]) {


						arr.forEach(function(w, i) {
							o[k + w] = type.charAt(0);
						})
					}
				});


				return o;
			})();



  return main;
})();



var pos_data = (function() {


var zip = { particles:
   [ 'together',
     'in',
     'out',
     'on',
     'off',
     'of',
     'with',
     'over',
     'under',
     'up',
     'down',
     'about',
     'before',
     'after',
     'to',
     'through',
     'onto',
     'around',
     'behind',
     'above',
     'away',
     'across',
     'ahead',
     'upon',
     'aback',
     'back',
     'forth',
     'along',
     'apart',
     'way' ],
  cs:
   [ 'woul|d',
     'wi|ll',
     'ha|ve',
     'a|m',
     'i|s',
     'wa|s',
     'ha|s',
     'a|re',
     'not' ],
  contractions:
   { 'would\'ve': [ 'would', 'have' ],
     'could\'ve': [ 'could', 'have' ],
     'should\'ve': [ 'should', 'have' ],
     cannot: [ 'can', 'not' ],
     'i\'d': [ 'i', 'would' ],
     'i\'ll': [ 'i', 'will' ],
     'i\'ve': [ 'i', 'have' ],
     'i\'m': [ 'i', 'am' ],
     'he\'d': [ 'he', 'would' ],
     'he\'ll': [ 'he', 'will' ],
     'he\'s': [ 'he', 'was' ],
     'she\'d': [ 'she', 'would' ],
     'she\'ll': [ 'she', 'will' ],
     'she\'s': [ 'she', 'was' ],
     'it\'ll': [ 'it', 'will' ],
     'it\'s': [ 'it', 'was' ],
     'we\'d': [ 'we', 'would' ],
     'we\'ll': [ 'we', 'will' ],
     'we\'ve': [ 'we', 'have' ],
     'we\'re': [ 'we', 'are' ],
     'they\'d': [ 'they', 'would' ],
     'they\'ll': [ 'they', 'will' ],
     'they\'ve': [ 'they', 'have' ],
     'they\'re': [ 'they', 'are' ],
     'who\'s': [ 'who', 'was' ],
     'when\'s': [ 'when', 'was' ],
     'where\'s': [ 'where', 'was' ],
     'why\'s': [ 'why', 'was' ],
     'how\'s': [ 'how', 'was' ],
     'that\'s': [ 'that', 'is' ],
     'what\'s': [ 'what', 'is' ] },
  ambiguousContractions:
   { 'he\'s': 'he',
     'she\'s': 'she',
     'it\'s': 'it',
     'who\'s': 'who',
     'when\'s': 'when',
     'where\'s': 'where',
     'why\'s': 'why',
     'how\'s': 'how' } };

  var main = (function () {
				zip.particles = zip.particles.reduce(helpFns.toObj, {});
				return zip;
			})();



  return main;
})();



var negate_data = (function() {
  var zip = { everyone: 'no one',
  everybody: 'nobody',
  someone: 'no one',
  somebody: 'nobody',
  always: 'never' };

  var main = (function () {

				var negate = verbs_special.negate || {};
				for (var k in zip) { negate[k] = zip[k]; }
				return negate;
			})();



  return main;
})();



var word_rules = (function() {
  var zip = { JJ:
   [ '.[cts]hy$',
     '.[st]ty$',
     '.[gk]y$',
     '.some$',
     '.[nrtumcd]al$',
     '.que$',
     '.[tnl]ary$',
     '.lar$',
     '[bszmp]{2}y',
     '.[icldtgrv]ent$',
     '.[oe]ry$',
     '.[lsrnpb]ian$',
     '.[^aeiou]ial$',
     '.[^aeiou]eal$',
     '.[vrl]id$',
     '.ike$',
     '.rmy$',
     '.azy$',
     '.bound$',
     '.oid$',
     '.rough$',
     '.mum$',
     '.ean$',
     '.[ia]sed$',
     '.llen$',
     '.ried$',
     '.gone$',
     '.made$',
     '.[pdltrkvyns]ing$',
     '.ous$',
     '.[gt]led$',
     '[aeiou].*ist$',
     '[a-z]*\\-[a-z]*\\-',
     '.[^aeiou][ei]al$',
     '.ffy$',
     '.[^aeiou]ic$',
     '.(gg|bb|zz)ly$',
     '.[aeiou]my$',
     '.[aeiou]ble$',
     '.[^aeiou]ful$',
     '.[^aeiou]ish$',
     '..ic$',
     '[aeiou][^aeiou]id$',
     '.[^aeiou]ish$',
     '.[^aeiou]ive$',
     '[ea]{2}zy$' ],
  VB:
   [ '.[lnr]ize$',
     '.fies$',
     '^(un|de|re)\\-[a-z]..',
     '.zes$',
     '.ends$',
     '.ify$',
     '.ens$',
     '.oses$',
     '.ishes$',
     '.ects$',
     '.bles$',
     '.pose$',
     '.tized$',
     '.gate$',
     '.nes$',
     '.lked$',
     '.\'n$',
     '.\'t$',
     '.tches$',
     '.ize$',
     '.[^aeiou]ise$',
     '.[aeiou]te$' ],
  JJS: [ '.[di]est$' ],
  VBZ: [ '.[rln]ates$' ],
  RB:
   [ '[rdntkdhs]ly$',
     '.wards$',
     '.where$',
     '.fore$',
     '.less$',
     '. so$',
     '.fully$' ],
  JJR: [ '.[ilk]er$' ],
  NN:
   [ '.rol$',
     '.tors$',
     '.vice$',
     '.ices$',
     '.ions$',
     '.ances$',
     '.tions$',
     '.tures$',
     '.ports$',
     '.ints$',
     '.ea$',
     '[aeiou][pns]er$',
     '.ia$',
     '.sis$',
     '.[aeiou]na$',
     '.[^aeiou]ity$',
     '.[^aeiou]ium$',
     '.[^aeiou]ica$',
     '[aeiou][^aeiou]is$',
     '[^aeiou]ard$',
     '[^aeiou]ism$',
     '.[^aeiou]ity$',
     '.[^aeiou]ium$',
     '.[lstrn]us$' ],
  CD:
   [ '.teen(th)?$',
     '.tieth$',
     '^-?[0-9]+(.[0-9]+)?$',
     '^https?:?//[a-z0-9]',
     '^www.[a-z0-9]' ],
  MD: [ '.*ould$', '.\'ll$' ],
  NNO: [ '[a-z]\'s$' ],
  CP: [ '.\'re$' ] };

  var main = (function () {
				var a = [];
				for (var k in zip) {
					zip[k].forEach(function(r){
						a.push({
							reg: new RegExp(r, 'i'),
							pos: k
						});
					});
				}
				return a;
			})();



  return main;
})();
/* regex rules for verb conjugation
used in combination with the generic "fallback" method */



var verb_rules = (function() {


var zip = { infinitive:
   [ [ '(eed)$', 0, '$1s', '$1ing', '$1ed', '$1er' ],
     [ '(e)(ep)$', 0, '$1$2s', '$1$2ing', '$1pt', '$1$2er' ],
     [ '(a[tg]|i[zn]|ur|nc|gl|is)e$', 0, '$1es', '$1ing', '$1ed', 0 ],
     [ '([i|f|rr])y$', 0, '$1ies', '$1ying', '$1ied', 0 ],
     [ '([td]er)$', 0, '$1s', '$1ing', '$1ed', 0 ],
     [ '([bd]l)e$', 0, '$1es', '$1ing', '$1ed', 0 ],
     [ '(ish|tch|ess)$', 0, '$1es', '$1ing', '$1ed', 0 ],
     [ '(ion|end|e[nc]t)$', 0, '$1s', '$1ing', '$1ed', 0 ],
     [ '(om)e$', 0, '$1es', '$1ing', 'ame', 0 ],
     [ '([aeiu])([pt])$', 0, '$1$2s', '$1$2$2ing', '$1$2', 0 ],
     [ '(er)$', 0, '$1s', '$1ing', '$1ed', 0 ],
     [ '(en)$', 0, '$1s', '$1ing', '$1ed', 0 ] ],
  present:
   [ [ '(ies)$', 'y', 0, 'ying', 'ied', 0 ],
     [ '(tch|sh)es$', '$1', 0, '$1ing', '$1ed', 0 ],
     [ '(ss)es$', '$1', 0, '$1ing', '$1ed', 0 ],
     [ '([tzlshicgrvdnkmu])es$', '$1e', 0, '$1ing', '$1ed', 0 ],
     [ '(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$',
       '$1',
       0,
       '$1ing',
       '$1ed',
       0 ],
     [ '(ow)s$', '$1', 0, '$1ing', 'ew', 0 ],
     [ '(op)s$', '$1', 0, '$1ping', '$1ped', 0 ],
     [ '([eirs])ts$', '$1t', 0, '$1tting', '$1tted', 0 ],
     [ '(ll)s$', '$1', 0, '$1ing', '$1ed', 0 ],
     [ '(el)s$', '$1', 0, '$1ling', '$1led', 0 ],
     [ '(ip)es$', '$1e', 0, '$1ing', '$1ed', 0 ],
     [ 'ss$', 'ss', 0, 'ssing', 'ssed', 0 ],
     [ 's$', 0, 0, 'ing', 'ed', 0 ] ],
  gerund:
   [ [ 'pping$', 'p', 'ps', 0, 'pped', 0 ],
     [ 'lling$', 'll', 'lls', 0, 'lled', 0 ],
     [ 'tting$', 't', 'ts', 0, 't', 0 ],
     [ 'ssing$', 'ss', 'sses', 0, 'ssed', 0 ],
     [ 'gging$', 'g', 'gs', 0, 'gged', 0 ],
     [ '([^aeiou])ying$', '$1y', '$1ies', 0, '$1ied', '$1ier' ],
     [ '(i.)ing$', '$1e', '$1es', 0, '$1ed', 0 ],
     [ '(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$',
       '$1e',
       '$1es',
       0,
       '$1ed',
       0 ],
     [ '(ch|sh)ing$', '$1', '$1es', 0, '$1ed', 0 ],
     [ '(..)ing$', '$1', '$1s', 0, '$1ed', 0 ] ],
  past:
   [ [ '(ued)$', 0, 'ues', 'uing', 'ued', 'uer' ],
     [ '(e|i)lled$', 0, '$1lls', '$1lling', '$1lled', '$1ller' ],
     [ '(sh|ch)ed$', '$1', '$1es', '$1ing', 0, '$1er' ],
     [ '(tl|gl)ed$', '$1e', '$1es', '$1ing', 0, '$1er' ],
     [ '(ss)ed$', '$1', '$1es', '$1ing', 0, '$1er' ],
     [ 'pped$', 'p', 'ps', 'pping', 0, 'pper' ],
     [ 'tted$', 't', 'ts', 'tting', 0, 'tter' ],
     [ 'gged$', 'g', 'gs', 'gging', 0, 'gger' ],
     [ '(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$',
       '$1',
       '$1s',
       '$1ing',
       0,
       '$1er' ],
     [ '(..[^aeiou])ed$', '$1e', '$1es', '$1ing', 0, '$1er' ],
     [ 'ied$', 'y', 'ies', 'ying', 0, 'ier' ],
     [ '(.o)ed$', '$1o', '$1os', '$1oing', 0, '$1oer' ],
     [ '(.i)ed$', '$1', '$1s', '$1ing', 0, '$1er' ],
     [ '([rl])ew$', '$1ow', '$1ows', '$1owing', 0, 0 ],
     [ '([pl])t$', '$1t', '$1ts', '$1ting', 0, 0 ] ] };

  var main = (function () {

				for (var cat in zip) {
					zip[cat] = zip[cat].map(function(a){
						return {
							reg: new RegExp(a[0],'i'),
							repl: {
								infinitive:a[1],
								present:a[2],
								gerund:a[3],
								past:a[4],
								doer:a[5]
							}
						};
					});
				}
				return zip;
			})();



  return main;
})();
/* approximate visual (not semantic) relationship between unicode and ascii characters */



var normalisations = (function() {
  var zip = { '2': '²ƻ',
  '3': '³ƷƸƹƺǮǯЗҘҙӞӟӠӡȜȝ',
  '5': 'Ƽƽ',
  '8': 'Ȣȣ',
  '!': '¡',
  '?': '¿Ɂɂ',
  a: 'ªÀÁÂÃÄÅàáâãäåĀāĂăĄąǍǎǞǟǠǡǺǻȀȁȂȃȦȧȺΆΑΔΛάαλАДадѦѧӐӑӒӓƛɅ',
  b: 'ßþƀƁƂƃƄƅɃΒβϐϦБВЪЬбвъьѢѣҌҍҔҕƥƾ',
  c: '¢©ÇçĆćĈĉĊċČčƆƇƈȻȼͻͼͽϲϹϽϾϿЄСсєҀҁҪҫ',
  d: 'ÐĎďĐđƉƊȡƋƌǷ',
  e: 'ÈÉÊËèéêëĒēĔĕĖėĘęĚěƎƏƐǝȄȅȆȇȨȩɆɇΈΕΞΣέεξϱϵ϶ЀЁЕЭеѐёҼҽҾҿӖӗӘәӚӛӬӭ',
  f: 'ƑƒϜϝӺӻ',
  g: 'ĜĝĞğĠġĢģƓǤǥǦǧǴǵ',
  h: 'ĤĥĦħƕǶȞȟΉΗЂЊЋНнђћҢңҤҥҺһӉӊ',
  I: 'ÌÍÎÏ',
  i: 'ìíîïĨĩĪīĬĭĮįİıƖƗȈȉȊȋΊΐΪίιϊІЇії',
  j: 'ĴĵǰȷɈɉϳЈј',
  k: 'ĶķĸƘƙǨǩΚκЌЖКжкќҚқҜҝҞҟҠҡ',
  l: 'ĹĺĻļĽľĿŀŁłƚƪǀǏǐȴȽΙӀӏ',
  m: 'ΜϺϻМмӍӎ',
  n: 'ÑñŃńŅņŇňŉŊŋƝƞǸǹȠȵΝΠήηϞЍИЙЛПийлпѝҊҋӅӆӢӣӤӥπ',
  o: 'ÒÓÔÕÖØðòóôõöøŌōŎŏŐőƟƠơǑǒǪǫǬǭǾǿȌȍȎȏȪȫȬȭȮȯȰȱΌΘΟΦΩδθοσόϕϘϙϬϭϴОФоѲѳѺѻѼѽӦӧӨөӪӫ¤ƍΏ',
  p: 'ƤƿΡρϷϸϼРрҎҏÞ',
  q: 'Ɋɋ',
  r: '­®ŔŕŖŗŘřƦȐȑȒȓɌɍЃГЯгяѓҐґҒғӶӷſ',
  s: 'ŚśŜŝŞşŠšƧƨȘșȿςϚϛϟϨϩЅѕ',
  t: 'ŢţŤťŦŧƫƬƭƮȚțȶȾΓΤτϮϯТт҂Ҭҭ',
  u: 'µÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųƯưƱƲǓǔǕǖǗǘǙǚǛǜȔȕȖȗɄΰμυϋύϑЏЦЧцџҴҵҶҷҸҹӋӌӇӈ',
  v: 'ƔνѴѵѶѷ',
  w: 'ŴŵƜωώϖϢϣШЩшщѡѿ',
  x: '×ΧχϗϰХхҲҳӼӽӾӿ',
  y: '¥ÝýÿŶŷŸƳƴȲȳɎɏΎΥΨΫγψϒϓϔЎУучўѰѱҮүҰұӮӯӰӱӲӳ',
  z: 'ŹźŻżŽžƩƵƶȤȥɀΖζ' };

  var main = (function (a) {
				var res = { normaler: {}, greek: {}	};
				for (var normCh in zip) {
						zip[normCh].split('').forEach(function(grCh){
							res.normaler[grCh] = normCh;
							res.greek[normCh] = grCh;
						});
				}
				return res;
			})();



  return main;
})();



var suffixes = (function() {


var zip = { wordnet:
   { NN:
      [ 'ceae',
        'inae',
        'idae',
        'leaf',
        'rgan',
        'eman',
        'sman',
        'star',
        'boat',
        'tube',
        'rica',
        'tica',
        'nica',
        'auce',
        'tics',
        'ency',
        'ancy',
        'poda',
        'tude',
        'xide',
        'body',
        'weed',
        'tree',
        'rrel',
        'stem',
        'cher',
        'icer',
        'erer',
        'ader',
        'ncer',
        'izer',
        'ayer',
        'nner',
        'ates',
        'ales',
        'ides',
        'rmes',
        'etes',
        'llet',
        'uage',
        'ings',
        'aphy',
        'chid',
        'tein',
        'vein',
        'hair',
        'tris',
        'unit',
        'cake',
        'nake',
        'illa',
        'ella',
        'icle',
        'ille',
        'etle',
        'scle',
        'cell',
        'bell',
        'bill',
        'palm',
        'toma',
        'game',
        'lamp',
        'bone',
        'mann',
        'ment',
        'wood',
        'book',
        'nson',
        'agon',
        'odon',
        'dron',
        'iron',
        'tion',
        'itor',
        'ator',
        'root',
        'cope',
        'tera',
        'hora',
        'lora',
        'bird',
        'worm',
        'fern',
        'horn',
        'wort',
        'ourt',
        'stry',
        'etry',
        'bush',
        'ness',
        'gist',
        'rata',
        'lata',
        'tata',
        'moth',
        'lity',
        'nity',
        'sity',
        'rity',
        'city',
        'dity',
        'vity',
        'drug',
        'dium',
        'llum',
        'trum',
        'inum',
        'lium',
        'tium',
        'atum',
        'rium',
        'icum',
        'anum',
        'nium',
        'orum',
        'icus',
        'opus',
        'chus',
        'ngus',
        'thus',
        'rius',
        'rpus' ],
     JJ:
      [ 'liac',
        'siac',
        'clad',
        'deaf',
        'xial',
        'hial',
        'chal',
        'rpal',
        'asal',
        'rial',
        'teal',
        'oeal',
        'vial',
        'phal',
        'sial',
        'heal',
        'rbal',
        'neal',
        'geal',
        'dial',
        'eval',
        'bial',
        'ugal',
        'kian',
        'izan',
        'rtan',
        'odan',
        'llan',
        'zian',
        'eian',
        'eyan',
        'ndan',
        'eban',
        'near',
        'unar',
        'lear',
        'liar',
        '-day',
        '-way',
        'tech',
        'sick',
        'tuck',
        'inct',
        'unct',
        'wide',
        'endo',
        'uddy',
        'eedy',
        'uted',
        'aled',
        'rred',
        'oned',
        'rted',
        'obed',
        'oped',
        'ched',
        'dded',
        'cted',
        'tied',
        'eked',
        'ayed',
        'rked',
        'teed',
        'mmed',
        'tred',
        'awed',
        'rbed',
        'bbed',
        'axed',
        'bred',
        'pied',
        'cked',
        'rced',
        'ened',
        'fied',
        'lved',
        'mned',
        'kled',
        'hted',
        'lied',
        'eted',
        'rded',
        'lued',
        'rved',
        'azed',
        'oked',
        'ghed',
        'sked',
        'emed',
        'aded',
        'ived',
        'mbed',
        'pted',
        'zled',
        'ored',
        'pled',
        'wned',
        'afed',
        'nied',
        'aked',
        'gued',
        'oded',
        'oved',
        'oled',
        'ymed',
        'lled',
        'bled',
        'cled',
        'eded',
        'toed',
        'ited',
        'oyed',
        'eyed',
        'ured',
        'omed',
        'ixed',
        'pped',
        'ined',
        'lted',
        'iced',
        'exed',
        'nded',
        'amed',
        'owed',
        'dged',
        'nted',
        'eged',
        'nned',
        'used',
        'ibed',
        'nced',
        'umed',
        'dled',
        'died',
        'rged',
        'aped',
        'oted',
        'uled',
        'ided',
        'nked',
        'aved',
        'rled',
        'rned',
        'aned',
        'rmed',
        'lmed',
        'aged',
        'ized',
        'eved',
        'ofed',
        'thed',
        'ered',
        'ared',
        'ated',
        'eled',
        'sted',
        'ewed',
        'nsed',
        'nged',
        'lded',
        'gged',
        'osed',
        'fled',
        'shed',
        'aced',
        'ffed',
        'tted',
        'uced',
        'iled',
        'uded',
        'ired',
        'yzed',
        '-fed',
        'mped',
        'iked',
        'fted',
        'imed',
        'hree',
        'llel',
        'aten',
        'lden',
        'nken',
        'apen',
        'ozen',
        'ober',
        '-set',
        'nvex',
        'osey',
        'laid',
        'paid',
        'xvii',
        'xxii',
        '-air',
        'tair',
        'icit',
        'knit',
        'nlit',
        'xxiv',
        '-six',
        '-old',
        'held',
        'cile',
        'ible',
        'able',
        'gile',
        'full',
        '-ply',
        'bbly',
        'ggly',
        'zzly',
        '-one',
        'mane',
        'mune',
        'rung',
        'uing',
        'mant',
        'yant',
        'uant',
        'pant',
        'urnt',
        'awny',
        'eeny',
        'ainy',
        'orny',
        'siny',
        'tood',
        'shod',
        '-toe',
        'd-on',
        '-top',
        '-for',
        'odox',
        'wept',
        'eepy',
        'oopy',
        'hird',
        'dern',
        'worn',
        'mart',
        'ltry',
        'oury',
        'ngry',
        'arse',
        'bose',
        'cose',
        'mose',
        'iose',
        'gish',
        'kish',
        'pish',
        'wish',
        'vish',
        'yish',
        'owsy',
        'ensy',
        'easy',
        'ifth',
        'edth',
        'urth',
        'ixth',
        '00th',
        'ghth',
        'ilty',
        'orty',
        'ifty',
        'inty',
        'ghty',
        'kety',
        'afty',
        'irty',
        'roud',
        'true',
        'wful',
        'dful',
        'rful',
        'mful',
        'gful',
        'lful',
        'hful',
        'kful',
        'iful',
        'yful',
        'sful',
        'tive',
        'cave',
        'sive',
        'five',
        'cive',
        'xxvi',
        'urvy',
        'nown',
        'hewn',
        'lown',
        '-two',
        'lowy',
        'ctyl' ],
     VB:
      [ 'wrap',
        'hear',
        'draw',
        'rlay',
        'away',
        'elay',
        'duce',
        'esce',
        'elch',
        'ooch',
        'pick',
        'huck',
        'back',
        'hack',
        'ruct',
        'lict',
        'nect',
        'vict',
        'eact',
        'tect',
        'vade',
        'lude',
        'vide',
        'rude',
        'cede',
        'ceed',
        'ivel',
        'hten',
        'rken',
        'shen',
        'open',
        'quer',
        'over',
        'efer',
        'eset',
        'uiet',
        'pret',
        'ulge',
        'lign',
        'pugn',
        'othe',
        'rbid',
        'raid',
        'veil',
        'vail',
        'roil',
        'join',
        'dain',
        'feit',
        'mmit',
        'erit',
        'voke',
        'make',
        'weld',
        'uild',
        'idle',
        'rgle',
        'otle',
        'rble',
        'self',
        'fill',
        'till',
        'eels',
        'sult',
        'pply',
        'sume',
        'dime',
        'lame',
        'lump',
        'rump',
        'vene',
        'cook',
        'look',
        'from',
        'elop',
        'grow',
        'adow',
        'ploy',
        'sorb',
        'pare',
        'uire',
        'jure',
        'lore',
        'surf',
        'narl',
        'earn',
        'ourn',
        'hirr',
        'tort',
        '-fry',
        'uise',
        'lyse',
        'sise',
        'hise',
        'tise',
        'nise',
        'lise',
        'rise',
        'anse',
        'gise',
        'owse',
        'oosh',
        'resh',
        'cuss',
        'uess',
        'sess',
        'vest',
        'inst',
        'gest',
        'fest',
        'xist',
        'into',
        'ccur',
        'ieve',
        'eive',
        'olve',
        'down',
        '-dye',
        'laze',
        'lyze',
        'raze',
        'ooze' ],
     RB:
      [ 'that',
        'oubt',
        'much',
        'diem',
        'high',
        'atim',
        'sely',
        'nely',
        'ibly',
        'lely',
        'dely',
        'ally',
        'gely',
        'imly',
        'tely',
        'ully',
        'ably',
        'owly',
        'vely',
        'cely',
        'mely',
        'mply',
        'ngly',
        'exly',
        'ffly',
        'rmly',
        'rely',
        'uely',
        'time',
        'iori',
        'oors',
        'wise',
        'orst',
        'east',
        'ways' ] },
  verbs:
   { gerund: [ 'ing' ],
     infinitive:
      [ 'ate',
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
        'le' ],
     past: [ 'ed', 'lt', 'nt', 'pt', 'ew', 'ld' ],
     present:
      [ 'rks',
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
        's' ] } };

  var main = (function () {

				return {
					wordnet: helpFns.toObjValues(zip.wordnet),
					verbs: helpFns.toObjValues(zip.verbs)
				};
			})();



  return main;
})();



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



  return main;
})();
//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2015 MIT
var sentence_parser = function(text) {

  var sentences = [];
  //first do a greedy-split..
  var chunks = text.split(/(\S.+?[.\?!])(?=\s+|$|")/g);

  //date abbrevs.
  //these are added seperately because they are not nouns
  abbreviations = abbreviations.concat(Object.keys(dates.monthAbbrevs));

  //detection of non-sentence chunks
  var abbrev_reg = new RegExp("\\b(" + abbreviations.join("|") + ")[.!?] ?$", "i");
  var acronym_reg= new RegExp("[ |\.][A-Z]\.?$", "i")
  var elipses_reg= new RegExp("\\.\\.\\.*$")

  //loop through these chunks, and join the non-sentence chunks back together..
  var chunks_length = chunks.length;
  for (i = 0; i < chunks_length; i++) {
    if (chunks[i]) {
      //trim whitespace
      chunks[i] = chunks[i].replace(/^\s+|\s+$/g, "");
      //should this chunk be combined with the next one?
      if (chunks[i+1] && chunks[i].match(abbrev_reg) || chunks[i].match(acronym_reg) || chunks[i].match(elipses_reg) ) {
          chunks[i + 1] = ((chunks[i]||'') + " " + (chunks[i + 1]||'')).replace(/ +/g, " ");
      } else if(chunks[i] && chunks[i].length>0){ //this chunk is a proper sentence..
          sentences.push(chunks[i]);
          chunks[i] = "";
      }
    }
  }
  //if we never got a sentence, return the given text
  if (sentences.length === 0) {
    return [text]
  }

  return sentences;
}

// console.log(sentence_parser('Tony is nice. He lives in Japan.').length === 2)
// console.log(sentence_parser('I like that Color').length === 1)
// console.log(sentence_parser("She was dead. He was ill.").length === 2)
// console.log(sentence_parser("i think it is good ... or else.").length == 1)

//split a string into all possible parts
var ngram = (function() {

  var main = function(text, options) {
    options = options || {}
    var min_count = options.min_count || 1; // minimum hit-count
    var max_size = options.max_size || 5; // maximum gram count
    var REallowedChars = /[^a-zA-Z'\-]+/g; //Invalid characters are replaced with a whitespace
    var i, j, k, textlen, s;
    var keys = [null];
    var results = [];
    max_size++;
    for (i = 1; i <= max_size; i++) {
      keys.push({});
    }
    // clean the text
    text = text.replace(REallowedChars, " ").replace(/^\s+/, "").replace(/\s+$/, "");
    text = text.toLowerCase()
    // Create a hash
    text = text.split(/\s+/);
    for (i = 0, textlen = text.length; i < textlen; i++) {
      s = text[i];
      keys[1][s] = (keys[1][s] || 0) + 1;
      for (j = 2; j <= max_size; j++) {
        if (i + j <= textlen) {
          s += " " + text[i + j - 1];
          keys[j][s] = (keys[j][s] || 0) + 1;
        } else {
          break
        }
      }
    }
    // map to array
    i=undefined;
    for (k = 1; k <= max_size; k++) {
      results[k] = [];
      var key = keys[k];
      for (i in key) {
        if(key.hasOwnProperty(i) && key[i] >= min_count){
          results[k].push({
            "word": i,
            "count": key[i],
            "size": k
          })
        }
      }
    }
    results = results.filter(function(s) {
      return s !== null
    })
    results = results.map(function(r) {
      r = r.sort(function(a, b) {
        return b.count - a.count
      })
      return r;
    });
    return results
  }

  return main
})()

// s = ngram("i really think that we all really think it's all good")
// console.log(s)

//split a string into 'words' - as intended to be most helpful for this library.
//
var tokenize = (function() {

  //these expressions ought to be one token, not two, because they are a distinct POS together
  var multi_words = Object.keys(multiples).map(function(m) {
    return m.split(' ');
  });

  var normalise = function(str) {
    if (!str) { return '' }
    str = str.toLowerCase().replace(/[,\.!:;\?\(\)]/, '').replace(/’/g, "'").replace(/'/g, '');
    if (!str.match(/[a-z0-9]/i)) { return '' }
    return str;
  }

  var sentence_type = function(sentence) {
    if (sentence.match(/\?$/)) {
      return 'interrogative';
    } else if (sentence.match(/\!$/)) {
      return 'exclamative';
    }
    return 'declarative';
  }

  //some multi-word tokens should be combined here
  var combine_multiples = function(arr) {
    var better = [];
    var normalised = arr.map(function(a){return normalise(a)}); //cached results

		arr.forEach(function(w, i) {
      for (var o = 0; o < multi_words.length; o++) {
        if (arr[i + 1] && normalised[i] === multi_words[o][0] && normalised[i+1] === multi_words[o][1]) {
          //we have a match
          w = w + ' ' + arr[i + 1];
          arr[i + 1] = null;
          break;
        }
      }
      better.push(w);
    });

    return better.filter(function(w) { return w; })
  }

  var main = function(str) {
    var sentences = sentence_parser(str)
    return sentences.map(function(sentence) {
      var arr = sentence.split(' ');
      arr = combine_multiples(arr);
      var tokens = arr.map(function(w, i) {
        return {
          text: w,
          normalised: normalise(w),
          title_case: (w.match(/^[A-Z][a-z]/) !== null), //use for merge-tokens
          noun_capital: i > 0 && (w.match(/^[A-Z][a-z]/) !== null), //use for noun signal
          punctuated: (w.match(/[,;:\(\)']/) !== null) || undefined,
          end: (i === (arr.length - 1)) || undefined,
          start: (i === 0) || undefined
        }
      })
      return {
        sentence: sentence,
        tokens: tokens,
        type: sentence_type(sentence)
      }
    })
  }

  return main;
})()
// console.log(tokenize('i live in new york')[0].tokens.length==4)
// console.log(tokenize('I speak optimistically of course.')[0].tokens.length==4)
// console.log(tokenize('Joe is 9')[0].tokens.length==3)
// console.log(tokenize('Joe in Toronto')[0].tokens.length==3)
// console.log(tokenize('I am mega-rich')[0].tokens.length==3)

// a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.
//http://en.wikipedia.org/wiki/List_of_Unicode_characters
//https://docs.google.com/spreadsheet/ccc?key=0Ah46z755j7cVdFRDM1A2YVpwa1ZYWlpJM2pQZ003M0E
var normalize = (function() {

  var normalize = function(str, options) {
    options = options || {}
    options.percentage = options.percentage || 50
    var arr = str.split('').map(function(s) {
      var r = Math.random() * 100
      if (normalisations.normaler[s] && r < options.percentage) {
        return normalisations.normaler[s] || s
      } else {
        return s
      }
    })
    return arr.join('')
  }

  var denormalize = function(str, options) {
    options = options || {}
    options.percentage = options.percentage || 50
    var arr = str.split('').map(function(s) {
      var r = Math.random() * 100
      if (normalisations.greek[s] && r < options.percentage) {
        return normalisations.greek[s] || s
      } else {
        return s
      }
    })
    return arr.join('')
  }

  var obj = {
    normalize: normalize,
    denormalize: denormalize
  }

  return obj
})()

// s = "ӳžŽżźŹźӳžŽżźŹźӳžŽżźŹźӳžŽżźŹźӳžŽżźŹź"
// s = "Björk"
// console.log(normalize.normalize(s, {
//   percentage: 100
// }))

// s = "The quick brown fox jumps over the lazy dog"
// console.log(normalize.denormalize(s, {
//   percentage: 100
// }))

//chop a string into pronounced syllables
var syllables = (function(str) {

  var main = function(str) {
    var all = []
    //suffix fixes
    var postprocess = function(arr) {
      //trim whitespace
      arr = arr.map(function(w) {
        w = w.replace(/^ */, '')
        w = w.replace(/ *$/, '')
        return w
      })
      if (arr.length > 2) {
        return arr
      }
      var ones = [
        /^[^aeiou]?ion/,
        /^[^aeiou]?ised/,
        /^[^aeiou]?iled/
      ]
      var l = arr.length
      if (l > 1) {
        var suffix = arr[l - 2] + arr[l - 1];
        for (var i = 0; i < ones.length; i++) {
          if (suffix.match(ones[i])) {
            arr[l - 2] = arr[l - 2] + arr[l - 1];
            arr.pop();
          }
        }
      }
      return arr
    }

    var doer = function(str) {
      var vow = /[aeiouy]$/
      if (!str) {
        return
      }
      var chars = str.split('')
      var before = "";
      var after = "";
      var current = "";
      for (var i = 0; i < chars.length; i++) {
        before = chars.slice(0, i).join('')
        current = chars[i]
        after = chars.slice(i + 1, chars.length).join('')
        var candidate = before + chars[i]

        //rules for syllables-

        //it's a consonant that comes after a vowel
        if (before.match(vow) && !current.match(vow)) {
          if (after.match(/^e[sm]/)) {
            candidate += "e"
            after = after.replace(/^e/, '')
          }
          all.push(candidate)
          return doer(after)
        }
        //unblended vowels ('noisy' vowel combinations)
        if (candidate.match(/(eo|eu|ia|oa|ua|ui)$/i)) { //'io' is noisy, not in 'ion'
          all.push(before)
          all.push(current)
          return doer(after)
        }
      }
      //if still running, end last syllable
      if (str.match(/[aiouy]/) || str.match(/ee$/)) { //allow silent trailing e
        all.push(str)
      } else {
        all[all.length - 1] = (all[all.length - 1] || '') + str; //append it to the last one
      }
    }

    str.split(/\s\-/).forEach(function(s) {
      doer(s)
    })
    all = postprocess(all)

    //for words like 'tree' and 'free'
    if (all.length === 0) {
      all = [str]
    }

    return all
  }

  return main
})()

// console.log(syllables("suddenly").length === 3)
// console.log(syllables("tree"))

//broken
// console.log(syllables("birchtree"))

//built with patterns+exceptions from https://en.wikipedia.org/wiki/British_spelling
// some patterns are only safe to do in one direction

var britishize = (function() {

  var main = function(str) {
    var patterns = [
      // ise -> ize
      {
        reg: /([^aeiou][iy])z(e|ed|es|ing)?$/,
        repl: '$1s$2'
      },
      // our -> or
      // {
      //   reg: /(..)our(ly|y|ite)?$/,
      //   repl: '$1or$2',
      //   exceptions: []
      // },
      // re -> er
      // {
      //   reg: /([^cdnv])re(s)?$/,
      //   repl: '$1er$2',
      //   exceptions: []
      // },
      // xion -> tion
      // {
      //   reg: /([aeiou])xion([ed])?$/,
      //   repl: '$1tion$2',
      //   exceptions: []
      // },
      //logue -> log
      // {
      //   reg: /logue$/,
      //   repl: 'log',
      //   exceptions: []
      // },
      // ae -> e
      // {
      //   reg: /([o|a])e/,
      //   repl: 'e',
      //   exceptions: []
      // },
      //eing -> ing
      // {
      //   reg: /e(ing|able)$/,
      //   repl: '$1',
      //   exceptions: []
      // },
      // illful -> ilful
      {
        reg: /([aeiou]+[^aeiou]+[aeiou]+)l(ful|ment|est|ing|or|er|ed)$/, //must be second-syllable
        repl: '$1ll$2',
        exceptions: []
      }
    ]

    for (var i = 0; i < patterns.length; i++) {
      if (str.match(patterns[i].reg)) {
        return str.replace(patterns[i].reg, patterns[i].repl)
      }
    }
    return str
  }

  return main
})()

//////////////
var americanize = (function() {

  var main = function(str) {
    var patterns = [
      // ise -> ize
      {
        reg: /([^aeiou][iy])s(e|ed|es|ing)?$/,
        repl: '$1z$2'
      },
      // our -> or
      {
        reg: /(..)our(ly|y|ite)?$/,
        repl: '$1or$2'
      },
      // re -> er
      {
        reg: /([^cdnv])re(s)?$/,
        repl: '$1er$2'
      },
      // xion -> tion
      {
        reg: /([aeiou])xion([ed])?$/,
        repl: '$1tion$2'
      },
      //logue -> log
      {
        reg: /logue$/,
        repl: 'log'
      },
      // ae -> e
      {
        reg: /([o|a])e/,
        repl: 'e'
      },
      //eing -> ing
      {
        reg: /e(ing|able)$/,
        repl: '$1'
      },
      // illful -> ilful
      {
        reg: /([aeiou]+[^aeiou]+[aeiou]+)ll(ful|ment|est|ing|or|er|ed)$/, //must be second-syllable
        repl: '$1l$2'
      }
    ]

    for (var i = 0; i < patterns.length; i++) {
      if (str.match(patterns[i].reg)) {
        return str.replace(patterns[i].reg, patterns[i].repl)
      }
    }

    return str
  }

  return main;
})();

// console.log(americanize("synthesise")=="synthesize")
// console.log(americanize("synthesised")=="synthesized")

// converts spoken numbers into integers  'fifty seven point eight' -> 57.8
//
// Spoken numbers take the following format
// [sixty five] (thousand) [sixty five] (hundred) [sixty five]
// aka: [one/teen/ten] (multiple) [one/teen/ten] (multiple) ...
// combile the [one/teen/ten]s as 'current_sum', then multiply it by its following multiple
// multiple not repeat

var to_number = (function() {
  'use strict';
  // these sets of numbers each have different rules
  // [tenth, hundreth, thousandth..] are ambiguous because they could be ordinal like fifth, or decimal like one-one-hundredth, so are ignored
  // var decimal_multiple={'tenth':0.1, 'hundredth':0.01, 'thousandth':0.001, 'millionth':0.000001,'billionth':0.000000001};

  var main = function(s) {
    var ones = numbers.ones;
		var tens = numbers.tens;
		var teens = numbers.teens;
		var multiple = numbers.multiple;
		//remember these concerns for possible errors
		var did = {ones:0, teens:0, tens:0, multiple: {}};
    var total = 0;
    var global_multiplier = 1;
      //pretty-printed numbers
    s = s.replace(/, ?/g, '');
    //parse-out currency
    s = s.replace(/[$£€]/, '');
    //try to finish-fast
    if (s.match(/[0-9]\.[0-9]/) && parseFloat(s) == s) {
			return parseFloat(s)
		}
		if (parseInt(s, 10) == s) {
			return parseInt(s, 10)
		}
    //try to die fast. (phone numbers or times)
    if (s.match(/[0-9][\-:][0-9]/)) {
      return null;
    }
    //support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5
    var mults = [{
      reg: /^(minus|negative)[\s\-]/i,
      mult: -1
    }, {
      reg: /^(a\s)?half[\s\-](of\s)?/i,
      mult: 0.5
    }, {
      reg: /^(a\s)?quarter[\s\-]/i,
      mult: 0.25
    }];
    for (i = 0; i < mults.length; i++) {
      if (s.match(mults[i].reg)) {
        global_multiplier = mults[i].mult;
        s = s.replace(mults[i].reg, '');
        break;
      }
    }

    //do each word in turn..
    var words = s.toString().split(/[\s\-]+/);
    var w, x;
    var current_sum = 0;
    var local_multiplier = 1;
    var decimal_mode = false;
    for (var i = 0; i < words.length; i++) {
      w = words[i];

      //skip 'and' eg. five hundred and twelve
      if (w == 'and') {continue}

      //..we're doing decimals now
      if (w == 'point' || w == 'decimal') {
        if (decimal_mode) {return null} //two point one point six
        decimal_mode = true;
        total += current_sum;
        current_sum = 0;
        did.ones = 0;
        local_multiplier = 0.1;
        continue;
      }

      //handle special rules following a decimal
      if (decimal_mode) {
        x = null;
        //allow consecutive ones in decimals eg. 'two point zero five nine'
        if (ones[w] !== undefined) {
					x = ones[w]
				}
				if (teens[w] !== undefined) {
					x = teens[w]
				}
        if (parseInt(w, 10) == w) {
					x = parseInt(w, 10)
				}
        if (!x) {return null}
        if (x < 10) {
          total += x * local_multiplier;
          local_multiplier = local_multiplier * 0.1; // next number is next decimal place
          current_sum = 0;
          continue;
        }
        //two-digit decimals eg. 'two point sixteen'
        if (x < 100) {
          total += x * (local_multiplier * 0.1);
          local_multiplier = local_multiplier * 0.01; // next number is next decimal place
          current_sum = 0;
          continue;
        }
      }

      //if it's already an actual number
      if (w.match(/^[0-9]\.[0-9]$/)) {
        current_sum += parseFloat(w);
        continue;
      }
      if (parseInt(w, 10) == w) {
        current_sum += parseInt(w, 10);
        continue;
      }

      //ones rules
      if (ones[w] !== undefined) {
				// eg. five seven OR five seventeen
        if (did.ones || did.teens) {return null}
        did.ones = true;
        current_sum += ones[w];
        continue;
      }
      //teens rules
      if (teens[w]) {
				// eg. five seven OR fifteen seventeen OR sixty fifteen
        if (did.ones || did.teens || did.tens) {return null}
        did.teens = true;
        current_sum += teens[w];
        continue;
      }
      //tens rules
      if (tens[w]) {
				// eg. five seventy OR fiveteen seventy OR twenty seventy
        if (did.ones || did.teens || did.tens) {return null}
        did.tens = true;
        current_sum += tens[w];
        continue;
      }
      //multiple rules
      if (multiple[w]) {
        if (did.multiple[w]) {return null} // eg. five hundred six hundred
        did.multiple[w] = true;
        //reset our concerns. allow 'five hundred five'
        did.ones = false;
        did.teens = false;
        did.tens = false;
        //case of 'hundred million', (2 consecutive multipliers)
        if (current_sum === 0) {
          total = total || 1; //dont ever multiply by 0
          total *= multiple[w];
        } else {
          current_sum *= multiple[w];
          total += current_sum;
        }
        current_sum = 0;
        continue;
      }
      //if word is not a known thing now, die
      return null;
    }
    if (current_sum) {
			total += (current_sum || 1) * local_multiplier
		}
    //combine with global multiplier, like 'minus' or 'half'
    total = total * global_multiplier;

    return total;
  }


  return main;
})()

// console.log(to_number('sixteen hundred'))
// console.log(to_number('a hundred'))
// console.log(to_number('four point seven seven'))

// generates properly-formatted dates from free-text date forms
// by spencer kelly 2014

// TODO - the regexes are valid for many languages - localize only 'linking words'

var date_extractor = (function() {

	var days = '([0-9]{1,2}),?';
  var years = '([12][0-9]{3})';

  var to_obj = function(arr, places) {
    return Object.keys(places).reduce(function(h, k) {
      h[k] = arr[places[k]];
      return h;
    }, {});
  }

  var regexes = [{
    reg: dates.monthsS + ' ' + days + '-' + days + ' ' + years,
    //example: 'March 7th-11th 1987',
    process: function(arr) {
      if (!arr) {
        arr = []
      }
      var places = {
        month: 1,
        day: 2,
        to_day: 3,
        year: 4
      };
      return to_obj(arr, places);
    }
  }, {
    reg: days + ' of ' + dates.monthsS + ' to ' + days + ' of ' + dates.monthsS + ' ' + years,
    //example: '28th of September to 5th of October 2008',
    process: function(arr) {
      if (!arr) {
        arr = []
      }
      var places = {
        day: 1,
        month: 2,
        to_day: 3,
        to_month: 4,
        to_year: 5
      };
      return to_obj(arr, places);
    }
  }, {
    reg: dates.monthsS + ' ' + days + ' to ' + dates.monthsS + ' ' + days + ' ' + years,
    //example: 'March 7th to june 11th 1987',
    process: function(arr) {
      if (!arr) {
        arr = []
      }
      var places = {
        month: 1,
        day: 2,
        to_month: 3,
        to_day: 4,
        year: 5,
        to_year: 5
      };
      return to_obj(arr, places);
    }
  }, {
    reg: 'between ' + days + ' ' + dates.monthsS + ' and ' + days + ' ' + dates.monthsS + ' ' + years,
    //example: 'between 13 February and 15 February 1945',
    process: function(arr) {
      if (!arr) {
        arr = []
      }
      var places = {
        day: 1,
        month: 2,
        to_day: 3,
        to_month: 4,
        year: 5,
        to_year: 5
      };
      return to_obj(arr, places);
    }
  }, {
    reg: 'between ' + dates.monthsS + ' ' + days + ' and ' + dates.monthsS + ' ' + days + ' ' + years,
    //example: 'between March 7th and june 11th 1987',
    process: function(arr) {
      if (!arr) {
        arr = []
      }
      var places = {
        month: 1,
        day: 2,
        to_month: 3,
        to_day: 4,
        year: 5,
        to_year: 5
      };
      return to_obj(arr, places);
    }
  }, {
    reg: dates.monthsS + ' ' + days + ' ' + years,
    //example: 'March 1st 1987',
    process: function(arr) {
      if (!arr) {
        arr = []
      }
      var places = {
        month: 1,
        day: 2,
        year: 3
      };
      return to_obj(arr, places);
    }
  }, {
    reg: days + ' - ' + days + ' of ' + dates.monthsS + ' ' + years,
    //example: '3rd - 5th of March 1969',
    process: function(arr) {
      if (!arr) {
        arr = []
      }
      var places = {
        day: 1,
        to_day: 2,
        month: 3,
        year: 4
      };
      return to_obj(arr, places);
    }
  }, {
    reg: days + ' of ' + dates.monthsS + ' ' + years,
    //example: '3rd of March 1969',
    process: function(arr) {
      if (!arr) {
        arr = []
      }
      var places = {
        day: 1,
        month: 2,
        year: 3
      };
      return to_obj(arr, places);
    }
  }, {
    reg: dates.monthsS + ' ' + years + ',? to ' + dates.monthsS + ' ' + years,
    //example: 'September 1939 to April 1945',
    process: function(arr) {
      if (!arr) {
        arr = []
      }
      var places = {
        month: 1,
        year: 2,
        to_month: 3,
        to_year: 4
      };
      return to_obj(arr, places);
    }
  }, {
    reg: dates.monthsS + ' ' + years,
    //example: 'March 1969',
    process: function(arr) {
      if (!arr) {
        arr = []
      }
      var places = {
        month: 1,
        year: 2
      };
      return to_obj(arr, places);
    }
  }, {
    reg: dates.monthsS + ' ' + days,
    //example: 'March 18th',
    process: function(arr) {
      if (!arr) {
        arr = []
      }
      var places = {
        month: 1,
        day: 2
      };
      return to_obj(arr, places);
    }
  }, {
    reg: days + ' of ' + dates.monthsS,
    //example: '18th of March',
    process: function(arr) {
      if (!arr) {
        arr = []
      }
      var places = {
        month: 2,
        day: 1
      };
      return to_obj(arr, places);
    }
  }, {
    reg: years + ' ?- ?' + years,
    //example: '1997-1998',
    process: function(arr) {
      if (!arr) {
        arr = []
      }
      var places = {
        year: 1,
        to_year: 2
      };
      return to_obj(arr, places);
    }
  }, {
    reg: years,
    //example: '1998',
    process: function(arr) {
      if (!arr) {
        arr = []
      }
      var places = {
        year: 1
      };
      return to_obj(arr, places);
    }
  }].map(function(o) {
    o.reg = new RegExp(o.reg, 'g');
    return o;
  });

  //0 based months, 1 based days...
  //thirty days hath september...
  var last_dates = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  var preprocess = function(str) {
    str = str.toLowerCase();
    str = str.replace(/([0-9])(th|rd|st)/g, '$1');
    return str;
  };

  var postprocess = function(obj, options) {
    var d;
    d = new Date();
    options = options || {};
    obj.year = parseInt(obj.year, 10) || undefined;
    obj.day = parseInt(obj.day, 10) || undefined;
    obj.to_day = parseInt(obj.to_day, 10) || undefined;
    obj.to_year = parseInt(obj.to_year, 10) || undefined;
    obj.month = dates.months[obj.month];
    obj.to_month = dates.months[obj.to_month];
    //swap to_month and month
    if (obj.to_month !== undefined && obj.month === undefined) {
      obj.month = obj.to_month
    }
    if (obj.to_month === undefined && obj.month !== undefined) {
      obj.to_month = obj.month
    }
    //swap to_year and year
    if (obj.to_year && !obj.year) {
      obj.year = obj.to_year
    }
    if (!obj.to_year && obj.year && obj.to_month !== undefined) {
      obj.to_year = obj.year
    }
    if (options.assume_year && !obj.year) {
      obj.year = d.getFullYear()
    }
    //make sure date is in that month..
    if (obj.day !== undefined && (obj.day > 31 || (obj.month !== undefined && obj.day > last_dates[obj.month]))) {
      obj.day = undefined
    }
    //make sure to date is after from date. fail everything if so...
    //todo: do this smarter
    if (obj.to_month !== undefined && obj.to_month < obj.month) {
      return {}
    }
    if (obj.to_year && obj.to_year < obj.year) {
      obj.year = undefined;
      obj.to_year = undefined;
    }

    //make sure date is in reasonable range (very opinionated)
    if (obj.year > 2090 || obj.year < 1200) {
      obj.year = undefined;
      obj.to_year = undefined;
    }
    //format result better
    obj = {
      day: obj.day,
      month: obj.month,
      year: obj.year,
      to: {
        day: obj.to_day,
        month: obj.to_month,
        year: obj.to_year
      }
    };
    //add javascript date objects, if you can
    if (obj.year && obj.day && obj.month !== undefined) {
      obj.date_object = new Date();
      obj.date_object.setYear(obj.year);
      obj.date_object.setMonth(obj.month);
      obj.date_object.setDate(obj.day);
    }
    if (obj.to.year && obj.to.day && obj.to.month !== undefined) {
      obj.to.date_object = new Date();
      obj.to.date_object.setYear(obj.to.year);
      obj.to.date_object.setMonth(obj.to.month);
      obj.to.date_object.setDate(obj.to.day);
    }
    //if we have enough data to return a result..
    if (obj.year || obj.month !== undefined) {
      return obj;
    }
    return {};
  };

  //pass through sequence of regexes until template is matched..
  var main = function(str, options) {
    options = options || {};
    str = preprocess(str)
    var arr, good, clone_reg, obj;
    var l=regexes.length;
    for(var i=0; i<l; i+=1){
      obj=regexes[i]
      if (str.match(obj.reg)) {
        clone_reg=new RegExp(obj.reg.source,'i');//this avoids a memory-leak
        arr = clone_reg.exec(str);
        good = obj.process(arr);
        return postprocess(good, options);
      }
    }
  };

  //export modules

  return main;

})();

// console.log(date_extractor('1998'))
// console.log(date_extractor('1999'))

//wrapper for value's methods
var Value = function(str, next, last, token) {
  var the = this
  the.word = str || '';

  the.date = function(options) {
    options = options || {};
    return date_extractor(the.word, options);
  }

  the.is_date = function() {
    var times = /1?[0-9]:[0-9]{2}/;
    if (the.word.match(new RegExp(dates.dayS)) || the.word.match(new RegExp(dates.monthS)) || the.word.match(times)) {
      return true;
    }
    return false;
  }

  the.number = function() {
    if (the.is_date()) {return null}
    return to_number(the.word);
  }

  the.which = (function() {
    if (the.date()) { return schema['DA']}
    if (the.number()){return schema['NU']}
    return schema['CD'];
  })()

  return the;
};


// console.log(new Value("fifty five").number())
// console.log(new Value("june 5th 1998").date())

// TODO - localize
//chooses an indefinite aricle 'a/an' for a word
var indefinite_article = (function() {
  var main = function(str) {
    if (!str) {return null}
    var irregulars = {
      'hour': 'an',
      'heir': 'an',
      'heirloom': 'an',
      'honest': 'an',
      'honour': 'an',
      'honor': 'an',
      'uber': 'an' //german u
    }

    var is_acronym = function(s) {
      //no periods
      if (s.length <= 5 && s.match(/^[A-Z]*$/)) {return true}
      //with periods
      if (s.length >= 4 && s.match(/^([A-Z]\.)*$/)) {return true}
      return false;
    }

    //pronounced letters of acronyms that get a 'an'
    var an_acronyms = {
      A: true,
      E: true,
      F: true,
      H: true,
      I: true,
      L: true,
      M: true,
      N: true,
      O: true,
      R: true,
      S: true,
      X: true
    };

    //'a' regexes
    var a_regexs = [
      /^onc?e/i, //'wu' sound of 'o'
      /^u[bcfhjkqrstn][aeiou]/i, // 'yu' sound for hard 'u'
      /^eul/i
    ];

    //begin business time
    ////////////////////
    //explicit irregular forms
    if (irregulars.hasOwnProperty(str)) {
			return irregulars[str];
		}
		//spelled-out acronyms
    if (is_acronym(str) && an_acronyms.hasOwnProperty(str.substr(0, 1)) ) {
			return 'an';
		}
		//'a' regexes
    for (var i = 0; i < a_regexs.length; i++) {
      if (str.match(a_regexs[i])) {return 'a'}
    }
    //basic vowel-startings
    if (str.match(/^[aeiou]/i)) {
			return 'an';
		}
		return 'a';
  }

  return main;
})();

// console.log(indefinite_article('wolf') === 'a')

// TODO - localize 'of|in|by|for' use
// converts nouns from plural and singular, and viceversases
// some regex borrowed from pksunkara/inflect
// https://github.com/pksunkara/inflect/blob/master/lib/defaults.js

var inflect = (function() {

  var titlecase = function(str) {
    if (!str) {return ''};
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  var pluralize_rules = [
    [/(ax|test)is$/i, '$1es'],
    [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, '$1i'],
    [/(octop|vir)i$/i, '$1i'],
    [/([rl])f$/i, '$1ves'],
    [/(alias|status)$/i, '$1es'],
    [/(bu)s$/i, '$1ses'],
		[/(zer|avocad|hal|tornad|tuxed)o$/i, '$1os'],
    [/(al|ad|at|er|et|ed|ad)o$/i, '$1oes'],
    [/([ti])um$/i, '$1a'],
    [/([ti])a$/i, '$1a'],
    [/sis$/i, 'ses'],
    [/(?:([^f])fe|([lr])f)$/i, '$1ves'],
    [/(hive|stomach|epoch)$/i, '$1s'],
    [/([^aeiouy]|qu)y$/i, '$1ies'],
    [/(x|ch|ss|sh|s|z)$/i, '$1es'],
    [/(matr|vert|ind|cort)(ix|ex)$/i, '$1ices'],
    [/([m|l])ouse$/i, '$1ice'],
    [/([m|l])ice$/i, '$1ice'],
    [/^(ox)$/i, '$1en'],
    [/^(oxen)$/i, '$1'],
    [/(quiz)$/i, '$1zes'],
    [/(antenn|formul|nebul|vertebr|vit)a$/i, '$1ae'],
    [/(sis)$/i, 'ses'],
    [/^(?!talis|.*hu)(.*)man$/i, '$1men'],
    [/(.*)/i, '$1s']
  ].map(function(a) {
    return {
      reg: a[0],
      repl: a[1]
    }
  });
	//similar to plural/singularize rules, but not the same
	var plural_indicators=[
		/(^v)ies$/i,
		/ises$/i,
		/ives$/i,
		/(antenn|formul|nebul|vertebr|vit)ae$/i,
		/(octop|vir|radi|nucle|fung|cact|stimul)i$/i,
		/(buffal|tomat|tornad)oes$/i,
		/(analy|ba|diagno|parenthe|progno|synop|the)ses$/i,
		/(vert|ind|cort)ices$/i,
		/(matr|append)ices$/i,
		/(x|ch|ss|sh|s|z|o)es$/i,
		/men$/i,
		/news$/i,
		/.tia$/i,
		/(^f)ves$/i,
		/(lr)ves$/i,
		/(^aeiouy|qu)ies$/i,
		/(m|l)ice$/i,
		/(cris|ax|test)es$/i,
		/(alias|status)es$/i,
		/ics$/i
	];
  var singularize_rules = [
    [/([^v])ies$/i, '$1y'],
    [/ises$/i, 'isis'],
    [/ives$/i, 'ife'],
    [/(antenn|formul|nebul|vertebr|vit)ae$/i, '$1a'],
    [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, '$1us'],
    [/(buffal|tomat|tornad)(oes)$/i, '$1o'],
    [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1sis'],
    [/(vert|ind|cort)(ices)$/i, '$1ex'],
    [/(matr|append)(ices)$/i, '$1ix'],
    [/(x|ch|ss|sh|s|z|o)es$/i, '$1'],
    [/men$/i, 'man'],
    [/(n)ews$/i, '$1ews'],
    [/([ti])a$/i, '$1um'],
    [/([^f])ves$/i, '$1fe'],
    [/([lr])ves$/i, '$1f'],
    [/([^aeiouy]|qu)ies$/i, '$1y'],
    [/(s)eries$/i, '$1eries'],
    [/(m)ovies$/i, '$1ovie'],
    [/([m|l])ice$/i, '$1ouse'],
    [/(cris|ax|test)es$/i, '$1is'],
    [/(alias|status)es$/i, '$1'],
    [/(ss)$/i, '$1'],
    [/(ics)$/i, "$1"],
    [/s$/i, '']
  ].map(function(a) {
    return {
      reg: a[0],
      repl: a[1]
    }
  });
	//similar to plural/singularize rules, but not the same
	var singular_indicators=[
		/(ax|test)is$/i,
		/(octop|vir|radi|nucle|fung|cact|stimul)us$/i,
		/(octop|vir)i$/i,
		/(rl)f$/i,
		/(alias|status)$/i,
		/(bu)s$/i,
		/(al|ad|at|er|et|ed|ad)o$/i,
		/(ti)um$/i,
		/(ti)a$/i,
		/sis$/i,
		/(?:(^f)fe|(lr)f)$/i,
		/hive$/i,
		/(^aeiouy|qu)y$/i,
		/(x|ch|ss|sh|z)$/i,
		/(matr|vert|ind|cort)(ix|ex)$/i,
		/(m|l)ouse$/i,
		/(m|l)ice$/i,
		/(antenn|formul|nebul|vertebr|vit)a$/i,
		/.sis$/i,
		/^(?!talis|.*hu)(.*)man$/i
	];

	var is_plural = function(str, l) {
		str=(str||'').toLowerCase()
		//handle 'mayors of chicago'
		var preposition= str.match(/([a-z]*) (of|in|by|for) [a-z]/)
		if (preposition && preposition[1]) {
			str = preposition[1];
		}
		// if it's a known irregular case
		for (var i = 0; i < nouns_inflect.irregulars.length; i++) {
			if (nouns_inflect.irregulars[i][1] === str) {
				return true;
			}
			if (nouns_inflect.irregulars[i][0] === str) {
				return false;
			}
		}
		for (var i = 0; i < plural_indicators.length; i++) {
			if (str.match(plural_indicators[i])) {
				return true;
			}
		}
		for (var i = 0; i < singular_indicators.length; i++) {
			if (str.match(singular_indicators[i])) {
				return false;
			}
		}
		// 'looks pretty plural' rules
		if (str.match(/s$/) && !str.match(/ss$/) && str.length > 3) { //needs some lovin'
			return true;
		}
		return false;
	}

	var pluralize = function(str, l) {
		var low = str.toLowerCase()
			//uncountable
		if (nouns_inflect.uncountables[low]) {
			return str
		}
		//is it already plural?
		if(is_plural(low)===true) {
			return str
		}
		//irregular
		var found = nouns_inflect.irregulars.filter(function(r) {
			return r[0] === low;
		})
		if (found[0]) {
			if (titlecase(low) === str) { //handle capitalisation properly
				return titlecase(found[0][1]);
			} else {
				return found[0][1];
			}
		}
		//inflect first word of preposition-phrase
		if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
			var first = (str.match(/^([a-z]*) (of|in|by|for) [a-z]/) || [])[1];
			if (first) {
				var better_first = pluralize(first);
				return better_first + str.replace(first, '');
			}
		}
		//regular
		for (var i = 0; i < pluralize_rules.length; i++) {
			if (str.match(pluralize_rules[i].reg)) {
				return str.replace(pluralize_rules[i].reg, pluralize_rules[i].repl);
			}
		}
	};

	var singularize = function(str, l) {
		var low = str.toLowerCase();
			//uncountable
		if (nouns_inflect.uncountables[low]) {
			return str;
		}
		//is it already singular?
		if(is_plural(low) === false) {
			return str;
		}
		//irregular
		var found = nouns_inflect.irregulars.filter(function(r) {
			return r[1] === low;
		})
		if (found[0]) {
			if (titlecase(low) === str) { //handle capitalisation properly
				return titlecase(found[0][0]);
			} else {
				return found[0][0];
			}
		}
		//inflect first word of preposition-phrase
		if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
			var first = str.match(/^([a-z]*) (of|in|by|for) [a-z]/);
			if (first && first[1]) {
				var better_first = singularize(first[1]);
				return better_first + str.replace(first[1], '');
			}
		}
		//regular
		for (var i = 0; i < singularize_rules.length; i++) {
			if (str.match(singularize_rules[i].reg)) {
				return str.replace(singularize_rules[i].reg, singularize_rules[i].repl);
			}
		}
		return str;
	};

	var inflect = function(str, l) {
		if (nouns_inflect.uncountables[str]) { //uncountables shouldn't ever inflect
			return {
				plural: str,
				singular: str
			};
		}
		if (is_plural(str)) {
			return {
				plural: str,
				singular: singularize(str)
			};
		} else {
			return {
				singular: str,
				plural: pluralize(str)
			};
		}
	}

	var main  = {
    inflect: inflect,
    is_plural: is_plural,
    singularize: singularize,
    pluralize: pluralize
  }

	return main;
})();

// console.log(inflect.singularize('kisses')=="kiss")
// console.log(inflect.singularize('kiss')=="kiss")
// console.log(inflect.singularize('children')=="child")
// console.log(inflect.singularize('child')=="child")
// console.log(inflect.pluralize('gas')=="gases")
// console.log(inflect.pluralize('narrative')=="narratives")
// console.log(inflect.singularize('gases')=="gas")
// console.log(inflect.pluralize('video')=="videos")
// console.log(inflect.pluralize('photo')=="photos")
// console.log(inflect.pluralize('stomach')=="stomachs")
// console.log(inflect.pluralize('database')=="databases")
// console.log(inflect.pluralize('kiss')=="kisses")
// console.log(inflect.pluralize('towns')=="towns")
// console.log(inflect.pluralize('mayor of chicago')=="mayors of chicago")
// console.log(inflect.inflect('Index').plural=='Indices')
// console.log(inflect.is_plural('octopus')==false)
// console.log(inflect.is_plural('octopi')==true)
// console.log(inflect.is_plural('eyebrow')==false)
// console.log(inflect.is_plural('eyebrows')==true)
// console.log(inflect.is_plural('child')==false)
// console.log(inflect.is_plural('children')==true)
// console.log(inflect.singularize('mayors of chicago')=="mayor of chicago")

// wrapper for noun's methods
var Noun = function(str, sentence, word_i) {



  var the = this;
  var token, next;
  if(sentence!==undefined && word_i!==undefined){
    token=sentence.tokens[word_i];
    next=sentence.tokens[word_i+i];
  }
  the.word = str || '';


  the.is_acronym = function() {
    var s = the.word
    // no periods
    if (s.length <= 5 && s.match(/^[A-Z]*$/)) {
			return true;
		}
		// with periods
    if (s.length >= 4 && s.match(/^([A-Z]\.)*$/)) {
			return true;
		}
    return false;
  }

  the.is_entity = function() {
    if (!token) {return false}
    if (token.normalised.length < 3 || !token.normalised.match(/[a-z]/i)) {return false}
    // prepositions
    if (nouns.prps[token.normalised]) {return false}
    // blacklist
    if (nouns.entityBlacklist[token.normalised]) {return false}
    // discredit specific nouns forms
    if (token.pos) {
      if (token.pos.tag == 'NNA') {return false}
      if (token.pos.tag == 'NNO') {return false}
      if (token.pos.tag == 'NNG') {return false}

      if (token.pos.tag=='NNP') {return true}
    }
    // distinct capital is very good signal
    if (token.noun_capital) {return true}
    // multiple-word nouns are very good signal
    if (token.normalised.match(/ /)) {return true}
    // if it has an acronym/abbreviation, like 'business ltd.'
    if (token.normalised.match(/\./)) {return true}
    // appears to be a non-capital acronym, and not just caps-lock
    if (token.normalised.length < 5 && token.text.match(/^[A-Z]*$/)) {return true}
    // acronyms are a-ok
    if (the.is_acronym()) {return true}
    //else, be conservative
    return false;
  }

  the.conjugate = function() {
    return inflect.inflect(the.word);
  },

  the.is_plural = function() {
    return inflect.is_plural(the.word);
  }

  the.article = function() {
    return (the.is_plural()) ? "the" : indefinite_article(the.word);
  }

  the.pluralize = function() {
    return inflect.pluralize(the.word);
  }

  the.singularize = function() {
    return inflect.singularize(the.word);
  }

  // uses common first-name list + honorifics to guess if this noun is the name of a person
  the.is_person = function() {
    var i;
    //remove things that are often named after people
    var l = nouns.personBlacklist.length;
    for (i = 0; i < l; i++) {
      if(the.word.match(new RegExp('\\b' + nouns.personBlacklist[i] + '\\b','i'))) {return false}
    }
      //see if noun has an honourific, like 'jr.'
    l = honorifics.length;
    for (i = 0; i < l; i++) {
      if (the.word.match(new RegExp('\\b' + honorifics[i] + '\\.?\\b', 'i'))) {return true}
    }
    //see if noun has a first-name
    var names = Object.keys(firstnames)
    l = names.length
    var firstname=the.word.split(' ')[0].toLowerCase()
    for (i = 0; i < l; i++) {
      if (names[i]===firstname) {return true}
    }
    //if it has an initial between two words
    if(the.word.match(/[a-z]{3,20} [a-z]\.? [a-z]{3,20}/i)) {return true}
    return false;
  }

  // decides if it deserves a he, she, they, or it
  the.pronoun = function(){
    //if it's a person try to classify male/female
    if(the.is_person()){
			var nameType = function(t) { return (firstnames[names[0]]===t || firstnames[names[1]]==t); }
      var names=the.word.split(' ').map(function(a){
        return a.toLowerCase();
      })
      if (nameType('m')) {return 'he'}
      if (nameType('f')) {return 'she'}
      //test some honorifics
      if (the.word.match(/^(mrs|miss|ms|misses|mme|mlle)\.? /,'i')) {return 'she'}
      if (the.word.match(/\b(mr|mister|sr|jr)\b/,'i')) {return 'he'}
      //if it's a known unisex name, don't try guess it. be safe.
      if(nameType('a')) {return 'they'}
      //if we think it's a person, but still don't know the gender, do a little guessing
			//if it ends in a 'ee or ah', female
      if (names[0].match(/[aeiy]$/)) {return 'she'}
			//if it ends in a 'oh or uh', male
      if (names[0].match(/[ou]$/)) {return 'he'}
      //if it has double-consonants, female
      if(names[0].match(/(nn|ll|tt)/)){
        return 'she';
      }
      //fallback to 'singular-they'
      return 'they';
    }

    //not a person
    if(the.is_plural()){
      return 'they';
    }

    return 'it';
  }

  //list of pronouns that refer to this named noun. "[obama] is cool, [he] is nice."
  the.referenced_by = function() {
    //if it's named-noun, look forward for the pronouns pointing to it -> '... he'
    if(token && token.pos.tag!=="PRP" && token.pos.tag!=="PP"){
      var prp=the.pronoun();
      //look at rest of sentence
      var interested=sentence.tokens.slice(word_i+1, sentence.tokens.length);
      //add next sentence too, could go further..
      if(sentence.next){
        interested=interested.concat(sentence.next.tokens);
      }
      //find the matching pronouns, and break if another noun overwrites it
      var matches=[];
      for(var i=0; i<interested.length; i++){
        if(interested[i].pos.tag==="PRP" && (interested[i].normalised===prp || nouns.pps[interested[i].normalised]===prp)){
          //this pronoun points at our noun
          matches.push(interested[i]);
        }else if(interested[i].pos.tag==="PP" && nouns.pps[interested[i].normalised]===prp){
          //this posessive pronoun ('his/her') points at our noun
          matches.push(interested[i]);
        }else if(interested[i].pos.parent==="noun" && interested[i].analysis.pronoun()===prp){
          //this noun stops our further pursuit
          break;
        }
      }
      return matches;
    }
    return [];
  }

  // a pronoun that points at a noun mentioned previously '[he] is nice'
  the.reference_to = function() {
    //if it's a pronoun, look backwards for the first mention '[obama]... <-.. [he]'
    if(token && token.pos.tag==="PRP"){
      var prp=token.normalised
      //look at starting of this sentence
      var interested=sentence.tokens.slice(0, word_i)
      //add previous sentence, if applicable
      if(sentence.last){
        interested=sentence.last.tokens.concat(interested)
      }
      //reverse the terms to loop through backward..
      interested=interested.reverse()
      for(var i=0; i<interested.length; i++){
        //it's a match
        if(interested[i].pos.parent==="noun" && interested[i].pos.tag!=="PRP" && interested[i].analysis.pronoun()===prp){
          return interested[i]
        }
      }
    }
  }

  // specifically which pos it is
  the.which = (function() {
    // posessive
    if (the.word.match(/'s$/)) {return schema['NNO']}
    // plural
    // if (the.is_plural) {
    //   return schema['NNS']
    // }
    // generic
    return schema['NN'];
  })();

  return the;
}



// console.log(new Noun('farmhouse').is_entity())
// console.log(new Noun('FBI').is_acronym())
// console.log(new Noun('Tony Danza').is_person())
// console.time('h')
// console.log(new Noun('Tonys h. Danza').is_person())
// console.timeEnd('h')

// turns 'quickly' into 'quick'
var to_adjective = (function() {

  var main = function(str, lang) {

    var transforms = [{
      'reg': /bly$/i,
      'repl': 'ble'
    }, {
      'reg': /gically$/i,
      'repl': 'gical'
    }, {
      'reg': /([rsdh])ically$/i,
      'repl': '$1ical'
    }, {
      'reg': /ically$/i,
      'repl': 'ic'
    }, {
      'reg': /uly$/i,
      'repl': 'ue'
    }, {
      'reg': /ily$/i,
      'repl': 'y'
    }, {
      'reg': /(.{3})ly$/i,
      'repl': '$1'
    }];
    if (adverbs_decline.hasOwnProperty(str)) {
      return adverbs_decline[str];
    }
    for (var i = 0; i < transforms.length; i++) {
      if (str.match(transforms[i].reg)) {
        return str.replace(transforms[i].reg, transforms[i].repl);
      }
    }
    return str;
  }

	return main;
})();

// console.log(to_adjective('quickly') === 'quick')
// console.log(to_adjective('marvelously') === 'marvelous')
//wrapper for Adverb's methods
var Adverb = function(str, next, last, token) {

  var the = this;
  the.word = str || '';
  the.next = next;
  the.last = last;

  the.conjugate = function() {
    return {
      adjective: to_adjective(the.word)
    }
  }

  the.which = (function() {
    if (the.word.match(/..est$/)) {return schema['RBS']}
    if (the.word.match(/..er$/)) {return schema['RBR']}
    return schema['RB'];
  })()

  return the;
}

// console.log(new Adverb("suddenly").conjugate())
// console.log(adverbs.conjugate('powerfully'))

//somone who does this present-tense verb
//turn 'walk' into 'walker'
var verb_to_doer = (function() {
  var main = function(str) {

    str = str || '';
    var transforms = [{
      'reg': /e$/i,
      'repl': 'er'
    }, {
      'reg': /([aeiou])([mlgp])$/i,
      'repl': '$1$2$2er'
    }, {
      'reg': /([rlf])y$/i,
      'repl': '$1ier'
    }, {
      'reg': /^(.?.[aeiou])t$/i,
      'repl': '$1tter'
    }]

    if (verbs_conjugate.noDoers.hasOwnProperty(str)) {return null}
    if (verbs_conjugate.irregularDoers.hasOwnProperty(str)) {
      return verbs_conjugate.irregularDoers[str];
    }
    for (var i = 0; i < transforms.length; i++) {
      if (str.match(transforms[i].reg)) {
        return str.replace(transforms[i].reg, transforms[i].repl);
      }
    }
    return str + 'er';
  }

  return main;
})();

// console.log(verb_to_doer('set'))
// console.log(verb_to_doer('sweep'))
// console.log(verb_to_doer('watch'))

//turn a verb into its other grammatical forms.
var verb_conjugate = (function() {

  //this method is the slowest in the whole library, basically TODO:whaaa
  var predict = function(w) {
    var endsWith = function(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    var arr = Object.keys(suffixes.verbs);
    for (i = 0; i < arr.length; i++) {
      if (endsWith(w, arr[i])) {return suffixes.verbs[arr[i]];}
    }
    return 'infinitive';
  }

  //fallback to this transformation if it has an unknown prefix
  var fallback = function(w) {
    var infinitive;
    if (w.length > 4) {
      infinitive = w.replace(/ed$/, '');
    } else {
      infinitive = w.replace(/d$/, '');
    }
    var present, past, gerund, doer;
    if (w.match(/[^aeiou]$/)) {
      gerund = w + 'ing';
      past = w + 'ed';
      if (w.match(/ss$/)) {
        present = w + 'es'; //'passes'
      } else {
        present = w + 's';
      }
      doer = to_doer(infinitive);
    } else {
      gerund = w.replace(/[aeiou]$/, 'ing');
      past = w.replace(/[aeiou]$/, 'ed');
      present = w.replace(/[aeiou]$/, 'es');
      doer = to_doer(infinitive);
    }
    return {
      infinitive: infinitive,
      present: present,
      past: past,
      gerund: gerund,
      doer: doer,
      future: 'will ' + infinitive
    }
  }

  //make sure object has all forms
  var fufill = function(obj, prefix) {
    if (!obj.infinitive) {
			return obj
		}
    if (!obj.gerund) {
			obj.gerund = obj.infinitive + 'ing'
		}
    if (!obj.doer) {
			obj.doer = to_doer(obj.infinitive)
		}
    if (!obj.present) {
			obj.present = obj.infinitive + 's'
		}
    if (!obj.past) {
			obj.past = obj.infinitive + 'ed'
		}
    // add the prefix to all forms, if it exists
    if (prefix) {
      Object.keys(obj).forEach(function(k) {
        obj[k] = prefix + obj[k];
      })
    }
    // future is 'will'+infinitive
    if (!obj.future) {
			obj.future = 'will ' + obj.infinitive
		}
    // perfect is 'have'+past-tense
    if (!obj.perfect) {
			obj.perfect = 'have ' + obj.past
		}
    // pluperfect is 'had'+past-tense
    if (!obj.pluperfect) {
			obj.pluperfect = 'had ' + obj.past
		}
    // future perfect is 'will have'+past-tense
    if (!obj.future_perfect) {
			obj.future_perfect = 'will have ' + obj.past;
		}
    return obj;
  }

  var main = function(w) {
    if (typeof w === 'undefined') {
			return {}
		}
    //for phrasal verbs ('look out'), conjugate look, then append 'out'
    var phrasal_reg=new RegExp('^(.*?) (in|out|on|off|behind|way|with|of|do|away|across|ahead|back|over|under|together|apart|up|upon|aback|down|about|before|after|around|to|forth|round|through|along|onto)$','i')
		// TODO - when IN is done (see issue 40) we can build this regex

    if(w.match(' ') && w.match(phrasal_reg)){
      var split=w.match(phrasal_reg,'')
      var phrasal_verb=split[1]
      var particle=split[2]
      var result=main(phrasal_verb)//recursive
      delete result['doer']
      Object.keys(result).forEach(function(k){
        if(result[k]){
          result[k]+=' '+particle
        }
      })
      return result
    }

    //for pluperfect ('had tried') remove 'had' and call it past-tense
    if(w.match(/^had [a-z]/i)) {w = w.replace(/^had /i,'')}
    //for perfect ('have tried') remove 'have' and call it past-tense
    if(w.match(/^have [a-z]/i)) {w = w.replace(/^have /i,'')}
    //for future perfect ('will have tried') remove 'will have' and call it past-tense
    if(w.match(/^will have [a-z]/i)) {w = w.replace(/^will have /i,'')}

    //chop it if it's future-tense
    w = w.replace(/^will /i, '');
    //un-prefix the verb, and add it in later
    var prefix = (w.match(/^(over|under|re|anti|full)\-?/i) || [])[0];
    var verb = w.replace(/^(over|under|re|anti|full)\-?/i, '');
    //check irregulars
    var obj = {};
    var l = verbs_conjugate.irregulars.length;
    var x, i;
    for (i = 0; i < l; i++) {
      x = verbs_conjugate.irregulars[i];
      if (verb === x.present || verb === x.gerund || verb === x.past || verb === x.infinitive) {
        obj = JSON.parse(JSON.stringify(verbs_conjugate.irregulars[i])); // object 'clone' hack, to avoid mem leak
        return fufill(obj, prefix)
      }
    }
    //guess the tense, so we know which transormation to make
    var predicted = predict(w) || 'infinitive';

    //check against suffix rules
    l = verb_rules[predicted].length
    var r;
    for (i = 0; i < l; i++) {
      r = verb_rules[predicted][i];
      if (w.match(r.reg)) {
        obj[predicted] = w;
        Object.keys(r.repl).forEach(function(k) {
          if (k === predicted) {
            obj[k] = w;
          } else {
            obj[k] = (r.repl[k]) ? w.replace(r.reg, r.repl[k]) : 0;
          }
        });
        return fufill(obj);
      }
    }

    //produce a generic transformation
    return fallback(w);
  };

  return main;
})()

// console.log(verb_conjugate('walking'))
// console.log(verb_conjugate('overtook'))
// console.log(verb_conjugate('watch out'))
// console.log(verb_conjugate('watch'))
// console.log(verb_conjugate('smash'))
// console.log(verb_conjugate('word'))
//broken
// console.log(verb_conjugate('read'))
// console.log(verb_conjugate('free'))
// console.log(verb_conjugate('flesh'))
// console.log(verb_conjugate('branch'))
// console.log(verb_conjugate('spred'))
// console.log(verb_conjugate('bog'))
// console.log(verb_conjugate('nod'))
// console.log(verb_conjugate('had tried'))
// console.log(verb_conjugate('have tried'))

//wrapper for verb's methods
var Verb = function(str, next, last, token) {

  var the = this;
  the.word = str || '';
  the.next = next;
  the.last = last;

  var tenses = {
    past: 'VBD',
    participle: 'VBN',
    infinitive: 'VBP',
    present: 'VBZ',
    gerund: 'VBG'
  }

  the.conjugate = function() {
    return verb_conjugate(the.word);
  }

  the.to_past = function() {
    if (the.form === 'gerund') {
      return the.word;
    }
    return verb_conjugate(the.word).past;
  }

  the.to_present = function() {
    return verb_conjugate(the.word).present;
  }

  the.to_future = function() {
    return 'will ' + verb_conjugate(the.word).infinitive;
  }

  //which conjugation
  the.form = (function() {
    //don't choose infinitive if infinitive==present
    var order = [
      'past',
      'present',
      'gerund',
      'infinitive'
    ];
    var forms = verb_conjugate(the.word);
    for (var i = 0; i < order.length; i++) {
      if (forms[order[i]] === the.word) {
				return order[i]
			}
    }
  })()

  //past/present/future   //wahh?!
  the.tense = (function() {
    if (the.word.match(/\bwill\b/)) {return 'future'}
    if (the.form === 'present') {return 'present'}
    if (the.form === 'past') {return 'past'}
    return 'present';
  })()

  //the most accurate part_of_speech
  the.which = (function() {
    if (verbs_special.cps[the.word]) {return schema['CP']}
    if (the.word.match(/([aeiou][^aeiouwyrlm])ing$/)) {return schema['VBG']}
    var form = the.form;
    return schema[tenses[form]];
  })()

  //is this verb negative already?
  the.negative = function() {
    if (the.word.match(/n't$/)) {return true}
    if ((verbs_special.mds[the.word] || verbs_special.cps[the.word]) && the.next && the.next.normalised === 'not') {
      return true;
    }
    return false;
  }

  return the;
}

// console.log(new Verb('will'))
// console.log(new Verb('stalking').tense)

// convert cute to cuteness
var adj_to_noun = (function() {

  var main = function(w, lang) {

    if (!w) {return ''}
    if (adjectives_decline.to_noun.hasOwnProperty(w)) {
			return adjectives_decline.to_noun[w];
		}
		if (w.match(' ')) {return w}
    if (w.match(/w$/)){return w}

    var transforms=[
      {reg:/y$/, repl:'iness'},
      {reg:/le$/, repl:'ility'},
      {reg:/ial$/, repl:'y'},
      {reg:/al$/, repl:'ality'},
      {reg:/ting$/, repl:'ting'},
      {reg:/ring$/, repl:'ring'},
      {reg:/bing$/, repl:'bingness'},
      {reg:/sing$/, repl:'se'},
      {reg:/ing$/, repl:'ment'},
      {reg:/ess$/, repl:'essness'},
      {reg:/ous$/, repl:'ousness'},
    ];

    for(var i=0; i<transforms.length; i++){
      if(w.match(transforms[i].reg)){
        return w.replace(transforms[i].reg, transforms[i].repl)
      }
    }

    if (w.match(/s$/)) {
			return w;
		}
		return w + 'ness';
  };

  return main;
})()

// console.log(adj_to_noun('mysterious'));
// turn 'quick' into 'quicker'
var to_comparative = (function() {

  var main = function(str, lang) {

    var transforms = [{
      reg: /y$/i,
      repl: 'ier'
    }, {
      reg: /([aeiou])t$/i,
      repl: '$1tter'
    }, {
      reg: /([aeou])de$/i,
      repl: '$1der'
    }, {
      reg: /nge$/i,
      repl: 'nger'
    }];

    var matches = [
      /ght$/,
      /nge$/,
      /ough$/,
      /ain$/,
      /uel$/,
      /[au]ll$/,
      /ow$/,
      /old$/,
      /oud$/,
      /e[ae]p$/
    ];

    var not_matches = [
      /ary$/,
      /ous$/
    ];

    if (adjectives_decline.to_comparative[str]===0) {
			return null
		}
    for (i = 0; i < transforms.length; i++) {
      if (str.match(transforms[i].reg)) {
        return str.replace(transforms[i].reg, transforms[i].repl)
      }
    }

    if (adjectives_decline.convertables.hasOwnProperty(str)) {
      return (str.match(/e$/)) ? str + 'r' : str + 'er'
    }

    if (adjectives_decline.to_comparative.hasOwnProperty(str)) {
      return adjectives_decline.to_comparative[str]
    }

    var i;
    for (i = 0; i < not_matches.length; i++) {
      if (str.match(not_matches[i])) {
        return 'more ' + str
      }
    }

    for (i = 0; i < matches.length; i++) {
      if (str.match(matches[i])) {
        return str + 'er'
      }
    }
    return 'more ' + str;
  }

  return main;
})();

// console.log(to_comparative('dry'))
// console.log(to_comparative('cruel'))
// turn 'quick' into 'quickest'
var to_superlative = (function() {

  var main = function(str, lang) {

    var transforms = [{
      reg: /y$/i,
      repl: 'iest'
    }, {
      reg: /([aeiou])t$/i,
      repl: '$1ttest'
    }, {
      reg: /([aeou])de$/i,
      repl: '$1dest'
    }, {
      reg: /nge$/i,
      repl: 'ngest'
    }];

    var matches = [
      /ght$/,
      /nge$/,
      /ough$/,
      /ain$/,
      /uel$/,
      /[au]ll$/,
      /ow$/,
      /oud$/,
      /...p$/
    ];

    var not_matches = [
      /ary$/
    ];

    var generic_transformation = function(str) {
      if (str.match(/e$/)) {
        return str + 'st'
      } else {
        return str + 'est'
      }
    }

    for (i = 0; i < transforms.length; i++) {
      if (str.match(transforms[i].reg)) {
        return str.replace(transforms[i].reg, transforms[i].repl)
      }
    }

    if (adjectives_decline.convertables.hasOwnProperty(str)) {
			return generic_transformation(str)
		}
		if (!(adjectives_decline.to_superlative[str])) {
			return 'most '.concat(str)
		}
		if (adjectives_decline.to_superlative.hasOwnProperty(str)) {
			return adjectives_decline.to_superlative[str]
		}
    var i;
    for (i = 0; i < not_matches.length; i++) {
      if (str.match(not_matches[i])) {
        return 'most ' + str;
      }
    }

    for (i = 0; i < matches.length; i++) {
      if (str.match(matches[i])) {
        return generic_transformation(str);
      }
    }
    return 'most ' + str;
  }

	return main;
})();

// console.log(to_superlative('dry'))
// console.log(to_superlative('rich'))
// turn 'quick' into 'quickly'
var adj_to_adv = (function() {

  var main = function(str, lang) {

    var transforms = [{
      reg: /al$/i,
      repl: 'ally'
    }, {
      reg: /ly$/i,
      repl: 'ly'
    }, {
      reg: /(.{3})y$/i,
      repl: '$1ily'
    }, {
      reg: /que$/i,
      repl: 'quely'
    }, {
      reg: /ue$/i,
      repl: 'uly'
    }, {
      reg: /ic$/i,
      repl: 'ically'
    }, {
      reg: /ble$/i,
      repl: 'bly'
    }, {
      reg: /l$/i,
      repl: 'ly'
    }];

    var not_matches = [
      /airs$/,
      /ll$/,
      /ee.$/,
      /ile$/
    ];

    if (adjectives_decline.adv_donts[str]) {
			return null
		}
		if (adjectives_decline.adj_to_advs[str]) {
			return adjectives_decline.adj_to_advs[str]
		}
    if (str.length <= 3) {
			return null;
		}
    var i;
    for (i = 0; i < not_matches.length; i++) {
      if (str.match(not_matches[i])) {
				return null
			}
    }
    for (i = 0; i < transforms.length; i++) {
      if (str.match(transforms[i].reg)) {
        return str.replace(transforms[i].reg, transforms[i].repl);
      }
    }
    return str + 'ly';
  }

  return main;
})();

// console.log(adj_to_adv('direct'))
//wrapper for Adjective's methods
var Adjective = function(str, next, last, token) {
  var the = this;
  the.word = str || '';
  the.next = next;
  the.last = last;

  the.conjugate = function() {
    return {
      comparative: to_comparative(the.word),
      superlative: to_superlative(the.word),
      adverb: to_adverb(the.word),
      noun: to_noun(the.word)
    };
  }

  the.which = (function() {
    if (the.word.match(/..est$/)) {return schema['JJS']}
    if (the.word.match(/..er$/))  {return schema['JJR']}
    return schema['JJ'];
  })()

  return the;
};

// console.log(new Adjective('crazy'))

// phrasal verbs are two words that really mean one verb.
// 'beef up' is one verb, and not some direction of beefing.
// by @spencermountain, 2015 mit
// many credits to http://www.allmyphrasalverbs.com/
var phrasal_verbs = (function () {

  //start the list with some randoms
  var main = [
    "be onto",
    "fall behind",
    "fall through",
    "fool with",
    "get across",
    "get along",
    "get at",
    "give way",
    "hear from",
    "hear of",
    "lash into",
    "make do",
    "run across",
    "set upon",
    "take aback",
    "keep from"
  ]

  //if there's a phrasal verb "keep on", there's often a "keep off"
  var opposites = {
    "away": "back",
    "in": "out",
    "on": "off",
    "over": "under",
    "together": "apart",
    "up": "down"
  }

  //forms that have in/out symmetry
  var symmetric = {
    "away": "blow,bounce,bring,call,come,cut,drop,fire,get,give,go,keep,pass,put,run,send,shoot,switch,take,tie,throw",
    "in": "bang,barge,bash,beat,block,book,box,break,bring,burn,butt,carve,cash,check,come,cross,drop,fall,fence,fill,give,grow,hand,hang,head,jack,keep,leave,let,lock,log,move,opt,pack,peel,pull,put,rain,reach,ring,rub,send,set,settle,shut,sign,smash,snow,strike,take,try,turn,type,warm,wave,wean,wear,wheel",
    "on": "add,call,carry,catch,count,feed,get,give,go,grind,head,hold,keep,lay,log,pass,pop,power,put,send,show,snap,switch,take,tell,try,turn,wait",
    "over": "come,go,look,read,run,talk",
    "together": "come,pull,put",
    "up": "add,back,beat,bend,blow,boil,bottle,break,bring,buckle,bundle,call,carve,clean,cut,dress,fill,flag,fold,get,give,grind,grow,hang,hold,keep,let,load,lock,look,man,mark,melt,move,pack,pin,pipe,plump,pop,power,pull,put,rub,scale,scrape,send,set,settle,shake,show,sit,slow,smash,square,stand,strike,take,tear,tie,turn,use,wash,wind",
  }
  Object.keys(symmetric).forEach(function (k) {
    symmetric[k].split(',').forEach(function (s) {
      //add the given form
      main.push(s + " " + k)
      //add its opposite form
      main.push(s + " " + opposites[k])
    })
  })

  //forms that don't have in/out symmetry
  var asymmetric = {
    "about": "bring,fool,gad,go,root",
    "after": "go,look,take",
    "ahead": "get,go,press",
    "along": "bring,move",
    "apart": "fall,take",
    "around": "ask,boss,bring,call,come,fool,get,horse,joke,lie,mess,play",
    "away": "back,carry,file,frighten,hide,wash",
    "back": "fall,fight,hit,hold,look,pay,stand,think",
    "by": "drop,get,go,stop,swear,swing,tick,zip",
    "down": "bog,calm,fall,hand,hunker,jot,knock,lie,narrow,note,pat,pour,run,tone,trickle,wear",
    "for": "fend,file,gun,hanker,root,shoot",
    "forth": "bring,come",
    "forward": "come,look",
    "in": "cave,chip,hone,jump,key,pencil,plug,rein,shade,sleep,stop,suck,tie,trade,tuck,usher,weigh,zero",
    "into": "look,run",
    "it": "go,have",
    "off": "auction,be,beat,blast,block,brush,burn,buzz,cast,cool,drop,end,face,fall,fend,frighten,goof,jack,kick,knock,laugh,level,live,make,mouth,nod,pair,pay,peel,read,reel,ring,rip,round,sail,shave,shoot,sleep,slice,split,square,stave,stop,storm,strike,tear,tee,tick,tip,top,walk,work,write",
    "on": "bank,bargain,egg,frown,hit,latch,pile,prattle,press,spring,spur,tack,urge,yammer",
    "out": "act,ask,back,bail,bear,black,blank,bleed,blow,blurt,branch,buy,cancel,cut,eat,edge,farm,figure,find,fill,find,fish,fizzle,flake,flame,flare,flesh,flip,geek,get,help,hide,hold,iron,knock,lash,level,listen,lose,luck,make,max,miss,nerd,pan,pass,pick,pig,point,print,psych,rat,read,rent,root,rule,run,scout,see,sell,shout,single,sit,smoke,sort,spell,splash,stamp,start,storm,straighten,suss,time,tire,top,trip,trot,wash,watch,weird,whip,wimp,wipe,work,zone,zonk",
    "over": "bend,bubble,do,fall,get,gloss,hold,keel,mull,pore,sleep,spill,think,tide,tip",
    "round": "get,go",
    "through": "go,run",
    "to": "keep,see",
    "up": "act,beef,board,bone,boot,brighten,build,buy,catch,cheer,cook,end,eye,face,fatten,feel,fess,finish,fire,firm,flame,flare,free,freeze,freshen,fry,fuel,gang,gear,goof,hack,ham,heat,hit,hole,hush,jazz,juice,lap,light,lighten,line,link,listen,live,loosen,make,mash,measure,mess,mix,mock,mop,muddle,open,own,pair,patch,pick,prop,psych,read,rough,rustle,save,shack,sign,size,slice,slip,snap,sober,spark,split,spruce,stack,start,stay,stir,stitch,straighten,string,suck,suit,sum,team,tee,think,tidy,tighten,toss,trade,trip,type,vacuum,wait,wake,warm,weigh,whip,wire,wise,word,write,zip",
  }
  Object.keys(asymmetric).forEach(function (k) {
    asymmetric[k].split(',').forEach(function (s) {
      main.push(s + " " + k)
    })
  })

  //at his point all verbs are infinitive. lets make this explicit.
  main=main.reduce(function(h,s){
    h[s]="VBP"
    return h
  },{})

  //conjugate every phrasal verb. takes ~30ms
  var tags={
    present:"VB",
    past:"VBD",
    future:"VBF",
    gerund:"VBG",
    infinitive:"VBP"
  }
  var cache={}//cache individual verbs to speed it up
  var split, verb, particle, phrasal;
  Object.keys(main).forEach(function(s){
    split=s.split(' ')
    verb=split[0]
    particle=split[1]
    if(cache[verb]===undefined){
      cache[verb]=verb_conjugate(verb)
    }
    Object.keys(cache[verb]).forEach(function(k){
      phrasal=cache[verb][k]+" "+particle
      main[phrasal]=tags[k]
    })
  })

  return main
})()
// console.log(JSON.stringify(phrasal_verbs, null, 2))

//Parents are classes for each main part of speech, with appropriate methods

var parents = {
  adjective: function(str, next, last, token) {
    return new Adjective(str, next, last, token);
  },
  noun: function(str, next, last, token) {
    return new Noun(str, next, last, token);
  },
  adverb: function(str, next, last, token) {
    return new Adverb(str, next, last, token);
  },
  verb: function(str, next, last, token) {
    return new Verb(str, next, last, token);
  },
  value: function(str, next, last, token) {
    return new Value(str, next, last, token);
  },
  glue: function(str, next, last, token) {
    return {};
  }
}



var lexicon = (function() {




  var main = {};
  var zip = { EX: [ 'there' ],
  NN:
   [ 'president',
     'dollar',
     'student',
     'patent',
     'funding',
     'morning',
     'banking',
     'ceiling',
     'energy',
     'secretary',
     'purpose',
     'event' ],
  NNS: [ 'friends' ],
  CC:
   [ 'how',
     'or',
     'while',
     'nor',
     'though',
     'because',
     'but',
     'for',
     'and',
     'if',
     'however',
     'before',
     'although',
     'not',
     'whether',
     'yet',
     'therefore',
     'plus',
     'versus' ],
  VBD: [ 'walked', 'where\'d', 'when\'d', 'how\'d', 'what\'d' ],
  VBN: [ 'born' ],
  VBG: [ 'am', 'according', 'resulting', 'staining' ],
  DT:
   [ 'that',
     'this',
     'these',
     'those',
     'such',
     'neither',
     'which',
     'what',
     'the',
     'no',
     'any',
     'each',
     'whatever',
     'whichever',
     'whenever',
     'whoever',
     'wherever',
     'an',
     'a',
     'own',
     'few',
     'both',
     'much',
     'some',
     'enough',
     'every',
     'another',
     'plenty',
     'least',
     'various',
     'either',
     'else',
     'la',
     'le',
     'les',
     'des',
     'de',
     'du',
     'el' ],
  IN:
   [ 'in',
     'out',
     'on',
     'off',
     'of',
     'with',
     'over',
     'under',
     'up',
     'down',
     'about',
     'before',
     'after',
     'to',
     'round',
     'through',
     'onto',
     'around',
     'behind',
     'above',
     'away',
     'across',
     'ahead',
     'upon',
     'aback',
     'back',
     'forth',
     'along',
     'apart',
     'way',
     'until',
     'into',
     'against',
     'except',
     'by',
     'between',
     'at',
     'as',
     'from',
     'among',
     'amid',
     'since',
     'within',
     'during',
     'per',
     'without',
     'throughout',
     'than',
     'via',
     'despite',
     'above',
     'below',
     'unless',
     'whereas',
     'unlike',
     'towards',
     'besides',
     'amidst',
     'amongst',
     'apropos',
     'atop',
     'barring',
     'chez',
     'circa',
     'mid',
     'midst',
     'notwithstanding',
     'qua',
     'sans',
     'vis-a-vis',
     'thru',
     'till',
     'versus',
     'w/o',
     '\'o',
     'o\'',
     'a\'' ],
  PP:
   [ 'my',
     'myself',
     'your',
     'yourself',
     'yourselves',
     'himself',
     'hers',
     'herself',
     'itself',
     'ours',
     'ourselves',
     'theirs',
     'themself',
     'themselves',
     'none',
     'who',
     'whom',
     'whose',
     'something',
     'anything',
     'anyone',
     'lot',
     'nothing',
     'everything' ],
  UH:
   [ 'uhh',
     'uh-oh',
     'ugh',
     'sheesh',
     'eww',
     'pff',
     'voila',
     'oy',
     'eep',
     'hurrah',
     'yuck',
     'ow',
     'duh',
     'oh',
     'hmm',
     'yeah',
     'whoa',
     'ooh',
     'whee',
     'ah',
     'bah',
     'gah',
     'yaa',
     'phew',
     'gee',
     'ahem',
     'eek',
     'meh',
     'yahoo',
     'oops',
     'd\'oh',
     'psst',
     'argh',
     'grr',
     'nah',
     'shhh',
     'whew',
     'mmm',
     'yay',
     'uh-huh',
     'boo',
     'wow',
     'nope' ],
  FW: [ 'etc' ],
  RB:
   [ 'when',
     'whence',
     'where',
     'why',
     'now',
     'again',
     'here',
     'so',
     'very',
     'just',
     'too',
     'quite',
     'then',
     'once',
     'maybe',
     'rather',
     'anyway',
     'hence',
     'further',
     'already',
     'soon',
     'directly',
     'toward',
     'forever',
     'apart',
     'instead',
     'yes',
     'alone',
     'ago',
     'indeed',
     'ever',
     'perhaps',
     'thus',
     'often',
     'never',
     'always',
     'sometimes',
     'also',
     'several',
     'randomly',
     'abroad',
     'almost',
     'twice',
     'somewhat',
     'somehow',
     'meanwhile',
     'furthermore',
     'aside',
     'moreover',
     'anymore',
     'newly',
     'damn',
     'absolutely',
     'actually',
     'apparently',
     'approximately',
     'certainly',
     'clearly',
     'completely',
     'definitely',
     'easily',
     'effectively',
     'entirely',
     'essentially',
     'exactly',
     'extremely',
     'fairly',
     'frankly',
     'frequently',
     'generally',
     'hardly',
     'heavily',
     'highly',
     'hopefully',
     'largely',
     'literally',
     'mostly',
     'necessarily',
     'nicely',
     'obviously',
     'particularly',
     'possibly',
     'primarily',
     'probably',
     'precisely',
     'really',
     'relatively',
     'seriously',
     'significantly',
     'slightly',
     'specifically',
     'strongly',
     'surely',
     'totally',
     'truly',
     'typically',
     'ultimately',
     'usually',
     'virtually',
     'widely' ],
  RBR: [ 'more' ],
  RBS: [ 'most' ] }
  var unzip = function (cat){
			if (typeof window != 'undefined' && window.hasOwnProperty('nlp')) { m = window; pm = window; }
			var nrOnes = Object.keys(m.numbers.ones).filter(function(s){ return s!='a' })
			var did = {
				NN: m.nouns_inflect.NN.map(function(a){ return a[0]; }).concat(Object.keys(m.nouns_inflect.uncountables)),
				NNS: m.nouns_inflect.NN.map(function(a){ return a[1]; }),
				VBD: m.verbs_conjugate.irregulars.map(function(o){ return o.past; }),
				VBG: m.verbs_conjugate.irregulars.map(function(o){ return o.gerund; }),
				RB: Object.keys(m.adverbs_decline).concat(Object.keys(m.adjectives_decline.adj_to_advs).map(function(s) { return m.adjectives_decline.adj_to_advs[s]; })),
			}
			var lexiZip = {
				NNA: Object.keys(m.verbs_conjugate.irregularDoers).map(function(s){ return m.verbs_conjugate.irregularDoers[s];  }),
				NNAB: m.abbreviations,
				NNP: Object.keys(m.firstnames),
				PRP: Object.keys(m.nouns.prps),
				PP: Object.keys(m.nouns.pps),
				CP: m.verbs_special.cps,
				MD: m.verbs_special.mds,
				VBP: m.verbs_conjugate.irregulars.map(function(o){ return o.infinitive; }),
				VBZ: m.verbs_conjugate.irregulars.map(function(o){ return o.present; }),
				JJR: Object.keys(m.adjectives_decline.to_comparative).map(function(s){ return m.adjectives_decline.to_comparative[s]; }),
				JJS: Object.keys(m.adjectives_decline.to_superlative).map(function(s){ return m.adjectives_decline.to_superlative[s]; }),
				JJ: m.adjectives_demonym.concat(
						Object.keys(m.adjectives_decline.adv_donts), Object.keys(m.adjectives_decline.adj_to_advs),
						Object.keys(m.adjectives_decline.to_comparative), Object.keys(m.adjectives_decline.to_superlative),
						Object.keys(m.adverbs_decline).map(function(s) { return m.adverbs_decline[s]; })
				),
				//CD
				NU: nrOnes.concat( Object.keys(m.numbers.teens), Object.keys(m.numbers.tens), Object.keys(m.numbers.multiple) ),
				DA: Object.keys(m.dates.months).concat( Object.keys(m.dates.days) )
			}

			if (!cat) {
				var toMain = function(key, o) {
					o[key].forEach(function(w) { if (w && !main[w]) {main[w] = key} });
				}
				// irregulars to main
				for (var key in did) { toMain(key, did) }
				for (var key in lexiZip) { toMain(key, lexiZip) }
				// zip to main
				for (var key in zip) {

					toMain(key, zip);
				}

				//add phrasal verbs - TODO FIXME
				Object.keys(pm.phrasal_verbs).forEach(function(s) {
					main[s] = pm.phrasal_verbs[s]
				});
				// conjugate all verbs. (~8ms, triples the lexicon size)
				m.verbs.forEach(function(v) {
					var c = pm.conjugate(v);
					var d = pm.to_doer(v);
					var map = {'infinitive': 'VBP', 'past': 'VBD', 'gerund': 'VBG', 'present': 'VBZ', 'participle': 'VBN'};
					for (var type in map) {
						if (c[type] && !main[c[type]]) { main[c[type]] = map[type] }
						if (d && !main[d]) { main[d] = 'NNA' }
					}
				});
				// decline all adjectives to their adverbs. (13ms)
				// 'to_adverb','to_superlative','to_comparative'
				m.adjectives.concat(Object.keys(m.adjectives_decline.convertables)).forEach(function(j) {
					main[j] = 'JJ';
					var adv = pm.to_adverb(j);
					if (adv && adv !== j && !main[adv]) {
						main[adv] = main[adv] || 'RB'
					}
					var c = pm.to_comparative(j);
					if (c && !c.match(/^more ./) && c !== j && !main[c]) {
						main[c] = main[c] || 'JJR'
					}
					var s = pm.to_superlative(j);
					if (s && !s.match(/^most ./) && s !== j && !main[s]) {
						main[s] = main[s] || 'JJS'
					}
				});

				return main;
			}
			if (cat in did) { return did[cat] }
			return [];
		}
  unzip();


  return main;
})();
// methods that hang on a parsed set of words
// accepts parsed tokens
var Sentence = function(tokens) {

	var the = this;
  the.tokens = tokens || [];

  var capitalise = function(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  the.tense = function() {
    var verbs = the.tokens.filter(function(token) {
      return token.pos.parent === 'verb';
    })
    return verbs.map(function(v) {
      return v.analysis.tense;
    })
  }

  the.to_past = function() {
    the.tokens = the.tokens.map(function(token) {
      if (token.pos.parent === 'verb') {
        token.text = token.analysis.to_past();
        token.normalised = token.text;
      }
      return token;
    })
    return the;
  }

  the.to_present = function() {
    the.tokens = the.tokens.map(function(token) {
      if (token.pos.parent === 'verb') {
        token.text = token.analysis.to_present();
        token.normalised = token.text;
      }
      return token;
    })
    return the;
  }

  the.to_future = function() {
    the.tokens = the.tokens.map(function(token) {
      if (token.pos.parent === 'verb') {
        token.text = token.analysis.to_future();
        token.normalised = token.text;
      }
      return token;
    })
    return the;
  }

  the.insert = function(token, i) {
    if (i && token) {
			the.tokens.splice(i, 0, token);
		}
  }

  // negate makes the sentence mean the opposite thing.
  the.negate = function() {
    // these are cheap ways to negate the meaning
    // ('none' is ambiguous because it could mean (all or some) )
    // loop through each term..
    for (var i = 0; i < the.tokens.length; i++) {
      var tok = the.tokens[i];
      //turn 'is' into 'isn't', etc - make sure 'is' isnt followed by a 'not', too
      if (negate_data[tok.normalised] && (!the.tokens[i + 1] || the.tokens[i + 1].normalised != 'not')) {
        tok.text = negate_data[tok.normalised];
        tok.normalised = negate_data[tok.normalised];
        if (tok.capitalised) {
          tok.text = capitalise(tok.text);
        }
        return the;
      }

      // find the first verb..
      if (tok.pos.parent == 'verb') {
        // if verb is already negative, make it not negative
        if (tok.analysis.negative()) {
          if (the.tokens[i + 1] && the.tokens[i + 1].normalised == 'not') {
            the.tokens.splice(i + 1, 1);
          }
          return the;
        }
        // turn future-tense 'will go' into 'won't go'
        if (tok.normalised.match(/^will /i)) {
          tok.text = tok.text.replace(/^will /i, "won't ")
          tok.normalised = tok.text;
          if (tok.capitalised) {
            tok.text = capitalise(tok.text);
          }
          return the;
        }
        // - INFINITIVE-
        // 'i walk' -> 'i don't walk'
        if (tok.analysis.form == 'infinitive' && tok.analysis.form != 'future') {
          tok.text = "don't " + (tok.analysis.conjugate().infinitive || tok.text);
          tok.normalised = tok.text.toLowerCase();
          return the;
        }
        // - GERUND-
        // if verb is gerund, 'walking' -> 'not walking'
        if (tok.analysis.form == 'gerund') {
          tok.text = 'not ' + tok.text;
          tok.normalised = tok.text.toLowerCase();
          return the;
        }
        // - PAST-
        // if verb is past-tense, 'he walked' -> 'he did't walk'
        if (tok.analysis.tense == 'past') {
          tok.text = "didn't " + (tok.analysis.conjugate().infinitive || tok.text);
          tok.normalised = tok.text.toLowerCase();
          return the;
        }
        // - PRESENT-
        // if verb is present-tense, 'he walks' -> 'he doesn't walk'
        if (tok.analysis.tense == 'present') {
          tok.text = "doesn't " + (tok.analysis.conjugate().infinitive || tok.text);
          tok.normalised = tok.text.toLowerCase();
          return the;
        }
        // - FUTURE-
        // if verb is future-tense, 'will go' -> won't go. easy-peasy
        if (tok.analysis.tense == 'future') {
          if (tok.normalised == 'will') {
            tok.normalised = "won't";
            tok.text = "won't";
          } else {
            tok.text = tok.text.replace(/^will /i, "won't ");
            tok.normalised = tok.normalised.replace(/^will /i, "won't ");
          }
          if (tok.capitalised) {
						tok.text = capitalise(tok.text);
					}
					return the;
        }

        return the;
      }
    }

    return the;
  }

  the.entities = function(options) {
    var spots = [];
    options = options || {};
    the.tokens.forEach(function(token) {
      if (token.pos.parent === 'noun' && token.analysis.is_entity()) {
        spots.push(token);
      }
    })
    if (options.ignore_gerund) {
      spots = spots.filter(function(t) {
        return t.pos.tag !== 'VBG';
      })
    }
    return spots;
  }

  //noun-entities that look like person names..
  the.people = function(){
    return the.entities({}).filter(function(o){
      return o.analysis.is_person();
    })
  }

  the.text = function() {
    return the.tokens.map(function(s) {
      return s.text;
    }).join(' ');
  }

  //sugar 'grab' methods
  the.verbs = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == 'verb';
    })
  }

  the.adverbs = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == 'adverb';
    })
  }

  the.nouns = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == 'noun';
    })
  }

  the.adjectives = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == 'adjective';
    })
  }

  the.values = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == 'value';
    })
  }

  the.tags = function() {
    return the.tokens.map(function(t) {
      return t.pos.tag;
    })
  }

	//find the 'it', 'he', 'she', and 'they' of this sentence
  //these are the words that get 'exported' to be used in other sentences
  the.referables=function(){
    var pronouns={
      he:undefined,
      she:undefined,
      they:undefined,
      it:undefined
    }
    the.tokens.forEach(function(t){
      if(t.pos.parent=="noun" && t.pos.tag!="PRP"){
        pronouns[t.analysis.pronoun()]=t
      }
    })
    return pronouns
  }

  return the
}


//a section is a block of text, with an arbitrary number of sentences
//these methods are just wrappers around the ones in sentence.js
var Section = function(sentences) {
  var the = this;
  the.sentences = sentences || [];

  the.text = function() {
    return the.sentences.map(function(s) {
      return s.text()
    }).join(' ')
  }

  the.tense = function() {
    return the.sentences.map(function(s) {
      return s.tense()
    })
  }

  //pluck out wanted data from sentences
  the.nouns = function() {
    return the.sentences.map(function(s) {
      return s.nouns()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.entities = function(options) {
    return the.sentences.map(function(s) {
      return s.entities(options)
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.people = function() {
    return the.sentences.map(function(s) {
      return s.people()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.adjectives = function() {
    return the.sentences.map(function(s) {
      return s.adjectives()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.verbs = function() {
    return the.sentences.map(function(s) {
      return s.verbs()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.adverbs = function() {
    return the.sentences.map(function(s) {
      return s.adverbs()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.values = function() {
    return the.sentences.map(function(s) {
      return s.values()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.tags = function() {
    return the.sentences.map(function(s) {
      return s.tags()
    })
  }

  //transform the sentences
  the.negate = function() {
    the.sentences = the.sentences.map(function(s) {
      return s.negate()
    })
    return the
  }
  the.to_past = function() {
    the.sentences = the.sentences.map(function(s) {
      return s.to_past()
    })
    return the
  }
  the.to_present = function() {
    the.sentences = the.sentences.map(function(s) {
      return s.to_present()
    })
    return the
  }
  the.to_future = function() {
    the.sentences = the.sentences.map(function(s) {
      return s.to_future()
    })
    return the
  }

}


var pos = (function() {
	// 'use strict';

	var vs = Object.keys(dates.months).concat(Object.keys(dates.days));
	for (var k in numbers) {
		vs = vs.concat(Object.keys(numbers[k]))
	}
	var values = vs.reduce(function(h, s) { h[s] = 'CD'; return h; }, {});

	var merge_tokens = function(a, b) {
		a.text += ' ' + b.text;
		a.normalised += ' ' + b.normalised;
		a.pos_reason += '|' + b.pos_reason;
		a.start = a.start || b.start;
		a.noun_capital = (a.noun_capital && b.noun_capital);
		a.punctuated = a.punctuated || b.punctuated;
		a.end = a.end || b.end;
		return a;
	}

	//combine adjacent neighbours, and special cases
  var combine_tags = function(sentence) {
    var arr = sentence.tokens || [];
    for (var i = 0; i <= arr.length; i++) {
      var next = arr[i + 1];
			var merge = function() {
				arr[i + 1] = merge_tokens(arr[i], arr[i + 1]);
        arr[i] = null;
			}
      if (arr[i] && next) {
        var tag = arr[i].pos.tag;
        //'joe smith' are both NN, for example
        if (tag === next.pos.tag && arr[i].punctuated !== true && arr[i].noun_capital == next.noun_capital ) {
          merge();
        }
        //merge NNP and NN, like firstname, lastname
        else if ((tag === "NNP" && next.pos.tag ==="NN") || (tag==="NN" && next.pos.tag==="NNP")) {
          merge();
          arr[i + 1].pos = schema['NNP'];
        }
        //merge dates manually, which often have punctuation
        else if (tag === "CD" && next.pos.tag ==="CD") {
          merge();
        }
        //merge abbreviations with nouns manually, eg. "Joe jr."
        else if ( (tag === "NNAB" && next.pos.parent ==="noun") || (arr[i].pos.parent==="noun" && next.pos.tag==="NNAB")) {
          merge();
        }
        //'will walk' -> future-tense verb
        else if (arr[i].normalised === "will" && next.pos.parent === "verb") {
          merge();
        }
        //'hundred and fifty', 'march the 5th'
        else if (tag === "CD" && (next.normalised === "and" || next.normalised === "the") && arr[i + 2] && arr[i + 2].pos.tag === "CD") {
          merge();
        }
        //capitals surrounding a preposition  'United States of America'
        else if (tag=="NN" && arr[i].noun_capital && (next.normalised == "of" || next.normalised == "and") && arr[i + 2] && arr[i + 2].noun_capital) {
          merge();
          arr[i + 2] = merge_tokens(arr[i + 1], arr[i + 2]);
          arr[i + 1] = null;
        }
        //capitals surrounding two prepositions  'Phantom of the Opera'
        else if (arr[i].noun_capital && next.normalised == "of" && arr[i + 2] && arr[i + 2].pos.tag == "DT" && arr[i + 3] && arr[i + 3].noun_capital) {
          merge();
          arr[i + 2] = merge_tokens(arr[i + 1], arr[i + 2]);
          arr[i + 1] = null;
          arr[i + 3] = merge_tokens(arr[i + 2], arr[i + 3]);
          arr[i + 2] = null;
        }
      }
    }
    sentence.tokens = arr.filter(function(r) {
      return r
    })
    return sentence
  }

	//some prepositions are clumped onto the back of a verb 'looked for', 'looks at'
	//they should be combined with the verb, sometimes.
	//does not handle seperated phrasal verbs ('take the coat off' -> 'take off')
	var combine_phrasal_verbs = function(sentence) {
		var arr = sentence.tokens || [];
		for (var i = 1; i < arr.length; i++) {
			if(pos_data.particles[arr[i].normalised]){
				//it matches a known phrasal-verb
				if(lexicon[arr[i-1].normalised + ' ' + arr[i].normalised]){
					// console.log(arr[i-1].normalised + ' ' + arr[i].normalised)
					arr[i] = merge_tokens(arr[i-1], arr[i]);
					arr[i-1] = null;
				}
			}
		}
		sentence.tokens = arr.filter(function(r) {
			return r;
		})
		return sentence;
	}


	var lexicon_pass = function(w) {
		if (lexicon.hasOwnProperty(w)) {
			return schema[lexicon[w]]
		}
		//try to match it without a prefix - eg. outworked -> worked
		if (w.match(/^(over|under|out|-|un|re|en).{4}/)) {
			var attempt = w.replace(/^(over|under|out|.*?-|un|re|en)/, '');
			return schema[lexicon[attempt]];
		}
	}

	var rules_pass = function(w) {
		for (var i = 0; i < word_rules.length; i++) {
			if (w.length> 4 && w.match(word_rules[i].reg)) {
				return schema[word_rules[i].pos];
			}
		}
	}

	var fourth_pass = function(token, i, sentence) {
		var last = sentence.tokens[i - 1];
		var next = sentence.tokens[i + 1];
		var strong_determiners = { // TODO
			'the': 1,
			'a': 1,
			'an': 1
		};
		var setPos = function(p, pr) {
			token.pos = schema[p];
			token.pos_reason = pr;
		}
		//resolve ambiguous 'march','april','may' with dates
		if((token.normalised=='march'||token.normalised=='april'||token.normalised=='may') && ( (next && next.pos.tag=='CD') || (last && last.pos.tag=='CD') ) ){
			setPos('CD', 'may_is_date');
		}
			//if it's before a modal verb, it's a noun -> lkjsdf would
		if (next && token.pos.parent !== 'noun' && token.pos.parent !== 'glue' && next.pos.tag === 'MD') {
			setPos('NN', 'before_modal');
		}
		//if it's after the word 'will' its probably a verb/adverb
		if (last && last.normalised == 'will' && !last.punctuated && token.pos.parent == 'noun' && token.pos.tag !== 'PRP' && token.pos.tag !== 'PP') {
			setPos('VB', 'after_will');
		}
		//if it's after the word 'i' its probably a verb/adverb
		if (last && last.normalised == 'i' && !last.punctuated && token.pos.parent == 'noun') {
			setPos('VB', 'after_i');
		}
		//if it's after an adverb, it's not a noun -> quickly acked
		//support form 'atleast he is..'
		if (last && token.pos.parent === 'noun' && token.pos.tag !== 'PRP' && token.pos.tag !== 'PP' && last.pos.tag === 'RB' && !last.start) {
			setPos('VB', 'after_adverb');
		}
		//no consecutive, unpunctuated adjectives -> real good
		if (next && token.pos.parent === 'adjective' && next.pos.parent === 'adjective' && !token.punctuated) {
			setPos('RB', 'consecutive_adjectives');
		}
		//if it's after a determiner, it's not a verb -> the walk
		if (last && token.pos.parent === 'verb' && strong_determiners[last.pos.normalised] && token.pos.tag != 'CP') {
			setPos('NN', 'determiner-verb');
		}
		//copulas are followed by a determiner ('are a ..'), or an adjective ('are good')
		if (last && last.pos.tag === "CP" && token.pos.tag !== "DT" && token.pos.tag !== "RB" && token.pos.tag !== "PRP" && token.pos.parent !== "adjective" && token.pos.parent !== "value") {
			setPos('JJ', 'copula-adjective');
		}
		//copula, adverb, verb -> copula adverb adjective -> is very lkjsdf
		if (last && next && last.pos.tag === 'CP' && token.pos.tag === 'RB' && next.pos.parent === 'verb') {
			sentence.tokens[i + 1].pos = schema['JJ'];
			sentence.tokens[i + 1].pos_reason = 'copula-adverb-adjective';
		}
		// the city [verb] him.
		if (next && next.pos.tag == 'PRP' && token.pos.tag !== 'PP' && token.pos.parent == 'noun' && !token.punctuated) {
			setPos('VB', 'before_[him|her|it]');
		}
		//the misled worker -> misled is an adjective, not vb
		if (last && next && last.pos.tag === 'DT' && next.pos.parent === 'noun' && token.pos.parent === 'verb') {
			setPos('JJ', 'determiner-adjective-noun');
		}

		//where's he gone -> gone=VB, not JJ
    if (last && last.pos.tag==="PRP" && token.pos.tag==="JJ" ) {
			setPos('VB', 'adjective-after-pronoun');
    }

		return token;
	}

	//add a 'quiet' token for contractions so we can represent their grammar
	var handle_contractions = function(arr) {
		var before, after, fix;
		for (var i = 0; i < arr.length; i++) {
			if (pos_data.contractions.hasOwnProperty(arr[i].normalised)) {
				before = arr.slice(0, i);
				after = arr.slice(i + 1, arr.length);
				fix = [{
					text: arr[i].text,
					normalised: pos_data.contractions[arr[i].normalised][0],
					start: arr[i].start
				}, {
					text: '',
					normalised: pos_data.contractions[arr[i].normalised][1],
					start: undefined
				}];
				arr = before.concat(fix);
				arr = arr.concat(after);
				return handle_contractions(arr); // recursive
			}
		}
		return arr;
	}

	//these contractions require (some) grammatical knowledge to disambig properly (e.g "he's"=> ['he is', 'he was']
  var handle_ambiguous_contractions = function(arr) {
		// TODO been forces has
    var before, after, fix;
    for (var i = 0; i < arr.length; i++) {
      if (pos_data.ambiguousContractions.hasOwnProperty(arr[i].normalised)) {
        before = arr.slice(0, i);
        after = arr.slice(i + 1, arr.length);
        // choose which verb this contraction should have..
        var chosen= "is";
        // look for the next verb, and if it's past-tense (he's walked -> he has walked)
        for(var o=i+1; o<arr.length; o++){
          if(arr[o] && arr[o].pos && arr[o].pos.tag=="VBD"){ // past tense
            chosen="has";
            break;
          }
        }
        fix = [{
          text: arr[i].text,
          normalised: pos_data.ambiguousContractions[arr[i].normalised], // the "he" part
          start: arr[i].start,
          pos: parts_of_speech[lexicon[pos_data.ambiguousContractions[arr[i].normalised]]],
          pos_reason:"ambiguous_contraction"
        }, {
          text: "",
          normalised: chosen, //is,was,or have
          start: undefined,
          pos: parts_of_speech[lexicon[chosen]],
          pos_reason:"silent_contraction"
        }];
        arr = before.concat(fix);
        arr = arr.concat(after);
        return handle_ambiguous_contractions(arr); // recursive
      }
    }
    return arr
  }

	////////////////
	///party-time//
	var main = function(text, options) {
		options = options || {};
		if (!text || !text.match(/[a-z0-9]/i)) {
			return new Section([]);
		}
		var sentences = tokenize(text);

		var setPos = function(token, p, pr) {
			token.pos = schema[p];
			token.pos_reason = pr;
			return token;
		}

		sentences.forEach(function(sentence) {

			// first, let's handle the capitalisation-of-the-first-word issue
			var first = sentence.tokens[0];
			if (first) {
				// if second word is a noun-capital, give more sympathy to this capital
				if(sentence.tokens[1] && sentence.tokens[1].noun_capital && !lexicon_pass(first.normalised)){
					sentence.tokens[0].noun_capital = true;
				}
			}
			// smart handling of contractions
			sentence.tokens = handle_contractions(sentence.tokens);

			// first pass, word-level clues
			sentence.tokens = sentence.tokens.map(function(token) {
				// it has a capital and isn't a month, etc.
				if (token.noun_capital && !values[token.normalised]) {
					return setPos(token, 'NN', 'noun_capitalised');
				}
				// known words list
				var lex = lexicon_pass(token.normalised);
				if (lex) {
					token.pos = lex;
					token.pos_reason = 'lexicon';
					// if it's an abbreviation, forgive the punctuation (eg. 'dr.')
					if(token.pos.tag === 'NNAB'){
						token.punctuated = false;
					}
					return token;
				}

				// handle punctuation like ' -- '
				if (!token.normalised) {
					return setPos(token, 'UH', 'wordless_string');
				}
				// suffix pos signals from wordnet
				var len = token.normalised.length;
				if (len > 4) {
					var suffix = token.normalised.substr(len - 4, len - 1)
					if (suffixes.wordnet.hasOwnProperty(suffix)) {
						return setPos(token, suffixes.wordnet[suffix], 'wordnet suffix');
					}
				}

				// suffix regexes for words
				var r = rules_pass(token.normalised);
				if (r) {
					token.pos = r;
					token.pos_reason = 'regex suffix'
					return token
				}

				// see if it's a number
				if (parseFloat(token.normalised)) {
					return setPos(token, 'CD', 'parsefloat')
				}
				return token;
			})

			// second pass, wrangle results a bit
			sentence.tokens = sentence.tokens.map(function(token, i) {
				// set ambiguous 'ed' endings as either verb/adjective
				if ( token.pos_reason!=='lexicon' && token.normalised.match(/.ed$/)) {
					token.pos = schema['VB'];
					token.pos_reason = 'ed';
				}
				return token;
			})

			//split-out more difficult contractions, like "he's"->["he is", "he was"]
			// (now that we have enough pos data to do this)
			sentence.tokens = handle_ambiguous_contractions(sentence.tokens);

			// third pass, seek verb or noun phrases after their signals
			var need = null;
			var reason = '';
			sentence.tokens = sentence.tokens.map(function(token, i) {
				var next = sentence.tokens[i + 1];
				if (token.pos) {
					// suggest noun after some determiners (a|the), posessive pronouns (her|my|its)
					if (token.normalised == 'the' || token.normalised == 'a' || token.normalised == 'an' || token.pos.tag === 'PP') {
						need = 'noun';
						reason = token.pos.name;
						return token; // proceed
					}
					// suggest verb after personal pronouns (he|she|they), modal verbs (would|could|should)
					if (token.pos.tag === 'PRP' && token.pos.tag !== 'PP' || token.pos.tag === 'MD') {
						need = 'verb';
						reason = token.pos.name;
						return token; // proceed
					}

				}
				// satisfy need on a conflict, and fix a likely error
				if (token.pos) {
					if (need == 'verb' && token.pos.parent == 'noun' && (!next || (next.pos && next.pos.parent != 'noun'))) {
						if (!next || !next.pos || next.pos.parent != need) { // ensure need not satisfied on the next one
							token = setPos(token, 'VB', 'signal from '+reason);
							need = null;
						}
					}
					if (need == 'noun' && token.pos.parent == 'verb' && (!next || (next.pos && next.pos.parent != 'verb'))) {
						if (!next || !next.pos || next.pos.parent != need) { // ensure need not satisfied on the next one
							token = setPos(token, 'NN', 'signal from '+reason);
							need = null;
						}
					}
				}
				// satisfy need with an unknown pos
				if (need && !token.pos) {
					if (!next || !next.pos || next.pos.parent != need) { // ensure need not satisfied on the next one
						token = setPos(token, need, 'signal from '+reason);
						need = null;
					}
				}
				// set them back as satisfied..
				if (need === 'verb' && token.pos && token.pos.parent === 'verb') {
					need = null;
				}
				if (need === 'noun' && token.pos && token.pos.parent === 'noun') {
					need = null;
				}
				return token;
			})

			// third pass, identify missing clauses, fallback to noun
			var has = {};
			sentence.tokens.forEach(function(token) {
				if (token.pos) {
					has[token.pos.parent] = true;
				}
			})
			sentence.tokens = sentence.tokens.map(function(token, i) {
				if (!token.pos) {
					// if there is no verb in the sentence, and there needs to be.
					if (has['adjective'] && has['noun'] && !has['verb']) {
						has['verb'] = true;
						return setPos(token, 'VB', 'need one verb');
					}

					// fallback to a noun
					token = setPos(token, 'NN', 'noun fallback');
				}
				return token;
			})

			// fourth pass, error correction
			sentence.tokens = sentence.tokens.map(function(token, i) {
				return fourth_pass(token, i, sentence);
			})
			// run the fourth-pass again!
			sentence.tokens = sentence.tokens.map(function(token, i) {
				return fourth_pass(token, i, sentence);
			})
		})

		// combine neighbours
		if (!options.dont_combine) {
			sentences = sentences.map(function(s) {
				return combine_tags(s);
			})
			sentences = sentences.map(function(s){
				return combine_phrasal_verbs(s);
			})
		}

		// make them Sentence objects
		sentences = sentences.map(function(s) {
			var sentence = new Sentence(s.tokens);
			sentence.type = s.type;
			return sentence;
		})
		// add analysis on each token
		sentences = sentences.map(function(s) {
			s.tokens = s.tokens.map(function(token, i) {
				token.analysis = parents[token.pos.parent](token.normalised, s, i);
				return token;
			})
			return s;
		})

		// add next-last references
		sentences = sentences.map(function(sentence,i) {
			sentence.last=sentences[i-1];
			sentence.next=sentences[i+1];
			return sentence;
		})
		// return a Section object, with its methods
		return new Section(sentences);
	}

	return main;
})()

// console.log( pos('Geroge Clooney walked, quietly into a bank. It was cold.') )
// console.log( pos('it is a three-hundred and one').tags() )
// console.log( pos('funny funny funny funny').sentences[0].tokens )
// pos('In March 2009, while Secretary of State for Energy and Climate Change, Miliband attended the UK premiere of climate-change film The Age of Stupid, where he was ambushed').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '	'+t.text)})
// pos('the Energy and Climate Change, Miliband').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '	'+t.text)})
// console.log(pos('Energy and Climate Change, Miliband').sentences[0].tokens)
// console.log(pos('http://google.com').sentences[0].tokens)
// console.log(pos('may live').tags())
// console.log(pos('may 7th live').tags())
// console.log(pos('She and Marc Emery married on July 23, 2006.').tags())
// console.log(pos('Toronto is fun. Spencer and heather quickly walked. it was cool').sentences[0].referables())
// console.log(pos('a hundred').sentences[0].tokens)
// console.log(pos('Tony Reagan skates').sentences[0].tokens)
// console.log(pos('She and Marc Emery married on July 23, 2006').sentences[0].tokens)
// console.log(pos('Tony Hawk walked quickly to the store.').sentences[0].tokens)
// console.log(pos('jahn j. jacobheimer').sentences[0].tokens[0].analysis.is_person())
// pos('Dr. Conrad Murray recieved a guilty verdict').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '	'+t.text)})
// pos('the Phantom of the Opera').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '	'+t.text)})
// pos('Tony Hawk is nice').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '	'+t.text)})
// pos('tony hawk is nice').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '	'+t.text)})
// console.log(pos('look after a kid').sentences[0].tags())
// pos('Sather tried to stop the deal, but when he found out that Gretzky').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '	'+t.text+'	'+t.pos_reason)})
// pos('Gretzky had tried skating').sentences[0].tokens.map(function(t){console.log(t.pos.tag + '	'+t.text+'	'+t.pos_reason)})

// console.log(pos('i think Tony Danza is cool. He rocks and he is golden.').sentences[0].tokens[2].analysis.referenced_by())
// console.log(pos('i think Tony Danza is cool and he is golden.').sentences[0].tokens[6].analysis.reference_to())
// console.log(pos('Tina grabbed her shoes. She is lovely.').sentences[0].tokens[0].analysis.referenced_by())
// console.log(pos('Tina grabbed her shoes. She is lovely.').sentences[0].tokens[0].analysis.referenced_by())

// console.log(pos("it's gotten the best features").sentences[0].tokens[1].normalised=="has") //bug

// console.log(pos("he's fun").sentences[0].tokens[1].normalised=="is")
// console.log(pos("she's walking").sentences[0].tokens[1].normalised=="is")
// console.log(pos("he's walked").sentences[0].tokens[1].normalised=="has")
// console.log(pos("it's got the best features").sentences[0].tokens[1].normalised=="has")
// console.log(pos("it's achieved each goal").sentences[0].tokens[1].normalised=="has")
// console.log(pos("where's waldo").sentences[0].tokens[1].normalised=="is")

// console.log(pos("where's he going?").sentences[0].tokens[1].normalised=="is")
// console.log(pos("where's the pencil?").sentences[0].tokens[1].normalised=="is")
// console.log(pos("where's he disappeared to?").sentences[0].tokens[1].normalised=="has")
// console.log(pos("where's the pencil disappeared to?").sentences[0].tokens[1].normalised=="has")

//just a wrapper for text -> entities
//most of this logic is in ./parents/noun
var spot = (function() {

  var main = function(text, options) {
    options = options || {};
    //collect 'entities' from all nouns
    var sentences = pos(text, options).sentences;
    var arr = sentences.reduce(function(arr, s) {
      return arr.concat(s.entities(options));
    }, []);
    //for people, remove instances of 'george', and 'bush' after 'george bush'.
    var ignore = {};
    arr = arr.filter(function(o){
      //add tokens to blacklist
      if(o.analysis.is_person()){
        o.normalised.split(' ').forEach(function(s){
          ignore[s]=true;
        })
      }
      if(ignore[o.normalised]){
        return false;
      }
      return true;
    })

    return arr;
  }

  return main;
})()

// console.log(spot("Tony Hawk is cool. Tony eats all day.").map(function(s){return s}))
// console.log(spot("Tony eats all day. Tony Hawk is cool.").map(function(s){return s}))
// console.log(spot("My Hawk is cool").map(function(s){return s.normalised}))

// nlp_comprimise by @spencermountain  in 2014
// most files are self-contained modules that optionally export for nodejs
// this file loads them all together
// if we're server-side, grab files, otherwise assume they're prepended already
// console.time('nlp_boot')


// api
var nlp = {
  noun: parents.noun,
  adjective: parents.adjective,
  verb: parents.verb,
  adverb: parents.adverb,
  value: parents.value,

  sentences: sentence_parser,
  ngram: ngram,
  tokenize: tokenize,
  americanize: americanize,
  britishize: britishize,
  syllables: syllables,
  normalize: normalize.normalize,
  denormalize: normalize.denormalize,
  pos: pos,
  spot: spot
}

// console.timeEnd('nlp_boot')
// console.log( nlp.pos('she sells seashells by the seashore').sentences[0].negate().text() )
// console.log( nlp.pos('i will slouch'));
// console.log( nlp.pos('Sally Davidson sells seashells by the seashore. Joe Biden said so.').people() )

return nlp;
})()