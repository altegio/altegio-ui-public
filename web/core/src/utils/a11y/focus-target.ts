const FOCUSABLE_SELECTOR = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'

/** Children in the rendered (flat) tree: a shadow root's content, or the elements assigned to a slot */
const getRenderedChildren = (element: Element): Element[] => element instanceof HTMLSlotElement
  ? element.assignedElements({ flatten: true })
  : Array.from(element.shadowRoot?.children ?? element.children)

const findFocusable = (element: Element): Element | undefined => {
  if (element.matches(FOCUSABLE_SELECTOR)) return element

  for (const child of getRenderedChildren(element)) {
    const focusable = findFocusable(child)
    if (focusable) return focusable
  }

  return undefined
}

/**
 * Element that takes keyboard focus for an element: the element itself when it is focusable,
 * otherwise the first focusable element rendered inside it, such as the native button of a button component
 * or the button in a wrapper element.
 * ARIA attributes that describe a slotted activator belong on this element: screen readers read the focused one.
 * @param element - Element, such as an activator slotted into a tooltip
 * @returns {Element} The element itself, or the focusable element inside it
 */
export const getFocusTarget = (element: Element): Element => findFocusable(element) ?? element

type TUpdatingElement = Element & { updateComplete: Promise<unknown> }

/**
 * Waits until a Lit activator, or the Lit elements in a wrapper, have rendered, so that the focusable element inside exists
 * @param element - Element that may be or contain Lit elements
 * @returns {Promise<unknown>} Resolves once the elements have rendered
 */
export const whenRendered = (element: Element): Promise<unknown> => {
  const updated = 'updateComplete' in element ? (element as TUpdatingElement).updateComplete : Promise.resolve()

  return updated.then(() => Promise.all(getRenderedChildren(element).map(whenRendered)))
}

/**
 * Focusable elements inside an element, following open shadow roots and slots in tree order
 * @param container - Element to search
 * @returns {HTMLElement[]} Focusable elements that are rendered
 */
export const getFocusableElements = (container: Element): HTMLElement[] => {
  const elements: HTMLElement[] = []
  const visit = (element: Element) => {
    if (element.matches(FOCUSABLE_SELECTOR) && !element.matches(':disabled') && element.getClientRects().length) {
      elements.push(element as HTMLElement)
    }

    getRenderedChildren(element).forEach(visit)
  }

  visit(container)

  return elements
}

/**
 * The native event behind an event that fields re-dispatch, such as `keydown`, `focus` or `blur`:
 * each re-dispatched custom event carries the one it replaces in `detail.event`
 * @param event - Native or re-dispatched event
 * @returns {unknown} The native event, or undefined when a custom event carries none
 */
const getNativeEvent = (event: Event): unknown => {
  let current: unknown = event

  for (let depth = 0; depth < 5 && current instanceof CustomEvent; depth++) {
    current = (current.detail as { event?: unknown } | null)?.event
  }

  return current
}

/**
 * The native key event behind a keydown event: fields re-dispatch key events as custom `keydown` events
 * with the original in `detail.event`, and stop the native one
 * @param event - Native or re-dispatched keydown event
 * @returns {KeyboardEvent | undefined} The native key event
 */
export const getNativeKeyboardEvent = (event: Event): KeyboardEvent | undefined => {
  const native = getNativeEvent(event)

  return native instanceof KeyboardEvent ? native : undefined
}

/**
 * The native focus event behind a focus or blur event that fields re-dispatch
 * @param event - Native or re-dispatched focus or blur event
 * @returns {FocusEvent | undefined} The native focus event, which tells where focus moves in `relatedTarget`
 */
export const getNativeFocusEvent = (event: Event): FocusEvent | undefined => {
  const native = getNativeEvent(event)

  return native instanceof FocusEvent ? native : undefined
}
