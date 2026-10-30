import type { Meta, StoryObj } from '@storybook/angular'
import { action } from 'storybook/actions'
import altCoreChipStoryMeta from '~core/ui/chip/stories/Chip.stories'
import type { IAltNgChipProps } from '~ng/ui/chip/models/types'
import { AltChip } from '~ng/ui/chip'
import { useArgs } from 'storybook/preview-api'

const meta: Meta<IAltNgChipProps> = {
  title: '✅ Chip',
  id: 'chip',
  parameters: { controls: { sort: 'alpha' } },
  component: AltChip,
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
        <AltChip
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
  argTypes: { ...altCoreChipStoryMeta.argTypes },
  args: { ...altCoreChipStoryMeta.args },
} satisfies Meta<IAltNgChipProps>

export default meta
type Story = StoryObj<AltChip>

export const Default: Story = { args: {} }
