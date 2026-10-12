import {
  createCoreCollapseProps,
  type IYCoreCollapseProps,
} from '~core/ui/collapse/models/types'

export * from '~core/ui/collapse/models/types/events'

export interface IYNgCollapseProps extends IYCoreCollapseProps {}

export const createNgCollapseProps = (): IYNgCollapseProps => createCoreCollapseProps()
