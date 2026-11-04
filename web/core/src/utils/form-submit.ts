const implicitSubmitters = new WeakSet<HTMLElement>()

/** Whether the button only stands in for requestSubmit() on older Safari. */
export const isImplicitSubmitter = (element: HTMLElement | null) => Boolean(element && implicitSubmitters.has(element))

/** Requests native validation and a submit event, including before Safari 16. */
export const requestFormSubmit = (form: HTMLFormElement) => {
  if (typeof HTMLFormElement.prototype.requestSubmit === 'function') {
    HTMLFormElement.prototype.requestSubmit.call(form)
    return
  }

  const button = document.createElement('button')
  button.type = 'submit'
  button.hidden = true
  implicitSubmitters.add(button)
  form.append(button)
  try {
    button.click()
  } finally {
    button.remove()
  }
}

/**
 * Constructs successful controls in document order, including the submit button's entry.
 * Safari before 16.4 ignores FormData's second argument, so temporary native inputs carry it.
 */
type TSubmitter = HTMLButtonElement | HTMLInputElement

const isSuccessfulSubmitter = (element: HTMLElement | null, form: HTMLFormElement): element is TSubmitter => (element instanceof HTMLButtonElement || element instanceof HTMLInputElement) && element.form === form && !element.matches(':disabled')

const getSubmitterEntries = (submitter: TSubmitter): [string, string][] => {
  if (submitter instanceof HTMLInputElement && submitter.type === 'image') {
    const prefix = submitter.name ? `${submitter.name}.` : ''

    return [[`${prefix}x`, '0'], [`${prefix}y`, '0']]
  }

  return submitter.name ? [[submitter.name, submitter.value]] : []
}

export const createFormData = (form: HTMLFormElement, submitter: HTMLElement | null) => {
  if (!isSuccessfulSubmitter(submitter, form) || isImplicitSubmitter(submitter)) return new FormData(form)

  const inputs = getSubmitterEntries(submitter).map(([name, value]) => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = value
    const formAttribute = submitter.getAttribute('form')
    if (formAttribute !== null) input.setAttribute('form', formAttribute)

    return input
  })
  submitter.before(...inputs)
  try {
    return new FormData(form)
  } finally {
    for (const input of inputs) input.remove()
  }
}
