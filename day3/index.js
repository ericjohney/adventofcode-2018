const fs = require('fs');

const input = fs.readFileSync('input.txt');
const format = /\#(\d+) \@ (\d+),(\d+)\: (\d+)x(\d+)/g

let line;
let fabric = new Map()
let pieces = new Map()
// part 1
while (line = format.exec(input)) {
  const [ , id, left, top, width, height ] = line.map(m => parseInt(m, 10))
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const key = `${left + i},${top + j}`
      const ids = fabric.get(key) || new Set()
      fabric.set(key, ids.add(id))
      const keySet = pieces.get(id) || new Set()
      pieces.set(id, keySet.add(key))
    }
  }
}
console.log(Array.from(fabric.values()).filter(v => v.size > 1).length)

// part 2
pieces.forEach((points, id) => {
  let isOverlapping = false;
  points.forEach(point => {
    isOverlapping = isOverlapping || fabric.get(point).size > 1
  })
  if (!isOverlapping) {
    console.log(id)
  }
})