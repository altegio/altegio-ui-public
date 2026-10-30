import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { action } from 'storybook/actions'
import { repeat } from 'lit/directives/repeat.js'
import { integerSequence } from '~shared/utils/integerSequence'

import {
  createCoreCollapseProps,
  type IAltCoreCollapseProps,
  EAltCoreCollapseType,
  type TAltCoreCollapseEvents,
  type CollapseChangeEvent,
  type CollapseMoveEvent,
} from '~core/ui/collapse/models/types'
import {
  AltCoreCollapseTagName as tagName,
} from '~shared/constants'
import {
  getComponentStateTable,
  getComponentEmitsTable,
} from '~shared/.storybook/tables'
import { pick } from 'radash'

import { LOREM_IPSUM } from '~shared/.storybook/constants'

import altCoreCollapseItemStoryMeta from '~core/ui/collapseItem/stories/CollapseItem.stories'
import { altCopy, altInfo } from '~shared/icons'

import '~core/ui/collapse'
import '~core/ui/collapseItem'

const { value, type, draggable, allowCrossLevelMove } = createCoreCollapseProps()

export type TAltCoreCollapseMeta = IAltCoreCollapseProps & TAltCoreCollapseEvents

/**
 * ## Core Collapse
 */
const meta: Meta<TAltCoreCollapseMeta> = {
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
    const computedValue: IAltCoreCollapseProps['value'] = type === EAltCoreCollapseType.SINGLE
      ? value
      : []

    const handleCollapseChange = (event: CollapseChangeEvent) => {
      action('collapse-change')(event)
    }

    const handleCollapseMove = (event: CollapseMoveEvent) => {
      action('collapse-move')(event)
    }

    const isMultiple = type === EAltCoreCollapseType.MULTIPLE

    const renderBottomLevel = (i: number, j: number) => repeat(integerSequence(3), (k) => `bottom-level-${k}`, (k) => html`
        <alt-core-collapse-item value=${`top-level-${i}-middle-level-${j}-bottom-level-${k}`}>
          <alt-core-icon slot="after" .icon=${altCopy} size="16px"></alt-core-icon>
          
          <div slot="label" style="display: flex; align-items: center;gap: 8px;">
            <span>LabelSlot-${i}-${j}-${k}</span>
            
            <alt-core-tag size="small" variant="accent">TagLabel-${i}-${j}-${k}</alt-core-tag>
            <alt-core-icon .icon=${altInfo} size="16px"></alt-core-icon>
          </div>
          
          <div slot="annotation">AnnotationSlot-${i}-${j}-${k}</div>
          
          <div slot="content">${LOREM_IPSUM} ${LOREM_IPSUM}</div>
        </alt-core-collapse-item>
      `)

    const renderMiddleLevel = (i: number) => repeat(integerSequence(5), (j) => `middle-level-${j}`, (j) => html`
        <alt-core-collapse-item value=${`top-level-${i}-middle-level-${j}`}>
          <alt-core-icon slot="after" .icon=${altCopy} size="16px"></alt-core-icon>
          
          <div slot="label" style="display: flex; align-items: center;gap: 8px;">
            <span>LabelSlot-${i}-${j}</span>
            
            <alt-core-tag size="small" variant="accent">TagLabel-${i}-${j}</alt-core-tag>
            <alt-core-icon .icon=${altInfo} size="16px"></alt-core-icon>
          </div>
          
          <div slot="annotation">AnnotationSlot-${i}-${j}</div>
          
          <div slot="content">
            ${isMultiple
              ? html`
                <alt-core-collapse
                  .type=${type}
                  .variant=${variant}
                  .draggable=${draggable}
                  .allowCrossLevelMove=${allowCrossLevelMove}
                  @collapse-change=${handleCollapseChange}
                  @collapse-move=${handleCollapseMove}
                >
                  ${renderBottomLevel(i, j)}
                </alt-core-collapse>
              `
              : html`${LOREM_IPSUM} ${LOREM_IPSUM}`}
          </div>
        </alt-core-collapse-item>
      `)

    const renderTopLevel = () => repeat(integerSequence(5), (i) => `top-level-${i}`, (i) => html`
        <alt-core-collapse-item value=${`top-level-${i}`}>
          <alt-core-icon slot="after" .icon=${altCopy} size="16px"></alt-core-icon>
          
          <div slot="label" style="display: flex; align-items: center;gap: 8px;">
            <span>LabelSlot-${i}</span>
            
            <alt-core-tag size="small" variant="accent">TagLabel-${i}</alt-core-tag>
            <alt-core-icon .icon=${altInfo} size="16px"></alt-core-icon>
          </div>
          
          <div slot="annotation">AnnotationSlot-${i}</div>
          
          <div slot="content">
            ${isMultiple
              ? html`
                <alt-core-collapse
                  .type=${type}
                  .variant=${variant}
                  .draggable=${draggable}
                  .allowCrossLevelMove=${allowCrossLevelMove}
                  @collapse-change=${handleCollapseChange}
                  @collapse-move=${handleCollapseMove}
                >
                  ${renderMiddleLevel(i)}
                </alt-core-collapse>
              `
              : html`${LOREM_IPSUM} ${LOREM_IPSUM}`}
          </div>
        </alt-core-collapse-item>
      `)

    return html`
        <alt-core-collapse
          .value=${computedValue}
          .type=${type}
          .variant=${variant}
          .draggable=${draggable}
          .allowCrossLevelMove=${allowCrossLevelMove}
          @collapse-change=${handleCollapseChange}
          @collapse-move=${handleCollapseMove}
        >
          ${renderTopLevel()}
      </alt-core-collapse>
      `
  },
  argTypes: {
    ...pick(altCoreCollapseItemStoryMeta.argTypes ?? {}, ['variant']),
    value: {
      type: 'string',
      description: 'Value',
      ...getComponentStateTable(value),
    },
    type: {
      control: { type: 'select' },
      description: 'Expansion mode: one item or multiple items',
      options: Object.values(EAltCoreCollapseType),
      ...getComponentStateTable(type),
    },
    draggable: {
      control: { type: 'boolean' },
      description: 'Allow dragging',
      ...getComponentStateTable(draggable),
    },
    allowCrossLevelMove: {
      control: { type: 'boolean' },
      description: 'Allow dragging across hierarchy levels',
      ...getComponentStateTable(allowCrossLevelMove),
    },
    onCollapseChange: {
      type: 'function',
      description: 'Value change event',
      ...getComponentEmitsTable(),
    },

    onCollapseMove: {
      type: 'function',
      description: 'Drag event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...pick(altCoreCollapseItemStoryMeta.args ?? {}, ['variant']),
    value,
    type,
    draggable: true,
  },
} satisfies Meta<TAltCoreCollapseMeta>

export default meta
type Story = StoryObj<TAltCoreCollapseMeta>

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
    const computedValue: IAltCoreCollapseProps['value'] = type === EAltCoreCollapseType.SINGLE
      ? value
      : []

    const handleCollapseChange = (event: CollapseChangeEvent) => {
      action('collapse-change')(event)
    }

    const handleCollapseMove = (event: CollapseMoveEvent) => {
      action('collapse-move')(event)
    }

    return html`
      <alt-core-collapse
        .value=${computedValue}
        .type=${type}
        .variant=${variant}
        .draggable=${draggable}
        .allowCrossLevelMove=${allowCrossLevelMove}
        @collapse-change=${handleCollapseChange}
        @collapse-move=${handleCollapseMove}
      >
        ${repeat(integerSequence(5), (i) => `shallow-${i}`, (i) => html`
          <alt-core-collapse-item value=${`shallow-${i}`} .shallow=${true}>
          </alt-core-collapse-item>
        `)}
      </alt-core-collapse>
    `
  },
}
