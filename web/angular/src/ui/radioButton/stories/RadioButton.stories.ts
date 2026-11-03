import type { Meta, StoryObj } from '@storybook/angular'
import type { IAltNgRadioButtonProps, TAltNgRadioButtonModel } from '~ng/ui/radioButton'
import { AltRadioButton } from '~ng/ui/radioButton'
import altCoreRadioButtonStoryMeta from '~core/ui/radioButton/stories/RadioButton.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'
import { DEFAULT_CHECKED_VALUE } from '../models/constants'
import { omit } from 'radash'
import { getComponentStateTable, getComponentEmitsTable } from '~web/shared/.storybook/tables'
import { FormsModule } from '@angular/forms'
import type { IAltCoreRadioButtonStoryProps } from '~core/ui/radioButton/stories/RadioButton.stories'
import type { TAltNgControlValueTypes } from '~web/angular/src/types/ControlValueAccessorTypes'

/**
 * Angular wrapper for Core RadioButton
 */

type TAltRadioButtonStoriesMeta = IAltCoreRadioButtonStoryProps & IAltNgRadioButtonProps & TAltNgControlValueTypes<TAltNgRadioButtonModel>

const meta: Meta<TAltRadioButtonStoriesMeta> = {
  title: 'RadioButton/🔍 RadioButton',
  id: 'radioButton',
  parameters: { controls: { sort: 'alpha' } },
  component: AltRadioButton,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      ngModelChange: (ngModel: TAltNgRadioButtonModel) => {
        action('ngModelChange')(ngModel)
        updateArgs({ ngModel })
      },
    }

    return {
      props: {
        ...args,
        ...handlers,
        computedLabelText: args.isLongText ? LOREM_IPSUM : args.labelText,
        computedLabelTooltipText: args.isLongText ? LOREM_IPSUM : args.labelTooltipText,
        computedAnnotationText: args.isLongText ? LOREM_IPSUM : args.annotationText,
      },
      moduleMetadata: { imports: [FormsModule] },
      template: `
        <AltRadioButton
          (ngModelChange)="ngModelChange($event)"
          [ngModel]="ngModel"
          [labelText]="computedLabelText"
          [labelTooltipText]="computedLabelTooltipText"
          [annotationText]="computedAnnotationText"
          [size]="size"
          [disabled]="disabled"
          [required]="required"
          [errors]="errors"
          [alignment]="alignment"
          [labelOverflowDebounce]="labelOverflowDebounce"
        >
          <ng-template #radioButtonAnnotation>
            radioButtonAnnotationSlot: {{computedAnnotationText}}
          </ng-template>

          <ng-template #radioButtonTooltipContent>
            {{ tooltipContentSlot }}
          </ng-template>
        </AltRadioButton>
      `,
    }
  },
  argTypes: {
    ...omit({ ...altCoreRadioButtonStoryMeta.argTypes }, ['checked', 'onChecked']),
    ngModel: {
      type: 'boolean',
      description: 'RadioButton checked state',
      ...getComponentStateTable(DEFAULT_CHECKED_VALUE),
    },
    ngModelChange: {
      type: 'function',
      description: 'ngModel change event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...omit({ ...altCoreRadioButtonStoryMeta.args }, ['checked', 'onChecked']),
    ngModel: DEFAULT_CHECKED_VALUE,
  },
}

export default meta
type Story = StoryObj<TAltRadioButtonStoriesMeta>

export const Playground: Story = { args: {} }
