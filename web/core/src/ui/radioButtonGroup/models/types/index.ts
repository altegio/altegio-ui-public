import {
  createCoreRadioButtonGroupExternalProps,
  type IAltCoreRadioButtonGroupExternalProps,
} from './external'

export * from './external'
export * from './events'

export interface IAltCoreRadioButtonGroupProps extends IAltCoreRadioButtonGroupExternalProps {}

export const createCoreRadioButtonGroupProps = (): IAltCoreRadioButtonGroupProps => ({ ...createCoreRadioButtonGroupExternalProps() })
