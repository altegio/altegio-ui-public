import { html, nothing } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'
import {
  createCoreCollapseItemProps,
  EYCoreCollapseItemVariant,
  type IYCoreCollapseItemProps,
  type TYCoreCollapseItemEvents,
  type CollapseItemClickEvent,
} from '~core/ui/collapseItem/models/types'
import {
  YCoreCollapseItemTagName as tagName,
} from '~shared/constants'
import {
  storyControlsTable,
  getComponentEmitsTable,
  getComponentStateTable,
} from '~shared/.storybook/tables'

import '~core/ui/collapseItem'
import '~core/ui/icon'
import '~core/ui/tag'
import '~core/ui/avatar'

import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { yCopy, yDragAndDrop, yInfo } from '~shared/icons'

const { label, annotation, opened, value, variant, loading, shallow } = createCoreCollapseItemProps()

export interface IYCoreCollapseItemStorySlots {
  showAfterSlot: boolean
  showBeforeSlot: boolean
  showAvatarSlot: boolean
  showMainSlot: boolean
  showLabelSlot: boolean
  showAnnotationSlot: boolean
  showContentSlot: boolean
}

export type TYCoreCollapseItemMeta = IYCoreCollapseItemProps & IYCoreCollapseItemStorySlots & TYCoreCollapseItemEvents

/**
 * ## CoreCollapseItem
 */
const meta: Meta<TYCoreCollapseItemMeta> = {
  title: '✅ CollapseItem',
  id: 'collapseItem',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    label,
    annotation,
    opened,
    loading,
    shallow,
    value,
    variant,
    showAfterSlot,
    showBeforeSlot,
    showAvatarSlot,
    showMainSlot,
    showLabelSlot,
    showAnnotationSlot,
    showContentSlot,
  }) => {
    const [, updateArgs] = useArgs()
    const handleCollapseItemClick = (event: CollapseItemClickEvent) => {
      updateArgs({ opened: !opened })

      action('collapse-item-click')(event)
    }

    return html`
      <y-core-collapse-item
        .label=${label}
        .annotation=${annotation}
        .opened=${opened}
        .loading=${loading}
        .shallow=${shallow}
        .value=${value}
        .variant=${variant}
        @collapse-item-click=${handleCollapseItemClick}
      >
        ${showAfterSlot ? html`<y-core-icon slot="after" .icon=${yCopy} size="16px"></y-core-icon>` : nothing}
        ${showBeforeSlot ? html`<y-core-icon slot="before" .icon=${yDragAndDrop} size="16px"></y-core-icon>` : nothing}
        ${showAvatarSlot ? html`<y-core-avatar slot="avatar" photo="https://i.pravatar.cc/300" size="small"></y-core-avatar>` : nothing}
        ${showMainSlot ? html`<div slot="main">MainSlot</div>` : nothing}
        ${showLabelSlot
          ? html`
            <div slot="label" style="display: flex; align-items: center;gap: 8px;">
              <span>LabelSlot</span>
              
              <y-core-tag size="small" variant="accent">TagLabel</y-core-tag>
              <y-core-icon .icon=${yInfo} size="16px"></y-core-icon>
            </div>
          `
          : nothing
        }
        ${showAnnotationSlot ? html`<div slot="annotation">AnnotationSlot</div>` : nothing}
        ${showContentSlot
          ? html`<div slot="content"> ${loading ? 'LOADING SLOT ♾️' : LOREM_IPSUM}</div>`
          : nothing
        }
      </y-core-collapse-item>
    `
  },
  argTypes: {
    label: {
      type: 'string',
      description: 'Label text',
      ...getComponentStateTable(label),
    },
    annotation: {
      type: 'string',
      description: 'Annotation text',
      ...getComponentStateTable(annotation),
    },
    opened: {
      type: 'boolean',
      description: 'Opened state',
      ...getComponentStateTable(opened),
    },
    loading: {
      type: 'boolean',
      description: 'Loading state',
      ...getComponentStateTable(loading),
    },
    shallow: {
      type: 'boolean',
      description: 'Simplified rendering: only the "before" slot (drag icon) is displayed',
      ...getComponentStateTable(shallow),
    },
    value: {
      type: 'string',
      description: 'Value',
      ...getComponentStateTable(value),
    },
    variant: {
      control: { type: 'select' },
      description: 'Component variant',
      options: Object.values(EYCoreCollapseItemVariant),
      ...getComponentStateTable(variant),
    },

    showAfterSlot: {
      type: 'boolean',
      description: 'Show the "after" slot. The "after" slot appears at the end of CollapseItem, before the toggle icon and after the "main", "label", and "annotation" slots',
      ...storyControlsTable,
    },
    showBeforeSlot: {
      type: 'boolean',
      description: 'Show the "before" slot. The "before" slot appears at the start of CollapseItem, before the "avatar", "main", "label", and "annotation" slots',
      ...storyControlsTable,
    },
    showAvatarSlot: {
      type: 'boolean',
      description: 'Show the "avatar" slot. The "avatar" slot appears before the "main", "label", and "annotation" slots',
      ...storyControlsTable,
    },
    showMainSlot: {
      type: 'boolean',
      description: 'Show the "main" slot. The "main" slot replaces the "label" and "annotation" slots',
      ...storyControlsTable,
    },
    showLabelSlot: {
      type: 'boolean',
      description: 'Show the "label" slot. The "label" slot appears inside "main", before "annotation"',
      ...storyControlsTable,
    },
    showAnnotationSlot: {
      type: 'boolean',
      description: 'Show the "annotation" slot. The "annotation" slot appears inside "main", after "label"',
      ...storyControlsTable,
    },
    showContentSlot: {
      type: 'boolean',
      description: 'Show the "content" slot. The "content" slot appears in the content area when the item is expanded',
      ...storyControlsTable,
    },

    onCollapseItemClick: {
      type: 'function',
      description: 'Activator click event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    label: 'Label',
    annotation: 'Annotation',
    opened: false,
    shallow: false,
    value: 'Value',
    variant,
    showAfterSlot: true,
    showBeforeSlot: true,
    showAvatarSlot: true,
    showMainSlot: false,
    showLabelSlot: false,
    showAnnotationSlot: false,
    showContentSlot: true,
  },
} satisfies Meta<TYCoreCollapseItemMeta>

export default meta
type Story = StoryObj<TYCoreCollapseItemMeta>

export const Playground: Story = { args: {} }
