import type { Meta, StoryObj } from '@storybook/angular'
import { YSimpleCheckbox } from '~ng/ui/simpleCheckbox'
import yCoreSimpleCheckboxStoryMeta from '~core/ui/simpleCheckbox/stories/SimpleCheckbox.stories'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'
import type { SimpleCheckboxCheckedEvent } from '../models/types'

/**
 * Angular-обертка над Core SimpleCheckbox
 */
const meta: Meta<YSimpleCheckbox> = {
  title: 'Checkbox/🔍 SimpleCheckbox',
  id: 'simpleCheckbox',
  parameters: { controls: { sort: 'alpha' } },
  component: YSimpleCheckbox,
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
        <YSimpleCheckbox
          [size]="size"
          [checked]="checked"
          [indeterminate]="indeterminate"
          [error]="error"
          [disabled]="disabled"
          [hovered]="hovered"
          (checked)="onChecked($event)"
        >
        </YSimpleCheckbox>
      `,
    }
  },
  argTypes: yCoreSimpleCheckboxStoryMeta.argTypes,
  args: yCoreSimpleCheckboxStoryMeta.args,
}

export default meta
type Story = StoryObj<YSimpleCheckbox>

export const Playground: Story = { args: {} }
