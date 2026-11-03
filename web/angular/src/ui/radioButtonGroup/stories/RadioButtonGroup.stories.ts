import type { Meta, StoryObj } from '@storybook/angular'

import { AltRadioButtonGroup } from '~ng/ui/radioButtonGroup'
import altCoreRadioButtonGroupStoryMeta from '~core/ui/radioButtonGroup/stories/RadioButtonGroup.stories'
import { AltRadioButton } from '~ng/ui/radioButton'

/**
 * Angular wrapper for Core RadioButtonGroup
 */
const meta: Meta<AltRadioButtonGroup> = {
  title: 'RadioButton/⚠️ RadioButtonGroup',
  id: 'radioButtonGroup',
  parameters: { controls: { sort: 'alpha' } },
  component: AltRadioButtonGroup,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    moduleMetadata: { imports: [AltRadioButton] },
    props: { ...args },
    template: `
      <AltRadioButtonGroup
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
          <AltRadioButton [value]="i" labelText="Radio button with value {{ i }}">
            <div radio-button-annotation>
              Annotation text {{ i }}
            </div>
          </AltRadioButton>
          }
      </AltRadioButtonGroup>`,
  }),
  argTypes: { ...altCoreRadioButtonGroupStoryMeta.argTypes },
  args: { ...altCoreRadioButtonGroupStoryMeta.args },
} satisfies Meta<AltRadioButtonGroup>

export default meta
type Story = StoryObj<AltRadioButtonGroup>

export const Playground: Story = { args: {} }
