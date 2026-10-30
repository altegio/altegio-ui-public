import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'
import { omit } from 'radash'

import {
  createCoreFieldTextareaProps,
  type IAltCoreFieldTextareaProps,
  type TAltCoreFieldInputEvents,
  type InputEvent,
  type BlurEvent,
  type FocusEvent,
  type KeydownEvent,
  type RenderEvent,
} from '../models/types'
import {
  AltCoreFieldTextareaTagName as tagName,
} from '~shared/constants'
import {
  getComponentStateTable,
} from '~shared/.storybook/tables'
import { EAltTextareaResize } from '~shared/types/global'

import altCoreFieldInputStoryMeta from '~core/ui/fieldInput/stories/FieldInput.stories'

import '~core/ui/fieldTextarea/FieldTextarea.core'

const { rows, resize } = createCoreFieldTextareaProps()

export type TAltCoreFieldTextareaMeta = IAltCoreFieldTextareaProps & TAltCoreFieldInputEvents

/**
 * ## Core FieldTextarea
 */
const meta: Meta<TAltCoreFieldTextareaMeta> = {
  title: 'Inputs/Partials/⚠️ FieldTextarea',
  id: 'fieldTextarea',
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
    placeholder,
    required,
    maxlength,
    autofocus,
    hideSpaceLeft,
    hideSpaceRight,
    rows,
    resize,
  }) => {
    const [
      args,
      updateArgs,
    ] = useArgs<IAltCoreFieldTextareaProps>()

    const handleInput = (event: InputEvent) => {
      updateArgs({ ...args, value: String(event.detail.value) })
      action('input')(event)
    }

    const handleBlur = (event: BlurEvent) => {
      action('blur')(event)
    }

    const handleFocus = (event: FocusEvent) => {
      action('focus')(event)
    }

    const handleKeydown = (event: KeydownEvent) => {
      action('keydown')(event)
    }

    const handleRender = (event: RenderEvent) => {
      action('render')(event)
    }

    return html`
      <alt-core-field-textarea
        .disabled=${disabled}
        .size=${size}
        .readonly=${readonly}
        .value=${value}
        .name=${name}
        .placeholder=${placeholder}
        .required=${required}
        .maxlength=${maxlength}
        .autofocus=${autofocus}
        .hideSpaceLeft=${hideSpaceLeft}
        .hideSpaceRight=${hideSpaceRight}
        .rows=${rows}
        .resize=${resize}
        @input=${handleInput}
        @blur=${handleBlur}
        @focus=${handleFocus}
        @keydown=${handleKeydown}
        @render=${handleRender}
        style="border: 1px dashed;"
      ></alt-core-field-textarea>
    `
  },
  argTypes: {
    ...omit(altCoreFieldInputStoryMeta.argTypes ?? {}, ['type']),

    rows: {
      type: 'number',
      description: 'Number of rows',
      ...getComponentStateTable(rows),
    },
    resize: {
      control: { type: 'select' },
      description: 'Controls whether the textarea can be resized',
      options: Object.values(EAltTextareaResize),
      ...getComponentStateTable(resize),
    },
  },
  args: {
    ...omit(altCoreFieldInputStoryMeta.args ?? {}, ['type']),
    rows,
    resize,
  },
} satisfies Meta<TAltCoreFieldTextareaMeta>

export default meta
type Story = StoryObj<TAltCoreFieldTextareaMeta>

export const Playground: Story = { args: {} }
