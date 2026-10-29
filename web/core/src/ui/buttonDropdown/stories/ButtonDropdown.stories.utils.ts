/**
 * ## Story helpers for ButtonDropdown
 *
 * Helper functions, constants and types used to validate the stories.
 * Kept in a separate file so they do not show up in the Storybook autodocs.
 */

import type { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import type { IStoryConfig } from '~web/shared/.storybook/types'

import yCoreDropdownListStoryMeta from '~core/ui/dropdownList/stories/DropdownList.stories'
import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { ItemClickEvent, VisibleEvent } from '~core/ui/buttonDropdown/models/types/events'

export type TButtonDropdownStoryEmits = TEventsStoryArgs<{
  ItemClickEvent: typeof ItemClickEvent
  VisibleEvent: typeof VisibleEvent
}>

const DEFAULT_ITEMS = yCoreDropdownListStoryMeta.args?.items?.slice(0, 2) ?? []

// =============================================================================
// STORY CONFIGURATION
// =============================================================================

/**
 * Configuration of all available stories
 * Keeps the stories consistent across frameworks
 */
export const BUTTON_DROPDOWN_STORIES_CONFIG: Record<string, IStoryConfig> = {
  Playground: {
    parameters: {
      docs: {
        title: 'Playground',
        description: {
          story:
            'Try the dropdown button interactively.\nUse the controls to explore its properties and behavior.',
        },
      },
    },
  },
  Variants: {
    parameters: {
      docs: {
        title: 'Dropdown variants',
        description: { story: 'All available styling variants.' },
      },
    },
    args: { items: [...DEFAULT_ITEMS] },
  },
  Sizes: {
    parameters: { docs: { title: 'Button sizes', description: { story: 'All available sizes.' } } },
    args: { items: [...DEFAULT_ITEMS] },
  },
  States: {
    parameters: {
      docs: {
        title: 'Button states',
        description: { story: 'Default, disabled, loading, and open states.' },
      },
    },
    args: { items: DEFAULT_ITEMS },
  },
  IconType: {
    parameters: { docs: { title: 'Icon placement', description: { story: 'Icon placement options.' } } },
    args: { items: DEFAULT_ITEMS },
  },
  FullWidth: {
    parameters: { docs: { title: 'Full width', description: { story: 'A button that fills its container.' } } },
    args: { items: DEFAULT_ITEMS },
  },
} as const

/**
 * Builds the ButtonDropdown description for the given framework
 */
export const createButtonDropdownDescription = (frameworkName: EFrameworkName, frameworkSpecifics = '') => `
## ${frameworkName} ButtonDropdown

A button that opens a dropdown.
Supports multiple variants and sizes, loading and disabled states, and automatic closing.

### Features:
- 4 styling variants: primary, outline, text, outline-filled
- 3 sizes: small, medium, large
- States: default, disabled, loading, and open
- Full width (fullWidth): fills the container width
- Icon placement: left or right
- Automatic closing after clicking a dropdown item

### Slots:
- **activator** - slot for content that opens the dropdown when clicked.
- **content** - slot for content displayed inside the open dropdown.

### Events:
- **onItemClick** - dropdown item click event
- **onVisible** - dropdown visibility event

${frameworkSpecifics}

`

/**
 * Builds the story parameters for ButtonDropdown
 */
export const createButtonDropdownParameters = (frameworkName: EFrameworkName, frameworkSpecifics = '') => ({
  controls: { sort: 'alpha' },
  docs: { description: { component: createButtonDropdownDescription(frameworkName, frameworkSpecifics) } },
})
