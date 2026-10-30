import {
  createCoreRadioButtonExternalProps,
  type IAltCoreRadioButtonExternalProps,
} from './external'

export * from './external'
export * from './events'

export interface IAltCoreRadioButtonProps extends IAltCoreRadioButtonExternalProps {}

export const createCoreRadioButtonProps = (): IAltCoreRadioButtonProps => ({ ...createCoreRadioButtonExternalProps() })
