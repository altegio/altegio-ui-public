import type { IGlobalContext } from '../context'
export * from './i18n'
export * from './queue'
export * from './palette'

/**
 * Base interface for global provider plugins
 *
 * Every GlobalProvider plugin implements this interface.
 * It defines the plugin lifecycle methods.
 *
 * @example
 * ```typescript
 * // A minimal plugin
 * class MyPlugin implements IGlobalProviderPlugin {
 *   id = 'my-plugin';
 *
 *   init(context: IGlobalContext): void {
 *     // Set up the plugin
 *     console.log('MyPlugin initialized');
 *   }
 *
 *   destroy(context: IGlobalContext): void {
 *     // Release resources
 *     console.log('MyPlugin destroyed');
 *   }
 * }
 * ```
 */
export interface IGlobalProviderPlugin {

  /**
   * Unique plugin ID
   *
   * Must be unique among all plugins in use.
   * GlobalProvider uses it to find plugins in its plugin list.
   */
  id: string

  /**
   * Initializes the plugin
   *
   * Called automatically when the plugin is added to GlobalProvider.
   * Use it to configure the plugin and add its data to the global context.
   *
   * @param context - Global context
   */
  init(context: IGlobalContext): void

  /**
   * Destroys the plugin
   *
   * Called automatically when the plugin is removed from GlobalProvider.
   * Use it to release resources and clean up data.
   * Optional: if it is not implemented, removing the plugin does nothing.
   *
   * @param context - Global context
   */
  destroy?(context: IGlobalContext): void
}

/**
 * Initializes all given plugins
 *
 * Calls `init` on each plugin in order.
 * GlobalProvider uses it when the plugin list is set or updated.
 *
 * @param plugins - Plugins to initialize
 * @param context - Global context passed to the plugins
 */
export function installPlugins(
  plugins: IGlobalProviderPlugin[] | undefined,
  context: IGlobalContext,
): void {
  if (!plugins?.length) return

  plugins.forEach((plugin) => {
    plugin.init(context)
  })
}

/**
 * Destroys all given plugins
 *
 * Calls `destroy` on each plugin in order, when the plugin defines it.
 * GlobalProvider uses it when plugins are removed or replaced.
 *
 * @param plugins - Plugins to destroy
 * @param context - Global context passed to the plugins
 */
export function uninstallPlugins(
  plugins: IGlobalProviderPlugin[] | undefined,
  context: IGlobalContext,
): void {
  if (!plugins?.length) return

  plugins.forEach((plugin) => {
    if (typeof plugin.destroy === 'function') {
      plugin.destroy(context)
    }
  })
}
