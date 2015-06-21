#No training, no prolog. i18n fork.
a Natural-Language-Processing library *in Javascript*,<br> small-enough for the browser, and quick-enough to run on keypress :two_men_holding_hands:

It does [tons of clever things](http://rawgit.com/spencermountain/nlp_compromise/master/client_side/basic_demo/index.html). it's smaller than jquery, and scores 86% on the [Penn treebank](http://www.cis.upenn.edu/~treebank/).
```javascript
nlp.pos('she sells seashells by the seashore').to_past().text()
//she sold seashells by the seashore
```
[original](https://github.com/spencermountain/nlp_compromise) [![npm version](https://badge.fury.io/js/nlp_compromise.svg)](http://badge.fury.io/js/nlp_compromise)

##Why this fork?
It is optimized for Internationalization (i18n) and further metrics.
You as a most welcome possible contributor / translator would only have to touch [2 or 3 commented files](https://github.com/redaktor/nlp_compromise/tree/master/src/data).<br>
The ```dictionary```... files in /src/data. <br>
We do the rest by running ```grunt```.

And the fork is smaller and even more performant.
We reduced duplicate code and do cache now.

:point_up: Heads up!
This fork introduces API changes:

```js
var nlp = new NLP();
nlp.set('some text');   // soon, as an alternative option
nlp.pluralize().text(); // --> "some texts"
```
[we will add an alternative to set options here directly]

and<br>
The pos option ```dont_combine: true``` is now ```combine: false``` <br>

####What is coming here next?
- language detection and setting in runtime
- further metrics as in this [proposal](https://gist.github.com/redaktor/e5866669e238221e7cef)
- :de:

##Check it out

* [Long Text Demo](http://rawgit.com/spencermountain/nlp_compromise/master/client_side/long_demo/index.html)
* [Specific Methods](http://rawgit.com/spencermountain/nlp_compromise/master/client_side/basic_demo/index.html)
* [Realtime Demo](http://rawgit.com/spencermountain/nlp_compromise/master/client_side/cute_demo/index.html)
* [Angular Demo](http://rawgit.com/kroid/angular-nlp-compromise/master/example/index.html)

[![Video](http://i.vimeocdn.com/video/493948602_640.jpg)](https://vimeo.com/109880250)

##Justification
If the 80-20 rule applies for most things, the ''94-6 rule'' applies when working with language - by [Zipfs law](http://www.businessinsider.com/zipfs-law-and-the-most-common-words-in-english-2013-10):
>The **[top 10 words](http://www.businessinsider.com/zipfs-law-and-the-most-common-words-in-english-2013-10)** account for 25% of used language.

>The **top 100 words** account for 50% of used language.

>The **top 50,000 words** account for 95% of used language.

On the [Penn treebank](http://www.cis.upenn.edu/~treebank/), for example, this is possible:

* just a 1 thousand word lexicon: **45% accuracy**
* ... then falling back to nouns: **70% accuracy**
* ... then some suffix regexes: **74% accuracy**
* ... then some sentence-level postprocessing: **81% accuracy**

The process is to get some curated data, find the patterns, and list the exceptions. Bada bing, bada boom.
In this way a satisfactory NLP library can be built with breathtaking lightness.

Namely, it can be run right on the user's computer instead of a server.

## Client-side
```javascript
<script src="https://rawgit.com/spencermountain/nlp_compromise/master/client_side/nlp.min.js"> </script>
<script>
  nlp.noun("dinosaur").pluralize()
  //dinosaurs
</script>
```
or, use the [angular module](https://github.com/Kroid/angular-nlp-compromise)

## Server-side
```javascript
$ npm install nlp_compromise

nlp = require("nlp_compromise")
nlp.syllables("hamburger")
//[ 'ham', 'bur', 'ger' ]
```

## API

###Sentence methods
```javascript
  var s= nlp.pos("Tony Danza is dancing").sentences[0]

  s.tense()
  //present

  s.text()
  //"Tony Danza is dancing"

  s.to_past().text()
  //Tony Danza was dancing

  s.to_present().text()
  //Tony Danza is dancing

  s.to_future().text()
  //Tony Danza will be dancing

  s.negate().text()
  //Tony Danza is not dancing

  s.tags()
  //[ 'NNP', 'CP', 'VB' ]

  s.entities()
  //[{text:"Tony Danza"...}]

  s.people()
  //[{text:"Tony Danza"...}]

  s.nouns()
  //[{text:"Tony Danza"...}]

  s.adjectives()
  //[]

  s.adverbs()
  //[]

  s.verbs()
  //[{text:"dancing"}]

  s.values()
  //[]
````

###Noun methods:
```javascript
nlp.noun("earthquakes").singularize()
//earthquake

nlp.noun("earthquake").pluralize()
//earthquakes

nlp.noun('veggie burger').is_plural
//false

nlp.noun('tony danza').is_person
//true
nlp.noun('Tony J. Danza elementary school').is_person
//false
nlp.noun('SS Tony danza').is_person
//false

nlp.noun('hour').article()
//an

nlp.inflect('mayors of toronto'))
//{ plural: 'mayors of toronto', singular: 'mayor of toronto' }
```

###Verb methods:
```javascript
nlp.verb("walked").conjugate()
//{ infinitive: 'walk',
//  present: 'walks',
//  past: 'walked',
//  gerund: 'walking'}
nlp.verb('swimming').to_past()
//swam
nlp.verb('swimming').to_present()
//swims
nlp.verb('swimming').to_future()
//will swim
```
###Adjective methods:
```javascript
nlp.adjective("quick").conjugate()
//  { comparative: 'quicker',
//    superlative: 'quickest',
//    adverb: 'quickly',
//    noun: 'quickness'}
```
###Adverb methods
```javascript
nlp.adverb("quickly").conjugate()
//  { adjective: 'quick'}
```



## Part-of-speech tagging
86% on the [Penn treebank](http://www.cis.upenn.edu/~treebank/)
```javascript
nlp.pos("Tony Hawk walked quickly to the store.").tags()
// [ [ 'NNP', 'VBD', 'RB', 'IN', 'DT', 'NN' ] ]

nlp.pos("they would swim").tags()
// [ [ 'PRP', 'MD', 'VBP' ] ]
nlp.pos("the obviously good swim").tags()
// [ [ 'DT', 'RB', 'JJ', 'NN' ] ]
```

## Named-Entity recognition
```javascript
nlp.spot("joe carter loves toronto")
// [{text:"joe carter"...}, {text:"toronto"...}]
```

## Sentence segmentation
```javascript
nlp.sentences("Hi Dr. Miller the price is 4.59 for the U.C.L.A. Ph.Ds.").length
//1

nlp.tokenize("she sells sea-shells").length
//3
```

## Syllable hyphenization
70% on the [moby hyphenization corpus](http://www.gutenberg.org/dirs/etext02/mhyph10.zip)  0.5k
```javascript
nlp.syllables("hamburger")
//[ 'ham', 'bur', 'ger' ]
```

## US-UK Localization
```javascript
nlp.americanize("favourite")
//favorite
nlp.britishize("synthesized")
//synthesised
```
## N-gram
```javascript
str= "She sells seashells by the seashore. The shells she sells are surely seashells."
nlp.ngram(str, {min_count:1, max_size:5})
// [{ word: 'she sells', count: 2, size: 2 },
// ...
options.min_count // throws away seldom-repeated grams. defaults to 1
options.max_size  // prevents the result from becoming gigantic. defaults to 5
```
### Date parsing
```javascript
nlp.value("I married April for the 2nd time on June 5th 1998 ").date()
// { text: 'June 5th 1998',
//   from: { year: '1998', month: '06', day: '05' },
//   to: {} }
```
### Number parsing
```javascript
nlp.value("two thousand five hundred and sixty").number()
//2560
nlp.value("ten and a half million").number()
//15000000
```
### Unicode Normalisation
a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.
```javascript
nlp.normalize("Björk")
//Bjork
```
and for fun,
```javascript
nlp.denormalize("The quick brown fox jumps over the lazy dog", {percentage:50})
// The ɋӈїck brown fox juӎÞs over tӊe laζy dog
```

### Details
#### Tags
```javascript
  "verb":
    "VB" : "verb, generic (eat)"
    "VBD" : "past-tense verb (ate)"
    "VBN" : "past-participle verb (eaten)"
    "VBP" : "infinitive verb (eat)"
    "VBZ" : "present-tense verb (eats, swims)"
    "CP" : "copula (is, was, were)"
    "VBG" : "gerund verb (eating,winning)"
  "adjective":
    "JJ" : "adjective, generic (big, nice)"
    "JJR" : "comparative adjective (bigger, cooler)"
    "JJS" : "superlative adjective (biggest, fattest)"
  "adverb":
    "RB" : "adverb (quickly, softly)"
    "RBR" : "comparative adverb (faster, cooler)"
    "RBS" : "superlative adverb (fastest (driving), coolest (looking))"
  "noun":
    "NN" : "noun, singular (dog, rain)"
    "NNP" : "singular proper noun (Edinburgh, skateboard)"
    "NNPA" : "noun, acronym (FBI)"
    "NNAB" : "noun, abbreviation (jr.)"
    "NNPS" : "plural proper noun (Smiths)"
    "NNS" : "plural noun (dogs, foxes)"
    "NNO" : "possessive noun (spencer's, sam's)"
    "NG" : "gerund noun (eating,winning" : "but used grammatically as a noun)"
    "PRP" : "personal pronoun (I,you,she)"
  "glue":
    "PP" : "possessive pronoun (my,one's)"
    "FW" : "foreign word (mon dieu, voila)"
    "IN" : "preposition (of,in,by)"
    "MD" : "modal verb (can,should)"
    "CC" : "co-ordating conjunction (and,but,or)"
    "DT" : "determiner (the,some)"
    "UH" : "interjection (oh, oops)"
    "EX" : "existential there (there)"
  "value":
    "CD" : "cardinal value, generic (one, two, june 5th)"
    "DA" : "date (june 5th, 1998)"
    "NU" : "number (89, half-million)"
```

####Lexicon
Because the library can conjugate all sorts of forms, it only needs to store one grammatical form.
The lexicon was built using the [American National Corpus](http://www.americannationalcorpus.org/), then intersected with the regex rule-list. For example, it lists only 300 verbs, then blasts-out their 1200+ derived forms.

####Contractions
Unlike other nlp toolkits, this library puts a 'silent token' into the phrase for contractions. Otherwise something would be neglected.
```javascript
nlp.pos("i'm good.")
 [{
   text:"i'm",
   normalised:"i",
   pos:"PRP"
 },
 {
   text:"",
   normalised:"am",
   pos:"CP"
 },
 {
   text:"good.",
   normalised:"good",
   pos:"JJ"
 }]
```
####Tokenization
Neighbouring words with the same part of speech are merged together, unless there is punctuation, different capitalisation, or special cases.
```javascript
nlp.pos("tony hawk won").tags()
//tony hawk   NN
//won   VB
```
To turn this off:
```javascript
nlp.pos("tony hawk won", {dont_combine:true}).tags()
//tony   NN
//hawk   NN
//won   VB
```

## Licence
MIT
