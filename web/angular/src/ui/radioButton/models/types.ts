import {
  createCoreRadioButtonExternalProps,
  type IAltCoreRadioButtonExternalProps,
} from '~core/ui/radioButton/models/types'

export type TAltNgRadioButtonModel = IAltCoreRadioButtonExternalProps['checked']

export interface IAltNgRadioButtonProps extends Omit<IAltCoreRadioButtonExternalProps, 'checked'> {}

export { RadioButtonCheckedEvent } from '~core/ui/radioButton/models/types'

export const createNgRadioButtonProps = (): IAltNgRadioButtonProps => createCoreRadioButtonExternalProps()
