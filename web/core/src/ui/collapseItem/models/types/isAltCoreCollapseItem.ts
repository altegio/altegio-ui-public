import { AltCoreCollapseItem } from '../../CollapseItem.core'

export const isAltCoreCollapseItem = (element: Element | EventTarget | null): element is AltCoreCollapseItem => {
  return element instanceof AltCoreCollapseItem
}
