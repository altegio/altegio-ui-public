import type { TYCorePopoverActionEvents } from '~core/ui/popover/models/types'
import {
  createCorePopoverProps,
  type IYCorePopoverProps,
} from '~core/ui/popover/models/types'

export interface IYNgPopoverProps extends IYCorePopoverProps {}

export type TYPopoverEmits = TYCorePopoverActionEvents

export const createNgPopoverProps = (): IYNgPopoverProps => createCorePopoverProps()
