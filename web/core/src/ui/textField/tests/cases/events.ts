import type { TEventTestCase } from '~shared/types/tests'

export const eventClickOutsideCases: TEventTestCase[] = [{ event: 'click-outside', case: 'при открытии окна', nodeEventName: 'click-outside' }]
export const eventMouseEnterCases: TEventTestCase[] = [{ event: 'mouse-enter', case: 'при закрытии окна', nodeEventName: 'mouse-enter' }]
export const eventMouseLeaveCases: TEventTestCase[] = [{ event: 'mouse-leave', case: 'при закрытии окна', nodeEventName: 'mouse-leave' }]
export const eventInputCases: TEventTestCase[] = [{ event: 'input', case: 'при закрытии окна', nodeEventName: 'input' }]
export const eventFocusCases: TEventTestCase[] = [{ event: 'focus', case: 'при закрытии окна', nodeEventName: 'focus' }]
export const eventBlurCases: TEventTestCase[] = [{ event: 'blur', case: 'при закрытии окна', nodeEventName: 'blur' }]
export const eventRenderInputCases: TEventTestCase[] = [{ event: 'render-input', case: 'при закрытии окна', nodeEventName: 'render' }]
export const eventCloseCases: TEventTestCase[] = [{ event: 'clear', case: 'при закрытии окна', nodeEventName: 'clear' }]
