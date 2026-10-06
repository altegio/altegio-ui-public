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
  Playground: { parameters: { docs: { title: 'Playground', description: { story: 'Интерактивная площадка для экспериментов с компонентом.\nИспользуйте контролы для изменения свойств и изучения поведения брендированной кнопки.' } } } },
  Variants: { parameters: { docs: { title: 'Брендовые варианты', description: { story: 'Демонстрация всех доступных брендовых вариантов кнопки.' } } } },
  Sizes: { parameters: { docs: { title: 'Размеры кнопок', description: { story: 'Демонстрация всех доступных размеров брендированных кнопок.' } } } },
  States: { parameters: { docs: { title: 'Состояния кнопок', description: { story: 'Демонстрация различных состояний: обычное, заблокированное, загрузка.' } } } },
} as const

/**
 * Создает JSDoc описание для BrandButton с указанием фреймворка
 */
export const createBrandButtonDescription = (frameworkName: EFrameworkName, frameworkSpecifics = '') => `
## ${frameworkName} BrandButton

Компонент брендированной кнопки для авторизации или действий через сторонние сервисы. Основан на SimpleButton, но стилизуется иконкой и цветами бренда.

### Основные возможности:
- Брендовые варианты: WhatsApp
- 3 размера: small, medium, large  
- Автоматическое определение размера иконки в зависимости от размера кнопки (18px для small, 20px для medium, 22px для large)
- Состояния: обычное, заблокированное, загрузка
- Автоматическая стилизация цветов и иконок бренда
- Поддержка всех пропсов SimpleButton

### Отличия от SimpleButton:
- Принимает обязательное свойство \`variant\` для выбора бренда
- Автоматически применяет цвета и иконки бренда
- Оптимизирован для авторизации через сторонние сервисы
- Иконка бренда отображается автоматически

${frameworkSpecifics}

Ссылка на [Figma](https://www.figma.com/design/0eI55yqAEchWUmRQCIQVYu/YC-Web-%7C-Components?node-id=7254-10990&m=dev)`

/**
 * Создает параметры для истории BrandButton
 */
export const createBrandButtonParameters = (frameworkName: EFrameworkName, frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createBrandButtonDescription(frameworkName, frameworkSpecifics) } },
})

export const brandButtonSizes = [EYSizes.SMALL, EYSizes.MEDIUM, EYSizes.LARGE] as const

export const brandButtonVariants = Object.values(EYCoreBrandButtonVariant)
