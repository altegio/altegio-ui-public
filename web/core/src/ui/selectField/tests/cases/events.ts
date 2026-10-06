const selectFieldFocusEventName = 'focus'
const selectFieldBlurEventName = 'blur'

const selectFieldFocusEvent = new CustomEvent(
  selectFieldFocusEventName,
  { detail: null },
)
const selectFieldBlurEvent = new CustomEvent(
  selectFieldBlurEventName,
  { detail: null },
)

type TEventTestCase = {
  eventName: string
  event: CustomEvent
  case: string
  emitEventName: string
}

export const wrapperEvents: TEventTestCase[] = [
  { eventName: selectFieldFocusEventName, event: selectFieldFocusEvent, emitEventName: selectFieldFocusEventName, case: 'при фокусе' },
  { eventName: selectFieldBlurEventName, event: selectFieldBlurEvent, emitEventName: selectFieldBlurEventName, case: 'при потере фокуса' },
]
