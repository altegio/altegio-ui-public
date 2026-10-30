import {
  createCoreSegmentControlProps,
  type IAltCoreSegmentControlClickEvent,
  type IAltCoreSegmentControlProps,
} from '~core/ui/segmentControl/models/types'

export interface IAltNgSegmentControlProps extends IAltCoreSegmentControlProps {}

export { ClickEvent } from '~core/ui/segmentControl/models/types'
export type TAltNgSegmentControlEmits = IAltCoreSegmentControlClickEvent

export const createNgSegmentControlProps = (): IAltNgSegmentControlProps => createCoreSegmentControlProps()
