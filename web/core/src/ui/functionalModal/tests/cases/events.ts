import type { TEventTestCase } from '~shared/types/tests'

export const eventOpenCases: TEventTestCase[] = [{ event: 'open', case: 'при открытии окна', nodeEventName: 'open' }]
export const eventCloseCases: TEventTestCase[] = [{ event: 'close', case: 'при закрытии окна', nodeEventName: 'close' }]
export const eventOverlayClickCases: TEventTestCase[] = [{ event: 'overlay-click', case: 'при клике по overlay', nodeEventName: 'overlay-click' }]
export const eventActivatorCLickCases: TEventTestCase[] = [{ event: 'activator-click', case: 'при клике по активатору', nodeEventName: 'activator-click' }]
export const eventCloseIconCLickCases: TEventTestCase[] = [{ event: 'close-icon-click', case: 'при клике по иконке закрытия', nodeEventName: 'close-icon-click' }]
export const eventPressEscapeCases: TEventTestCase[] = [{ event: 'press-escape', case: 'при нажатии на esc', nodeEventName: 'press-escape' }]
export const eventCancelCases: TEventTestCase[] = [{ event: 'cancel', case: 'при клике на Cancel', nodeEventName: 'cancel' }]
export const eventSubmitCases: TEventTestCase[] = [{ event: 'submit', case: 'при клике на Submit', nodeEventName: 'submit' }]
