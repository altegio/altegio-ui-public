import {
  createCoreTableRowExternalProps,
  type IYCoreTableRowExternalProps,
} from './external'

export * from './external'
export * from './internal'

export interface IYCoreTableRowProps extends IYCoreTableRowExternalProps {}

export const createCoreTableRowProps = (): IYCoreTableRowProps => {
  const {
    stripe,
    selectable,
    sticky,
    disabled,
  } = createCoreTableRowExternalProps()

  return {
    stripe,
    selectable,
    sticky,
    disabled,
  }
}
