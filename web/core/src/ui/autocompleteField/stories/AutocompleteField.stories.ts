import { html, nothing } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { useArgs } from '@storybook/preview-api'
import { ifDefined } from 'lit/directives/if-defined.js'
import { fn } from '@storybook/test'
import { omit } from 'radash'

import '~core/ui/autocompleteField'
import '~core/ui/icon'
import '~core/ui/button'

import { addPrefixToObjectKeys } from '~shared/utils'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import yCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'
import yCoreFieldInputStoryMeta from '~core/ui/fieldInput/stories/FieldInput.stories'
import yCoreLabelStoryMeta from '~core/ui/label/stories/Label.stories'
import yCoreAnnotationStoryMeta from '~core/ui/annotation/stories/Annotation.stories'
import yCoreErrorStoryMeta, { type IYCoreErrorStoryProps } from '~core/ui/error/stories/Error.stories'
import yCoreEmptyStateStoryMeta from '~core/ui/emptyState/stories/EmptyState.stories'

import type { TYCoreAutocompleteFieldInfo } from '../models/types'
import {
  type SelectOptionEvent,
  type TYCoreAutocompleteFieldAutocompleteOption,
  type TYCoreAutocompleteFieldEvents,
  type IYCoreAutocompleteFieldExternalProps,
  type ChangeEvent, createCoreAutocompleteFieldExternalProps,
} from '../models/types'

import { YCoreAutocompleteFieldTagName as tagName } from '~shared/constants'
import {
  getComponentEmitsTable,
  getComponentStateTable,
  storyControlsTable,
} from '~shared/.storybook/tables'
import { ySearch } from '~web/shared/icons'

const autocompleteOptions = [
  { id: 1, value: 'Client directory' },
  { id: 2, value: 'Clients', additionalInfo: ['+7 (999) 999-99-99', 'test@test.ru'] },
  { id: 3, value: 'Storage' },
  { id: 4, value: 'Class teacher' },
  { id: 5, value: 'Glue' },
  { id: 6, value: 'Alexander' },
  { id: 7, value: 'Alex' },
  { id: 8, value: 'Altufyevo' },
  { id: 9, value: 'Alleluia' },
]

export interface ICoreAutocompleteFieldStoryProps extends
  IYCoreErrorStoryProps {
  labelIsLongText: boolean
  annotationIsLongText: boolean
  dropdownItems: TYCoreAutocompleteFieldAutocompleteOption[]
  emptyStateIsActionsSlotExists: boolean
  showIconSlot: boolean
}

export type TYCoreAutocompleteFieldStoryMeta = IYCoreAutocompleteFieldExternalProps & ICoreAutocompleteFieldStoryProps & TYCoreAutocompleteFieldEvents

const {
  minSearchLength,
  disabledAutocomplete,
  searchFunction,
} = createCoreAutocompleteFieldExternalProps()

/**
 * ## Core AutocompleteField
 * A text field with suggestions based on the input value.
 * As the user types, matching suggestions appear in a dropdown.
 * Select a suggestion or enter a custom value.
 */

