import {
  createCoreCardRadioExternalProps,
  type IAltCoreCardRadioExternalProps,
} from './external'

export * from './external'
export * from './events'

export interface IAltCoreCardRadioProps extends IAltCoreCardRadioExternalProps {}

export const createCoreCardRadioProps = (): IAltCoreCardRadioProps => ({ ...createCoreCardRadioExternalProps() })
