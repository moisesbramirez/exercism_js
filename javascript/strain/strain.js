"use strict";

module.exports = { keep: keep, discard: discard };

function keep(collection, predicate) {
  return collection.filter( value => predicate.call(null, value));
}

function discard(collection, predicate) {
  return collection.filter( value => !predicate.call(null, value));
}
