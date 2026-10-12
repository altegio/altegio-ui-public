import type { InputType } from '@storybook/csf'
import { getComponentContentTable, getComponentEmitsTable, getComponentStateTable } from '~shared/.storybook/tables'
import { EYSizes } from '~shared/types/global'

export const error: InputType = {
  type: 'boolean',
  description: 'Error state',
  ...getComponentStateTable(),
}

export const loading: InputType = {
  type: 'boolean',
  description: 'Loading state',
  ...getComponentStateTable(),
}

export const errors: InputType = {
  control: { type: 'object' },
  description: 'Error messages displayed in the annotation',
  ...getComponentContentTable(),
}

export const items: InputType = {
  control: { type: 'object' },
  description: 'List items with a required id and a [content] field',
  ...getComponentContentTable(),
}

export const size = (sizes?: readonly EYSizes[]): InputType => {
  return {
    type: 'string',
    control: 'radio',
    options: sizes ? [...sizes] : Object.values(EYSizes),
    description: 'Component size',
    ...getComponentStateTable(),
  }
}

export const numericSize = (sizes?: readonly number[] | readonly `${number}`[]): InputType => {
  return {
    type: 'string',
    control: 'radio',
    options: sizes ? [...sizes] : Array.from({ length: 9 }, (_, i) => (i + 1) * 4),
    description: 'Component size',
    ...getComponentStateTable(),
  }
}

export const hoverable: InputType = {
  type: 'boolean',
  description: 'Enables the hover state',
  ...getComponentStateTable(),
}

export const focusable: InputType = {
  type: 'boolean',
  description: 'Enables the focus state',
  ...getComponentStateTable(),
}

export const hideSpaceLeft: InputType = {
  type: 'boolean',
  description: 'Remove left padding',
  ...getComponentStateTable(),
}

export const hideSpaceRight: InputType = {
  type: 'boolean',
  description: 'Remove right padding',
  ...getComponentStateTable(),
}

export const onClick: InputType = {
  type: 'boolean',
  description: 'Click handler',
  ...getComponentEmitsTable(),
}
