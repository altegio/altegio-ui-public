import type { LitElement, PropertyValues } from 'lit'
import { property, state } from 'lit/decorators.js'

// Mixin constructors must accept any arguments (TS2545)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TConstructor<T> = new (...args: any[]) => T

export interface IFormControlValidity {
  flags: ValidityStateFlags
  message: string
  anchor?: HTMLElement | null
}

const VALID: IFormControlValidity = {
  flags: {},
  message: '',
}

/**
 * Public API that FormAssociated adds to a component
 */
export declare class FormAssociatedElementInterface {
  static readonly formAssociated: boolean
  name: string | undefined
  readonly form: HTMLFormElement | null
  readonly labels: NodeList
  readonly validity: ValidityState
  readonly validationMessage: string
  readonly willValidate: boolean
  checkValidity(): boolean
  reportValidity(): boolean
  formDisabledCallback(disabled: boolean): void
  formResetCallback(): void
  protected readonly internals: ElementInternals
  protected formDisabled: boolean
  protected get formValue(): string | null
  protected get formValidity(): IFormControlValidity
  protected resetFormControl(): void
}

/**
 * Makes a Lit component a form-associated custom element.
 *
 * The component takes part in a native `<form>` once it has a `name`: it submits `formValue`,
 * reports `formValidity` to constraint validation, and restores its initial state on form reset.
 * Without a `name` it submits nothing and never blocks submission, which keeps existing forms working.
 * A disabled `<fieldset>` ancestor sets `formDisabled`.
 * @param superClass - Component class
 * @returns {TConstructor<FormAssociatedElementInterface> & T} The component class with form association
 */
export const FormAssociated = <T extends TConstructor<LitElement>>(superClass: T) => {
  class FormAssociatedElement extends superClass {
    static readonly formAssociated = true

    /** Name under which the value is submitted with the form */
    @property({ type: String, reflect: true }) name: string | undefined

    /** Whether a disabled fieldset ancestor disables the control */
    @state() protected formDisabled = false

    protected readonly internals: ElementInternals = this.attachInternals()

    get form() {
      return this.internals.form
    }

    get labels() {
      return this.internals.labels
    }

    get validity() {
      return this.internals.validity
    }

    get validationMessage() {
      return this.internals.validationMessage
    }

    get willValidate() {
      return this.internals.willValidate
    }

    checkValidity() {
      return this.internals.checkValidity()
    }

    reportValidity() {
      return this.internals.reportValidity()
    }

    formDisabledCallback(disabled: boolean) {
      this.formDisabled = disabled
    }

    formResetCallback() {
      this.resetFormControl()
    }

    /** Value submitted with the form, `null` submits nothing */
    // Components override it with a getter, so it cannot be a readonly field
    // eslint-disable-next-line @typescript-eslint/class-literal-property-style
    protected get formValue(): string | null {
      return null
    }

    /** Validity reported to constraint validation */
    protected get formValidity(): IFormControlValidity {
      return VALID
    }

    /** Restores the initial value when the form is reset */
    protected resetFormControl() {
      // Components that keep a value override it
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties)

      const participates = Boolean(this.name)
      const { flags, message, anchor } = participates && !this.formDisabled
        ? this.formValidity
        : VALID

      this.internals.setFormValue(participates
        ? this.formValue
        : null)
      // The anchor renders in shadow DOM and may not exist yet; the browser rejects a missing one
      if (anchor) {
        this.internals.setValidity(
          flags,
          message,
          anchor,
        )
      } else {
        this.internals.setValidity(
          flags,
          message,
        )
      }
    }
  }

  return FormAssociatedElement as unknown as TConstructor<FormAssociatedElementInterface> & T
}

const setBooleanOrValueAttribute = (element: Element, attribute: string, value: string | number | boolean | null | undefined) => {
  if (value === false || value === null || value === undefined) return

  element.setAttribute(
    attribute,
    value === true
      ? ''
      : String(value),
  )
}

/**
 * Computes the validity of a control and the browser's localized message with a detached native input
 * @param attributes - Attributes of the native input, for example `{ type: 'checkbox', required: true }`
 * @param properties - Properties of the native input, for example `{ checked: false }`
 * @param anchor - Element the browser points the validation message at
 * @returns {IFormControlValidity} Validity flags and message
 */
export const getNativeValidity = (
  attributes: Record<string, string | number | boolean | null | undefined>,
  properties: Partial<Pick<HTMLInputElement, 'checked' | 'value'>>,
  anchor?: HTMLElement | null,
): IFormControlValidity => {
  const input = document.createElement('input')

  for (const [
    attribute,
    value,
  ] of Object.entries(attributes)) {
    setBooleanOrValueAttribute(
      input,
      attribute,
      value,
    )
  }
  Object.assign(
    input,
    properties,
  )

  const { validity } = input
  const flags: ValidityStateFlags = {
    badInput: validity.badInput,
    customError: validity.customError,
    patternMismatch: validity.patternMismatch,
    rangeOverflow: validity.rangeOverflow,
    rangeUnderflow: validity.rangeUnderflow,
    stepMismatch: validity.stepMismatch,
    tooLong: validity.tooLong,
    tooShort: validity.tooShort,
    typeMismatch: validity.typeMismatch,
    valueMissing: validity.valueMissing,
  }

  return validity.valid
    ? VALID
    : {
      flags,
      message: input.validationMessage,
      anchor,
    }
}
