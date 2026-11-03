import {
  createCoreCardCheckboxProps,
  type IAltCoreCardCheckboxProps,
} from '~core/ui/cardCheckbox/models/types'

export interface IAltNgCardCheckboxProps extends IAltCoreCardCheckboxProps {}

export const createNgCardCheckboxProps = (): IAltNgCardCheckboxProps => createCoreCardCheckboxProps()
