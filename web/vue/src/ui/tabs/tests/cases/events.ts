import type { TEventTestCase } from '~shared/types/tests.ts'

export const eventUpdateModelValue: TEventTestCase[] = [{ event: 'update:modelValue', case: 'when the active Tab changes', nodeEventName: 'change-active-tab', payload: { value: 0 } }]
