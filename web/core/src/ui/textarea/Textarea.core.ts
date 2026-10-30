import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import { provide } from '@lit/context'
import { classMap } from 'lit/directives/class-map.js'

import {
  createCoreTextareaProps,
  type IAltCoreTextareaProps,
  ClickOutsideEvent,
  MouseEnterEvent,
  MouseLeaveEvent,
  InputEvent,
  FocusEvent,
  BlurEvent,
  KeydownEvent,
  RenderEvent,
  ClearEvent,
} from './models/types'
import {
  AltCoreTextareaTagName as tagName,
  AltCoreFieldTextareaTagName,
} from '~shared/constants'

import AltCoreTextareaVarsCss from '~core/ui/textarea/css/Textarea.vars.css?inline'
import AltCoreTextareaScopedCss from '~core/ui/textarea/css/Textarea.scoped.css?inline'

import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { booleanConverter } from '~core/utils/converters'
import { hasSlotContent } from '~core/utils/lit-slots'
import { interceptEvents } from '~core/utils/event-interceptor'
import { isClickOutside } from '~core/utils/dom-events'

import { disabledContextCreated, readonlyContextCreated, errorContextCreated, sizeContextCreated } from '~core/ui/fieldWrapper/providers'
import { renderLabel, renderError } from '~core/renderers'
import classMapToString from '~core/utils/classMapToString'

import { preventAndStopEvent } from '~shared/utils/helpers'
import { EventListenersList } from '~shared/utils/eventListenersList'

import type { AltCoreFieldTextarea } from '~core/ui/fieldTextarea'

import '~core/ui/fieldWrapper'
import '~core/ui/fieldTextarea'
import '~core/ui/fieldIcon'

import { altClose } from '~shared/icons'
import { withLocator } from '~core/utils/locator'

