const fs = require('fs');

const input = fs.readFileSync('input.txt');
const ids = input.toString().trim().split('\n')

// part 1
let twice = 0
let thrice = 0
ids.forEach(id => {
  const idTotals = new Map()
  id.split('').forEach(letter => {
    const count = idTotals.get(letter) || 0
    idTotals.set(letter, count + 1)
  })
  if (Array.from(idTotals.values()).filter(v => v === 2).length) {
    twice++
  }
  if (Array.from(idTotals.values()).filter(v => v === 3).length) {
    thrice++
  }
})
console.log(twice * thrice)

// part 2
for (let i = 0; i < ids.length; i++) {
  for (let j = i + 1; j < ids.length; j++) {
    const id1 = ids[i].split('')
    const id2 = ids[j].split('')
    if (ids[i] === ids[j]) {
      continue
    }
    let common = ''
    for (let k = 0; k < ids[i].length; k++) {
      if (id1[k] === id2[k]) {
        common += id1[k]
      }
    }
    if (common.length === id1.length - 1) {
      console.log(common)
    }
  }
}