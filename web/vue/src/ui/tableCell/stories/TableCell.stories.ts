import type { Meta, StoryObj } from '@storybook/vue3'

import { YTableCell } from '~vue/ui/tableCell'
import { type IYVueTableCellProps } from '~vue/ui/tableCell/models/types'
import yCoreTableCellStoryMeta, {
  type TYCoreTableCellMeta,
} from '~core/ui/tableCell/stories/TableCell.stories'

type TVueTableCellStoryMeta = IYVueTableCellProps & TYCoreTableCellMeta

/**
 * Vue wrapper for Core TableCell
 */
const meta: Meta<TVueTableCellStoryMeta> = {
  title: '⚠️ TableCell',
  id: 'tableCell',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YTableCell },
    setup() {
      return { args }
    },
    template: `
      <YTableCell
        v-bind="args"
        style="border: 1px dashed;width: min-content;"
      >
        <template v-if="args.showCellSlot" #default>
          <p>
            cell
          </p>
        </template>
      </YTableCell>
    `,
  }),
  argTypes: { ...yCoreTableCellStoryMeta.argTypes },
  args: { ...yCoreTableCellStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
