const fs = require("fs");
const { maxBy, minBy, groupBy, max, sum } = require("lodash");

const points = fs
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(point =>
    point
      .trim()
      .split(", ")
      .map(i => parseInt(i, 10))
  );

function manhattanDistance(x1, y1, x2, y2) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

const maxX = maxBy(points, 0)[0] + 1;
const maxY = maxBy(points, 1)[1] + 1;

// part 1
(function() {
  const edges = new Set();
  const areas = Array(points.length);
  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      const distances = points.map(p => manhattanDistance(x, y, p[0], p[1]));
      const counts = groupBy(distances);
      const minPointId = minBy(Array.from(distances.keys()), i => distances[i]);

      if (counts[distances[minPointId]].length == 1) {
        if (x === 0 || y === 0 || x >= maxX - 1 || y >= maxY - 1) {
          edges.add(minPointId);
        }
        const area = areas[minPointId] || 0;
        areas[minPointId] = area + 1;
      }
    }
  }
  const areasIfNotEdge = areas.filter((_, i) => !edges.has(i));
  const maxArea = max(areasIfNotEdge);
  console.log(maxArea);
})();

// part 2
(function() {
  let region = 0;
  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      const distances = points.map(p => manhattanDistance(x, y, p[0], p[1]));
      const sumOfDistances = sum(distances);
      if (sumOfDistances < 10000) {
        region += 1;
      }
    }
  }
  console.log(region);
})();
