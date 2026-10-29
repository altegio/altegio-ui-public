import type { ComplexAttributeConverter } from 'lit'

/**
 * Converts a string attribute to a boolean
 */
export const booleanConverter: ComplexAttributeConverter<boolean> = {
  toAttribute: (value: boolean) => value ? '' : null,
  fromAttribute: (value: string) => {
    const truthyValues = ['true', '']

    return truthyValues.includes(value)
  },
}

/**
 * Converts an array between the attribute and the property
 * in both directions:
 *
 * array-attribute='1, "2", 3' to [1, '2', 3]
 */
export const arrayConverter: ComplexAttributeConverter<unknown[]> = {
  toAttribute: (array: unknown[]) => {
    return JSON.stringify(array).substring(1, JSON.stringify(array).length - 1)
  },
  fromAttribute: (value: string) => {
    try {
      return JSON.parse(`[${value}]`) as unknown[]
    } catch {
      return []
    }
  },
}

/**
 * Converts a string attribute to a number
 */
export const numberConverter: ComplexAttributeConverter<number> = {
  toAttribute: (value: number) => String(value),
  fromAttribute: (value: string) => parseFloat(value),
}
