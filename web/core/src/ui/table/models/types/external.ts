import type { TTablePluginsContext } from '~core/ui/table/plugins/context'

export interface IAltCoreTableExternalProps {
  loading: boolean | undefined
  disabled: boolean | undefined
  plugins: TTablePluginsContext | undefined
  hideHead: boolean | undefined
  hideBar: boolean | undefined
}

export const createCoreTableExternalProps = (): IAltCoreTableExternalProps => ({
  loading: false,
  disabled: false,
  plugins: {},
  hideHead: false,
  hideBar: false,
})
