export interface IAltCoreVirtualScrollExternalProps {
  itemCount: number
  itemSize: number
  overscan: number
  accessibleName: string | undefined
}

export const createCoreVirtualScrollExternalProps = (): IAltCoreVirtualScrollExternalProps => ({
  itemCount: 0,
  itemSize: 40,
  overscan: 4,
  accessibleName: undefined,
})
