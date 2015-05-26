// nlp_comprimise by @spencermountain  in 2014

/* *********************************************************************************************************
//	The main dictionary to build various language (or context) specific lexica -
//  part 3 : Regex rules for each part of speech that convert it to all other parts of speech.
********************************************************************************************************* */

// see ./build.js for generating the lexica

var main = {	
	//: word_rules
	// 'parts of speech' regex patterns
	// 0: regex string, 1: pos type
	wordRules: {
		JJ: [
			'.[cts]hy$',
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
			'[ea]{2}zy$'
		],
		VB: [
			'.[lnr]ize$',
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
			".'n$",
			".'t$",
			'.tches$',
			'.ize$',
			'.[^aeiou]ise$',
			'.[aeiou]te$'
		],
		JJS: [
			'.[di]est$'
		],
		VBZ: [
			'.[rln]ates$'
		],
		RB: [
			'[rdntkdhs]ly$',
			'.wards$',
			'.where$',
			'.fore$',
			'.less$',
			'. so$',
			'.fully$'
		],
		JJR: [
			'.[ilk]er$'
		],
		NN: [
			'.rol$',
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
			'.[lstrn]us$'
		],
		CD: [
			'.teen(th)?$',
			'.tieth$',
			'^-?[0-9]+(.[0-9]+)?$',
			'^https?:?//[a-z0-9]',
			'^www.[a-z0-9]'
		],
		MD: [
			'.*ould$',
			".'ll$"
		],
		NNO: [
			"[a-z]'s$"
		],
		CP: [
			".'re$"
		]
	},
	
	// regex rules for verb conjugation
	// used in combination with the generic 'fallback' method
	verbRules: {
		infinitive: [
			{
				regex: '(eed)$',
				present: '$1s',
				gerund: '$1ing',
				past: '$1ed',
				doer: '$1er'
			},
			{
				regex: '(e)(ep)$',
				present: '$1$2s',
				gerund: '$1$2ing',
				past: '$1pt',
				doer: '$1$2er'
			},
			{
				regex: '(a[tg]|i[zn]|ur|nc|gl|is)e$',
				present: '$1es',
				gerund: '$1ing',
				past: '$1ed'
			},
			{
				regex: '([i|f|rr])y$',
				present: '$1ies',
				gerund: '$1ying',
				past: '$1ied'
			},
			{
				regex: '([td]er)$',
				present: '$1s',
				gerund: '$1ing',
				past: '$1ed'
			},
			{
				regex: '([bd]l)e$',
				present: '$1es',
				gerund: '$1ing',
				past: '$1ed'
			},
			{
				regex: '(ish|tch|ess)$',
				present: '$1es',
				gerund: '$1ing',
				past: '$1ed'
			},
			{
				regex: '(ion|end|e[nc]t)$',
				present: '$1s',
				gerund: '$1ing',
				past: '$1ed'
			},
			{
				regex: '(om)e$',
				present: '$1es',
				gerund: '$1ing',
				past: 'ame'
			},
			{
				regex: '([aeiu])([pt])$',
				present: '$1$2s',
				gerund: '$1$2$2ing',
				past: '$1$2'
			},
			{
				regex: '(er)$',
				present: '$1s',
				gerund: '$1ing',
				past: '$1ed'
			},
			{
				regex: '(en)$',
				present: '$1s',
				gerund: '$1ing',
				past: '$1ed'
			}
		],
		//:
		present: [
			{
				regex: '(ies)$',
				infinitive: 'y',
				gerund: 'ying',
				past: 'ied'
			},
			{
				regex: '(tch|sh)es$',
				infinitive: '$1',
				gerund: '$1ing',
				past: '$1ed'
			},
			{
				regex: '(ss)es$',
				infinitive: '$1',
				gerund: '$1ing',
				past: '$1ed'
			},
			{
				regex: '([tzlshicgrvdnkmu])es$',
				infinitive: '$1e',
				gerund: '$1ing',
				past: '$1ed'
			},
			{
				regex: '(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$',
				infinitive: '$1',
				gerund: '$1ing',
				past: '$1ed'
			},
			{
				regex: '(ow)s$',
				infinitive: '$1',
				gerund: '$1ing',
				past: 'ew'
			},
			{
				regex: '(op)s$',
				infinitive: '$1',
				gerund: '$1ping',
				past: '$1ped'
			},
			{
				regex: '([eirs])ts$',
				infinitive: '$1t',
				gerund: '$1tting',
				past: '$1tted'
			},
			{
				regex: '(ll)s$',
				infinitive: '$1',
				gerund: '$1ing',
				past: '$1ed'
			},
			{
				regex: '(el)s$',
				infinitive: '$1',
				gerund: '$1ling',
				past: '$1led'
			},
			{
				regex: '(ip)es$',
				infinitive: '$1e',
				gerund: '$1ing',
				past: '$1ed'
			},
			{
				regex: 'ss$',
				infinitive: 'ss',
				gerund: 'ssing',
				past: 'ssed'
			},
			{
				regex: 's$',
				infinitive: '',
				gerund: 'ing',
				past: 'ed'
			}
		],
		//:
		gerund: [
			{
				regex: 'pping$',
				infinitive: 'p',
				present: 'ps',
				past: 'pped'
			},
			{
				regex: 'lling$',
				infinitive: 'll',
				present: 'lls',
				past: 'lled'
			},
			{
				regex: 'tting$',
				infinitive: 't',
				present: 'ts',
				past: 't'
			},
			{
				regex: 'ssing$',
				infinitive: 'ss',
				present: 'sses',
				past: 'ssed'
			},
			{
				regex: 'gging$',
				infinitive: 'g',
				present: 'gs',
				past: 'gged'
			},
			{
				regex: '([^aeiou])ying$',
				infinitive: '$1y',
				present: '$1ies',
				past: '$1ied',
				doer: '$1ier'
			},
			{
				regex: '(i.)ing$',
				infinitive: '$1e',
				present: '$1es',
				past: '$1ed'
			},
			{
				regex: '(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$',
				infinitive: '$1e',
				present: '$1es',
				past: '$1ed'
			},
			{
				regex: '(ch|sh)ing$',
				infinitive: '$1',
				present: '$1es',
				past: '$1ed'
			},
			{
				regex: '(..)ing$',
				infinitive: '$1',
				present: '$1s',
				past: '$1ed'
			}
		],
		//: 
		past: [
			{
				regex: '(ued)$',
				present: 'ues',
				gerund: 'uing',
				past: 'ued',
				doer: 'uer'
			},
			{
				regex: '(e|i)lled$',
				present: '$1lls',
				gerund: '$1lling',
				past: '$1lled',
				doer: '$1ller'
			},
			{
				regex: '(sh|ch)ed$',
				infinitive: '$1',
				present: '$1es',
				gerund: '$1ing',
				doer: '$1er'
			},
			{
				regex: '(tl|gl)ed$',
				infinitive: '$1e',
				present: '$1es',
				gerund: '$1ing',
				doer: '$1er'
			},
			{
				regex: '(ss)ed$',
				infinitive: '$1',
				present: '$1es',
				gerund: '$1ing',
				doer: '$1er'
			},
			{
				regex: 'pped$',
				infinitive: 'p',
				present: 'ps',
				gerund: 'pping',
				doer: 'pper'
			},
			{
				regex: 'tted$',
				infinitive: 't',
				present: 'ts',
				gerund: 'tting',
				doer: 'tter'
			},
			{
				regex: 'gged$',
				infinitive: 'g',
				present: 'gs',
				gerund: 'gging',
				doer: 'gger'
			},
			{
				regex: '(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$',
				infinitive: '$1',
				present: '$1s',
				gerund: '$1ing',
				doer: '$1er'
			},
			{
				regex: '(..[^aeiou])ed$',
				infinitive: '$1e',
				present: '$1es',
				gerund: '$1ing',
				doer: '$1er'
			},
			{
				regex: 'ied$',
				infinitive: 'y',
				present: 'ies',
				gerund: 'ying',
				doer: 'ier'
			},
			{
				regex: '(.o)ed$',
				infinitive: '$1o',
				present: '$1os',
				gerund: '$1oing',
				doer: '$1oer'
			},
			{
				regex: '(.i)ed$',
				infinitive: '$1',
				present: '$1s',
				gerund: '$1ing',
				doer: '$1er'
			},
			{
				regex: '([rl])ew$',
				infinitive: '$1ow',
				present: '$1ows',
				gerund: '$1owing'
			},
			{
				regex: '([pl])t$',
				infinitive: '$1t',
				present: '$1ts',
				gerund: '$1ting'
			}
		]
	},
	
	//: unambigous suffixes
	unambiguousSuffixes: {
		en: {
			NN: [
				'ceae', 'inae', 'idae', 'leaf', 'rgan', 'eman', 'sman', 'star', 'boat', 'tube', 'rica', 'tica', 'nica', 'auce', 'tics', 'ency', 'ancy', 'poda', 'tude', 'xide', 'body', 'weed', 'tree', 'rrel', 'stem', 'cher', 'icer', 'erer', 'ader', 'ncer', 'izer', 'ayer', 'nner', 'ates', 'ales', 'ides', 'rmes', 'etes', 'llet', 'uage', 'ings', 'aphy', 'chid', 'tein', 'vein', 'hair', 'tris', 'unit', 'cake', 'nake', 'illa', 'ella', 'icle', 'ille', 'etle', 'scle', 'cell', 'bell', 'bill', 'palm', 'toma', 'game', 'lamp', 'bone', 'mann', 'ment', 'wood', 'book', 'nson', 'agon', 'odon', 'dron', 'iron', 'tion', 'itor', 'ator', 'root', 'cope', 'tera', 'hora', 'lora', 'bird', 'worm', 'fern', 'horn', 'wort', 'ourt', 'stry', 'etry', 'bush', 'ness', 'gist', 'rata', 'lata', 'tata', 'moth', 'lity', 'nity', 'sity', 'rity', 'city', 'dity', 'vity', 'drug', 'dium', 'llum', 'trum', 'inum', 'lium', 'tium', 'atum', 'rium', 'icum', 'anum', 'nium', 'orum', 'icus', 'opus', 'chus', 'ngus', 'thus', 'rius', 'rpus'
			],
			JJ: [
				'liac', 'siac', 'clad', 'deaf', 'xial', 'hial', 'chal', 'rpal', 'asal', 'rial', 'teal', 'oeal', 'vial', 'phal', 'sial', 'heal', 'rbal', 'neal', 'geal', 'dial', 'eval', 'bial', 'ugal', 'kian', 'izan', 'rtan', 'odan', 'llan', 'zian', 'eian', 'eyan', 'ndan', 'eban', 'near', 'unar', 'lear', 'liar', '-day', '-way', 'tech', 'sick', 'tuck', 'inct', 'unct', 'wide', 'endo', 'uddy', 'eedy', 'uted', 'aled', 'rred', 'oned', 'rted', 'obed', 'oped', 'ched', 'dded', 'cted', 'tied', 'eked', 'ayed', 'rked', 'teed', 'mmed', 'tred', 'awed', 'rbed', 'bbed', 'axed', 'bred', 'pied', 'cked', 'rced', 'ened', 'fied', 'lved', 'mned', 'kled', 'hted', 'lied', 'eted', 'rded', 'lued', 'rved', 'azed', 'oked', 'ghed', 'sked', 'emed', 'aded', 'ived', 'mbed', 'pted', 'zled', 'ored', 'pled', 'wned', 'afed', 'nied', 'aked', 'gued', 'oded', 'oved', 'oled', 'ymed', 'lled', 'bled', 'cled', 'eded', 'toed', 'ited', 'oyed', 'eyed', 'ured', 'omed', 'ixed', 'pped', 'ined', 'lted', 'iced', 'exed', 'nded', 'amed', 'owed', 'dged', 'nted', 'eged', 'nned', 'used', 'ibed', 'nced', 'umed', 'dled', 'died', 'rged', 'aped', 'oted', 'uled', 'ided', 'nked', 'aved', 'rled', 'rned', 'aned', 'rmed', 'lmed', 'aged', 'ized', 'eved', 'ofed', 'thed', 'ered', 'ared', 'ated', 'eled', 'sted', 'ewed', 'nsed', 'nged', 'lded', 'gged', 'osed', 'fled', 'shed', 'aced', 'ffed', 'tted', 'uced', 'iled', 'uded', 'ired', 'yzed', '-fed', 'mped', 'iked', 'fted', 'imed', 'hree', 'llel', 'aten', 'lden', 'nken', 'apen', 'ozen', 'ober', '-set', 'nvex', 'osey', 'laid', 'paid', 'xvii', 'xxii', '-air', 'tair', 'icit', 'knit', 'nlit', 'xxiv', '-six', '-old', 'held', 'cile', 'ible', 'able', 'gile', 'full', '-ply', 'bbly', 'ggly', 'zzly', '-one', 'mane', 'mune', 'rung', 'uing', 'mant', 'yant', 'uant', 'pant', 'urnt', 'awny', 'eeny', 'ainy', 'orny', 'siny', 'tood', 'shod', '-toe', 'd-on', '-top', '-for', 'odox', 'wept', 'eepy', 'oopy', 'hird', 'dern', 'worn', 'mart', 'ltry', 'oury', 'ngry', 'arse', 'bose', 'cose', 'mose', 'iose', 'gish', 'kish', 'pish', 'wish', 'vish', 'yish', 'owsy', 'ensy', 'easy', 'ifth', 'edth', 'urth', 'ixth', '00th', 'ghth', 'ilty', 'orty', 'ifty', 'inty', 'ghty', 'kety', 'afty', 'irty', 'roud', 'true', 'wful', 'dful', 'rful', 'mful', 'gful', 'lful', 'hful', 'kful', 'iful', 'yful', 'sful', 'tive', 'cave', 'sive', 'five', 'cive', 'xxvi', 'urvy', 'nown', 'hewn', 'lown', '-two', 'lowy', 'ctyl'
			],
			VB: [
				'wrap', 'hear', 'draw', 'rlay', 'away', 'elay', 'duce', 'esce', 'elch', 'ooch', 'pick', 'huck', 'back', 'hack', 'ruct', 'lict', 'nect', 'vict', 'eact', 'tect', 'vade', 'lude', 'vide', 'rude', 'cede', 'ceed', 'ivel', 'hten', 'rken', 'shen', 'open', 'quer', 'over', 'efer', 'eset', 'uiet', 'pret', 'ulge', 'lign', 'pugn', 'othe', 'rbid', 'raid', 'veil', 'vail', 'roil', 'join', 'dain', 'feit', 'mmit', 'erit', 'voke', 'make', 'weld', 'uild', 'idle', 'rgle', 'otle', 'rble', 'self', 'fill', 'till', 'eels', 'sult', 'pply', 'sume', 'dime', 'lame', 'lump', 'rump', 'vene', 'cook', 'look', 'from', 'elop', 'grow', 'adow', 'ploy', 'sorb', 'pare', 'uire', 'jure', 'lore', 'surf', 'narl', 'earn', 'ourn', 'hirr', 'tort', '-fry', 'uise', 'lyse', 'sise', 'hise', 'tise', 'nise', 'lise', 'rise', 'anse', 'gise', 'owse', 'oosh', 'resh', 'cuss', 'uess', 'sess', 'vest', 'inst', 'gest', 'fest', 'xist', 'into', 'ccur', 'ieve', 'eive', 'olve', 'down', '-dye', 'laze', 'lyze', 'raze', 'ooze'
			],
			RB: [
				'that', 'oubt', 'much', 'diem', 'high', 'atim', 'sely', 'nely', 'ibly', 'lely', 'dely', 'ally', 'gely', 'imly', 'tely', 'ully', 'ably', 'owly', 'vely', 'cely', 'mely', 'mply', 'ngly', 'exly', 'ffly', 'rmly', 'rely', 'uely', 'time', 'iori', 'oors', 'wise', 'orst', 'east', 'ways'
			]
		}
		// end unambiguousSuffixes.en
  },
	
	verbSuffixes: {
		en: {
			// generated from test data
			gerund: [
				'ing'
			],
			infinitive: [
				'ate', 'ize', 'tion', 'rify', 'ress',
				'ify', 'age', 'nce', 'ect', 'ise',
				'ine', 'ish', 'ace', 'ash', 'ure',
				'tch', 'end', 'ack', 'and', 'ute',
				'ade', 'ock', 'ite', 'ase', 'ose',
				'use', 'ive', 'int', 'nge', 'lay',
				'est', 'ain', 'ant', 'eed', 'er', 'le'
			],
			past: [
				'ed', 'lt', 'nt', 'pt', 'ew', 'ld'
			],
			present: [
				'rks', 'cks', 'nks', 'ngs', 'mps',
				'tes', 'zes', 'ers', 'les', 'acks',
				'ends', 'ands', 'ocks', 'lays', 'eads',
				'lls', 'els', 'ils', 'ows', 'nds',
				'ays', 'ams', 'ars', 'ops', 'ffs',
				'als', 'urs', 'lds', 'ews', 'ips',
				'es', 'ts', 'ns', 's'
			]
		}
	},
	
	//: normalization and denormalization
	normalizations: [
		['²', '2'], ['ƻ', '2'], ['³', '3'], ['Ʒ', '3'], ['Ƹ', '3'], ['ƹ', '3'], ['ƺ', '3'], ['Ǯ', '3'], ['ǯ', '3'], ['З', '3'], ['Ҙ', '3'], ['ҙ', '3'], ['Ӟ', '3'], ['ӟ', '3'], ['Ӡ', '3'], ['ӡ', '3'], ['Ȝ', '3'], ['ȝ', '3'], ['Ƽ', '5'], ['ƽ', '5'], ['Ȣ', '8'], ['ȣ', '8'], ['¡', '!'], ['¿', '?'], ['Ɂ', '?'], ['ɂ', '?'], ['ª', 'a'], ['À', 'a'], ['Á', 'a'], ['Â', 'a'], ['Ã', 'a'], ['Ä', 'a'], ['Å', 'a'], ['à', 'a'], ['á', 'a'], ['â', 'a'], ['ã', 'a'], ['ä', 'a'], ['å', 'a'], ['Ā', 'a'], ['ā', 'a'], ['Ă', 'a'], ['ă', 'a'], ['Ą', 'a'], ['ą', 'a'], ['Ǎ', 'a'], ['ǎ', 'a'], ['Ǟ', 'a'], ['ǟ', 'a'], ['Ǡ', 'a'], ['ǡ', 'a'], ['Ǻ', 'a'], ['ǻ', 'a'], ['Ȁ', 'a'], ['ȁ', 'a'], ['Ȃ', 'a'], ['ȃ', 'a'], ['Ȧ', 'a'], ['ȧ', 'a'], ['Ⱥ', 'a'], ['Ά', 'a'], ['Α', 'a'], ['Δ', 'a'], ['Λ', 'a'], ['ά', 'a'], ['α', 'a'], ['λ', 'a'], ['А', 'a'], ['Д', 'a'], ['а', 'a'], ['д', 'a'], ['Ѧ', 'a'], ['ѧ', 'a'], ['Ӑ', 'a'], ['ӑ', 'a'], ['Ӓ', 'a'], ['ӓ', 'a'], ['ƛ', 'a'], ['Ʌ', 'a'], ['ß', 'b'], ['þ', 'b'], ['ƀ', 'b'], ['Ɓ', 'b'], ['Ƃ', 'b'], ['ƃ', 'b'], ['Ƅ', 'b'], ['ƅ', 'b'], ['Ƀ', 'b'], ['Β', 'b'], ['β', 'b'], ['ϐ', 'b'], ['Ϧ', 'b'], ['Б', 'b'], ['В', 'b'], ['Ъ', 'b'], ['Ь', 'b'], ['б', 'b'], ['в', 'b'], ['ъ', 'b'], ['ь', 'b'], ['Ѣ', 'b'], ['ѣ', 'b'], ['Ҍ', 'b'], ['ҍ', 'b'], ['Ҕ', 'b'], ['ҕ', 'b'], ['ƥ', 'b'], ['ƾ', 'b'], ['¢', 'c'], ['©', 'c'], ['Ç', 'c'], ['ç', 'c'], ['Ć', 'c'], ['ć', 'c'], ['Ĉ', 'c'], ['ĉ', 'c'], ['Ċ', 'c'], ['ċ', 'c'], ['Č', 'c'], ['č', 'c'], ['Ɔ', 'c'], ['Ƈ', 'c'], ['ƈ', 'c'], ['Ȼ', 'c'], ['ȼ', 'c'], ['ͻ', 'c'], ['ͼ', 'c'], ['ͽ', 'c'], ['ϲ', 'c'], ['Ϲ', 'c'], ['Ͻ', 'c'], ['Ͼ', 'c'], ['Ͽ', 'c'], ['Є', 'c'], ['С', 'c'], ['с', 'c'], ['є', 'c'], ['Ҁ', 'c'], ['ҁ', 'c'], ['Ҫ', 'c'], ['ҫ', 'c'], ['Ð', 'd'], ['Ď', 'd'], ['ď', 'd'], ['Đ', 'd'], ['đ', 'd'], ['Ɖ', 'd'], ['Ɗ', 'd'], ['ȡ', 'd'], ['Ƌ', 'd'], ['ƌ', 'd'], ['Ƿ', 'd'], ['È', 'e'], ['É', 'e'], ['Ê', 'e'], ['Ë', 'e'], ['è', 'e'], ['é', 'e'], ['ê', 'e'], ['ë', 'e'], ['Ē', 'e'], ['ē', 'e'], ['Ĕ', 'e'], ['ĕ', 'e'], ['Ė', 'e'], ['ė', 'e'], ['Ę', 'e'], ['ę', 'e'], ['Ě', 'e'], ['ě', 'e'], ['Ǝ', 'e'], ['Ə', 'e'], ['Ɛ', 'e'], ['ǝ', 'e'], ['Ȅ', 'e'], ['ȅ', 'e'], ['Ȇ', 'e'], ['ȇ', 'e'], ['Ȩ', 'e'], ['ȩ', 'e'], ['Ɇ', 'e'], ['ɇ', 'e'], ['Έ', 'e'], ['Ε', 'e'], ['Ξ', 'e'], ['Σ', 'e'], ['έ', 'e'], ['ε', 'e'], ['ξ', 'e'], ['ϱ', 'e'], ['ϵ', 'e'], ['϶', 'e'], ['Ѐ', 'e'], ['Ё', 'e'], ['Е', 'e'], ['Э', 'e'], ['е', 'e'], ['ѐ', 'e'], ['ё', 'e'], ['Ҽ', 'e'], ['ҽ', 'e'], ['Ҿ', 'e'], ['ҿ', 'e'], ['Ӗ', 'e'], ['ӗ', 'e'], ['Ә', 'e'], ['ә', 'e'], ['Ӛ', 'e'], ['ӛ', 'e'], ['Ӭ', 'e'], ['ӭ', 'e'], ['Ƒ', 'f'], ['ƒ', 'f'], ['Ϝ', 'f'], ['ϝ', 'f'], ['Ӻ', 'f'], ['ӻ', 'f'], ['Ĝ', 'g'], ['ĝ', 'g'], ['Ğ', 'g'], ['ğ', 'g'], ['Ġ', 'g'], ['ġ', 'g'], ['Ģ', 'g'], ['ģ', 'g'], ['Ɠ', 'g'], ['Ǥ', 'g'], ['ǥ', 'g'], ['Ǧ', 'g'], ['ǧ', 'g'], ['Ǵ', 'g'], ['ǵ', 'g'], ['Ĥ', 'h'], ['ĥ', 'h'], ['Ħ', 'h'], ['ħ', 'h'], ['ƕ', 'h'], ['Ƕ', 'h'], ['Ȟ', 'h'], ['ȟ', 'h'], ['Ή', 'h'], ['Η', 'h'], ['Ђ', 'h'], ['Њ', 'h'], ['Ћ', 'h'], ['Н', 'h'], ['н', 'h'], ['ђ', 'h'], ['ћ', 'h'], ['Ң', 'h'], ['ң', 'h'], ['Ҥ', 'h'], ['ҥ', 'h'], ['Һ', 'h'], ['һ', 'h'], ['Ӊ', 'h'], ['ӊ', 'h'], ['Ì', 'I'], ['Í', 'I'], ['Î', 'I'], ['Ï', 'I'], ['ì', 'i'], ['í', 'i'], ['î', 'i'], ['ï', 'i'], ['Ĩ', 'i'], ['ĩ', 'i'], ['Ī', 'i'], ['ī', 'i'], ['Ĭ', 'i'], ['ĭ', 'i'], ['Į', 'i'], ['į', 'i'], ['İ', 'i'], ['ı', 'i'], ['Ɩ', 'i'], ['Ɨ', 'i'], ['Ȉ', 'i'], ['ȉ', 'i'], ['Ȋ', 'i'], ['ȋ', 'i'], ['Ί', 'i'], ['ΐ', 'i'], ['Ϊ', 'i'], ['ί', 'i'], ['ι', 'i'], ['ϊ', 'i'], ['І', 'i'], ['Ї', 'i'], ['і', 'i'], ['ї', 'i'], ['Ĵ', 'j'], ['ĵ', 'j'], ['ǰ', 'j'], ['ȷ', 'j'], ['Ɉ', 'j'], ['ɉ', 'j'], ['ϳ', 'j'], ['Ј', 'j'], ['ј', 'j'], ['Ķ', 'k'], ['ķ', 'k'], ['ĸ', 'k'], ['Ƙ', 'k'], ['ƙ', 'k'], ['Ǩ', 'k'], ['ǩ', 'k'], ['Κ', 'k'], ['κ', 'k'], ['Ќ', 'k'], ['Ж', 'k'], ['К', 'k'], ['ж', 'k'], ['к', 'k'], ['ќ', 'k'], ['Қ', 'k'], ['қ', 'k'], ['Ҝ', 'k'], ['ҝ', 'k'], ['Ҟ', 'k'], ['ҟ', 'k'], ['Ҡ', 'k'], ['ҡ', 'k'], ['Ĺ', 'l'], ['ĺ', 'l'], ['Ļ', 'l'], ['ļ', 'l'], ['Ľ', 'l'], ['ľ', 'l'], ['Ŀ', 'l'], ['ŀ', 'l'], ['Ł', 'l'], ['ł', 'l'], ['ƚ', 'l'], ['ƪ', 'l'], ['ǀ', 'l'], ['Ǐ', 'l'], ['ǐ', 'l'], ['ȴ', 'l'], ['Ƚ', 'l'], ['Ι', 'l'], ['Ӏ', 'l'], ['ӏ', 'l'], ['Μ', 'm'], ['Ϻ', 'm'], ['ϻ', 'm'], ['М', 'm'], ['м', 'm'], ['Ӎ', 'm'], ['ӎ', 'm'], ['Ñ', 'n'], ['ñ', 'n'], ['Ń', 'n'], ['ń', 'n'], ['Ņ', 'n'], ['ņ', 'n'], ['Ň', 'n'], ['ň', 'n'], ['ŉ', 'n'], ['Ŋ', 'n'], ['ŋ', 'n'], ['Ɲ', 'n'], ['ƞ', 'n'], ['Ǹ', 'n'], ['ǹ', 'n'], ['Ƞ', 'n'], ['ȵ', 'n'], ['Ν', 'n'], ['Π', 'n'], ['ή', 'n'], ['η', 'n'], ['Ϟ', 'n'], ['Ѝ', 'n'], ['И', 'n'], ['Й', 'n'], ['Л', 'n'], ['П', 'n'], ['и', 'n'], ['й', 'n'], ['л', 'n'], ['п', 'n'], ['ѝ', 'n'], ['Ҋ', 'n'], ['ҋ', 'n'], ['Ӆ', 'n'], ['ӆ', 'n'], ['Ӣ', 'n'], ['ӣ', 'n'], ['Ӥ', 'n'], ['ӥ', 'n'], ['π', 'n'], ['Ò', 'o'], ['Ó', 'o'], ['Ô', 'o'], ['Õ', 'o'], ['Ö', 'o'], ['Ø', 'o'], ['ð', 'o'], ['ò', 'o'], ['ó', 'o'], ['ô', 'o'], ['õ', 'o'], ['ö', 'o'], ['ø', 'o'], ['Ō', 'o'], ['ō', 'o'], ['Ŏ', 'o'], ['ŏ', 'o'], ['Ő', 'o'], ['ő', 'o'], ['Ɵ', 'o'], ['Ơ', 'o'], ['ơ', 'o'], ['Ǒ', 'o'], ['ǒ', 'o'], ['Ǫ', 'o'], ['ǫ', 'o'], ['Ǭ', 'o'], ['ǭ', 'o'], ['Ǿ', 'o'], ['ǿ', 'o'], ['Ȍ', 'o'], ['ȍ', 'o'], ['Ȏ', 'o'], ['ȏ', 'o'], ['Ȫ', 'o'], ['ȫ', 'o'], ['Ȭ', 'o'], ['ȭ', 'o'], ['Ȯ', 'o'], ['ȯ', 'o'], ['Ȱ', 'o'], ['ȱ', 'o'], ['Ό', 'o'], ['Θ', 'o'], ['Ο', 'o'], ['Φ', 'o'], ['Ω', 'o'], ['δ', 'o'], ['θ', 'o'], ['ο', 'o'], ['σ', 'o'], ['ό', 'o'], ['ϕ', 'o'], ['Ϙ', 'o'], ['ϙ', 'o'], ['Ϭ', 'o'], ['ϭ', 'o'], ['ϴ', 'o'], ['О', 'o'], ['Ф', 'o'], ['о', 'o'], ['Ѳ', 'o'], ['ѳ', 'o'], ['Ѻ', 'o'], ['ѻ', 'o'], ['Ѽ', 'o'], ['ѽ', 'o'], ['Ӧ', 'o'], ['ӧ', 'o'], ['Ө', 'o'], ['ө', 'o'], ['Ӫ', 'o'], ['ӫ', 'o'], ['¤', 'o'], ['ƍ', 'o'], ['Ώ', 'o'], ['Ƥ', 'p'], ['ƿ', 'p'], ['Ρ', 'p'], ['ρ', 'p'], ['Ϸ', 'p'], ['ϸ', 'p'], ['ϼ', 'p'], ['Р', 'p'], ['р', 'p'], ['Ҏ', 'p'], ['ҏ', 'p'], ['Þ', 'p'], ['Ɋ', 'q'], ['ɋ', 'q'], ['­®', 'r'], ['Ŕ', 'r'], ['ŕ', 'r'], ['Ŗ', 'r'], ['ŗ', 'r'], ['Ř', 'r'], ['ř', 'r'], ['Ʀ', 'r'], ['Ȑ', 'r'], ['ȑ', 'r'], ['Ȓ', 'r'], ['ȓ', 'r'], ['Ɍ', 'r'], ['ɍ', 'r'], ['Ѓ', 'r'], ['Г', 'r'], ['Я', 'r'], ['г', 'r'], ['я', 'r'], ['ѓ', 'r'], ['Ґ', 'r'], ['ґ', 'r'], ['Ғ', 'r'], ['ғ', 'r'], ['Ӷ', 'r'], ['ӷ', 'r'], ['ſ', 'r'], ['Ś', 's'], ['ś', 's'], ['Ŝ', 's'], ['ŝ', 's'], ['Ş', 's'], ['ş', 's'], ['Š', 's'], ['š', 's'], ['Ƨ', 's'], ['ƨ', 's'], ['Ș', 's'], ['ș', 's'], ['ȿ', 's'], ['ς', 's'], ['Ϛ', 's'], ['ϛ', 's'], ['ϟ', 's'], ['Ϩ', 's'], ['ϩ', 's'], ['Ѕ', 's'], ['ѕ', 's'], ['Ţ', 't'], ['ţ', 't'], ['Ť', 't'], ['ť', 't'], ['Ŧ', 't'], ['ŧ', 't'], ['ƫ', 't'], ['Ƭ', 't'], ['ƭ', 't'], ['Ʈ', 't'], ['Ț', 't'], ['ț', 't'], ['ȶ', 't'], ['Ⱦ', 't'], ['Γ', 't'], ['Τ', 't'], ['τ', 't'], ['Ϯ', 't'], ['ϯ', 't'], ['Т', 't'], ['т', 't'], ['҂', 't'], ['Ҭ', 't'], ['ҭ', 't'], ['µ', 'u'], ['Ù', 'u'], ['Ú', 'u'], ['Û', 'u'], ['Ü', 'u'], ['ù', 'u'], ['ú', 'u'], ['û', 'u'], ['ü', 'u'], ['Ũ', 'u'], ['ũ', 'u'], ['Ū', 'u'], ['ū', 'u'], ['Ŭ', 'u'], ['ŭ', 'u'], ['Ů', 'u'], ['ů', 'u'], ['Ű', 'u'], ['ű', 'u'], ['Ų', 'u'], ['ų', 'u'], ['Ư', 'u'], ['ư', 'u'], ['Ʊ', 'u'], ['Ʋ', 'u'], ['Ǔ', 'u'], ['ǔ', 'u'], ['Ǖ', 'u'], ['ǖ', 'u'], ['Ǘ', 'u'], ['ǘ', 'u'], ['Ǚ', 'u'], ['ǚ', 'u'], ['Ǜ', 'u'], ['ǜ', 'u'], ['Ȕ', 'u'], ['ȕ', 'u'], ['Ȗ', 'u'], ['ȗ', 'u'], ['Ʉ', 'u'], ['ΰ', 'u'], ['μ', 'u'], ['υ', 'u'], ['ϋ', 'u'], ['ύ', 'u'], ['ϑ', 'u'], ['Џ', 'u'], ['Ц', 'u'], ['Ч', 'u'], ['ц', 'u'], ['џ', 'u'], ['Ҵ', 'u'], ['ҵ', 'u'], ['Ҷ', 'u'], ['ҷ', 'u'], ['Ҹ', 'u'], ['ҹ', 'u'], ['Ӌ', 'u'], ['ӌ', 'u'], ['Ӈ', 'u'], ['ӈ', 'u'], ['Ɣ', 'v'], ['ν', 'v'], ['Ѵ', 'v'], ['ѵ', 'v'], ['Ѷ', 'v'], ['ѷ', 'v'], ['Ŵ', 'w'], ['ŵ', 'w'], ['Ɯ', 'w'], ['ω', 'w'], ['ώ', 'w'], ['ϖ', 'w'], ['Ϣ', 'w'], ['ϣ', 'w'], ['Ш', 'w'], ['Щ', 'w'], ['ш', 'w'], ['щ', 'w'], ['ѡ', 'w'], ['ѿ', 'w'], ['×', 'x'], ['Χ', 'x'], ['χ', 'x'], ['ϗ', 'x'], ['ϰ', 'x'], ['Х', 'x'], ['х', 'x'], ['Ҳ', 'x'], ['ҳ', 'x'], ['Ӽ', 'x'], ['ӽ', 'x'], ['Ӿ', 'x'], ['ӿ', 'x'], ['¥', 'y'], ['Ý', 'y'], ['ý', 'y'], ['ÿ', 'y'], ['Ŷ', 'y'], ['ŷ', 'y'], ['Ÿ', 'y'], ['Ƴ', 'y'], ['ƴ', 'y'], ['Ȳ', 'y'], ['ȳ', 'y'], ['Ɏ', 'y'], ['ɏ', 'y'], ['Ύ', 'y'], ['Υ', 'y'], ['Ψ', 'y'], ['Ϋ', 'y'], ['γ', 'y'], ['ψ', 'y'], ['ϒ', 'y'], ['ϓ', 'y'], ['ϔ', 'y'], ['Ў', 'y'], ['У', 'y'], ['у', 'y'], ['ч', 'y'], ['ў', 'y'], ['Ѱ', 'y'], ['ѱ', 'y'], ['Ү', 'y'], ['ү', 'y'], ['Ұ', 'y'], ['ұ', 'y'], ['Ӯ', 'y'], ['ӯ', 'y'], ['Ӱ', 'y'], ['ӱ', 'y'], ['Ӳ', 'y'], ['ӳ', 'y'], ['Ź', 'z'], ['ź', 'z'], ['Ż', 'z'], ['ż', 'z'], ['Ž', 'z'], ['ž', 'z'], ['Ʃ', 'z'], ['Ƶ', 'z'], ['ƶ', 'z'], ['Ȥ', 'z'], ['ȥ', 'z'], ['ɀ', 'z'], ['Ζ', 'z'], ['ζ', 'z']
	]
}
if (typeof module !== 'undefined' && module.exports) module.exports = main;
