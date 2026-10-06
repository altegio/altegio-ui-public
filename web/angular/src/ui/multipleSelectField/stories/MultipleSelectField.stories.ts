import type { Meta, StoryObj } from '@storybook/angular'
import { YMultipleSelectField } from '../MultipleSelectField.component'
import yMultipleSelectFieldStoryMeta, { type TYCoreMultipleSelectFieldStoryMeta } from '~core/ui/multipleSelectField/stories/MultipleSelectField.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import {
  type YNgMultipleSelectFieldInputEvent,
} from '../models/types'
import { omit } from 'radash'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'

/**
 * Angular-обертка над MultipleSelectField
 */
const meta: Meta<YMultipleSelectField & TYCoreMultipleSelectFieldStoryMeta> = {
  title: 'Unverified/Inputs/MultipleSelectField',
  id: 'multipleSelectField',
  parameters: { controls: { sort: 'alpha' } },
  component: YMultipleSelectField,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      onInputEmit: (event: YNgMultipleSelectFieldInputEvent) => {
        action('input')(event)
        updateArgs({ value: event.detail.value })
      },
      onSelectEmit: (event: YNgMultipleSelectFieldInputEvent) => {
        action('select')(event)
        updateArgs({ value: event.detail.value })
      },
      onFocusEmit: action('focus'),
      onBlurEmit: action('blur'),
    }

    return {
      props: {
        ...args,
        ...handlers,
        computedLabelTooltipText: args.isLongText ? LOREM_IPSUM : args.labelTooltipText,
        computedLabelText: args.isLongText ? LOREM_IPSUM : args.labelText,
        computedAnnotationText: args.isLongText ? LOREM_IPSUM : args.annotationText,
        computedErrors: args.errors ?? args.showErrors,
      },
      template: `
      <div style="padding: 50px 50px 300px; margin: 20px; border: 1px dashed black; border-radius: 8px">
        <YMultipleSelectField
          [value]="value"
          [name]="name"
          [placeholder]="placeholder"
          [autofocus]="autofocus"
          [disabled]="disabled"
          [required]="required"
          [errors]="computedErrors"
          [size]="size"
          [error]="error"
          [labelDebounce]="labelDebounce"
          [isMapOptions]="isMapOptions"
          [labelText]="computedLabelText"
          [labelTooltipText]="computedLabelTooltipText"
          [annotationText]="computedAnnotationText"
          [items]="items"
          [itemLabel]="itemLabel"
          [itemValue]="itemValue"
          [isCustomFilter]="isCustomFilter"
          [isFilterable]="isFilterable"
          [filterCallback]="filterCallback"
          (input)="onInputEmit($event)"
          (focus)="onFocusEmit($event)"
          (select)="onSelectEmit($event)"
          (blur)="onBlurEmit($event)"
        >
          @if (computedAnnotationText) {
            <div annotation>
              {{computedAnnotationText}}
            </div>
          }

          @if (showDropdownListTop) {
            <div dropdown-list-top>
              dropdownListTop
            </div>
          }

          @if (showDropdownListBottom) {
            <div dropdown-list-bottom>
              dropdownListBottom
            </div>
          }
        </YMultipleSelectField>
      </div>
    `,
    }
  },
  argTypes: { ...omit(yMultipleSelectFieldStoryMeta.argTypes ?? {}, ['readonly']) },
  args: { ...omit(yMultipleSelectFieldStoryMeta.args ?? {}, ['readonly']) },
} satisfies Meta<YMultipleSelectField & TYCoreMultipleSelectFieldStoryMeta>

export default meta
type Story = StoryObj<YMultipleSelectField>

export const Playground: Story = { args: {} }
