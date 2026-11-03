import {
  createCoreSimpleCheckboxExternalProps,
  createCoreSimpleCheckboxInternalProps,
  type IAltCoreSimpleCheckboxExternalProps,
  type IAltCoreSimpleCheckboxInternalProps,
  type IAltSimpleCheckboxCheckedEvent,
} from '~core/ui/simpleCheckbox/models/types'

// accessibleDescription and accessibleRequired are set by labelled core components only
export interface IAltNgSimpleCheckboxProps extends IAltCoreSimpleCheckboxExternalProps, Omit<IAltCoreSimpleCheckboxInternalProps, 'accessibleDescription' | 'accessibleRequired'> {}

export { SimpleCheckboxCheckedEvent } from '~core/ui/simpleCheckbox/models/types/events'
export type TAltNgSimpleCheckboxCheckboxEvents = IAltSimpleCheckboxCheckedEvent

export const createNgSimpleCheckboxProps = (): IAltNgSimpleCheckboxProps => {
  return {
    ...createCoreSimpleCheckboxExternalProps(),
    ...createCoreSimpleCheckboxInternalProps(),
  }
}
