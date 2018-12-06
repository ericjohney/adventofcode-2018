const fs = require("fs");
const { fill, range, max, maxBy, sum } = require("lodash");

const logs = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .sort();

// sum sleep minutes
const guards = new Map();
let guardId = null;
for (let i = 0; i < logs.length; i++) {
  const newGuardMatch = logs[i].match(/Guard \#(\d+)/);
  if (newGuardMatch) {
    guardId = newGuardMatch[1];
    if (!guards.has(guardId)) {
      guards.set(guardId, fill(Array(60), 0));
    }
    continue;
  }
  if (logs[i].match(/wakes up/)) {
    const minRegex = /\d{2}:(\d{2})/;
    const [, endMin] = logs[i].match(minRegex);
    const [, startMin] = logs[i - 1].match(minRegex);
    range(startMin, endMin).forEach(min => guards.get(guardId)[min]++);
  }
}

(function() {
  const guardId = maxBy(Array.from(guards.keys()), id => sum(guards.get(id)));
  const min = maxBy(range(0, 59), min => guards.get(guardId)[min]);
  console.log(guardId, min, guardId * min);
})();

// part 2
(function part2() {
  const guardId = maxBy(Array.from(guards.keys()), id => max(guards.get(id)));
  const maxSleepMin = max(guards.get(guardId));
  const minute = guards.get(guardId).indexOf(maxSleepMin);
  console.log(guardId, minute, guardId * minute);
})();
