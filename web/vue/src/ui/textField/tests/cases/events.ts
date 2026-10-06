import type { TEventTestCase } from '~shared/types/tests'

export const eventInputCases: TEventTestCase[] = [{ event: 'update:modelValue', case: 'при вводе текста', nodeEventName: 'input' }]
export const eventBlurCases: TEventTestCase[] = [{ event: 'blur', case: 'при потере фокуса', nodeEventName: 'blur' }]
export const eventFocusCases: TEventTestCase[] = [{ event: 'focus', case: 'при фокусе', nodeEventName: 'focus' }]
export const eventClearCases: TEventTestCase[] = [{ event: 'clear', case: 'при очистке поля', nodeEventName: 'clear' }]
