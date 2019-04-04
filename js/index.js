var data = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
]

var score = 0

var randomCell = (function() {
  function cellAvailable() {
    let count = 0

    for (i = 0; i <= 3; i++) {
      for (j = 0; j <= 3; j++) {
        if (data[i][j] === null) count++
      }
    }

    if (count > 0) return true

    return false
  }

  function getRandomCell() {
    let x = Math.floor(Math.random() * 4)
    let y = Math.floor(Math.random() * 4)
    console.log(x, y)
    console.log(data[x][y])
    if (data[x][y] === null) return { x, y }
    else return getRandomCell()
  }

  function writeToCell() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        document
          .getElementById('cell' + String(i) + String(j))
          .classList.remove(
            'two',
            'four',
            'eight',
            'sixteen',
            'thirtytwo',
            'sixtyfour',
            'onetwentyeight',
          )
        if (data[i][j] !== null) {
          document.getElementById('cell' + String(i) + String(j)).innerHTML = data[i][j]
          if (data[i][j] === 2)
            document.getElementById('cell' + String(i) + String(j)).classList.add('two')
          else if (data[i][j] === 4)
            document.getElementById('cell' + String(i) + String(j)).classList.add('four')
          else if (data[i][j] === 8)
            document.getElementById('cell' + String(i) + String(j)).classList.add('eight')
          else if (data[i][j] === 16)
            document.getElementById('cell' + String(i) + String(j)).classList.add('sixteen')
          else if (data[i][j] === 32)
            document.getElementById('cell' + String(i) + String(j)).classList.add('thirtytwo')
          else if (data[i][j] === 64)
            document.getElementById('cell' + String(i) + String(j)).classList.add('sixtyfour')
          else if (data[i][j] >= 128 && data[i][j] <= 2048)
            document.getElementById('cell' + String(i) + String(j)).classList.add('onetwentyeight')
          else document.getElementById('cell' + String(i) + String(j)).classList.add('higher')
        } else {
          document.getElementById('cell' + String(i) + String(j)).innerHTML = ''
        }
      }
    }
    document.getElementById('score').innerHTML = score
  }

  return {
    getRandomCell: getRandomCell,
    writeToCell: writeToCell,
    cellAvailable: cellAvailable,
  }
})()

startGame()

