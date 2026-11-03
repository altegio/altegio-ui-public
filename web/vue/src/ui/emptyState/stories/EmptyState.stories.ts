import type { Meta, StoryObj } from '@storybook/vue3'
import { AltButton } from '~vue/ui/button'
import { AltEmptyState } from '~vue/ui/emptyState'
import { type IAltVueEmptyStateProps } from '~vue/ui/emptyState/models/types'
import altCoreEmptyStateStoryMeta, {
  type IAltCoreEmptyStateStoryProps,
} from '~core/ui/emptyState/stories/EmptyState.stories'

type TVueEmptyStateStoryMeta = IAltVueEmptyStateProps & IAltCoreEmptyStateStoryProps

/**
 * Vue wrapper for Core Empty State
 */
const meta: Meta<TVueEmptyStateStoryMeta> = {
  title: '✅ EmptyState',
  id: 'emptyState',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => ({
    components: { AltEmptyState, AltButton },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 400px; margin-left: auto; margin-right: auto;">
        <AltEmptyState v-bind="args">
          <template
            #actions
            v-if="args.isActionsSlotExists"
          >
            <AltButton
              label="Primary action"
              variant="primary"
            ></AltButton>
  
            <AltButton
              label="Secondary action"
              variant="outline"
            ></AltButton>
          </template>
        </AltEmptyState>
      </div>
    `,
  }),
  argTypes: altCoreEmptyStateStoryMeta.argTypes,
  args: altCoreEmptyStateStoryMeta.args,
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