const { disabled, readonly, error, size, value, name, placeholder, required, maxlength, autofocus, labelText, labelTooltipText, labelDebounce, errors, clearable, rows, resize, locatorLabel, locatorError } = createCoreTextareaProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreTextarea
  extends LitElement
  implements IAltCoreTextareaProps {
  @provide({ context: disabledContextCreated })
  @property({ type: Boolean }) disabled: IAltCoreTextareaProps['disabled'] = disabled
  @provide({ context: readonlyContextCreated })
  @property({ type: Boolean }) readonly: IAltCoreTextareaProps['readonly'] = readonly
  @provide({ context: errorContextCreated })
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) error: IAltCoreTextareaProps['error'] = error
  @provide({ context: sizeContextCreated })
  @property({ type: String, reflect: true }) size: IAltCoreTextareaProps['size'] = size
  @property({ type: String, reflect: true }) value: IAltCoreTextareaProps['value'] = value
  @property({ type: String, reflect: true }) name: IAltCoreTextareaProps['name'] = name
  @property({ type: String, reflect: true }) placeholder: IAltCoreTextareaProps['placeholder'] = placeholder
  @property({ type: Boolean, reflect: true }) required: IAltCoreTextareaProps['required'] = required
  @property({ type: Number, reflect: true }) maxlength: IAltCoreTextareaProps['maxlength'] = maxlength
  @property({ type: Boolean, reflect: true }) autofocus: IAltCoreTextareaProps['autofocus'] = autofocus
  @property({ type: String, reflect: true, attribute: 'label-text' }) labelText: IAltCoreTextareaProps['labelText'] = labelText
  @property({ type: String, reflect: true, attribute: 'label-tooltip-text' }) labelTooltipText: IAltCoreTextareaProps['labelTooltipText'] = labelTooltipText
  @property({ type: Number, reflect: true, attribute: 'label-debounce' }) labelDebounce: IAltCoreTextareaProps['labelDebounce'] = labelDebounce
  @property({ type: Array }) errors: IAltCoreTextareaProps['errors'] = errors
  @property({ type: Boolean, reflect: true }) clearable: IAltCoreTextareaProps['clearable'] = clearable
  @property({ type: Number, reflect: true }) rows: IAltCoreTextareaProps['rows'] = rows
  @property({ type: String, reflect: true }) resize: IAltCoreTextareaProps['resize'] = resize
  @property({ type: String, attribute: 'locator-label' }) locatorLabel: IAltCoreTextareaProps['locatorLabel'] = locatorLabel
  @property({ type: String, attribute: 'locator-error' }) locatorError: IAltCoreTextareaProps['locatorError'] = locatorError

  @bubblingEvent(
    ClickOutsideEvent,
    { name: 'click-outside' },
  )
  private _clickOutside!: TDispatcher<ClickOutsideEvent>

  @bubblingEvent(
    MouseEnterEvent,
    { name: 'mouse-enter' },
  )
  private _mouseenter!: TDispatcher<MouseEnterEvent>

  @bubblingEvent(
    MouseLeaveEvent,
    { name: 'mouse-leave' },
  )
  private _mouseleave!: TDispatcher<MouseLeaveEvent>

  @bubblingEvent(
    InputEvent,
    { name: 'input' },
  )
  _input!: TDispatcher<InputEvent>

  @bubblingEvent(
    FocusEvent,
    { name: 'focus' },
  )
  _focus!: TDispatcher<FocusEvent>

  @bubblingEvent(
    BlurEvent,
    { name: 'blur' },
  )
  _blur!: TDispatcher<BlurEvent>

  @bubblingEvent(
    KeydownEvent,
    { name: 'keydown' },
  )
  _keydown!: TDispatcher<KeydownEvent>

  @bubblingEvent(
    RenderEvent,
    { name: 'render-textarea' },
  )
  _renderTextarea!: TDispatcher<RenderEvent>

  @bubblingEvent(
    ClearEvent,
    { name: 'clear' },
  )
  _clear!: TDispatcher<ClearEvent>

  private readonly baseClass = tagName

  @state() private hasBeforeSlot = false
  @state() private hasAfterSlot = false

  @query(AltCoreFieldTextareaTagName) public readonly fieldTextarea?: AltCoreFieldTextarea

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreTextareaVarsCss)}
      ${unsafeCSS(AltCoreTextareaScopedCss)}
    `,
  ]

  private readonly eventListenersList = new EventListenersList()

  private get computedClasses() {
    return { [this.baseClass]: true }
  }
  private get computedLabelClasses() {
    return { [`${this.baseClass}__label`]: true }
  }
  private get computedFieldWrapperClasses() {
    return {
      [`${this.baseClass}__field-wrapper`]: true,
      [`${this.baseClass}__field-wrapper_hide-before`]: !this.hasBeforeSlot,
      [`${this.baseClass}__field-wrapper_hide-after`]: !this.hasAfterSlot,
      [`${this.baseClass}__field-wrapper_resize_${this.resize}`]: true,
    }
  }
  private get computedFieldWrapperInnerClasses() {
    return { [`${this.baseClass}__field-wrapper-inner`]: true }
  }

  private get computedCounterClasses() {
    return {
      [`${this.baseClass}__counter`]: true,
      [`${this.baseClass}__counter_disabled`]: Boolean(this.disabled),
    }
  }

  private get counterText() {
    const currentLength = (this.value || '').length
    return `${currentLength} / ${this.maxlength}`
  }

  private get computedDisabledOrReadonly() {
    return this.disabled || this.readonly
  }

  private get showClearIcon() {
    return this.value && this.clearable && !this.computedDisabledOrReadonly
  }

  private handleSlotBeforeChange = (event: Event) => {
    preventAndStopEvent(event)

    const target = event.target as HTMLSlotElement

    this.hasBeforeSlot = hasSlotContent(target)
  }

  private handleSlotAfterChange = (event: Event) => {
    preventAndStopEvent(event)

    const target = event.target as HTMLSlotElement

    this.hasAfterSlot = hasSlotContent(target)
  }

  private handleClickOutside = (event: Event) => {
    if (this.disabled) return

    if (isClickOutside(
      event as MouseEvent,
      this,
    )) {
      this._clickOutside({ detail: { event } })
    }
  }

  private handleMouseEnter = (event: Event) => {
    preventAndStopEvent(event)

    this._mouseenter({ detail: { event } })
  }

  private handleMouseLeave = (event: Event) => {
    preventAndStopEvent(event)

    this._mouseleave({ detail: { event } })
  }

  private handleInput = (event: Event) => {
    preventAndStopEvent(event)

    if (this.disabled) return

    const target = event.target as HTMLInputElement

    this.value = target.value
    this._input({ detail: { value: target.value, event } })
  }

  private handleFocus = (event: Event) => {
    preventAndStopEvent(event)

    if (this.disabled) return

    this._focus({ detail: { event } })
  }

  private handleBlur = (event: Event) => {
    preventAndStopEvent(event)

    if (this.disabled) return

    this._blur({ detail: { event } })
  }

  private handleKeydown = (event: KeyboardEvent) => {
    if (this.disabled) return

    this._keydown({ detail: { event, code: event.code } })
  }

  private handleLabelClick = () => {
    this.fieldTextarea?.textareaElement?.focus()
  }

  private handleClear = () => {
    this.value = ''

    if (this.fieldTextarea?.textareaElement) {
      this.fieldTextarea.textareaElement.value = ''
    }

    this._input({ detail: { value: '', event: new Event('input') } })
    this._clear({ detail: { event: new Event('clear') } })
  }

  private handleRender = () => {
    this._renderTextarea()
  }

  connectedCallback() {
    super.connectedCallback()


    this.eventListenersList.add(
      'click',
      this.handleClickOutside,
    )
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.eventListenersList.remove('click')
  }

  protected renderTextarea() {
    return html`
      <alt-core-field-wrapper
        .disabled=${this.disabled}
        .readonly=${this.readonly}
        .error=${this.error}
        .size=${this.size}
        class=${classMap(this.computedFieldWrapperClasses)}
        @mouse-enter=${this.handleMouseEnter}
        @mouse-leave=${this.handleMouseLeave}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
      >
        <div class=${classMap(this.computedFieldWrapperInnerClasses)}>
          <slot
            name="before"
            @slotchange=${this.handleSlotBeforeChange}
          ></slot>
          <alt-core-field-textarea
            .value=${this.value}
            .name=${this.name}
            .placeholder=${this.placeholder}
            .required=${this.required}
            .maxlength=${this.maxlength}
            .autofocus=${this.autofocus}
            .rows=${this.rows}
            .hideSpaceLeft=${this.hasBeforeSlot}
            .hideSpaceRight=${this.hasAfterSlot || Boolean(this.value) && this.clearable}
            @input=${this.handleInput}
            @keydown=${this.handleKeydown}
            @render=${this.handleRender}
          ></alt-core-field-textarea>
          ${this.showClearIcon
            ? html`
              <alt-core-field-icon
                .icon=${altClose}
                hoverable
                @click=${this.handleClear}
              ></alt-core-field-icon>
            `
            : nothing
          }
          <slot
            name="after"
            @slotchange=${this.handleSlotAfterChange}
          ></slot>
        </div>
      </alt-core-field-wrapper>
    `
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        ${renderLabel({
          text: this.labelText,
          tooltipText: this.labelTooltipText,
          debounce: this.labelDebounce,
          tooltipActive: !this.computedDisabledOrReadonly,
          required: this.required,
          disabled: this.computedDisabledOrReadonly,
          handleClick: this.handleLabelClick,
          className: classMapToString(this.computedLabelClasses),
          locator: this.locatorLabel,
        })}
        ${this.renderTextarea()}
        ${this.maxlength && this.maxlength > 0
          ? html`<div class=${classMap(this.computedCounterClasses)}>${this.counterText}</div>`
          : nothing
        }
        ${this.error ? renderError({ errors: this.errors }) : nothing}
      </div>
    `
  }
}
