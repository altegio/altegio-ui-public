/**
 * ## Служебные утилиты для историй Angular BrandButton
 *
 * Этот файл содержит все вспомогательные функции, константы и типы для валидации историй.
 * Вынесено в отдельный файл, чтобы не засорять Storybook автодоки.
 */

import { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import {
  BRAND_BUTTON_STORIES_CONFIG,
  createBrandButtonDescription,
  brandButtonSizes,
  brandButtonVariants,
} from '~core/ui/brandButton/stories/BrandButton.stories.utils'

// Реэкспортируем конфигурацию историй из Core
export { BRAND_BUTTON_STORIES_CONFIG, brandButtonSizes, brandButtonVariants }

/**
 * Создает параметры для истории Angular BrandButton
 */
export const createAngularBrandButtonParameters = (frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createBrandButtonDescription(EFrameworkName.ANGULAR, frameworkSpecifics) } },
})
