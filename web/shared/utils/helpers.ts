import { camel } from 'radash'
import type { TAddPrefixToObject } from '~shared/types/utils'

/**
 * Removes the given properties from an object
 * @param obj - Source object
 * @param args - Keys to remove
 * @returns A new object without the given properties
 */
export const omit = <T extends Record<string, unknown>, K extends (keyof T)[]>(
  obj: T,
  ...args: K
) => {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !args.includes(key))) as Omit<T, K[number]>
}

/**
 * Returns an object with only the given properties
 * @param obj - Source object
 * @param args - Keys to keep
 * @returns A new object with only the given properties
 */
export const pick = <T extends Record<string, unknown>, K extends (keyof T)[]>(
  obj: T,
  ...args: K
) => {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => args.includes(key))) as Pick<T, K[number]>
}

/**
 * Removes all comments and whitespace from the element's HTML
 * @param element - HTML element
 * @returns Cleaned-up HTML
 */
export const cleanupInnerHTML = (element: HTMLElement) => {
  return element.innerHTML.replace(
    /<!--[\s\S]*?(?:-->|$)/g,
    '',
  ).trim()
}

export type { TAddPrefixToObject } from '~shared/types/utils'

/**
 * Adds a prefix to the object keys
 * @param source - Source object
 * @param prefix - Prefix
 * @returns A new object with prefixed keys
 */
export const addPrefixToObjectKeys = <T, P extends string>(source: T, prefix: P): TAddPrefixToObject<T, P> => {
  return Object.fromEntries(Object.entries(source as Record<string, unknown>).map(([
    key,
    value,
  ]) => [
    camel(`${prefix} ${key}`),
    value,
  ])) as TAddPrefixToObject<T, P>
}

/**
 * Prevents the default action and stops propagation of an event
 * @param event - Event
 */
export const preventAndStopEvent = (event: Event) => {
  event.preventDefault()
  event.stopImmediatePropagation()
}

/**
 * Builds a regular expression that matches integers in the range [min, max]
 * @param min Minimum value (inclusive)
 * @param max Maximum value (inclusive)
 * @returns RegExp
 */
export function createNaturalNumberRegex(min: number, max: number): RegExp {
  if (max < min) throw new Error('max must be >= min')

  // Small ranges: list every allowed number
  if (max - min < 100) {
    const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min)
    return new RegExp(`^(${numbers.join('|')}|-?\\d*)$`)
  }

  // Large ranges: match any integer here and check the range in code
  return /^-?\d*$/
}
