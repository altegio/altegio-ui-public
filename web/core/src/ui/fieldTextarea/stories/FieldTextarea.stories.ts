import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'
import { omit } from 'radash'

import {
  createCoreFieldTextareaProps,
  type IYCoreFieldTextareaProps,
  type TYCoreFieldInputEvents,
  type InputEvent,
  type BlurEvent,
  type FocusEvent,
  type KeydownEvent,
  type RenderEvent,
} from '../models/types'
import {
  YCoreFieldTextareaTagName as tagName,
} from '~shared/constants'
import {
  getComponentStateTable,
} from '~shared/.storybook/tables'
import { EYTextareaResize } from '~shared/types/global'

import yCoreFieldInputStoryMeta from '~core/ui/fieldInput/stories/FieldInput.stories'

import '~core/ui/fieldTextarea/FieldTextarea.core'

const { rows, resize } = createCoreFieldTextareaProps()

export type TYCoreFieldTextareaMeta = IYCoreFieldTextareaProps & TYCoreFieldInputEvents

/**
 * ## Core FieldTextarea
 */
const meta: Meta<TYCoreFieldTextareaMeta> = {
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
    ] = useArgs<IYCoreFieldTextareaProps>()

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
      <y-core-field-textarea
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
      ></y-core-field-textarea>
    `
  },
  argTypes: {
    ...omit(yCoreFieldInputStoryMeta.argTypes ?? {}, ['type']),

    rows: {
      type: 'number',
      description: 'Number of rows',
      ...getComponentStateTable(rows),
    },
    resize: {
      control: { type: 'select' },
      description: 'Controls whether the textarea can be resized',
      options: Object.values(EYTextareaResize),
      ...getComponentStateTable(resize),
    },
  },
  args: {
    ...omit(yCoreFieldInputStoryMeta.args ?? {}, ['type']),
    rows,
    resize,
  },
} satisfies Meta<TYCoreFieldTextareaMeta>

export default meta
type Story = StoryObj<TYCoreFieldTextareaMeta>

export const Playground: Story = { args: {} }
