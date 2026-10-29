/**
 * Creates a sequence of integers from 1 to n
 * @param {number} n - Last number of the sequence
 * @returns {number[]} Integers from 1 to n
 * @example
 * integerSequence(3) // [1, 2, 3]
 */
export const integerSequence = (n: number) => Array.from(Array(parseInt(String(n))).keys()).map((i) => i + 1)
