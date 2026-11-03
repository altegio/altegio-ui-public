import { LitElement, html, css, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, state, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { provide } from '@lit/context'

import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import {
  type IAltCoreGlobalProviderProps,
  GlobalProviderReadyEvent,
} from '~core/ui/globalProvider/models/types'
import {
  AltCoreGlobalProviderTagName as tagName,
} from '~shared/constants'

import { GlobalContext, globalContextCreated } from './context'
import { installPlugins, uninstallPlugins } from './plugins'

import AltCoreGlobalProviderVarsCSS from '~core/ui/globalProvider/css/GlobalProvider.vars.css?inline'
import AltCoreGlobalProviderScopedCSS from '~core/ui/globalProvider/css/GlobalProvider.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

@customElement(tagName)
@withLocator(tagName)
export class AltCoreGlobalProvider extends LitElement implements IAltCoreGlobalProviderProps {
  @property({ type: Array }) plugins: IAltCoreGlobalProviderProps['plugins']
  @provide({ context: globalContextCreated })
  @state()
  public readonly globalContext = new GlobalContext()

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreGlobalProviderVarsCSS)}
      ${unsafeCSS(AltCoreGlobalProviderScopedCSS)}
    `,
  ]

  private get computedClasses() {
    return { [this.baseClass]: true }
  }

  @bubblingEvent(
    GlobalProviderReadyEvent,
    { name: 'ready' },
  )
  _ready!: TDispatcher<GlobalProviderReadyEvent>

  connectedCallback() {
    super.connectedCallback()

    this.id = tagName
  }

  firstUpdated() {
    this._ready({ detail: { value: this.globalContext } })
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    // Destroy the plugins when the component is disconnected
    if (this.plugins?.length) {
      uninstallPlugins(this.plugins, this.globalContext)
    }
  }

  updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties)

    // React to changes in the plugin list
    if (changedProperties.has('plugins')) {
      const oldPlugins = changedProperties.get('plugins') || []
      const newPlugins = this.plugins || []

      // Plugins that are missing from the new list
      const pluginsToRemove = oldPlugins.filter((oldPlugin) => !newPlugins.some((newPlugin) => newPlugin.id === oldPlugin.id))

      // Plugins that were not in the old list
      const pluginsToAdd = newPlugins.filter((newPlugin) => !oldPlugins.some((oldPlugin) => oldPlugin.id === newPlugin.id))

      // Destroy only the removed plugins
      if (pluginsToRemove.length) {
        uninstallPlugins(pluginsToRemove, this.globalContext)
      }

      // Initialize only the added plugins
      if (pluginsToAdd.length) {
        installPlugins(pluginsToAdd, this.globalContext)
      }
    }
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <slot>
        </slot>
      </div>
    `
  }
}
