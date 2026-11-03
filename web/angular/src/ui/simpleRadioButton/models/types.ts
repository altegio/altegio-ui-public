import {
  createCoreSimpleRadioButtonExternalProps,
  createCoreSimpleRadioButtonInternalProps,
  type IAltCoreSimpleRadioButtonExternalProps,
  type IAltCoreSimpleRadioButtonInternalProps,
} from '~core/ui/simpleRadioButton/models/types'

export type TAltNgSimpleRadioButtonModel = IAltCoreSimpleRadioButtonExternalProps['checked']

// accessibleDescription and tabStop are set by labelled core components only
export interface IAltNgSimpleRadioButtonProps extends Omit<IAltCoreSimpleRadioButtonExternalProps, 'checked'>, Omit<IAltCoreSimpleRadioButtonInternalProps, 'accessibleDescription' | 'tabStop'> {}

export { SimpleRadioButtonCheckedEvent } from '~core/ui/simpleRadioButton/models/types/events'

export const createNgSimpleRadioButtonProps = (): IAltNgSimpleRadioButtonProps => {
  return {
    ...createCoreSimpleRadioButtonExternalProps(),
    ...createCoreSimpleRadioButtonInternalProps(),
  }
}
