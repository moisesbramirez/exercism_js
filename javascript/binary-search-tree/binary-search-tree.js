"use strict";

module.exports = BinarySearchTree;

function BinarySearchTree(value) {
  Node.call(this, value);
}

BinarySearchTree.prototype.insert = function insert(value) {
  recursiveInsert(this, value);
};

BinarySearchTree.prototype.each = function each(callback) {
  traverse(this, callback);
};

function traverse(node, cb) {
  if(node.left) traverse(node.left, cb);
  cb(node.data);
  if(node.right) traverse(node.right, cb);
}

function recursiveInsert(node, value) {
  if(value <= node.data)
    return (node.left) ?
      recursiveInsert(node.left, value):
      node.left = new Node(value);
  return (node.right) ?
    recursiveInsert(node.right, value):
    node.right = new Node(value);
}

function Node(data) {
  this.data = data;
  this.left = null;
  this.right = null;
}
