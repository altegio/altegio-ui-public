import type { TPropTestCase } from '~shared/types/tests'
import { AltCoreFieldInputTagName } from '~shared/constants'
import {
  type IAltCoreFieldWrapperProps,
} from '~core/ui/fieldWrapper/models/types'
import { vi } from 'vitest'

export const fieldInputHtml = `
  <${AltCoreFieldInputTagName} value="Default value"></${AltCoreFieldInputTagName}>
`

export const emptyFieldInputHtml = ''

export const propsTestCases: TPropTestCase<IAltCoreFieldWrapperProps, keyof IAltCoreFieldWrapperProps>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
  { prop: 'readonly', case: 'true', value: true },
  { prop: 'readonly', case: 'false', value: false },
  { prop: 'error', case: 'true', value: true },
  { prop: 'error', case: 'false', value: false },
  { prop: 'size', case: 'small', value: 'small' },
  { prop: 'size', case: 'medium', value: 'medium' },
  { prop: 'size', case: 'large', value: 'large' },
]

export const eventsTestCases: {
  name: string
  description: string
  event: Event
  handler: () => void
  expectedCallCount: number
  props?: Partial<IAltCoreFieldWrapperProps>
}[] = [
  {
    name: 'click',
    description: 'Should emit click on click',
    event: new MouseEvent('click'),
    handler: vi.fn(),
    expectedCallCount: 1,
  },
  {
    name: 'click',
    description: 'Should not emit click on click when fieldWrapper is disabled',
    event: new MouseEvent('click'),
    handler: vi.fn(),
    expectedCallCount: 0,
    props: { disabled: true },
  },
  {
    name: 'focus',
    description: 'Should emit focus on focus',
    event: new FocusEvent('focus'),
    handler: vi.fn(),
    expectedCallCount: 1,
  },
  {
    name: 'blur',
    description: 'Should emit blur on blur',
    event: new FocusEvent('blur'),
    handler: vi.fn(),
    expectedCallCount: 1,
  },
  {
    name: 'mouseenter',
    description: 'Should emit mouseenter on mouse enter',
    event: new MouseEvent('mouseenter'),
    handler: vi.fn(),
    expectedCallCount: 1,
  },
  {
    name: 'mouseleave',
    description: 'Should emit mouseleave on mouse leave',
    event: new MouseEvent('mouseleave'),
    handler: vi.fn(),
    expectedCallCount: 1,
  },
  {
    name: 'click-outside',
    description: 'Should emit click-outside on click outside the component',
    event: new MouseEvent('click', { bubbles: true }),
    handler: vi.fn(),
    expectedCallCount: 1,
  },
]
