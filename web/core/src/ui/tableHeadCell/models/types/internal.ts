export interface IYCoreTableHeadCellInternalProps {

  /**
   * @internal Whether hint content is present. Set by the framework wrappers.
   */
  hasHint?: boolean
}

export const createCoreTableHeadCellInternalProps = (): IYCoreTableHeadCellInternalProps => ({ hasHint: false })
