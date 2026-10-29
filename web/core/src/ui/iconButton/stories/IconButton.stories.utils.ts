/**
 * ## Story helpers for IconButton
 *
 * Helper functions, constants and types used to validate the stories.
 * Kept in a separate file so they do not show up in the Storybook autodocs.
 */

import type { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import type { IStoryConfig } from '~web/shared/.storybook/types'
import { yCopy, yInfo, yMagic, yRocket, ySearch } from '~web/shared/icons'
import { EYSizes } from '~web/shared/types/global'

// =============================================================================
// STORY CONFIGURATION
// =============================================================================

/**
 * Configuration of all available stories
 * Keeps the stories consistent across frameworks
 */
export const ICON_BUTTON_STORIES_CONFIG: Record<string, IStoryConfig> = {
  Playground: { parameters: { docs: { title: 'Playground', description: { story: 'Try the icon button interactively.\nUse the controls to explore its properties and behavior.' } } } },
  Variants: { parameters: { docs: { title: 'Button variants', description: { story: 'All available icon button styling variants.' } } } },
  Sizes: { parameters: { docs: { title: 'Button sizes', description: { story: 'All available icon button sizes.' } } } },
  States: { parameters: { docs: { title: 'Button states', description: { story: 'Default, disabled, and loading states.' } } } },
  PseudoStates: { parameters: { docs: { title: 'Pseudo states', description: { story: 'Pseudo states applied through CSS classes.\nHover over the buttons to see the effect.' } } } },
  FullWidth: { parameters: { docs: { title: 'Full width', description: { story: 'An icon button that fills its container.' } } }, args: { fullWidth: true } },
  LinkMode: { parameters: { docs: { title: 'Link mode', description: { story: 'An icon button can act as a link when href is set.' } } } },
  IconVariety: { parameters: { docs: { title: 'Icon options', description: { story: 'Buttons with different icons.' } } } },
  ComplexDemo: { parameters: { docs: { title: 'Combined example', description: { story: 'All variants and sizes in a single table.' } } } },
} as const

/**
 * Builds the IconButton description for the given framework
 */
export const createIconButtonDescription = (frameworkName: EFrameworkName, frameworkSpecifics = '') => `
## ${frameworkName} IconButton

An icon button built on SimpleButton. Use it for actions where an icon replaces or complements a text label. It can also act as a link.

### Features:
- 4 styling variants: primary, outline, outline-filled, text
- 3 sizes: small, medium, large
- Automatic icon sizing: 16px for small and medium buttons, 24px for large buttons
- States: default, disabled, and loading
- Link mode with target support
- Full width (fullWidth): fills the container width
- Supports all design system icons

### Differences from SimpleButton:
- Requires the \`icon\` property instead of an icon slot
- Sizes the icon automatically
- Designed for compact action controls

${frameworkSpecifics}

`

/**
 * Builds the story parameters for IconButton
 */
export const createIconButtonParameters = (frameworkName: EFrameworkName, frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createIconButtonDescription(frameworkName, frameworkSpecifics) } },
})

export const iconButtonSizes = [EYSizes.SMALL, EYSizes.MEDIUM, EYSizes.LARGE] as const

export const iconButtonIcons = {
  search: ySearch,
  rocket: yRocket,
  magic: yMagic,
  info: yInfo,
  copy: yCopy,
}
