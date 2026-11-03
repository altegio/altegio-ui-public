export const isClickOutside = (event: MouseEvent, element: Element): boolean => {
  const path = event.composedPath()
  return !path.includes(element)
}
