import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'

import {
  arrow as arrowMiddleware,
  type Middleware,
} from '@floating-ui/dom'

import {
  createCoreTipProps,
  type IAltCoreTipProps,
} from './models/types'
import { getArrowStyles } from './utils/helpers'
import {
  AltCoreTipTagName as tagName,
  AltCoreDropdownTagName,
} from '~shared/constants'

import { bubblingEvent } from '~core/utils/event-decorator'
import type { TDispatcher } from '~core/utils/event-decorator'
import { ClickOutsideEvent, VisibleEvent } from './models/types/events'


import AltCoreTipVarsCss from '~core/ui/tip/css/Tip.vars.css?inline'
import AltCoreTipScopedCss from '~core/ui/tip/css/Tip.scoped.css?inline'

import { altArrowTooltipDown } from '~shared/icons'
import { type TAltCoreDropdownPositionCallback } from '~core/ui/dropdown/models/types/internal'
import '~core/ui/dropdown'
import { AltCoreDropdown } from '~core/ui/dropdown'
import { defineCustomElement } from '~web/shared/utils/components'
import { withLocator } from '~core/utils/locator'

const { trigger, isOpen, offset, padding, placement, strategy, type, transition, disabled, inline } = createCoreTipProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreTip
  extends LitElement
  implements IAltCoreTipProps {
  @property({ type: String }) trigger: IAltCoreTipProps['trigger'] = trigger
  @property({ type: Boolean, attribute: 'is-open', reflect: true }) isOpen: IAltCoreTipProps['isOpen'] = isOpen
  @property({ type: Object }) offset: IAltCoreTipProps['offset'] = offset
  @property({ type: Object }) padding: IAltCoreTipProps['padding'] = padding
  @property({ type: String }) placement: IAltCoreTipProps['placement'] = placement
  @property({ type: String }) strategy: IAltCoreTipProps['strategy'] = strategy
  @property({ type: String }) type: IAltCoreTipProps['type'] = type
  @property({ type: String }) transition: IAltCoreTipProps['transition'] = transition
  @property({ type: Boolean }) disabled: IAltCoreTipProps['disabled'] = disabled
  @property({ type: Boolean }) inline: IAltCoreTipProps['inline'] = inline

  private readonly baseClass = tagName

  @query(`.${tagName}__arrow`) private arrowElement?: HTMLElement
  @state() private isArrowMounted = false

  @bubblingEvent(
    VisibleEvent,
    { name: 'change-visible' },
  )
  private _visible!: TDispatcher<VisibleEvent>

  @bubblingEvent(
    ClickOutsideEvent,
    { name: 'click-outside' },
  )
  private _clickOutside!: TDispatcher<ClickOutsideEvent>

  private get middlewares(): Middleware[] {
    return this.isArrowMounted && this.arrowElement
      ? [arrowMiddleware({ element: this.arrowElement, padding: 8 })]
      : []
  }

  private get positionCallbacks(): TAltCoreDropdownPositionCallback[] {
    return this.isArrowMounted
      ? [
        (data) => {
          if (data.middlewareData.arrow) {
            Object.assign(
              this.arrowElement?.style ?? {},
              getArrowStyles(
                data.middlewareData,
                data.placement,
              ),
            )
          }

          return Promise.resolve(data)
        },
      ]
      : []
  }

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreTipVarsCss)}
      ${unsafeCSS(AltCoreTipScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_type_${this.type}`]: true,
    }
  }

  protected updated(): void {
    this.isArrowMounted = Boolean(this.arrowElement)
  }

  private handleVisibleEmit = (event: VisibleEvent) => {
    event.stopPropagation()

    this._visible({ detail: { value: event.detail.value } })
  }

  private handleClickOutside = (event: ClickOutsideEvent) => {
    event.stopPropagation()

    this._clickOutside(event)
  }


  protected firstUpdated(): void {
    defineCustomElement(tagName, AltCoreTip)
    defineCustomElement(AltCoreDropdownTagName, AltCoreDropdown)
  }

  protected render() {
    return html`
      <alt-core-dropdown
        .trigger=${this.trigger}
        .isOpen=${this.isOpen}
        .offset=${this.offset}
        .padding=${this.padding}
        .placement=${this.placement}
        .strategy=${this.strategy}
        .transition=${this.transition}
        .disabled=${this.disabled}
        .middlewares=${this.middlewares}
        .handlers=${this.positionCallbacks}
        .inline=${this.inline}
        class=${classMap(this.computedClasses)}
        @change-visible=${this.handleVisibleEmit}
        @click-outside=${this.handleClickOutside}
      >
        <slot name="activator" slot="activator">
        </slot>

        <div class="${this.baseClass}__content" slot="content">
          <div class="${this.baseClass}__arrow"> 
            ${unsafeSVG(altArrowTooltipDown.data)} 
          </div>

          <slot name="content"></slot>
        </div>
      </alt-core-dropdown>
    `
  }
}
