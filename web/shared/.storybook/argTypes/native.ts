import type { InputType } from '@storybook/csf'
import { getComponentStateTable, getComponentContentTable } from '~shared/.storybook/tables'

import { EAnchorTarget, EYInputAutocomplete, EYInputType } from '~shared/types/global'

export const value: InputType = {
  type: 'string',
  description: 'Начальное значение input.',
  ...getComponentContentTable(),
}

export const name: InputType = {
  type: 'string',
  description: 'Используется для указания имени элемента управления; Полезно при работе с формами; Визуально не отображается пользователю',
  ...getComponentContentTable(),
}

export const placeholder: InputType = {
  type: 'string',
  description: 'Текст-подсказка внутри поля',
  ...getComponentContentTable(),
}

export const active: InputType = {
  type: 'boolean',
  description: 'Делает компонент выбранным в списке сегментом.',
  ...getComponentStateTable(),
}

export const disabled: InputType = {
  type: 'boolean',
  description: 'Делает компонент недоступным для взаимодействий.',
  ...getComponentStateTable(),
}
export const hovered: InputType = {
  type: 'boolean',
  description: 'Программное управление состоянием ховера.',
  ...getComponentStateTable(),
}
export const readonly: InputType = {
  type: 'boolean',
  description: 'Блокирует компонент для изменения value.',
  ...getComponentStateTable(),
}
export const required: InputType = {
  type: 'boolean',
  description: 'Делает компонент обязательным для ввода.',
  ...getComponentStateTable(),
}
export const maxlength: InputType = {
  type: 'number',
  description: 'Максимальное кол-во символов для value.',
  ...getComponentStateTable(),
}
export const autofocus: InputType = {
  type: 'boolean',
  description: 'Добавляет фокус на компонент при загрузки страницы.',
  ...getComponentStateTable(),
}
export const type: InputType = {
  control: { type: 'select' },
  description: 'Тип элемента для отображения. Если этот свойство не указано, по умолчанию используется - text. Полное описание каждого типа - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types.',
  options: Object.values(EYInputType),
  ...getComponentStateTable(),
}

export const autocomplete: InputType = {
  control: { type: 'select' },
  description: 'Управление автозаполнением закэшированных браузером данных формы',
  options: Object.values(EYInputAutocomplete),
  ...getComponentStateTable(),
}

export const checked: InputType = {
  type: 'boolean',
  description: 'Состояние активированного чекбокса',
  ...getComponentStateTable(),
}

export const href: InputType = {
  type: 'string',
  description: 'Ссылка (URL или якорь). Полное описание - https://developer.mozilla.org/ru/docs/Web/HTML/Element/a#href',
  ...getComponentContentTable(),
}

export const target: InputType = {
  control: { type: 'select' },
  description: 'Управляет методом открытия ссылки: в текущем окне, в новом и тд. Полное описание - https://developer.mozilla.org/ru/docs/Web/HTML/Element/a#target.',
  options: Object.values(EAnchorTarget),
  ...getComponentStateTable(),
}
