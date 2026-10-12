/**
 * ## Служебные утилиты для историй Vue ColorIcon
 *
 * Этот файл содержит все вспомогательные функции, константы и типы для валидации историй.
 * Вынесено в отдельный файл, чтобы не засорять Storybook автодоки.
 */

import { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import { COLOR_ICON_STORIES_CONFIG, createColorIconDescription, defaultIcon } from '~core/ui/colorIcon/stories/ColorIcon.stories.utils'

// Реэкспортируем конфигурацию историй из Core
export { COLOR_ICON_STORIES_CONFIG, defaultIcon }

/**
 * Создает параметры для истории Vue IconButton
 */
export const createVueColorIconParameters = (frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createColorIconDescription(EFrameworkName.VUE, frameworkSpecifics) } },
})
