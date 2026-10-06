import { text } from '~shared/tests/slotContents'

type TVueEventTestCase = {
  eventName: string
  emitEventName: string
  payload?: { value: string }
  case: string
}

export const vueInputEvents: TVueEventTestCase[] = [
  { eventName: 'change', payload: { value: text }, emitEventName: 'change', case: 'при вводе номера' },
  { eventName: 'focus', emitEventName: 'focus', case: 'при фокусе' },
  { eventName: 'blur', emitEventName: 'blur', case: 'при потере фокуса' },
  { eventName: 'select-option', emitEventName: 'selectOption', case: 'при выборе из опций автокомплита' },
]
