import { createContext } from '@lit/context'
import type { ITableComponentsMap, ITablePlugin, TTablePluginComponents } from '../types'

export type TTablePluginsContext = Partial<Record<TTablePluginComponents, ITablePlugin<TTablePluginComponents>[]>> | undefined

export const pluginsContextKey = Symbol('PluginsContext')
export const pluginsContextCreated = createContext<TTablePluginsContext>(pluginsContextKey)

export const installPlugins = <T extends TTablePluginComponents>(
  plugins: Partial<Record<T, ITablePlugin<T>[]>> | undefined,
  tagName: T,
  component: ITableComponentsMap[T],
) => {
  if (!plugins?.[tagName]) return

  plugins[tagName].forEach((plugin) => {
    plugin.install(component)
  })
}

export const uninstallPlugins = <T extends TTablePluginComponents>(
  plugins: Partial<Record<T, ITablePlugin<T>[]>> | undefined,
  tagName: T,
  component: ITableComponentsMap[T],
) => {
  if (!plugins?.[tagName]) return

  plugins[tagName].forEach((plugin) => {
    plugin.uninstall(component)
  })
}
