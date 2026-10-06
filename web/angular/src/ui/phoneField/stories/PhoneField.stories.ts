import type { Meta, StoryObj } from '@storybook/angular'
import { action } from '@storybook/addon-actions'

import { YPhoneField } from '~ng/ui/phoneField'
import yCorePhoneFieldStoryMeta, { type TYCorePhoneFieldStoryMeta } from '~core/ui/phoneField/stories/PhoneField.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import type { SelectOptionEvent, FocusEvent, BlurEvent, PhoneFieldChangeEvent } from '~core/ui/phoneField/models/types'
import { useArgs } from '@storybook/preview-api'

/**
 * Angular-обертка над Core PhoneField
 */
const meta: Meta<TYCorePhoneFieldStoryMeta> = {
  title: 'Inputs/🔍 PhoneField',
  id: 'phoneField',
  parameters: { controls: { sort: 'alpha' } },
  component: YPhoneField,
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
        updateArgs({ value: detail.phone })
      },
      onFocus: (e: FocusEvent) => {
        action('focus')(e)
      },
      onBlur: (e: BlurEvent) => {
        action('blur')(e)
      },
      onChange: (e: PhoneFieldChangeEvent) => {
        action('change')(e)
        updateArgs({ value: e.detail.phone })
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
        <YPhoneField
          [value]="value"
          [name]="name"
          [placeholder]="placeholder"
          [autofocus]="autofocus"
          [disabled]="disabled"
          [readonly]="readonly"
          [size]="size"
          [error]="error"
          [labelDebounce]="labelDebounce"
          [required]="required"
          [annotationText]="annotationText"
          [minSearchLength]="minSearchLength"
          [withoutCodeSelection]="withoutCodeSelection"
          [disabledAutocomplete]="disabledAutocomplete"
          [searchFunction]="searchFunction"
          [countries]="countries"
          [defaultCountryId]="defaultCountryId"
          [labelText]="computedLabelText"
          [labelTooltipText]="computedLabelTooltipText"
          [annotationText]="computedAnnotationText"
          [emptyStateDescription]="emptyStateDescription"
          [emptyStateTitle]="emptyStateTitle"
          [emptyStateIcon]="emptyStateIcon"
          [optionPhonePrivacyEnabled]="optionPhonePrivacyEnabled"
          (select-option)="onSelectOption($event)"
          (focus)="onFocus($event)"
          (blur)="onBlur($event)"
          (change)="onChange($event)"
        > 
          <div phone-field-annotation>
            {{computedAnnotationText}}
          </div>
        </YPhoneField>
      </div>
    `,
    }
  },
  argTypes: {
    ...yCorePhoneFieldStoryMeta.argTypes,
    searchFunction: { action: 'searchFunction' },
  },
  args: { ...yCorePhoneFieldStoryMeta.args },
} satisfies Meta<TYCorePhoneFieldStoryMeta>

export default meta
type Story = StoryObj<TYCorePhoneFieldStoryMeta>

export const Playground: Story = { args: {} }
