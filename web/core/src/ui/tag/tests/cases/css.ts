import { COLORS, EXTENDED_COLORS } from '~root/tokens'

// Маппинг CSS-переменных хоста к корневым CSS-переменным
export const CSSVariablesHostToRootCases = [
  // Общие
  { host: '--y-core-tag-font-family', root: '--y-core-font-family' },
  { host: '--y-core-tag-border-radius', root: '--y-core-size-radius-x' },

  // Размеры
  { host: '--y-core-tag-padding-small-x', root: '--y-core-size-spacing-x' },
  { host: '--y-core-tag-padding-small-y', root: '--y-core-size-spacing-0-5-x' },
  { host: '--y-core-tag-padding-medium-x', root: '--y-core-size-spacing-2-x' },
  { host: '--y-core-tag-padding-medium-y', root: '--y-core-size-spacing-x' },
  { host: '--y-core-tag-font-size-small', root: '--y-core-typography-annotation-a-3-medium-font-size' },
  { host: '--y-core-tag-font-size-small-line-height', root: '--y-core-typography-annotation-a-3-medium-line-height' },
  { host: '--y-core-tag-font-size-small-font-weight', root: '--y-core-typography-annotation-a-3-medium-font-weight' },
  { host: '--y-core-tag-font-size-medium', root: '--y-core-typography-annotation-a-2-medium-font-size' },
  { host: '--y-core-tag-font-size-medium-line-height', root: '--y-core-typography-annotation-a-2-medium-line-height' },
  { host: '--y-core-tag-font-size-medium-font-weight', root: '--y-core-typography-annotation-a-2-medium-font-weight' },
  { host: '--y-core-tag-padding-large-x', root: '--y-core-size-spacing-2-x' },
  { host: '--y-core-tag-padding-large-y', root: '--y-core-size-spacing-1-5-x' },
  { host: '--y-core-tag-font-size-large', root: '--y-core-typography-paragraph-p-2-medium-font-size' },
  { host: '--y-core-tag-font-size-large-line-height', root: '--y-core-typography-paragraph-p-2-medium-line-height' },
  { host: '--y-core-tag-font-size-large-font-weight', root: '--y-core-typography-paragraph-p-2-medium-font-weight' },

  // Цвета текста
  { host: '--y-core-tag-color-accent', root: '--y-core-color-text-primary' },
  { host: '--y-core-tag-color-accent-disabled', root: '--y-core-color-text-tertiary' },
  { host: '--y-core-tag-color-muted', root: '--y-core-color-text-primary' },
  { host: '--y-core-tag-color-muted-disabled', root: '--y-core-color-text-tertiary' },
  { host: '--y-core-tag-color-danger', root: '--y-core-color-calm-text-red' },
  { host: '--y-core-tag-color-danger-disabled', root: '--y-core-color-calm-text-red-low' },
  { host: '--y-core-tag-color-success', root: '--y-core-color-calm-text-green' },
  { host: '--y-core-tag-color-success-disabled', root: '--y-core-color-calm-text-green-low' },
  { host: '--y-core-tag-color-warning', root: '--y-core-color-calm-text-orange' },
  { host: '--y-core-tag-color-warning-disabled', root: '--y-core-color-calm-text-orange-low' },
  { host: '--y-core-tag-color-information', root: '--y-core-color-calm-text-blue' },
  { host: '--y-core-tag-color-information-disabled', root: '--y-core-color-calm-text-blue-low' },
  { host: '--y-core-tag-color-discovery', root: '--y-core-color-calm-text-purple' },
  { host: '--y-core-tag-color-discovery-disabled', root: '--y-core-color-calm-text-purple-low' },

  // Цвета фона
  { host: '--y-core-tag-bg-accent', root: '--y-core-color-calm-surface-yellow-low' },
  { host: '--y-core-tag-bg-muted', root: '--y-core-color-surface-tertiary' },
  { host: '--y-core-tag-bg-danger', root: '--y-core-color-calm-surface-red-low' },
  { host: '--y-core-tag-bg-success', root: '--y-core-color-calm-surface-green-low' },
  { host: '--y-core-tag-bg-warning', root: '--y-core-color-calm-surface-orange-low' },
  { host: '--y-core-tag-bg-information', root: '--y-core-color-calm-surface-blue-low' },
  { host: '--y-core-tag-bg-discovery', root: '--y-core-color-calm-surface-purple-low' },

  // Отступы
  { host: '--y-core-tag-gap', root: '--y-core-size-spacing-x' },
]

// Маппинг CSS-переменных хоста к ожидаемым значениям
export const CSSVariablesHostToValueCases = [
  // Цвета текста
  { host: '--y-core-tag-color-accent', value: COLORS.text_primary.cssValue },
  { host: '--y-core-tag-color-accent-disabled', value: COLORS.text_tertiary.cssValue },
  { host: '--y-core-tag-color-muted', value: COLORS.text_primary.cssValue },
  { host: '--y-core-tag-color-muted-disabled', value: COLORS.text_tertiary.cssValue },
  { host: '--y-core-tag-color-danger', value: EXTENDED_COLORS.calm_text_red.cssValue },
  { host: '--y-core-tag-color-danger-disabled', value: EXTENDED_COLORS.calm_text_red_low.cssValue },
  { host: '--y-core-tag-color-success', value: EXTENDED_COLORS.calm_text_green.cssValue },
  { host: '--y-core-tag-color-success-disabled', value: EXTENDED_COLORS.calm_text_green_low.cssValue },
  { host: '--y-core-tag-color-warning', value: EXTENDED_COLORS.calm_text_orange.cssValue },
  { host: '--y-core-tag-color-warning-disabled', value: EXTENDED_COLORS.calm_text_orange_low.cssValue },
  { host: '--y-core-tag-color-information', value: EXTENDED_COLORS.calm_text_blue.cssValue },
  { host: '--y-core-tag-color-information-disabled', value: EXTENDED_COLORS.calm_text_blue_low.cssValue },
  { host: '--y-core-tag-color-discovery', value: EXTENDED_COLORS.calm_text_purple.cssValue },
  { host: '--y-core-tag-color-discovery-disabled', value: EXTENDED_COLORS.calm_text_purple_low.cssValue },

  // Цвета фона
  { host: '--y-core-tag-bg-accent', value: EXTENDED_COLORS.calm_surface_yellow_low.cssValue },
  { host: '--y-core-tag-bg-muted', value: COLORS.surface_tertiary.cssValue },
  { host: '--y-core-tag-bg-danger', value: EXTENDED_COLORS.calm_surface_red_low.cssValue },
  { host: '--y-core-tag-bg-success', value: EXTENDED_COLORS.calm_surface_green_low.cssValue },
  { host: '--y-core-tag-bg-warning', value: EXTENDED_COLORS.calm_surface_orange_low.cssValue },
  { host: '--y-core-tag-bg-information', value: EXTENDED_COLORS.calm_surface_blue_low.cssValue },
  { host: '--y-core-tag-bg-discovery', value: EXTENDED_COLORS.calm_surface_purple_low.cssValue },
]
