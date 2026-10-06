import {
  type IYCoreButtonGroupExternalProps,
  createCoreButtonGroupExternalProps,
} from './external'

export * from './external'

export interface IYCoreButtonGroupProps extends IYCoreButtonGroupExternalProps {}

export const createCoreButtonGroupProps = (): IYCoreButtonGroupProps => {
  return { ...createCoreButtonGroupExternalProps() }
}
