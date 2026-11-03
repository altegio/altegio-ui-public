import {
  createCoreRatingExternalProps,
  type IAltCoreRatingExternalProps,
} from './external'
import {
  createCoreRatingInternalProps,
  type IAltCoreRatingInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IAltCoreRatingProps extends IAltCoreRatingExternalProps, IAltCoreRatingInternalProps {}

export const createCoreRatingProps = (): IAltCoreRatingProps => ({
  ...createCoreRatingExternalProps(),
  ...createCoreRatingInternalProps(),
})
