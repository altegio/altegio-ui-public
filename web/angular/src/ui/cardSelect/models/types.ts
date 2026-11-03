import {
  createCoreCardSelectProps,
  type IAltCoreCardSelectProps,
} from '~core/ui/cardSelect/models/types'

export { FocusEvent as AltNgCardSelectFocusEvent, BlurEvent as AltNgCardSelectBlurEvent } from '~core/ui/cardSelect/models/types/events'

export interface IAltNgCardSelectProps extends IAltCoreCardSelectProps {}

export const createNgCardSelectProps = (): IAltNgCardSelectProps => createCoreCardSelectProps()
