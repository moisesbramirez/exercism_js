"use strict";

module.exports = Bowling;

function Bowling(rolls) {
  this.frames = setFrames(rolls);
}

Bowling.prototype.score = function score() {
  if(!this.frames.isComplete) throw new IncompleteGameException();
  let currentFrame = this.frames.start;
  let points = currentFrame.getPoints();
  while(currentFrame.next && !currentFrame.next.isFill) {
    currentFrame = currentFrame.next;
    points += currentFrame.getPoints();
  }
  return points;
};

function setFrames(rolls) {
  let skip = false;
  return rolls.reduce((frames, roll, index, rolls) => {
    if(isStrike(roll) && frames.count < 10) {
      frames.add({one: roll});
    } else {
      if(!skip) {
        frames.add({one: roll, two: rolls[index + 1]});
        skip = true;
      } else {
        skip = false;
      }
    }
    return frames;
  }, new FrameList());
}

function FrameList() {
  this.start = null;
  this.count = 0;
}

FrameList.prototype.add = function add(opts) {
  this.count++;
  addMissingOptions(opts, this.count);
  let frame = new Frame(opts);
  if(!this.start) {
    this.start = frame;
    return;
  }

  let lastFrame = getLastFrame(this.start);
  if(this.isComplete)
    throw new PostGameFrameException();
  lastFrame.next = frame;
  this.isComplete = isComplete(frame);
};

function addMissingOptions(options, count) {
  options.isTenth = (count === 10)? true: false;
  options.isFill = (count > 10)? true: false;
}

function getLastFrame(start) {
  let current = start
  while(current.next) {
    current = current.next;
  }
  return current;
}

function isComplete(frame) {
  return isTenthAndNotStrikeOrSpare(frame) || frame.isFill;
}

function isTenthAndNotStrikeOrSpare(frame) {
  return ((frame.isTenth && !frame.isSpare) &&
        (frame.isTenth && !frame.isStrike));
}

function Frame(opts) {
  this.rollOne = opts.one;
  this.rollTwo = opts.two;
  this.isStrike = isStrike(opts.one);
  this.isSpare = isSpare(opts.one, opts.two);
  this.isFill = opts.isFill;
  this.isTenth = opts.isTenth;
  this.next = null;
  validateFrame(this);
}

function isStrike(roll) {
  return roll === 10;
}

function isSpare(rollOne, rollTwo) {
  return rollOne + rollTwo === 10;
}

Frame.prototype.getPoints = function getPoints() {
  if(this.isTenth && this.isStrike)
    return 10 + this.next.rollOne + this.next.rollTwo;
  if(this.isTenth && this.isSpare)
    return 10 + this.next.rollOne;
  if(this.isSpare)
    return 10 + this.next.rollOne;
  if(this.isStrike) {
    return this.next.isStrike?
      10 + this.next.rollOne + this.next.next.rollOne:
      10 + this.next.getPoints();
  }
  return this.rollOne + this.rollTwo;
};

function validateFrame(frame) {
  return invalidRoll(frame) ||
          invalidPinCount(frame) ||
          incompleteFrame(frame);
}

function incompleteFrame(frame) {
  if(!frame.isFill &&
    frame.rollOne < 10 &&
    frame.rollTwo === undefined)
    throw new IncompleteGameException();
}

function invalidPinCount(frame) {
  let rollTwo = frame.rollTwo || 0;
  if(!frame.isFill &&
    frame.rollOne + rollTwo > 10)
   throw new InvalidPinCountException()
}

function invalidRoll(frame) {
  let rollTwo = frame.rollTwo || 0;
  if((frame.rollOne < 0 || rollTwo < 0) ||
      (frame.rollOne > 10 || rollTwo > 10))
    throw new InvalidRollException();
}

function InvalidPinCountException() {
  this.name = "Invalid Pin Count Exception";
  this.message = "Pin count exceeds pins on the lane";
}

function InvalidRollException() {
  this.name = "Invalid Roll Exception";
  this.message = "Pins must have a value from 0 to 10";
}

function IncompleteGameException() {
  this.name = "Incomplete Game Exception";
  this.message = "Score cannot be taken until the end of the game";
}

function PostGameFrameException() {
  this.name = "Post Game Frame Exception";
  this.message = "Should not be able to roll after game is over";
}
