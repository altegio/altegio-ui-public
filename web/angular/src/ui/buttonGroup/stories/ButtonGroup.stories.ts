import type { Meta, StoryObj } from '@storybook/angular'
import altCoreButtonGroupStoryMeta from '~core/ui/buttonGroup/stories/ButtonGroup.stories'
import { AltButtonGroup } from '~ng/ui/buttonGroup'
import { AltButton } from '~ng/ui/button'

const meta: Meta<AltButtonGroup> = {
  title: 'Buttons/✅ ButtonGroup',
  id: 'buttonGroup',
  parameters: { controls: { sort: 'alpha' } },
  component: AltButtonGroup,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    moduleMetadata: { imports: [AltButton] },
    props: { ...args },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <h3>ButtonGroup</h3>

        @for (i of [2, 3, 4, 5]; track i) {
          <AltButtonGroup
            [size]="size"
            [variant]="variant"
          >
            @for (k of [0, 2, 3, 4, 5].slice(0, i); track k) {
              <AltButton
                label="Item"
              ></AltButton>
            }
          </AltButtonGroup>
        }
      </div>
    `,
  }),

  argTypes: { ...altCoreButtonGroupStoryMeta.argTypes },
  args: { ...altCoreButtonGroupStoryMeta.args },
}

export default meta
type Story = StoryObj<AltButtonGroup>

export const Default: Story = { args: {} }
