const SENTENCE_END = /[.!?…:]$/

/**
 * Returns the text content assigned to a slot, or its fallback content
 * @param slot - Slot element
 * @returns {string} Text with collapsed whitespace
 */
export const getSlotText = (slot: HTMLSlotElement): string => slot
  .assignedNodes({ flatten: true })
  .map((node) => node.textContent ?? '')
  .join(' ')
  .replace(/\s+/g, ' ')
  .trim()

/**
 * Joins error messages and hints into one accessible description, one sentence each
 * @param errors - Error messages, read first
 * @param hints - Hints such as the annotation text
 * @returns {string | undefined} The description, or undefined when there is nothing to describe
 */
export const getAccessibleDescription = (
  errors: string[] | undefined,
  ...hints: (string | undefined)[]
): string | undefined => {
  const sentences = [
    ...errors ?? [],
    ...hints,
  ]
    .map((text) => text?.replace(/\s+/g, ' ').trim() ?? '')
    .filter(Boolean)
    .map((text) => SENTENCE_END.test(text)
      ? text
      : `${text}.`)

  return sentences.length
    ? sentences.join(' ')
    : undefined
}

/**
 * Whether a field shows errors, for `aria-invalid`
 * @param errors - Error messages
 * @param error - Error state without a message
 * @returns {boolean} True when the field is invalid
 */
export const hasFieldErrors = (errors: string[] | undefined, error: boolean | undefined): boolean => Boolean(errors?.length) || Boolean(error)
