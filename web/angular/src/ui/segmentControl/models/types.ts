import {
  createCoreSegmentControlProps,
  type IYCoreSegmentControlClickEvent,
  type IYCoreSegmentControlProps,
} from '~core/ui/segmentControl/models/types'

export interface IYNgSegmentControlProps extends IYCoreSegmentControlProps {}

export { ClickEvent } from '~core/ui/segmentControl/models/types'
export type TYNgSegmentControlEmits = IYCoreSegmentControlClickEvent

export const createNgSegmentControlProps = (): IYNgSegmentControlProps => createCoreSegmentControlProps()
