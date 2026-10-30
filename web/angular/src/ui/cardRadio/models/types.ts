import {
  createCoreCardRadioProps,
  type IAltCoreCardRadioProps,
} from '~core/ui/cardRadio/models/types'

export interface IAltNgCardRadioProps extends IAltCoreCardRadioProps {}

export const createNgCardRadioProps = (): IAltNgCardRadioProps => createCoreCardRadioProps()
