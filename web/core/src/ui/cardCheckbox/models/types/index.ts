import { createCoreCardCheckboxExternalProps, type IAltCoreCardCheckboxExternalProps } from './external'

export * from './external'
export * from './events'

export interface IAltCoreCardCheckboxProps extends IAltCoreCardCheckboxExternalProps {}

export const createCoreCardCheckboxProps = (): IAltCoreCardCheckboxProps => ({ ...createCoreCardCheckboxExternalProps() })
