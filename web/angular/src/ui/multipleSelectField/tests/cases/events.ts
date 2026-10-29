const focusEventName = 'focus'
const blurEventName = 'blur'
const inputEventName = 'input'
const selectOptionEventName = 'select'

type TVueEventTestCase = {
  eventName: string
  case: string
}

export const ngInputEvents: TVueEventTestCase[] = [
  { eventName: inputEventName, case: 'on input' },
  { eventName: focusEventName, case: 'on focus' },
  { eventName: blurEventName, case: 'on blur' },
  { eventName: selectOptionEventName, case: 'on option select' },
]
