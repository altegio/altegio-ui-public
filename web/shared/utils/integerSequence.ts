/**
 * Создает последовательность целых чисел от 1 до n
 * @param {number} n - Конечное число последовательности
 * @returns {number[]} Массив целых чисел от 1 до n
 * @example
 * integerSequence(3) // [1, 2, 3]
 */
export const integerSequence = (n: number) => Array.from(Array(parseInt(String(n))).keys()).map((i) => i + 1)
