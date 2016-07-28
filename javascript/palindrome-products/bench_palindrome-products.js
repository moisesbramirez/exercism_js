"use strict";

let Bench = require("benchmark");
let suite = new Bench.Suite();

function forLoop(max, min) {
  let mx = max;
  let pairs =[];
  for(let f1 = min; f1 <= mx; f1++) {
    for(let f2 = min; f1 <= mx; f2++) {
      let prod = f1 * f2;
      pairs.push([f1,f2]);
    }
  }
  console.log(pairs);
  return pairs;
}

function whileLoop(max, min) {
  let mx = max;
  let pairs = [];
  while(mx > min) {
    let tmp = max;
    while(tmp > min) {
      let prod = tmp * mx;
      pairs.push([tmp,mx])
      tmp--;
    }
    mx--;
  }
  console.log(pairs);
  return pairs;
}

suite.add("For Loop", () => {
  forLoop(3,1);
}).add("While", () => {
  whileLoop(3,1);
}).on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });
