import type { Meta, StoryObj } from '@storybook/angular'
import { action } from '@storybook/addon-actions'
import yCoreChipStoryMeta from '~core/ui/chip/stories/Chip.stories'
import type { IYNgChipProps } from '~ng/ui/chip/models/types'
import { YChip } from '~ng/ui/chip'
import { useArgs } from '@storybook/preview-api'

const meta: Meta<IYNgChipProps> = {
  title: '✅ Chip',
  id: 'chip',
  parameters: { controls: { sort: 'alpha' } },
  component: YChip,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      onClick: (e: PointerEvent) => {
        action('click')(e)
        updateArgs({ active: !args.active })
      },
    }

    return {
      props: {
        ...args,
        ...handlers,
      },
      template: `
        <YChip
          [labelText]="labelText"
          [iconLeft]="iconLeft"
          [size]="size"
          [active]="active"
          [disabled]="disabled"
          (click)="onClick()"
        />
      `,
    }
  },
  argTypes: { ...yCoreChipStoryMeta.argTypes },
  args: { ...yCoreChipStoryMeta.args },
} satisfies Meta<IYNgChipProps>

export default meta
type Story = StoryObj<YChip>

export const Default: Story = { args: {} }
