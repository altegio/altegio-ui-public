import {
  createCoreSimpleCheckboxExternalProps,
  type IAltCoreSimpleCheckboxExternalProps,
} from './external'
import {
  createCoreSimpleCheckboxInternalProps,
  type IAltCoreSimpleCheckboxInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'


export interface IAltCoreSimpleCheckboxProps extends IAltCoreSimpleCheckboxExternalProps, IAltCoreSimpleCheckboxInternalProps {}

export const createCoreSimpleCheckboxProps = (): IAltCoreSimpleCheckboxProps => {
  return {
    ...createCoreSimpleCheckboxExternalProps(),
    ...createCoreSimpleCheckboxInternalProps(),
  }
}
