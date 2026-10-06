import { html } from 'lit'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreTableHeadCellProps,
  type IYCoreTableHeadCellProps,
  type TYCoreTableHeadCellEvents,
} from '~core/ui/tableHeadCell/models/types'
import {
  YCoreTableCellTagName as tagName,
} from '~shared/constants'
import { storyControlsTable, getComponentEmitsTable, getComponentStateTable } from '~shared/.storybook/tables'
import yCoreTableCellStoryMeta, {
  type IYCoreTableCellStorySlots,
} from '~core/ui/tableCell/stories/TableCell.stories'
import { omit } from 'radash'
import { ESort } from '~shared/types/global'

import '~core/ui/tableHeadCell'

export interface IYCoreTableHeadCellStorySlots {
  showHintSlot: boolean
}

export type TYCoreTableHeadCellMeta = IYCoreTableHeadCellProps & IYCoreTableHeadCellStorySlots & TYCoreTableHeadCellEvents & IYCoreTableCellStorySlots

const storyHeader = {
  id: '1',
  label: 'Колонка 1',
}
const storyHeaderLabel = 'label'

const { sortDirection } = createCoreTableHeadCellProps()

/**
 * ## Core TableCell
 */
const meta: Meta<TYCoreTableHeadCellMeta> = {
  title: 'TableHeadCell',
  id: 'tableHeadCell',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    sticky,
    align,
    disabled,
    sortable,
    sortDirection,
    header,
    headerLabel,
    showCellSlot,
    showHintSlot,
    onSort,
  }) => {
    return html`
      <y-core-table-head-cell
        .sticky=${sticky}
        .align=${align}
        .disabled=${disabled}
        .sortable=${sortable}
        .sortDirection=${sortDirection}
        .header=${header}
        .headerLabel=${headerLabel}
        @sort=${onSort}
      >
        ${showCellSlot
          ? html`
            <div slot="cell">
              CellSlot
            </div>
          `
          : ''
        }
        ${showHintSlot
          ? html`
            <div slot="hint">
              HintSlot
            </div>
          `
          : ''
        }
      </y-core-table-head-cell>
    `
  },
  argTypes: {
    ...omit(
      yCoreTableCellStoryMeta.argTypes ?? {},
      ['item', 'itemLabel'],
    ),

    sortable: {
      type: 'boolean',
      description: 'Сортировка',
      ...getComponentStateTable(false),
    },
    sortDirection: {
      control: { type: 'select' },
      description: 'Направление сортировки',
      options: Object.values(ESort),
      ...getComponentStateTable(sortDirection),
    },
    header: {
      control: { type: 'object' },
      description: 'Данные колонки',
      ...getComponentStateTable(storyHeader),
    },
    headerLabel: {
      type: 'string',
      description: 'Метка для данных колонки',
      ...getComponentStateTable(storyHeaderLabel),
    },

    // Story Controls
    showHintSlot: {
      type: 'boolean',
      description: 'Показать слот "hint"',
      ...storyControlsTable,
    },

    // Story Actions
    onSort: {
      type: 'function',
      description: 'Событие ввода',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...omit(
      yCoreTableCellStoryMeta.args ?? {},
      ['item', 'itemLabel'],
    ),

    sortable: false,
    header: storyHeader,
    headerLabel: storyHeaderLabel,
    showHintSlot: false,
    onSort: fn(),
  },
} satisfies Meta<TYCoreTableHeadCellMeta>

export default meta
type Story = StoryObj<IYCoreTableHeadCellProps>

export const Playground: Story = { args: {} }
