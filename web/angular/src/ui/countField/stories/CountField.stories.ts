import { omit } from 'radash'
import { FormsModule } from '@angular/forms'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/angular'
import { getComponentStateTable, getComponentEmitsTable } from '~shared/.storybook/tables'

import { AltCountField } from '~ng/ui/countField'
import altCoreCountFieldStoryMeta, { type TAltCoreCountFieldMeta } from '~core/ui/countField/stories/CountField.stories'
import { DEFAULT_NUMBER_VALUE } from '~core/ui/countField/models/types'
import type { BlurEvent } from '~core/ui/cardWrapper/models/types'
import type { KeydownEvent } from '~core/ui/fieldInput/models/types'
import type { TAltNgCountFieldModel } from '~ng/ui/countField/models/types'
import type { TAltNgControlValueTypes } from '~ng/types/ControlValueAccessorTypes'

type TAltNgCountFieldControlValueTypes = TAltNgControlValueTypes<TAltNgCountFieldModel>

type TAltNgCountFieldMeta = AltCountField & Omit<TAltCoreCountFieldMeta, 'value'> & TAltNgCountFieldControlValueTypes

/**
 * Angular wrapper for Core CountField
 */
const meta: Meta<TAltNgCountFieldMeta> = {
  title: '🔍 CountField',
  id: 'countField',
  parameters: { controls: { sort: 'alpha' } },
  component: AltCountField,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handleFocus = (event: FocusEvent) => {
      action('focus')(event)
    }

    const handleBlur = (event: BlurEvent) => {
      action('blur')(event)
    }

    const handleKeydown = (event: KeydownEvent) => {
      action('keydown')(event)
    }

    const handleModelChange = (newValue: TAltNgCountFieldModel) => {
      action('ngModelChange')(newValue)
      updateArgs({ ngModel: newValue })
    }

    return {
      props: {
        ...args,
        handleModelChange,
        handleFocus,
        handleBlur,
        handleKeydown,
        computedErrors: args.errors ?? args.showErrors,
      },
      moduleMetadata: { imports: [FormsModule] },
      template: `
        <div style="width: 250px">
          <AltCountField
            (ngModelChange)="handleModelChange($event)"
            [ngModel]="ngModel"
            [min]="min"
            [max]="max"
            [disabled]="disabled"
            [readonly]="readonly"
            [error]="error"
            [size]="size"
            [placeholder]="placeholder"
            [required]="required"
            [autofocus]="autofocus"
            [labelText]="labelText"
            [labelTooltipText]="labelTooltipText"
            [labelDebounce]="labelDebounce"
            [annotationText]="annotationText"
            [errors]="computedErrors"
            [name]="name"
            (focus)="handleFocus($event)"
            (blur)="handleBlur($event)"
            (keydown)="handleKeydown($event)"
          ></AltCountField>
        </div>
        `,
    }
  },
  argTypes: {
    ...omit(altCoreCountFieldStoryMeta.argTypes ?? {}, ['readonly', 'value', 'onChangedValue']),
    ngModel: {
      type: 'number',
      description: 'Counter value',
      ...getComponentStateTable(DEFAULT_NUMBER_VALUE),
    },
    ngModelChange: {
      type: 'function',
      description: 'ngModel change event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...omit(altCoreCountFieldStoryMeta.args ?? {}, ['readonly', 'value', 'onChangedValue']),
    ngModel: DEFAULT_NUMBER_VALUE,
  },
} satisfies Meta<TAltNgCountFieldMeta>

export default meta
type Story = StoryObj<AltCountField>

export const Playground: Story = { args: {} }
