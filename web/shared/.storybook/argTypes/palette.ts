import type { InputType } from '@storybook/csf'
import { getComponentColorThemeTable } from '../tables'


export const paletteProps: IPaletteProps = {
  accentColor: '#ffcb00',
  useDarkTheme: false,
}

const accentColor: InputType = {
  type: 'string',
  description: 'Основной цвет в hex формате',
  ...getComponentColorThemeTable(paletteProps.accentColor),
}

const useDarkTheme: InputType = {
  type: 'boolean',
  description: 'Включить темную тему',
  ...getComponentColorThemeTable(paletteProps.useDarkTheme),
}

export interface IPaletteProps {
  accentColor: string
  useDarkTheme: boolean
}

export const paletteArgTypes = {
  accentColor,
  useDarkTheme,
}

