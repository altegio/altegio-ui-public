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
            'Интерактивная площадка для экспериментов с компонентом.\nИспользуйте контролы для изменения свойств и изучения поведения ColorIcon.',
        },
      },
    },
  },
  IconVariety: { parameters: { docs: { title: 'Разнообразие иконок', description: { story: 'Демонстрация различных иконок.' } } } },
  Sizes: { parameters: { docs: { title: 'Размеры иконки', description: { story: 'Демонстрация всех доступных размеров.' } } } },
  Variants: {
    parameters: {
      docs: {
        title: 'Варианты цветов иконки',
        description: { story: 'Демонстрация всех доступных вариантов цветов' },
      },
    },
  },
  States: {
    parameters: {
      docs: {
        title: 'Состояния иконки',
        description: { story: 'Демонстрация различных состояний: обычное, заблокированное' },
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

Компонент с иконкой, заключенной в круг.
Поддерживает различные варианты иконок, цветов, размеров, состояние блокировки.

### Основные возможности:
- любой вариант иконки
- ${sizes.length} размера: ${sizes.join(', ')}
- ${variants.length} варианта цвета: ${variants.join(', ')}
- Состояния: обычное, заблокированное

${frameworkSpecifics}

Ссылка на [Figma](https://www.figma.com/design/0eI55yqAEchWUmRQCIQVYu/YC-Web-%7C-Components?node-id=3783-9559&m=dev)`

/**
 * Создает параметры для истории ColorIcon
 */
export const createColorIconParameters = (frameworkName: EFrameworkName, frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createColorIconDescription(frameworkName, frameworkSpecifics) } },
})

export const defaultIcon = yRocket
