import {
  createCoreSimpleChipExternalProps,
  type IYCoreSimpleChipExternalProps,
} from './external'


export * from './external'
export * from './events'

export interface IYCoreSimpleChipProps extends IYCoreSimpleChipExternalProps {}

export const createCoreSimpleChipProps = (): IYCoreSimpleChipProps => ({ ...createCoreSimpleChipExternalProps() })
