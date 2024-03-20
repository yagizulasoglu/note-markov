"use strict";
/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    let chains = {};

    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1];
      if (word in chains) {
        if (nextWord) {
          chains[word].push(nextWord);
        } else {
          chains[word].push(null);
        }
      } else {
        let nextWords = [];
        nextWords.push(this.words[i + 1] || null);
        chains[word] = nextWords;
      }
    }
    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // TODO: implement this!

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    let word = this.words[0];
    let text = [word];
    // string makes javascript work harder bc it is mutable
    // pushing to array is always a more efficient approach

    let value = this.chains[word];
    // TODO: make random a method within the class
    let random = Math.floor(Math.random() * value.length);

    while (value[random] !== null) {
      word = value[random];
      text.push(word);
      value = this.chains[word];
      random = Math.floor(Math.random() * value.length);
    }

    return text.join(" ");

  }
}

module.exports = {
  MarkovMachine,
};
