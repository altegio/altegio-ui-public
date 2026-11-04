import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  createCoreFormProps,
  FormInvalidEvent,
  FormResetEvent,
  FormSubmitEvent,
  type IAltCoreFormProps,
} from '~core/ui/form/models/types'
import { AltCoreFormTagName as tagName } from '~shared/constants'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { withLocator } from '~core/utils/locator'
import { booleanConverter } from '~core/utils/converters'
import { FORM_BUTTON_TYPES } from '~core/utils/form-button'
import { createFormData, isImplicitSubmitter, requestFormSubmit } from '~core/utils/form-submit'
import { getAssociatedControl } from '~core/utils/a11y/legacy-form-internals'

import AltCoreFormVarsCss from '~core/ui/form/css/Form.vars.css?inline'
import AltCoreFormScopedCss from '~core/ui/form/css/Form.scoped.css?inline'

const { noErrorFocus } = createCoreFormProps()

/** A field of the form: a form-associated Altegio UI component or a native control */
interface IFormControl extends HTMLElement {
  validate?: () => boolean
  resetValidation?: () => void
  checkValidity?: () => boolean
  reportValidity?: () => boolean
  readonly willValidate?: boolean
  error?: boolean
  errors?: string[]
  updateComplete?: Promise<boolean>
}

/** Input types that submit their form with Enter, as in a native form */
const IMPLICIT_SUBMIT_TYPES = new Set(['text', 'search', 'url', 'tel', 'email', 'password', 'number'])

/**
 * Whether Enter in the element submits the form: a single-line input of a field, not one of an open list
 * @param origin - Element the key was pressed in
 * @returns {boolean} Whether the form should submit
 */
const submitsWithEnter = (origin: EventTarget | undefined) => origin instanceof HTMLInputElement &&
  // Native inputs of the form submit it themselves; inputs in shadow DOM have no form
  !origin.form &&
  IMPLICIT_SUBMIT_TYPES.has(origin.type) &&
  origin.getAttribute('aria-expanded') !== 'true'

const isNativeFormControl = (element: Element) => element instanceof HTMLButtonElement || element instanceof HTMLInputElement

/**
 * Whether the element submits or resets the form itself on click: an Altegio UI button with a `type`
 * @param element - Element on the click path
 * @returns {boolean} Whether the form should leave the click to the element
 */
const activatesForm = (element: EventTarget) => element instanceof HTMLElement &&
  !isNativeFormControl(element) &&
  FORM_BUTTON_TYPES.has(String((element as { type?: unknown }).type))

const isBusy = (element: EventTarget) => (element as { disabled?: unknown }).disabled === true || (element as { loading?: unknown }).loading === true

const hasTypeAttribute = (target: EventTarget): target is Element => target instanceof Element &&
  FORM_BUTTON_TYPES.has(target.getAttribute('type') ?? '') &&
  !isNativeFormControl(target)

/**
 * Finds the element the form submits or resets for: one with only the `type` attribute, such as AltCardButton
 * @param path - Path of the click
 * @returns {Element | undefined} The button, unless it acted on the form itself or is disabled or loading
 */
const getTypeAttributeButton = (path: EventTarget[]) => {
  const index = path.findIndex(hasTypeAttribute)
  const buttonPath = path.slice(0, index + 1)

  return index < 0 || buttonPath.some(activatesForm) || buttonPath.some(isBusy)
    ? undefined
    : path[index] as Element
}

/**
 * Fields stop the native `keydown` and fire their own with the original in `detail.event`
 * @param event - Native or field `keydown`
 * @returns {KeyboardEvent | undefined} The native event, still being dispatched
 */
const getNativeKeydown = (event: Event): KeyboardEvent | undefined => {
  let current: unknown = event
  while (current instanceof CustomEvent) current = (current.detail as { event?: unknown } | null)?.event

  return current instanceof KeyboardEvent ? current : undefined
}

const hasOwnErrors = (control: IFormControl) => control.error === true || Boolean(control.errors?.length)

const checkControl = (control: IFormControl) => control.validate?.() ?? control.checkValidity?.() ?? true

const isValid = (control: IFormControl) => control.willValidate === false || checkControl(control) && !hasOwnErrors(control)

const isNativeSubmitter = (element: EventTarget): element is HTMLButtonElement | HTMLInputElement => isNativeFormControl(element as Element) && (/^(submit|image)$/).test((element as HTMLButtonElement).type)

/**
 * Validates the fields of the native `<form>` it wraps, on submit or through `validate()`.
 *
 * Put one `<form>` directly inside; the component turns off the browser's validation bubbles and shows each field's
 * message in the field instead, kept current while the user corrects it. Fields take part through their `name`.
 * A submit with invalid fields moves focus to the first one and fires `form-invalid`; a valid one fires
 * `form-submit` with the `FormData` instead of navigating. Resetting the form restores the values and hides the messages.
 *
 * As in a native form, Enter in a single-line field submits, and `AltButton`, `AltSimpleButton`, `AltIconButton` and
 * `AltBrandButton` with `type="submit"` or `type="reset"` submit or reset it. Another element with the `type` attribute,
 * such as `AltCardButton`, does the same on click through the form.
 */
