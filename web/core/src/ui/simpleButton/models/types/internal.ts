import {
  type IAltCoreLoaderProps,
  EAltCoreLoaderVariant,
} from '~core/ui/loader/models/types'

export interface IAltCoreSimpleButtonInternalProps {
  hostStyles: string | undefined
  loaderVariant: IAltCoreLoaderProps['variant'] | undefined

  /** aria-current of the button, for example `page` for the current page of a pagination */
  accessibleCurrent: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | undefined
}

export const createCoreSimpleButtonInternalProps = (): IAltCoreSimpleButtonInternalProps => {
  return { hostStyles: undefined, loaderVariant: EAltCoreLoaderVariant.BLACK, accessibleCurrent: undefined }
}
