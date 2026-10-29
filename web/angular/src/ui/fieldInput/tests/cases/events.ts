const focusEventName = 'focus'
const blurEventName = 'blur'
const inputEventName = 'input'
const keydownEventName = 'keydown'
const renderEventName = 'render'

type TVueEventTestCase = {
  eventName: string
  case: string
}

export const ngInputEvents: TVueEventTestCase[] = [
  { eventName: inputEventName, case: 'on input' },
  { eventName: focusEventName, case: 'on focus' },
  { eventName: blurEventName, case: 'on blur' },
  { eventName: keydownEventName, case: 'on key press' },
  { eventName: renderEventName, case: 'on render' },
]
