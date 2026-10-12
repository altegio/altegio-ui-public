import type { TEventTestCase } from '~shared/types/tests'

export const eventInputCases: TEventTestCase[] = [
  {
    event: 'input',
    case: 'при вводе текста',
    nodeEventName: 'input',
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
export const eventKeydownCases: TEventTestCase[] = [
  {
    event: 'keydown',
    case: 'при нажатии клавиши',
    nodeEventName: 'keydown',
  },
]

export const eventRenderCases: TEventTestCase[] = [
  {
    event: 'render',
    case: 'при рендере',
    nodeEventName: 'render',
  },
]
