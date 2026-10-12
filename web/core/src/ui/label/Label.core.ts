import type { PropertyValues } from 'lit'
import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import {
  createCoreLabelProps,
  type IYCoreLabelProps,
} from '~core/ui/label/models/types'
import { YCoreLabelTagName as tagName, YCoreTextTagName, YCoreTooltipTagName } from '~shared/constants'

import { EYCoreTextVariant } from '~core/ui/text/models/types/external'
import YCoreLabelScopedCss from '~core/ui/label/css/Label.scoped.css?inline'
import YCoreLabelVarsCss from '~core/ui/label/css/Label.vars.css?inline'

import { renderIcon } from '~core/renderers'
import '~core/ui/tooltip'
import '~core/ui/text'
import { yInfo } from '~shared/icons'
import { EventListenersList } from '~shared/utils'
import type { TDispatcher } from '~core/utils/event-decorator'
import { bubblingEvent } from '~core/utils/event-decorator'
import { ContentMouseEnterEvent, ContentMouseLeaveEvent } from './models/types/events'
import { hasSlotContent } from '~core/utils/lit-slots'

import { debounce as debounceUtil } from 'radash'
import { defineCustomElement } from '~web/shared/utils/components'
import { YCoreText } from '~core/ui/text'
import { YCoreTooltip } from '~core/ui/tooltip'
import { withLocator } from '~core/utils/locator'

