import {
  createCoreCardButtonProps,
  type IYCoreCardButtonProps,
} from '~core/ui/cardButton/models/types'

export { FocusEvent as YNgCardButtonFocusEvent, BlurEvent as YNgCardButtonBlurEvent } from '~core/ui/cardButton/models/types/events'

export interface IYNgCardButtonProps extends IYCoreCardButtonProps {}

export const createNgCardButtonProps = (): IYNgCardButtonProps => createCoreCardButtonProps()
