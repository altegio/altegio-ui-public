import { text } from '~shared/tests/slotContents'

type TVueEventTestCase = {
  eventName: string
  emitEventName: string
  payload?: { value: string }
  case: string
}

export const vueInputEvents: TVueEventTestCase[] = [
  { eventName: 'change', payload: { value: text }, emitEventName: 'change', case: 'on phone number input' },
  { eventName: 'focus', emitEventName: 'focus', case: 'on focus' },
  { eventName: 'blur', emitEventName: 'blur', case: 'on blur' },
  { eventName: 'select-option', emitEventName: 'selectOption', case: 'on autocomplete option select' },
]
