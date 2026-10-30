import {
  createCoreButtonGroupExternalProps,
  type IAltCoreButtonGroupExternalProps,
} from '~core/ui/buttonGroup/models/types'

export interface IAltNgButtonGroupProps extends IAltCoreButtonGroupExternalProps {}

export const createNgButtonGroupProps = (): IAltNgButtonGroupProps => createCoreButtonGroupExternalProps()
