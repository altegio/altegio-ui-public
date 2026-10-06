/**
 * ## Служебные утилиты для историй IconButton
 *
 * Этот файл содержит все вспомогательные функции, константы и типы для валидации историй.
 * Вынесено в отдельный файл, чтобы не засорять Storybook автодоки.
 */

import type { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import type { IStoryConfig } from '~web/shared/.storybook/types'
import { yCopy, yInfo, yMagic, yRocket, ySearch } from '~web/shared/icons'
import { EYSizes } from '~web/shared/types/global'

// =============================================================================
// КОНФИГУРАЦИЯ ИСТОРИЙ
// =============================================================================

/**
 * Конфигурация всех доступных историй
 * Используется для обеспечения единообразия между фреймворками
 */
export const ICON_BUTTON_STORIES_CONFIG: Record<string, IStoryConfig> = {
  Playground: { parameters: { docs: { title: 'Playground', description: { story: 'Интерактивная площадка для экспериментов с компонентом.\nИспользуйте контролы для изменения свойств и изучения поведения кнопки с иконкой.' } } } },
  Variants: { parameters: { docs: { title: 'Варианты кнопок', description: { story: 'Демонстрация всех доступных вариантов стилизации для кнопок с иконками.' } } } },
  Sizes: { parameters: { docs: { title: 'Размеры кнопок', description: { story: 'Демонстрация всех доступных размеров кнопок с иконками.' } } } },
  States: { parameters: { docs: { title: 'Состояния кнопок', description: { story: 'Демонстрация различных состояний: обычное, заблокированное, загрузка.' } } } },
  PseudoStates: { parameters: { docs: { title: 'Псевдо-состояния', description: { story: 'Демонстрация псевдо-состояний с помощью CSS классов.\nНаведите курсор на кнопки, чтобы увидеть hover эффект.' } } } },
  FullWidth: { parameters: { docs: { title: 'Полная ширина', description: { story: 'Демонстрация кнопки с иконкой, растянутой на всю ширину контейнера.' } } }, args: { fullWidth: true } },
  LinkMode: { parameters: { docs: { title: 'Режим ссылки', description: { story: 'Кнопка с иконкой может работать как ссылка при указании href.' } } } },
  IconVariety: { parameters: { docs: { title: 'Разнообразие иконок', description: { story: 'Демонстрация различных иконок в кнопках.' } } } },
  ComplexDemo: { parameters: { docs: { title: 'Комплексная демонстрация', description: { story: 'Демонстрация всех вариантов и размеров в одной таблице.' } } } },
} as const

/**
 * Создает JSDoc описание для IconButton с указанием фреймворка
 */
export const createIconButtonDescription = (frameworkName: EFrameworkName, frameworkSpecifics = '') => `
## ${frameworkName} IconButton

Компонент кнопки с иконкой, основанный на SimpleButton. Предназначен для действий, где иконка может заменить текст или дополнить его. Может быть как обычной кнопкой, так и ссылкой.

### Основные возможности:
- 4 варианта стилизации: primary, outline, outline-filled, text
- 3 размера: small, medium, large
- Автоматическое определение размера иконки в зависимости от размера кнопки (16px для small/medium, 24px для large)
- Состояния: обычное, заблокированное, загрузка
- Режим ссылки с поддержкой target
- Полная ширина (fullWidth) - растягивает кнопку на всю ширину контейнера
- Поддержка всех иконок из дизайн-системы

### Отличия от SimpleButton:
- Принимает обязательное свойство \`icon\` вместо слота
- Автоматически управляет размером иконки
- Оптимизирован для компактного отображения действий

${frameworkSpecifics}

Ссылка на [Figma](https://www.figma.com/design/0eI55yqAEchWUmRQCIQVYu/YC-DS-%7C-Testing?node-id=755-926&node-type=canvas&t=9mNzpOaA0dv7yCWO-0)`

/**
 * Создает параметры для истории IconButton
 */
export const createIconButtonParameters = (frameworkName: EFrameworkName, frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createIconButtonDescription(frameworkName, frameworkSpecifics) } },
})

export const iconButtonSizes = [EYSizes.SMALL, EYSizes.MEDIUM, EYSizes.LARGE] as const

export const iconButtonIcons = {
  search: ySearch,
  rocket: yRocket,
  magic: yMagic,
  info: yInfo,
  copy: yCopy,
}
