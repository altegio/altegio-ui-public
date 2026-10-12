import {
  createCoreRadioButtonExternalProps,
  type IYCoreRadioButtonExternalProps,
} from '~core/ui/radioButton/models/types'

export type TYNgRadioButtonModel = IYCoreRadioButtonExternalProps['checked']

export interface IYNgRadioButtonProps extends Omit<IYCoreRadioButtonExternalProps, 'checked'> {}

export { RadioButtonCheckedEvent } from '~core/ui/radioButton/models/types'

export const createNgRadioButtonProps = (): IYNgRadioButtonProps => createCoreRadioButtonExternalProps()
