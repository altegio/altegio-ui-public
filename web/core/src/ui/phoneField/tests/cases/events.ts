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
  { eventName: focusEventName, event: focusEvent, emitEventName: focusEventName, case: 'on focus' },
  { eventName: blurEventName, event: blurEvent, emitEventName: blurEventName, case: 'on blur' },
]

export const fieldEvents: TEventTestCase[] = [{ eventName: inputEventName, payload: { value: searchNumberValue }, event: inputEvent, emitEventName: 'change', case: 'on phone number input' }]
