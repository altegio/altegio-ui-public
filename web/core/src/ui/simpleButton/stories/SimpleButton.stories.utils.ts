/**
 * ## Служебные утилиты для историй SimpleButton
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
export const SIMPLE_BUTTON_STORIES_CONFIG: Record<string, IStoryConfig> = {
  Playground: { parameters: { docs: { title: 'Playground', description: { story: 'Try the button interactively.\nUse the controls to explore its properties and behavior.' } } } },
  Variants: { parameters: { docs: { title: 'Button variants', description: { story: 'All available styling variants.' } } } },
  Sizes: { parameters: { docs: { title: 'Button sizes', description: { story: 'All available sizes.' } } } },
  States: { parameters: { docs: { title: 'Button states', description: { story: 'Default, disabled, and loading states.' } } } },
  PseudoStates: { parameters: { docs: { title: 'Pseudo states', description: { story: 'Pseudo states applied through CSS classes.\nHover over the buttons to see the effect.' } } } },
  FullWidth: { parameters: { docs: { title: 'Full width', description: { story: 'A button that fills its container.' } } }, args: { fullWidth: true } },
  LinkMode: { parameters: { docs: { title: 'Link mode', description: { story: 'The button can act as a link when href is set.' } } } },
  ComplexDemo: { parameters: { docs: { title: 'Combined example', description: { story: 'All variants and sizes in a single table.' } } } },
} as const

/**
 * Создает JSDoc описание для SimpleButton с указанием фреймворка
 */
export const createSimpleButtonDescription = (frameworkName: EFrameworkName, frameworkSpecifics = '') => `
## ${frameworkName} SimpleButton

A button that can also act as a link.
Supports multiple variants and sizes, and loading and disabled states.

### Features:
- 4 styling variants: primary, outline, outline-filled, text
- 3 sizes: small, medium, large
- States: default, disabled, and loading
- Link mode with target support
- Full width (fullWidth): fills the container width
- Customizable through hostStyles
- Default slot for content such as text, icons, or both

### Slots:
- **default** - main slot for button content (text, icons, and other elements)

${frameworkSpecifics}

`

/**
 * Создает параметры для истории SimpleButton
 */
export const createSimpleButtonParameters = (frameworkName: EFrameworkName, frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createSimpleButtonDescription(frameworkName, frameworkSpecifics) } },
})
