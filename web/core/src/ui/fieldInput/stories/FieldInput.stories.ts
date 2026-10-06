import { html } from 'lit'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'
import { useArgs } from '@storybook/preview-api'
import { pick } from 'radash'

import { EYInputAutocomplete, EYInputType } from '~shared/types/global'

import {
  createCoreFieldInputProps,
  type IYCoreFieldInputProps,
  type TYCoreFieldInputEvents,
  type InputEvent,
} from '~core/ui/fieldInput/models/types'
import {
  YCoreFieldInputTagName as tagName,
} from '~shared/constants'
import {
  getComponentStateTable,
  getComponentEmitsTable,
} from '~shared/.storybook/tables'
import {
  value as valueArgType,
  name as nameArgType,
  placeholder as placeholderArgType,
  required as requiredArgType,
  maxlength as maxlengthArgType,
  autofocus as autofocusArgType,
  type as typeArgType,
  autocomplete as autocompleteArgType,
} from '~shared/.storybook/argTypes'

import yCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'

import '~core/ui/fieldInput'

const { value, name, type, placeholder, required, maxlength, autofocus, hideSpaceLeft, hideSpaceRight, autocomplete } = createCoreFieldInputProps()

export type TYCoreFieldInputMeta = IYCoreFieldInputProps & TYCoreFieldInputEvents

/**
 * ## Core FieldInput
 */
const meta: Meta<TYCoreFieldInputMeta> = {
  title: 'Inputs/Partials/⚠️ FieldInput',
  id: 'fieldInput',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    disabled,
    size,
    readonly,
    value,
    name,
    type,
    autocomplete,
    placeholder,
    required,
    maxlength,
    autofocus,
    hideSpaceLeft,
    hideSpaceRight,
    onInput,
    onBlur,
    onFocus,
    onKeydown,
    onRender,
  }) => {
    const [
      args,
      updateArgs,
    ] = useArgs<IYCoreFieldInputProps>()

    const onStoryInput = (event: InputEvent) => {
      updateArgs({ ...args, value: String(event.detail.value) })
      onInput(event)
    }

    return html`
      <y-core-field-input
        .disabled=${disabled}
        .size=${size}
        .readonly=${readonly}
        .value=${value}
        .name=${name}
        .type=${type}
        .autocomplete=${autocomplete}
        .placeholder=${placeholder}
        .required=${required}
        .maxlength=${maxlength}
        .autofocus=${autofocus}
        .hideSpaceLeft=${hideSpaceLeft}
        .hideSpaceRight=${hideSpaceRight}
        @input=${onStoryInput}
        @blur=${onBlur}
        @focus=${onFocus}
        @keydown=${onKeydown}
        @render=${onRender}
        style="border: 1px dashed;"
      ></y-core-field-input>
    `
  },
  argTypes: {
    ...pick(yCoreFieldWrapperStoryMeta.argTypes ?? {}, ['disabled', 'size', 'readonly']),
    value: {
      ...valueArgType,
      ...getComponentStateTable(value),
    },
    name: {
      ...nameArgType,
      ...getComponentStateTable(name),
    },
    type: {
      ...typeArgType,
      ...getComponentStateTable(type),
    },
    autocomplete: {
      ...autocompleteArgType,
      ...getComponentStateTable(autocomplete),
    },
    placeholder: {
      ...placeholderArgType,
      ...getComponentStateTable(placeholder),
    },
    required: {
      ...requiredArgType,
      ...getComponentStateTable(required),
    },
    maxlength: {
      ...maxlengthArgType,
      ...getComponentStateTable(maxlength),
    },
    autofocus: {
      ...autofocusArgType,
      ...getComponentStateTable(autofocus),
    },
    hideSpaceLeft: {
      type: 'boolean',
      description: 'Remove left padding',
      ...getComponentStateTable(hideSpaceLeft),
    },
    hideSpaceRight: {
      type: 'boolean',
      description: 'Remove right padding',
      ...getComponentStateTable(hideSpaceRight),
    },

    // Component Events
    onInput: {
      type: 'function',
      description: 'Input event',
      ...getComponentEmitsTable(),
    },
    onBlur: {
      type: 'function',
      description: 'Focus event',
      ...getComponentEmitsTable(),
    },
    onFocus: {
      type: 'function',
      description: 'Focus event',
      ...getComponentEmitsTable(),
    },
    onKeydown: {
      type: 'function',
      description: 'Key press event',
      ...getComponentEmitsTable(),
    },
    onRender: {
      type: 'function',
      description: 'Initial component render',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...pick(yCoreFieldWrapperStoryMeta.args ?? {}, ['disabled', 'size', 'readonly']),
    value: 'value',
    name: 'name',
    type: EYInputType.TEXT,
    autocomplete: EYInputAutocomplete.ON,
    placeholder: 'placeholder',
    required: false,
    maxlength: undefined,
    autofocus: false,
    hideSpaceLeft: false,
    hideSpaceRight: false,
    onInput: fn(),
    onBlur: fn(),
    onFocus: fn(),
    onKeydown: fn(),
    onRender: fn(),
  },
} satisfies Meta<TYCoreFieldInputMeta>

export default meta
type Story = StoryObj<TYCoreFieldInputMeta>

export const Playground: Story = { args: {} }
