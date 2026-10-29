/**
 * ## Story helpers for the Angular BrandButton
 *
 * Helper functions, constants and types used to validate the stories.
 * Kept in a separate file so they do not show up in the Storybook autodocs.
 */

import { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import {
  BRAND_BUTTON_STORIES_CONFIG,
  createBrandButtonDescription,
  brandButtonSizes,
  brandButtonVariants,
} from '~core/ui/brandButton/stories/BrandButton.stories.utils'

// Re-export the shared story configuration from core
export { BRAND_BUTTON_STORIES_CONFIG, brandButtonSizes, brandButtonVariants }

/**
 * Builds the story parameters for the Angular BrandButton
 */
export const createAngularBrandButtonParameters = (frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createBrandButtonDescription(EFrameworkName.ANGULAR, frameworkSpecifics) } },
})
