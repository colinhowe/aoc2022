import run from "aocrunner";

const parseInput = (rawInput: string) => {
  // Add a terminal value so that we don't have to worry about dealing with the end of the list later
  return [...rawInput.split("\n").map(s => s.length ? Number.parseInt(s, 10) : undefined), undefined];
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

  const [allSums] = input.reduce(([allElfCalories, sumSoFar], nextInput) => {
    if (nextInput) {
      return [allElfCalories, sumSoFar + nextInput];
    } else {
      return [[...allElfCalories, sumSoFar], 0];
    }
  }, [[] as number[], 0]);

  allSums.sort((a, b) => b - a);
  console.log(allSums)

  return (allSums[0] + allSums[1] + allSums[2]).toString();
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
        expected: "45000",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
