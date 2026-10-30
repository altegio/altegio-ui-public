import type { Meta, StoryObj } from '@storybook/angular'
import type { TAltNgCheckboxModel } from '~ng/ui/checkbox'
import { AltCheckbox } from '~ng/ui/checkbox'
import altCoreCheckboxStoryMeta, { type TAltCoreCheckboxStoryMeta } from '~core/ui/checkbox/stories/Checkbox.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'
import { FormsModule } from '@angular/forms'
import type { TAltNgControlValueTypes } from '~web/angular/src/types/ControlValueAccessorTypes'
import { omit } from 'radash'
import { getComponentStateTable, getComponentEmitsTable } from '~shared/.storybook/tables'

type TAltNgCheckboxControlValueTypes = TAltNgControlValueTypes<TAltNgCheckboxModel>
type TAltNgCheckboxMeta = AltCheckbox & Omit<TAltCoreCheckboxStoryMeta, 'checked'> & TAltNgCheckboxControlValueTypes

/**
 * Angular wrapper for Core Checkbox
 * Checkbox with a label and supporting text
 */
const meta: Meta<TAltNgCheckboxMeta> = {
  title: 'Checkbox/✅ Checkbox',
  id: 'checkbox',
  parameters: { controls: { sort: 'alpha' } },
  component: AltCheckbox,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      handleModelChange: (value: TAltNgCheckboxModel) => {
        action('ngModelChange')(value)
        updateArgs({ ngModel: value })
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
        <AltCheckbox
          (ngModelChange)="handleModelChange($event)"
          [ngModel]="ngModel"
          [labelText]="computedLabelText"
          [labelTooltipText]="computedLabelTooltipText"
          [annotationText]="computedAnnotationText"
          [size]="size"
          [disabled]="disabled"
          [required]="required"
          [indeterminate]="indeterminate"
          [errors]="errors"
          [alignment]="alignment"
          [labelOverflowDebounce]="labelOverflowDebounce"
          [labelTooltipPlacement]="labelTooltipPlacement"
        >
          <ng-template #checkboxLabel>
            Label Slot
          </ng-template>

          <ng-template #checkboxAnnotation>
            Annotation Slot
          </ng-template>

          <ng-template #tooltipContent>
            {{ tooltipContentSlot }}
          </ng-template>
        </AltCheckbox>
      `,
    }
  },
  argTypes: {
    ...omit(altCoreCheckboxStoryMeta.argTypes ?? {}, ['checked', 'onChecked']),
    ngModel: {
      type: 'boolean',
      description: 'Checkbox checked state',
      ...getComponentStateTable(false),
    },
    ngModelChange: {
      type: 'function',
      description: 'ngModel change event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...omit(altCoreCheckboxStoryMeta.args ?? {}, ['checked', 'onChecked']),
    ngModel: false,
  },
} satisfies Meta<TAltNgCheckboxMeta>

export default meta
type Story = StoryObj<AltCheckbox>

export const Playground: Story = { args: {} }
