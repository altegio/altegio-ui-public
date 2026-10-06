import { omit } from 'radash'
import { FormsModule } from '@angular/forms'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/angular'
import { getComponentStateTable, getComponentEmitsTable } from '~shared/.storybook/tables'

import { YCountField } from '~ng/ui/countField'
import yCoreCountFieldStoryMeta, { type TYCoreCountFieldMeta } from '~core/ui/countField/stories/CountField.stories'
import { DEFAULT_NUMBER_VALUE } from '~core/ui/countField/models/types'
import type { BlurEvent } from '~core/ui/cardWrapper/models/types'
import type { KeydownEvent } from '~core/ui/fieldInput/models/types'
import type { TYNgCountFieldModel } from '~ng/ui/countField/models/types'
import type { TYNgControlValueTypes } from '~ng/types/ControlValueAccessorTypes'

type TYNgCountFieldControlValueTypes = TYNgControlValueTypes<TYNgCountFieldModel>

type TYNgCountFieldMeta = YCountField & Omit<TYCoreCountFieldMeta, 'value'> & TYNgCountFieldControlValueTypes

/**
 * Angular-обертка над Core CountField
 */
const meta: Meta<TYNgCountFieldMeta> = {
  title: '🔍 CountField',
  id: 'countField',
  parameters: { controls: { sort: 'alpha' } },
  component: YCountField,
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

    const handleModelChange = (newValue: TYNgCountFieldModel) => {
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
          <YCountField
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
          ></YCountField>
        </div>
        `,
    }
  },
  argTypes: {
    ...omit(yCoreCountFieldStoryMeta.argTypes ?? {}, ['readonly', 'value', 'onChangedValue']),
    ngModel: {
      type: 'number',
      description: 'Состояние счётчика',
      ...getComponentStateTable(DEFAULT_NUMBER_VALUE),
    },
    ngModelChange: {
      type: 'function',
      description: 'Событие изменения ngModel',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...omit(yCoreCountFieldStoryMeta.args ?? {}, ['readonly', 'value', 'onChangedValue']),
    ngModel: DEFAULT_NUMBER_VALUE,
  },
} satisfies Meta<TYNgCountFieldMeta>

export default meta
type Story = StoryObj<YCountField>

export const Playground: Story = { args: {} }
