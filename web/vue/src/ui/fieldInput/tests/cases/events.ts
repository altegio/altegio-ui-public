import { text } from '~shared/tests/slotContents'

type TVueEventTestCase = {
  eventName: string
  emitEventName: string
  payload?: { value: string }
  case: string
}

export const vueInputEvents: TVueEventTestCase[] = [
  { eventName: 'input', payload: { value: text }, emitEventName: 'update:modelValue', case: 'on input' },
  { eventName: 'focus', emitEventName: 'focus', case: 'on focus' },
  { eventName: 'blur', emitEventName: 'blur', case: 'on blur' },
  { eventName: 'render', emitEventName: 'render', case: 'on render' },
  { eventName: 'keydown', emitEventName: 'keydown', case: 'on key press' },
]
