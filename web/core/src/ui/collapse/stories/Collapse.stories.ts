import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { action } from '@storybook/addon-actions'
import { repeat } from 'lit/directives/repeat.js'
import { integerSequence } from '~shared/utils/integerSequence'

import {
  createCoreCollapseProps,
  type IYCoreCollapseProps,
  EYCoreCollapseType,
  type TYCoreCollapseEvents,
  type CollapseChangeEvent,
  type CollapseMoveEvent,
} from '~core/ui/collapse/models/types'
import {
  YCoreCollapseTagName as tagName,
} from '~shared/constants'
import {
  getComponentStateTable,
  getComponentEmitsTable,
} from '~shared/.storybook/tables'
import { pick } from 'radash'

import { LOREM_IPSUM } from '~shared/.storybook/constants'

import yCoreCollapseItemStoryMeta from '~core/ui/collapseItem/stories/CollapseItem.stories'
import { yCopy, yInfo } from '~shared/icons'

import '~core/ui/collapse'
import '~core/ui/collapseItem'

const { value, type, draggable, allowCrossLevelMove } = createCoreCollapseProps()

export type TYCoreCollapseMeta = IYCoreCollapseProps & TYCoreCollapseEvents

/**
 * ## Core Collapse
 */
const meta: Meta<TYCoreCollapseMeta> = {
  title: '✅ Collapse',
  id: 'collapse',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    value,
    type,
    variant,
    draggable,
    allowCrossLevelMove,
  }) => {
    const computedValue: IYCoreCollapseProps['value'] = type === EYCoreCollapseType.SINGLE
      ? value
      : []

    const handleCollapseChange = (event: CollapseChangeEvent) => {
      action('collapse-change')(event)
    }

    const handleCollapseMove = (event: CollapseMoveEvent) => {
      action('collapse-move')(event)
    }

    const isMultiple = type === EYCoreCollapseType.MULTIPLE

    const renderBottomLevel = (i: number, j: number) => repeat(integerSequence(3), (k) => `bottom-level-${k}`, (k) => html`
        <y-core-collapse-item value=${`top-level-${i}-middle-level-${j}-bottom-level-${k}`}>
          <y-core-icon slot="after" .icon=${yCopy} size="16px"></y-core-icon>
          
          <div slot="label" style="display: flex; align-items: center;gap: 8px;">
            <span>LabelSlot-${i}-${j}-${k}</span>
            
            <y-core-tag size="small" variant="accent">TagLabel-${i}-${j}-${k}</y-core-tag>
            <y-core-icon .icon=${yInfo} size="16px"></y-core-icon>
          </div>
          
          <div slot="annotation">AnnotationSlot-${i}-${j}-${k}</div>
          
          <div slot="content">${LOREM_IPSUM} ${LOREM_IPSUM}</div>
        </y-core-collapse-item>
      `)

    const renderMiddleLevel = (i: number) => repeat(integerSequence(5), (j) => `middle-level-${j}`, (j) => html`
        <y-core-collapse-item value=${`top-level-${i}-middle-level-${j}`}>
          <y-core-icon slot="after" .icon=${yCopy} size="16px"></y-core-icon>
          
          <div slot="label" style="display: flex; align-items: center;gap: 8px;">
            <span>LabelSlot-${i}-${j}</span>
            
            <y-core-tag size="small" variant="accent">TagLabel-${i}-${j}</y-core-tag>
            <y-core-icon .icon=${yInfo} size="16px"></y-core-icon>
          </div>
          
          <div slot="annotation">AnnotationSlot-${i}-${j}</div>
          
          <div slot="content">
            ${isMultiple
              ? html`
                <y-core-collapse
                  .type=${type}
                  .variant=${variant}
                  .draggable=${draggable}
                  .allowCrossLevelMove=${allowCrossLevelMove}
                  @collapse-change=${handleCollapseChange}
                  @collapse-move=${handleCollapseMove}
                >
                  ${renderBottomLevel(i, j)}
                </y-core-collapse>
              `
              : html`${LOREM_IPSUM} ${LOREM_IPSUM}`}
          </div>
        </y-core-collapse-item>
      `)

    const renderTopLevel = () => repeat(integerSequence(5), (i) => `top-level-${i}`, (i) => html`
        <y-core-collapse-item value=${`top-level-${i}`}>
          <y-core-icon slot="after" .icon=${yCopy} size="16px"></y-core-icon>
          
          <div slot="label" style="display: flex; align-items: center;gap: 8px;">
            <span>LabelSlot-${i}</span>
            
            <y-core-tag size="small" variant="accent">TagLabel-${i}</y-core-tag>
            <y-core-icon .icon=${yInfo} size="16px"></y-core-icon>
          </div>
          
          <div slot="annotation">AnnotationSlot-${i}</div>
          
          <div slot="content">
            ${isMultiple
              ? html`
                <y-core-collapse
                  .type=${type}
                  .variant=${variant}
                  .draggable=${draggable}
                  .allowCrossLevelMove=${allowCrossLevelMove}
                  @collapse-change=${handleCollapseChange}
                  @collapse-move=${handleCollapseMove}
                >
                  ${renderMiddleLevel(i)}
                </y-core-collapse>
              `
              : html`${LOREM_IPSUM} ${LOREM_IPSUM}`}
          </div>
        </y-core-collapse-item>
      `)

    return html`
        <y-core-collapse
          .value=${computedValue}
          .type=${type}
          .variant=${variant}
          .draggable=${draggable}
          .allowCrossLevelMove=${allowCrossLevelMove}
          @collapse-change=${handleCollapseChange}
          @collapse-move=${handleCollapseMove}
        >
          ${renderTopLevel()}
      </y-core-collapse>
      `
  },
  argTypes: {
    ...pick(yCoreCollapseItemStoryMeta.argTypes ?? {}, ['variant']),
    value: {
      type: 'string',
      description: 'Значение "value"',
      ...getComponentStateTable(value),
    },
    type: {
      control: { type: 'select' },
      description: 'Тип раскрытия один/многие',
      options: Object.values(EYCoreCollapseType),
      ...getComponentStateTable(type),
    },
    draggable: {
      control: { type: 'boolean' },
      description: 'Возможность перетаскивания',
      ...getComponentStateTable(draggable),
    },
    allowCrossLevelMove: {
      control: { type: 'boolean' },
      description: 'Возможность перетаскивания сквозь уровни иерархии',
      ...getComponentStateTable(allowCrossLevelMove),
    },
    onCollapseChange: {
      type: 'function',
      description: 'Событие изменения значения',
      ...getComponentEmitsTable(),
    },

    onCollapseMove: {
      type: 'function',
      description: 'Событие перетаскивания',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...pick(yCoreCollapseItemStoryMeta.args ?? {}, ['variant']),
    value,
    type,
    draggable: true,
  },
} satisfies Meta<TYCoreCollapseMeta>

export default meta
type Story = StoryObj<TYCoreCollapseMeta>

export const Playground: Story = { args: {} }

export const ShallowItems: Story = {
  args: { draggable: true },
  render: ({
    value,
    type,
    variant,
    draggable,
    allowCrossLevelMove,
  }) => {
    const computedValue: IYCoreCollapseProps['value'] = type === EYCoreCollapseType.SINGLE
      ? value
      : []

    const handleCollapseChange = (event: CollapseChangeEvent) => {
      action('collapse-change')(event)
    }

    const handleCollapseMove = (event: CollapseMoveEvent) => {
      action('collapse-move')(event)
    }

    return html`
      <y-core-collapse
        .value=${computedValue}
        .type=${type}
        .variant=${variant}
        .draggable=${draggable}
        .allowCrossLevelMove=${allowCrossLevelMove}
        @collapse-change=${handleCollapseChange}
        @collapse-move=${handleCollapseMove}
      >
        ${repeat(integerSequence(5), (i) => `shallow-${i}`, (i) => html`
          <y-core-collapse-item value=${`shallow-${i}`} .shallow=${true}>
          </y-core-collapse-item>
        `)}
      </y-core-collapse>
    `
  },
}
