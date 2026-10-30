import {
  createCoreToggleExternalProps,
  type IAltCoreToggleExternalProps,
} from './external'

export * from './events'
export * from './external'

export interface IAltCoreToggleProps extends IAltCoreToggleExternalProps {}

export const createCoreToggleProps = (): IAltCoreToggleProps => ({ ...createCoreToggleExternalProps() })
