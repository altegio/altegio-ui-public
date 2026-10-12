/**
 * Преобразует объект классов в строку
 * @param classMap - Объект классов
 * @returns Строка с классами
 */
export default (classMap: Record<string, boolean>) => {
  return Object.entries(classMap)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(' ')
}
