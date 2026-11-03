import {
  createCoreListExternalProps,
  type IAltCoreListExternalProps,
} from '~core/ui/list/models/types'

export interface IAltNgListProps extends IAltCoreListExternalProps {}

export const createNgListProps = (): IAltNgListProps => createCoreListExternalProps()
