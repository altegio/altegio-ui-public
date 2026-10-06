import {
  type IYCoreLoaderProps,
  EYCoreLoaderVariant,
} from '~core/ui/loader/models/types'

export interface IYCoreSimpleButtonInternalProps {
  hostStyles: string | undefined
  loaderVariant: IYCoreLoaderProps['variant'] | undefined
}

export const createCoreSimpleButtonInternalProps = (): IYCoreSimpleButtonInternalProps => {
  return { hostStyles: undefined, loaderVariant: EYCoreLoaderVariant.BLACK }
}
