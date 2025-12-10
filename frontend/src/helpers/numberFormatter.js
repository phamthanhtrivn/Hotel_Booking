export const calculateAverage = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return 0;
  }

  const validNumbers = arr.filter(
    (num) => typeof num === "number" && !isNaN(num) && isFinite(num)
  );

  if (validNumbers.length === 0) {
    return 0;
  }

  const sum = validNumbers.reduce((total, num) => total + num, 0);

  return sum / validNumbers.length;
};
