import type { Meta, StoryObj } from '@storybook/angular'
import { AltEmptyState } from '~ng/ui/emptyState'
import altCoreEmptyStateStoryMeta, { type IAltCoreEmptyStateStoryProps } from '~core/ui/emptyState/stories/EmptyState.stories'
import { AltButton } from '~ng/ui/button'

/**
 * Angular wrapper for Core EmptyState
 */
const meta: Meta<AltEmptyState & IAltCoreEmptyStateStoryProps> = {
  title: '✅ EmptyState',
  id: 'emptyState',
  parameters: { controls: { sort: 'alpha' } },
  component: AltEmptyState,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    return {
      moduleMetadata: { imports: [AltButton] },
      props: { ...args },
      template: `
        <div style="max-width: 400px; margin-left: auto; margin-right: auto;">
          <AltEmptyState
            [title]="title"
            [description]="description"
            [icon]="icon"
            [size]="size"
          >
            @if (isActionsSlotExists) {
              <AltButton
                variant="primary"
                label="Primary button"
              ></AltButton>
    
              <AltButton
                variant="outline"
                label="Secondary button"
              ></AltButton>
            }
          </AltEmptyState>
        </div>
      `,
    }
  },
  argTypes: altCoreEmptyStateStoryMeta.argTypes,
  args: altCoreEmptyStateStoryMeta.args,
}

export default meta
type Story = StoryObj<AltEmptyState>

export const Playground: Story = { args: {} }
