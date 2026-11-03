import {
  createCoreLoaderProps,
  type IAltCoreLoaderProps,
} from '~core/ui/loader/models/types'

export interface IAltNgLoaderProps extends IAltCoreLoaderProps {}

export const createNgLoaderProps = (): IAltNgLoaderProps => createCoreLoaderProps()
