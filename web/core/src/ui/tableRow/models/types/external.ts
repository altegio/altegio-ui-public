export interface IAltCoreTableRowExternalProps {
  stripe: boolean | undefined
  selectable: boolean | undefined
  sticky: boolean | undefined
  disabled: boolean | undefined
}

export const createCoreTableRowExternalProps = (): IAltCoreTableRowExternalProps => {
  return {
    stripe: false,
    selectable: false,
    sticky: false,
    disabled: false,
  }
}
