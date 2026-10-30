import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { renderIcon } from '~core/renderers'

import {
  AltCoreSegmentOptionTagName as tagName,
} from '~shared/constants'
import { EAltSizes } from '~shared/types/global'

import AltCoreSegmentOptionVarsCss from '~core/ui/segmentOption/css/SegmentOption.vars.css?inline'
import AltCoreSegmentOptionScopedCss from '~core/ui/segmentOption/css/SegmentOption.scoped.css?inline'

import {
  type IAltCoreSegmentOptionProps,
  createCoreSegmentOptionProps,
  ClickEvent,
} from '~core/ui/segmentOption/models/types'

import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { interceptEvents } from '~core/utils/event-interceptor'
import { withLocator } from '~core/utils/locator'

const { active, disabled, hovered, icon, locator, size, value } = createCoreSegmentOptionProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreSegmentOption extends LitElement implements IAltCoreSegmentOptionProps {
  @property({ type: Boolean, reflect: true }) active: IAltCoreSegmentOptionProps['active'] = active
  @property({ type: Boolean }) disabled: IAltCoreSegmentOptionProps['disabled'] = disabled
  @property({ type: Boolean, reflect: true }) hovered: IAltCoreSegmentOptionProps['hovered'] = hovered
  @property({ type: Object, reflect: true }) icon: IAltCoreSegmentOptionProps['icon'] = icon
  @property({ type: String }) locator: IAltCoreSegmentOptionProps['locator'] = locator
  @property({ type: String, reflect: true }) size: IAltCoreSegmentOptionProps['size'] = size
  @property({ type: String }) value: IAltCoreSegmentOptionProps['value'] = value

  @bubblingEvent(
    ClickEvent,
    { name: 'click-option' },
  )
  private _click!: TDispatcher<ClickEvent>

  private readonly baseClass = tagName

  private get computedIconSize() {
    return this.size === EAltSizes.LARGE
      ? '24px'
      : '16px'
  }

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreSegmentOptionVarsCss)}
      ${unsafeCSS(AltCoreSegmentOptionScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_active`]: this.disabled ? false : Boolean(this.active),
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
      [`${this.baseClass}_hovered`]: this.disabled ? false : Boolean(this.hovered),
      [`${this.baseClass}_size_${this.size}`]: Boolean(this.size),
    }
  }

  private handleClick = (event: MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

    if (this.active || this.disabled) return

    this._click({ detail: { value: this.value } })
  }


  protected render() {
    return html`
      <div
        class=${classMap(this.computedClasses)}
        @click=${this.handleClick}
      >
        ${renderIcon({
          icon: this.icon,
          size: this.computedIconSize,
        })}
        <div class="${this.baseClass}__text">
          <slot></slot>
        </div>
      </div>
    `
  }
}
