import {
  createCoreLinearProgressExternalProps,
  type IAltCoreLinearProgressExternalProps,
} from './external'
import {
  createCoreLinearProgressInternalProps,
  type IAltCoreLinearProgressInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreLinearProgressProps extends IAltCoreLinearProgressExternalProps, IAltCoreLinearProgressInternalProps {}

export const createCoreLinearProgressProps = (): IAltCoreLinearProgressProps => ({
  ...createCoreLinearProgressExternalProps(),
  ...createCoreLinearProgressInternalProps(),
})
