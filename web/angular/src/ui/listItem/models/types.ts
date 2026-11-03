import {
  createCoreListItemExternalProps,
  type IAltCoreListItemExternalProps,
} from '~core/ui/listItem/models/types'

export interface IAltNgListItemProps extends IAltCoreListItemExternalProps {}

export const createNgListItemProps = (): IAltNgListItemProps => createCoreListItemExternalProps()
