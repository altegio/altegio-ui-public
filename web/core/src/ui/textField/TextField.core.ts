import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import { provide } from '@lit/context'
import { classMap } from 'lit/directives/class-map.js'
import { Maskito, maskitoTransform } from '@maskito/core'

import {
  createCoreTextFieldProps,
  type IYCoreTextFieldProps,
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
  YCoreTextFieldTagName as tagName,
  YCoreFieldIconTagName,
  YCoreFieldInputTagName,
  YCoreFieldWrapperTagName,
} from '~shared/constants'

import YCoreTextFieldVarsCss from '~core/ui/textField/css/TextField.vars.css?inline'
import YCoreTextFieldScopedCss from '~core/ui/textField/css/TextField.scoped.css?inline'

import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { booleanConverter } from '~core/utils/converters'
import { hasSlotContent } from '~core/utils/lit-slots'
import { interceptEvents } from '~core/utils/event-interceptor'

import { disabledContextCreated, readonlyContextCreated, errorContextCreated, sizeContextCreated } from '~core/ui/fieldWrapper/providers'
import { renderLabel, renderError, renderAnnotation } from '~core/renderers'
import classMapToString from '~core/utils/classMapToString'

import { preventAndStopEvent } from '~shared/utils/helpers'

import { YCoreFieldInput } from '~core/ui/fieldInput'

import '~core/ui/fieldWrapper'
import '~core/ui/fieldInput'
import '~core/ui/fieldIcon'

import { yClose } from '~shared/icons'
import type { IYCoreFieldInputKeydownEvent } from '../fieldInput/models/types'

const { disabled, readonly, error, size, value, name, type, placeholder, required, maxlength, autofocus, labelText, labelTooltipText, labelDebounce, annotationText, errors, clearable, maskOptions, locator, locatorLabel, locatorError, locatorClearIcon } = createCoreTextFieldProps()

