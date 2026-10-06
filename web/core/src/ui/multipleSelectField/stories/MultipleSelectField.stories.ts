import { html, nothing } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/multipleSelectField'

import { LOREM_IPSUM } from '~shared/.storybook/constants'
import yCoreSelectFieldStoryMeta, { type TYCoreSelectFieldStoryMeta } from '~core/ui/selectField/stories/SelectField.stories'

import {
  type IYCoreMultipleSelectFieldProps,
} from '~core/ui/multipleSelectField/models/types'

import { YCoreMultipleSelectFieldTagName as tagName } from '~shared/constants'

import { getComponentStateTable } from '~shared/.storybook/tables'

type TMultipleSelectFieldWithSlots = {
  showDropdownListTop: boolean
  showDropdownListItems: boolean
  showDropdownListBottom: boolean
}

export interface ICoreMultipleSelectFieldStoryProps extends
  IYCoreMultipleSelectFieldProps {}

export type TYCoreMultipleSelectFieldStoryMeta = IYCoreMultipleSelectFieldProps & ICoreMultipleSelectFieldStoryProps & TYCoreSelectFieldStoryMeta & TMultipleSelectFieldWithSlots

/**
 * ## Core MultipleSelectField
 * Поле с множественным выбором значения из выпадающего списка. При клике выводится выпадающий список доступных атрибутов и позволяет выбрать один или несколько из списка
 *
 * Ссылка на [Figma](https://www.figma.com/design/0eI55yqAEchWUmRQCIQVYu/YC-Web-%7C-Components-(IN-PROGRESS)?node-id=3729-33866&t=Iz28MHkztahONBwi-4)
 */
const meta: Meta<TYCoreMultipleSelectFieldStoryMeta> = {
  title: 'Inputs/✅ MultipleSelectField',
  id: 'multipleSelectField',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    value,
    placeholder,
    disabled,
    errors,
    readonly,
    required,
    autofocus,
    size,
    labelText,
    labelTooltipText,
    labelDebounce,
    isLongText,
    annotationText,
    showErrors,
    showDropdownListTop,
    showDropdownListBottom,
    itemLabel,
    itemValue,
    name,
    items,
    isFilterable,
    filterValue,
    isMapOptions,
    isCustomFilter,
    filterCallback,
    onFocus,
    onSelect,
    onInput,
    onBlur,
  }) => html`
    <div style="padding: 50px 50px 300px; margin: 20px; border: 1px dashed black; border-radius: 8px">
      <y-core-multiple-select-field
        .value=${value}
        .filterValue=${filterValue}
        .labelText=${isLongText ? LOREM_IPSUM : labelText}
        .labelTooltipText=${labelTooltipText}
        .errors=${errors ?? showErrors}
        .labelDebounce=${labelDebounce}
        .itemValue=${itemValue ?? ''}
        .itemLabel=${itemLabel ?? ''}
        .name=${name}
        .items=${items ?? []}
        .isFilterable=${isFilterable}
        .isMapOptions=${isMapOptions}
        .disabled=${disabled}
        .readonly=${readonly}
        .required=${required}
        ?autofocus=${autofocus}
        .isCustomFilter=${isCustomFilter}
        .size=${size}
        .placeholder=${placeholder}
        .filterCallback=${filterCallback}
        @focus=${onFocus}
        @select=${onSelect}
        @input=${onInput}
        @blur=${onBlur}
      >
        ${annotationText
          ? html`<div slot="annotation">${isLongText ? LOREM_IPSUM : annotationText}</div>`
          : nothing
        }

        ${showDropdownListTop
          ? html`
              <div slot="dropdown-list-top">
                showListTop
              </div>
            `
          : nothing
        }

        ${showDropdownListBottom
          ? html`
              <div slot="dropdown-list-bottom">
                showDropdownListBottom
              </div>
            `
          : nothing
        }
      </y-core-multiple-select-field>
      
    </div>
  `,
  argTypes: {
    ...yCoreSelectFieldStoryMeta.argTypes ?? {},
    value: {
      control: { type: 'object' },
      description: 'Массив выбранных значений из списка items',
      ...getComponentStateTable(),
    },
  },
  args: {
    ...yCoreSelectFieldStoryMeta.args ?? {},
    value: [
      yCoreSelectFieldStoryMeta.args?.items?.[1],
      yCoreSelectFieldStoryMeta.args?.items?.[2],
    ],
  },
} satisfies Meta<TYCoreMultipleSelectFieldStoryMeta>

export default meta
type Story = StoryObj<TYCoreMultipleSelectFieldStoryMeta>

export const Default: Story = {
  args: {},
  parameters: { docs: { description: { story: 'Базовый пример использования компонента' } } },
}
