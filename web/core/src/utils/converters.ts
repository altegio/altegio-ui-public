import type { ComplexAttributeConverter } from 'lit'

/**
 * Преобразование строки в булево значение
 */
export const booleanConverter: ComplexAttributeConverter<boolean> = {
  toAttribute: (value: boolean) => value ? '' : null,
  fromAttribute: (value: string) => {
    const truthyValues = ['true', '']

    return truthyValues.includes(value)
  },
}

/**
 * Двунаправленное преобразование массива из атрибута
 * в свойство следующего формата:
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
 * Преобразование строки в число
 */
export const numberConverter: ComplexAttributeConverter<number> = {
  toAttribute: (value: number) => String(value),
  fromAttribute: (value: string) => parseFloat(value),
}
