import {
  createCoreStatusExternalProps,
  type IAltCoreStatusExternalProps,
} from '~core/ui/status/models/types'

export interface IAltNgStatusProps extends IAltCoreStatusExternalProps {}

export const createNgStatusProps = (): IAltNgStatusProps => createCoreStatusExternalProps()
