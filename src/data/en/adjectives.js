
var lang = 'en';
var adjectives = (function() {
  
if (typeof module !== "undefined" && module.exports) helpFns = require("./helpFns");
var zip = [ 's&le',
  'fem!e',
  'm!e',
  'speci!',
  'latt~',
  'mag#a',
  'mod~n',
  'degen~ate',
  'f~tile',
  'm%ium',
  'par!lel',
  'und~siz%',
  'us%',
  'fix%',
  'mix%',
  'sup~',
  'sup~b',
  'ov~we:',
  'c~tain',
  'inn~',
  'out~',
  'practic!',
  'theoretic!',
  'sporadic',
  'basic',
  'grammatic!',
  '!phabetic!',
  'economic!',
  'conic!',
  'politic!',
  'v~tic!',
  'critic!',
  'f_astic',
  'mystic!',
  'pornographic',
  'jol>',
  'coloni!',
  'moody',
  'lit~!',
  'actu!',
  'probable',
  'appar#',
  'usu!',
  'ab~r_',
  'ablaze',
  'absolute',
  'aboard',
  'abrupt',
  'abs#',
  'absorb&',
  'abund_',
  'accurate',
  'afraid',
  'agoniz&',
  '!oof',
  'amaz&',
  'arbitrary',
  'arrog_',
  'astonish&',
  'av~age',
  'aware',
  'awkward',
  'bankrupt',
  'bawdy',
  'benefici!',
  'b#',
  'bett~',
  'bizarre',
  'bloody',
  'bouncy',
  'brilli_',
  'broken',
  'bur>',
  'busy',
  'cagey',
  'careful',
  'car&',
  'chief',
  'chil>',
  'civil',
  'clev~',
  'clos%',
  'cloudy',
  'coloss!',
  'comm~ci!',
  'common',
  'complete',
  'conc~n%',
  'concrete',
  'congru#',
  'const_',
  'coo&',
  'correct',
  'coward>',
  'craven',
  'cudd>',
  'dai>',
  'damag%',
  'damag&',
  'dapp~',
  'dash&',
  'deadpan',
  'deep>',
  'defi_',
  'delicate',
  'del:ful',
  'desp~ate',
  'det~min%',
  'didactic',
  'discreet',
  'double',
  'doubtful',
  'downtown',
  'dreary',
  'east',
  'east~n',
  'eld~>',
  'eleg_',
  'elfin',
  'elite',
  'emin#',
  'encourag&',
  '#ire',
  '~ect',
  'eth~e!',
  'exact',
  'exp~t',
  'extra',
  'exub~_',
  'exult_',
  'f!se',
  'fancy',
  'faulty',
  'financi!',
  'first',
  'fit',
  'flagr_',
  'foamy',
  'foolish',
  'forego&',
  'form~',
  'fortunate',
  'fr_ic',
  'freez&',
  'frequ#',
  'fretful',
  'friend>',
  'fun',
  'furry',
  'future',
  'gainful',
  'gaudy',
  'gi_',
  'giddy',
  'gig_ic',
  'gleam&',
  'glob!',
  'gone',
  'goofy',
  'graceful',
  'grateful',
  'gratis',
  'groovy',
  'gross',
  'guard%',
  'h!f',
  'handy',
  'hang&',
  'hateful',
  'heady',
  'heaven>',
  'hellish',
  'helpful',
  'hesit_',
  'highf!utin',
  'home>',
  'honest',
  'huge',
  'humdrum',
  'hurri%',
  'hurt',
  'ignor_',
  'ill',
  'illeg!',
  'imm%iate',
  'immense',
  'immin#',
  'imparti!',
  'imp~fect',
  'import%',
  'initi!',
  'innate',
  'inside',
  'irate',
  'juicy',
  'junior',
  'juvenile',
  'kaput',
  'kind>',
  'know&',
  'labor%',
  'languid',
  'learn%',
  'left',
  'leg!',
  'leth!',
  'level',
  'lewd',
  'like>',
  'lit~ate',
  'live>',
  'liv&',
  'lone>',
  'long&',
  'loutish',
  'love>',
  'lov&',
  'low>',
  'luxuri_',
  '>&',
  'macabre',
  'mad>',
  'mag#a',
  'major',
  'makeshift',
  'mammoth',
  'marri%',
  'meas>',
  'meaty',
  'm~e',
  'middle',
  'miniature',
  'minor',
  'miscre_',
  'mobile',
  'moldy',
  'mute',
  'necessary',
  'neighbor>',
  'nimble',
  'nonch!_',
  'nondescript',
  'nonstop',
  'north',
  'nosy',
  'obeis_',
  'obese',
  'obscene',
  'obs~v_',
  'obsolete',
  'offbeat',
  'offici!',
  'ok',
  'open',
  'opposite',
  'organic',
  'outgo&',
  'ov!',
  'ov~',
  'ov~!l',
  'ov~t',
  'ov~wrought',
  'painful',
  'past',
  'peaceful',
  'p~fect',
  'petite',
  'picayune',
  'placid',
  'pl_',
  'pleas_',
  'polite',
  'pot#i!',
  'pregn_',
  'premium',
  'pres#',
  'pricey',
  'prick>',
  'primary',
  'prior',
  'private',
  'profuse',
  'prop~',
  'pump%',
  'puny',
  'quack',
  'quaint',
  'quickest',
  'rabid',
  'raci!',
  're!',
  'rebel',
  'recondite',
  'r%und_',
  'relev_',
  'remote',
  'resolute',
  'reson_',
  'r:',
  'r:ful',
  'ripe',
  'ritzy',
  'robust',
  'rom_ic',
  'roomy',
  'rotten',
  'rough',
  'roy!',
  's!ty',
  'scary',
  'sci#ific',
  'screech&',
  'second',
  'secure',
  's%ate',
  'seem>',
  'selfish',
  'senior',
  'separate',
  'sev~e',
  'shiny',
  'shock&',
  'shut',
  'shy',
  'sick',
  'signific_',
  'sil>',
  'sinc~e',
  'skinny',
  'sl:',
  'slimy',
  'smel>',
  'snobbish',
  'soci!',
  'somb~',
  'sordid',
  'sorry',
  'south~n',
  'spare',
  'specific',
  'spicy',
  'splendid',
  'squeamish',
  'standard',
  'stand&',
  'steadfast',
  'steady',
  'st~eotyp%',
  'still',
  'strip%',
  'stupid',
  'sturdy',
  'subdu%',
  'subsequ#',
  'subst_i!',
  'sudden',
  'sup~fici!',
  'supreme',
  'sure',
  'taboo',
  'tan',
  'tasteful',
  'tawdry',
  'tell&',
  'temporary',
  't~rific',
  'test%',
  'thoughtful',
  'tidy',
  'top',
  'torpid',
  'tranquil',
  'trite',
  'ug>',
  'ultra',
  'unbecom&',
  'und~stood',
  'uneven',
  'unfair',
  'unlike>',
  'unru>',
  'uns:>',
  'untidy',
  'unwritten',
  'upbeat',
  'upp~',
  'uppity',
  'upset',
  'upstairs',
  'upt:',
  'useful',
  'utt~',
  'utt~most',
  'vagabond',
  'vanilla',
  'various',
  'vengeful',
  'v~d_',
  'violet',
  'volatile',
  'w_&',
  'wary',
  'wasteful',
  'weary',
  'west~n',
  'wholes!e',
  'wide',
  'wiry',
  'wistful',
  'wooden',
  'woozy',
  'wound',
  'wry',
  'zany',
  'sacr%',
  'detail%',
  'ongo&',
  'promin#',
  'p~man#',
  'div~se',
  'parti!',
  'mod~ate',
  'contemporary',
  'intense',
  'widespread',
  'ultimate',
  'ide!',
  'adequate',
  'sophisticat%',
  'nak%',
  'domin_',
  'precise',
  'intact',
  'adv~se',
  'genuine',
  'subtle',
  'univ~s!',
  'resist_',
  'routine',
  'dist_',
  'unexpect%',
  'soviet',
  'blind',
  'artifici!',
  'mild',
  'legitimate',
  'unpublish%',
  'sup~ior',
  'int~m%iate',
  'ev~yday',
  'dumb',
  'excess',
  'sexy',
  'fake',
  'month>',
  'premature',
  'she~',
  'gen~ic',
  'insane',
  'contrary',
  'twin',
  'upcom&',
  'bottom',
  'cost>',
  'indirect',
  'sole',
  'unrelat%',
  'hispanic',
  'improp~',
  'und~ground',
  'legendary',
  'reluct_',
  'belov%',
  'inappropriate',
  'corrupt',
  'irrelev_',
  'justifi%',
  'obscure',
  'profound',
  'hostile',
  'influ#i!',
  'inadequate',
  'abstract',
  'time>',
  'auth#ic',
  'bold',
  'intimate',
  'stra:forward',
  'riv!',
  'r:-w&',
  'racist',
  'symbolic',
  'unprec%#%',
  'loy!',
  't!#%',
  'troubl%',
  'noble',
  'inst_',
  'incorrect',
  'dense',
  'blond',
  'delib~ate',
  'blank',
  'rear',
  'feminine',
  'apt',
  'stark',
  '!coholic',
  'teenage',
  'vibr_',
  'humble',
  'vain',
  'cov~t',
  'bland',
  'trendy',
  'foul',
  'populist',
  '!arm&',
  'hook%',
  'wick%',
  'deaf',
  'left-w&',
  'lousy',
  'm!ign_',
  'stylish',
  'upsc!e',
  'hour>',
  'refresh&',
  'cozy',
  'slick',
  'dire',
  'year>',
  'inbr%',
  'part-time',
  'finite',
  'backwards',
  'n:>',
  'unauthoriz%',
  'cheesy',
  'indoor',
  'surre!',
  'b!d',
  'masculine',
  'shady',
  'spirit%',
  'e~ie',
  'horrific',
  'smug',
  'st~n',
  'hefty',
  'savvy',
  'bogus',
  'elaborate',
  'gloomy',
  'pristine',
  'extravag_',
  's~ene',
  'advanc%',
  'p~v~se',
  'devout',
  'crisp',
  'rosy',
  'slend~',
  'melancho>',
  'faux',
  'phony',
  'danish',
  'lofty',
  'nuanc%',
  'lax',
  'adept',
  'barren',
  'shameful',
  'sleek',
  'solemn',
  'vac_',
  'dishonest',
  'brisk',
  'flu#',
  'insecure',
  'humid',
  'menac&',
  'moot',
  'sooth&',
  'self-loath&',
  'far-reach&',
  'harrow&',
  'scath&',
  'p~plex&',
  'c!m&',
  'unconvinc&',
  'unsuspect&',
  'unassum&',
  'surpris&',
  'unappe!&',
  'vex&',
  'unend&',
  'easygo&',
  'appetiz&',
  'disgruntl%',
  'retard%',
  'undecid%',
  'unregulat%',
  'unsup~vis%',
  'unrecogniz%',
  'craz%',
  'distress%',
  'jagg%',
  'par!lel%',
  'cramp%',
  'warp%',
  '_iquat%',
  'fabl%',
  'd~ang%',
  'diseas%',
  'ragg%',
  'intoxicat%',
  'h!low%',
  'crowd%',
  'ghast>',
  'disord~>',
  'saint>',
  'wi>',
  's>',
  'spr:>',
  'ghost>',
  'oi>',
  'hil>',
  'gris>',
  'earth>',
  'friend>',
  'unwieldy',
  'oth~',
  'many',
  'last',
  'expect%',
  'due',
  'less',
  'divine',
  '!l',
  'togeth~',
  'on>',
  'outside',
  'multiple',
  'appropriate',
  'approximate',
  'evil',
  'favorite',
  'limit%',
  'random',
  'republican',
  'okay',
  'ess#i!',
  'secondary',
  'south',
  'pro',
  'north~n',
  'urban',
  'acute',
  'prime',
  'arab',
  'ov~n:',
  'cruci!',
  'beyond',
  'against',
  'und~',
  'definite',
  'effective',
  'especi!',
  'hopeful',
  'obvious',
  'particular',
  'possible',
  'relative',
  's~ious',
  'typic!',
  'virtu!' ]; 

  var main = (function () {
				return zip.map(function(w) { return helpFns.repl(w, [':', '&', '_', '#', '~', '!', '%', '>'], ['ight', 'ing', 'ant', 'ent', 'er', 'al', 'ed', 'ly']); });
			})();

  if (typeof module !== "undefined" && module.exports) module.exports = main;

  return main;
})();