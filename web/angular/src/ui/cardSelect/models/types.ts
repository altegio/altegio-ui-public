import {
  createCoreCardSelectProps,
  type IYCoreCardSelectProps,
} from '~core/ui/cardSelect/models/types'

export { FocusEvent as YNgCardSelectFocusEvent, BlurEvent as YNgCardSelectBlurEvent } from '~core/ui/cardSelect/models/types/events'

export interface IYNgCardSelectProps extends IYCoreCardSelectProps {}

export const createNgCardSelectProps = (): IYNgCardSelectProps => createCoreCardSelectProps()