const { text, tooltipText, disabled, required, debounce, alignment, tooltipActive, wrap, size, variant, tooltipPlacement, locator } = createCoreLabelProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreLabel extends LitElement implements IYCoreLabelProps {
  @property({ type: String }) text: IYCoreLabelProps['text'] = text
  @property({ type: String, attribute: 'tooltip-text' }) tooltipText: IYCoreLabelProps['tooltipText'] = tooltipText
  @property({ type: Boolean, reflect: true, attribute: 'tooltip-active' }) tooltipActive: IYCoreLabelProps['tooltipActive'] = tooltipActive
  @property({ type: Boolean }) disabled: IYCoreLabelProps['disabled'] = disabled
  @property({ type: Boolean, reflect: true }) required: IYCoreLabelProps['required'] = required
  @property({ type: Number }) debounce: IYCoreLabelProps['debounce'] = debounce
  @property({ type: Boolean, reflect: true }) wrap: IYCoreLabelProps['wrap'] = wrap
  @property({ type: String, reflect: true }) alignment: IYCoreLabelProps['alignment'] = alignment
  @property({ type: String, reflect: true }) size: IYCoreLabelProps['size'] = size
  @property({ type: String, reflect: true }) variant: IYCoreLabelProps['variant'] = variant
  @property({ type: String, reflect: true, attribute: 'tooltip-placement' }) tooltipPlacement: IYCoreLabelProps['tooltipPlacement'] = tooltipPlacement
  @property({ type: String }) locator: IYCoreLabelProps['locator'] = locator

  @bubblingEvent(
    ContentMouseEnterEvent,
    { name: 'content-mouse-enter' },
  )
  _contentMouseEnter!: TDispatcher<ContentMouseEnterEvent>

  @bubblingEvent(
    ContentMouseLeaveEvent,
    { name: 'content-mouse-leave' },
  )
  _contentMouseLeave!: TDispatcher<ContentMouseLeaveEvent>

  @state() private isTextOverflowing = false
  @state() private hasSlotTooltipContent = false

  @query(`.${tagName}__content`) private contentElement?: HTMLElement

  private readonly baseClass = tagName
  private resizeObserver: ResizeObserver | null = null

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreLabelVarsCss)}
      ${unsafeCSS(YCoreLabelScopedCss)}
    `,
  ]

  private eventListenersList = new EventListenersList()

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
      [`${this.baseClass}_wrap`]: Boolean(this.wrap),
      [`${this.baseClass}_${this.alignment}`]: Boolean(this.alignment),
      [`${this.baseClass}_size_${this.size}`]: Boolean(this.size),
      [`${this.baseClass}_variant_${this.variant}`]: Boolean(this.variant),
    }
  }

  private get computedTooltipClasses() {
    return {
      [`${this.baseClass}__tooltip`]: true,
      [`${this.baseClass}__tooltip_hidden`]: !this.hasTooltip,
    }
  }

  private get hasTooltip() {
    return this.hasSlotTooltipContent || Boolean(this.tooltipText)
  }

  private get titleText() {
    return this.isTextOverflowing ? this.text : undefined
  }

  private checkTextOverflow = (): void => {
    if (!this.contentElement) return

    this.isTextOverflowing = this.contentElement.scrollWidth > this.contentElement.clientWidth
  }

  private debouncedCheckTextOverflow = debounceUtil(
    { delay: Number(this.debounce) },
    () => {
      this.checkTextOverflow()
    },
  )

  protected updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('text')) {
      this.debouncedCheckTextOverflow()
    }
  }

  private handleResize = () => {
    this.debouncedCheckTextOverflow()
  }

  private handleTooltipClick = (e: Event) => {
    e.stopPropagation()
  }

  private handleContentMouseEnter = (e: Event) => {
    e.stopPropagation()

    this._contentMouseEnter()
  }

  private handleContentMouseLeave = (e: Event) => {
    e.stopPropagation()

    this._contentMouseLeave()
  }

  private handleSlotTooltipContentChange = (event: Event) => {
    const target = event.target as HTMLSlotElement

    this.hasSlotTooltipContent = hasSlotContent(target)
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.eventListenersList.add(
      'resize',
      this.handleResize,
    )

    if (this.contentElement) {
      this.resizeObserver = new ResizeObserver(this.debouncedCheckTextOverflow)
      this.resizeObserver.observe(this.contentElement)
      this.debouncedCheckTextOverflow()
    }
  }


  protected firstUpdated(): void {
    defineCustomElement(tagName, YCoreLabel)
    defineCustomElement(YCoreTextTagName, YCoreText)
    defineCustomElement(YCoreTooltipTagName, YCoreTooltip)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.eventListenersList.remove('resize')

    if (this.resizeObserver && this.contentElement) {
      this.resizeObserver.unobserve(this.contentElement)
      this.resizeObserver.disconnect()
      this.resizeObserver = null
      this.debouncedCheckTextOverflow.cancel()
    }
  }

  protected renderTooltipContent() {
    if (this.tooltipText) return nothing

    return html`
      <div slot="content" class="${this.baseClass}__content">
        <slot name="tooltip-content" @slotchange=${this.handleSlotTooltipContentChange}>
          <span>${this.tooltipText}</span>
        </slot>
      </div>
    `
  }

  protected renderTooltip() {
    return html`
      <y-core-tooltip
        class=${classMap(this.computedTooltipClasses)}
        .text=${this.tooltipText}
        .disabled=${!this.tooltipActive}
        .placement=${this.tooltipPlacement}
        @click=${this.handleTooltipClick}
      >
        <div slot="activator" class="${this.baseClass}__tooltip-activator">
          ${renderIcon({ icon: yInfo, size: '16px', className: `${this.baseClass}__tooltip-icon` })}
        </div>

        ${this.renderTooltipContent()}
      </y-core-tooltip>
    `
  }

  protected render() {
    return html`
      <y-core-text
        class=${`${this.baseClass}__container`} 
        size=${ifDefined(this.size)}
        variant=${ifDefined(this.disabled ? EYCoreTextVariant.TERTIARY : this.variant)}
      >
        <div class=${classMap(this.computedClasses)}>
          <slot name="label">
            <div 
              class=${`${this.baseClass}__content`} 
              title=${ifDefined(this.titleText)}
              @mouseenter=${this.handleContentMouseEnter}
              @mouseleave=${this.handleContentMouseLeave}
            >
              ${this.text}
            </div>
            ${this.required
              ? html`<span class="${this.baseClass}__asterisk">*</span>`
              : nothing
            }
          </slot>
          
          ${this.renderTooltip()}
        </div>
      </y-core-text>
    `
  }
}
