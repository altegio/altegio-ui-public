export interface ITableCellItem {
  id: string
  label?: string
  style?: string
  ellipsis?: boolean
  lineclamp?: number
  [key: string]: unknown
}

export enum ETableCellAlign {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}
export type TTableCellAlign = `${ETableCellAlign}`

export interface IYCoreTableCellExternalProps {
  sticky: boolean | undefined
  align: TTableCellAlign | undefined
  item: ITableCellItem | undefined
  itemLabel: keyof ITableCellItem | string | undefined
  disabled: boolean | undefined
  ellipsis: boolean | undefined
  lineclamp: number | undefined
  bordered: boolean | undefined
}

export const createCoreTableCellExternalProps = (): IYCoreTableCellExternalProps => ({
  sticky: false,
  align: undefined,
  item: undefined,
  itemLabel: 'label',
  disabled: false,
  ellipsis: false,
  lineclamp: 1,
  bordered: false,
})
