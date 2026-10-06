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
  Playground: { parameters: { docs: { title: 'Playground', description: { story: 'Интерактивная площадка для экспериментов с компонентом.\nИспользуйте контролы для изменения свойств и изучения поведения кнопки.' } } } },
  Variants: { parameters: { docs: { title: 'Варианты кнопок', description: { story: 'Демонстрация всех доступных вариантов стилизации.' } } } },
  Sizes: { parameters: { docs: { title: 'Размеры кнопок', description: { story: 'Демонстрация всех доступных размеров.' } } } },
  States: { parameters: { docs: { title: 'Состояния кнопок', description: { story: 'Демонстрация различных состояний: обычное, заблокированное, загрузка.' } } } },
  PseudoStates: { parameters: { docs: { title: 'Псевдо-состояния', description: { story: 'Демонстрация псевдо-состояний с помощью CSS классов.\nНаведите курсор на кнопки, чтобы увидеть hover эффект.' } } } },
  FullWidth: { parameters: { docs: { title: 'Полная ширина', description: { story: 'Демонстрация кнопки, растянутой на всю ширину контейнера.' } } }, args: { fullWidth: true } },
  LinkMode: { parameters: { docs: { title: 'Режим ссылки', description: { story: 'Кнопка может работать как ссылка при указании href.' } } } },
  ComplexDemo: { parameters: { docs: { title: 'Комплексная демонстрация', description: { story: 'Демонстрация всех вариантов и размеров в одной таблице.' } } } },
} as const

/**
 * Создает JSDoc описание для SimpleButton с указанием фреймворка
 */
export const createSimpleButtonDescription = (frameworkName: EFrameworkName, frameworkSpecifics = '') => `
## ${frameworkName} SimpleButton

Базовый компонент кнопки, который может быть как обычной кнопкой, так и ссылкой.
Поддерживает различные варианты отображения, размеры, состояния загрузки и блокировки.

### Основные возможности:
- 4 варианта стилизации: primary, outline, outline-filled, text
- 3 размера: small, medium, large
- Состояния: обычное, заблокированное, загрузка
- Режим ссылки с поддержкой target
- Полная ширина (fullWidth) - растягивает кнопку на всю ширину контейнера
- Гибкая настройка через hostStyles
- Default слот для размещения любого контента: текста, иконок, их комбинаций

### Слоты:
- **default** - основной слот для контента кнопки (текст, иконки, другие элементы)

${frameworkSpecifics}

Ссылка на [Figma](https://www.figma.com/design/0eI55yqAEchWUmRQCIQVYu/YC-Web-%7C-Components?node-id=628-18303&p=f&m=dev)`

/**
 * Создает параметры для истории SimpleButton
 */
export const createSimpleButtonParameters = (frameworkName: EFrameworkName, frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createSimpleButtonDescription(frameworkName, frameworkSpecifics) } },
})
