import { text } from '~shared/tests/slotContents'

type TVueEventTestCase = {
  eventName: string
  emitEventName: string
  payload?: { value: string }
  case: string
}

export const vueInputEvents: TVueEventTestCase[] = [
  { eventName: 'input', payload: { value: text }, emitEventName: 'input', case: 'on input' },
  { eventName: 'focus', emitEventName: 'focus', case: 'on focus' },
  { eventName: 'blur', emitEventName: 'blur', case: 'on blur' },
  { eventName: 'select', emitEventName: 'update:modelValue', case: 'on option select' },
]
