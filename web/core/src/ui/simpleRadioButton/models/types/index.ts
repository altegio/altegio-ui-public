import {
  createCoreSimpleRadioButtonExternalProps,
  type IAltCoreSimpleRadioButtonExternalProps,
} from './external'
import {
  createCoreSimpleRadioButtonInternalProps,
  type IAltCoreSimpleRadioButtonInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'


export interface IAltCoreSimpleRadioButtonProps extends IAltCoreSimpleRadioButtonExternalProps, IAltCoreSimpleRadioButtonInternalProps {}

export const createCoreSimpleRadioButtonProps = (): IAltCoreSimpleRadioButtonProps => {
  return {
    ...createCoreSimpleRadioButtonExternalProps(),
    ...createCoreSimpleRadioButtonInternalProps(),
  }
}
