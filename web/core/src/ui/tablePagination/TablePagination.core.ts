import { LitElement, html, css, unsafeCSS, type PropertyValues } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { consume } from '@lit/context'

import {
  createCoreTablePaginationProps,
  type IYCoreTablePaginationProps,
  ChangePageEvent,
  ChangeItemsPerPageEvent,
} from './models/types'
import {
  YCoreTablePaginationTagName as tagName,
} from '~shared/constants'

import { interceptEvents } from '~core/utils/event-interceptor'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { arrayConverter } from '~core/utils/converters'

import YCoreTablePaginationVarsCss from '~core/ui/tablePagination/css/TablePagination.vars.css?inline'
import YCoreTablePaginationScopedCss from '~core/ui/tablePagination/css/TablePagination.scoped.css?inline'
import { type SelectEvent } from '~core/ui/selectField/models/types'

import {
  pluginsContextCreated,
  installPlugins,
  uninstallPlugins,
  type TTablePluginsContext,
} from '~core/ui/table/plugins'

import '~core/ui/text'
import '~core/ui/pagination'
import '~core/ui/selectField'
import { withLocator } from '~core/utils/locator'

const { page, itemsPerPage, total, disabled, counterText, optionsItemsPerPage, itemValue, itemLabel } = createCoreTablePaginationProps()

const MIDDLE_TEXT_SEPARATOR = ' из '
const CURRENT_ITEMS_SEPARATOR = '-'

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCoreTablePagination
  extends LitElement
  implements IYCoreTablePaginationProps {
  @property({ type: Number }) page: IYCoreTablePaginationProps['page'] = page
  @property({ type: Number, attribute: 'items-per-page' }) itemsPerPage: IYCoreTablePaginationProps['itemsPerPage'] = itemsPerPage
  @property({ type: Number }) total: IYCoreTablePaginationProps['total'] = total
  @property({ type: Boolean }) disabled: IYCoreTablePaginationProps['disabled'] = disabled
  @property({ type: String, attribute: 'counter-text' }) counterText: IYCoreTablePaginationProps['counterText'] = counterText
  @property({ type: Array, attribute: 'options-items-per-page', converter: arrayConverter }) optionsItemsPerPage: IYCoreTablePaginationProps['optionsItemsPerPage'] = optionsItemsPerPage
  @property({ type: String, attribute: 'item-value' }) itemValue: IYCoreTablePaginationProps['itemValue'] = itemValue
  @property({ type: String, attribute: 'item-label' }) itemLabel: IYCoreTablePaginationProps['itemLabel'] = itemLabel

  @consume({ context: pluginsContextCreated, subscribe: true })
  @state()
  private plugins!: TTablePluginsContext

  @bubblingEvent(
    ChangePageEvent,
    { name: 'change-page' },
  )
  private _changePage!: TDispatcher<ChangePageEvent>

  @bubblingEvent(
    ChangeItemsPerPageEvent,
    { name: 'change-items-per-page' },
  )
  private _changeItemsPerPage!: TDispatcher<ChangeItemsPerPageEvent>

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreTablePaginationVarsCss)}
      ${unsafeCSS(YCoreTablePaginationScopedCss)}
    `,
  ]

  private get computedClasses() {
    return { [this.baseClass]: true }
  }

  private get computedMiddleText() {
    const itemsPerPageByPage = Number(this.itemsPerPage) * Number(this.page)
    const firstCurrentPage = itemsPerPageByPage - Number(this.itemsPerPage) + 1
    const lastCurrentPage = itemsPerPageByPage > Number(this.total) ? Number(this.total) : itemsPerPageByPage
    const currentPages = `${firstCurrentPage}${CURRENT_ITEMS_SEPARATOR}${lastCurrentPage}`

    return `${currentPages}${MIDDLE_TEXT_SEPARATOR}${this.total}`
  }

  private get computedOptionsItemsPerPage() {
    return (this.optionsItemsPerPage ?? []).map((itemsPerPage, index) => ({
      id: `option-${index}`,
      itemsPerPage,
      label: String(itemsPerPage),
    }))
  }

  private handleChangePage = (event: ChangePageEvent) => {
    event.stopPropagation()
    event.preventDefault()

    this._changePage({ detail: { page: Number(event.detail.page), event } })
  }

  private handleSelect = (event: SelectEvent) => {
    event.stopPropagation()
    const itemsPerPage = Number(event.detail.item.itemsPerPage)

    this._changePage({ detail: { page: Number(page), event } })
    this._changeItemsPerPage({
      detail: {
        itemsPerPage,
        event,
      },
    })
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
        <div class=${`${this.baseClass}__counter`}>
          <div class=${`${this.baseClass}__counter-select`}>
            <y-core-select-field
              .value=${this.itemsPerPage}
              .items=${this.computedOptionsItemsPerPage}
              .disabled=${this.disabled}
              item-value=${ifDefined(this.itemValue)}
              item-label=${ifDefined(this.itemLabel)}
              is-map-options
              size="small"
              @select=${this.handleSelect}
            ></y-core-select-field>
          </div>

          <y-core-text size="p2-regular" variant="secondary">${this.counterText}</y-core-text>
        </div>

        <y-core-text size="p2-regular" variant="secondary">${this.computedMiddleText}</y-core-text>

        <y-core-pagination
          .page=${this.page}
          .itemsPerPage=${this.itemsPerPage}
          .total=${this.total}
          .disabled=${this.disabled}
          @change-page=${this.handleChangePage}
        ></y-core-pagination>
      </div>
    `
  }
}