import { defineCustomElement } from '~web/shared/utils/components'
import { YCoreFieldIcon } from '~core/ui/fieldIcon'
import { YCoreFieldWrapper } from '~core/ui/fieldWrapper'
import { withLocator } from '~core/utils/locator'

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCoreTextField
  extends LitElement
  implements IYCoreTextFieldProps {
  @provide({ context: disabledContextCreated })
  @property({ type: Boolean }) disabled: IYCoreTextFieldProps['disabled'] = disabled
  @provide({ context: readonlyContextCreated })
  @property({ type: Boolean }) readonly: IYCoreTextFieldProps['readonly'] = readonly
  @provide({ context: errorContextCreated })
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) error: IYCoreTextFieldProps['error'] = error
  @provide({ context: sizeContextCreated })
  @property({ type: String, reflect: true }) size: IYCoreTextFieldProps['size'] = size
  @property({ type: String, reflect: true }) value: IYCoreTextFieldProps['value'] = value
  @property({ type: String, reflect: true }) name: IYCoreTextFieldProps['name'] = name
  @property({ type: String, reflect: true }) type: IYCoreTextFieldProps['type'] = type
  @property({ type: String, reflect: true }) placeholder: IYCoreTextFieldProps['placeholder'] = placeholder
  @property({ type: Boolean, reflect: true }) required: IYCoreTextFieldProps['required'] = required
  @property({ type: Number, reflect: true }) maxlength: IYCoreTextFieldProps['maxlength'] = maxlength
  @property({ type: Boolean, reflect: true }) autofocus: IYCoreTextFieldProps['autofocus'] = autofocus
  @property({ type: String, reflect: true, attribute: 'label-text' }) labelText: IYCoreTextFieldProps['labelText'] = labelText
  @property({ type: String, reflect: true, attribute: 'label-tooltip-text' }) labelTooltipText: IYCoreTextFieldProps['labelTooltipText'] = labelTooltipText
  @property({ type: Number, reflect: true, attribute: 'label-debounce' }) labelDebounce: IYCoreTextFieldProps['labelDebounce'] = labelDebounce
  @property({ type: String, reflect: true, attribute: 'annotation-text' }) annotationText: IYCoreTextFieldProps['annotationText'] = annotationText
  @property({ type: Array }) errors: IYCoreTextFieldProps['errors'] = errors
  @property({ type: Boolean, reflect: true }) clearable: IYCoreTextFieldProps['clearable'] = clearable
  @property({ type: Object, attribute: 'mask-options' }) maskOptions: IYCoreTextFieldProps['maskOptions'] = maskOptions
  @property({ type: String }) locator: IYCoreTextFieldProps['locator'] = locator
  @property({ type: String, attribute: 'locator-label' }) locatorLabel: IYCoreTextFieldProps['locatorLabel'] = locatorLabel
  @property({ type: String, attribute: 'locator-error' }) locatorError: IYCoreTextFieldProps['locatorError'] = locatorError
  @property({ type: String, attribute: 'locator-clear-icon' }) locatorClearIcon: IYCoreTextFieldProps['locatorClearIcon'] = locatorClearIcon

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
    { name: 'render-input' },
  )
  _renderInput!: TDispatcher<RenderEvent>

  @bubblingEvent(
    ClearEvent,
    { name: 'clear' },
  )
  _clear!: TDispatcher<ClearEvent>

  private readonly baseClass = tagName
  private maskInstance?: Maskito

  @state() private hasBeforeSlot = false
  @state() private hasAfterSlot = false
  @state() private hasAnnotationSlot = false

  @query(YCoreFieldInputTagName) public readonly fieldInput?: YCoreFieldInput

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreTextFieldVarsCss)}
      ${unsafeCSS(YCoreTextFieldScopedCss)}
    `,
  ]

  private get computedClasses() {
    return { [this.baseClass]: true }
  }

  private get computedLabelClasses() {
    return { [`${this.baseClass}__label`]: true }
  }

  private get computedAnnotationClasses() {
    return {
      [`${this.baseClass}__annotation`]: true,
      [`${this.baseClass}__annotation_hide`]: !this.hasAnnotation,
    }
  }

  private get computedFieldWrapperClasses() {
    return {
      [`${this.baseClass}__field-wrapper`]: true,
      [`${this.baseClass}__field-wrapper_hide-before`]: !this.hasBeforeSlot,
      [`${this.baseClass}__field-wrapper_hide-after`]: !this.hasAfterSlot,
    }
  }

  private get hasAnnotation() {
    return this.annotationText || this.hasAnnotationSlot
  }

  private get hasError() {
    return Boolean(this.errors?.length) || this.error
  }

  private get computedDisabledOrReadonly() {
    return this.disabled || this.readonly
  }

  private get maskedValue() {
    if (!this.maskOptions || !this.value) return this.value

    return maskitoTransform(this.value, this.maskOptions)
  }

  private applyMask() {
    const { inputElement } = this.fieldInput ?? {}
    if (!inputElement || !this.maskOptions) return

    this.destroyMask()

    this.maskInstance = new Maskito(
      inputElement,
      this.maskOptions,
    )
  }

  private destroyMask() {
    if (!this.maskInstance) return

    this.maskInstance.destroy()
    this.maskInstance = undefined
  }

  private updateFieldInputValue = (value?: string) => {
    if (!this.fieldInput?.inputElement) return

    this.fieldInput.inputElement.value = value ?? ''
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

  private handleSlotAnnotationChange = (event: Event) => {
    preventAndStopEvent(event)

    const target = event.target as HTMLSlotElement

    this.hasAnnotationSlot = hasSlotContent(target)
  }

  private handleClickOutside = (event: Event) => {
    preventAndStopEvent(event)

    this._clickOutside({ detail: { event } })
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
    let newValue = target.value

    if (this.maskOptions) {
      newValue = maskitoTransform(newValue, this.maskOptions)

      requestAnimationFrame(() => {
        this.updateFieldInputValue(newValue)
      })
    }

    this.value = newValue

    this._input({ detail: { value: newValue, event } })
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

  private handleKeydown = (event: KeyboardEvent & { detail: IYCoreFieldInputKeydownEvent }) => {
    event.stopImmediatePropagation()

    if (this.disabled) return

    this._keydown({ detail: { event, code: event.detail.code } })
  }

  private handleLabelClick = () => {
    this.fieldInput?.inputElement?.focus()
  }

  private handleClear = () => {
    this.value = ''
    this.fieldInput?.inputElement?.focus()

    this._input({ detail: { value: '', event: new Event('input') } })
    this._clear({ detail: { event: new Event('clear') } })
  }

  private handleRender = () => {
    this.applyMask()
    this._renderInput()
  }

  public focus() {
    this.fieldInput?.inputElement?.focus()
  }

  protected renderInput() {
    return html`
      <y-core-field-wrapper
        .disabled=${this.disabled}
        .readonly=${this.readonly}
        .error=${this.hasError}
        .size=${this.size}
        class=${classMap(this.computedFieldWrapperClasses)}
        @click-outside=${this.handleClickOutside}
        @mouse-enter=${this.handleMouseEnter}
        @mouse-leave=${this.handleMouseLeave}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
      >
        <slot
          name="before"
          @slotchange=${this.handleSlotBeforeChange}
        ></slot>
        <y-core-field-input
          .value=${this.maskedValue}
          .name=${this.name}
          .type=${this.type}
          .placeholder=${this.placeholder}
          .required=${this.required}
          .maxlength=${this.maxlength}
          .autofocus=${this.autofocus}
          .hideSpaceLeft=${this.hasBeforeSlot}
          .hideSpaceRight=${this.hasAfterSlot || Boolean(this.value) && this.clearable}
          @input=${this.handleInput}
          @keydown=${this.handleKeydown}
          @render=${this.handleRender}
        ></y-core-field-input>
        ${this.value && this.clearable
          ? html`
            <y-core-field-icon
              .icon=${yClose}
              .locator=${this.locatorClearIcon}
              hoverable
              @click=${this.handleClear}
            ></y-core-field-icon>
          `
          : nothing
        }
        <slot
          name="after"
          @slotchange=${this.handleSlotAfterChange}
        ></slot>
      </y-core-field-wrapper>
    `
  }

  protected firstUpdated(): void {
    defineCustomElement(YCoreFieldIconTagName, YCoreFieldIcon)
    defineCustomElement(YCoreFieldInputTagName, YCoreFieldInput)
    defineCustomElement(YCoreFieldWrapperTagName, YCoreFieldWrapper)
  }


  disconnectedCallback() {
    super.disconnectedCallback()
    this.destroyMask()
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        ${renderLabel({
          text: this.labelText,
          tooltipText: this.labelTooltipText,
          debounce: this.labelDebounce,
          tooltipActive: !this.disabled,
          required: this.required,
          disabled: this.computedDisabledOrReadonly,
          handleClick: this.handleLabelClick,
          className: classMapToString(this.computedLabelClasses),
          locator: this.locatorLabel,
        })}
        ${this.renderInput()}
        ${renderAnnotation({
          text: this.annotationText,
          disabled: this.computedDisabledOrReadonly,
          className: classMapToString(this.computedAnnotationClasses),
          handleSlotAnnotationChange: this.handleSlotAnnotationChange,
        })}
        ${renderError({ errors: this.errors, locator: this.locatorError })}
      </div>
    `
  }
}
