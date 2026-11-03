import type { Meta, StoryObj } from '@storybook/angular'
import { useArgs } from 'storybook/preview-api'

import { AltSimpleToggle } from '~ng/ui/simpleToggle'

import { omit } from 'radash'
import altCoreSimpleToggleStoryMeta from '~core/ui/simpleToggle/stories/SimpleToggle.stories'
import type { SimpleToggleCheckedEvent } from '~core/ui/simpleToggle/models/types/events'

/**
 * Angular wrapper for Core SimpleToggle
 */
const meta: Meta<AltSimpleToggle> = {
  title: 'Toggle/🔍 SimpleToggle',
  id: 'simpleToggle',
  parameters: { controls: { sort: 'alpha' } },
  component: AltSimpleToggle,
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
        <AltSimpleToggle
          [checked]="checked"
          [disabled]="disabled"
          [size]="size"
          (checked)="onChecked($event)"
        >
        </AltSimpleToggle>
      `,
    }
  },
  argTypes: omit(
    altCoreSimpleToggleStoryMeta.argTypes ?? {},
    ['onChecked'],
  ),
  args: {
    ...omit(
      altCoreSimpleToggleStoryMeta.args ?? {},
      ['onChecked'],
    ),
  },
} satisfies Meta<AltSimpleToggle>

export default meta
type Story = StoryObj<AltSimpleToggle>

export const Playground: Story = { args: {} }
