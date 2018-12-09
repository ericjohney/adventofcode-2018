const fs = require("fs");
const { range, sum } = require("lodash");

const input = fs.readFileSync("input.txt").toString();

function getNextNode(numbers) {
  const numChildren = numbers.shift();
  const numMeta = numbers.shift();

  const children = range(numChildren).map(_ => getNextNode(numbers));

  const metadata = [];
  for (let i = 0; i < numMeta; i++) {
    metadata.push(parseInt(numbers.shift(), 10));
  }
  return {
    children,
    metadata
  };
}
const rootNode = getNextNode(input.split(" "));

// part 1
(function() {
  function sumMetadata(node) {
    const currentSum = sum(node.metadata);
    return currentSum + sum(node.children.map(c => sumMetadata(c)))
  }
  console.log(sumMetadata(rootNode))
})();

// part 2
(function() {
  function getValue(node) {
    let value = 0;
    if (node.children.length) {
      node.metadata.forEach(index => {
        const child = node.children[index - 1]
        if (child) {
          value += getValue(child)
        }
      })
    } else {
      value = sum(node.metadata)
    }
    return value
  }
  console.log(getValue(rootNode))
})();