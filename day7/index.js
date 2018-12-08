const fs = require("fs");
const { includes } = require("lodash");

const input = fs.readFileSync("input.txt").toString();

const format = /Step (\w) .* before step (\w)/g;
let line;
const steps = new Map();
const dependencies = new Map();
while ((line = format.exec(input))) {
  const current = dependencies.get(line[2]) || [];
  current.push(line[1]);
  dependencies.set(line[2], current);
  steps.set(line[1], false);
  steps.set(line[2], false);
}

function getAvailableSteps(steps) {
  const uncompletedSteps = Array.from(steps.keys())
    .sort()
    .filter(step => !steps.get(step));
  return uncompletedSteps.filter(step => {
    const stepDependencies = dependencies.get(step) || [];
    return stepDependencies.every(s => steps.get(s));
  });
}

(function() {
  const outputOrder = [];
  const completedSteps = new Map(steps);
  while ((step = getAvailableSteps(completedSteps).shift())) {
    outputOrder.push(step);
    completedSteps.set(step, true);
  }
  console.log(outputOrder.join(""));
})();

(function() {
  const MAX_WORKERS = 5;
  const BASE_STEP_TIME = 60;

  const completedSteps = new Map(steps);
  const queue = getAvailableSteps(completedSteps);
  const workers = new Map();
  let clock = 0;
  while (queue.length || Array.from(workers.keys()).length) {
    const availableWorkers = MAX_WORKERS - Array.from(workers.keys()).length;
    for (let i = 0; i < availableWorkers && queue.length; i++) {
      const step = queue.shift();
      const time = step.charCodeAt(0) - 64 + BASE_STEP_TIME;
      workers.set(step, time);
    }
    const activeSteps = Array.from(workers.keys());
    workers.forEach((time, step) => {
      if (time > 1) {
        workers.set(step, time - 1);
      } else {
        workers.delete(step);
        completedSteps.set(step, true);
        const nextAvailable = getAvailableSteps(completedSteps)
          .filter(s => !includes(activeSteps, s))
          .filter(s => !includes(queue, s));
        nextAvailable.forEach(step => queue.push(step));
      }
    });
    clock++;
  }
  console.log(clock);
})();
