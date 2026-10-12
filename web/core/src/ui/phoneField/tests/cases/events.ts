import { searchNumberValue } from '~shared/tests/slotContents'

const focusEventName = 'focus'
const blurEventName = 'blur'
const inputEventName = 'input'

const inputEvent = new CustomEvent(
  inputEventName,
  { detail: { value: searchNumberValue } },
)
const focusEvent = new CustomEvent(
  focusEventName,
  { detail: null },
)
const blurEvent = new CustomEvent(
  blurEventName,
  { detail: null },
)

type TEventTestCase = {
  eventName: string
  payload?: { value: string }
  event: CustomEvent
  case: string
  emitEventName: string
}

export const wrapperEvents: TEventTestCase[] = [
  { eventName: focusEventName, event: focusEvent, emitEventName: focusEventName, case: 'при фокусе' },
  { eventName: blurEventName, event: blurEvent, emitEventName: blurEventName, case: 'при потере фокуса' },
]

export const fieldEvents: TEventTestCase[] = [{ eventName: inputEventName, payload: { value: searchNumberValue }, event: inputEvent, emitEventName: 'change', case: 'при вводе номера' }]
