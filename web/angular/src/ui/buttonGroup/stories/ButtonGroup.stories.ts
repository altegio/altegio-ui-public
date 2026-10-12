import type { Meta, StoryObj } from '@storybook/angular'
import yCoreButtonGroupStoryMeta from '~core/ui/buttonGroup/stories/ButtonGroup.stories'
import { YButtonGroup } from '~ng/ui/buttonGroup'
import { YButton } from '~ng/ui/button'

const meta: Meta<YButtonGroup> = {
  title: 'Buttons/✅ ButtonGroup',
  id: 'buttonGroup',
  parameters: { controls: { sort: 'alpha' } },
  component: YButtonGroup,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    moduleMetadata: { imports: [YButton] },
    props: { ...args },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <h3>ButtonGroup</h3>

        @for (i of [2, 3, 4, 5]; track i) {
          <YButtonGroup
            [size]="size"
            [variant]="variant"
          >
            @for (k of [0, 2, 3, 4, 5].slice(0, i); track k) {
              <YButton
                label="Item"
              ></YButton>
            }
          </YButtonGroup>
        }
      </div>
    `,
  }),

  argTypes: { ...yCoreButtonGroupStoryMeta.argTypes },
  args: { ...yCoreButtonGroupStoryMeta.args },
}

export default meta
type Story = StoryObj<YButtonGroup>

export const Default: Story = { args: {} }
