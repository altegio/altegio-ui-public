const focusEventName = 'focus'
const blurEventName = 'blur'
const changeEventName = 'change'
const selectOptionEventName = 'selectOption'

type TVueEventTestCase = {
  eventName: string
  case: string
}

export const ngInputEvents: TVueEventTestCase[] = [
  { eventName: changeEventName, case: 'on phone number input' },
  { eventName: focusEventName, case: 'on focus' },
  { eventName: blurEventName, case: 'on blur' },
  { eventName: selectOptionEventName, case: 'on autocomplete option select' },
]
