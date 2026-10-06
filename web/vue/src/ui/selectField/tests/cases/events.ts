import { text } from '~shared/tests/slotContents'

type TVueEventTestCase = {
  eventName: string
  emitEventName: string
  payload?: { value: string }
  case: string
}

export const vueInputEvents: TVueEventTestCase[] = [
  { eventName: 'input', payload: { value: text }, emitEventName: 'input', case: 'при вводе' },
  { eventName: 'focus', emitEventName: 'focus', case: 'при фокусе' },
  { eventName: 'blur', emitEventName: 'blur', case: 'при потере фокуса' },
  { eventName: 'select', emitEventName: 'update:modelValue', case: 'при выборе из опций' },
]
