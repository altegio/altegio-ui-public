import type { Meta, StoryObj } from '@storybook/angular'
import { omit } from 'radash'
import { useArgs } from '@storybook/preview-api'
import { YSimpleRadioButton } from '~ng/ui/simpleRadioButton'
import yCoreSimpleRadioButtonStoryMeta from '~core/ui/simpleRadioButton/stories/SimpleRadioButton.stories'
import type { IYNgSimpleRadioButtonProps, TYNgSimpleRadioButtonModel } from '~ng/ui/simpleRadioButton/models/types'
import { action } from '@storybook/addon-actions'
import { getComponentStateTable, getComponentEmitsTable } from '~web/shared/.storybook/tables'
import { DEFAULT_CHECKED_VALUE } from '../models/constants'
import type { TYNgControlValueTypes } from '~web/angular/src/types/ControlValueAccessorTypes'
import { FormsModule } from '@angular/forms'

type YSimpleRadioButtonStory = IYNgSimpleRadioButtonProps & TYNgControlValueTypes<TYNgSimpleRadioButtonModel>

/**
 * Angular-обертка над Core SimpleRadioButton
 */
const meta: Meta<YSimpleRadioButtonStory> = {
  title: 'RadioButton/🔍 SimpleRadioButton',
  id: 'simpleRadioButton',
  parameters: { controls: { sort: 'alpha' } },
  component: YSimpleRadioButton,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      ngModelChange: (ngModel: TYNgSimpleRadioButtonModel) => {
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
        <YSimpleRadioButton
          (ngModelChange)="ngModelChange($event)"
          [ngModel]="ngModel"
          [size]="size"
          [error]="error"
          [disabled]="disabled"
          [hovered]="hovered"
        >
        </YSimpleRadioButton>
      `,
    }
  },
  argTypes: {
    ...omit({ ...yCoreSimpleRadioButtonStoryMeta.argTypes }, ['checked', 'onChecked']),
    ngModel: {
      type: 'boolean',
      description: 'Состояние SimpleRadioButton',
      ...getComponentStateTable(DEFAULT_CHECKED_VALUE),
    },
    ngModelChange: {
      type: 'function',
      description: 'Событие изменения ngModel',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...omit({ ...yCoreSimpleRadioButtonStoryMeta.args }, ['checked', 'onChecked']),
    ngModel: DEFAULT_CHECKED_VALUE,
  },
}

export default meta
type Story = StoryObj<YSimpleRadioButtonStory>

export const Playground: Story = { args: {} }
