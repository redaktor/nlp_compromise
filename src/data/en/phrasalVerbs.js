/* approximate visual (not semantic) relationship between unicode and ascii characters */

// var types = ['adjective', 'adverb', 'comparative', 'superlative', 'noun'];
// 0 means 'return null' for adverbs OR 'conjugate without more/most' for comparative and superlative.
// 1 means 'default behavior'

// types: infinitive, gerund, past, present, doer, future

/* singular nouns having irregular plurals */

if (!lang) {var lang = 'en';}

var helpFns = require("./helpFns");
exports.zip = { verbs: 'fire,barge,bash,book,box,butt,cash,fence,opt,rain,wean,wheel,carve,hand,jack,log,peel,sign,type,warm,power,snap,square,wind,back,bottle,buckle,bundle,clean,flag,man,pin,pipe,plump,scrape,slow,fool,gad,root,boss,horse,joke,mess,back,frighten,tick,zip,bog,calm,hunker,jot,narrow,pat,tone,trickle,fend,gun,hanker,cave,chip,hone,key,pencil,rein,shade,tuck,usher,zero,auction,blast,buzz,cool,goof,level,mouth,nod,pair,reel,rip,round,slice,split,stave,storm,tee,tip,top,bank,bargain,egg,frown,latch,prattle,spur,tack,yammer,bail,black,blank,blurt,branch,cancel,edge,farm,fish,fizzle,flake,flame,flare,flesh,flip,geek,iron,lash,luck,max,nerd,pan,pig,psych,rat,scout,single,sort,spell,stamp,straighten,suss,time,tire,trip,trot,weird,whip,wimp,zone,zonk,bubble,keel,mull,pore,tide,beef,board,bone,boot,cheer,eye,brighten,fatten,fess,firm,free,freshen,fry,fuel,gang,gear,hack,ham,hole,hush,jazz,juice,lap,lighten,loosen,mash,measure,mix,mock,mop,muddle,open,own,patch,prop,rough,rustle,shack,size,sober,spark,spruce,stack,stir,stitch,string,suit,sum,team,tidy,tighten,toss,vacuum,wire,wise,word',
  symmetric: '{"away":[5,9,10,11,12,18,21,32,41,59,79,81,84,105,111,287,292,418,455,485,647,702],"on":[5,8,10,11,12,21,38,49,61,64,75,81,84,103,110,124,133,-1,161,212,234,249,253,278,287,292,369,371,403,414,418,451,455,499,593,717,722,723],"over":[5,18,75,79,242,301],"up":[8,9,10,11,12,20,21,25,27,32,33,41,57,58,61,67,81,82,84,85,88,93,97,102,107,111,114,133,134,155,157,176,212,224,238,249,287,292,299,301,348,374,377,134,400,405,431,586,593,613,639,714,715,722,724,725,726,727,728,729,730,731,732,733,734,735,736,737],"in":[9,10,11,12,18,19,20,25,33,48,57,58,67,77,81,85,97,107,85,155,-1,176,212,224,238,269,292,299,317,318,327,374,405,409,432,485,499,544,547,639,703,704,705,706,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721],"together":[11,18,238]}',
  asymmetric: '{"off":[0,15,25,48,73,77,97,102,128,154,199,208,316,317,372,445,485,544,716,718,724,746,747,757,770,771,772,773,774,775,776,777,778,779,780,781,782,783,784,785,786,787,788],"it":[2,5],"over":[3,21,27,48,61,104,126,403,552,787,839,840,841,842,843],"about":[5,9,738,739,740],"after":[5,10,301],"ahead":[5,21,261],"by":[5,21,98,100,208,485,747,748],"round":[5,21],"through":[5,79],"along":[9,176],"around":[9,18,21,68,233,271,287,738,741,742,743,744],"forth":[9,18],"apart":[10,48],"out":[13,13,15,17,21,31,32,37,41,47,59,61,70,75,79,80,88,115,116,117,161,165,171,174,193,217,224,233,243,371,386,398,407,415,431,440,455,115,594,653,687,740,726,775,785,788,798,799,800,801,802,803,804,805,806,807,808,809,810,811,812,813,814,815,816,817,818,819,820,821,822,823,824,825,826,827,828,829,830,831,832,833,834,835,836,837,838],"up":[15,36,37,38,50,56,60,69,75,104,106,110,117,124,174,175,180,187,199,217,243,278,289,322,359,376,404,421,445,500,617,702,719,720,721,723,744,748,774,778,782,783,786,809,810,821,828,832,835,844,845,846,847,848,849,850,851,852,853,854,855,856,857,858,859,860,861,862,863,864,865,866,867,868,869,694,871,872,873,874,875,876,877,878,879,880,881,882,883,884,885,886,887,888,889,890,891,892,893,894,895,896,897,898,899],"to":[17,292],"forward":[18,301],"back":[48,51,60,61,73,93,104,301],"down":[48,68,79,371,444,620,749,750,751,752,753,754,755,756],"on":[60,219,261,542,661,789,790,791,792,793,794,795,796,797],"into":[79,301],"for":[84,201,740,757,758,759],"in":[111,187,208,367,403,421,617,670,760,761,762,763,764,765,766,767,768,769],"away":[201,234,431,726,746]}' }
module.exports = (function () {
				var opposite = require('./negate_data');
				var res = {};
				var conjugate = require('../../parents/verb/conjugate');
				var verbs = require('./verbs_conjugate').irregulars.map(function(o){
					return o.infinitive;
				}).concat( require('./verbs'), exports.zip.verbs.split(',') );

				function buildPhrasals(t) {
					res[t] = {};
					var o = JSON.parse(exports.zip[t]);
					var cache = (this.hasOwnProperty('cache')) ? this.cache : {}; //cache individual verbs to speed it up
					for (var k in o) {
						o[k].reduce(function (h, i) {
							if (!cache.hasOwnProperty(verbs[i])) {
								cache[verbs[i]] = conjugate(verbs[i]);
							}
							h[verbs[i]+' '+ k] = 'VBP';
							if (t === 'symmetric' && opposite.hasOwnProperty(k)) {
								h[verbs[i]+' '+ opposite[k]] = 'VBP';
							}
							return h;
						}, res[t]);
					}
					/*
					Object.keys(cache).forEach(function (key) {
						console.log( cache[key] );
						//main[cache[key]+' '+k] = 'xy';//tags[key];
					});
					*/
				}
				['symmetric', 'asymmetric'].forEach(buildPhrasals);
				return res;
			})()
