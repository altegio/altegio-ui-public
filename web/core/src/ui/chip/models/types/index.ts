import {
  createCoreChipExternalProps,
  type IAltCoreChipExternalProps,
} from './external'

export * from './external'

export interface IAltCoreChipProps extends IAltCoreChipExternalProps {}

export const createCoreChipProps = (): IAltCoreChipProps => ({ ...createCoreChipExternalProps() })
