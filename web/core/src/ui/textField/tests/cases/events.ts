import type { TEventTestCase } from '~shared/types/tests'

export const eventClickOutsideCases: TEventTestCase[] = [{ event: 'click-outside', case: 'when the modal opens', nodeEventName: 'click-outside' }]
export const eventMouseEnterCases: TEventTestCase[] = [{ event: 'mouse-enter', case: 'when the modal closes', nodeEventName: 'mouse-enter' }]
export const eventMouseLeaveCases: TEventTestCase[] = [{ event: 'mouse-leave', case: 'when the modal closes', nodeEventName: 'mouse-leave' }]
export const eventInputCases: TEventTestCase[] = [{ event: 'input', case: 'when the modal closes', nodeEventName: 'input' }]
export const eventFocusCases: TEventTestCase[] = [{ event: 'focus', case: 'when the modal closes', nodeEventName: 'focus' }]
export const eventBlurCases: TEventTestCase[] = [{ event: 'blur', case: 'when the modal closes', nodeEventName: 'blur' }]
export const eventRenderInputCases: TEventTestCase[] = [{ event: 'render-input', case: 'when the modal closes', nodeEventName: 'render' }]
export const eventCloseCases: TEventTestCase[] = [{ event: 'clear', case: 'when the modal closes', nodeEventName: 'clear' }]
