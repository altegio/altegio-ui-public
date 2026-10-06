import type { InputType } from '@storybook/csf'
import { getComponentContentTable, getComponentEmitsTable, getComponentStateTable } from '~shared/.storybook/tables'
import { EYSizes } from '~shared/types/global'

export const error: InputType = {
  type: 'boolean',
  description: 'Состояние ошибки',
  ...getComponentStateTable(),
}

export const loading: InputType = {
  type: 'boolean',
  description: 'Состояние загрузки',
  ...getComponentStateTable(),
}

export const errors: InputType = {
  control: { type: 'object' },
  description: 'Массив с текстовыми ошибками, отображаемыми в аннотации',
  ...getComponentContentTable(),
}

export const items: InputType = {
  control: { type: 'object' },
  description: 'Массив с элементами c обязательным id и [content] полем, отображаемыми в списке',
  ...getComponentContentTable(),
}

export const size = (sizes?: readonly EYSizes[]): InputType => {
  return {
    type: 'string',
    control: 'radio',
    options: sizes ? [...sizes] : Object.values(EYSizes),
    description: 'Размер компонента',
    ...getComponentStateTable(),
  }
}

export const numericSize = (sizes?: readonly number[] | readonly `${number}`[]): InputType => {
  return {
    type: 'string',
    control: 'radio',
    options: sizes ? [...sizes] : Array.from({ length: 9 }, (_, i) => (i + 1) * 4),
    description: 'Размер компонента',
    ...getComponentStateTable(),
  }
}

export const hoverable: InputType = {
  type: 'boolean',
  description: 'Делает компонент доступным для hover',
  ...getComponentStateTable(),
}

export const focusable: InputType = {
  type: 'boolean',
  description: 'Делает компонент доступным для focus',
  ...getComponentStateTable(),
}

export const hideSpaceLeft: InputType = {
  type: 'boolean',
  description: 'Убрать отступ слева',
  ...getComponentStateTable(),
}

export const hideSpaceRight: InputType = {
  type: 'boolean',
  description: 'Убрать отступ справа',
  ...getComponentStateTable(),
}

export const onClick: InputType = {
  type: 'boolean',
  description: 'Обработчик кликов',
  ...getComponentEmitsTable(),
}
