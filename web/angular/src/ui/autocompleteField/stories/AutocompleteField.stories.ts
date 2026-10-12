import type { Meta, StoryObj } from '@storybook/angular'
import { action } from '@storybook/addon-actions'

import { YAutocompleteField } from '~ng/ui/autocompleteField'
import yCoreAutocompleteFieldStoryMeta, { type TYCoreAutocompleteFieldStoryMeta } from '~core/ui/autocompleteField/stories/AutocompleteField.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import type { SelectOptionEvent, FocusEvent, BlurEvent, ChangeEvent } from '~core/ui/autocompleteField/models/types'
import { useArgs } from '@storybook/preview-api'

/**
 * Angular wrapper for Core AutocompleteField
 */
const meta: Meta<TYCoreAutocompleteFieldStoryMeta> = {
  title: 'Inputs/⚙️ AutocompleteField',
  id: 'AutocompleteField',
  parameters: { controls: { sort: 'alpha' } },
  component: YAutocompleteField,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      onSelectOption: (e: SelectOptionEvent) => {
        const { detail } = e
        action('selectOption')(e)
        updateArgs({ value: detail.value })
      },
      onFocus: (e: FocusEvent) => {
        action('focus')(e)
      },
      onBlur: (e: BlurEvent) => {
        action('blur')(e)
      },
      onChange: (e: ChangeEvent) => {
        action('change')(e)
        updateArgs({ value: e.detail.value })
      },
      searchFunction: args.searchFunction,
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
      <div style="padding: 50px 50px 300px; margin: 20px; border: 1px dashed black; border-radius: 8px;">
        <YAutocompleteField
          [value]="value"
          [name]="name"
          [placeholder]="placeholder"
          [autofocus]="autofocus"
          [disabled]="disabled"
          [size]="size"
          [error]="error"
          [labelDebounce]="labelDebounce"
          [required]="required"
          [annotationText]="annotationText"
          [minSearchLength]="minSearchLength"
          [disabledAutocomplete]="disabledAutocomplete"
          [searchFunction]="searchFunction"
          [labelText]="computedLabelText"
          [labelTooltipText]="computedLabelTooltipText"
          [annotationText]="computedAnnotationText"
          [emptyStateDescription]="emptyStateDescription"
          [emptyStateTitle]="emptyStateTitle"
          [emptyStateIcon]="emptyStateIcon"
          (select-option)="onSelectOption($event)"
          (focus)="onFocus($event)"
          (blur)="onBlur($event)"
          (change)="onChange($event)"
        > 
          <div autocomplete-field-annotation>
            {{computedAnnotationText}}
          </div>
        </YAutocompleteField>
      </div>
    `,
    }
  },
  argTypes: {
    ...yCoreAutocompleteFieldStoryMeta.argTypes,
    searchFunction: { action: 'searchFunction' },
  },
  args: { ...yCoreAutocompleteFieldStoryMeta.args },
} satisfies Meta<TYCoreAutocompleteFieldStoryMeta>

export default meta
type Story = StoryObj<TYCoreAutocompleteFieldStoryMeta>

export const Playground: Story = { args: {} }
