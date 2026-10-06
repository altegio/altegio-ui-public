/**
 * ## Служебные утилиты для историй ButtonDropdown
 *
 * Этот файл содержит все вспомогательные функции, константы и типы для валидации историй.
 * Вынесено в отдельный файл, чтобы не засорять Storybook автодоки.
 */

import type { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import type { IStoryConfig } from '~web/shared/.storybook/types'

import yCoreDropdownListStoryMeta from '~core/ui/dropdownList/stories/DropdownList.stories'
import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { ItemClickEvent, VisibleEvent } from '~core/ui/buttonDropdown/models/types/events'

export type TButtonDropdownStoryEmits = TEventsStoryArgs<{
  ItemClickEvent: typeof ItemClickEvent
  VisibleEvent: typeof VisibleEvent
}>

const DEFAULT_ITEMS = yCoreDropdownListStoryMeta.args?.items?.slice(0, 2) ?? []

// =============================================================================
// КОНФИГУРАЦИЯ ИСТОРИЙ
// =============================================================================

/**
 * Конфигурация всех доступных историй
 * Используется для обеспечения единообразия между фреймворками
 */
export const BUTTON_DROPDOWN_STORIES_CONFIG: Record<string, IStoryConfig> = {
  Playground: {
    parameters: {
      docs: {
        title: 'Playground',
        description: {
          story:
            'Try the dropdown button interactively.\nUse the controls to explore its properties and behavior.',
        },
      },
    },
  },
  Variants: {
    parameters: {
      docs: {
        title: 'Dropdown variants',
        description: { story: 'All available styling variants.' },
      },
    },
    args: { items: [...DEFAULT_ITEMS] },
  },
  Sizes: {
    parameters: { docs: { title: 'Button sizes', description: { story: 'All available sizes.' } } },
    args: { items: [...DEFAULT_ITEMS] },
  },
  States: {
    parameters: {
      docs: {
        title: 'Button states',
        description: { story: 'Default, disabled, loading, and open states.' },
      },
    },
    args: { items: DEFAULT_ITEMS },
  },
  IconType: {
    parameters: { docs: { title: 'Icon placement', description: { story: 'Icon placement options.' } } },
    args: { items: DEFAULT_ITEMS },
  },
  FullWidth: {
    parameters: { docs: { title: 'Full width', description: { story: 'A button that fills its container.' } } },
    args: { items: DEFAULT_ITEMS },
  },
} as const

/**
 * Создает JSDoc описание для ButtonDropdown с указанием фреймворка
 */
export const createButtonDropdownDescription = (frameworkName: EFrameworkName, frameworkSpecifics = '') => `
## ${frameworkName} ButtonDropdown

A button that opens a dropdown.
Supports multiple variants and sizes, loading and disabled states, and automatic closing.

### Features:
- 4 styling variants: primary, outline, text, outline-filled
- 3 sizes: small, medium, large
- States: default, disabled, loading, and open
- Full width (fullWidth): fills the container width
- Icon placement: left or right
- Automatic closing after clicking a dropdown item

### Slots:
- **activator** - slot for content that opens the dropdown when clicked.
- **content** - slot for content displayed inside the open dropdown.

### Events:
- **onItemClick** - dropdown item click event
- **onVisible** - dropdown visibility event

${frameworkSpecifics}

`

/**
 * Создает параметры для истории ButtonDropdown
 */
export const createButtonDropdownParameters = (frameworkName: EFrameworkName, frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createButtonDropdownDescription(frameworkName, frameworkSpecifics) } },
})
