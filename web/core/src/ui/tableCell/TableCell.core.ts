import { LitElement, html, css, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { consume } from '@lit/context'
import { classMap } from 'lit/directives/class-map.js'

import {
  createCoreTableCellProps,
  type IAltCoreTableCellProps,
} from '~core/ui/tableCell/models/types'
import {
  AltCoreTableCellTagName as tagName,
} from '~shared/constants'

import { booleanConverter } from '~core/utils/converters'
import { interceptEvents } from '~core/utils/event-interceptor'

import AltCoreTableCellVarsCss from '~core/ui/tableCell/css/TableCell.vars.css?inline'
import AltCoreTableCellScopedCss from '~core/ui/tableCell/css/TableCell.scoped.css?inline'
import '~core/ui/tableCell/css/TableCell.outside.css'

import {
  pluginsContextCreated,
  installPlugins,
  uninstallPlugins,
  type TTablePluginsContext,
} from '~core/ui/table/plugins'

import '~core/ui/text'
import { withLocator } from '~core/utils/locator'

const { sticky, align, item, itemLabel, disabled, ellipsis, lineclamp, bordered } = createCoreTableCellProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreTableCell
  extends LitElement
  implements IAltCoreTableCellProps {
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) sticky: IAltCoreTableCellProps['sticky'] = sticky
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) bordered: IAltCoreTableCellProps['bordered'] = bordered
  @property({ type: String }) align: IAltCoreTableCellProps['align'] = align
  @property({ type: Object }) item: IAltCoreTableCellProps['item'] = item
  @property({ type: String, attribute: 'item-label' }) itemLabel: IAltCoreTableCellProps['itemLabel'] = itemLabel
  @property({ type: Boolean }) disabled: IAltCoreTableCellProps['disabled'] = disabled
  @property({ type: Boolean }) ellipsis: IAltCoreTableCellProps['ellipsis'] = ellipsis
  @property({ type: Number }) lineclamp: IAltCoreTableCellProps['lineclamp'] = lineclamp

  @consume({ context: pluginsContextCreated, subscribe: true })
  @state()
  private plugins!: TTablePluginsContext

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreTableCellVarsCss)}
      ${unsafeCSS(AltCoreTableCellScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_align_${this.align}`]: Boolean(this.align),
      [`${this.baseClass}_sticky`]: Boolean(this.sticky),
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
    }
  }

  private get computedContent() {
    return this.item && this.itemLabel ? this.item[this.itemLabel] : ''
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
      <div
        class=${classMap(this.computedClasses)}
      >
        <slot name="plugin"></slot>
        <alt-core-text
          size="p2-regular"
          class="${this.baseClass}__content"
          .ellipsis=${this.ellipsis}
          .lineclamp=${this.lineclamp}
        >
          <slot name="cell">${this.computedContent}</slot>
        </alt-core-text>
      </div>
    `
  }
}
