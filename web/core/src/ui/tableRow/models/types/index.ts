import {
  createCoreTableRowExternalProps,
  type IAltCoreTableRowExternalProps,
} from './external'

export * from './external'
export * from './internal'

export interface IAltCoreTableRowProps extends IAltCoreTableRowExternalProps {}

export const createCoreTableRowProps = (): IAltCoreTableRowProps => {
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
