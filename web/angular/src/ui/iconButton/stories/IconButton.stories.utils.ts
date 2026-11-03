/**
 * ## Story helpers for the Angular IconButton
 *
 * Helper functions, constants and types used to validate the stories.
 * Kept in a separate file so they do not show up in the Storybook autodocs.
 */

import { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import { ICON_BUTTON_STORIES_CONFIG, createIconButtonDescription, iconButtonSizes, iconButtonIcons } from '~core/ui/iconButton/stories/IconButton.stories.utils'

// Re-export the shared story configuration from core
export { ICON_BUTTON_STORIES_CONFIG, iconButtonSizes, iconButtonIcons }

/**
 * Builds the story parameters for the Angular IconButton
 */
export const createAngularIconButtonParameters = (frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createIconButtonDescription(EFrameworkName.ANGULAR, frameworkSpecifics) } },
})
