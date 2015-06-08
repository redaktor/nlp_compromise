//phrasal verbs are two words that really mean one verb.
//'beef up' is one verb, and not some direction of beefing.
//by @spencermountain, 2015 mit
//many credits to http://www.allmyphrasalverbs.com/
var verb_conjugate = require("../../parents/verb/conjugate/conjugate")

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

{"blow":[["away","back"],["up","down"],"out"],"bounce":[["away","back"]],"bring":[["away","back"],["in","out"],["up","down"],"about","along","around","forth"],"call":[["away","back"],["on","off"],["up","down"],"around"],"come":[["away","back"],["in","out"],["over","under"],["together","apart"],"around","forth","forward"],"cut":[["away","back"],["up","down"],"out"],"drop":[["away","back"],["in","out"],"by","off"],"fire":[["away","back"],"up"],"get":[["away","back"],["on","off"],["up","down"],"ahead","around","by","out","over","round"],"give":[["away","back"],["in","out"],["on","off"],["up","down"]],"go":[["away","back"],["on","off"],["over","under"],"about","after","ahead","by","it","round","through"],"keep":[["away","back"],["in","out"],["on","off"],["up","down"],"to"],"pass":[["away","back"],["on","off"],"out"],"put":[["away","back"],["in","out"],["on","off"],["together","apart"],["up","down"]],"run":[["away","back"],["over","under"],"down","into","out","through"],"send":[["away","back"],["in","out"],["on","off"],["up","down"]],"shoot":[["away","back"],"for","off"],"switch":[["away","back"],["on","off"]],"take":[["away","back"],["in","out"],["on","off"],["up","down"],"after","apart"],"tie":[["away","back"],["up","down"],"in"],"throw":[["away","back"]],"bang":[["in","out"]],"barge":[["in","out"]],"bash":[["in","out"]],"beat":[["in","out"],["up","down"],"off"],"block":[["in","out"],"off"],"book":[["in","out"]],"box":[["in","out"]],"break":[["in","out"],["up","down"]],"burn":[["in","out"],"off"],"butt":[["in","out"]],"carve":[["in","out"],["up","down"]],"cash":[["in","out"]],"check":[["in","out"]],"cross":[["in","out"]],"fall":[["in","out"],"apart","back","down","off","over"],"fence":[["in","out"]],"fill":[["in","out"],["up","down"],"out"],"grow":[["in","out"],["up","down"]],"hand":[["in","out"],"down"],"hang":[["in","out"],["up","down"]],"head":[["in","out"],["on","off"]],"jack":[["in","out"],"off"],"leave":[["in","out"]],"let":[["in","out"],["up","down"]],"lock":[["in","out"],["up","down"]],"log":[["in","out"],["on","off"]],"move":[["in","out"],["up","down"],"along"],"opt":[["in","out"]],"pack":[["in","out"],["up","down"]],"peel":[["in","out"],"off"],"pull":[["in","out"],["together","apart"],["up","down"]],"rain":[["in","out"]],"reach":[["in","out"]],"ring":[["in","out"],"off"],"rub":[["in","out"],["up","down"]],"set":[["in","out"],["up","down"]],"settle":[["in","out"],["up","down"]],"shut":[["in","out"]],"sign":[["in","out"],"up"],"smash":[["in","out"],["up","down"]],"snow":[["in","out"]],"strike":[["in","out"],["up","down"],"off"],"try":[["in","out"],["on","off"]],"turn":[["in","out"],["on","off"],["up","down"]],"type":[["in","out"],"up"],"warm":[["in","out"],"up"],"wave":[["in","out"]],"wean":[["in","out"]],"wear":[["in","out"],"down"],"wheel":[["in","out"]],"add":[["on","off"],["up","down"]],"carry":[["on","off"],"away"],"catch":[["on","off"],"up"],"count":[["on","off"]],"feed":[["on","off"]],"grind":[["on","off"],["up","down"]],"hold":[["on","off"],["up","down"],"back","out","over"],"lay":[["on","off"]],"pop":[["on","off"],["up","down"]],"power":[["on","off"],["up","down"]],"show":[["on","off"],["up","down"]],"snap":[["on","off"],"up"],"tell":[["on","off"]],"wait":[["on","off"],"up"],"look":[["over","under"],["up","down"],"after","back","forward","into"],"read":[["over","under"],"off","out","up"],"talk":[["over","under"]],"back":[["up","down"],"away","out"],"bend":[["up","down"],"over"],"boil":[["up","down"]],"bottle":[["up","down"]],"buckle":[["up","down"]],"bundle":[["up","down"]],"clean":[["up","down"]],"dress":[["up","down"]],"flag":[["up","down"]],"fold":[["up","down"]],"load":[["up","down"]],"man":[["up","down"]],"mark":[["up","down"]],"melt":[["up","down"]],"pin":[["up","down"]],"pipe":[["up","down"]],"plump":[["up","down"]],"scale":[["up","down"]],"scrape":[["up","down"]],"shake":[["up","down"]],"sit":[["up","down"],"out"],"slow":[["up","down"]],"square":[["up","down"],"off"],"stand":[["up","down"],"back"],"tear":[["up","down"],"off"],"use":[["up","down"]],"wash":[["up","down"],"away","out"],"wind":[["up","down"]],"fool":["about","around"],"gad":["about"],"root":["about","for","out"],"press":["ahead","on"],"ask":["around","out"],"boss":["around"],"horse":["around"],"joke":["around"],"lie":["around","down"],"mess":["around","up"],"play":["around"],"file":["away","for"],"frighten":["away","off"],"hide":["away","out"],"fight":["back"],"hit":["back","on","up"],"pay":["back","off"],"think":["back","over","up"],"stop":["by","in","off"],"swear":["by"],"swing":["by"],"tick":["by","off"],"zip":["by","up"],"bog":["down"],"calm":["down"],"hunker":["down"],"jot":["down"],"knock":["down","off","out"],"narrow":["down"],"note":["down"],"pat":["down"],"pour":["down"],"tone":["down"],"trickle":["down"],"fend":["for","off"],"gun":["for"],"hanker":["for"],"cave":["in"],"chip":["in"],"hone":["in"],"jump":["in"],"key":["in"],"pencil":["in"],"plug":["in"],"rein":["in"],"shade":["in"],"sleep":["in","off","over"],"suck":["in","up"],"trade":["in","up"],"tuck":["in"],"usher":["in"],"weigh":["in","up"],"zero":["in"],"have":["it"],"auction":["off"],"be":["off"],"blast":["off"],"brush":["off"],"buzz":["off"],"cast":["off"],"cool":["off"],"end":["off","up"],"face":["off","up"],"goof":["off","up"],"kick":["off"],"laugh":["off"],"level":["off","out"],"live":["off","up"],"make":["off","out","up"],"mouth":["off"],"nod":["off"],"pair":["off","up"],"reel":["off"],"rip":["off"],"round":["off"],"sail":["off"],"shave":["off"],"slice":["off","up"],"split":["off","up"],"stave":["off"],"storm":["off","out"],"tee":["off","up"],"tip":["off","over"],"top":["off","out"],"walk":["off"],"work":["off","out"],"write":["off","up"],"bank":["on"],"bargain":["on"],"egg":["on"],"frown":["on"],"latch":["on"],"pile":["on"],"prattle":["on"],"spring":["on"],"spur":["on"],"tack":["on"],"urge":["on"],"yammer":["on"],"act":["out","up"],"bail":["out"],"bear":["out"],"black":["out"],"blank":["out"],"bleed":["out"],"blurt":["out"],"branch":["out"],"buy":["out","up"],"cancel":["out"],"eat":["out"],"edge":["out"],"farm":["out"],"figure":["out"],"find":["out","out"],"fish":["out"],"fizzle":["out"],"flake":["out"],"flame":["out","up"],"flare":["out","up"],"flesh":["out"],"flip":["out"],"geek":["out"],"help":["out"],"iron":["out"],"lash":["out"],"listen":["out","up"],"lose":["out"],"luck":["out"],"max":["out"],"miss":["out"],"nerd":["out"],"pan":["out"],"pick":["out","up"],"pig":["out"],"point":["out"],"print":["out"],"psych":["out","up"],"rat":["out"],"rent":["out"],"rule":["out"],"scout":["out"],"see":["out","to"],"sell":["out"],"shout":["out"],"single":["out"],"smoke":["out"],"sort":["out"],"spell":["out"],"splash":["out"],"stamp":["out"],"start":["out","up"],"straighten":["out","up"],"suss":["out"],"time":["out"],"tire":["out"],"trip":["out","up"],"trot":["out"],"watch":["out"],"weird":["out"],"whip":["out","up"],"wimp":["out"],"wipe":["out"],"zone":["out"],"zonk":["out"],"bubble":["over"],"do":["over"],"gloss":["over"],"keel":["over"],"mull":["over"],"pore":["over"],"spill":["over"],"tide":["over"],"beef":["up"],"board":["up"],"bone":["up"],"boot":["up"],"brighten":["up"],"build":["up"],"cheer":["up"],"cook":["up"],"eye":["up"],"fatten":["up"],"feel":["up"],"fess":["up"],"finish":["up"],"firm":["up"],"free":["up"],"freeze":["up"],"freshen":["up"],"fry":["up"],"fuel":["up"],"gang":["up"],"gear":["up"],"hack":["up"],"ham":["up"],"heat":["up"],"hole":["up"],"hush":["up"],"jazz":["up"],"juice":["up"],"lap":["up"],"light":["up"],"lighten":["up"],"line":["up"],"link":["up"],"loosen":["up"],"mash":["up"],"measure":["up"],"mix":["up"],"mock":["up"],"mop":["up"],"muddle":["up"],"open":["up"],"own":["up"],"patch":["up"],"prop":["up"],"rough":["up"],"rustle":["up"],"save":["up"],"shack":["up"],"size":["up"],"slip":["up"],"sober":["up"],"spark":["up"],"spruce":["up"],"stack":["up"],"stay":["up"],"stir":["up"],"stitch":["up"],"string":["up"],"suit":["up"],"sum":["up"],"team":["up"],"tidy":["up"],"tighten":["up"],"toss":["up"],"vacuum":["up"],"wake":["up"],"wire":["up"],"wise":["up"],"word":["up"]}
Object.keys(symmetric).forEach(function (k) {
  symmetric[k].split(',').forEach(function (s) {
    //add the given form
    main.push(s + " " + k)
    //add its opposite form
    main.push(s + " " + opposites[k])
  })
})

Object.keys(asymmetric).forEach(function (k) {
  asymmetric[k].split(',').forEach(function (s) {
    main.push(s + " " + k)
  })
})

//at his point all verbs are infinitive. lets make this explicit.
main = main.reduce(function (h, s) {
  h[s] = "VBP"
  return h
}, {})

//conjugate every phrasal verb. takes ~30ms
var tags = {
  present: "VB",
  past: "VBD",
  future: "VBF",
  gerund: "VBG",
  infinitive: "VBP",
}
var cache = {} //cache individual verbs to speed it up
var split, verb, particle, phrasal;
Object.keys(main).forEach(function (s) {
  split = s.split(' ')
  verb = split[0]
  particle = split[1]
  if (cache[verb] === undefined) {
    cache[verb] = verb_conjugate(verb)
  }
  Object.keys(cache[verb]).forEach(function (k) {
    phrasal = cache[verb][k] + " " + particle
    main[phrasal] = tags[k]
  })
})

module.exports = main;
// console.log(JSON.stringify(phrasal_verbs, null, 2))