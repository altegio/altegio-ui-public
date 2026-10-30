import type { Meta, StoryObj } from '@storybook/angular'
import { AltSimpleCheckbox } from '~ng/ui/simpleCheckbox'
import altCoreSimpleCheckboxStoryMeta from '~core/ui/simpleCheckbox/stories/SimpleCheckbox.stories'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'
import type { SimpleCheckboxCheckedEvent } from '../models/types'

/**
 * Angular wrapper for Core SimpleCheckbox
 */
const meta: Meta<AltSimpleCheckbox> = {
  title: 'Checkbox/🔍 SimpleCheckbox',
  id: 'simpleCheckbox',
  parameters: { controls: { sort: 'alpha' } },
  component: AltSimpleCheckbox,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      onChecked: (e: SimpleCheckboxCheckedEvent) => {
        action('checked')(e)
        updateArgs({ checked: e.detail.checked })
      },
    }

    return {
      props: {
        ...args,
        ...handlers,
      },
      template: `
        <AltSimpleCheckbox
          [size]="size"
          [checked]="checked"
          [indeterminate]="indeterminate"
          [error]="error"
          [disabled]="disabled"
          [hovered]="hovered"
          (checked)="onChecked($event)"
        >
        </AltSimpleCheckbox>
      `,
    }
  },
  argTypes: altCoreSimpleCheckboxStoryMeta.argTypes,
  args: altCoreSimpleCheckboxStoryMeta.args,
}

export default meta
type Story = StoryObj<AltSimpleCheckbox>

export const Playground: Story = { args: {} }
