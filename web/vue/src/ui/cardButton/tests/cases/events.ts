type TVueEventTestCase = {
  eventName: string
  emitEventName: string
  case: string
}

export const eventsTestCases: TVueEventTestCase[] = [
  { eventName: 'click', emitEventName: 'click', case: 'on click' },
  { eventName: 'focus', emitEventName: 'focus', case: 'on focus' },
  { eventName: 'blur', emitEventName: 'blur', case: 'on blur' },
]
