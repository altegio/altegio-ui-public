import type { HslaColor } from 'colord'

export enum EColorType {

  /** Яркий */
  bright = 1,

  /** Светлый */
  light = 2,

  /** Бледный */
  lighter = 3,

  /** Темный */
  dark = 4,
}

export enum EColorTheme {
  light = 1,
  dark = 2,
}

export const colorTokens = [
  'text-accent',
  'text-on-accent',
  'text-primary',
  'text-secondary',
  'text-tertiary',
  'text-negative',
  'icon-accent',
  'icon-on-accent',
  'icon-primary',
  'icon-secondary',
  'icon-tertiary',
  'icon-negative',
  'stroke-accent',
  'stroke-primary',
  'stroke-primary-high',
  'stroke-secondary-low',
  'stroke-secondary',
  'stroke-negative',
  'surface-accent-low',
  'surface-accent',
  'surface-accent-high',
  'surface-primary',
  'surface-primary-high',
  'surface-secondary',
  'surface-secondary-fill',
  'surface-tertiary',
  'surface-tertiary-high',
  'surface-negative',
  'calm-text-purple',
  'calm-text-blue',
  'calm-text-orange',
  'calm-text-green',
  'calm-text-red',
  'calm-icon-purple',
  'calm-icon-blue',
  'calm-icon-orange',
  'calm-icon-green',
  'calm-icon-red',
  'calm-icon-yellow',
  'calm-surface-purple-low',
  'calm-surface-blue-low',
  'calm-surface-blue',
  'calm-surface-orange-low',
  'calm-surface-green-low',
  'calm-surface-red-low',
  'other-contrast',
  'other-link',
  'other-base',
  'other-overlay-60',
  'static-white',
  'shadow-accent',
] as const

export type TColorToken = typeof colorTokens[number]

export const rawColorTheme = [
  'lightMode',
  'darkMode',
] as const

export const rawColorTypes = [
  'light',
  'lighter',
  'bright',
  'dark',
] as const

export type TColorThemeRaw = typeof rawColorTheme[number]
export type TColorTypeRaw = typeof rawColorTypes[number]
export type TColorTokenTransformersRaw<T = string> = Record<TColorToken, Record<TColorThemeRaw, Record<TColorTypeRaw, T>>>
export type TColorTokenTransformers = Record<string, Record<EColorTheme, Record<EColorType, (accentColor: HslaColor) => HslaColor>>>

export class InputTransformersEvent extends CustomEvent<TColorTokenTransformersRaw> {}
