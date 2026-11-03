import type { Meta, StoryObj } from '@storybook/vue3'

import { AltTableCell } from '~vue/ui/tableCell'
import { type IAltVueTableCellProps } from '~vue/ui/tableCell/models/types'
import altCoreTableCellStoryMeta, {
  type TAltCoreTableCellMeta,
} from '~core/ui/tableCell/stories/TableCell.stories'

type TVueTableCellStoryMeta = IAltVueTableCellProps & TAltCoreTableCellMeta

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
    components: { AltTableCell },
    setup() {
      return { args }
    },
    template: `
      <AltTableCell
        v-bind="args"
        style="border: 1px dashed;width: min-content;"
      >
        <template v-if="args.showCellSlot" #default>
          <p>
            cell
          </p>
        </template>
      </AltTableCell>
    `,
  }),
  argTypes: { ...altCoreTableCellStoryMeta.argTypes },
  args: { ...altCoreTableCellStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
