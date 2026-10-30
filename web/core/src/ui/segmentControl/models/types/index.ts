import {
  type IAltCoreSegmentControlExternalProps,
  createCoreSegmentControlExternalProps,
} from './external'

export * from './events'
export * from './external'

export interface IAltCoreSegmentControlProps extends IAltCoreSegmentControlExternalProps {}

export const createCoreSegmentControlProps = (): IAltCoreSegmentControlProps => {
  const { options, size, value, manual } = createCoreSegmentControlExternalProps()

  return { options, size, value, manual }
}
