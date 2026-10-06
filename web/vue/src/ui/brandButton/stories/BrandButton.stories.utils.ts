/**
 * ## Служебные утилиты для историй Vue BrandButton
 *
 * Этот файл содержит все вспомогательные функции, константы и типы для валидации историй.
 */

import { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import {
  BRAND_BUTTON_STORIES_CONFIG,
  createBrandButtonDescription,
  brandButtonVariants,
  brandButtonSizes,
} from '~core/ui/brandButton/stories/BrandButton.stories.utils'

// Реэкспортируем конфигурацию историй из Core
export { BRAND_BUTTON_STORIES_CONFIG, brandButtonVariants, brandButtonSizes }

/**
 * Создает параметры для истории Vue BrandButton
 */
export const createVueBrandButtonParameters = (frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createBrandButtonDescription(EFrameworkName.VUE, frameworkSpecifics) } },
})
