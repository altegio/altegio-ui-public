import { EAltCoreColorIconVariant, EAltCoreColorIconSize } from '~core/ui/colorIcon/models/types'
import { altRocket } from '~shared/icons'

/**
 * ## Story helpers for ColorIcon
 *
 * Helper functions, constants and types used to validate the stories.
 * Kept in a separate file so they do not show up in the Storybook autodocs.
 */

import type { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import type { IStoryConfig } from '~web/shared/.storybook/types'

// =============================================================================
// STORY CONFIGURATION
// =============================================================================

/**
 * Configuration of all available stories
 * Keeps the stories consistent across frameworks
 */
export const COLOR_ICON_STORIES_CONFIG: Record<string, IStoryConfig> = {
  Playground: {
    parameters: {
      docs: {
        title: 'Playground',
        description: {
          story:
            'Try ColorIcon interactively.\nUse the controls to explore its properties and behavior.',
        },
      },
    },
  },
  IconVariety: { parameters: { docs: { title: 'Icon options', description: { story: 'Different icon options.' } } } },
  Sizes: { parameters: { docs: { title: 'Icon sizes', description: { story: 'All available sizes.' } } } },
  Variants: {
    parameters: {
      docs: {
        title: 'Icon color variants',
        description: { story: 'All available color variants' },
      },
    },
  },
  States: {
    parameters: {
      docs: {
        title: 'Icon states',
        description: { story: 'Default and disabled states' },
      },
    },
  },

} as const

/**
 * Values listed in the generated description
 */
const sizes = Object.values(EAltCoreColorIconSize)
const variants = Object.values(EAltCoreColorIconVariant)

/**
 * Builds the ColorIcon description for the given framework
 */
export const createColorIconDescription = (frameworkName: EFrameworkName, frameworkSpecifics = '') => `
## ${frameworkName} ColorIcon

An icon displayed inside a circle.
Supports different icons, colors, sizes, and a disabled state.

### Features:
- any icon
- ${sizes.length} sizes: ${sizes.join(', ')}
- ${variants.length} color variants: ${variants.join(', ')}
- States: default and disabled

${frameworkSpecifics}

`

/**
 * Builds the story parameters for ColorIcon
 */
export const createColorIconParameters = (frameworkName: EFrameworkName, frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createColorIconDescription(frameworkName, frameworkSpecifics) } },
})

export const defaultIcon = altRocket
