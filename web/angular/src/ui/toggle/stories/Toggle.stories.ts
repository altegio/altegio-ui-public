import { omit } from 'radash'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'
import { FormsModule } from '@angular/forms'
import type { Meta, StoryObj } from '@storybook/angular'
import { getComponentStateTable, getComponentEmitsTable } from '~shared/.storybook/tables'

import { AltToggle } from '~ng/ui/toggle'
import altCoreToggleStoryMeta, { type IAltCoreToggleStoryProps } from '~core/ui/toggle/stories/Toggle.stories'
import type { TAltNgToggleModel } from '~ng/ui/toggle/models/types'
import type { TAltNgControlValueTypes } from '~ng/types/ControlValueAccessorTypes'

import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { DEFAULT_CHECKED_VALUE } from '~core/ui/simpleToggle/models/types'

type TAltNgToggleControlValueTypes = TAltNgControlValueTypes<TAltNgToggleModel>

type TAltNgToggleMeta = AltToggle & Omit<IAltCoreToggleStoryProps, 'checked'> & TAltNgToggleControlValueTypes

/**
 * Angular wrapper for Core Toggle
 */
const meta: Meta<TAltNgToggleMeta> = {
  title: 'Toggle/✅ Toggle',
  id: 'toggle',
  parameters: { controls: { sort: 'alpha' } },
  component: AltToggle,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      onModelChange: (newValue: TAltNgToggleModel) => {
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
        <AltToggle
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
        </AltToggle>
      `,
    }
  },
  argTypes: {
    ...omit(altCoreToggleStoryMeta.argTypes ?? {}, ['checked', 'onChecked']),
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
    ...omit(altCoreToggleStoryMeta.args ?? {}, ['checked', 'onChecked']),
    ngModel: DEFAULT_CHECKED_VALUE,
  },
} satisfies Meta<TAltNgToggleMeta>

export default meta
type Story = StoryObj<TAltNgToggleMeta>

export const Playground: Story = { args: {} }
