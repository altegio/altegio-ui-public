import {
  createCoreCardButtonProps,
  type IAltCoreCardButtonProps,
} from '~core/ui/cardButton/models/types'

export { FocusEvent as AltNgCardButtonFocusEvent, BlurEvent as AltNgCardButtonBlurEvent } from '~core/ui/cardButton/models/types/events'

export interface IAltNgCardButtonProps extends IAltCoreCardButtonProps {}

export const createNgCardButtonProps = (): IAltNgCardButtonProps => createCoreCardButtonProps()
