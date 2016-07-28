"use strict";

module.exports = WordCount;
function WordCount() {}

WordCount.prototype.count = function count(string) {
  let characterArray = string.trim().toLowerCase().split(/\s+/),
      hash = Object.create(null);

  return characterArray.reduce( (cumulativeHash, character) => {
    (cumulativeHash[character])? cumulativeHash[character]++ : cumulativeHash[character] = 1;
    return cumulativeHash;
  }, hash);
};
