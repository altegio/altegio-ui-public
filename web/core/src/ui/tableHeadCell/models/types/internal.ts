export interface IAltCoreTableHeadCellInternalProps {

  /**
   * @internal Whether hint content is present. Set by the framework wrappers.
   */
  hasHint?: boolean
}

export const createCoreTableHeadCellInternalProps = (): IAltCoreTableHeadCellInternalProps => ({ hasHint: false })
