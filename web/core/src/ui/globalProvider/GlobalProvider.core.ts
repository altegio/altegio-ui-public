import { LitElement, html, css, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, state, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { provide } from '@lit/context'

import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import {
  type IYCoreGlobalProviderProps,
  GlobalProviderReadyEvent,
} from '~core/ui/globalProvider/models/types'
import {
  YCoreGlobalProviderTagName as tagName,
} from '~shared/constants'

import { GlobalContext, globalContextCreated } from './context'
import { installPlugins, uninstallPlugins } from './plugins'

import YCoreGlobalProviderVarsCSS from '~core/ui/globalProvider/css/GlobalProvider.vars.css?inline'
import YCoreGlobalProviderScopedCSS from '~core/ui/globalProvider/css/GlobalProvider.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

@customElement(tagName)
@withLocator(tagName)
export class YCoreGlobalProvider extends LitElement implements IYCoreGlobalProviderProps {
  @property({ type: Array }) plugins: IYCoreGlobalProviderProps['plugins']
  @provide({ context: globalContextCreated })
  @state()
  public readonly globalContext = new GlobalContext()

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreGlobalProviderVarsCSS)}
      ${unsafeCSS(YCoreGlobalProviderScopedCSS)}
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

    // Уничтожаем плагины при отключении компонента
    if (this.plugins?.length) {
      uninstallPlugins(this.plugins, this.globalContext)
    }
  }

  updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties)

    // Обрабатываем изменение плагинов
    if (changedProperties.has('plugins')) {
      const oldPlugins = changedProperties.get('plugins') || []
      const newPlugins = this.plugins || []

      // Удаляем только те плагины, которых нет в новом списке
      const pluginsToRemove = oldPlugins.filter((oldPlugin) => !newPlugins.some((newPlugin) => newPlugin.id === oldPlugin.id))

      // Добавляем только новые плагины, которых не было в старом списке
      const pluginsToAdd = newPlugins.filter((newPlugin) => !oldPlugins.some((oldPlugin) => oldPlugin.id === newPlugin.id))

      // Уничтожаем только удаленные плагины
      if (pluginsToRemove.length) {
        uninstallPlugins(pluginsToRemove, this.globalContext)
      }

      // Инициализируем только новые плагины
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
