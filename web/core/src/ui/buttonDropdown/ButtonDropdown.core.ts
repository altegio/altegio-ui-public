import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'
import type { PropertyValues } from 'lit'

import { interceptEvents } from '~core/utils/event-interceptor'
import { bubblingEvent } from '~core/utils/event-decorator'
import { booleanConverter } from '~core/utils/converters'
import type { TDispatcher } from '~core/utils/event-decorator'

import { altChevronUp, altChevronDown, altPlus } from '~shared/icons'
import { AltCoreButtonDropdownTagName as tagName, AltCoreDropdownCellTagName } from '~shared/constants'

import '~core/ui/dropdown'
import '~core/ui/dropdownCell'
import '~core/ui/dropdownList'
import '~core/ui/button'

import { EAltCoreDropdownTrigger } from '~core/ui/dropdown/models/types'
import type { IDropdownListItem } from '~shared/types/global'

import {
  createCoreButtonDropdownProps,
  type IAltCoreButtonDropdownProps,
  ItemClickEvent,
  VisibleEvent,
} from '~core/ui/buttonDropdown/models/types'

import {
  EAltCoreButtonDropdownIconTypes,
  type IAltCoreButtonDropdownIconsSet,
} from '~core/ui/buttonDropdown/models/types/internal'

import AltButtonDropdownScopedCss from '~core/ui/buttonDropdown/css/ButtonDropdown.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const {
  disabled,
  loading,
  fullWidth,
  isOpen,
  autoClose,
  variant,
  size,
  label,
  alignment,
  iconType,
  items,
} = createCoreButtonDropdownProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreButtonDropdown extends LitElement implements IAltCoreButtonDropdownProps {
  @property({ type: Boolean }) disabled: IAltCoreButtonDropdownProps['disabled'] = disabled
  @property({ type: Boolean }) loading: IAltCoreButtonDropdownProps['loading'] = loading
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth: IAltCoreButtonDropdownProps['fullWidth'] = fullWidth
  @property({ type: Boolean, reflect: true, converter: booleanConverter, attribute: 'is-open' }) isOpen: IAltCoreButtonDropdownProps['isOpen'] = isOpen
  @property({ type: Boolean, reflect: true, converter: booleanConverter, attribute: 'auto-close' }) autoClose: IAltCoreButtonDropdownProps['autoClose'] = autoClose
  @property({ type: String }) variant: IAltCoreButtonDropdownProps['variant'] = variant
  @property({ type: String }) size: IAltCoreButtonDropdownProps['size'] = size
  @property({ type: String }) label: IAltCoreButtonDropdownProps['label'] = label
  @property({ type: String }) alignment: IAltCoreButtonDropdownProps['alignment'] = alignment
  @property({ type: String, attribute: 'icon-type' }) iconType: IAltCoreButtonDropdownProps['iconType'] = iconType
  @property({ type: Array }) items: IAltCoreButtonDropdownProps['items'] = items

  @state() private isDropdownOpened = false

  @bubblingEvent(
    ItemClickEvent,
    { name: 'item-click' },
  )
  private _itemClick!: TDispatcher<ItemClickEvent>

  @bubblingEvent(
    VisibleEvent,
    { name: 'change-visible' },
  )
  private _visible!: TDispatcher<VisibleEvent>

  private readonly baseClass = tagName
  private readonly baseDropdownClass = `${tagName}__dropdown`
  private readonly offsetOptions = { mainAxis: 4 }

  static readonly styles = [
    css`
      ${unsafeCSS(AltButtonDropdownScopedCss)}
    `,
  ]

  private get computedIconsSet(): IAltCoreButtonDropdownIconsSet {
    let leftIcon = undefined
    let rightIcon = undefined

    if (this.iconType === EAltCoreButtonDropdownIconTypes.LEFT) {
      leftIcon = altPlus
    } else {
      rightIcon = this.isDropdownOpened ? altChevronUp : altChevronDown
    }

    return { leftIcon, rightIcon }
  }

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_full-width`]: Boolean(this.fullWidth),
    }
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('isOpen')) {
      this.isDropdownOpened = this.isOpen ?? false
    }
  }

  private closeDropdown = () => {
    this.isDropdownOpened = false
  }

  private handleItemClick = (event: ItemClickEvent, item: IDropdownListItem) => {
    event.stopPropagation()

    this.closeDropdown()

    this._itemClick({ detail: { item } })
  }

  private handleDropdownContentClick = (event: Event) => {
    if (!this.autoClose) return

    event.stopPropagation()

    this.closeDropdown()
  }

  private handleClickOutside = (event: VisibleEvent) => {
    event.stopPropagation()
  }

  private handleChangeVisible = (event: VisibleEvent) => {
    event.stopPropagation()

    this.isDropdownOpened = event.detail.value

    this._visible({ detail: event.detail })
  }

  protected renderDropdownList() {
    if (!this.items) return nothing

    return repeat(
      this.items,
      (item) => item.id,
      (item) => html`
        <alt-core-dropdown-cell
          locator=${`${AltCoreDropdownCellTagName}_${item.id}`}
          class=${this.baseDropdownClass}
          @click=${(event: ItemClickEvent) => {
            this.handleItemClick(event, item)
          }}
        >
          <div slot="content" class=${`${this.baseDropdownClass}-content`}>
            <div slot="label" class=${`${this.baseDropdownClass}-label`} title=${String(item.label)}>
              ${item.label}
            </div>
          </div>
        </alt-core-dropdown-cell>
      `,
    )
  }

  protected renderDropdownContent() {
    return html`
      <alt-core-dropdown-list>
        <div slot="list">
          <slot
            name="content"
            @click=${this.handleDropdownContentClick}
          >
            ${this.renderDropdownList()}
          </slot>
        </div>
      </alt-core-dropdown-list>`
  }


  protected render() {
    return html`
      <alt-core-dropdown
        class=${classMap(this.computedClasses)}
        .offset=${this.offsetOptions}
        .trigger=${EAltCoreDropdownTrigger.CLICK}
        .isOpen=${this.isDropdownOpened}
        inline
        @click-outside=${this.handleClickOutside}
        @change-visible=${this.handleChangeVisible}
      >
        <slot
          slot="activator"
          name="activator"
        >
          <alt-core-button
            class="${this.baseClass}__button"
            label=${ifDefined(this.label)}
            variant=${ifDefined(this.variant)}
            size=${ifDefined(this.size)}
            alignment=${ifDefined(this.alignment)}
            .disabled=${this.disabled}
            .loading=${this.loading}
            .fullWidth=${this.fullWidth}
            .iconLeft=${this.computedIconsSet.leftIcon}
            .iconRight=${this.computedIconsSet.rightIcon}
          >
          </alt-core-button>
        </slot>

        <div slot="content">
          ${this.renderDropdownContent()}
        </div>
      </alt-core-dropdown>
    `
  }
}
