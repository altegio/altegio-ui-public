import type { TEventTestCase } from '~shared/types/tests.ts'

export const eventUpdateModelValue: TEventTestCase[] = [{ event: 'update:modelValue', case: 'при смене активного Tab', nodeEventName: 'change-active-tab', payload: { value: 0 } }]
