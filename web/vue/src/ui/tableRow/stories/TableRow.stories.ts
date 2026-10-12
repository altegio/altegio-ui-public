import type { Meta, StoryObj } from '@storybook/vue3'

import { YTableRow } from '~vue/ui/tableRow'
import { type IYVueTableRowProps } from '~vue/ui/tableRow/models/types'
import yCoreTableRowStoryMeta, {
  type TYCoreTableRowMeta,
} from '~core/ui/tableRow/stories/TableRow.stories'

type TVueTableRowStoryMeta = IYVueTableRowProps & TYCoreTableRowMeta

/**
 * Vue wrapper for Core TableRow
 */
const meta: Meta<TVueTableRowStoryMeta> = {
  title: '⚠️ TableRow',
  id: 'tableRow',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YTableRow },
    setup() {
      return { args }
    },
    template: `
      <YTableRow
        v-bind="args"
        style="border: 1px dashed;"
      >
        <template v-if="args.showDefaultSlot">
          <p>
            default
          </p>
        </template>
      </YTableRow>
    `,
  }),
  argTypes: { ...yCoreTableRowStoryMeta.argTypes },
  args: { ...yCoreTableRowStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
