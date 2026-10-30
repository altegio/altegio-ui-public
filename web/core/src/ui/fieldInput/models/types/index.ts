import {
  createCoreFieldInputExternalProps,
  type IAltCoreFieldInputExternalProps,
} from './external'
import {
  createCoreFieldInputInternalProps,
  type IAltCoreFieldInputInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IAltCoreFieldInputProps extends IAltCoreFieldInputExternalProps, IAltCoreFieldInputInternalProps {}

export const createCoreFieldInputProps = (): IAltCoreFieldInputProps => ({
  ...createCoreFieldInputExternalProps(),
  ...createCoreFieldInputInternalProps(),
})
