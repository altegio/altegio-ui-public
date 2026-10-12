import {
  createCoreButtonGroupExternalProps,
  type IYCoreButtonGroupExternalProps,
} from '~core/ui/buttonGroup/models/types'

export interface IYNgButtonGroupProps extends IYCoreButtonGroupExternalProps {}

export const createNgButtonGroupProps = (): IYNgButtonGroupProps => createCoreButtonGroupExternalProps()
