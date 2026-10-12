import { LitElement, html, css, unsafeCSS, nothing, type PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { provide } from '@lit/context'

import {
  createCoreTableProps,
  type IYCoreTableProps,
} from '~core/ui/table/models/types'
import {
  YCoreTableTagName as tagName,
} from '~shared/constants'
import { booleanConverter } from '~core/utils/converters'

import { pluginsContextCreated, installPlugins, uninstallPlugins } from './plugins/context'

import YCoreTableVarsCss from '~core/ui/table/css/Table.vars.css?inline'
import YCoreTableScopedCss from '~core/ui/table/css/Table.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { loading, disabled, plugins, hideHead, hideBar } = createCoreTableProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreTable
  extends LitElement
  implements IYCoreTableProps {
  @property({ type: Boolean, converter: booleanConverter, attribute: 'loading' }) loading: IYCoreTableProps['loading'] = loading
  @property({ type: Boolean }) disabled: IYCoreTableProps['disabled'] = disabled
  @property({ type: Boolean, converter: booleanConverter, attribute: 'hide-head' }) hideHead: IYCoreTableProps['hideHead'] = hideHead
  @property({ type: Boolean, converter: booleanConverter, attribute: 'hide-bar' }) hideBar: IYCoreTableProps['hideBar'] = hideBar

  @provide({ context: pluginsContextCreated })
  @property({ type: Object }) plugins: IYCoreTableProps['plugins'] = plugins

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreTableVarsCss)}
      ${unsafeCSS(YCoreTableScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_loading`]: Boolean(this.loading),
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
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
        <slot name="placeholder"></slot>
  
        <slot name="actions"></slot>

        ${this.hideHead
          ? nothing
          : html`
            <slot name="head"></slot>
          `}

        ${this.hideBar
          ? nothing
          : html`
            <slot name="bar"></slot>
          `}
            
        <slot name="body"></slot>

        <slot name="pagination"></slot>
      </div>
    `
  }
}
