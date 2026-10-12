import type { IYCoreRadioButtonGroupChangeEvent } from '~core/ui/radioButtonGroup/models/types'
import {
  createCoreRadioButtonGroupProps,
  type IYCoreRadioButtonGroupProps,
} from '~core/ui/radioButtonGroup/models/types'

export interface IYNgRadioButtonGroupProps extends IYCoreRadioButtonGroupProps {}

export { RadioButtonGroupChangeEvent } from '~core/ui/radioButtonGroup/models/types'
export type TYNgRadioButtonGroupEvents = IYCoreRadioButtonGroupChangeEvent

export const createNgRadioButtonGroupProps = (): IYNgRadioButtonGroupProps => createCoreRadioButtonGroupProps()
