import { omit } from 'radash'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'
import { FormsModule } from '@angular/forms'
import type { Meta, StoryObj } from '@storybook/angular'
import { getComponentStateTable, getComponentEmitsTable } from '~shared/.storybook/tables'

import { YToggle } from '~ng/ui/toggle'
import yCoreToggleStoryMeta, { type IYCoreToggleStoryProps } from '~core/ui/toggle/stories/Toggle.stories'
import type { TYNgToggleModel } from '~ng/ui/toggle/models/types'
import type { TYNgControlValueTypes } from '~ng/types/ControlValueAccessorTypes'

import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { DEFAULT_CHECKED_VALUE } from '~core/ui/simpleToggle/models/types'

type TYNgToggleControlValueTypes = TYNgControlValueTypes<TYNgToggleModel>

type TYNgToggleMeta = YToggle & Omit<IYCoreToggleStoryProps, 'checked'> & TYNgToggleControlValueTypes

/**
 * Angular wrapper for Core Toggle
 */
const meta: Meta<TYNgToggleMeta> = {
  title: 'Toggle/✅ Toggle',
  id: 'toggle',
  parameters: { controls: { sort: 'alpha' } },
  component: YToggle,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      onModelChange: (newValue: TYNgToggleModel) => {
        action('ngModelChange')(newValue)
        updateArgs({ ngModel: newValue })
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
        <YToggle
          (ngModelChange)="onModelChange($event)"
          [ngModel]="ngModel"
          [disabled]="disabled"
          [size]="size"
          [alignment]="alignment"
          [labelText]="computedLabelText"
          [labelTooltipText]="computedLabelTooltipText"
          [annotationText]="computedAnnotationText"
        >
          <ng-template #annotation>
            {{computedAnnotationText}}
          </ng-template>

          <ng-template #tooltipContent>
            {{ tooltipContentSlot }}
          </ng-template>
        </YToggle>
      `,
    }
  },
  argTypes: {
    ...omit(yCoreToggleStoryMeta.argTypes ?? {}, ['checked', 'onChecked']),
    ngModel: {
      type: 'boolean',
      description: 'Toggle checked state',
      ...getComponentStateTable(DEFAULT_CHECKED_VALUE),
    },
    ngModelChange: {
      type: 'function',
      description: 'ngModel change event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...omit(yCoreToggleStoryMeta.args ?? {}, ['checked', 'onChecked']),
    ngModel: DEFAULT_CHECKED_VALUE,
  },
} satisfies Meta<TYNgToggleMeta>

export default meta
type Story = StoryObj<TYNgToggleMeta>

export const Playground: Story = { args: {} }
