import type { Meta, StoryObj } from '@storybook/angular'
import type { TYNgCheckboxModel } from '~ng/ui/checkbox'
import { YCheckbox } from '~ng/ui/checkbox'
import yCoreCheckboxStoryMeta, { type TYCoreCheckboxStoryMeta } from '~core/ui/checkbox/stories/Checkbox.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'
import { FormsModule } from '@angular/forms'
import type { TYNgControlValueTypes } from '~web/angular/src/types/ControlValueAccessorTypes'
import { omit } from 'radash'
import { getComponentStateTable, getComponentEmitsTable } from '~shared/.storybook/tables'

type TYNgCheckboxControlValueTypes = TYNgControlValueTypes<TYNgCheckboxModel>
type TYNgCheckboxMeta = YCheckbox & Omit<TYCoreCheckboxStoryMeta, 'checked'> & TYNgCheckboxControlValueTypes

/**
 * Angular-обертка над Core Checkbox
 * Комплексный чекбокс с лейблом и аннотацией
 */
const meta: Meta<TYNgCheckboxMeta> = {
  title: 'Checkbox/✅ Checkbox',
  id: 'checkbox',
  parameters: { controls: { sort: 'alpha' } },
  component: YCheckbox,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      handleModelChange: (value: TYNgCheckboxModel) => {
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
        <YCheckbox
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
        </YCheckbox>
      `,
    }
  },
  argTypes: {
    ...omit(yCoreCheckboxStoryMeta.argTypes ?? {}, ['checked', 'onChecked']),
    ngModel: {
      type: 'boolean',
      description: 'Состояние чекбокса',
      ...getComponentStateTable(false),
    },
    ngModelChange: {
      type: 'function',
      description: 'Событие изменения ngModel',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...omit(yCoreCheckboxStoryMeta.args ?? {}, ['checked', 'onChecked']),
    ngModel: false,
  },
} satisfies Meta<TYNgCheckboxMeta>

export default meta
type Story = StoryObj<YCheckbox>

export const Playground: Story = { args: {} }
