import {
  type IAltCoreLoaderProps,
  EAltCoreLoaderVariant,
} from '~core/ui/loader/models/types'

export interface IAltCoreSimpleButtonInternalProps {
  hostStyles: string | undefined
  loaderVariant: IAltCoreLoaderProps['variant'] | undefined
}

export const createCoreSimpleButtonInternalProps = (): IAltCoreSimpleButtonInternalProps => {
  return { hostStyles: undefined, loaderVariant: EAltCoreLoaderVariant.BLACK }
}
