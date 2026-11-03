import type { TAltCorePopoverActionEvents } from '~core/ui/popover/models/types'
import {
  createCorePopoverProps,
  type IAltCorePopoverProps,
} from '~core/ui/popover/models/types'

export interface IAltNgPopoverProps extends IAltCorePopoverProps {}

export type TAltPopoverEmits = TAltCorePopoverActionEvents

export const createNgPopoverProps = (): IAltNgPopoverProps => createCorePopoverProps()
