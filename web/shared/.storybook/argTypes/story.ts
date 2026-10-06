import type { InputType } from '@storybook/csf'
import { storyControlsTable } from '~shared/.storybook/tables'
import { MULTIPLE_ERRORS } from '../constants'
import { SINGLE_ERROR } from '../constants'

export const isLongText: InputType = {
  type: 'boolean',
  description: 'Использовать длинный текст для демонстрации',
  control: 'boolean',
  ...storyControlsTable,
}

export const showErrors: InputType = {
  control: { type: 'select' },

  description: 'Отображает одну или несколько ошибок, поле `errors` имеет приоритет над этим аргументом',
  options: [
    'none',
    'single',
    'multiple',
  ],
  mapping: {
    none: '',
    single: SINGLE_ERROR,
    multiple: MULTIPLE_ERRORS,
  },
  ...storyControlsTable,
}

