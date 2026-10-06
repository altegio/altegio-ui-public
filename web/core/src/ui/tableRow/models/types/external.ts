export interface IYCoreTableRowExternalProps {
  stripe: boolean | undefined
  selectable: boolean | undefined
  sticky: boolean | undefined
  disabled: boolean | undefined
}

export const createCoreTableRowExternalProps = (): IYCoreTableRowExternalProps => {
  return {
    stripe: false,
    selectable: false,
    sticky: false,
    disabled: false,
  }
}
