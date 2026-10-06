import { YCoreTableRow } from '../../TableRow.core'

export const isYCoreTableRow = (element: Element | EventTarget | null): element is YCoreTableRow => {
  return element instanceof YCoreTableRow
}
