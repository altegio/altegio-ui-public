import { html, nothing } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { useArgs } from '@storybook/preview-api'
import { ifDefined } from 'lit/directives/if-defined.js'
import { fn } from '@storybook/test'
import { omit } from 'radash'

import '~core/ui/phoneField'
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

import {
  type SelectOptionEvent,
  type TYCorePhoneFieldAutocompleteOption,
  type TYCorePhoneFieldEvents,
  type IYCorePhoneFieldExternalProps,
  type PhoneFieldChangeEvent, createCorePhoneFieldExternalProps,
} from '~core/ui/phoneField/models/types'

import { YCorePhoneFieldTagName as tagName } from '~shared/constants'
import {
  getComponentContentTable,
  getComponentEmitsTable,
  getComponentStateTable,
  storyControlsTable,
} from '~shared/.storybook/tables'

const autocompleteOptions = [
  { id: 1, title: 'Item 1', phone: '79991579172', additionalPhone: '+7 903 225-32-32', email: 'kirill@gmail.com' },
  { id: 2, title: 'Item 2', phone: '+7 999 157-91-73' },
  { id: 3, title: 'Item 3', phone: '+7 987 157-91-74' },
  { id: 4, title: 'Item 4', phone: '+7 999 157-91-73' },
  { id: 5, title: 'Item 4', phone: '+7 999 157-92-73' },
  { id: 6, title: 'Item 5', phone: '+7 987 157-92-72' },
  { id: 7, title: 'Item 6', phone: '+7 987 152-91-72' },
  { id: 7, title: 'Item 7', phone: '+372894535555555' },
  { id: 7, title: 'Item 8', phone: '+380 66 179-81-60' },
]

export interface ICorePhoneFieldStoryProps extends
  IYCoreErrorStoryProps {
  labelIsLongText: boolean
  annotationIsLongText: boolean
  dropdownItems: TYCorePhoneFieldAutocompleteOption[]
  emptyStateIsActionsSlotExists: boolean
}

export type TYCorePhoneFieldStoryMeta = IYCorePhoneFieldExternalProps & ICorePhoneFieldStoryProps & TYCorePhoneFieldEvents

const {
  minSearchLength,
  withoutCodeSelection,
  disabledAutocomplete,
  countries,
  defaultCountryId,
  searchFunction,
  optionPhonePrivacyEnabled,
} = createCorePhoneFieldExternalProps()

/**
 * ## Core PhoneField
 * A masked phone number field that helps users enter numbers in the correct format.
 */

const meta: Meta<TYCorePhoneFieldStoryMeta> = {
  title: 'Inputs/🔍 PhoneField',
  id: 'phoneField',
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
    withoutCodeSelection,
    onBlur,
    minSearchLength,
    defaultCountryId,
    disabledAutocomplete,
    countries,
    emptyStateTitle,
    emptyStateDescription,
    emptyStateIcon,
    emptyStateIsActionsSlotExists,
    optionPhonePrivacyEnabled,
  }) => {
    const [
      args,
      updateArgs,
    ] = useArgs<TYCorePhoneFieldStoryMeta>()

    const onStoryChange = (event: PhoneFieldChangeEvent) => {
      updateArgs({ ...args, value: String(event.detail.phone) })
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
        <y-core-phone-field
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
          .withoutCodeSelection=${withoutCodeSelection}
          .minSearchLength=${minSearchLength}
          .defaultCountryId=${defaultCountryId}
          .disabledAutocomplete=${disabledAutocomplete}
          .optionPhonePrivacyEnabled=${optionPhonePrivacyEnabled}
          .countries=${countries}
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
        </y-core-phone-field>
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

    withoutCodeSelection: {
      type: 'boolean',
      description: 'Allow country code selection',
      ...getComponentStateTable(withoutCodeSelection),
    },

    disabledAutocomplete: {
      type: 'boolean',
      description: 'Disable the dropdown',
      ...getComponentStateTable(disabledAutocomplete),
    },

    optionPhonePrivacyEnabled: {
      type: 'boolean',
      description: 'Mask part of the phone numbers in the dropdown',
      ...getComponentStateTable(optionPhonePrivacyEnabled),
    },

    defaultCountryId: {
      type: 'number',
      description: 'Country ID used to choose the default dialing code',
      ...getComponentStateTable(defaultCountryId),
    },

    countries: {
      control: { type: 'object' },
      description: 'Custom country map for dialing code selection',
      ...getComponentContentTable(countries),
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
    // Extended Props
    ...omit(yCoreFieldWrapperStoryMeta.args ?? {}, ['clickable', 'showFieldAvatar', 'showFieldInput', 'showFieldIcon', 'onClick', 'onClickOutside', 'onMouseEnter', 'onMouseLeave']),
    ...omit(yCoreFieldInputStoryMeta.args ?? {}, ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly', 'maxlength', 'type', 'onRender', 'onInput', 'onKeydown']),
    ...addPrefixToObjectKeys(omit(yCoreLabelStoryMeta.args ?? {}, ['alignment', 'disabled', 'required', 'wrap', 'size', 'variant', 'tooltipActive', 'isLongText', 'tooltipPlacement']), 'label'),
    ...addPrefixToObjectKeys(omit(yCoreAnnotationStoryMeta.args ?? {}, ['disabled', 'isLongText']), 'annotation'),
    ...addPrefixToObjectKeys(omit(yCoreEmptyStateStoryMeta.args ?? {}, ['size']), 'emptyState'),
    ...omit(yCoreErrorStoryMeta.args ?? {}, ['isLongText']),
    isLongText: yCoreLabelStoryMeta.args?.isLongText,

    dropdownItems: autocompleteOptions,

    onChange: fn(),

    searchFunction: ({ meta }) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(autocompleteOptions.filter((item) => item.phone.replace(/[( )-]/g, '').includes(meta.phoneBody)))
        }, 1000)
      })
    },

    onSelectOption: function(e: SelectOptionEvent) {
      const { detail } = e
      this.value = detail.phone
    },

    withoutCodeSelection: false,
    disabledAutocomplete: false,
    placeholder: '',
    defaultCountryId: 55,
    minSearchLength: 3,
    name: 'field_phone',
    showErrors: [],
    value: '',
    optionPhonePrivacyEnabled: false,
  },
} satisfies Meta<TYCorePhoneFieldStoryMeta>

export default meta
type Story = StoryObj<TYCorePhoneFieldStoryMeta>

export const Default: Story = {
  args: {},
  parameters: { docs: { description: { story: 'Basic usage example' } } },
}
