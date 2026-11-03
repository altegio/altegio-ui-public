import type { Meta, StoryObj } from '@storybook/angular'
import { AltSelectField } from '~ng/ui/selectField'
import altSelectFieldStoryMeta, { type TAltCoreSelectFieldStoryMeta } from '~core/ui/selectField/stories/SelectField.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { altSearch } from '~shared/icons'
import { AltFieldIcon } from '~ng/ui/fieldIcon'
import { omit } from 'radash'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'
import { type AltNgSelectFieldInputEvent } from '~ng/ui/selectField/models/types'

/**
 * Angular wrapper for Core SelectField
 */
const meta: Meta<AltSelectField & TAltCoreSelectFieldStoryMeta> = {
  title: 'Inputs/🔍 SelectField',
  id: 'selectField',
  parameters: { controls: { sort: 'alpha' } },
  component: AltSelectField,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      onInput: action('input'),
      onSelect: (event: AltNgSelectFieldInputEvent) => {
        action('select')(event)
        updateArgs({ value: event.detail.value })
      },
      onFocus: action('focus'),
      onBlur: action('blur'),
    }

    return {
      moduleMetadata: { imports: [AltFieldIcon] },
      props: {
        ...args,
        ...handlers,
        altSearch,
        computedLabelTooltipText: args.isLongText ? LOREM_IPSUM : args.labelTooltipText,
        computedLabelText: args.isLongText ? LOREM_IPSUM : args.labelText,
        computedAnnotationText: args.isLongText ? LOREM_IPSUM : args.annotationText,
        computedErrors: args.errors ?? args.showErrors,
      },
      template: `
    <div style="padding: 50px 50px 300px; margin: 20px; border: 1px dashed black; border-radius: 8px">
      <AltSelectField
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
        (input)="onInput($event)"
        (focus)="onFocus($event)"
        (select)="onSelect($event)"
        (blur)="onBlur($event)"
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

        @if (showBefore) {
          <div slot="before">
            <AltFieldIcon
              [icon]="altSearch"
            ></AltFieldIcon>
          </div>
        }
      </AltSelectField>
    </div>
    `,
    }
  },
  argTypes: { ...omit(altSelectFieldStoryMeta.argTypes ?? {}, ['readonly']) },
  args: { ...omit(altSelectFieldStoryMeta.args ?? {}, ['readonly']) },
} satisfies Meta<AltSelectField & TAltCoreSelectFieldStoryMeta>

export default meta
type Story = StoryObj<AltSelectField & TAltCoreSelectFieldStoryMeta>

export const Playground: Story = { args: {} }
