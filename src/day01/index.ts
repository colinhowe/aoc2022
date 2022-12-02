import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map(s => s.length ? Number.parseInt(s, 10) : undefined);
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const [overallMax] = input.reduce(([lastMax, sumSoFar], nextInput) => {
    if (nextInput) {
      const newSum = sumSoFar + nextInput;
      return [Math.max(newSum, lastMax), newSum];
    } else {
      return [lastMax, 0];
    }
  }, [0, 0]);

  return overallMax.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
        expected: "24000",
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
