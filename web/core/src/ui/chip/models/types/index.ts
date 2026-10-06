import {
  createCoreChipExternalProps,
  type IYCoreChipExternalProps,
} from './external'

export * from './external'

export interface IYCoreChipProps extends IYCoreChipExternalProps {}

export const createCoreChipProps = (): IYCoreChipProps => ({ ...createCoreChipExternalProps() })
