"use strict";
const CREATURE_MAP = {
  1: "fly",
  2: "spider",
  3: "bird",
  4: "cat",
  5: "dog",
  6: "goat",
  7: "cow",
  8: "horse"
};

const STATEMENT_MAP = {
  2: "It wriggled and jiggled and tickled inside her.\n",
  3: "How absurd to swallow a bird!\n",
  4: "Imagine that, to swallow a cat!\n",
  5: "What a hog, to swallow a dog!\n",
  6: "Just opened her throat and swallowed a goat!\n",
  7: "I don't know how she swallowed a cow!\n",
  8: "She's dead, of course!\n"
}

module.exports = FoodChain;

function FoodChain() {}

FoodChain.prototype.verse = function verse(verseNumber) {
  let verse = `I know an old lady who swallowed a ${CREATURE_MAP[verseNumber]}.\n`;
  verse += STATEMENT_MAP[verseNumber] || "";
  return (verseNumber === 8) ? verse : verse + cumulativeVerse(verseNumber);
};

FoodChain.prototype.verses = function verses(minVerseNumber, maxVerseNumber) {
  let song = "";
  while(minVerseNumber <= maxVerseNumber) {
    song += this.verse(minVerseNumber) + "\n";
    minVerseNumber++;
  }
  return song;
};

function cumulativeVerse(creatureNumber){
  if(creatureNumber === 1)
    return "I don't know why she swallowed the fly. Perhaps she'll die.\n";
    
  let verse = `She swallowed the ${CREATURE_MAP[creatureNumber]} to catch the ${CREATURE_MAP[creatureNumber-1]}`;
  verse += (creatureNumber === 3)? " that wriggled and jiggled and tickled inside her.\n": ".\n"
  return verse + cumulativeVerse(creatureNumber-1);
}
