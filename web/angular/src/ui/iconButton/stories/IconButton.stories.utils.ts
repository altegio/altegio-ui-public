/**
 * ## Служебные утилиты для историй Angular IconButton
 *
 * Этот файл содержит все вспомогательные функции, константы и типы для валидации историй.
 * Вынесено в отдельный файл, чтобы не засорять Storybook автодоки.
 */

import { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import { ICON_BUTTON_STORIES_CONFIG, createIconButtonDescription, iconButtonSizes, iconButtonIcons } from '~core/ui/iconButton/stories/IconButton.stories.utils'

// Реэкспортируем конфигурацию историй из Core
export { ICON_BUTTON_STORIES_CONFIG, iconButtonSizes, iconButtonIcons }

/**
 * Создает параметры для истории Angular IconButton
 */
export const createAngularIconButtonParameters = (frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createIconButtonDescription(EFrameworkName.ANGULAR, frameworkSpecifics) } },
})
