import {
  createCoreCardCheckboxProps,
  type IYCoreCardCheckboxProps,
} from '~core/ui/cardCheckbox/models/types'

export interface IYNgCardCheckboxProps extends IYCoreCardCheckboxProps {}

export const createNgCardCheckboxProps = (): IYNgCardCheckboxProps => createCoreCardCheckboxProps()
