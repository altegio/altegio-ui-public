import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { repeat } from 'lit/directives/repeat.js'
import { random } from 'radash'

import {
  createCoreSkeletonTableProps,
  type IAltCoreSkeletonTableProps,
} from '~core/ui/skeletonTable/models/types'
import {
  AltCoreSkeletonTableTagName as tagName,
} from '~shared/constants'

import AltCoreSkeletonTableVarsCss from '~core/ui/skeletonTable/css/SkeletonTable.vars.css?inline'
import AltCoreSkeletonTableScopedCss from '~core/ui/skeletonTable/css/SkeletonTable.scoped.css?inline'
import AltCoreTableRowOutsideCss from '~core/ui/tableRow/css/TableRow.outside.css?inline'

import { booleanConverter } from '~core/utils/converters'

import '~core/ui/table'
import '~core/ui/tableBar'
import '~core/ui/tableRow'
import '~core/ui/tableHeadCell'
import '~core/ui/tableCell'
import { withLocator } from '~core/utils/locator'

const { columns, rows, hasPagination, stripe, hideHead, hideBar } = createCoreSkeletonTableProps()

const MIN_RANDOM_RATIO = 0.2
const MAX_RANDOM_RATIO = 0.7

@customElement(tagName)
@withLocator(tagName)
export class AltCoreSkeletonTable
  extends LitElement
  implements IAltCoreSkeletonTableProps {
  @property({ type: Array }) columns: IAltCoreSkeletonTableProps['columns'] = columns
  @property({ type: Number }) rows: IAltCoreSkeletonTableProps['rows'] = rows
  @property({ type: Boolean, attribute: 'has-pagination', converter: booleanConverter }) hasPagination: IAltCoreSkeletonTableProps['hasPagination'] = hasPagination
  @property({ type: Boolean, attribute: 'stripe', converter: booleanConverter }) stripe: IAltCoreSkeletonTableProps['stripe'] = stripe
  @property({ type: Boolean, attribute: 'hide-head', converter: booleanConverter }) hideHead: IAltCoreSkeletonTableProps['hideHead'] = hideHead
  @property({ type: Boolean, attribute: 'hide-bar', converter: booleanConverter }) hideBar: IAltCoreSkeletonTableProps['hideBar'] = hideBar

  private readonly baseClass = tagName
  private readonly baseClassPagination = `${tagName}__pagination`
  private readonly baseClassPlaceholder = `${tagName}__placeholder`
  private readonly baseClassPlaceholderCell = `${tagName}__placeholder_cell`

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreSkeletonTableVarsCss)}
      ${unsafeCSS(AltCoreSkeletonTableScopedCss)}
      ${unsafeCSS(AltCoreTableRowOutsideCss)}
    `,
  ]

  private get computedClasses() {
    return { [this.baseClass]: true }
  }
  private get computedGridTemplateColumns() {
    const columns = this.columns ?? []
    const columnsValue = columns.length > 0
      ? columns.map(({ gridTemplate }) => gridTemplate).join(' ')
      : '1fr'

    return `grid-template-columns: ${columnsValue};`
  }

  protected renderColumns(isHead: boolean) {
    return repeat(
      this.columns ?? [],
      (_, columnIndex) => `column-${columnIndex}`,
      ({ align }) => {
        const randomWidth = random(
          100 * MIN_RANDOM_RATIO,
          100 * MAX_RANDOM_RATIO,
        )
        const cssWidth = `width: ${randomWidth}%;`

        return isHead
          ? html`
            <alt-core-table-head-cell
              .align=${align}
              class=${this.baseClassPlaceholderCell}
            >
              <div
                class=${this.baseClassPlaceholder}
                slot="cell"
                style=${cssWidth}
              ></div>
            </alt-core-table-head-cell>
          `
          : html`
            <alt-core-table-cell
              .align=${align}
              class=${this.baseClassPlaceholderCell}
            >
              <div
                class=${this.baseClassPlaceholder}
                slot="cell"
                style=${cssWidth}
              ></div>
            </alt-core-table-cell>
          `
      },
    )
  }
  protected renderRows() {
    return repeat(
      Array.from(Array(this.rows)),
      (_, rowIndex) => `row-${rowIndex}`,
      () => {
        return html`
          <alt-core-table-row .stripe=${this.stripe} slot="body">
            ${this.renderColumns(false)}
          </alt-core-table-row>
        `
      },
    )
  }

  protected renderPagination() {
    if (!this.hasPagination) return nothing

    return html`
      <div class=${this.baseClassPagination} slot="pagination">
        <div class=${this.baseClassPlaceholder}></div>
        <div class=${this.baseClassPlaceholder}></div>
        <div class=${this.baseClassPlaceholder}></div>
      </div>
    `
  }


  protected render() {
    return html`
      <alt-core-table
        .hideHead=${this.hideHead}
        .hideBar=${this.hideBar}
        style=${this.computedGridTemplateColumns}
        class=${classMap(this.computedClasses)}
      >
        <alt-core-table-row slot="head">
          ${this.renderColumns(true)}
        </alt-core-table-row>

        <alt-core-table-bar slot="bar"></alt-core-table-bar>
        ${this.renderRows()}
        ${this.renderPagination()}
      </alt-core-table>
    `
  }
}
