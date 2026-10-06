import type { Meta, StoryObj } from '@storybook/vue3'

import { YTableHeadCell } from '~vue/ui/tableHeadCell'
import { type IYVueTableHeadCellProps } from '~vue/ui/tableHeadCell/models/types'
import yCoreTableHeadCellStoryMeta, {
  type TYCoreTableHeadCellMeta,
} from '~core/ui/tableHeadCell/stories/TableHeadCell.stories'

type TVueTableHeadCellStoryMeta = IYVueTableHeadCellProps & TYCoreTableHeadCellMeta

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
    components: { YTableHeadCell },
    setup() {
      return { args }
    },
    template: `
      <YTableHeadCell
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
      </YTableHeadCell>
    `,
  }),
  argTypes: { ...yCoreTableHeadCellStoryMeta.argTypes },
  args: { ...yCoreTableHeadCellStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
