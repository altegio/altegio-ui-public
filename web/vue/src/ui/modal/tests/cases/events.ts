import type { TEventTestCase } from '~shared/types/tests'

export const eventOpenCases: TEventTestCase[] = [{ event: 'open', case: 'при открытии окна', nodeEventName: 'open' }]

export const eventCloseCases: TEventTestCase[] = [{ event: 'close', case: 'при закрытии окна', nodeEventName: 'close' }]

export const eventOverlayClickCases: TEventTestCase[] = [{ event: 'click-overlay', case: 'при клике по overlay', nodeEventName: 'click-overlay' }]

export const eventActivatorCLickCases: TEventTestCase[] = [{ event: 'click-activator', case: 'при клике по активатору', nodeEventName: 'click-activator' }]

export const eventCloseIconCLickCases: TEventTestCase[] = [{ event: 'click-close-icon', case: 'при клике по иконке закрытия', nodeEventName: 'click-close-icon' }]

export const eventPressEscapeCases: TEventTestCase[] = [{ event: 'press-escape', case: 'при нажатии на esc', nodeEventName: 'press-escape' }]
