import type { IAltCoreDropdownCellTextExternalProps } from './external'
import type { IAltCoreDropdownCellTextInternalProps } from './internal'

import { createCoreDropdownCellTextExternalProps } from './external'
import { createCoreDropdownCellTextInternalProps } from './internal'

export interface IAltCoreDropdownCellTextProps extends IAltCoreDropdownCellTextExternalProps, IAltCoreDropdownCellTextInternalProps {}

export const createCoreDropdownCellTextProps = (): IAltCoreDropdownCellTextProps => ({
  ...createCoreDropdownCellTextExternalProps(),
  ...createCoreDropdownCellTextInternalProps(),
})
