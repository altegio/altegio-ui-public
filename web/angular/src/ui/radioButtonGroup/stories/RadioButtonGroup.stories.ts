import type { Meta, StoryObj } from '@storybook/angular'

import { YRadioButtonGroup } from '~ng/ui/radioButtonGroup'
import yCoreRadioButtonGroupStoryMeta from '~core/ui/radioButtonGroup/stories/RadioButtonGroup.stories'
import { YRadioButton } from '~ng/ui/radioButton'

/**
 * Angular-обертка над Core RadioButtonGroup
 */
const meta: Meta<YRadioButtonGroup> = {
  title: 'RadioButton/⚠️ RadioButtonGroup',
  id: 'radioButtonGroup',
  parameters: { controls: { sort: 'alpha' } },
  component: YRadioButtonGroup,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    moduleMetadata: { imports: [YRadioButton] },
    props: { ...args },
    template: `
      <YRadioButtonGroup
        [value]="value"
        [size]="size"
        [direction]="direction"
        [alignment]="alignment"
        [labelText]="labelText"
        [labelTooltipText]="labelTooltipText"
        [labelDebounce]="labelDebounce"
        [labelTooltipActive]="labelTooltipActive"
      >
        @for (i of [1, 2, 3]; track i) {
          <YRadioButton [value]="i" labelText="Радио-кнопка со значением {{ i }}">
            <div radio-button-annotation>
              Текст аннотации {{ i }}
            </div>
          </YRadioButton>
          }
      </YRadioButtonGroup>`,
  }),
  argTypes: { ...yCoreRadioButtonGroupStoryMeta.argTypes },
  args: { ...yCoreRadioButtonGroupStoryMeta.args },
} satisfies Meta<YRadioButtonGroup>

export default meta
type Story = StoryObj<YRadioButtonGroup>

export const Playground: Story = { args: {} }
