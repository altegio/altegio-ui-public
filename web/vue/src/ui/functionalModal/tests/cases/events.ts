import type { TEventTestCase } from '~shared/types/tests'

export const eventOpenCases: TEventTestCase[] = [{ event: 'open', case: 'при открытии окна', nodeEventName: 'open' }]
export const eventCloseCases: TEventTestCase[] = [{ event: 'close', case: 'при закрытии окна', nodeEventName: 'close' }]
export const eventOverlayClickCases: TEventTestCase[] = [{ event: 'click-overlay', case: 'при клике по overlay', nodeEventName: 'click-overlay' }]
export const eventActivatorCLickCases: TEventTestCase[] = [{ event: 'click-activator', case: 'при клике по активатору', nodeEventName: 'click-activator' }]
export const eventCloseIconCLickCases: TEventTestCase[] = [{ event: 'click-close-icon', case: 'при клике по иконке закрытия', nodeEventName: 'click-close-icon' }]
export const eventPressEscapeCases: TEventTestCase[] = [{ event: 'press-escape', case: 'при нажатии на esc', nodeEventName: 'press-escape' }]
export const eventCancelCases: TEventTestCase[] = [{ event: 'cancel', case: 'при клике на Cancel', nodeEventName: 'cancel' }]
export const eventSubmitCases: TEventTestCase[] = [{ event: 'submit', case: 'при клике на Submit', nodeEventName: 'submit' }]
export const eventUpdateModalValueCases: TEventTestCase[] = [{ event: 'update:modelValue', case: 'при открытии окна', nodeEventName: 'open' }]
