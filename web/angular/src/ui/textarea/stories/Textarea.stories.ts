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
 * Angular wrapper for Core Textarea
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
      description: 'Textarea ngModel value',
      ...getComponentStateTable(''),
    },
    ngModelChange: {
      type: 'function',
      description: 'ngModel change event',
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
  name: 'Required field',
  args: {
    labelText: 'Description',
    placeholder: 'Enter a description',
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
      descriptionControl: new FormControl('', [Validators.required]),
    },
    moduleMetadata: { imports: [ReactiveFormsModule] },
    template: `
      <div style="padding: 20px; max-width: 500px;">
        <YTextarea
          [formControl]="descriptionControl"
          [labelText]="'Description'"
          [placeholder]="'Enter a description'"
          [errors]="['This field is required']"
        />
      </div>
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

    const noNumbersValidator: ValidatorFn = (control) => {
      const value = control.value as string
      if (value && (/\d/).test(value)) {
        return { noNumbers: { message: 'Text must not contain numbers' } }
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
              [labelText]="'Description'"
              [placeholder]="'Enter a description'"
              [rows]="4"
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
        </div>
      `,
    }
  },
}
