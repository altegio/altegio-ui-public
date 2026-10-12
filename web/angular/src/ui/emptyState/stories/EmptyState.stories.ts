import type { Meta, StoryObj } from '@storybook/angular'
import { YEmptyState } from '~ng/ui/emptyState'
import yCoreEmptyStateStoryMeta, { type IYCoreEmptyStateStoryProps } from '~core/ui/emptyState/stories/EmptyState.stories'
import { YButton } from '~ng/ui/button'

/**
 * Angular wrapper for Core EmptyState
 */
const meta: Meta<YEmptyState & IYCoreEmptyStateStoryProps> = {
  title: '✅ EmptyState',
  id: 'emptyState',
  parameters: { controls: { sort: 'alpha' } },
  component: YEmptyState,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    return {
      moduleMetadata: { imports: [YButton] },
      props: { ...args },
      template: `
        <div style="max-width: 400px; margin-left: auto; margin-right: auto;">
          <YEmptyState
            [title]="title"
            [description]="description"
            [icon]="icon"
            [size]="size"
          >
            @if (isActionsSlotExists) {
              <YButton
                variant="primary"
                label="Primary button"
              ></YButton>
    
              <YButton
                variant="outline"
                label="Secondary button"
              ></YButton>
            }
          </YEmptyState>
        </div>
      `,
    }
  },
  argTypes: yCoreEmptyStateStoryMeta.argTypes,
  args: yCoreEmptyStateStoryMeta.args,
}

export default meta
type Story = StoryObj<YEmptyState>

export const Playground: Story = { args: {} }
