import {
  createCoreCollapseItemProps,
  type IYCoreCollapseItemProps,
} from '~core/ui/collapseItem/models/types'

export * from '~core/ui/collapseItem/models/types/events'

export interface IYNgCollapseItemProps extends IYCoreCollapseItemProps {}

export const createNgCollapseItemProps = (): IYNgCollapseItemProps => createCoreCollapseItemProps()
