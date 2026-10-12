import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import { repeat } from 'lit/directives/repeat.js'

import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { ItemClickEvent } from '~core/ui/dropdownList/models/types/events'

import {
  createCoreDropdownListProps,
  type IYCoreDropdownListProps,
} from '~core/ui/dropdownList/models/types'
import {
  YCoreDropdownListTagName as tagName,
  YCoreDropdownCellTagName,
} from '~shared/constants'

import type { IDropdownListItem } from '~shared/types/global'

import YCoreDropdownListVarsCSS from '~core/ui/dropdownList/css/DropdownList.vars.css?inline'
import YCoreDropdownListScopedCSS from '~core/ui/dropdownList/css/DropdownList.scoped.css?inline'

import '~core/ui/dropdownCell'
import { withLocator } from '~core/utils/locator'

const { items, itemLabel, minWidth, noMaxHeight } = createCoreDropdownListProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreDropdownList
  extends LitElement
  implements IYCoreDropdownListProps {
  @property({ type: Array }) items: IYCoreDropdownListProps['items'] = items
  @property({ type: String, attribute: 'item-label' }) itemLabel: IYCoreDropdownListProps['itemLabel'] = itemLabel
  @property({ type: String, attribute: 'min-width' }) minWidth: IYCoreDropdownListProps['minWidth'] = minWidth
  @property({ type: Boolean, attribute: 'no-max-height' }) noMaxHeight: IYCoreDropdownListProps['noMaxHeight'] = noMaxHeight

  @bubblingEvent(
    ItemClickEvent,
    { name: 'item-click' },
  )
  _itemClick!: TDispatcher<ItemClickEvent>

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreDropdownListVarsCSS)}
      ${unsafeCSS(YCoreDropdownListScopedCSS)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_no-max-height`]: Boolean(this.noMaxHeight),
      'y-scrollbar': true,
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
        <y-core-dropdown-cell
          locator=${`${YCoreDropdownCellTagName}_${item.id}`}
          @click=${(event: Event) => {
            this.handleListItemClick(event, item)
          }}
        >
          <div slot="label">
            ${item[this.itemLabel || itemLabel]}
          </div>
        </y-core-dropdown-cell>
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
