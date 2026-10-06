import {
  createCoreSimpleRadioButtonExternalProps,
  type IYCoreSimpleRadioButtonExternalProps,
} from './external'
import {
  createCoreSimpleRadioButtonInternalProps,
  type IYCoreSimpleRadioButtonInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'


export interface IYCoreSimpleRadioButtonProps extends IYCoreSimpleRadioButtonExternalProps, IYCoreSimpleRadioButtonInternalProps {}

export const createCoreSimpleRadioButtonProps = (): IYCoreSimpleRadioButtonProps => {
  return {
    ...createCoreSimpleRadioButtonExternalProps(),
    ...createCoreSimpleRadioButtonInternalProps(),
  }
}
