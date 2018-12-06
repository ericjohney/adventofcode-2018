const fs = require("fs");
const { sum } = require("lodash");

const input = fs.readFileSync("input.txt").toString();
const numbers = input
  .trim()
  .split("\n")
  .map(i => parseInt(i.trim(), 10));

// part 1
console.log(sum(numbers));

// part 2
const freqs = new Set();
let currentFreq = 0;
for (
  let i = 0;
  !freqs.has(currentFreq + numbers[i]);
  i = (i + 1) % numbers.length
) {
  currentFreq += numbers[i];
  freqs.add(currentFreq);
}
console.log(currentFreq);
