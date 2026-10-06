import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import '~core/ui/tip'
import '~core/ui/simpleButton'

import {
  createCorePopoverProps,
  type IYCorePopoverProps,
} from './models/types'
import {
  YCorePopoverTagName as tagName,
} from '~shared/constants'

import { bubblingEvent } from '~core/utils/event-decorator'
import type { TDispatcher } from '~core/utils/event-decorator'
import type { CancelEvent } from './models/types/events'
import { SubmitEvent } from './models/types/events'

import YCorePopoverVarsCss from '~core/ui/popover/css/Popover.vars.css?inline'
import YCorePopoverScopedCss from '~core/ui/popover/css/Popover.scoped.css?inline'
import type { VisibleEvent } from '~core/ui/tip/models/types/events'
import { interceptEvents } from '~core/utils/event-interceptor'
import { hasSlotContent } from '~core/utils/lit-slots'
import { withLocator } from '~core/utils/locator'

const {
  trigger,
  isOpen,
  offset,
  padding,
  placement,
  strategy,
  type,
  transition,
  cancelText,
  submitText,
  disabled,
  inline,
} = createCorePopoverProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCorePopover extends LitElement implements IYCorePopoverProps {
  @property({ type: String }) trigger: IYCorePopoverProps['trigger'] = trigger
  @property({ type: Object }) offset: IYCorePopoverProps['offset'] = offset
  @property({ type: Object }) padding: IYCorePopoverProps['padding'] = padding
  @property({ type: String }) placement: IYCorePopoverProps['placement'] = placement
  @property({ type: String }) strategy: IYCorePopoverProps['strategy'] = strategy
  @property({ type: String }) type: IYCorePopoverProps['type'] = type
  @property({ type: String }) transition: IYCorePopoverProps['transition'] = transition
  @property({ type: String, attribute: 'submit-text' }) submitText: IYCorePopoverProps['submitText'] = submitText
  @property({ type: String, attribute: 'cancel-text' }) cancelText: IYCorePopoverProps['cancelText'] = cancelText
  @property({ type: Boolean, attribute: 'is-open', reflect: true }) isOpen: IYCorePopoverProps['isOpen'] = isOpen
  @property({ type: Boolean }) disabled: IYCorePopoverProps['disabled'] = disabled
  @property({ type: Boolean }) inline: IYCorePopoverProps['inline'] = inline

  @state() isContentVisible = this.isOpen
  @state() hasActionsSlotContent = false

  @bubblingEvent(
    SubmitEvent,
    { name: 'submit' },
  )
  private _submit!: TDispatcher<SubmitEvent>

  @bubblingEvent(
    CloseEvent,
    { name: 'cancel' },
  )
  private _cancel!: TDispatcher<CancelEvent>

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCorePopoverVarsCss)}
      ${unsafeCSS(YCorePopoverScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_type_${this.type}`]: true,
    }
  }

  private close = () => {
    this.isContentVisible = false
  }

  private handleCancel = (event: Event) => {
    event.stopPropagation()

    this.close()
    this._cancel()
  }

  private handleConfirm = (event: Event) => {
    event.stopPropagation()

    this.close()
    this._submit()
  }

  private handleUpdateContentVisible = (event: VisibleEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!event.detail) return
    this.isContentVisible = event.detail.value
  }

  private handleSlotChange = (e: Event) => {
    e.stopPropagation()
    const target = e.target as HTMLSlotElement
    this.hasActionsSlotContent = hasSlotContent(target)
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('isOpen')) {
      this.isContentVisible = this.isOpen
    }
  }

  private renderActionsContent() {
    return html`
      ${this.cancelText
      ? html`
        <y-core-simple-button
          size="small"
          variant="text"
          class="${this.baseClass}__cancel"
          @click=${this.handleCancel}
      >
          ${this.cancelText}
        </y-core-simple-button>
      `
      : nothing}
  
      ${this.submitText
      ? html`
        <y-core-simple-button
          size="small"
          variant="primary"
          @click=${this.handleConfirm}
      >
        ${this.submitText}
      </y-core-simple-button>
      `
      : nothing}
    `
  }

  private hasActions(): boolean {
    return Boolean(this.cancelText || this.submitText || this.hasActionsSlotContent)
  }


  protected render() {
    return html`
      <y-core-tip
        .trigger=${this.trigger}
        .isOpen=${this.isContentVisible}
        .offset=${this.offset}
        .padding=${this.padding}
        .placement=${this.placement}
        .strategy=${this.strategy}
        .transition=${this.transition}
        .type=${this.type}
        .disabled=${this.disabled}
        .inline=${this.inline}
        class=${classMap(this.computedClasses)}
        @change-visible=${this.handleUpdateContentVisible}
        @click-outside=${this.handleCancel}
      >
        <slot name="activator" slot="activator"></slot>
        
        <div class="${this.baseClass}__content" slot="content">
          <slot name="content"></slot>
          ${this.hasActions()
            ? html`
              <div class="${this.baseClass}__actions">
                <slot name="actions" @slotchange=${this.handleSlotChange}>
                  ${this.renderActionsContent()}
                </slot>
              </div>
              `
            : nothing}
        </div>
      </y-core-tip>
    `
  }
}
