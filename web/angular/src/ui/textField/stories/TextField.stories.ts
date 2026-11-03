import type { Meta, StoryObj } from '@storybook/angular'
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms'
import type { ValidatorFn } from '@angular/forms'
import { ERROR_LOCATOR, LABEL_LOCATOR, AltTextField } from '~ng/ui/textField'
import altCoreTextFieldStoryMeta, { type TAltCoreTextFieldMeta } from '~core/ui/textField/stories/TextField.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { omit } from 'radash'
import { action } from 'storybook/actions'
import type { TAltNgTextFieldModel } from '~ng/ui/textField/models/types'

import { useArgs } from 'storybook/preview-api'
import { MASK_EXAMPLES } from '~web/shared/.storybook/constants/maskExamples'
import { getComponentContentTable, getComponentEmitsTable, getComponentStateTable } from '~web/shared/.storybook/tables'
import type { TAltNgControlValueTypes } from '~web/angular/src/types/ControlValueAccessorTypes'
import { AltFieldIcon } from '~ng/ui/fieldIcon'
import { altSearch, altCopy } from '~shared/icons'

type IAltStoryBookTextFieldMeta = AltTextField & TAltCoreTextFieldMeta & TAltNgControlValueTypes<TAltNgTextFieldModel>

/**
 * Angular wrapper for Core InputField
 */
const meta: Meta<IAltStoryBookTextFieldMeta> = {
  title: 'Inputs/✅ TextField',
  id: 'textField',
  parameters: { controls: { sort: 'alpha' } },
  component: AltTextField,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      onModelChange: (ngModel: TAltNgTextFieldModel) => {
        action('onModelChange')(ngModel)
        updateArgs({ ngModel })
      },
      onFocusEmit: action('focus'),
      onBlurEmit: action('blur'),
      onClearEmit: action('clear'),
    }

    return {
      props: {
        ...args,
        ...handlers,
        computedLabelTooltipText: args.isLongText ? LOREM_IPSUM : args.labelTooltipText,
        computedLabelText: args.isLongText ? LOREM_IPSUM : args.labelText,
        computedAnnotationText: args.isLongText ? LOREM_IPSUM : args.annotationText,
        altSearch,
        altCopy,
      },
      moduleMetadata: { imports: [FormsModule, AltFieldIcon] },
      template: `
        <AltTextField
        (ngModelChange)="onModelChange($event)"
        (focus)="onFocusEmit($event)"
        (blur)="onBlurEmit($event)"
        (clear)="onClearEmit($event)"
        [ngModel]="ngModel"
        [name]="name"
        [placeholder]="placeholder"
        [autofocus]="autofocus"
        [type]="type"
        [disabled]="disabled"
        [readonly]="readonly"
        [maxlength]="maxlength"
        [errors]="errors"
        [error]="error"
        [clearable]="clearable"
        [maskOptions]="maskOptions"
        [size]="size"
        [required]="required"
        [labelText]="computedLabelText"
        [labelTooltipText]="computedLabelTooltipText"
        [labelDebounce]="labelDebounce"
        [locatorLabel]="locatorLabel"
        [locatorError]="locatorError"
        >
          @if (showBeforeSlot) {
            <ng-template #textFieldBefore>
              <AltFieldIcon
                [icon]="altSearch"
              ></AltFieldIcon>
            </ng-template>
          }
          <ng-template #textFieldAnnotation>
            textFieldAnnotationSlot: {{computedAnnotationText}}
          </ng-template>
          
          @if (showAfterSlot) {
            <ng-template #textFieldAfter>
              <AltFieldIcon
                [icon]="altCopy"
              ></AltFieldIcon>
          </ng-template>
          }
          </AltTextField>
        `,
    }
  },
  argTypes: {
    ...omit(altCoreTextFieldStoryMeta.argTypes ?? {}, ['readonly', 'value', 'onInput']),
    ngModel: {
      type: 'string',
      description: 'TextField ngModel value',
      ...getComponentStateTable(''),
    },
    ngModelChange: {
      type: 'function',
      description: 'ngModel change event',
      ...getComponentEmitsTable(),
    },
    locatorLabel: {
      type: 'string',
      description: 'Data locator for the label',
      ...getComponentContentTable(),
    },
    locatorError: {
      type: 'string',
      description: 'Data locator for the error',
      ...getComponentContentTable(),
    },
  },
  args: {
    ...omit(altCoreTextFieldStoryMeta.args ?? {}, ['readonly', 'value', 'onInput']),
    ngModel: '',
    locatorLabel: undefined,
    locatorError: undefined,
  },
} satisfies Meta<IAltStoryBookTextFieldMeta>

export default meta
type Story = StoryObj<IAltStoryBookTextFieldMeta>

export const Playground: Story = {
  args: {
    locatorLabel: LABEL_LOCATOR,
    locatorError: ERROR_LOCATOR,
  },
}

export const WithPhoneMask: Story = {
  name: 'With a phone mask',
  args: {
    labelText: 'Phone number',
    placeholder: '+7 (999) 999-99-99',
    maskOptions: MASK_EXAMPLES.phone,
  },
}

export const WithNumberMask: Story = {
  name: 'With a number mask',
  args: {
    labelText: 'Amount',
    placeholder: '0,00',
    maskOptions: MASK_EXAMPLES.number,
  },
}

export const WithCardMask: Story = {
  name: 'With a card mask and an error',
  args: {
    labelText: 'Card number',
    placeholder: '9999 9999 9999 9999',
    maskOptions: MASK_EXAMPLES.card,
    error: true,
    errors: ['Invalid input'],
  },
}

export const WithRequiredValidation: Story = {
  name: 'Required field',
  args: {
    labelText: 'Required field',
    placeholder: 'Enter a value',
    required: true,
    errors: ['This field is required'],
  },
}

export const WithFormControlAutoRequired: Story = {
  name: 'Infer required from formControl',
  render: (args) => ({
    props: {
      ...args,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      nameControl: new FormControl('', [Validators.required]),
    },
    moduleMetadata: { imports: [ReactiveFormsModule] },
    template: `
      <AltTextField
        [formControl]="nameControl"
        [labelText]="'Name'"
        [placeholder]="'Enter a name'"
        [errors]="['This field is required']"
      />
    `,
  }),
}

export const WithAutoErrorMessages: Story = {
  name: 'Extract errors from formControl',
  render: () => {
    const requiredValidator: ValidatorFn = (control) => {
      if (!control.value) {
        return { required: { message: 'This field is required' } }
      }
      return null
    }

    const fullNameValidator: ValidatorFn = (control) => {
      const value = control.value as string
      if (value && (/\d/).test(value)) {
        return { fullName: { message: 'The name must not contain numbers' } }
      }
      return null
    }

    const nameControl = new FormControl('', [requiredValidator, fullNameValidator])

    return {
      props: { nameControl },
      moduleMetadata: { imports: [ReactiveFormsModule] },
      template: `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <AltTextField
            [formControl]="nameControl"
            [labelText]="'Name'"
            [placeholder]="'Enter a name'"
          />

          <div style="font-size: 12px; color: #666;">
            <div>
              1. The field is required
            </div>

            <div>
              2. The field must not contain numbers
            </div>
          </div>
        </div>
      `,
    }
  },
}
