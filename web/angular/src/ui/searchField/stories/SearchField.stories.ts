import { omit } from 'radash'

import { FormsModule } from '@angular/forms'

import type { Meta, StoryObj } from '@storybook/angular'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'

import { LOREM_IPSUM } from '~shared/.storybook/constants'
import type { TAltCoreTextFieldMeta } from '~core/ui/textField/stories/TextField.stories'
import altCoreTextFieldStoryMeta from '~core/ui/textField/stories/TextField.stories'
import { type TAltNgSearchFieldModel } from '~ng/ui/searchField/models/types'
import type { TAltNgControlValueTypes } from '~web/angular/src/types/ControlValueAccessorTypes'
import { AltSearchField } from '~ng/ui/searchField/SearchField.component'
import { getComponentEmitsTable, getComponentStateTable } from '~web/shared/.storybook/tables'

type TAltNgSearchFieldControlValueTypes = TAltNgControlValueTypes<TAltNgSearchFieldModel>
type TAltNgSearchFieldMeta = AltSearchField & TAltCoreTextFieldMeta & TAltNgSearchFieldControlValueTypes

const AltCoreTextFieldStoryOmitKeys: (keyof TAltCoreTextFieldMeta)[] = [
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
const meta: Meta<TAltNgSearchFieldMeta> = {
  title: 'Inputs/🔍 SearchField',
  id: 'searchField',
  parameters: { controls: { sort: 'alpha' } },
  component: AltSearchField,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      onModelChange: (ngModel: TAltNgSearchFieldModel) => {
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
        <AltSearchField
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
        </AltSearchField>
      `,
    }
  },
  argTypes: {
    ...omit(
      altCoreTextFieldStoryMeta.argTypes ?? {},
      [...AltCoreTextFieldStoryOmitKeys],
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
      altCoreTextFieldStoryMeta.args ?? {},
      [...AltCoreTextFieldStoryOmitKeys],
    ),
    ngModel: '',
  },
} satisfies Meta<TAltNgSearchFieldMeta>

export default meta
type Story = StoryObj<TAltNgSearchFieldMeta>

export const Playground: Story = {}

export const WithError: Story = {
  name: 'With an error',
  args: {
    error: true,
    errors: ['Enter text only in the search field'],
  },
}
