import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { pick } from 'radash'

import {
  type IYCoreSkeletonTableProps,
  type ISkeletonTableColumn,
} from '~core/ui/skeletonTable/models/types'
import {
  YCoreSkeletonTableTagName as tagName,
} from '~shared/constants'
import { getComponentStateTable } from '~shared/.storybook/tables'

import yTableStoryMeta from '~core/ui/table/stories/Table.stories'

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
const meta: Meta<IYCoreSkeletonTableProps> = {
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
      <y-core-skeleton-table
        .columns=${columns}
        .rows=${rows}
        .hideHead=${hideHead}
        .hideBar=${hideBar}
      ></y-core-skeleton-table>
    `
  },
  argTypes: {
    ...pick(
      yTableStoryMeta.argTypes ?? {},
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
      yTableStoryMeta.args ?? {},
      ['hideHead', 'hideBar'],
    ),
    columns: storyColumns,
    rows: storyRows,
  },
} satisfies Meta<IYCoreSkeletonTableProps>

export default meta
type Story = StoryObj<IYCoreSkeletonTableProps>

export const Playground: Story = { args: {} }
