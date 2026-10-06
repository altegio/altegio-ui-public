import type { InputType } from '@storybook/csf'
import { getComponentStateTable, getComponentContentTable } from '~shared/.storybook/tables'

import { EAnchorTarget, EYInputAutocomplete, EYInputType } from '~shared/types/global'

export const value: InputType = {
  type: 'string',
  description: 'Initial input value.',
  ...getComponentContentTable(),
}

export const name: InputType = {
  type: 'string',
  description: 'Form control name; used in form submissions and not displayed to the user',
  ...getComponentContentTable(),
}

export const placeholder: InputType = {
  type: 'string',
  description: 'Placeholder text',
  ...getComponentContentTable(),
}

export const active: InputType = {
  type: 'boolean',
  description: 'Marks the segment as selected.',
  ...getComponentStateTable(),
}

export const disabled: InputType = {
  type: 'boolean',
  description: 'Disables interaction with the component.',
  ...getComponentStateTable(),
}
export const hovered: InputType = {
  type: 'boolean',
  description: 'Controls the hover state programmatically.',
  ...getComponentStateTable(),
}
export const readonly: InputType = {
  type: 'boolean',
  description: 'Prevents changes to the value.',
  ...getComponentStateTable(),
}
export const required: InputType = {
  type: 'boolean',
  description: 'Marks the field as required.',
  ...getComponentStateTable(),
}
export const maxlength: InputType = {
  type: 'number',
  description: 'Maximum number of characters in the value.',
  ...getComponentStateTable(),
}
export const autofocus: InputType = {
  type: 'boolean',
  description: 'Focuses the component when the page loads.',
  ...getComponentStateTable(),
}
export const type: InputType = {
  control: { type: 'select' },
  description: 'Input type. Defaults to text. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types.',
  options: Object.values(EYInputType),
  ...getComponentStateTable(),
}

export const autocomplete: InputType = {
  control: { type: 'select' },
  description: 'Controls browser autocomplete for form data',
  options: Object.values(EYInputAutocomplete),
  ...getComponentStateTable(),
}

export const checked: InputType = {
  type: 'boolean',
  description: 'Checked state',
  ...getComponentStateTable(),
}

export const href: InputType = {
  type: 'string',
  description: 'Link URL or anchor. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href',
  ...getComponentContentTable(),
}

export const target: InputType = {
  control: { type: 'select' },
  description: 'Controls where the link opens. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target.',
  options: Object.values(EAnchorTarget),
  ...getComponentStateTable(),
}
