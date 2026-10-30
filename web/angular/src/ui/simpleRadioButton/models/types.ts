import {
  createCoreSimpleRadioButtonExternalProps,
  createCoreSimpleRadioButtonInternalProps,
  type IAltCoreSimpleRadioButtonExternalProps,
  type IAltCoreSimpleRadioButtonInternalProps,
} from '~core/ui/simpleRadioButton/models/types'

export type TAltNgSimpleRadioButtonModel = IAltCoreSimpleRadioButtonExternalProps['checked']

export interface IAltNgSimpleRadioButtonProps extends Omit<IAltCoreSimpleRadioButtonExternalProps, 'checked'>, IAltCoreSimpleRadioButtonInternalProps {}

export { SimpleRadioButtonCheckedEvent } from '~core/ui/simpleRadioButton/models/types/events'

export const createNgSimpleRadioButtonProps = (): IAltNgSimpleRadioButtonProps => {
  return {
    ...createCoreSimpleRadioButtonExternalProps(),
    ...createCoreSimpleRadioButtonInternalProps(),
  }
}
