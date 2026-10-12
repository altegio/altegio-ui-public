import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { Maskito } from '@maskito/core'

import {
  createCoreCountFieldProps,
  type IYCoreCountFieldProps,
} from '~core/ui/countField/models/types'
import {
  YCoreCountFieldTagName as tagName,
  YCoreTextFieldTagName,
} from '~shared/constants'

import '~core/ui/textField'
import '~core/ui/fieldIcon'

import YCoreCountFieldVarsCSS from '~core/ui/countField/css/CountField.vars.css?inline'
import YCoreCountFieldScopedCSS from '~core/ui/countField/css/CountField.scoped.css?inline'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { BlurEvent, FocusEvent } from '~core/ui/fieldWrapper/models/types'
import { KeydownEvent } from '~core/ui/fieldInput/models/types'
import { ChangedValueEvent } from '~core/ui/countField/models/types'
import { createNaturalNumberRegex, preventAndStopEvent } from '~shared/utils'
import { provide } from '@lit/context'
import {
  disabledContextCreated,
  errorContextCreated,
  readonlyContextCreated, sizeContextCreated,
} from '~core/ui/fieldWrapper/providers'
import { booleanConverter } from '~core/utils/converters'
import { yMinus, yPlus } from '~shared/icons'
import type { YCoreTextField } from '~core/index'
import type { MaskitoPostprocessor } from '@maskito/core/src/lib/types/mask-processors'
import type { ElementState } from '@maskito/core/src/lib/types/element-state'
import type { TTimeout } from '~shared/types/global'
import { withLocator } from '~core/utils/locator'

enum EChangeValueType {
  INCREASE,
  DECREASE,
}

