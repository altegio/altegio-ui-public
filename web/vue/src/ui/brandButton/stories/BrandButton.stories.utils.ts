/**
 * ## Story helpers for the Vue BrandButton
 *
 * Helper functions, constants and types used to validate the stories.
 */

import { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import {
  BRAND_BUTTON_STORIES_CONFIG,
  createBrandButtonDescription,
  brandButtonVariants,
  brandButtonSizes,
} from '~core/ui/brandButton/stories/BrandButton.stories.utils'

// Re-export the shared story configuration from core
export { BRAND_BUTTON_STORIES_CONFIG, brandButtonVariants, brandButtonSizes }

/**
 * Builds the story parameters for the Vue BrandButton
 */
export const createVueBrandButtonParameters = (frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createBrandButtonDescription(EFrameworkName.VUE, frameworkSpecifics) } },
})
