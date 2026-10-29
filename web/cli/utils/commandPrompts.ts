import type { EPlatform } from '~cli/types'
import { isKebabCase } from '~cli/utils/regex'

/**
 * Builds prompt choices from an enum object
 * @template {EPlatform} T - Enum type (EPlatform)
 * @param {Record<string, T>} enumObject - Enum object to convert into choices
 * @returns {Array<{name: T, value: T}>} Choices for the prompt
 */
export const createChoices = <T extends EPlatform>(enumObject: Record<string, T>) => Object.values(enumObject).map((value) => ({
  name: value,
  value: value,
}))

/**
 * Validates a component name
 * @param {string} value - Value to validate
 * @returns {true | string} true for a valid name, otherwise the error message
 */
export const validateComponentName = (value: string) => {
  if (!value) return 'Component name cannot be empty'
  if (!isKebabCase(value)) return 'Use kebab-case'
  return true
}
