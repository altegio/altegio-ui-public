/**
 * Whether an element lays out right to left, from a `dir` attribute or the CSS direction it inherits.
 * Arrow keys that move along a row follow the layout: ArrowRight moves to the previous item in a right-to-left layout.
 * @param element - Element that handles the arrow keys
 * @returns {boolean} Whether the layout is right to left
 */
export const isRtl = (element: Element): boolean => getComputedStyle(element).direction === 'rtl'

/**
 * The arrow key as it moves in a left-to-right layout: ArrowLeft and ArrowRight swap in a right-to-left one,
 * so a key map written for left to right also serves right to left
 * @param key - Key of a keyboard event
 * @param element - Element that handles the key
 * @returns {string} The key, with ArrowLeft and ArrowRight swapped in a right-to-left layout
 */
export const getInlineKey = (key: string, element: Element): string => {
  if (key !== 'ArrowLeft' && key !== 'ArrowRight') return key

  if (!isRtl(element)) return key

  return key === 'ArrowLeft' ? 'ArrowRight' : 'ArrowLeft'
}
