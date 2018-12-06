const fs = require("fs");
const { range, min } = require("lodash");

const input = fs.readFileSync("input.txt").toString();

function reactPolymer(polymer) {
  const chars = polymer.split("");
  const reacted = chars.reduce((result, letter) => {
    if (!result.length) return [letter];
    const last = result[result.length - 1];
    if (letter !== last && letter.toUpperCase() === last.toUpperCase()) {
      result.pop();
    } else {
      result.push(letter);
    }
    return result;
  }, []);
  return reacted.join("");
}

// part 1
(function() {
  const polymer = reactPolymer(input);
  console.log(polymer.length);
})();

// part 2
(function() {
  const letters = range("A".charCodeAt(0), "Z".charCodeAt(0)).map(c =>
    String.fromCharCode(c)
  );
  const polymerLengths = letters.map(letter => {
    const polymer = input.replace(new RegExp(letter, "ig"), "");
    return reactPolymer(polymer).length;
  });
  console.log(min(polymerLengths));
})();
