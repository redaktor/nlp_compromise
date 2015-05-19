
var lang = 'en';
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

  if (typeof module !== "undefined" && module.exports) module.exports = main;

  return main;
})();