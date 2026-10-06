import type { Meta, StoryObj } from '@storybook/vue3'
import { YButton } from '~vue/ui/button'
import { YEmptyState } from '~vue/ui/emptyState'
import { type IYVueEmptyStateProps } from '~vue/ui/emptyState/models/types'
import yCoreEmptyStateStoryMeta, {
  type IYCoreEmptyStateStoryProps,
} from '~core/ui/emptyState/stories/EmptyState.stories'

type TVueEmptyStateStoryMeta = IYVueEmptyStateProps & IYCoreEmptyStateStoryProps

/**
 * Vue wrapper for Core Empty State
 */
const meta: Meta<TVueEmptyStateStoryMeta> = {
  title: '✅ EmptyState',
  id: 'emptyState',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => ({
    components: { YEmptyState, YButton },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 400px; margin-left: auto; margin-right: auto;">
        <YEmptyState v-bind="args">
          <template
            #actions
            v-if="args.isActionsSlotExists"
          >
            <YButton
              label="Primary action"
              variant="primary"
            ></YButton>
  
            <YButton
              label="Secondary action"
              variant="outline"
            ></YButton>
          </template>
        </YEmptyState>
      </div>
    `,
  }),
  argTypes: yCoreEmptyStateStoryMeta.argTypes,
  args: yCoreEmptyStateStoryMeta.args,
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
