type TVueEventTestCase = {
  eventName: string
  emitEventName: string
  case: string
}

export const eventsTestCases: TVueEventTestCase[] = [
  { eventName: 'click', emitEventName: 'click', case: 'при клике' },
  { eventName: 'focus', emitEventName: 'focus', case: 'при фокусе' },
  { eventName: 'blur', emitEventName: 'blur', case: 'при потере фокуса' },
]
