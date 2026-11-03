import {
  createCoreVirtualScrollExternalProps,
  type IAltCoreVirtualScrollExternalProps,
} from '~core/ui/virtualScroll/models/types'

export interface IAltNgVirtualScrollProps<T = unknown> extends Omit<IAltCoreVirtualScrollExternalProps, 'itemCount'> {

  /** Items to scroll; each row renders the `ng-template` with the item as `$implicit` and its `index` */
  items: T[]

  /** Key of a row for `@for`; the index by default */
  itemKey: ((item: T, index: number) => unknown) | undefined
}

export interface IAltNgVirtualScrollRowContext<T = unknown> {
  $implicit: T
  index: number
}

export const createNgVirtualScrollProps = (): IAltNgVirtualScrollProps => {
  const { itemSize, overscan, accessibleName } = createCoreVirtualScrollExternalProps()

  return {
    items: [],
    itemSize,
    overscan,
    accessibleName,
    itemKey: undefined,
  }
}
