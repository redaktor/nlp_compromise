/**
 * rule-based sentence boundary segmentation - <br>
 * chop given text into its proper sentences. <br>
 * ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
 *
 * @module src/methods/tokenization/sentence
 */
module.exports = function(text) {
	if (typeof lang != 'string') lang = 'en';
	var dPath = '../../data/'+lang+'/';
	dates = require(dPath+'lexicon/dates');
	abbreviations = require(dPath+'lexicon/abbreviations');
		
  var sentences = [];
  // first do a greedy-split..
  var chunks = text.split(/(\S.+?[.\?!])(?=\s+|$|")/g);

  // all abbreviations are used here, including nonNoun and date abbrevs.
  abbreviations = abbreviations.nouns.concat(abbreviations.nonNouns, Object.keys(dates.monthsAbbrevs), Object.keys(dates.daysAbbrevs));

  // detection of non-sentence chunks
  var abbrev_reg = new RegExp("\\b(" + abbreviations.join("|") + ")[.!?] ?$", "i");
  var acronym_reg = new RegExp("[ |\.][A-Z]\.?$", "i");
  var elipses_reg = new RegExp("\\.\\.\\.*$");

  // loop through these chunks, and join the non-sentence chunks back together..
  var chunks_length = chunks.length;
  for (i = 0; i < chunks_length; i++) {
    if (chunks[i]) {
      // trim whitespace
      chunks[i] = chunks[i].replace(/^\s+|\s+$/g, "");
      // should this chunk be combined with the next one?
      if (chunks[i+1] && chunks[i].match(abbrev_reg) || chunks[i].match(acronym_reg) || chunks[i].match(elipses_reg) ) {
          chunks[i + 1] = ((chunks[i]||'') + " " + (chunks[i + 1]||'')).replace(/ +/g, " ");
      } else if(chunks[i] && chunks[i].length>0){ //this chunk is a proper sentence..
          sentences.push(chunks[i]);
          chunks[i] = "";
      }
    }
  }
  // if we never got a sentence, return the given text
  if (sentences.length === 0) {
    return [text];
  }
	
  return sentences;
}

// console.log(sentence_parser('Tony is nice. He lives in Japan.').length === 2)
// console.log(sentence_parser('I like that Color').length === 1)
// console.log(sentence_parser("She was dead. He was ill.").length === 2)
// console.log(sentence_parser("i think it is good ... or else.").length == 1)
