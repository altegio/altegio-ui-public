import type { Meta, StoryObj } from '@storybook/angular'
import type { IYNgRadioButtonProps, TYNgRadioButtonModel } from '~ng/ui/radioButton'
import { YRadioButton } from '~ng/ui/radioButton'
import yCoreRadioButtonStoryMeta from '~core/ui/radioButton/stories/RadioButton.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'
import { DEFAULT_CHECKED_VALUE } from '../models/constants'
import { omit } from 'radash'
import { getComponentStateTable, getComponentEmitsTable } from '~web/shared/.storybook/tables'
import { FormsModule } from '@angular/forms'
import type { IYCoreRadioButtonStoryProps } from '~core/ui/radioButton/stories/RadioButton.stories'
import type { TYNgControlValueTypes } from '~web/angular/src/types/ControlValueAccessorTypes'

/**
 * Angular wrapper for Core RadioButton
 */

type TYRadioButtonStoriesMeta = IYCoreRadioButtonStoryProps & IYNgRadioButtonProps & TYNgControlValueTypes<TYNgRadioButtonModel>

const meta: Meta<TYRadioButtonStoriesMeta> = {
  title: 'RadioButton/🔍 RadioButton',
  id: 'radioButton',
  parameters: { controls: { sort: 'alpha' } },
  component: YRadioButton,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      ngModelChange: (ngModel: TYNgRadioButtonModel) => {
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
        <YRadioButton
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
        </YRadioButton>
      `,
    }
  },
  argTypes: {
    ...omit({ ...yCoreRadioButtonStoryMeta.argTypes }, ['checked', 'onChecked']),
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
    ...omit({ ...yCoreRadioButtonStoryMeta.args }, ['checked', 'onChecked']),
    ngModel: DEFAULT_CHECKED_VALUE,
  },
}

export default meta
type Story = StoryObj<TYRadioButtonStoriesMeta>

export const Playground: Story = { args: {} }
