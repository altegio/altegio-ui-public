import type { TEventTestCase } from '~shared/types/tests'

export const eventInputCases: TEventTestCase[] = [{ event: 'update:modelValue', case: 'on text input', nodeEventName: 'input' }]
export const eventBlurCases: TEventTestCase[] = [{ event: 'blur', case: 'on blur', nodeEventName: 'blur' }]
export const eventFocusCases: TEventTestCase[] = [{ event: 'focus', case: 'on focus', nodeEventName: 'focus' }]
export const eventClearCases: TEventTestCase[] = [{ event: 'clear', case: 'on field clear', nodeEventName: 'clear' }]
