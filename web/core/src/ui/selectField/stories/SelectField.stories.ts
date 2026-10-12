import { html, nothing } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { omit } from 'radash'

import '~core/ui/selectField'
import '~core/ui/fieldIcon'
import { addPrefixToObjectKeys } from '~shared/utils'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import yCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'
import yCoreFieldInputStoryMeta from '~core/ui/fieldInput/stories/FieldInput.stories'
import yCoreLabelStoryMeta from '~core/ui/label/stories/Label.stories'
import yCoreAnnotationStoryMeta from '~core/ui/annotation/stories/Annotation.stories'
import yCoreErrorStoryMeta, { type IYCoreErrorStoryProps } from '~core/ui/error/stories/Error.stories'

import YCoreDropdownList from '~core/ui/dropdownList/stories/DropdownList.stories'

import {
  type TYCoreSelectFieldEvents,
  type IYCoreSelectFieldExternalProps,
} from '~core/ui/selectField/models/types'

import { YCoreSelectFieldTagName as tagName } from '~shared/constants'
import { getComponentEmitsTable, getComponentStateTable, storyControlsTable } from '~shared/.storybook/tables'
import { fn } from '@storybook/test'
import { ySearch } from '~shared/icons'

type TSelectFieldWithSlots = {
  showDropdownListTop: boolean
  showDropdownListBottom: boolean
  showBefore: boolean
}

export interface ICoreSelectFieldStoryProps extends
  IYCoreErrorStoryProps {
}

export type TYCoreSelectFieldStoryMeta = IYCoreSelectFieldExternalProps & ICoreSelectFieldStoryProps & TYCoreSelectFieldEvents & TSelectFieldWithSlots

/**
 * ## Core SelectField
 * A field for selecting one or more values from a dropdown. Click to open the available options.
 *
 */

const meta: Meta<TYCoreSelectFieldStoryMeta> = {
  title: 'Inputs/✅ SelectField',
  id: 'selectField',
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
    showBefore,
    isMapOptions,
    isFilterable,
    itemLabel,
    itemValue,
    name,
    items,
    isCustomFilter,
    filterValue,
    filterCallback,
    onBlur,
    onFocus,
    onSelect,
    onInput,
  }) => html`
    <div style="padding: 50px 50px 300px; margin: 20px; border: 1px dashed black; border-radius: 8px">
      <y-core-select-field
        .value=${value}
        .labelText=${isLongText ? LOREM_IPSUM : labelText}
        .labelTooltipText=${labelTooltipText}
        .errors=${errors ?? showErrors}
        .itemValue=${itemValue ?? ''}
        .labelDebounce=${labelDebounce}
        .itemLabel=${itemLabel ?? ''}
        .annotationText=${annotationText}
        .name=${name}
        .filterValue=${filterValue}
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
        @blur=${onBlur}
        @select=${onSelect}
        @input=${onInput}
      >
        ${annotationText
          ? html`
          <div slot="annotation">
            ${isLongText
                ? LOREM_IPSUM
                : annotationText
            }
          </div>`
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

        ${showBefore
          ? html`
              <y-core-field-icon slot="before" .icon=${ySearch}></y-core-field-icon>
            `
          : nothing
        }
      </y-core-select-field>
    </div>
  `,
  argTypes: {
    // Extended Props
    ...omit(yCoreFieldWrapperStoryMeta.argTypes ?? {}, ['clickable', 'showFieldAvatar', 'showFieldInput', 'showFieldIcon']),
    ...omit(yCoreFieldInputStoryMeta.argTypes ?? {}, ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly', 'value', 'maxlength', 'type', 'onRender']),
    ...addPrefixToObjectKeys(omit(yCoreLabelStoryMeta.argTypes ?? {}, ['alignment', 'disabled', 'required', 'wrap', 'size', 'variant', 'tooltipActive', 'isLongText', 'tooltipPlacement']), 'label'),
    ...addPrefixToObjectKeys(omit(yCoreAnnotationStoryMeta.argTypes ?? {}, ['disabled', 'isLongText']), 'annotation'),
    ...omit(yCoreErrorStoryMeta.argTypes ?? {}, ['isLongText']),
    isLongText: yCoreLabelStoryMeta.argTypes?.isLongText,

    ...omit(
      YCoreDropdownList.argTypes ?? {},
      ['showTopSlot', 'showListSlot', 'showBottomSlot'],
    ),
    filterValue: {
      type: 'string',
      description: 'Input value used to filter items',
      ...getComponentStateTable(),
    },
    isFilterable: {
      type: 'boolean',
      description: 'Allow text input to filter items',
      ...getComponentStateTable(),
    },

    isCustomFilter: {
      type: 'boolean',
      description: 'Emit input events and disable built-in SelectField filtering',
      ...getComponentStateTable(),
    },

    filterCallback: {
      type: 'function',
      description: 'Callback used to filter items',
      ...getComponentStateTable(),
    },

    value: {
      control: { type: 'object' },
      description: 'Selected value from the items list',
      ...getComponentStateTable(),
    },

    itemValue: {
      type: 'string',
      description: 'Item field used as the dropdown selection value',
      ...getComponentStateTable(),
    },

    isMapOptions: {
      type: 'boolean',
      description: 'When disabled, emit the entire item; when enabled, emit item[itemValue]',
      ...getComponentStateTable(),
    },

    onSelect: {
      type: 'function',
      description: 'Dropdown selection event',
      ...getComponentEmitsTable(),
    },

    showDropdownListTop: {
      type: 'boolean',
      description: 'Show the dropdown-list-top slot above the list',
      ...storyControlsTable,
    },

    showDropdownListBottom: {
      type: 'boolean',
      description: 'Show the dropdown-list-bottom slot below the dropdown',
      ...storyControlsTable,
    },

    showBefore: {
      type: 'boolean',
      description: 'Show the before slot before the dropdown',
      ...storyControlsTable,
    },
  },
  args: {
    // Extended Props
    ...omit(yCoreFieldWrapperStoryMeta.args ?? {}, ['clickable', 'showFieldAvatar', 'showFieldInput', 'showFieldIcon']),
    ...omit(yCoreFieldInputStoryMeta.args ?? {}, ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly', 'value', 'maxlength', 'type', 'onRender']),
    ...addPrefixToObjectKeys(omit(yCoreLabelStoryMeta.args ?? {}, ['alignment', 'disabled', 'required', 'wrap', 'size', 'variant', 'tooltipActive', 'isLongText', 'tooltipPlacement']), 'label'),
    ...addPrefixToObjectKeys(omit(yCoreAnnotationStoryMeta.args ?? {}, ['disabled', 'isLongText']), 'annotation'),
    ...omit(yCoreErrorStoryMeta.args ?? {}, ['isLongText']),
    isLongText: yCoreLabelStoryMeta.args?.isLongText,

    ...omit(
      YCoreDropdownList.args ?? {},
      ['showTopSlot', 'showListSlot', 'showBottomSlot'],
    ),

    showDropdownListTop: false,
    showDropdownListBottom: false,
    showBefore: false,
    isFilterable: false,
    isCustomFilter: false,
    filterCallback: undefined,
    itemValue: 'id',
    onSelect: fn(),
    value: YCoreDropdownList.args?.items?.[1],
  },
} satisfies Meta<TYCoreSelectFieldStoryMeta>

export default meta
type Story = StoryObj<TYCoreSelectFieldStoryMeta>

export const Default: Story = {
  args: {},
  parameters: { docs: { description: { story: 'Basic usage example' } } },
}
