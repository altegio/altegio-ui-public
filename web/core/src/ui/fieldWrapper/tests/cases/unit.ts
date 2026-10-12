import type { TPropTestCase } from '~shared/types/tests'
import { YCoreFieldInputTagName } from '~shared/constants'
import {
  type IYCoreFieldWrapperProps,
} from '~core/ui/fieldWrapper/models/types'
import { vi } from 'vitest'

export const fieldInputHtml = `
  <${YCoreFieldInputTagName} value="Default value"></${YCoreFieldInputTagName}>
`

export const emptyFieldInputHtml = ''

export const propsTestCases: TPropTestCase<IYCoreFieldWrapperProps, keyof IYCoreFieldWrapperProps>[] = [
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

export const eventsTestCases = [
  {
    name: 'click',
    description: 'Должен генерировать событие click при клике',
    event: new MouseEvent('click'),
    handler: vi.fn(),
    expectedCallCount: 1,
  },
  {
    name: 'click',
    description: 'Не должен генерировать событие click при клике, если fieldWrapper disabled',
    event: new MouseEvent('click'),
    handler: vi.fn(),
    expectedCallCount: 0,
    props: { disabled: true },
  },
  {
    name: 'focus',
    description: 'Должен генерировать событие focus при фокусе',
    event: new FocusEvent('focus'),
    handler: vi.fn(),
    expectedCallCount: 1,
  },
  {
    name: 'blur',
    description: 'Должен генерировать событие blur при потере фокуса',
    event: new FocusEvent('blur'),
    handler: vi.fn(),
    expectedCallCount: 1,
  },
  {
    name: 'mouseenter',
    description: 'Должен генерировать событие mouseenter при наведении мыши',
    event: new MouseEvent('mouseenter'),
    handler: vi.fn(),
    expectedCallCount: 1,
  },
  {
    name: 'mouseleave',
    description: 'Должен генерировать событие mouseleave при уходе мыши',
    event: new MouseEvent('mouseleave'),
    handler: vi.fn(),
    expectedCallCount: 1,
  },
  {
    name: 'click-outside',
    description: 'Должен генерировать событие click-outside при клике вне компонента',
    event: new MouseEvent('click', { bubbles: true }),
    handler: vi.fn(),
    expectedCallCount: 1,
  },
]
