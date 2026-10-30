import {
  createCoreCollapseProps,
  type IAltCoreCollapseProps,
} from '~core/ui/collapse/models/types'

export * from '~core/ui/collapse/models/types/events'

export interface IAltNgCollapseProps extends IAltCoreCollapseProps {}

export const createNgCollapseProps = (): IAltNgCollapseProps => createCoreCollapseProps()
