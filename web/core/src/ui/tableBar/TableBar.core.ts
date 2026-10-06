import { LitElement, html, css, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { consume } from '@lit/context'
import { classMap } from 'lit/directives/class-map.js'

import {
  type IYCoreTableBarProps,
} from '~core/ui/tableBar/models/types'
import {
  YCoreTableBarTagName as tagName,
} from '~shared/constants'

import YCoreTableBarVarsCss from '~core/ui/tableBar/css/TableBar.vars.css?inline'
import YCoreTableBarScopedCss from '~core/ui/tableBar/css/TableBar.scoped.css?inline'

import {
  pluginsContextCreated,
  installPlugins,
  uninstallPlugins,
  type TTablePluginsContext,
} from '~core/ui/table/plugins'
import { withLocator } from '~core/utils/locator'

@customElement(tagName)
@withLocator(tagName)
export class YCoreTableBar
  extends LitElement
  implements IYCoreTableBarProps {
  @consume({ context: pluginsContextCreated, subscribe: true })
  @state()
  private plugins!: TTablePluginsContext

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreTableBarVarsCss)}
      ${unsafeCSS(YCoreTableBarScopedCss)}
    `,
  ]

  private get computedClasses() {
    return { [this.baseClass]: true }
  }

  connectedCallback() {
    super.connectedCallback()


    installPlugins(
      this.plugins,
      tagName,
      this,
    )
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    uninstallPlugins(
      this.plugins,
      tagName,
      this,
    )
  }

  protected updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('plugins')) {
      const plugins = this.plugins?.[tagName] ?? []

      if (plugins.length > 0) {
        installPlugins(
          this.plugins,
          tagName,
          this,
        )
      } else {
        const oldPlugins = _changedProperties.get('plugins') as typeof this.plugins

        uninstallPlugins(
          oldPlugins,
          tagName,
          this,
        )
      }
    }
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}></div>
    `
  }
}
