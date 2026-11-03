import { AltCoreTableRow } from '../../TableRow.core'

export const isAltCoreTableRow = (element: Element | EventTarget | null): element is AltCoreTableRow => {
  return element instanceof AltCoreTableRow
}
