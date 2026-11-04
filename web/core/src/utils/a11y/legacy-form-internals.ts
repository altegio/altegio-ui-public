/** The form APIs used by FormAssociated, also implemented by the native ElementInternals. */
export type TFormInternals = Pick<ElementInternals, 'form' | 'labels' | 'validity' | 'validationMessage' | 'willValidate' | 'checkValidity' | 'reportValidity' | 'setFormValue' | 'setValidity'>

interface ILegacyFormHost extends HTMLElement {
  disabled?: boolean
  readonly?: boolean
  formDisabledCallback: (disabled: boolean) => void
  formResetCallback: () => void
  validate: () => boolean
}

// Core, Vue and Angular can contain separate copies of these helpers in published bundles.
const ASSOCIATED_CONTROL = Symbol.for('@altegio/ui/form-control')
type TAssociatedElement = Element & { [ASSOCIATED_CONTROL]?: HTMLElement }

const associateControl = (element: Element, host: HTMLElement) => {
  Object.defineProperty(element, ASSOCIATED_CONTROL, { value: host })
}

/** Resolves the native proxy used in older browsers back to the public field. */
export const getAssociatedControl = (element: Element): HTMLElement => (element as TAssociatedElement)[ASSOCIATED_CONTROL] ?? element as HTMLElement

/** Disabled fieldsets exclude their first legend, including through nested fieldsets. */
const disabledByFieldset = (host: HTMLElement) => {
  for (let ancestor = host.parentElement; ancestor; ancestor = ancestor.parentElement) {
    if (!(ancestor instanceof HTMLFieldSetElement) || !ancestor.disabled) continue

    const legend = Array.from(ancestor.children).find((child) => child instanceof HTMLLegendElement)
    if (!legend?.contains(host)) return true
  }

  return false
}

/**
 * Form participation for Safari 14.1–16.3 without patching browser prototypes.
 * Native light-DOM inputs supply FormData, form ownership, fieldset rules and constraint validation.
 * The validation input is outside keyboard navigation; interactive native validation forwards focus
 * to the visible field. Hidden value inputs also support repeated FormData entries.
 */
export class LegacyFormInternals implements TFormInternals {
  private readonly validationInput = document.createElement('input')
  private readonly valueInputs: HTMLInputElement[] = []
  private readonly observer = new MutationObserver(() => { this.sync() })
  private owner: HTMLFormElement | null = null
  private flags: ValidityStateFlags = {}
  private message = ''
  private value: string | File | FormData | null = null

  constructor(private readonly host: ILegacyFormHost) {
    const input = this.validationInput
    input.tabIndex = -1
    input.setAttribute('aria-hidden', 'true')
    // A type=hidden input is barred from validation. Keep this input focusable for native reportValidity.
    input.style.cssText = 'position:absolute;width:1px;height:1px;opacity:0;clip-path:inset(50%);pointer-events:none'
    associateControl(input, host)
    input.addEventListener('invalid', (event) => {
      event.stopPropagation()
      if (!host.dispatchEvent(new Event('invalid', { cancelable: true }))) event.preventDefault()
    })
    input.addEventListener('focus', () => {
      host.validate()
      // Let native reportValidity finish opening its popup before moving focus.
      // Moving it within the focus event can leave Firefox's popup intercepting pointer input.
      queueMicrotask(() => {
        if (host.isConnected && input.matches(':focus')) host.focus()
      })
    })
  }

  connect() {
    // Many fields have no default slot. A sibling proxy stays rendered so native validation can focus it.
    this.host.before(this.validationInput)
    this.host.append(...this.valueInputs)
    this.sync()
    this.observer.observe(this.host.getRootNode(), {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['disabled', 'readonly', 'form', 'id'],
    })
  }

  disconnect() {
    this.observer.disconnect()
    this.validationInput.remove()
    this.owner?.removeEventListener('reset', this.handleReset)
    this.owner = null
  }

