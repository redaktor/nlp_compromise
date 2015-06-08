

//::NODE::
  var lang = 'en';
//::

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

//::NODE::
  if (typeof module !== "undefined" && module.exports) module.exports = main;
//::
