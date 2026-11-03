import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { classMap } from 'lit/directives/class-map.js'

import '~core/ui/tip'
import '~core/ui/simpleButton'

import {
  createCorePopoverProps,
  type IAltCorePopoverProps,
} from './models/types'
import {
  AltCorePopoverTagName as tagName,
} from '~shared/constants'

import { bubblingEvent } from '~core/utils/event-decorator'
import type { TDispatcher } from '~core/utils/event-decorator'
import type { CancelEvent } from './models/types/events'
import { SubmitEvent } from './models/types/events'

import AltCorePopoverVarsCss from '~core/ui/popover/css/Popover.vars.css?inline'
import AltCorePopoverScopedCss from '~core/ui/popover/css/Popover.scoped.css?inline'
import type { VisibleEvent } from '~core/ui/tip/models/types/events'
import { interceptEvents } from '~core/utils/event-interceptor'
import { hasSlotContent } from '~core/utils/lit-slots'
import { withLocator } from '~core/utils/locator'
import { EAltCoreDropdownTrigger } from '~core/ui/dropdown/models/types'
import { getFocusableElements, getFocusTarget, whenRendered } from '~core/utils/a11y/focus-target'

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
  accessibleName,
} = createCorePopoverProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCorePopover extends LitElement implements IAltCorePopoverProps {
  @property({ type: String }) trigger: IAltCorePopoverProps['trigger'] = trigger
  @property({ type: Object }) offset: IAltCorePopoverProps['offset'] = offset
  @property({ type: Object }) padding: IAltCorePopoverProps['padding'] = padding
  @property({ type: String }) placement: IAltCorePopoverProps['placement'] = placement
  @property({ type: String }) strategy: IAltCorePopoverProps['strategy'] = strategy
  @property({ type: String }) type: IAltCorePopoverProps['type'] = type
  @property({ type: String }) transition: IAltCorePopoverProps['transition'] = transition
  @property({ type: String, attribute: 'submit-text' }) submitText: IAltCorePopoverProps['submitText'] = submitText
  @property({ type: String, attribute: 'cancel-text' }) cancelText: IAltCorePopoverProps['cancelText'] = cancelText
  @property({ type: Boolean, attribute: 'is-open', reflect: true }) isOpen: IAltCorePopoverProps['isOpen'] = isOpen
  @property({ type: Boolean }) disabled: IAltCorePopoverProps['disabled'] = disabled
  @property({ type: Boolean }) inline: IAltCorePopoverProps['inline'] = inline
  @property({ type: String, attribute: 'accessible-name' }) accessibleName: IAltCorePopoverProps['accessibleName'] = accessibleName

  @query(`.${tagName}__content`) private contentElement?: HTMLElement
  @query('slot[name="activator"]') private activatorSlot?: HTMLSlotElement

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
      ${unsafeCSS(AltCorePopoverVarsCss)}
      ${unsafeCSS(AltCorePopoverScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_type_${this.type}`]: true,
    }
  }

  /** A popover that opens on click is a non-modal dialog; one that opens on hover is a hint */
  private get isDialog() {
    return this.trigger !== EAltCoreDropdownTrigger.HOVER
  }

  private get activators() {
    return this.activatorSlot?.assignedElements({ flatten: true }) ?? []
  }

  /** The activator states that it opens a dialog, on the element that takes focus */
  private describeActivator = () => {
    for (const activator of this.activators) {
      void whenRendered(activator).then(() => {
        const target = getFocusTarget(activator)

        if (this.isDialog) {
          target.setAttribute('aria-haspopup', 'dialog')
          target.setAttribute('aria-expanded', String(this.isContentVisible))
        } else {
          target.removeAttribute('aria-haspopup')
          target.removeAttribute('aria-expanded')
        }
      })
    }
  }

  /** A dialog opened with a click takes focus: its first focusable element, or the dialog itself */
  private focusContent() {
    const content = this.contentElement
    if (!content) return

    const target = getFocusableElements(content).at(0) ?? content
    target.focus()
  }

  private get hasFocusInside() {
    return Boolean(this.contentElement?.matches(':focus-within'))
  }

  /** Closing from inside the dialog returns focus to the activator */
  private close = () => {
    const { hasFocusInside } = this
    this.isContentVisible = false

    const activator = this.activators.at(0)
    if (hasFocusInside && activator) (getFocusTarget(activator) as HTMLElement).focus()
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

    const opened = changedProperties.has('isContentVisible') && this.isContentVisible && changedProperties.get('isContentVisible') === false
    if (opened && this.trigger === EAltCoreDropdownTrigger.CLICK) {
      requestAnimationFrame(() => { this.focusContent() })
    }

    this.describeActivator()
  }

  private renderActionsContent() {
    return html`
      ${this.cancelText
      ? html`
        <alt-core-simple-button
          size="small"
          variant="text"
          class="${this.baseClass}__cancel"
          @click=${this.handleCancel}
      >
          ${this.cancelText}
        </alt-core-simple-button>
      `
      : nothing}
  
      ${this.submitText
      ? html`
        <alt-core-simple-button
          size="small"
          variant="primary"
          @click=${this.handleConfirm}
      >
        ${this.submitText}
      </alt-core-simple-button>
      `
      : nothing}
    `
  }

  private hasActions(): boolean {
    return Boolean(this.cancelText || this.submitText || this.hasActionsSlotContent)
  }


  protected render() {
    return html`
      <alt-core-tip
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
        <slot name="activator" slot="activator" @slotchange=${this.describeActivator}></slot>
        
        <div
          class="${this.baseClass}__content"
          slot="content"
          role=${ifDefined(this.isDialog ? 'dialog' : undefined)}
          aria-label=${ifDefined(this.isDialog && this.accessibleName || undefined)}
          tabindex=${ifDefined(this.isDialog ? -1 : undefined)}
        >
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
      </alt-core-tip>
    `
  }
}
