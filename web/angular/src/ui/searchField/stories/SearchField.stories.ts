import { omit } from 'radash'

import { FormsModule } from '@angular/forms'

import type { Meta, StoryObj } from '@storybook/angular'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'

import { LOREM_IPSUM } from '~shared/.storybook/constants'
import type { TYCoreTextFieldMeta } from '~core/ui/textField/stories/TextField.stories'
import yCoreTextFieldStoryMeta from '~core/ui/textField/stories/TextField.stories'
import { type TYNgSearchFieldModel } from '~ng/ui/searchField/models/types'
import type { TYNgControlValueTypes } from '~web/angular/src/types/ControlValueAccessorTypes'
import { YSearchField } from '~ng/ui/searchField/SearchField.component'
import { getComponentEmitsTable, getComponentStateTable } from '~web/shared/.storybook/tables'

type TYNgSearchFieldControlValueTypes = TYNgControlValueTypes<TYNgSearchFieldModel>
type TYNgSearchFieldMeta = YSearchField & TYCoreTextFieldMeta & TYNgSearchFieldControlValueTypes

const YCoreTextFieldStoryOmitKeys: (keyof TYCoreTextFieldMeta)[] = [
  'clearable',
  'readonly',
  'maskOptions',
  'value',
  'onInput',
  'maxlength',
  'required',
  'showBeforeSlot',
  'showAfterSlot',
  'type',
  'onClick',
  'onClickOutside',
  'onMouseEnter',
  'onMouseLeave',
  'onRenderInput',
  'onKeydown',
]

/**
 * Angular wrapper for Core SearchField
 */
const meta: Meta<TYNgSearchFieldMeta> = {
  title: 'Inputs/🔍 SearchField',
  id: 'searchField',
  parameters: { controls: { sort: 'alpha' } },
  component: YSearchField,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      onModelChange: (ngModel: TYNgSearchFieldModel) => {
        action('onModelChange')(ngModel)
        updateArgs({ ngModel })
      },
      onFocus: action('onFocus'),
      onBlur: action('onBlur'),
      onClear: action('onClear'),
      onSearchIconClick: action('onSearchIconClick'),
    }

    return {
      props: {
        ...args,
        ...handlers,
        computedLabelTooltipText: args.isLongText ? LOREM_IPSUM : args.labelTooltipText,
        computedLabelText: args.isLongText ? LOREM_IPSUM : args.labelText,
        computedAnnotationText: args.isLongText ? LOREM_IPSUM : args.annotationText,
        computedErrors: args.error ? args.errors ?? args.showErrors : undefined,
      },
      moduleMetadata: { imports: [FormsModule] },
      template: `
        <YSearchField
          (ngModelChange)="onModelChange($event)"
          (focus)="onFocus($event)"
          (blur)="onBlur($event)"
          (clear)="onClear($event)"
          (searchIconClick)="onSearchIconClick($event)"
          [ngModel]="ngModel"
          [name]="name"
          [placeholder]="placeholder"
          [autofocus]="autofocus"
          [disabled]="disabled"
          [errors]="computedErrors"
          [error]="error"
          [size]="size"
          [labelText]="computedLabelText"
          [labelTooltipText]="computedLabelTooltipText"
          [labelDebounce]="labelDebounce"
          [annotationText]="computedAnnotationText"
          [locatorClearIcon]="locatorClearIcon"
        >
        </YSearchField>
      `,
    }
  },
  argTypes: {
    ...omit(
      yCoreTextFieldStoryMeta.argTypes ?? {},
      [...YCoreTextFieldStoryOmitKeys],
    ),
    ngModel: {
      type: 'string',
      description: 'SearchField ngModel value',
      ...getComponentStateTable(''),
    },
    locatorClearIcon: {
      type: 'string',
      description: 'Data locator for the clear icon',
      ...getComponentStateTable(''),
    },
    ngModelChange: {
      type: 'function',
      description: 'ngModel change event',
      ...getComponentEmitsTable(),
    },
    searchIconClick: {
      type: 'function',
      description: 'Search icon click event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...omit(
      yCoreTextFieldStoryMeta.args ?? {},
      [...YCoreTextFieldStoryOmitKeys],
    ),
    ngModel: '',
  },
} satisfies Meta<TYNgSearchFieldMeta>

export default meta
type Story = StoryObj<TYNgSearchFieldMeta>

export const Playground: Story = {}

export const WithError: Story = {
  name: 'With an error',
  args: {
    error: true,
    errors: ['Enter text only in the search field'],
  },
}
