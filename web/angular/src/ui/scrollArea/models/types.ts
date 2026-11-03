import {
  createCoreScrollAreaExternalProps,
  type IAltCoreScrollAreaExternalProps,
} from '~core/ui/scrollArea/models/types'

export interface IAltNgScrollAreaProps extends IAltCoreScrollAreaExternalProps {}

export const createNgScrollAreaProps = (): IAltNgScrollAreaProps => createCoreScrollAreaExternalProps()
