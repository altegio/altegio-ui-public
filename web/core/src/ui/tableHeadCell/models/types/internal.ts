export interface IYCoreTableHeadCellInternalProps {

  /**
   * @internal Указывает, есть ли hint контент. Управляется из фреймворков.
   */
  hasHint?: boolean
}

export const createCoreTableHeadCellInternalProps = (): IYCoreTableHeadCellInternalProps => ({ hasHint: false })
