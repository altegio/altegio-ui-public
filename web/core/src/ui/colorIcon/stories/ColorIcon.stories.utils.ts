import { EYCoreColorIconVariant, EYCoreColorIconSize } from '~core/ui/colorIcon/models/types'
import { yRocket } from '~shared/icons'

/**
 * ## Служебные утилиты для историй ColorIcon
 *
 * Этот файл содержит все вспомогательные функции, константы и типы для валидации историй.
 * Вынесено в отдельный файл, чтобы не засорять Storybook автодоки.
 */

import type { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import type { IStoryConfig } from '~web/shared/.storybook/types'

// =============================================================================
// КОНФИГУРАЦИЯ ИСТОРИЙ
// =============================================================================

/**
 * Конфигурация всех доступных историй
 * Используется для обеспечения единообразия между фреймворками
 */
export const COLOR_ICON_STORIES_CONFIG: Record<string, IStoryConfig> = {
  Playground: {
    parameters: {
      docs: {
        title: 'Playground',
        description: {
          story:
            'Try ColorIcon interactively.\nUse the controls to explore its properties and behavior.',
        },
      },
    },
  },
  IconVariety: { parameters: { docs: { title: 'Icon options', description: { story: 'Different icon options.' } } } },
  Sizes: { parameters: { docs: { title: 'Icon sizes', description: { story: 'All available sizes.' } } } },
  Variants: {
    parameters: {
      docs: {
        title: 'Icon color variants',
        description: { story: 'All available color variants' },
      },
    },
  },
  States: {
    parameters: {
      docs: {
        title: 'Icon states',
        description: { story: 'Default and disabled states' },
      },
    },
  },

} as const

/**
 * Вспомогательные переменные для JSDoc описания
 */
const sizes = Object.values(EYCoreColorIconSize)
const variants = Object.values(EYCoreColorIconVariant)

/**
 * Создает JSDoc описание для ColorIcon с указанием фреймворка
 */
export const createColorIconDescription = (frameworkName: EFrameworkName, frameworkSpecifics = '') => `
## ${frameworkName} ColorIcon

An icon displayed inside a circle.
Supports different icons, colors, sizes, and a disabled state.

### Features:
- any icon
- ${sizes.length} sizes: ${sizes.join(', ')}
- ${variants.length} color variants: ${variants.join(', ')}
- States: default and disabled

${frameworkSpecifics}

`

/**
 * Создает параметры для истории ColorIcon
 */
export const createColorIconParameters = (frameworkName: EFrameworkName, frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createColorIconDescription(frameworkName, frameworkSpecifics) } },
})

export const defaultIcon = yRocket
