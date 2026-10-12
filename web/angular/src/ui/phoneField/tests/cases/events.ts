const focusEventName = 'focus'
const blurEventName = 'blur'
const changeEventName = 'change'
const selectOptionEventName = 'selectOption'

type TVueEventTestCase = {
  eventName: string
  case: string
}

export const ngInputEvents: TVueEventTestCase[] = [
  { eventName: changeEventName, case: 'при вводе номера' },
  { eventName: focusEventName, case: 'при фокусе' },
  { eventName: blurEventName, case: 'при потере фокуса' },
  { eventName: selectOptionEventName, case: 'при выборе из опций автокомплита' },
]
