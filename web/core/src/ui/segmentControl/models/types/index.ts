import {
  type IYCoreSegmentControlExternalProps,
  createCoreSegmentControlExternalProps,
} from './external'

export * from './events'
export * from './external'

export interface IYCoreSegmentControlProps extends IYCoreSegmentControlExternalProps {}

export const createCoreSegmentControlProps = (): IYCoreSegmentControlProps => {
  const { options, size, value, manual } = createCoreSegmentControlExternalProps()

  return { options, size, value, manual }
}
