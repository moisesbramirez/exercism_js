"use strict";
const ALLERGEN_MAP = {
  1: "eggs",
  2: "peanuts",
  4: "shellfish",
  8: "strawberries",
  16: "tomatoes",
  32: "chocolate",
  64: "pollen",
  128: "cats"
};

module.exports = Allergies;

function Allergies(score) {
  this.score = score;
}

Allergies.prototype.list = function list() {
  return getAllergens(this.score, []);
};

Allergies.prototype.allergicTo = function allergicTo(allergen) {
  let allergens = this.list();
  return allergens.some(value => value === allergen);
};

function getAllergens(score, collection) {
  if(score === 0) return collection.reverse();
  let highestKey = findHighestKey(score);
  collection.push(ALLERGEN_MAP[highestKey]);
  return getAllergens((score % highestKey), collection);
}

function findHighestKey(score) {
  let keys = Object.keys(ALLERGEN_MAP).map(value => parseInt(value)).reverse();
  return keys.find( value => Math.floor(score/value) === 1 ) || 128;
}
