"use strict";

module.exports = Queens;

function Queens(positions) {
  positions = positions || {};
  this.white = positions.white || [0,3];
  this.black = positions.black || [7,3];

  validatePositions(this.white, this.black);
}

Queens.prototype.toString = function toString() {
  let board = "", iteration = 0;
  while(iteration < 8) {
    let row = pushNthTimes([], "_", 8);
    if(iteration === this.white[0]) row[this.white[1]] = "W";
    if(iteration === this.black[0]) row[this.black[1]] = "B";
    iteration++;
    board += row.join(" ") + "\n";
  }
  return board;
};

Queens.prototype.canAttack = function canAttack() {
  return this.white[0] === this.black[0] ||
        this.white[1] === this.black[1] ||
        isDiagonal(this.white, this.black);
};

function validatePositions(white, black) {
  if( isSamePosition(white, black) )
    throw "Queens cannot share the same space";
}

function isSamePosition(pair, pairTwo) {
  return pair[0] === pairTwo[0] && pair[1] === pairTwo[1];
}

function pushNthTimes(array, string, times){
  while(times--) {
    array.push(string);
  }
  return array;
}

function isDiagonal(pair, pairTwo) {
  return Math.abs(pair[0] - pairTwo[0]) ===
        Math.abs(pair[1] - pairTwo[1]);
};
