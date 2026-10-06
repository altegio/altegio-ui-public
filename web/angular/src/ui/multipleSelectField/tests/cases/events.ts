const focusEventName = 'focus'
const blurEventName = 'blur'
const inputEventName = 'input'
const selectOptionEventName = 'select'

type TVueEventTestCase = {
  eventName: string
  case: string
}

export const ngInputEvents: TVueEventTestCase[] = [
  { eventName: inputEventName, case: 'при вводе' },
  { eventName: focusEventName, case: 'при фокусе' },
  { eventName: blurEventName, case: 'при потере фокуса' },
  { eventName: selectOptionEventName, case: 'при выборе из опций' },
]
