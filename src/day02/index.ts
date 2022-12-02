import run from "aocrunner";

enum Hand {
  rock = 1,
  paper = 2,
  scissors = 3,
}

const toHand = (value: string) => ({
  "A": Hand.rock,
  "B": Hand.paper,
  "C": Hand.scissors,
  "X": Hand.rock,
  "Y": Hand.paper,
  "Z": Hand.scissors,
}[value])

// Does handB win?
const scoreRound = (handA: Hand, handB: Hand) => {
  const winningCombos = [
    [Hand.rock, Hand.scissors],
    [Hand.scissors, Hand.paper],
    [Hand.paper, Hand.rock]
  ]
  const isWin = winningCombos.findIndex((v) => JSON.stringify(v) === JSON.stringify([handB, handA])) !== -1;
  const isDraw = handA === handB;

  return (handB.valueOf() + 
    (isDraw ? 3 : 0) +
    (isWin ? 6 : 0)
  )
}

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map(line => line.split(" ").map(toHand).filter((v): v is Hand => !!v))
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const totalScore = input.reduce((scoreSoFar, nextRound) => {
    return scoreSoFar + scoreRound(nextRound[0], nextRound[1]);
  }, 0);

  return totalScore.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `A Y
B X
C Z`,
        expected: "15",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
