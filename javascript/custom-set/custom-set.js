"use strict";

module.exports = CustomSet;

function CustomSet(set) {
  this.set = processSet(set);

  function processSet(array) {
    return (array)?
      array.sort(smallestToGreatest).filter(noDuplicates):[];
  }
}

CustomSet.prototype.add = function add(value) {
  if(!this.contains(value)) {
    this.set.push(value);
  }
  return this;
};

CustomSet.prototype.clear = function clear() {
  this.set.length = 0;
  return this;
};

CustomSet.prototype.contains = function contains(search) {
  return isContained(this.set, search);
};

CustomSet.prototype.delete = function remove(search) {
  let index = this.set.indexOf(search);
  if(index > -1) this.set.splice(index, 1);
  return this;
};

CustomSet.prototype.difference = function difference(customSet) {
  let uniques = this.set.reduce(
    (uniques, value) => {
      if(!customSet.contains(value)) uniques.push(value);
      return uniques;
    },[]);
  return new CustomSet(uniques)
};

CustomSet.prototype.disjoint = function disjoint(customSet) {
  return !this.set.some(value => customSet.contains(value));
};

CustomSet.prototype.empty = function empty() {
  return !this.set.length;
};

CustomSet.prototype.eql = function eql(customSet) {
  if(this.size() !== customSet.size()) return false;
  return this.set.every(value => customSet.contains(value));
};

CustomSet.prototype.intersection = function intersection(customSet) {
  let common = this.set.reduce(
    (common, value) => {
      if(customSet.contains(value)) common.push(value);
      return common;
    },[]);
  return new CustomSet(common);
};

CustomSet.prototype.size = function size() {
  return this.set.length;
};

CustomSet.prototype.subset = function subset(customSet) {
  return customSet.toList().every(value => this.contains(value));
};

CustomSet.prototype.toList = function toList() {
  return this.set;
};

CustomSet.prototype.union = function union(customSet) {
  this.set.forEach(value => customSet.add(value));
  return customSet;
};

function smallestToGreatest(a, b) {
  return a - b;
}

function noDuplicates(value, index, array) {
  let nextValue = array[index + 1];
  if(value !== nextValue) return value;
}

function isContained(array, searchValue) {
  return array.some(value => value === searchValue);
}
