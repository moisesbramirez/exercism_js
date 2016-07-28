"use strict";

module.exports = BeerSong;

function BeerSong() {}

BeerSong.prototype.sing = sing;
BeerSong.prototype.verse = verse;

function sing(firstVerse, lastVerse) {
  let song = '';
  lastVerse = lastVerse || 0;

  while(firstVerse >= lastVerse) {
    song += verse(firstVerse--) + "\n";
  }

  return song.substring(0, song.length - 1);
};

function verse(numOfBottles) {
  let verse = beerLeft(numOfBottles);
  verse += " of beer on the wall, ";
  verse += beerLeft(numOfBottles).toLowerCase();
  verse += " of beer.";
  verse += beerAction(numOfBottles--);
  verse += beerLeft(numOfBottles).toLowerCase();
  verse += " of beer on the wall.\n";

  return verse;
};

function beerLeft(bottles) {
  if(!bottles) { return "No more bottles"; }
  if(bottles > 1) { return `${bottles} bottles`; }
  if(bottles < 0) { return "99 bottles"; }
  return "1 bottle";
}

function beerAction(bottles) {
  if(!bottles) { return "\nGo to the store and buy some more, "; }
  if( bottles === 1 ) { return "\nTake it down and pass it around, "; }
  return "\nTake one down and pass it around, "
}
