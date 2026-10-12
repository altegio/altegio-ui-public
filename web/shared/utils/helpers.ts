import { camel } from 'radash'
import type { TAddPrefixToObject } from '~shared/types/utils'

/**
 * Удаляет указанные свойства из объекта
 * @param obj - Исходный объект
 * @param args - Массив ключей, которые нужно удалить
 * @returns Новый объект, из которого удалены указанные свойства
 */
export const omit = <T extends Record<string, unknown>, K extends (keyof T)[]>(
  obj: T,
  ...args: K
) => {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !args.includes(key))) as Omit<T, K[number]>
}

/**
 * Возвращает объект, содержащий только указанные свойства
 * @param obj - Исходный объект
 * @param args - Массив ключей, которые нужно включить в результат
 * @returns Новый объект, содержащий только указанные свойства
 */
export const pick = <T extends Record<string, unknown>, K extends (keyof T)[]>(
  obj: T,
  ...args: K
) => {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => args.includes(key))) as Pick<T, K[number]>
}

/**
 * Удаляет все комментарии и пробельные символы из HTML
 * @param element - HTML элемент
 * @returns Очищенный HTML
 */
export const cleanupInnerHTML = (element: HTMLElement) => {
  return element.innerHTML.replace(
    /<!--[\s\S]*?(?:-->|$)/g,
    '',
  ).trim()
}

export type { TAddPrefixToObject } from '~shared/types/utils'

/**
 * Добавляет префикс к ключам объекта
 * @param source - Исходный объект
 * @param prefix - Префикс
 * @returns Новый объект с префиксом к ключам
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
 * Предотвращает и останавливает выполнение события
 * @param event - Событие
 */
export const preventAndStopEvent = (event: Event) => {
  event.preventDefault()
  event.stopImmediatePropagation()
}

/**
 * Генерирует регулярное выражение для проверки целых чисел в диапазоне [min, max]
 * @param min Минимальное значение (включительно)
 * @param max Максимальное значение (включительно)
 * @returns RegExp
 */
export function createNaturalNumberRegex(min: number, max: number): RegExp {
  if (max < min) throw new Error('max должен быть >= min')

  // Если диапазон маленький — просто перечисляем все числа
  if (max - min < 100) {
    const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min)
    return new RegExp(`^(${numbers.join('|')}|-?\\d*)$`)
  }

  // Для больших диапазонов — проверка на целое число, а диапазон проверять кодом
  return /^-?\d*$/
}
