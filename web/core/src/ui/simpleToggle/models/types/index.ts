import {
  createCoreSimpleToggleInternalProps,
  type IAltCoreSimpleToggleInternalProps,
} from './internal'
import {
  createCoreSimpleToggleExternalProps,
  type IAltCoreSimpleToggleExternalProps,
} from './external'

export * from './events'
export * from './external'
export * from './internal'
export * from './constants'

export interface IAltCoreSimpleToggleProps extends IAltCoreSimpleToggleInternalProps, IAltCoreSimpleToggleExternalProps {}

export const createCoreSimpleToggleProps = (): IAltCoreSimpleToggleProps => {
  return {
    ...createCoreSimpleToggleInternalProps(),
    ...createCoreSimpleToggleExternalProps(),
  }
}
