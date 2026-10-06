/**
 * Функция определяет пустой слот или нет у WebComponents
 */
export const hasSlotContent = (el: HTMLSlotElement) => {
  const slotElems = el.assignedNodes({ flatten: true })
  return slotElems.some((node) => {
    if (!(node instanceof HTMLElement)) return false
    return node.hasAttribute('slot') && (!node.dataset.hidden || node.dataset.hidden !== 'true')
  })
}
