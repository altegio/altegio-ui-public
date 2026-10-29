import type { TEventTestCase } from '~shared/types/tests'

export const eventInputCases: TEventTestCase[] = [
  {
    event: 'input',
    case: 'on text input',
    nodeEventName: 'input',
  },
]
export const eventFocusCases: TEventTestCase[] = [
  {
    event: 'focus',
    case: 'on focus',
    nodeEventName: 'focus',
  },
]
export const eventBlurCases: TEventTestCase[] = [
  {
    event: 'blur',
    case: 'on blur',
    nodeEventName: 'blur',
  },
]
export const eventKeydownCases: TEventTestCase[] = [
  {
    event: 'keydown',
    case: 'on key press',
    nodeEventName: 'keydown',
  },
]

export const eventRenderCases: TEventTestCase[] = [
  {
    event: 'render',
    case: 'on render',
    nodeEventName: 'render',
  },
]
