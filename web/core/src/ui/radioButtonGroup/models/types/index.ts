import {
  createCoreRadioButtonGroupExternalProps,
  type IYCoreRadioButtonGroupExternalProps,
} from './external'

export * from './external'
export * from './events'

export interface IYCoreRadioButtonGroupProps extends IYCoreRadioButtonGroupExternalProps {}

export const createCoreRadioButtonGroupProps = (): IYCoreRadioButtonGroupProps => ({ ...createCoreRadioButtonGroupExternalProps() })
