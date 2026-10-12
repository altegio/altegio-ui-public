import type { InputType } from '@storybook/csf'
import { storyControlsTable } from '~shared/.storybook/tables'
import { MULTIPLE_ERRORS } from '../constants'
import { SINGLE_ERROR } from '../constants'

export const isLongText: InputType = {
  type: 'boolean',
  description: 'Use long sample text',
  control: 'boolean',
  ...storyControlsTable,
}

export const showErrors: InputType = {
  control: { type: 'select' },

  description: 'Displays one or more errors; the `errors` property takes precedence',
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

