import type { IYCoreDropdownCellTextExternalProps } from './external'
import type { IYCoreDropdownCellTextInternalProps } from './internal'

import { createCoreDropdownCellTextExternalProps } from './external'
import { createCoreDropdownCellTextInternalProps } from './internal'

export interface IYCoreDropdownCellTextProps extends IYCoreDropdownCellTextExternalProps, IYCoreDropdownCellTextInternalProps {}

export const createCoreDropdownCellTextProps = (): IYCoreDropdownCellTextProps => ({
  ...createCoreDropdownCellTextExternalProps(),
  ...createCoreDropdownCellTextInternalProps(),
})
