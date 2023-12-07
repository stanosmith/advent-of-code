import _ from 'lodash'

class Day {
  parseInput(input: string) {
    return _.filter(input.split('\n'))
  }

  input(test?: boolean) {
    return test ? this.parseInput(getTestInput()) : this.parseInput(getInput())
  }

  solve(test?: boolean) {
    return {
      partOne: partOne(this.input(test)),
      partTwo: partTwo(this.input(test)),
    }
  }
}

const regexSymbols = /[^\w\s.]/g
const regexDigits = /\d+/g
const mapMatches = (regexMatch: RegExpMatchArray) => {
  const match = regexMatch[0]
  return {
    match,
    indexBegin: regexMatch.index,
    indexEnd: regexMatch.index + match.length,
  }
}

const day = new Day()
console.log(day.solve(true))

function partOne(input: string[]) {
  return _.sum(
    input.map((lineCurrent, index, allLines) => {
      const lines = {
        lineAbove: allLines[index - 1] || '',
        lineCurrent,
        lineBelow: allLines[index + 1] || '',
      }
      const symbols = _.mapValues(lines, (value: string) =>
        _.flatMap([...value.matchAll(regexSymbols)], mapMatches),
      )
      const digits = _.mapValues(lines, (value: string) => [
        _.flatMap([...value.matchAll(regexDigits)], mapMatches),
      ])
      return lines
    }),
  )
}

function partTwo(input: string[]) {
  return input
}

function getTestInput() {
  return `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
}
function getInput() {
  return ``
}
