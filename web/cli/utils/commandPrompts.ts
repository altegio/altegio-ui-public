import type { EPlatform } from '~cli/types'
import { isKebabCase } from '~cli/utils/regex'

/**
 * Создает массив опций для выбора из enum объекта
 * @template {EPlatform} T - Тип enum (EPlatform)
 * @param {Record<string, T>} enumObject - Enum объект для преобразования в опции
 * @returns {Array<{name: T, value: T}>} Массив опций для выбора
 */
export const createChoices = <T extends EPlatform>(enumObject: Record<string, T>) => Object.values(enumObject).map((value) => ({
  name: value,
  value: value,
}))

/**
 * Проверяет корректность названия компонента
 * @param {string} value - Проверяемое значение
 * @returns {true | string} true если значение корректно, текст ошибки если нет
 */
export const validateComponentName = (value: string) => {
  if (!value) return 'Название не может быть пустым'
  if (!isKebabCase(value)) return 'Используйте формат kebab-case'
  return true
}
