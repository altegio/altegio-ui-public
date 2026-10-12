import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, state, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import {
  createCoreDropdownCellProps,
  type IYCoreDropdownCellProps,
} from '~core/ui/dropdownCell/models/types'
import {
  YCoreDropdownCellTagName as tagName,
} from '~shared/constants'

import '~core/ui/dropdownCellText'


import YCoreDropdownCellVarsCSS from '~core/ui/dropdownCell/css/DropdownCell.vars.css?inline'
import YCoreDropdownCellScopedCSS from '~core/ui/dropdownCell/css/DropdownCell.scoped.css?inline'
import { hasSlotContent } from '~core/utils/lit-slots'
import { withLocator } from '~core/utils/locator'

const { locator } = createCoreDropdownCellProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreDropdownCell extends LitElement implements IYCoreDropdownCellProps {
  @property({ type: String }) locator: IYCoreDropdownCellProps['locator'] = locator
  @state() hasLeftSlot = false
  @state() hasRightSlot = false

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreDropdownCellVarsCSS)}
      ${unsafeCSS(YCoreDropdownCellScopedCSS)}
    `,
  ]

  private get computedClasses() {
    return { [this.baseClass]: true }
  }

  private get computedLeftContentClasses() {
    return {
      [`${this.baseClass}__prepend`]: true,
      [`${this.baseClass}__prepend_hidden`]: !this.hasLeftSlot,
    }
  }

  private get computedRightContentClasses() {
    return {
      [`${this.baseClass}__append`]: true,
      [`${this.baseClass}__append_hidden`]: !this.hasRightSlot,
    }
  }

  private handleLeftSlotChange = (e: Event) => {
    e.stopPropagation()

    const target = e.target as HTMLSlotElement
    this.hasLeftSlot = hasSlotContent(target)
  }

  private handleRightSlotChange = (e: Event) => {
    e.stopPropagation()

    const target = e.target as HTMLSlotElement
    this.hasRightSlot = hasSlotContent(target)
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <slot name="cell">
          <div class=${classMap(this.computedLeftContentClasses)}>
            <slot name="prepend" @slotchange=${this.handleLeftSlotChange}></slot>
          </div>
          <div class="${this.baseClass}__content">
            <slot name="content">
              <y-core-dropdown-cell-text>
                <div slot="label">
                  <slot name="label"></slot>
                </div>
              </y-core-dropdown-cell-text>
            </slot>
          </div>
          <div class=${classMap(this.computedRightContentClasses)}>
            <slot name="append" @slotchange=${this.handleRightSlotChange}></slot>
          </div>
        </slot>
      </div>
    
    `
  }
}
