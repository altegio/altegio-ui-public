import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { pick } from 'radash'

import {
  type IAltCoreSkeletonTableProps,
  type ISkeletonTableColumn,
} from '~core/ui/skeletonTable/models/types'
import {
  AltCoreSkeletonTableTagName as tagName,
} from '~shared/constants'
import { getComponentStateTable } from '~shared/.storybook/tables'

import altTableStoryMeta from '~core/ui/table/stories/Table.stories'

const storyColumns: ISkeletonTableColumn[] = [
  { gridTemplate: '170px', align: 'left' },
  { gridTemplate: '130px', align: 'left' },
  { gridTemplate: '200px', align: 'right' },
  { gridTemplate: '150px', align: 'center' },
  { gridTemplate: '100px', align: 'right' },
]

import '~core/ui/skeletonTable'

const storyRows = 10

/**
 * ## Core SkeletonTable
 */
const meta: Meta<IAltCoreSkeletonTableProps> = {
  title: 'SkeletonTable',
  id: 'skeletonTable',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    columns,
    rows,
    hideHead,
    hideBar,
  }) => {
    return html`
      <alt-core-skeleton-table
        .columns=${columns}
        .rows=${rows}
        .hideHead=${hideHead}
        .hideBar=${hideBar}
      ></alt-core-skeleton-table>
    `
  },
  argTypes: {
    ...pick(
      altTableStoryMeta.argTypes ?? {},
      ['hideHead', 'hideBar'],
    ),
    columns: {
      control: { type: 'object' },
      description: 'Table columns',
      ...getComponentStateTable(storyColumns),
    },
    rows: {
      control: { type: 'object' },
      description: 'Table rows',
      ...getComponentStateTable(storyRows),
    },
  },
  args: {
    ...pick(
      altTableStoryMeta.args ?? {},
      ['hideHead', 'hideBar'],
    ),
    columns: storyColumns,
    rows: storyRows,
  },
} satisfies Meta<IAltCoreSkeletonTableProps>

export default meta
type Story = StoryObj<IAltCoreSkeletonTableProps>

export const Playground: Story = { args: {} }
