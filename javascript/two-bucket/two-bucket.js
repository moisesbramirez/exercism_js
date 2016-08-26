"use strict";

module.exports = TwoBucket;

function TwoBucket(bucket1, bucket2, goal, startBucket) {
  let starter = (startBucket === "one") ?
    new Bucket(bucket1, startBucket): new Bucket(bucket2, startBucket);
  let other = (startBucket === "one") ?
    new Bucket(bucket2, startBucket): new Bucket(bucket1, startBucket);
  let moves = 0;

  while(!goalReached(starter, other, goal)) {
    moves++;
    if(starter.isEmpty()) {
      starter.fill();
      continue;
    }
    if(!starter.isEmpty() && !other.isFull()) {
      other.pour(starter);
      continue;
    }
    other.empty();
  }
  this.goalBucket = nameOfGoalBucket(starter, other, goal);
  this.otherBucket = (starter.name === this.goalBucket)?
    other.contents : starter.contents;
  this.moves = function() {
    return moves;
  };
}

function nameOfGoalBucket(starter, other, goal) {
  return (starter.contents === goal)? starter.name : other.name;
}

function goalReached(buckOne, buckTwo, goal) {
  return buckOne.contents === goal || buckTwo.contents === goal;
}

function Bucket(capacity, name) {
  this.capacity = capacity;
  this.name = name;
  this.contents = 0;
}

Bucket.prototype.fill = function fill() {
  this.contents = this.capacity;
};

Bucket.prototype.empty = function empty() {
  this.contents = 0;
};

Bucket.prototype.pour = function pour(bucket) {
  let possible = this.capacity - this.contents;
  if(bucket.contents < possible) {
    this.contents += bucket.contents
    bucket.empty();
  } else {
    this.contents += possible;
    bucket.contents -= possible;
  }
};

Bucket.prototype.isEmpty = function isEmpty() {
  return this.contents === 0;
};

Bucket.prototype.isFull = function isFull() {
  return this.contents === this.capacity;
};