function startGame() {
  let randomCell1 = randomCell.getRandomCell()
  data[randomCell1.x][randomCell1.y] = 2
  let randomCell2 = randomCell.getRandomCell()
  data[randomCell2.x][randomCell2.y] = 2

  let cell1 = document.getElementById('cell' + String(randomCell1.x) + String(randomCell1.y))
  document
    .getElementById('cell' + String(randomCell1.x) + String(randomCell1.y))
    .classList.add('two')
  cell1.innerHTML = '2'

  let cell2 = document.getElementById('cell' + String(randomCell2.x) + String(randomCell2.y))
  document
    .getElementById('cell' + String(randomCell2.x) + String(randomCell2.y))
    .classList.add('two')
  cell2.innerHTML = '2'

  console.log(data)

  document.addEventListener('keydown', e => {
    if (e.keyCode === 38) {
      console.log('Up')
      let count = 0

      for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (data[i][j] !== null) {
            console.log('In here')
            console.log(i, j)
            //move when previous cell is null
            if (data[i - 1][j] === null) {
              let newI = i - 1
              while (newI !== 0) {
                if (data[newI - 1][j] === null) {
                  newI -= 1
                } else break
              }
              //cell before null equals the value present in the moved cell
              if (newI - 1 >= 0 && data[newI - 1][j] === data[i][j]) {
                data[newI - 1][j] += data[i][j]
                data[i][j] = null
                count++
                score += data[newI - 1][j]
              }
              //cell before null does not equal the value present in the moved cell
              else {
                data[newI][j] = data[i][j]
                data[i][j] = null
                count++
              }
            }
            //previous cell value is equal to the value present in the moved cell
            else if (data[i - 1][j] === data[i][j]) {
              data[i - 1][j] = data[i - 1][j] + data[i][j]
              data[i][j] = null
              count++
              score += data[i - 1][j]
            }
          }
        }
      }
      console.log(data)
      //if no move possible, random cell is not generated
      if (count > 0 && randomCell.cellAvailable()) {
        let newCell = randomCell.getRandomCell()
        data[newCell.x][newCell.y] = 2
      }
      randomCell.writeToCell()
    } else if (e.keyCode === 40) {
      console.log('Down')
      let count = 0

      for (let i = 2; i >= 0; i--) {
        for (let j = 0; j < 4; j++) {
          if (data[i][j] !== null) {
            console.log('In here')
            console.log(i, j)
            //move when next cell is null
            if (data[i + 1][j] === null) {
              let newI = i + 1
              while (newI !== 3) {
                if (data[newI + 1][j] === null) {
                  newI += 1
                } else break
              }
              //cell before null equals the value present in the moved cell
              if (newI + 1 <= 3 && data[newI + 1][j] === data[i][j]) {
                data[newI + 1][j] += data[i][j]
                data[i][j] = null
                count++
                score += data[newI + 1][j]
              }
              //cell before null does not equal the value present in the moved cell
              else {
                data[newI][j] = data[i][j]
                data[i][j] = null
                count++
              }
            }
            //next cell value is equal to the value present in the moved cell
            else if (data[i + 1][j] === data[i][j]) {
              data[i + 1][j] = data[i + 1][j] + data[i][j]
              data[i][j] = null
              count++
              score += data[i + 1][j]
            }
          }
        }
      }
      console.log(data)
      //if no move possible, random cell is not generated
      if (count > 0 && randomCell.cellAvailable()) {
        let newCell = randomCell.getRandomCell()
        data[newCell.x][newCell.y] = 2
      }
      randomCell.writeToCell()
    } else if (e.keyCode === 37) {
      console.log('Left')
      let count = 0

      for (let j = 1; j < 4; j++) {
        for (let i = 0; i < 4; i++) {
          if (data[i][j] !== null) {
            console.log('In here')
            console.log(i, j)
            //move when previous cell is null
            if (data[i][j - 1] === null) {
              let newJ = j - 1
              while (newJ !== 0) {
                if (data[i][newJ - 1] === null) {
                  newJ -= 1
                } else break
              }
              //cell before null equals the value present in the moved cell
              if (newJ - 1 >= 0 && data[i][newJ - 1] === data[i][j]) {
                data[i][newJ - 1] += data[i][j]
                data[i][j] = null
                count++
                score += data[i][newJ - 1]
              }
              //cell before null does not equal the value present in the moved cell
              else {
                data[i][newJ] = data[i][j]
                data[i][j] = null
                count++
              }
            }
            //previous cell value is equal to the value present in the moved cell
            else if (data[i][j - 1] === data[i][j]) {
              data[i][j - 1] = data[i][j - 1] + data[i][j]
              data[i][j] = null
              count++
              score += data[i][j - 1]
            }
          }
        }
      }
      console.log(data)
      //if no move possible, random cell is not generated
      if (count > 0 && randomCell.cellAvailable()) {
        let newCell = randomCell.getRandomCell()
        data[newCell.x][newCell.y] = 2
      }
      randomCell.writeToCell()
    } else if (e.keyCode === 39) {
      console.log('Right')
      let count = 0

      for (let j = 2; j >= 0; j--) {
        for (let i = 0; i < 4; i++) {
          if (data[i][j] !== null) {
            console.log('In here')
            console.log(i, j)
            //move when next cell is null
            if (data[i][j + 1] === null) {
              let newJ = j + 1
              while (newJ !== 3) {
                if (data[i][newJ + 1] === null) {
                  newJ += 1
                } else break
              }
              //cell before null equals the value present in the moved cell
              if (newJ + 1 <= 3 && data[i][newJ + 1] === data[i][j]) {
                data[i][newJ + 1] += data[i][j]
                data[i][j] = null
                count++
                score += data[i][newJ + 1]
              }
              //cell before null does not equal the value present in the moved cell
              else {
                data[i][newJ] = data[i][j]
                data[i][j] = null
                count++
              }
            }
            //next cell value is equal to the value present in the moved cell
            else if (data[i][j + 1] === data[i][j]) {
              data[i][j + 1] = data[i][j + 1] + data[i][j]
              data[i][j] = null
              count++
              score += data[i][j + 1]
            }
          }
        }
      }
      console.log(data)
      //if no move possible, random cell is not generated
      if (count > 0 && randomCell.cellAvailable()) {
        let newCell = randomCell.getRandomCell()
        data[newCell.x][newCell.y] = 2
      }
      randomCell.writeToCell()
    }
  })
}
