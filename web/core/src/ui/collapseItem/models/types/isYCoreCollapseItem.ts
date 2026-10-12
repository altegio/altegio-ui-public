import { YCoreCollapseItem } from '../../CollapseItem.core'

export const isYCoreCollapseItem = (element: Element | EventTarget | null): element is YCoreCollapseItem => {
  return element instanceof YCoreCollapseItem
}
