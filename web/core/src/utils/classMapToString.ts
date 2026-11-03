/**
 * Converts a class map into a class string
 * @param classMap - Map of class names to flags
 * @returns Space-separated class names
 */
export default (classMap: Record<string, boolean>) => {
  return Object.entries(classMap)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(' ')
}
