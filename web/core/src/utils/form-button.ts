import { requestFormSubmit } from './form-submit'

/** A button whose `type` submits or resets the `<form>` around it */
interface IFormButton extends HTMLElement {
  type: string | undefined
  disabled: boolean | undefined
  loading: boolean | undefined
  href?: string | undefined
}

const FORM_ACTIONS: Partial<Record<string, (form: HTMLFormElement) => void>> = {
  submit: requestFormSubmit,
  reset: (form) => { HTMLFormElement.prototype.reset.call(form) },
}

/** Types of a button that act on its form */
export const FORM_BUTTON_TYPES = new Set(Object.keys(FORM_ACTIONS))

const isInactive = (button: IFormButton) => Boolean(button.disabled || button.loading || button.href)

/**
 * Submits or resets the `<form>` around the button, as a native button of the same `type` does.
 * A native button rendered in shadow DOM has no form, so Altegio UI buttons call it on click.
 * A disabled or loading button and a link do nothing.
 * @param button - Button in the form
 */
export const activateFormButton = (button: IFormButton) => {
  const action = FORM_ACTIONS[button.type ?? '']
  const form = button.closest('form')
  if (!action || !form || isInactive(button)) return

  action(form)
}
