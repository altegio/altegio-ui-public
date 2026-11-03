import type { IAltCoreRadioButtonGroupChangeEvent } from '~core/ui/radioButtonGroup/models/types'
import {
  createCoreRadioButtonGroupProps,
  type IAltCoreRadioButtonGroupProps,
} from '~core/ui/radioButtonGroup/models/types'

export interface IAltNgRadioButtonGroupProps extends IAltCoreRadioButtonGroupProps {}

export { RadioButtonGroupChangeEvent } from '~core/ui/radioButtonGroup/models/types'
export type TAltNgRadioButtonGroupEvents = IAltCoreRadioButtonGroupChangeEvent

export const createNgRadioButtonGroupProps = (): IAltNgRadioButtonGroupProps => createCoreRadioButtonGroupProps()
