import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { consume } from '@lit/context'

import {
  createCoreFieldInputProps,
  type IYCoreFieldInputProps,
  InputEvent,
  FocusEvent,
  BlurEvent,
  KeydownEvent,
  RenderEvent,
} from './models/types'
import {
  YCoreFieldInputTagName as tagName,
} from '~shared/constants'

import { booleanConverter, numberConverter } from '~core/utils/converters'
import { interceptEvents } from '~core/utils/event-interceptor'
import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { preventAndStopEvent } from '~shared/utils/helpers'
import { disabledContextCreated, sizeContextCreated, readonlyContextCreated, focusedContextCreated } from '~core/ui/fieldWrapper/providers'

import YCoreFieldInputVarsCss from '~core/ui/fieldInput/css/FieldInput.vars.css?inline'
import YCoreFieldInputScopedCss from '~core/ui/fieldInput/css/FieldInput.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { disabled, size, readonly, value, name, type, placeholder, required, maxlength, autofocus, hideSpaceLeft, hideSpaceRight, autocomplete } = createCoreFieldInputProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCoreFieldInput
  extends LitElement
  implements IYCoreFieldInputProps {
  @consume({ context: disabledContextCreated, subscribe: true })
  @property({ type: Boolean }) disabled: IYCoreFieldInputProps['disabled'] = disabled
  @consume({ context: sizeContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) size: IYCoreFieldInputProps['size'] = size
  @property({ type: Boolean }) readonly: IYCoreFieldInputProps['readonly'] = readonly

  @property({ type: String, reflect: true }) value: IYCoreFieldInputProps['value'] = value
  @property({ type: String, reflect: true }) name: IYCoreFieldInputProps['name'] = name
  @property({ type: String, reflect: true }) placeholder: IYCoreFieldInputProps['placeholder'] = placeholder
  @property({ type: String, reflect: true }) type: IYCoreFieldInputProps['type'] = type
  @property({ type: String, reflect: true }) autocomplete: IYCoreFieldInputProps['autocomplete'] = autocomplete
  @property({ type: Number, reflect: true, converter: numberConverter }) maxlength: IYCoreFieldInputProps['maxlength'] = maxlength
  @property({ type: Boolean }) required: IYCoreFieldInputProps['required'] = required
  @property({ type: Boolean }) autofocus: IYCoreFieldInputProps['autofocus'] = autofocus
  @property({ type: Boolean, reflect: true, converter: booleanConverter, attribute: 'hide-space-left' }) hideSpaceLeft: IYCoreFieldInputProps['hideSpaceLeft'] = hideSpaceLeft
  @property({ type: Boolean, reflect: true, converter: booleanConverter, attribute: 'hide-space-right' }) hideSpaceRight: IYCoreFieldInputProps['hideSpaceRight'] = hideSpaceRight

  @query('input') public readonly inputElement?: HTMLInputElement

  @consume({ context: focusedContextCreated, subscribe: true })
  @state() public focused = false

  @consume({ context: readonlyContextCreated, subscribe: true })
  @state() private readonlyConsumer = false

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
    { name: 'render' },
  )
  _render!: TDispatcher<RenderEvent>

  private readonly baseClass = tagName
  private isMounted = false

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreFieldInputVarsCss)}
      ${unsafeCSS(YCoreFieldInputScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
      [`${this.baseClass}_size_${this.size}`]: true,
      [`${this.baseClass}_hide-space-left`]: Boolean(this.hideSpaceLeft),
      [`${this.baseClass}_hide-space-right`]: Boolean(this.hideSpaceRight),
    }
  }

  private get computedReadonly() {
    return this.readonly || this.readonlyConsumer
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

    this.focused = true
    this._focus({ detail: { event } })
  }

  private handleBlur = (event: Event) => {
    preventAndStopEvent(event)

    if (this.disabled) return

    this.focused = false
    this._blur({ detail: { event } })
  }

  private handleKeydown = (event: KeyboardEvent) => {
    event.stopImmediatePropagation()

    if (this.disabled) return

    this._keydown({ detail: { event, code: event.code } })
  }

  firstUpdated() {
    this._render()

    this.isMounted = true
  }

  connectedCallback() {
    super.connectedCallback()

    if (this.isMounted) {
      this._render()
    }
  }

  public focus(): void {
    this.inputElement?.focus()
  }

  protected render() {
    return html`
      <input
        ?autofocus=${this.autofocus}
        ?disabled=${this.disabled}
        ?readonly=${this.computedReadonly}
        ?required=${this.required}
        name=${ifDefined(this.name)}
        placeholder=${ifDefined(this.placeholder)}
        type=${ifDefined(this.type)}
        maxlength=${ifDefined(this.maxlength)}
        autocomplete=${ifDefined(this.autocomplete)}
        .value=${this.value}
        class=${classMap(this.computedClasses)}
        @input=${this.handleInput}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        @keydown=${this.handleKeydown}
      />
    `
  }
}
