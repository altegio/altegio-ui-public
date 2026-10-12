import {
  createCoreRadioButtonExternalProps,
  type IYCoreRadioButtonExternalProps,
} from './external'

export * from './external'
export * from './events'

export interface IYCoreRadioButtonProps extends IYCoreRadioButtonExternalProps {}

export const createCoreRadioButtonProps = (): IYCoreRadioButtonProps => ({ ...createCoreRadioButtonExternalProps() })
