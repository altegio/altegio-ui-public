import { LitElement, html, css, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { consume } from '@lit/context'
import { classMap } from 'lit/directives/class-map.js'

import {
  createCoreTableRowProps,
  type IAltCoreTableRowProps,
} from './models/types'
import {
  AltCoreTableRowTagName as tagName,
} from '~shared/constants'

import AltCoreTableRowVarsCss from '~core/ui/tableRow/css/TableRow.vars.css?inline'
import AltCoreTableRowScopedCss from '~core/ui/tableRow/css/TableRow.scoped.css?inline'
import './css/TableRow.outside.css'

import { booleanConverter } from '~core/utils/converters'

import {
  pluginsContextCreated,
  installPlugins,
  uninstallPlugins,
  type TTablePluginsContext,
} from '~core/ui/table/plugins'
import { withLocator } from '~core/utils/locator'

const { stripe, selectable, sticky, disabled } = createCoreTableRowProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreTableRow
  extends LitElement
  implements IAltCoreTableRowProps {
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) sticky: IAltCoreTableRowProps['sticky'] = sticky
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) stripe: IAltCoreTableRowProps['stripe'] = stripe
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) selectable: IAltCoreTableRowProps['selectable'] = selectable
  @property({ type: Boolean }) disabled: IAltCoreTableRowProps['disabled'] = disabled

  @consume({ context: pluginsContextCreated, subscribe: true })
  @state()
  private plugins!: TTablePluginsContext

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreTableRowVarsCss)}
      ${unsafeCSS(AltCoreTableRowScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_sticky`]: Boolean(this.sticky),
      [`${this.baseClass}_selectable`]: Boolean(this.selectable),
    }
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
      <div class=${classMap(this.computedClasses)}>
        <slot></slot>
      </div>
    `
  }
}
