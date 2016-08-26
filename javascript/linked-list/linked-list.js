"use strict";

module.exports = LinkedList;

function LinkedList() {
  this.start = null;
  this.length = 0;
}

LinkedList.prototype.push = function push(value) {
  let newNode = new Node(value);
  if(!this.start) {
    this.start = newNode;
  } else {
    let last = getLast(this.start);
    link(last, newNode);
  }
  this.length++;
};

LinkedList.prototype.unshift = function unshift(value) {
  let newNode = new Node(value);
  if(!this.start){
    this.start = newNode
  } else {
    this.start.previous = newNode;
    newNode.next = this.start;
    this.start = newNode;
  }
  this.length++;
};

LinkedList.prototype.pop = function pop() {
  let last = getLast(this.start);
  (!last.previous)?
    this.start = null: unlink(last);
  this.length--;
  return last.value;
};

LinkedList.prototype.shift = function shift() {
  let value = this.start.value;
  if(this.length === 1) {
    this.start = null;
  } else {
    let second = this.start.next;
    this.start.next = null;
    this.start = second;
    this.start.previous = null;
  }
  this.length--;
  return value;
};

LinkedList.prototype.count = function count() {
  return this.length;
};

LinkedList.prototype.delete = function(value) {
  if(this.length === 1) {
    this.start = null;
  } else {
    let node = findLastOf(value, this.start);
    node.previous.next = node.next;
    node.next.previous = node.previous;
  }
  this.length--;
};

function findLastOf(value, start) {
  let last = getLast(start);
  let found = false;
  while(last.previous && !found) {
    (last.value === value)?
      found = true: last = last.previous;
  }
  return last;
}

function getLast(start) {
  let current = start;
  while(current.next) {
    current = current.next;
  }
  return current;
}

function link(node, newNode) {
  node.next = newNode;
  newNode.previous = node;
}

function unlink(node) {
  node.previous.next = null;
  node.previous = null;
}

function Node(value) {
  this.value = value;
  this.next = null;
  this.previous = null;
}
