import type { InputType } from '@storybook/csf'

type TDefaultValueType = unknown

export const storyControlsTable: InputType = {
  table: {
    category: 'Вспомогательные параметры для тестирования',
    defaultValue: { summary: 'Не требуется' },
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
    category: 'Входящие параметры',
    subcategory: 'Контентное наполнение',
    defaultValue: { summary: convertToString(defaultValue) },
  },
})

export const getComponentStateTable = (defaultValue?: TDefaultValueType): InputType => ({
  table: {
    category: 'Входящие параметры',
    subcategory: 'Состояние',
    defaultValue: { summary: convertToString(defaultValue) },
  },
})

export const getComponentEmitsTable = (defaultValue?: TDefaultValueType): InputType => ({
  table: {
    category: 'Генерируемые события',
    defaultValue: { summary: convertToString(defaultValue) },
  },
})

export const getComponentSlotsTable = (slotName: string, defaultValue: TDefaultValueType): InputType => ({
  table: {
    category: 'Слоты',
    type: { summary: `slot: #${slotName}` },
    defaultValue: { summary: convertToString(defaultValue) },
  },
})

export const getComponentColorThemeTable = (defaultValue?: TDefaultValueType): InputType => ({
  table: {
    category: 'Цветовая палитра',
    defaultValue: { summary: convertToString(defaultValue) },
  },
})
