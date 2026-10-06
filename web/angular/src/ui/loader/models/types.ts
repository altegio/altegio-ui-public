import {
  createCoreLoaderProps,
  type IYCoreLoaderProps,
} from '~core/ui/loader/models/types'

export interface IYNgLoaderProps extends IYCoreLoaderProps {}

export const createNgLoaderProps = (): IYNgLoaderProps => createCoreLoaderProps()