const { min,
  max,
  disabled,
  readonly,
  error,
  size,
  value,
  placeholder,
  required,
  autofocus,
  labelText,
  labelTooltipText,
  labelDebounce,
  annotationText,
  errors,
  name } = createCoreCountFieldProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreCountField
  extends LitElement
  implements IYCoreCountFieldProps {
  @property({ type: Number, attribute: 'min' }) min: IYCoreCountFieldProps['min'] = min
  @property({ type: Number, attribute: 'max' }) max: IYCoreCountFieldProps['max'] = max
  @provide({ context: disabledContextCreated })
  @property({ type: Boolean }) disabled: IYCoreCountFieldProps['disabled'] = disabled
  @provide({ context: readonlyContextCreated })
  @property({ type: Boolean }) readonly: IYCoreCountFieldProps['readonly'] = readonly
  @provide({ context: errorContextCreated })
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) error: IYCoreCountFieldProps['error'] = error
  @provide({ context: sizeContextCreated })
  @property({ type: String, reflect: true }) size: IYCoreCountFieldProps['size'] = size
  @property({ type: String, reflect: true }) value: IYCoreCountFieldProps['value'] = value
  @property({ type: String, reflect: true }) name: IYCoreCountFieldProps['name'] = name
  @property({ type: String, reflect: true }) placeholder: IYCoreCountFieldProps['placeholder'] = placeholder
  @property({ type: Boolean, reflect: true }) required: IYCoreCountFieldProps['required'] = required
  @property({ type: Boolean, reflect: true }) autofocus: IYCoreCountFieldProps['autofocus'] = autofocus
  @property({ type: String, reflect: true, attribute: 'label-text' }) labelText: IYCoreCountFieldProps['labelText'] = labelText
  @property({ type: String, reflect: true, attribute: 'label-tooltip-text' }) labelTooltipText: IYCoreCountFieldProps['labelTooltipText'] = labelTooltipText
  @property({ type: Number, reflect: true, attribute: 'label-debounce' }) labelDebounce: IYCoreCountFieldProps['labelDebounce'] = labelDebounce
  @property({ type: String, reflect: true, attribute: 'annotation-text' }) annotationText: IYCoreCountFieldProps['annotationText'] = annotationText
  @property({ type: Array }) errors: IYCoreCountFieldProps['errors'] = errors

  @bubblingEvent(
    ChangedValueEvent,
    { name: 'changed-value' },
  )
  _changedValue!: TDispatcher<ChangedValueEvent>

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

  @query(YCoreTextFieldTagName) public readonly textField?: YCoreTextField

  private readonly baseClass = tagName

  private readonly NUMBER_VALUE_EMPTY_STATE = 0
  private readonly VALUE_EMPTY_STATE = ''
  private readonly VALUE_AUTO_CHANGE_DELAY = 300
  private readonly VALUE_AUTO_CHANGE_INTERVAL = 100

  private maskInstance: Maskito | null = null
  private isButtonPressed = false

  private valueAutoChangeProcessId: number | null = null
  private valueAutoChangeDelayId: TTimeout | null = null

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreCountFieldVarsCSS)}
      ${unsafeCSS(YCoreCountFieldScopedCSS)}
    `,
  ]

  connectedCallback() {
    super.connectedCallback()


    if (this.inputElement) {
      this.applyMask(this.inputElement)
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.destroyMask()
    this.clearChangeProcess()
    this.clearDelayProcess()
  }

  private get computedClasses() {
    return { [this.baseClass]: true }
  }

  private get inputElement(): HTMLInputElement | undefined {
    return this.textField?.fieldInput?.inputElement
  }

  private get mask() {
    return createNaturalNumberRegex(this.min ?? Infinity, this.max ?? Infinity)
  }

  private handleInput = (event: InputEvent) => {
    preventAndStopEvent(event)

    const target = event.target as HTMLInputElement

    this.setValue(target.value)
  }

  private handleFocus = (event: FocusEvent) => {
    preventAndStopEvent(event)
    this._focus({ detail: { event } })
  }

  private handleBlur = (event: BlurEvent) => {
    preventAndStopEvent(event)

    const target = event.target as HTMLInputElement

    if (this.isMinus(target.value)) {
      this.handleMinusOnBlur()
    } else if (this.min !== undefined && (this.isEmpty(target.value) || Number(target.value) < this.min)) {
      this.setValue(this.min)
    }

    this._blur({ detail: { event } })
  }

  private handleMinusOnBlur(): void {
    if (this.min !== undefined) {
      this.setValue(this.min)
      return
    }

    this.setValue(this.VALUE_EMPTY_STATE)
  }

  private handleKeydown = (event: KeyboardEvent) => {
    event.stopImmediatePropagation()

    if (this.disabled) return
    this._keydown({ detail: { event, code: event.code } })
  }

  private handleMouseDown = (event: MouseEvent, type: EChangeValueType) => {
    preventAndStopEvent(event)

    if (event.button !== 0 || this.disabled || this.readonly) return
    this.inputElement?.focus()

    this.isButtonPressed = true

    if (type === EChangeValueType.INCREASE) this.increaseValue()
    else this.decreaseValue()

    this.valueAutoChangeDelayId = setTimeout(() => {
      if (this.isButtonPressed) {
        this.startAutoChange(type)
      }
    }, this.VALUE_AUTO_CHANGE_DELAY)
  }

  private handleMouseUp = () => {
    this.isButtonPressed = false
    this.stopAutoChange()
  }

  private handleMouseLeave = () => {
    this.isButtonPressed = false
    this.stopAutoChange()
  }

  private increaseValue() {
    if (this.isMaxThresholdReached()) return

    if (this.isMinus(this.value)) {
      this.setValue(this.min ?? this.NUMBER_VALUE_EMPTY_STATE)
      return
    }

    const numberValue = Number(this.value)

    this.setValue(numberValue + 1)
  }

  private decreaseValue() {
    if (this.isMinThresholdReached()) return

    if (this.isMinus(this.value)) {
      this.setValue(this.min ?? this.NUMBER_VALUE_EMPTY_STATE)
      return
    }

    const numberValue = Number(this.value)

    this.setValue(numberValue - 1)
  }

  private applyMask(inputElement: HTMLInputElement) {
    this.maskInstance?.destroy()

    this.maskInstance = new Maskito(inputElement, {
      mask: this.mask,
      postprocessors: [this.createBoundariesPostprocessor()],
    })
  }

  private destroyMask() {
    if (!this.maskInstance) return
    this.maskInstance.destroy()
  }

  private applyInputStyles(inputElement: HTMLInputElement) {
    inputElement.style.textAlign = 'center'
  }

  private handleRenderInput() {
    if (!this.inputElement) return

    this.applyMask(this.inputElement)
    this.applyInputStyles(this.inputElement)
  }

  private createBoundariesPostprocessor(): MaskitoPostprocessor {
    const handleEmptyOrMinus = (boundedValueStr: string): ElementState => ({
      value: boundedValueStr,
      selection: [boundedValueStr.length, boundedValueStr.length] as const,
    })

    const handleBoundedValue = (value: string, selection: readonly [number, number], boundedValueStr: string): ElementState => {
      const oldLength = value.length
      const newLength = boundedValueStr.length
      const distanceFromEnd = oldLength - selection[0]
      const newPosition = Math.max(0, newLength - distanceFromEnd)

      return {
        value: boundedValueStr,
        selection: [newPosition, newPosition] as const,
      }
    }

    const handleIntermediateValue = (value: string, selection: readonly [number, number]): ElementState => ({
      value,
      selection,
    })

    const handleValidValue = (value: string, selection: readonly [number, number], boundedValue: number): ElementState => {
      const boundedValueStr = boundedValue.toString()

      this.setValue(boundedValue)

      if (this.isEmpty(value) || this.isMinus(value)) {
        return handleEmptyOrMinus(boundedValueStr)
      }

      return handleBoundedValue(value, selection, boundedValueStr)
    }

    const handleNumericValue = (value: string, selection: readonly [number, number]): ElementState => {
      const numericValue = parseInt(value, 10)

      if (isNaN(numericValue)) {
        return { value: this.VALUE_EMPTY_STATE, selection: [0, 0] as const }
      }

      if (this.min !== undefined && numericValue < this.min && value.length > 0) {
        return handleIntermediateValue(value, selection)
      }

      const boundedValue = this.getBoundedValue(numericValue)

      if (boundedValue !== numericValue) {
        return handleValidValue(value, selection, boundedValue)
      }

      return {
        value: boundedValue.toString(),
        selection,
      }
    }

    return ({ value, selection }: ElementState) => {
      if (this.isEmpty(value) || this.isMinus(value)) {
        return { value, selection }
      }

      return handleNumericValue(value, selection)
    }
  }

  private isEmpty(value: string): boolean {
    return value === this.VALUE_EMPTY_STATE
  }

  private isMinus(value: string): boolean {
    return value === '-'
  }

  private getBoundedValue(value: number): number {
    if (this.max !== undefined && value > this.max) return this.max
    if (this.min !== undefined && value < this.min) return this.min

    return value
  }

  private setValue(value: number | string): void {
    const stringValue = String(value)

    if (this.value === stringValue) {
      return
    }

    if (this.isMinus(stringValue)) {
      this.value = stringValue
      this._changedValue({ detail: { value: stringValue } })
      return
    }

    this.value = stringValue
    this._changedValue({ detail: { value: stringValue } })
  }

  private isMaxThresholdReached(value = Number(this.value)): boolean {
    if (this.max === undefined) return false
    return Number(value) >= this.max
  }

  private isMinThresholdReached(value = Number(this.value)): boolean {
    if (this.min === undefined) return false
    return Number(value) <= this.min
  }

  private startAutoChange(type: EChangeValueType) {
    this.stopAutoChange()

    this.valueAutoChangeProcessId = window.setInterval(() => {
      if (type === EChangeValueType.INCREASE && !this.isMaxThresholdReached()) {
        this.increaseValue()
        return
      }

      if (type === EChangeValueType.DECREASE && !this.isMinThresholdReached()) {
        this.decreaseValue()
        return
      }

      this.stopAutoChange()
    }, this.VALUE_AUTO_CHANGE_INTERVAL)
  }

  private stopAutoChange() {
    this.clearChangeProcess()
    this.valueAutoChangeProcessId = null
  }

  private clearChangeProcess() {
    if (!this.valueAutoChangeProcessId) return
    clearInterval(this.valueAutoChangeProcessId)
  }

  private clearDelayProcess() {
    if (!this.valueAutoChangeDelayId) return
    clearTimeout(this.valueAutoChangeDelayId)
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <y-core-text-field
          .disabled=${this.disabled}
          .readonly=${this.readonly}
          .error=${this.error}
          .size=${this.size}
          .value=${this.value}
          .name=${this.name}
          .placeholder=${this.placeholder}
          .required=${this.required}
          .autofocus=${this.autofocus}
          .labelText=${this.labelText}
          .labelTooltipText=${this.labelTooltipText}
          .labelDebounce=${this.labelDebounce}
          .annotationText=${this.annotationText}
          .errors=${this.errors}
          @render=${() => { this.handleRenderInput() }}
          @keydown=${this.handleKeydown}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        >
          <y-core-field-icon
            slot="before"
            .icon=${yMinus}
            .disabled=${this.isMinThresholdReached()}
            hoverable
            clickable
            @mousedown=${(e: MouseEvent) => { this.handleMouseDown(e, EChangeValueType.DECREASE) }}
            @mouseup=${this.handleMouseUp}
            @mouseleave=${this.handleMouseLeave}
          ></y-core-field-icon>

          <y-core-field-icon
            slot="after"
            .icon=${yPlus}
            .disabled=${this.isMaxThresholdReached()}
            hoverable
            clickable
            @mousedown=${(e: MouseEvent) => { this.handleMouseDown(e, EChangeValueType.INCREASE) }}
            @mouseup=${this.handleMouseUp}
            @mouseleave=${this.handleMouseLeave}
          ></y-core-field-icon>
        </y-core-text-field>
      </div>
    `
  }
}
