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
  { eventName: inputEventName, case: 'при вводе' },
  { eventName: focusEventName, case: 'при фокусе' },
  { eventName: blurEventName, case: 'при потере фокуса' },
  { eventName: keydownEventName, case: 'при нажатии клавиши' },
  { eventName: renderEventName, case: 'при рендере' },
]
