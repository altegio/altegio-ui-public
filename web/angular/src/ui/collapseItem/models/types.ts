import {
  createCoreCollapseItemProps,
  type IAltCoreCollapseItemProps,
} from '~core/ui/collapseItem/models/types'

export * from '~core/ui/collapseItem/models/types/events'

export interface IAltNgCollapseItemProps extends IAltCoreCollapseItemProps {}

export const createNgCollapseItemProps = (): IAltNgCollapseItemProps => createCoreCollapseItemProps()