const meta: Meta<TYCoreAutocompleteFieldStoryMeta> = {
  title: 'Inputs/🔍 AutocompleteField',
  id: 'AutocompleteField',
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
    labelIsLongText,
    annotationIsLongText,
    annotationText,
    showErrors,
    name,
    onFocus,
    onChange,
    onSelectOption,
    searchFunction,
    onBlur,
    minSearchLength,
    disabledAutocomplete,
    emptyStateTitle,
    emptyStateDescription,
    emptyStateIcon,
    emptyStateIsActionsSlotExists,
    showIconSlot,
  }) => {
    const [
      args,
      updateArgs,
    ] = useArgs<TYCoreAutocompleteFieldStoryMeta>()

    const onStoryChange = (event: ChangeEvent) => {
      updateArgs({ ...args, value: String(event.detail.value) })
      onChange(event)
    }

    const renderEmptyStateActionsSlot = () => {
      return html`
        <div slot="actions">
          <y-core-button
            label="Primary button"
            variant="primary"
          ></y-core-button>

          <y-core-button
            label="Secondary button"
            variant="outline"
          ></y-core-button>
        </div>
      `
    }

    return html`
      <div style="padding: 50px 50px 300px; margin: 20px; border: 1px dashed black; border-radius: 8px;">
        <y-core-autocomplete-field
          .value=${value}
          .labelText=${labelIsLongText ? LOREM_IPSUM : labelText}
          .labelTooltipText=${labelTooltipText}
          .errors=${errors ?? showErrors}
          .annotationText=${annotationText}
          .name=${name}
          .searchFunction=${searchFunction}
          ?disabled=${disabled}
          ?readonly=${readonly}
          ?required=${required}
          ?autofocus=${autofocus}
          .minSearchLength=${minSearchLength}
          .disabledAutocomplete=${disabledAutocomplete}
          size=${ifDefined(size)}
          placeholder=${ifDefined(placeholder)}
          .emptyStateTitle=${emptyStateTitle}
          .emptyStateDescription=${emptyStateDescription}
          .emptyStateIcon=${emptyStateIcon}
          @focus=${onFocus}
          @change=${onStoryChange}
          @blur=${onBlur}
          @select-option=${onSelectOption}
        >
          ${annotationText
            ? html`
            <div slot="annotation">
              ${annotationIsLongText
                  ? LOREM_IPSUM
                  : annotationText
              }
            </div>`
            : nothing
          }

          ${emptyStateIsActionsSlotExists
            ? html`
              <div slot="empty-state-actions">
                ${renderEmptyStateActionsSlot()}
              </div>`
            : nothing
          }

          ${showIconSlot
            ? html`
              <y-core-field-icon slot="icon" .icon=${ySearch}></y-core-field-icon>`
            : nothing
          }
        </y-core-autocomplete-field>
      </div>
    `
  },
  argTypes: {
    // Extended Props
    ...omit(yCoreFieldWrapperStoryMeta.argTypes ?? {}, ['clickable', 'showFieldAvatar', 'showFieldInput', 'showFieldIcon', 'onClick', 'onClickOutside', 'onMouseEnter', 'onMouseLeave']),
    ...omit(yCoreFieldInputStoryMeta.argTypes ?? {}, ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly', 'maxlength', 'type', 'onRender', 'onInput', 'onKeydown']),
    ...addPrefixToObjectKeys(omit(yCoreLabelStoryMeta.argTypes ?? {}, ['alignment', 'disabled', 'required', 'wrap', 'size', 'variant', 'tooltipActive', 'isLongText', 'tooltipPlacement']), 'label'),
    ...addPrefixToObjectKeys(omit(yCoreAnnotationStoryMeta.argTypes ?? {}, ['disabled', 'isLongText']), 'annotation'),
    ...addPrefixToObjectKeys(omit(yCoreEmptyStateStoryMeta.argTypes ?? {}, ['size']), 'emptyState'),
    ...omit(yCoreErrorStoryMeta.argTypes ?? {}, ['isLongText']),
    isLongText: yCoreLabelStoryMeta.argTypes?.isLongText,


    showIconSlot: {
      type: 'boolean',
      description: 'Show an icon in the input field',
      ...storyControlsTable,
    },

    onSelectOption: {
      type: 'function',
      description: 'Dropdown selection event',
      ...getComponentEmitsTable(),
    },

    searchFunction: {
      type: 'function',
      description: 'Search function for autocomplete suggestions',
      ...getComponentStateTable(searchFunction),
    },

    onChange: {
      type: 'function',
      description: 'Event emitted when the phone number or country changes',
      ...getComponentEmitsTable(),
    },

    disabledAutocomplete: {
      type: 'boolean',
      description: 'Disable the dropdown',
      ...getComponentStateTable(disabledAutocomplete),
    },

    dropdownItems: {
      control: { type: 'object' },
      description: 'Autocomplete suggestions',
      ...storyControlsTable,
    },

    minSearchLength: {
      type: 'number',
      description: 'Minimum number of characters before searching',
      ...getComponentStateTable(minSearchLength),
    },
  },
  args: {
    ...omit(yCoreFieldWrapperStoryMeta.args ?? {}, ['clickable', 'showFieldAvatar', 'showFieldInput', 'showFieldIcon', 'onClick', 'onClickOutside', 'onMouseEnter', 'onMouseLeave']),
    ...omit(yCoreFieldInputStoryMeta.args ?? {}, ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly', 'maxlength', 'type', 'onRender', 'onInput', 'onKeydown']),
    ...addPrefixToObjectKeys(omit(yCoreLabelStoryMeta.args ?? {}, ['alignment', 'disabled', 'required', 'wrap', 'size', 'variant', 'tooltipActive', 'isLongText', 'tooltipPlacement']), 'label'),
    ...addPrefixToObjectKeys(omit(yCoreAnnotationStoryMeta.args ?? {}, ['disabled', 'isLongText']), 'annotation'),
    ...addPrefixToObjectKeys(omit(yCoreEmptyStateStoryMeta.args ?? {}, ['size']), 'emptyState'),
    ...omit(yCoreErrorStoryMeta.args ?? {}, ['isLongText']),
    isLongText: yCoreLabelStoryMeta.args?.isLongText,

    dropdownItems: autocompleteOptions,

    onChange: fn(),

    searchFunction: (query: TYCoreAutocompleteFieldInfo) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(autocompleteOptions.filter((item) => {
            return item.value.toLowerCase().includes(query.value.toLowerCase())
          }))
        }, 1000)
      })
    },

    onSelectOption: function(e: SelectOptionEvent) {
      const { detail } = e
      this.value = detail.value
    },
    disabledAutocomplete: false,
    placeholder: '',
    minSearchLength: 3,
    showErrors: [],
    value: '',
    showIconSlot: false,
  },
} satisfies Meta<TYCoreAutocompleteFieldStoryMeta>

export default meta
type Story = StoryObj<TYCoreAutocompleteFieldStoryMeta>

export const Default: Story = {
  args: {},
  parameters: { docs: { description: { story: 'Basic usage example' } } },
}
