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
      description: 'Текст "label"',
      ...getComponentStateTable(label),
    },
    annotation: {
      type: 'string',
      description: 'Текст "annotation"',
      ...getComponentStateTable(annotation),
    },
    opened: {
      type: 'boolean',
      description: 'Состояние "opened"',
      ...getComponentStateTable(opened),
    },
    loading: {
      type: 'boolean',
      description: 'Состояние загрузки',
      ...getComponentStateTable(loading),
    },
    shallow: {
      type: 'boolean',
      description: 'Упрощённый режим рендеринга — отображается только слот "before" (drag-иконка)',
      ...getComponentStateTable(shallow),
    },
    value: {
      type: 'string',
      description: 'Значение "value"',
      ...getComponentStateTable(value),
    },
    variant: {
      control: { type: 'select' },
      description: 'Вариант компонента',
      options: Object.values(EYCoreCollapseItemVariant),
      ...getComponentStateTable(variant),
    },

    showAfterSlot: {
      type: 'boolean',
      description: 'Показать слот "after". Слот "after" отображается в конце CollapseItem, перед Toggle иконкой, после слота "main", "label" и "annotation"',
      ...storyControlsTable,
    },
    showBeforeSlot: {
      type: 'boolean',
      description: 'Показать слот "before". Слот "before" отображается в начале CollapseItem, перед слотами "avatar", "main", "label" и "annotation"',
      ...storyControlsTable,
    },
    showAvatarSlot: {
      type: 'boolean',
      description: 'Показать слот "avatar". Слот "avatar" отображается в CollapseItem, перед слотами "main", "label" и "annotation"',
      ...storyControlsTable,
    },
    showMainSlot: {
      type: 'boolean',
      description: 'Показать слот "main". Слот "main" отображается в CollapseItem его наличие полностью заменит слоты "label" и "annotation"',
      ...storyControlsTable,
    },
    showLabelSlot: {
      type: 'boolean',
      description: 'Показать слот "label". Слот "label" отображается в CollapseItem, внутри слота "main", перед слотом "annotation"',
      ...storyControlsTable,
    },
    showAnnotationSlot: {
      type: 'boolean',
      description: 'Показать слот "annotation". Слот "annotation" отображается в CollapseItem, внутри слота "main", после слота "label"',
      ...storyControlsTable,
    },
    showContentSlot: {
      type: 'boolean',
      description: 'Показать слот "content". Слот "content" отображается в CollapseItem в открытом состоянии в контентной области',
      ...storyControlsTable,
    },

    onCollapseItemClick: {
      type: 'function',
      description: 'Событие клика по активатору',
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
