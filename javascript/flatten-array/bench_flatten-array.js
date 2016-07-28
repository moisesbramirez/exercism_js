"use strict";

var Benchmark = require("benchmark");
var suite = new Benchmark.Suite();
var Flattener = require("./flatten-array");
var flat = new Flattener();

suite.add("Flattener#flatten", function() {
  flat.flatten([0, 2, [[2, 3], 8, [[100]], null, [[null]]], -2], []);
})
.add("Flattener#flatten1", function() {
  flat.flatten1([0, 2, [[2, 3], 8, [[100]], null, [[null]]], -2], []);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });
