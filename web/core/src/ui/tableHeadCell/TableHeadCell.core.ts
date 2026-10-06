import { LitElement, html, css, unsafeCSS, nothing, type PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { consume } from '@lit/context'
import { classMap } from 'lit/directives/class-map.js'
import { alphabetical } from 'radash'

import {
  createCoreTableHeadCellProps,
  type IYCoreTableHeadCellProps,
} from '~core/ui/tableHeadCell/models/types'
import {
  YCoreTableHeadCellTagName as tagName,
} from '~shared/constants'

import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { interceptEvents } from '~core/utils/event-interceptor'
import { hasSlotContent } from '~core/utils/lit-slots'
import { renderIcon } from '~core/renderers'
import { booleanConverter } from '~core/utils/converters'
import { ESort, type TSort } from '~shared/types/global'

import { yChevronDown, yChevronUp, ySortDefault, yInfo, type IYIcon } from '~shared/icons'

import '~core/ui/tableCell'
import '~core/ui/text'
import '~core/ui/tooltip'

import YCoreTableHeadCellVarsCss from '~core/ui/tableHeadCell/css/TableHeadCell.vars.css?inline'
import YCoreTableHeadCellScopedCss from '~core/ui/tableHeadCell/css/TableHeadCell.scoped.css?inline'
import '~core/ui/tableHeadCell/css/TableHeadCell.outside.css'

import {
  pluginsContextCreated,
  installPlugins,
  uninstallPlugins,
  type TTablePluginsContext,
} from '~core/ui/table/plugins'

import { TableHeadCellSortEvent } from './models/types/events'
import { withLocator } from '~core/utils/locator'

const {
  sticky,
  bordered,
  align,
  disabled,
  sortable,
  sortDirection,
  header,
  headerLabel,
  ellipsis,
  lineclamp,
  hasHint,
} = createCoreTableHeadCellProps()

const mapSwitchSortDirection: Record<TSort, TSort> = {
  [ESort.ASC]: ESort.DESC,
  [ESort.DESC]: ESort.DEFAULT,
  [ESort.DEFAULT]: ESort.ASC,
}
const mapSortIcon: Record<TSort, IYIcon> = {
  [ESort.ASC]: yChevronDown,
  [ESort.DESC]: yChevronUp,
  [ESort.DEFAULT]: ySortDefault,
}

const getAlphabeticalSort = (direction: TSort) => {
  return direction !== ESort.ASC && direction !== ESort.DESC ? undefined : direction
}

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCoreTableHeadCell
  extends LitElement
  implements IYCoreTableHeadCellProps {
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) sticky: IYCoreTableHeadCellProps['sticky'] = sticky
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) bordered: IYCoreTableHeadCellProps['bordered'] = bordered
  @property({ type: String }) align: IYCoreTableHeadCellProps['align'] = align
  @property({ type: Boolean }) disabled: IYCoreTableHeadCellProps['disabled'] = disabled
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) sortable: IYCoreTableHeadCellProps['sortable'] = sortable
  @property({ type: String, attribute: 'sort-direction' }) sortDirection: IYCoreTableHeadCellProps['sortDirection'] = sortDirection
  @property({ type: Object }) header: IYCoreTableHeadCellProps['header'] = header
  @property({ type: String, attribute: 'header-label' }) headerLabel: IYCoreTableHeadCellProps['headerLabel'] = headerLabel
  @property({ type: Boolean }) ellipsis: IYCoreTableHeadCellProps['ellipsis'] = ellipsis
  @property({ type: Number }) lineclamp: IYCoreTableHeadCellProps['lineclamp'] = lineclamp
  @property({ type: Boolean, attribute: 'has-hint' }) hasHint = hasHint

  @state() private hasHintSlot = false

  @consume({ context: pluginsContextCreated, subscribe: true })
  @state()
  private plugins!: TTablePluginsContext

  @bubblingEvent(
    TableHeadCellSortEvent,
    { name: 'sort' },
  )
  private _sort!: TDispatcher<TableHeadCellSortEvent>

  private readonly baseClass = tagName
  private readonly baseWrapClass = `${this.baseClass}__wrap`
  private readonly baseContentClass = `${this.baseClass}__content`
  private readonly baseSortClass = `${this.baseClass}__sort`
  private readonly baseHintClass = `${this.baseClass}__hint`

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreTableHeadCellVarsCss)}
      ${unsafeCSS(YCoreTableHeadCellScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_sticky`]: Boolean(this.sticky),
      [`${this.baseClass}_sortable`]: Boolean(this.sortable),
      [`${this.baseClass}_hide-hint`]: !this.hasHintSlot,
    }
  }

  private get computedSortClasses() {
    return { [this.baseSortClass]: true }
  }

  private get computedContent() {
    return this.header && this.headerLabel ? this.header[this.headerLabel] : ''
  }

  private handleSlotHintChange = (e: Event) => {
    const target = e.target as HTMLSlotElement

    this.hasHintSlot = hasSlotContent(target)
  }

  private handleSort = (event: Event) => {
    event.stopPropagation()

    if (!this.sortable || this.disabled) return

    const direction = mapSwitchSortDirection[this.sortDirection ?? ESort.ASC]

    this._sort({
      detail: {
        direction,
        handler: (items, headId, key, _direction) => direction === ESort.DEFAULT
          ? items
          : alphabetical(
            items,
            (item) => String(item[headId][key]),
            getAlphabeticalSort(_direction ?? direction),
          ),
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

  protected renderContent() {
    return html`
      <slot name="plugin"></slot>
      <y-core-text
        size="p2-medium"
        class=${this.baseContentClass}
        .ellipsis=${this.ellipsis}
        .lineclamp=${this.lineclamp}
        @click=${this.handleSort}
      >
        <div class=${this.baseWrapClass}>
          <slot name="cell">${this.computedContent}</slot>
          ${this.renderSort()}
          ${this.renderHint()}
        </div>
      </y-core-text>
    `
  }

  protected renderSort() {
    return this.sortable
      ? html`
        <div class=${classMap(this.computedSortClasses)} @click=${this.handleSort}>
          ${renderIcon({ icon: mapSortIcon[this.sortDirection ?? ESort.ASC], size: '16px' })}
        </div>
      `
      : nothing
  }

  protected renderHint() {
    return this.hasHint
      ? html`
        <div class=${this.baseHintClass}>
          <y-core-tooltip placement="right">
            <div slot="activator" class=${`${this.baseHintClass}-activator`}>
              ${renderIcon({ icon: yInfo, size: '16px' })}
            </div>

            <slot name="hint" slot="content" class=${`${this.baseHintClass}-content`} @slotchange=${this.handleSlotHintChange}></slot>
          </y-core-tooltip>
        </div>
      `
      : nothing
  }

  protected render() {
    return html`
      <y-core-table-cell
        .align=${this.align}
        .disabled=${this.disabled}
        class=${classMap(this.computedClasses)}
      >
        <div slot="cell" class=${this.baseWrapClass}>
          ${this.renderContent()}
        </div>
      </y-core-table-cell>
    `
  }
}
