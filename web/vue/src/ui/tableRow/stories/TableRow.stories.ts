import type { Meta, StoryObj } from '@storybook/vue3'

import { AltTableRow } from '~vue/ui/tableRow'
import { type IAltVueTableRowProps } from '~vue/ui/tableRow/models/types'
import altCoreTableRowStoryMeta, {
  type TAltCoreTableRowMeta,
} from '~core/ui/tableRow/stories/TableRow.stories'

type TVueTableRowStoryMeta = IAltVueTableRowProps & TAltCoreTableRowMeta

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
    components: { AltTableRow },
    setup() {
      return { args }
    },
    template: `
      <AltTableRow
        v-bind="args"
        style="border: 1px dashed;"
      >
        <template v-if="args.showDefaultSlot">
          <p>
            default
          </p>
        </template>
      </AltTableRow>
    `,
  }),
  argTypes: { ...altCoreTableRowStoryMeta.argTypes },
  args: { ...altCoreTableRowStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