  private readonly handleReset = (event: Event) => {
    // Native reset callbacks run only after every listener has had a chance to cancel the event.
    queueMicrotask(() => {
      if (event.defaultPrevented || !this.host.isConnected || event.target !== this.form) return

      this.host.formResetCallback()
      // Native reset clears file proxies even when the component's own value has not changed.
      this.setFormValue(this.value)
    })
  }

  sync() {
    if (this.host.isConnected && this.validationInput.nextSibling !== this.host) this.host.before(this.validationInput)
    for (const input of [this.validationInput, ...this.valueInputs]) this.syncInput(input)
    const readonly = Boolean(this.host.readonly)
    if (this.validationInput.readOnly !== readonly) this.validationInput.readOnly = readonly
    this.host.formDisabledCallback(disabledByFieldset(this.host))
    this.syncForm()
  }

  private syncInput(input: HTMLInputElement) {
    const formAttribute = this.host.getAttribute('form')
    const disabled = Boolean(this.host.disabled)
    if (input.disabled !== disabled) input.disabled = disabled
    if (formAttribute === null) {
      input.removeAttribute('form')
    } else if (input.getAttribute('form') !== formAttribute) {
      input.setAttribute('form', formAttribute)
    }
  }

  private syncForm() {
    const form = this.form
    if (form === this.owner) return

    this.owner?.removeEventListener('reset', this.handleReset)
    this.owner = form
    form?.addEventListener('reset', this.handleReset)
  }

  get form() {
    return this.validationInput.form
  }

  get labels(): NodeList {
    const root = this.host.getRootNode() as ParentNode
    const labels = Array.from(root.querySelectorAll('label')).filter((label) => label.contains(this.host) || Boolean(this.host.id && label.htmlFor === this.host.id))

    // Match NodeList's iterable, indexed and item APIs while retaining the original label elements.
    return Object.assign(labels, { item: (index: number) => labels[index] ?? null }) as unknown as NodeList
  }

  get validity(): ValidityState {
    const flags = {
      badInput: false,
      customError: false,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valueMissing: false,
      ...this.flags,
    }

    return { ...flags, valid: !Object.values(flags).some(Boolean) }
  }

  get validationMessage() {
    return this.willValidate ? this.message : ''
  }

  get willValidate() {
    return this.validationInput.willValidate
  }

  checkValidity() {
    return this.validationInput.checkValidity()
  }

  reportValidity() {
    return this.validationInput.reportValidity()
  }

  setValidity(flags: ValidityStateFlags = {}, message = '') {
    this.flags = flags
    this.message = Object.values(flags).some(Boolean) ? message : ''
    this.validationInput.setCustomValidity(this.message)
    this.sync()
  }

  setFormValue(value: string | File | FormData | null) {
    this.value = value
    const entries: [string, FormDataEntryValue][] = value instanceof FormData
      ? Array.from(value.entries())
      : value === null ? [] : [[this.host.getAttribute('name') ?? '', value]]

    entries.forEach(([name, entry], index) => {
      let input = this.valueInputs[index] as HTMLInputElement | undefined
      if (!input) {
        input = document.createElement('input')
        input.hidden = true
        associateControl(input, this.host)
        this.valueInputs.push(input)
        this.host.append(input)
      }
      input.type = typeof entry === 'string' ? 'hidden' : 'file'
      input.name = name
      this.setInputValue(input, entry)
    })
    for (const input of this.valueInputs.splice(entries.length)) input.remove()
    this.sync()
  }

  private setInputValue(input: HTMLInputElement, value: FormDataEntryValue) {
    if (typeof value === 'string') {
      input.value = value
    } else {
      const transfer = new DataTransfer()
      transfer.items.add(value)
      input.files = transfer.files
    }
  }
}

export const createFormInternals = (host: ILegacyFormHost): TFormInternals => {
  if (typeof host.attachInternals !== 'function') return new LegacyFormInternals(host)

  const internals = host.attachInternals()

  return typeof internals.setFormValue === 'function' && typeof internals.setValidity === 'function'
    ? internals
    : new LegacyFormInternals(host)
}
