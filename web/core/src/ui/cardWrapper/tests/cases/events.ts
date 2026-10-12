import type { TEventTestCase } from '~shared/types/tests'
export const eventClickCases: TEventTestCase[] = [
  {
    event: 'click',
    case: 'при клике',
    nodeEventName: 'click',
  },
]
export const eventFocusCases: TEventTestCase[] = [
  {
    event: 'focus',
    case: 'при фокусе',
    nodeEventName: 'focus',
  },
]
export const eventBlurCases: TEventTestCase[] = [
  {
    event: 'blur',
    case: 'при потере фокуса',
    nodeEventName: 'blur',
  },
]
