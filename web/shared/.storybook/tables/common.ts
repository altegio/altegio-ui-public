import type { InputType } from '@storybook/csf'

type TDefaultValueType = unknown

export const storyControlsTable: InputType = {
  table: {
    category: 'Testing controls',
    defaultValue: { summary: 'Not required' },
  },
} as const

const isString = (value: TDefaultValueType): value is string => typeof value === 'string'

const convertToString = (value: TDefaultValueType): string => {
  if (isString(value)) {
    return value
  }

  return String(value)
}

export const getComponentContentTable = (defaultValue?: TDefaultValueType): InputType => ({
  table: {
    category: 'Properties',
    subcategory: 'Content',
    defaultValue: { summary: convertToString(defaultValue) },
  },
})

export const getComponentStateTable = (defaultValue?: TDefaultValueType): InputType => ({
  table: {
    category: 'Properties',
    subcategory: 'State',
    defaultValue: { summary: convertToString(defaultValue) },
  },
})

export const getComponentEmitsTable = (defaultValue?: TDefaultValueType): InputType => ({
  table: {
    category: 'Events',
    defaultValue: { summary: convertToString(defaultValue) },
  },
})

export const getComponentSlotsTable = (slotName: string, defaultValue: TDefaultValueType): InputType => ({
  table: {
    category: 'Slots',
    type: { summary: `slot: #${slotName}` },
    defaultValue: { summary: convertToString(defaultValue) },
  },
})

export const getComponentColorThemeTable = (defaultValue?: TDefaultValueType): InputType => ({
  table: {
    category: 'Color palette',
    defaultValue: { summary: convertToString(defaultValue) },
  },
})
