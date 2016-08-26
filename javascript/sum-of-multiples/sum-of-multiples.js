"use strict";

module.exports = function sumOfMultiples(numbers) {
  return { to: to };

  function to(max) {
    let multiples = getMultiples(numbers, max).
                    sort(smallestToGreatest).
                    filter(noDuplicates);
    return multiples.reduce((sum, value) => sum += value, 0);
  }
};

function getMultiples(array, max) {
  return array.reduce((collection, value) => {
    return collection.concat(generateMultiples(value, max));
  },[]);
}

function generateMultiples(number, max) {
  let multiples = [], iter = Math.ceil(max / number);
  while(iter--) {
    multiples.push(iter * number);
  }
  return multiples;
}

function smallestToGreatest(a, b) {
  return a - b;
}

function noDuplicates(value, index, array) {
  if(value !== array[index + 1]) return value;
}
