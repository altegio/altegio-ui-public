import type { Meta, StoryObj } from '@storybook/angular'
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms'
import type { ValidatorFn } from '@angular/forms'
import { ERROR_LOCATOR, LABEL_LOCATOR, YTextField } from '~ng/ui/textField'
import yCoreTextFieldStoryMeta, { type TYCoreTextFieldMeta } from '~core/ui/textField/stories/TextField.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { omit } from 'radash'
import { action } from '@storybook/addon-actions'
import type { TYNgTextFieldModel } from '~ng/ui/textField/models/types'

import { useArgs } from '@storybook/preview-api'
import { MASK_EXAMPLES } from '~web/shared/.storybook/constants/maskExamples'
import { getComponentContentTable, getComponentEmitsTable, getComponentStateTable } from '~web/shared/.storybook/tables'
import type { TYNgControlValueTypes } from '~web/angular/src/types/ControlValueAccessorTypes'
import { YFieldIcon } from '~ng/ui/fieldIcon'
import { ySearch, yCopy } from '~shared/icons'

type IYStoryBookTextFieldMeta = YTextField & TYCoreTextFieldMeta & TYNgControlValueTypes<TYNgTextFieldModel>

/**
 * Angular-обертка над Core InputField
 */
const meta: Meta<IYStoryBookTextFieldMeta> = {
  title: 'Inputs/✅ TextField',
  id: 'textField',
  parameters: { controls: { sort: 'alpha' } },
  component: YTextField,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      onModelChange: (ngModel: TYNgTextFieldModel) => {
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
        ySearch,
        yCopy,
      },
      moduleMetadata: { imports: [FormsModule, YFieldIcon] },
      template: `
        <YTextField
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
              <YFieldIcon
                [icon]="ySearch"
              ></YFieldIcon>
            </ng-template>
          }
          <ng-template #textFieldAnnotation>
            textFieldAnnotationSlot: {{computedAnnotationText}}
          </ng-template>
          
          @if (showAfterSlot) {
            <ng-template #textFieldAfter>
              <YFieldIcon
                [icon]="yCopy"
              ></YFieldIcon>
          </ng-template>
          }
          </YTextField>
        `,
    }
  },
  argTypes: {
    ...omit(yCoreTextFieldStoryMeta.argTypes ?? {}, ['readonly', 'value', 'onInput']),
    ngModel: {
      type: 'string',
      description: 'Значение ngModel в TextField',
      ...getComponentStateTable(''),
    },
    ngModelChange: {
      type: 'function',
      description: 'Событие изменения ngModel',
      ...getComponentEmitsTable(),
    },
    locatorLabel: {
      type: 'string',
      description: 'Локатор для лейбла',
      ...getComponentContentTable(),
    },
    locatorError: {
      type: 'string',
      description: 'Локатор для ошибки',
      ...getComponentContentTable(),
    },
  },
  args: {
    ...omit(yCoreTextFieldStoryMeta.args ?? {}, ['readonly', 'value', 'onInput']),
    ngModel: '',
    locatorLabel: undefined,
    locatorError: undefined,
  },
} satisfies Meta<IYStoryBookTextFieldMeta>

export default meta
type Story = StoryObj<IYStoryBookTextFieldMeta>

export const Playground: Story = {
  args: {
    locatorLabel: LABEL_LOCATOR,
    locatorError: ERROR_LOCATOR,
  },
}

export const WithPhoneMask: Story = {
  name: 'С маской телефона',
  args: {
    labelText: 'Номер телефона',
    placeholder: '+7 (999) 999-99-99',
    maskOptions: MASK_EXAMPLES.phone,
  },
}

export const WithNumberMask: Story = {
  name: 'С маской числа',
  args: {
    labelText: 'Сумма',
    placeholder: '0,00',
    maskOptions: MASK_EXAMPLES.number,
  },
}

export const WithCardMask: Story = {
  name: 'С маской карты и отображением ошибки',
  args: {
    labelText: 'Номер карты',
    placeholder: '9999 9999 9999 9999',
    maskOptions: MASK_EXAMPLES.card,
    error: true,
    errors: ['Ошибка ввода'],
  },
}

export const WithRequiredValidation: Story = {
  name: 'Обязательное поле',
  args: {
    labelText: 'Обязательное поле',
    placeholder: 'Введите значение',
    required: true,
    errors: ['Поле обязательно для заполнения'],
  },
}

export const WithFormControlAutoRequired: Story = {
  name: 'Автоопределение required из formControl',
  render: (args) => ({
    props: {
      ...args,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      nameControl: new FormControl('', [Validators.required]),
    },
    moduleMetadata: { imports: [ReactiveFormsModule] },
    template: `
      <YTextField
        [formControl]="nameControl"
        [labelText]="'Имя'"
        [placeholder]="'Введите имя'"
        [errors]="['Поле обязательно для заполнения']"
      />
    `,
  }),
}

export const WithAutoErrorMessages: Story = {
  name: 'Автоматическое извлечение ошибок из formControl',
  render: () => {
    const requiredValidator: ValidatorFn = (control) => {
      if (!control.value) {
        return { required: { message: 'Поле обязательно для заполнения' } }
      }
      return null
    }

    const fullNameValidator: ValidatorFn = (control) => {
      const value = control.value as string
      if (value && (/\d/).test(value)) {
        return { fullName: { message: 'Имя не может содержать цифры' } }
      }
      return null
    }

    const nameControl = new FormControl('', [requiredValidator, fullNameValidator])

    return {
      props: { nameControl },
      moduleMetadata: { imports: [ReactiveFormsModule] },
      template: `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <YTextField
            [formControl]="nameControl"
            [labelText]="'Имя'"
            [placeholder]="'Введите имя'"
          />

          <div style="font-size: 12px; color: #666;">
            <div>
              1. Поле является обязательным
            </div>

            <div>
              2. Поле не может содержать цифры
            </div>
          </div>
        </div>
      `,
    }
  },
}
