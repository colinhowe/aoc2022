import run from "aocrunner";

enum Hand {
  rock = 1,
  paper = 2,
  scissors = 3,
}

enum Strategy {
  win = 10,
  draw = 11,
  lose = 12,
}

const toHand = (value: string) => ({
  "A": Hand.rock,
  "B": Hand.paper,
  "C": Hand.scissors,
  "X": Hand.rock,
  "Y": Hand.paper,
  "Z": Hand.scissors,
}[value])

const toStrategy = (value: string) => ({
  "X": Strategy.lose,
  "Y": Strategy.draw,
  "Z": Strategy.win,
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


const toHandAndStrategy = (line: string): [Hand, Strategy] => {
  const [v1, v2] = line.split(" ");
  const otherHand = toHand(v1);
  const strategy = toStrategy(v2);
  if (!strategy || !otherHand) {
    throw new Error("bad parse");
  }
return [otherHand, strategy];
}

const determineHand = (otherHand: Hand, strategy: Strategy) => {
  if (strategy === Strategy.draw) {
    return otherHand;
  }
  if (strategy === Strategy.lose) {
    return {
      [Hand.paper]: Hand.rock,
      [Hand.rock]: Hand.scissors,
      [Hand.scissors]: Hand.paper,
    }[otherHand];
  }
  if (strategy === Strategy.win) {
    return {
      [Hand.rock]: Hand.paper,
      [Hand.scissors]: Hand.rock,
      [Hand.paper]: Hand.scissors,
    }[otherHand];
  }
}

const parseInput2 = (rawInput: string) => {
  return rawInput.split("\n").map(toHandAndStrategy)
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const totalScore = input.reduce((scoreSoFar, nextRound) => {
    return scoreSoFar + scoreRound(nextRound[0], nextRound[1]);
  }, 0);

  return totalScore.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput2(rawInput);

  const totalScore = input.reduce((scoreSoFar, [otherHand, strategy]) => {
    const myHand = determineHand(otherHand, strategy);
    if (!myHand) {
      throw new Error("bad state");
    }
    return scoreSoFar + scoreRound(otherHand, myHand);
  }, 0);

  return totalScore.toString();
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
      {
        input: `A Y
B X
C Z`,
        expected: "12",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
