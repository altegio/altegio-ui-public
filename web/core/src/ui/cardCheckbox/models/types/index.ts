import { createCoreCardCheckboxExternalProps, type IYCoreCardCheckboxExternalProps } from './external'

export * from './external'
export * from './events'

export interface IYCoreCardCheckboxProps extends IYCoreCardCheckboxExternalProps {}

export const createCoreCardCheckboxProps = (): IYCoreCardCheckboxProps => ({ ...createCoreCardCheckboxExternalProps() })
