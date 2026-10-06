/**
 * ## Служебные утилиты для историй BrandButton
 *
 * Этот файл содержит все вспомогательные функции, константы и типы для валидации историй.
 * Вынесено в отдельный файл, чтобы не засорять Storybook автодоки.
 */

import type { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import type { IStoryConfig } from '~web/shared/.storybook/types'
import { EYSizes } from '~web/shared/types/global'
import { EYCoreBrandButtonVariant } from '../models/types/external'

// =============================================================================
// КОНФИГУРАЦИЯ ИСТОРИЙ
// =============================================================================

/**
 * Конфигурация всех доступных историй
 * Используется для обеспечения единообразия между фреймворками
 */
export const BRAND_BUTTON_STORIES_CONFIG: Record<string, IStoryConfig> = {
  Playground: { parameters: { docs: { title: 'Playground', description: { story: 'Try the brand button interactively.\nUse the controls to explore its properties and behavior.' } } } },
  Variants: { parameters: { docs: { title: 'Brand variants', description: { story: 'All available brand button variants.' } } } },
  Sizes: { parameters: { docs: { title: 'Button sizes', description: { story: 'All available brand button sizes.' } } } },
  States: { parameters: { docs: { title: 'Button states', description: { story: 'Default, disabled, and loading states.' } } } },
} as const

/**
 * Создает JSDoc описание для BrandButton с указанием фреймворка
 */
export const createBrandButtonDescription = (frameworkName: EFrameworkName, frameworkSpecifics = '') => `
## ${frameworkName} BrandButton

A branded button for signing in or interacting with third-party services. Built on SimpleButton with the service icon and brand colors.

### Features:
- Brand variants: WhatsApp
- 3 sizes: small, medium, large
- Automatic icon sizing: 18px for small, 20px for medium, and 22px for large buttons
- States: default, disabled, and loading
- Automatic brand colors and icons
- Supports all SimpleButton properties

### Differences from SimpleButton:
- Requires the \`variant\` property to select the brand
- Applies brand colors and icons automatically
- Designed for signing in through third-party services
- The brand icon is displayed automatically

${frameworkSpecifics}

`

/**
 * Создает параметры для истории BrandButton
 */
export const createBrandButtonParameters = (frameworkName: EFrameworkName, frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createBrandButtonDescription(frameworkName, frameworkSpecifics) } },
})

export const brandButtonSizes = [EYSizes.SMALL, EYSizes.MEDIUM, EYSizes.LARGE] as const

export const brandButtonVariants = Object.values(EYCoreBrandButtonVariant)
