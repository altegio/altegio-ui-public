import {
  createCoreSimpleRadioButtonExternalProps,
  createCoreSimpleRadioButtonInternalProps,
  type IYCoreSimpleRadioButtonExternalProps,
  type IYCoreSimpleRadioButtonInternalProps,
} from '~core/ui/simpleRadioButton/models/types'

export type TYNgSimpleRadioButtonModel = IYCoreSimpleRadioButtonExternalProps['checked']

export interface IYNgSimpleRadioButtonProps extends Omit<IYCoreSimpleRadioButtonExternalProps, 'checked'>, IYCoreSimpleRadioButtonInternalProps {}

export { SimpleRadioButtonCheckedEvent } from '~core/ui/simpleRadioButton/models/types/events'

export const createNgSimpleRadioButtonProps = (): IYNgSimpleRadioButtonProps => {
  return {
    ...createCoreSimpleRadioButtonExternalProps(),
    ...createCoreSimpleRadioButtonInternalProps(),
  }
}
