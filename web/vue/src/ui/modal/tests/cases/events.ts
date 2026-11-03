import type { TEventTestCase } from '~shared/types/tests'

export const eventOpenCases: TEventTestCase[] = [{ event: 'open', case: 'when the modal opens', nodeEventName: 'open' }]

export const eventCloseCases: TEventTestCase[] = [{ event: 'close', case: 'when the modal closes', nodeEventName: 'close' }]

export const eventOverlayClickCases: TEventTestCase[] = [{ event: 'click-overlay', case: 'on overlay click', nodeEventName: 'click-overlay' }]

export const eventActivatorCLickCases: TEventTestCase[] = [{ event: 'click-activator', case: 'on activator click', nodeEventName: 'click-activator' }]

export const eventCloseIconCLickCases: TEventTestCase[] = [{ event: 'click-close-icon', case: 'on close icon click', nodeEventName: 'click-close-icon' }]

export const eventPressEscapeCases: TEventTestCase[] = [{ event: 'press-escape', case: 'on Esc press', nodeEventName: 'press-escape' }]
