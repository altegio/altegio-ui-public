import {
  createCoreSimpleCheckboxExternalProps,
  createCoreSimpleCheckboxInternalProps,
  type IAltCoreSimpleCheckboxExternalProps,
  type IAltCoreSimpleCheckboxInternalProps,
  type IAltSimpleCheckboxCheckedEvent,
} from '~core/ui/simpleCheckbox/models/types'

export interface IAltNgSimpleCheckboxProps extends IAltCoreSimpleCheckboxExternalProps, IAltCoreSimpleCheckboxInternalProps {}

export { SimpleCheckboxCheckedEvent } from '~core/ui/simpleCheckbox/models/types/events'
export type TAltNgSimpleCheckboxCheckboxEvents = IAltSimpleCheckboxCheckedEvent

export const createNgSimpleCheckboxProps = (): IAltNgSimpleCheckboxProps => {
  return {
    ...createCoreSimpleCheckboxExternalProps(),
    ...createCoreSimpleCheckboxInternalProps(),
  }
}
