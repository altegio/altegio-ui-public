import type { InputType } from '@storybook/csf'
import { getComponentEmitsTable } from '~shared/.storybook/tables'

export const onInputEmit: InputType = {
  type: 'function',
  description: 'Событие ввода',
  ...getComponentEmitsTable(),
}

export const onBlurEmit: InputType = {
  type: 'function',
  description: 'Собтыие потери фокуса',
  ...getComponentEmitsTable(),
}

export const onFocusEmit: InputType = {
  type: 'function',
  description: 'Событие получения фокуса',
  ...getComponentEmitsTable(),
}

export const onClearEmit: InputType = {
  type: 'function',
  description: 'Событие очистки',
  ...getComponentEmitsTable(),
}

export const onKeydownEmit: InputType = {
  type: 'function',
  description: 'Событие нажатия на кнопку клавиатуры',
  ...getComponentEmitsTable(),
}

export const onCheckedEmit: InputType = {
  type: 'function',
  description: 'Событие изменения состояния',
  ...getComponentEmitsTable(),
}

export const onVisibleEmit: InputType = {
  type: 'function',
  description: 'Событие изменение показа элемента',
  ...getComponentEmitsTable(),
}

export const onSelectEmit: InputType = {
  type: 'function',
  description: 'Событие выбора элемента',
  ...getComponentEmitsTable(),
}
