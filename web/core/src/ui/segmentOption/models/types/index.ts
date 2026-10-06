import {
  createCoreSegmentOptionInternalProps,
  type IYCoreSegmentOptionInternalProps,
} from './internal'
import {
  createCoreSegmentOptionExternalProps,
  type IYCoreSegmentOptionExternalProps,
} from './external'

export * from './events'
export * from './internal'
export * from './external'

export interface IYCoreSegmentOptionProps extends IYCoreSegmentOptionInternalProps, IYCoreSegmentOptionExternalProps {}

export const createCoreSegmentOptionProps = (): IYCoreSegmentOptionProps => ({
  ...createCoreSegmentOptionInternalProps(),
  ...createCoreSegmentOptionExternalProps(),
})
