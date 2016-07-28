"use strict";

module.exports = BinarySearch;

function BinarySearch(array) {
  this.array = processArray(array);
}

BinarySearch.prototype.indexOf = function indexOf(search) {
  return searchSubArray(search, this.array, 0, this.array.length);
};

function searchSubArray(value, array, minIndex, maxIndex) {
  let numberOfItems = maxIndex - minIndex;
  let middleIndex = Math.floor(numberOfItems / 2) + minIndex;

  if(array[middleIndex] === value) return middleIndex;
  if(maxIndex === minIndex) return -1;

  return (array[middleIndex] > value) ?
    searchSubArray(value, array, minIndex, middleIndex):
    searchSubArray(value, array, middleIndex + 1, maxIndex);
}

function processArray(array) {
  let sorted = Array.from(array).sort( (a,b) => a-b );
  let isSorted = array.every((value, index) => value === sorted[index]);
  return isSorted ? array : undefined;
}
