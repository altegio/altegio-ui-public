import {
  createCoreCheckboxExternalProps,
  type IAltCoreCheckboxExternalProps,
} from './external'

export * from './external'
export * from './events'

export interface IAltCoreCheckboxProps extends IAltCoreCheckboxExternalProps {}

export const createCoreCheckboxProps = (): IAltCoreCheckboxProps => ({ ...createCoreCheckboxExternalProps() })
