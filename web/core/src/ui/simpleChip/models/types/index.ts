import {
  createCoreSimpleChipExternalProps,
  type IAltCoreSimpleChipExternalProps,
} from './external'


export * from './external'
export * from './events'

export interface IAltCoreSimpleChipProps extends IAltCoreSimpleChipExternalProps {}

export const createCoreSimpleChipProps = (): IAltCoreSimpleChipProps => ({ ...createCoreSimpleChipExternalProps() })
