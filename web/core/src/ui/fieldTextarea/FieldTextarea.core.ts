import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { consume } from '@lit/context'
import { ifDefined } from 'lit/directives/if-defined.js'

import {
  createCoreFieldTextareaProps,
  type IAltCoreFieldTextareaProps,
  InputEvent,
  KeydownEvent,
  FocusEvent,
  BlurEvent,
  RenderEvent,
} from '~core/ui/fieldTextarea/models/types'
import {
  AltCoreFieldTextareaTagName as tagName,
} from '~shared/constants'

import { booleanConverter, numberConverter } from '~core/utils/converters'
import { interceptEvents } from '~core/utils/event-interceptor'
import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { preventAndStopEvent } from '~shared/utils/helpers'
import { disabledContextCreated, sizeContextCreated, readonlyContextCreated, focusedContextCreated } from '~core/ui/fieldWrapper/providers'

import AltCoreFieldTextareaVarsCSS from '~core/ui/fieldTextarea/css/FieldTextarea.vars.css?inline'
import AltCoreFieldTextareaScopedCSS from '~core/ui/fieldTextarea/css/FieldTextarea.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const {
  disabled, size, readonly, value, name, placeholder,
  maxlength, autofocus, hideSpaceLeft, hideSpaceRight,
  required, rows, resize, autocomplete,
} = createCoreFieldTextareaProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreFieldTextarea
  extends LitElement
  implements IAltCoreFieldTextareaProps {
  @consume({ context: disabledContextCreated, subscribe: true })
  @property({ type: Boolean }) disabled: IAltCoreFieldTextareaProps['disabled'] = disabled
  @consume({ context: sizeContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) size: IAltCoreFieldTextareaProps['size'] = size
  @consume({ context: readonlyContextCreated, subscribe: true })
  @property({ type: Boolean }) readonly: IAltCoreFieldTextareaProps['readonly'] = readonly

  @property({ type: String, reflect: true }) value: IAltCoreFieldTextareaProps['value'] = value
  @property({ type: String, reflect: true }) name: IAltCoreFieldTextareaProps['name'] = name
  @property({ type: String, reflect: true }) placeholder: IAltCoreFieldTextareaProps['placeholder'] = placeholder
  @property({ type: String, reflect: true }) autocomplete: IAltCoreFieldTextareaProps['autocomplete'] = autocomplete
  @property({ type: Number, reflect: true, converter: numberConverter }) maxlength: IAltCoreFieldTextareaProps['maxlength'] = maxlength
  @property({ type: Boolean }) required: IAltCoreFieldTextareaProps['required'] = required
  @property({ type: Boolean }) autofocus: IAltCoreFieldTextareaProps['autofocus'] = autofocus
  @property({ type: Boolean, reflect: true, converter: booleanConverter, attribute: 'hide-space-left' }) hideSpaceLeft: IAltCoreFieldTextareaProps['hideSpaceLeft'] = hideSpaceLeft
  @property({ type: Boolean, reflect: true, converter: booleanConverter, attribute: 'hide-space-right' }) hideSpaceRight: IAltCoreFieldTextareaProps['hideSpaceRight'] = hideSpaceRight
  @property({ type: Number, reflect: true, converter: numberConverter }) rows: IAltCoreFieldTextareaProps['rows'] = rows
  @property({ type: String, reflect: true }) resize: IAltCoreFieldTextareaProps['resize'] = resize

  @consume({ context: focusedContextCreated, subscribe: true })
  @state() public focused = false

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

  @query('textarea') public readonly textareaElement?: HTMLTextAreaElement

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreFieldTextareaVarsCSS)}
      ${unsafeCSS(AltCoreFieldTextareaScopedCSS)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
      [`${this.baseClass}_size_${this.size}`]: true,
      [`${this.baseClass}_resize_${this.resize}`]: true,
      [`${this.baseClass}_hide-space-left`]: Boolean(this.hideSpaceLeft),
      [`${this.baseClass}_hide-space-right`]: Boolean(this.hideSpaceRight),
    }
  }

  private get computedMaxlength() {
    return this.maxlength && this.maxlength > 0 ? this.maxlength : undefined
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
    if (this.disabled) return

    this._keydown({ detail: { event, code: event.code } })
  }

  firstUpdated() {
    this._render()
  }


  protected render() {
    return html`
      <textarea
        .value=${this.value}
        ?autofocus=${this.autofocus}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        maxlength=${ifDefined(this.computedMaxlength)}
        name=${ifDefined(this.name)}
        placeholder=${ifDefined(this.placeholder)}
        rows=${ifDefined(this.rows)}
        class=${classMap(this.computedClasses)}
        @input=${this.handleInput}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        @keydown=${this.handleKeydown}
      ></textarea>
    `
  }
}