@customElement(tagName)
@withLocator(tagName)
export class AltCoreForm
  extends LitElement
  implements IAltCoreFormProps {
  @property({ type: Boolean, attribute: 'no-error-focus', converter: booleanConverter }) noErrorFocus: IAltCoreFormProps['noErrorFocus'] = noErrorFocus

  @bubblingEvent(FormSubmitEvent, { name: 'form-submit' })
  protected _formSubmit!: TDispatcher<FormSubmitEvent>

  @bubblingEvent(FormInvalidEvent, { name: 'form-invalid' })
  protected _formInvalid!: TDispatcher<FormInvalidEvent>

  @bubblingEvent(FormResetEvent, { name: 'form-reset' })
  protected _formReset!: TDispatcher<FormResetEvent>

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreFormVarsCss)}
      ${unsafeCSS(AltCoreFormScopedCss)}
    `,
  ]

  /** The wrapped native form */
  get form() {
    return this.querySelector<HTMLFormElement>(':scope > form')
  }

  private get controls(): IFormControl[] {
    // Form-associated fields are listed in `elements` with the native controls, in document order
    return [...new Set(Array.from(this.form?.elements ?? [], getAssociatedControl))] as IFormControl[]
  }

  /**
   * Validates every field and shows the messages
   * @returns {Promise<boolean>} Whether all fields are valid
   */
  async validate() {
    const controls = this.controls
    await Promise.all(controls.flatMap((control) => control.updateComplete ?? []))

    const invalid = controls.filter((control) => !isValid(control))
    if (!invalid.length) return true

    if (!this.noErrorFocus) this.focusControl(invalid[0])
    this._formInvalid({ detail: { controls: invalid } })

    return false
  }

  /** Hides the validation messages of every field */
  resetValidation() {
    for (const control of this.controls) control.resetValidation?.()
  }

  /** Validates and submits the form, as a submit button does */
  submit() {
    if (this.form) requestFormSubmit(this.form)
  }

  /** Restores the initial values and hides the validation messages */
  reset() {
    if (this.form) HTMLFormElement.prototype.reset.call(this.form)
  }

  connectedCallback() {
    super.connectedCallback()

    this.addEventListener('submit', this.handleSubmit)
    this.addEventListener('reset', this.handleReset)
    this.addEventListener('click', this.handleClick)
    this.addEventListener('keydown', this.handleKeydown)
    this.ownerDocument.addEventListener('click', this.rememberSubmitter, true)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.removeEventListener('submit', this.handleSubmit)
    this.removeEventListener('reset', this.handleReset)
    this.removeEventListener('click', this.handleClick)
    this.removeEventListener('keydown', this.handleKeydown)
    this.ownerDocument.removeEventListener('click', this.rememberSubmitter, true)
  }

  private focusControl(control: IFormControl) {
    // A native control gets the browser's bubble, which also focuses it
    if (!control.validate && control.reportValidity) {
      control.reportValidity()
    } else {
      control.focus()
    }
  }

  private readonly handleSubmit = (event: Event) => {
    const { form } = this
    if (event.target !== form || !form) return

    // The form never navigates: a valid submit fires `form-submit` instead
    event.preventDefault()
    event.stopPropagation()

    const { submitter = this.clickedSubmitter } = event as Partial<SubmitEvent>
    void this.submitValid(form, isImplicitSubmitter(submitter) ? null : submitter)
  }

  private async submitValid(form: HTMLFormElement, submitter: HTMLElement | null) {
    if (!await this.validate()) return

    this._formSubmit({ detail: { formData: createFormData(form, submitter), submitter } })
  }

  private readonly handleReset = (event: Event) => {
    if (event.target !== this.form) return

    event.stopPropagation()
    // The fields restore their values after the `reset` event
    queueMicrotask(() => {
      if (event.defaultPrevented) return

      this.resetValidation()
      this._formReset()
    })
  }

  private readonly rememberSubmitter = (event: MouseEvent) => {
    const nativeButton = event.composedPath().find((element) => isNativeSubmitter(element) && element.form === this.form) as HTMLButtonElement | HTMLInputElement | undefined
    if (nativeButton) {
      // SubmitEvent.submitter is missing in Safari 14.1. Click's default action submits synchronously.
      this.clickedSubmitter = nativeButton
      queueMicrotask(() => { this.clickedSubmitter = null })
    }
  }

  private readonly handleClick = (event: MouseEvent) => {
    const button = getTypeAttributeButton(event.composedPath())
    if (!button || !this.form?.contains(button)) return

    if (button.getAttribute('type') === 'submit') {
      this.submit()
    } else {
      this.reset()
    }
  }

  private clickedSubmitter: HTMLElement | null = null

  private readonly handleKeydown = (event: Event) => {
    const keydown = getNativeKeydown(event)
    if (keydown?.key !== 'Enter' || keydown.defaultPrevented || keydown.isComposing) return

    if (submitsWithEnter(keydown.composedPath()[0])) this.submit()
  }

  private readonly handleSlotChange = () => {
    const { form } = this
    if (form) form.noValidate = true
  }

  protected render() {
    return html`<slot @slotchange=${this.handleSlotChange}></slot>`
  }
}
