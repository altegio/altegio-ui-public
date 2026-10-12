import {
  createCoreSimpleCheckboxExternalProps,
  createCoreSimpleCheckboxInternalProps,
  type IYCoreSimpleCheckboxExternalProps,
  type IYCoreSimpleCheckboxInternalProps,
  type IYSimpleCheckboxCheckedEvent,
} from '~core/ui/simpleCheckbox/models/types'

export interface IYNgSimpleCheckboxProps extends IYCoreSimpleCheckboxExternalProps, IYCoreSimpleCheckboxInternalProps {}

export { SimpleCheckboxCheckedEvent } from '~core/ui/simpleCheckbox/models/types/events'
export type TYNgSimpleCheckboxCheckboxEvents = IYSimpleCheckboxCheckedEvent

export const createNgSimpleCheckboxProps = (): IYNgSimpleCheckboxProps => {
  return {
    ...createCoreSimpleCheckboxExternalProps(),
    ...createCoreSimpleCheckboxInternalProps(),
  }
}
