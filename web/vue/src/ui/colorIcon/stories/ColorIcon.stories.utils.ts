/**
 * ## Story helpers for the Vue ColorIcon
 *
 * Helper functions, constants and types used to validate the stories.
 * Kept in a separate file so they do not show up in the Storybook autodocs.
 */

import { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import { COLOR_ICON_STORIES_CONFIG, createColorIconDescription, defaultIcon } from '~core/ui/colorIcon/stories/ColorIcon.stories.utils'

// Re-export the shared story configuration from core
export { COLOR_ICON_STORIES_CONFIG, defaultIcon }

/**
 * Builds the story parameters for the Vue ColorIcon
 */
export const createVueColorIconParameters = (frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createColorIconDescription(EFrameworkName.VUE, frameworkSpecifics) } },
})
