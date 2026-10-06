import type { InputType } from '@storybook/csf'
import { getComponentEmitsTable } from '~shared/.storybook/tables'

export const onInputEmit: InputType = {
  type: 'function',
  description: 'Input event',
  ...getComponentEmitsTable(),
}

export const onBlurEmit: InputType = {
  type: 'function',
  description: 'Blur event',
  ...getComponentEmitsTable(),
}

export const onFocusEmit: InputType = {
  type: 'function',
  description: 'Focus event',
  ...getComponentEmitsTable(),
}

export const onClearEmit: InputType = {
  type: 'function',
  description: 'Clear event',
  ...getComponentEmitsTable(),
}

export const onKeydownEmit: InputType = {
  type: 'function',
  description: 'Key press event',
  ...getComponentEmitsTable(),
}

export const onCheckedEmit: InputType = {
  type: 'function',
  description: 'State change event',
  ...getComponentEmitsTable(),
}

export const onVisibleEmit: InputType = {
  type: 'function',
  description: 'Visibility change event',
  ...getComponentEmitsTable(),
}

export const onSelectEmit: InputType = {
  type: 'function',
  description: 'Item selection event',
  ...getComponentEmitsTable(),
}
