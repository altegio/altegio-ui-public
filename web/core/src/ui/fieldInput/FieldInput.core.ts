import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { consume } from '@lit/context'

import {
  createCoreFieldInputProps,
  type IAltCoreFieldInputProps,
  InputEvent,
  FocusEvent,
  BlurEvent,
  KeydownEvent,
  RenderEvent,
} from './models/types'
import {
  AltCoreFieldInputTagName as tagName,
} from '~shared/constants'

import { booleanConverter, numberConverter } from '~core/utils/converters'
import { interceptEvents } from '~core/utils/event-interceptor'
import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { preventAndStopEvent } from '~shared/utils/helpers'
import { disabledContextCreated, sizeContextCreated, readonlyContextCreated, focusedContextCreated } from '~core/ui/fieldWrapper/providers'

import AltCoreFieldInputVarsCss from '~core/ui/fieldInput/css/FieldInput.vars.css?inline'
import AltCoreFieldInputScopedCss from '~core/ui/fieldInput/css/FieldInput.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { disabled, size, readonly, value, name, type, placeholder, required, maxlength, autofocus, hideSpaceLeft, hideSpaceRight, autocomplete } = createCoreFieldInputProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreFieldInput
  extends LitElement
  implements IAltCoreFieldInputProps {
  @consume({ context: disabledContextCreated, subscribe: true })
  @property({ type: Boolean }) disabled: IAltCoreFieldInputProps['disabled'] = disabled
  @consume({ context: sizeContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) size: IAltCoreFieldInputProps['size'] = size
  @property({ type: Boolean }) readonly: IAltCoreFieldInputProps['readonly'] = readonly

  @property({ type: String, reflect: true }) value: IAltCoreFieldInputProps['value'] = value
  @property({ type: String, reflect: true }) name: IAltCoreFieldInputProps['name'] = name
  @property({ type: String, reflect: true }) placeholder: IAltCoreFieldInputProps['placeholder'] = placeholder
  @property({ type: String, reflect: true }) type: IAltCoreFieldInputProps['type'] = type
  @property({ type: String, reflect: true }) autocomplete: IAltCoreFieldInputProps['autocomplete'] = autocomplete
  @property({ type: Number, reflect: true, converter: numberConverter }) maxlength: IAltCoreFieldInputProps['maxlength'] = maxlength
  @property({ type: Boolean }) required: IAltCoreFieldInputProps['required'] = required
  @property({ type: Boolean }) autofocus: IAltCoreFieldInputProps['autofocus'] = autofocus
  @property({ type: Boolean, reflect: true, converter: booleanConverter, attribute: 'hide-space-left' }) hideSpaceLeft: IAltCoreFieldInputProps['hideSpaceLeft'] = hideSpaceLeft
  @property({ type: Boolean, reflect: true, converter: booleanConverter, attribute: 'hide-space-right' }) hideSpaceRight: IAltCoreFieldInputProps['hideSpaceRight'] = hideSpaceRight

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
      ${unsafeCSS(AltCoreFieldInputVarsCss)}
      ${unsafeCSS(AltCoreFieldInputScopedCss)}
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
