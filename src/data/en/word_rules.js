/* regex rules for verb conjugation
used in combination with the generic "fallback" method */

/* approximate visual (not semantic) relationship between unicode and ascii characters */

// var types = ['adjective', 'adverb', 'comparative', 'superlative', 'noun'];
// 0 means 'return null' for adverbs OR 'conjugate without more/most' for comparative and superlative.
// 1 means 'default behavior'

// types: infinitive, gerund, past, present, doer, future

/* singular nouns having irregular plurals */

if (!lang) {var lang = 'en';}

var helpFns = require("./helpFns");
exports.zip = { JJ: 
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
  CP: [ '.\'re$' ] }
module.exports = (function () {
				var a = [];
				for (var k in exports.zip) {
					exports.zip[k].forEach(function(r){
						a.push({
							reg: new RegExp(r, 'i'),
							pos: k
						});
					});
				}
				return a;
			})()
