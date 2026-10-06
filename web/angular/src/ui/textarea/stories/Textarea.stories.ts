import type { Meta, StoryObj } from '@storybook/angular'
import { FormsModule, ReactiveFormsModule, FormControl, Validators, type ValidatorFn } from '@angular/forms'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'

import { YTextarea } from '~ng/ui/textarea'
import yCoreTextareaStoryMeta, { type TYCoreTextareaMeta, WithMaxlength as CoreWithMaxlength } from '~core/ui/textarea/stories/Textarea.stories'
import { omit } from 'radash'
import type { TYNgTextareaModel } from '~ng/ui/textarea/models/types'
import { getComponentEmitsTable, getComponentStateTable } from '~web/shared/.storybook/tables'
import type { TYNgControlValueTypes } from '~web/angular/src/types/ControlValueAccessorTypes'
import { YIcon } from '~ng/ui/icon'
import { yInfo } from '~shared/icons'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

// Тип для компонента с дополнительными пропсами
type NgTextareaMeta = YTextarea & TYCoreTextareaMeta & TYNgControlValueTypes<TYNgTextareaModel>

/**
 * Angular-обертка над Core Textarea
 */
const meta: Meta<NgTextareaMeta> = {
  title: 'Inputs/🔍 TextArea',
  id: 'textarea',
  parameters: { controls: { sort: 'alpha' } },
  component: YTextarea,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      onModelChange: (ngModel: TYNgTextareaModel) => {
        action('onModelChange')(ngModel)
        updateArgs({ ngModel })
      },
      onFocus: action('focus'),
      onBlur: action('blur'),
      onClear: action('clear'),
      onKeydown: action('keydown'),
      onClick: action('click'),
      onClickOutside: action('click-outside'),
      onMouseEnter: action('mouse-enter'),
      onMouseLeave: action('mouse-leave'),
      onRenderTextarea: action('render-textarea'),
    }

    return {
      props: {
        ...args,
        ...handlers,
        yInfo,
        calculatedErrors: args.errors ?? args.showErrors,
        computedLabelText: args.isLongText ? LOREM_IPSUM : args.labelText,
        computedLabelTooltipText: args.isLongText ? LOREM_IPSUM : args.labelTooltipText,
      },
      moduleMetadata: { imports: [FormsModule, YIcon] },
      template: `
        <div style="padding: 20px; max-width: 500px;">
          <YTextarea
            (ngModelChange)="onModelChange($event)"
            (focus)="onFocus($event)"
            (blur)="onBlur($event)"
            (clear)="onClear($event)"
            (keydown)="onKeydown($event)"
            (click)="onClick($event)"
            (clickOutside)="onClickOutside($event)"
            (mouseEnter)="onMouseEnter($event)"
            (mouseLeave)="onMouseLeave($event)"
            (renderTextarea)="onRenderTextarea($event)"
            [ngModel]="ngModel"
            [name]="name"
            [placeholder]="placeholder"
            [required]="required"
            [maxlength]="maxlength"
            [autofocus]="autofocus"
            [labelText]="computedLabelText"
            [labelTooltipText]="computedLabelTooltipText"
            [labelDebounce]="labelDebounce"
            [errors]="calculatedErrors"
            [clearable]="clearable"
            [rows]="rows"
            [resize]="resize"
            [disabled]="disabled"
            [size]="size"
            [readonly]="readonly"
            [error]="error"
            [locatorLabel]="locatorLabel"
            [locatorError]="locatorError"
          >
            @if (showBeforeSlot) {
              <ng-template #textareaBefore>
                <YIcon [icon]="yInfo" size="16px" />
              </ng-template>
            }

            @if (showAfterSlot) {
              <ng-template #textareaAfter>
                <YIcon [icon]="yInfo" size="16px" />
              </ng-template>
            }
          </YTextarea>
        </div>
      `,
    }
  },
  argTypes: {
    ...omit(
      yCoreTextareaStoryMeta.argTypes ?? {},
      ['readonly', 'value', 'onInput'],
    ),
    ngModel: {
      type: 'string',
      description: 'Значение ngModel в Textarea',
      ...getComponentStateTable(''),
    },
    ngModelChange: {
      type: 'function',
      description: 'Событие изменения ngModel',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...omit(yCoreTextareaStoryMeta.args ?? {}, ['onInput', 'readonly', 'value']),
    ngModel: '',
  },
}

export default meta
type Story = StoryObj<NgTextareaMeta>

export const Playground: Story = { args: {} }

export const WithMaxlength: Story = {
  name: CoreWithMaxlength.name,
  args: CoreWithMaxlength.args,
}

export const WithRequiredValidation: Story = {
  name: 'Обязательное поле',
  args: {
    labelText: 'Описание',
    placeholder: 'Введите описание',
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
      descriptionControl: new FormControl('', [Validators.required]),
    },
    moduleMetadata: { imports: [ReactiveFormsModule] },
    template: `
      <div style="padding: 20px; max-width: 500px;">
        <YTextarea
          [formControl]="descriptionControl"
          [labelText]="'Описание'"
          [placeholder]="'Введите описание'"
          [errors]="['Поле обязательно для заполнения']"
        />
      </div>
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

    const noNumbersValidator: ValidatorFn = (control) => {
      const value = control.value as string
      if (value && (/\d/).test(value)) {
        return { noNumbers: { message: 'Текст не может содержать цифры' } }
      }
      return null
    }

    const descriptionControl = new FormControl('', [requiredValidator, noNumbersValidator])

    return {
      props: { descriptionControl },
      moduleMetadata: { imports: [ReactiveFormsModule] },
      template: `
        <div style="padding: 20px; max-width: 500px;">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <YTextarea
              [formControl]="descriptionControl"
              [labelText]="'Описание'"
              [placeholder]="'Введите описание'"
              [rows]="4"
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
        </div>
      `,
    }
  },
}
