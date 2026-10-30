import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import { repeat } from 'lit/directives/repeat.js'

import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { ItemClickEvent } from '~core/ui/dropdownList/models/types/events'

import {
  createCoreDropdownListProps,
  type IAltCoreDropdownListProps,
} from '~core/ui/dropdownList/models/types'
import {
  AltCoreDropdownListTagName as tagName,
  AltCoreDropdownCellTagName,
} from '~shared/constants'

import type { IDropdownListItem } from '~shared/types/global'

import AltCoreDropdownListVarsCSS from '~core/ui/dropdownList/css/DropdownList.vars.css?inline'
import AltCoreDropdownListScopedCSS from '~core/ui/dropdownList/css/DropdownList.scoped.css?inline'

import '~core/ui/dropdownCell'
import { withLocator } from '~core/utils/locator'

const { items, itemLabel, minWidth, noMaxHeight } = createCoreDropdownListProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreDropdownList
  extends LitElement
  implements IAltCoreDropdownListProps {
  @property({ type: Array }) items: IAltCoreDropdownListProps['items'] = items
  @property({ type: String, attribute: 'item-label' }) itemLabel: IAltCoreDropdownListProps['itemLabel'] = itemLabel
  @property({ type: String, attribute: 'min-width' }) minWidth: IAltCoreDropdownListProps['minWidth'] = minWidth
  @property({ type: Boolean, attribute: 'no-max-height' }) noMaxHeight: IAltCoreDropdownListProps['noMaxHeight'] = noMaxHeight

  @bubblingEvent(
    ItemClickEvent,
    { name: 'item-click' },
  )
  _itemClick!: TDispatcher<ItemClickEvent>

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreDropdownListVarsCSS)}
      ${unsafeCSS(AltCoreDropdownListScopedCSS)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_no-max-height`]: Boolean(this.noMaxHeight),
      'alt-scrollbar': true,
    }
  }

  private get computedStyles() {
    return { minWidth: this.minWidth }
  }

  private handleListItemClick = (event: Event, item: IDropdownListItem) => {
    event.stopPropagation()

    this._itemClick({ detail: { item } })
  }

  protected renderList() {
    if (!this.items || !itemLabel) return null

    return repeat(
      this.items,
      (item) => item.id,
      (item) => html`
        <alt-core-dropdown-cell
          locator=${`${AltCoreDropdownCellTagName}_${item.id}`}
          @click=${(event: Event) => {
            this.handleListItemClick(event, item)
          }}
        >
          <div slot="label">
            ${item[this.itemLabel || itemLabel]}
          </div>
        </alt-core-dropdown-cell>
      `,
    )
  }


  protected render() {
    return html`
      <div
        class=${classMap(this.computedClasses)}
        style=${styleMap(this.computedStyles)}
      >
        <slot name="top"></slot>

        <slot name="list">
          ${this.renderList()}
        </slot>

        <slot name="bottom"></slot>
      </div>
    `
  }
}
