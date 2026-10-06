import type { TTablePluginsContext } from '~core/ui/table/plugins/context'

export interface IYCoreTableExternalProps {
  loading: boolean | undefined
  disabled: boolean | undefined
  plugins: TTablePluginsContext | undefined
  hideHead: boolean | undefined
  hideBar: boolean | undefined
}

export const createCoreTableExternalProps = (): IYCoreTableExternalProps => ({
  loading: false,
  disabled: false,
  plugins: {},
  hideHead: false,
  hideBar: false,
})
