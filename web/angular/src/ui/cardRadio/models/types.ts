import {
  createCoreCardRadioProps,
  type IYCoreCardRadioProps,
} from '~core/ui/cardRadio/models/types'

export interface IYNgCardRadioProps extends IYCoreCardRadioProps {}

export const createNgCardRadioProps = (): IYNgCardRadioProps => createCoreCardRadioProps()
