export const median = (numbers: number[]) => {
  const middleIndex = Math.floor(numbers.length / 2);
  const sorted = [...numbers].sort((a, b) => a - b);
  const isEven = sorted.length % 2 === 0;
  return isEven
    ? (sorted[middleIndex] + sorted[middleIndex - 1]) / 2
    : sorted[middleIndex];
};
