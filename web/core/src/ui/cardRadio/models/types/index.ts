import {
  createCoreCardRadioExternalProps,
  type IYCoreCardRadioExternalProps,
} from './external'

export * from './external'
export * from './events'

export interface IYCoreCardRadioProps extends IYCoreCardRadioExternalProps {}

export const createCoreCardRadioProps = (): IYCoreCardRadioProps => ({ ...createCoreCardRadioExternalProps() })
