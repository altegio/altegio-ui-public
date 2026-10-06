import type { Meta, StoryObj } from '@storybook/angular'
import { useArgs } from '@storybook/preview-api'

import { YSimpleToggle } from '~ng/ui/simpleToggle'

import { omit } from 'radash'
import yCoreSimpleToggleStoryMeta from '~core/ui/simpleToggle/stories/SimpleToggle.stories'
import type { SimpleToggleCheckedEvent } from '~core/ui/simpleToggle/models/types/events'

/**
 * Angular wrapper for Core SimpleToggle
 */
const meta: Meta<YSimpleToggle> = {
  title: 'Toggle/🔍 SimpleToggle',
  id: 'simpleToggle',
  parameters: { controls: { sort: 'alpha' } },
  component: YSimpleToggle,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    return {
      props: {
        ...args,
        onChecked: ({ detail: { checked } }: SimpleToggleCheckedEvent) => {
          updateArgs({ checked })
        },
      },
      template: `
        <YSimpleToggle
          [checked]="checked"
          [disabled]="disabled"
          [size]="size"
          (checked)="onChecked($event)"
        >
        </YSimpleToggle>
      `,
    }
  },
  argTypes: omit(
    yCoreSimpleToggleStoryMeta.argTypes ?? {},
    ['onChecked'],
  ),
  args: {
    ...omit(
      yCoreSimpleToggleStoryMeta.args ?? {},
      ['onChecked'],
    ),
  },
} satisfies Meta<YSimpleToggle>

export default meta
type Story = StoryObj<YSimpleToggle>

export const Playground: Story = { args: {} }
