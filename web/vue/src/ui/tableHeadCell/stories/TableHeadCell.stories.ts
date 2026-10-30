import type { Meta, StoryObj } from '@storybook/vue3'

import { AltTableHeadCell } from '~vue/ui/tableHeadCell'
import { type IAltVueTableHeadCellProps } from '~vue/ui/tableHeadCell/models/types'
import altCoreTableHeadCellStoryMeta, {
  type TAltCoreTableHeadCellMeta,
} from '~core/ui/tableHeadCell/stories/TableHeadCell.stories'

type TVueTableHeadCellStoryMeta = IAltVueTableHeadCellProps & TAltCoreTableHeadCellMeta

/**
 * Vue wrapper for TableHeadCell
 */
const meta: Meta<TVueTableHeadCellStoryMeta> = {
  title: '⚠️ TableHeadCell',
  id: 'tableHeadCell',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltTableHeadCell },
    setup() {
      return { args }
    },
    template: `
      <AltTableHeadCell
        v-bind="args"
        style="border: 1px dashed;width: min-content;"
        @sort="args.onSort"
      >
        <template v-if="args.showCellSlot" #cell>
          <p>
            cell
          </p>
        </template>

        <template v-if="args.showHintSlot" #hint>
          <p>
            hint
          </p>
        </template>
      </AltTableHeadCell>
    `,
  }),
  argTypes: { ...altCoreTableHeadCellStoryMeta.argTypes },
  args: { ...altCoreTableHeadCellStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
