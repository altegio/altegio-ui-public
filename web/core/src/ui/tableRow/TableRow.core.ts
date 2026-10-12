import { LitElement, html, css, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { consume } from '@lit/context'
import { classMap } from 'lit/directives/class-map.js'

import {
  createCoreTableRowProps,
  type IYCoreTableRowProps,
} from './models/types'
import {
  YCoreTableRowTagName as tagName,
} from '~shared/constants'

import YCoreTableRowVarsCss from '~core/ui/tableRow/css/TableRow.vars.css?inline'
import YCoreTableRowScopedCss from '~core/ui/tableRow/css/TableRow.scoped.css?inline'
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
export class YCoreTableRow
  extends LitElement
  implements IYCoreTableRowProps {
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) sticky: IYCoreTableRowProps['sticky'] = sticky
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) stripe: IYCoreTableRowProps['stripe'] = stripe
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) selectable: IYCoreTableRowProps['selectable'] = selectable
  @property({ type: Boolean }) disabled: IYCoreTableRowProps['disabled'] = disabled

  @consume({ context: pluginsContextCreated, subscribe: true })
  @state()
  private plugins!: TTablePluginsContext

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreTableRowVarsCss)}
      ${unsafeCSS(YCoreTableRowScopedCss)}
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
