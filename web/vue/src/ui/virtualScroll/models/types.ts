import {
  createCoreVirtualScrollExternalProps,
  type IAltCoreVirtualScrollExternalProps,
  type VirtualScrollRangeChangeEvent,
} from '~core/ui/virtualScroll/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueVirtualScrollProps<T> {

  /** Items to scroll; each row renders the default slot with `{ item, index }` */
  items: T[]
  itemSize?: IAltCoreVirtualScrollExternalProps['itemSize']
  overscan?: IAltCoreVirtualScrollExternalProps['overscan']
  accessibleName?: IAltCoreVirtualScrollExternalProps['accessibleName']

  /** Key of a row; the index by default */
  itemKey?: (item: T, index: number) => PropertyKey
}

export const createVueVirtualScrollProps = (): TDefinedVueProps<Omit<IAltVueVirtualScrollProps<unknown>, 'itemKey'>> => {
  const { itemSize, overscan, accessibleName } = createCoreVirtualScrollExternalProps()

  return {
    itemSize,
    overscan,
    accessibleName,
  }
}

export interface IAltVueVirtualScrollEmits {
  (event: 'range-change', payload: VirtualScrollRangeChangeEvent): void
}
