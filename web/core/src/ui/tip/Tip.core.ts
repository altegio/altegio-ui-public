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
  type IYCoreTipProps,
} from './models/types'
import { getArrowStyles } from './utils/helpers'
import {
  YCoreTipTagName as tagName,
  YCoreDropdownTagName,
} from '~shared/constants'

import { bubblingEvent } from '~core/utils/event-decorator'
import type { TDispatcher } from '~core/utils/event-decorator'
import { ClickOutsideEvent, VisibleEvent } from './models/types/events'


import YCoreTipVarsCss from '~core/ui/tip/css/Tip.vars.css?inline'
import YCoreTipScopedCss from '~core/ui/tip/css/Tip.scoped.css?inline'

import { yArrowTooltipDown } from '~shared/icons'
import { type TYCoreDropdownPositionCallback } from '~core/ui/dropdown/models/types/internal'
import '~core/ui/dropdown'
import { YCoreDropdown } from '~core/ui/dropdown'
import { defineCustomElement } from '~web/shared/utils/components'
import { withLocator } from '~core/utils/locator'

const { trigger, isOpen, offset, padding, placement, strategy, type, transition, disabled, inline } = createCoreTipProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreTip
  extends LitElement
  implements IYCoreTipProps {
  @property({ type: String }) trigger: IYCoreTipProps['trigger'] = trigger
  @property({ type: Boolean, attribute: 'is-open', reflect: true }) isOpen: IYCoreTipProps['isOpen'] = isOpen
  @property({ type: Object }) offset: IYCoreTipProps['offset'] = offset
  @property({ type: Object }) padding: IYCoreTipProps['padding'] = padding
  @property({ type: String }) placement: IYCoreTipProps['placement'] = placement
  @property({ type: String }) strategy: IYCoreTipProps['strategy'] = strategy
  @property({ type: String }) type: IYCoreTipProps['type'] = type
  @property({ type: String }) transition: IYCoreTipProps['transition'] = transition
  @property({ type: Boolean }) disabled: IYCoreTipProps['disabled'] = disabled
  @property({ type: Boolean }) inline: IYCoreTipProps['inline'] = inline

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

  private get positionCallbacks(): TYCoreDropdownPositionCallback[] {
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
      ${unsafeCSS(YCoreTipVarsCss)}
      ${unsafeCSS(YCoreTipScopedCss)}
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
    defineCustomElement(tagName, YCoreTip)
    defineCustomElement(YCoreDropdownTagName, YCoreDropdown)
  }

  protected render() {
    return html`
      <y-core-dropdown
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
            ${unsafeSVG(yArrowTooltipDown.data)} 
          </div>

          <slot name="content"></slot>
        </div>
      </y-core-dropdown>
    `
  }
}
