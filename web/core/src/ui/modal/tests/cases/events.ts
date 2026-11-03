import type { TEventTestCase } from '~shared/types/tests'

export const eventOpenCases: TEventTestCase[] = [{ event: 'open', case: 'when the modal opens', nodeEventName: 'open' }]

export const eventCloseCases: TEventTestCase[] = [{ event: 'close', case: 'when the modal closes', nodeEventName: 'close' }]

export const eventOverlayClickCases: TEventTestCase[] = [{ event: 'overlay-click', case: 'on overlay click', nodeEventName: 'overlay-click' }]

export const eventActivatorCLickCases: TEventTestCase[] = [{ event: 'activator-click', case: 'on activator click', nodeEventName: 'activator-click' }]

export const eventCloseIconCLickCases: TEventTestCase[] = [{ event: 'close-icon-click', case: 'on close icon click', nodeEventName: 'close-icon-click' }]

export const eventPressEscapeCases: TEventTestCase[] = [{ event: 'press-escape', case: 'on Esc press', nodeEventName: 'press-escape' }]
