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
            'Интерактивная площадка для экспериментов с компонентом.\nИспользуйте контролы для изменения свойств и изучения поведения дроп-даун кнопки.',
        },
      },
    },
  },
  Variants: {
    parameters: {
      docs: {
        title: 'Варианты дроп-дауна',
        description: { story: 'Демонстрация всех доступных вариантов стилизации.' },
      },
    },
    args: { items: [...DEFAULT_ITEMS] },
  },
  Sizes: {
    parameters: { docs: { title: 'Размеры кнопок', description: { story: 'Демонстрация всех доступных размеров.' } } },
    args: { items: [...DEFAULT_ITEMS] },
  },
  States: {
    parameters: {
      docs: {
        title: 'Состояния кнопок',
        description: { story: 'Демонстрация различных состояний: обычное, заблокированное, загрузка, открытое.' },
      },
    },
    args: { items: DEFAULT_ITEMS },
  },
  IconType: {
    parameters: { docs: { title: 'Тип иконки', description: { story: 'Демонстрация типа иконки.' } } },
    args: { items: DEFAULT_ITEMS },
  },
  FullWidth: {
    parameters: { docs: { title: 'Полная ширина', description: { story: 'Демонстрация растянутой кнопки.' } } },
    args: { items: DEFAULT_ITEMS },
  },
} as const

/**
 * Создает JSDoc описание для ButtonDropdown с указанием фреймворка
 */
export const createButtonDropdownDescription = (frameworkName: EFrameworkName, frameworkSpecifics = '') => `
## ${frameworkName} ButtonDropdown

Базовый компонент дроп-даун кнопки.
Поддерживает различные варианты отображения, размеры, состояния загрузки, блокировки, автозакрытия.

### Основные возможности:
- 4 варианта стилизации: primary, outline, text, outline-filled
- 3 размера: small, medium, large
- Состояния: обычное, заблокированное, загрузка, открытое
- Полная ширина (fullWidth) - растягивает кнопку на всю ширину контейнера
- Тип иконки: левая/правая
- Автозакрытие: возможность автозакрытия после клика на элемент дроп-дауна

### Слоты:
- **activator** - слот для размещения любого контента, по клику на который активируется откытие дроп-дуана.
- **content** - слот для размещения любого контента, который отображается в открытом дроп-дауне.

### События:
- **onItemClick** - событие клика по элементу дроп-дауна
- **onVisible** - событие показа дроп-дауна

${frameworkSpecifics}

Ссылка на [Figma](https://www.figma.com/design/0eI55yqAEchWUmRQCIQVYu/YC-Web-%7C-Components--IN-PROGRESS-?node-id=4140-8661&t=Pqc3nun6vr8LqliW-1)`

/**
 * Создает параметры для истории ButtonDropdown
 */
export const createButtonDropdownParameters = (frameworkName: EFrameworkName, frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createButtonDropdownDescription(frameworkName, frameworkSpecifics) } },
})
