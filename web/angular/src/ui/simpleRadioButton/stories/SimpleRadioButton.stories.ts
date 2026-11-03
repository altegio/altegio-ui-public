import type { Meta, StoryObj } from '@storybook/angular'
import { omit } from 'radash'
import { useArgs } from 'storybook/preview-api'
import { AltSimpleRadioButton } from '~ng/ui/simpleRadioButton'
import altCoreSimpleRadioButtonStoryMeta from '~core/ui/simpleRadioButton/stories/SimpleRadioButton.stories'
import type { IAltNgSimpleRadioButtonProps, TAltNgSimpleRadioButtonModel } from '~ng/ui/simpleRadioButton/models/types'
import { action } from 'storybook/actions'
import { getComponentStateTable, getComponentEmitsTable } from '~web/shared/.storybook/tables'
import { DEFAULT_CHECKED_VALUE } from '../models/constants'
import type { TAltNgControlValueTypes } from '~web/angular/src/types/ControlValueAccessorTypes'
import { FormsModule } from '@angular/forms'

type AltSimpleRadioButtonStory = IAltNgSimpleRadioButtonProps & TAltNgControlValueTypes<TAltNgSimpleRadioButtonModel>

/**
 * Angular wrapper for Core SimpleRadioButton
 */
const meta: Meta<AltSimpleRadioButtonStory> = {
  title: 'RadioButton/🔍 SimpleRadioButton',
  id: 'simpleRadioButton',
  parameters: { controls: { sort: 'alpha' } },
  component: AltSimpleRadioButton,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      ngModelChange: (ngModel: TAltNgSimpleRadioButtonModel) => {
        action('ngModelChange')(ngModel)
        updateArgs({ ngModel })
      },
    }

    return {
      props: {
        ...args,
        ...handlers,
      },
      moduleMetadata: { imports: [FormsModule] },
      template: `
        <AltSimpleRadioButton
          (ngModelChange)="ngModelChange($event)"
          [ngModel]="ngModel"
          [size]="size"
          [error]="error"
          [disabled]="disabled"
          [hovered]="hovered"
        >
        </AltSimpleRadioButton>
      `,
    }
  },
  argTypes: {
    ...omit({ ...altCoreSimpleRadioButtonStoryMeta.argTypes }, ['checked', 'onChecked']),
    ngModel: {
      type: 'boolean',
      description: 'SimpleRadioButton checked state',
      ...getComponentStateTable(DEFAULT_CHECKED_VALUE),
    },
    ngModelChange: {
      type: 'function',
      description: 'ngModel change event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...omit({ ...altCoreSimpleRadioButtonStoryMeta.args }, ['checked', 'onChecked']),
    ngModel: DEFAULT_CHECKED_VALUE,
  },
}

export default meta
type Story = StoryObj<AltSimpleRadioButtonStory>

export const Playground: Story = { args: {} }
