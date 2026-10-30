import {
  createCoreSegmentOptionInternalProps,
  type IAltCoreSegmentOptionInternalProps,
} from './internal'
import {
  createCoreSegmentOptionExternalProps,
  type IAltCoreSegmentOptionExternalProps,
} from './external'

export * from './events'
export * from './internal'
export * from './external'

export interface IAltCoreSegmentOptionProps extends IAltCoreSegmentOptionInternalProps, IAltCoreSegmentOptionExternalProps {}

export const createCoreSegmentOptionProps = (): IAltCoreSegmentOptionProps => ({
  ...createCoreSegmentOptionInternalProps(),
  ...createCoreSegmentOptionExternalProps(),
})
