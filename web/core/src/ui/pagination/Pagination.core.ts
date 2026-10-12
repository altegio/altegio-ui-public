import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { repeat } from 'lit/directives/repeat.js'

import {
  createCorePaginationProps,
  type IYCorePaginationProps,
  ChangePageEvent,
} from '~core/ui/pagination/models/types'
import {
  YCorePaginationTagName as tagName,
} from '~shared/constants'
import { interceptEvents } from '~core/utils/event-interceptor'
import { bubblingEvent } from '~core/utils/event-decorator'
import type { TDispatcher } from '~core/utils/event-decorator'

import '~core/ui/text'
import '~core/ui/simpleButton'
import '~core/ui/iconButton'

import YCorePaginationVarsCss from '~core/ui/pagination/css/Pagination.vars.css?inline'
import YCorePaginationScopedCss from '~core/ui/pagination/css/Pagination.scoped.css?inline'

import { yChevronLeft, yChevronRight } from '~shared/icons'
import { withLocator } from '~core/utils/locator'

const { page, itemsPerPage, total, disabled } = createCorePaginationProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCorePagination
  extends LitElement
  implements IYCorePaginationProps {
  @property({ type: Number }) page: IYCorePaginationProps['page'] = page
  @property({ type: Number, attribute: 'items-per-page' }) itemsPerPage: IYCorePaginationProps['itemsPerPage'] = itemsPerPage
  @property({ type: Number }) total: IYCorePaginationProps['total'] = total
  @property({ type: Boolean }) disabled: IYCorePaginationProps['disabled'] = disabled

  @bubblingEvent(
    ChangePageEvent,
    { name: 'change-page' },
  )
  private _changePage!: TDispatcher<ChangePageEvent>

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCorePaginationVarsCss)}
      ${unsafeCSS(YCorePaginationScopedCss)}
    `,
  ]

  private get computedClasses() {
    return { [this.baseClass]: true }
  }

  private get computedPages() {
    return Math.max(1, Math.ceil(Number(this.total) / Number(this.itemsPerPage)))
  }

  private handleChangePage = (page: number) => (event: Event) => {
    event.stopPropagation()
    event.preventDefault()

    this._changePage({ detail: { page, event } })
  }

  private handlePreviousPage = (event: Event) => {
    event.stopPropagation()

    this._changePage({ detail: { page: Number(this.page) - 1, event } })
  }

  private handleNextPage = (event: Event) => {
    event.stopPropagation()

    this._changePage({ detail: { page: Number(this.page) + 1, event } })
  }

  protected renderPages() {
    const pages = Array.from({ length: this.computedPages }, (_, index) => index + 1)

    return repeat(
      pages,
      (page) => `page-${page}`,
      (page) => html`
        <y-core-simple-button
          .disabled=${this.disabled || page === Number(this.page)}
          variant=${this.page === page ? 'primary' : 'text'}
          @click=${this.handleChangePage(page)}
        >
          <y-core-text
            variant=${this.page === page ? 'primary' : 'secondary'}
            size="a2-medium"
          >${page}</y-core-text>
        </y-core-simple-button>
      `,
    )
  }


  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <y-core-icon-button
          .disabled=${this.disabled || Number(this.page) === 1}
          variant="text"
          .icon=${yChevronLeft}
          @click=${this.handlePreviousPage}
        ></y-core-icon-button> 
        ${this.renderPages()}
        <y-core-icon-button
          .disabled=${this.disabled || Number(this.page) === this.computedPages}
          variant="text"
          .icon=${yChevronRight}
          @click=${this.handleNextPage}
        ></y-core-icon-button>
      </div>
    `
  }
}
