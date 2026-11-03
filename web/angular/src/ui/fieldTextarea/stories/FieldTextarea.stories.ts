import type { Meta, StoryObj } from '@storybook/angular'
import { useArgs } from 'storybook/preview-api'
import { action } from 'storybook/actions'
import { AltFieldTextarea } from '~ng/ui/fieldTextarea'
import altCoreFieldTextareaStoryMeta from '~core/ui/fieldTextarea/stories/FieldTextarea.stories'
import { omit } from 'radash'
import {
  type InputEvent,
} from '~ng/ui/fieldTextarea/models/types'

/**
 * Angular wrapper for Core FieldTextarea
 */
const meta: Meta<AltFieldTextarea> = {
  title: 'Inputs/Partials/🔍 FieldTextarea',
  id: 'fieldTextarea',
  parameters: { controls: { sort: 'alpha' } },
  component: AltFieldTextarea,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()
    const handlers = {
      onInput: (event: InputEvent) => {
        action('input')(event)
        updateArgs({ value: event.detail.value })
      },
      onFocus: action('focus'),
      onBlur: action('blur'),
      onKeydown: action('keydown'),
      onRender: action('render'),
    }

    return {
      props: {
        ...args,
        ...handlers,
      },
      template: `
        <AltFieldTextarea
          [disabled]="disabled"
          [size]="size"
          [readonly]="readonly"
          [value]="value"
          [name]="name"
          [placeholder]="placeholder"
          [maxlength]="maxlength"
          [autofocus]="autofocus"
          [hideSpaceLeft]="hideSpaceLeft"
          [hideSpaceRight]="hideSpaceRight"
          [required]="required"
          [rows]="rows"
          [resize]="resize"
          style="border: 1px dashed;display: inline-flex;"
          (input)="onInput($event)"
          (focus)="onFocus($event)"
          (blur)="onBlur($event)"
          (keydown)="onKeydown($event)"
          (render)="onRender($event)"
        ></AltFieldTextarea>`,
    }
  },
  argTypes: { ...omit(altCoreFieldTextareaStoryMeta.argTypes ?? {}, ['readonly']) },
  args: { ...omit(altCoreFieldTextareaStoryMeta.args ?? {}, ['readonly', 'onInput', 'onFocus', 'onBlur', 'onKeydown', 'onRender']) },
} satisfies Meta<AltFieldTextarea>

export default meta
type Story = StoryObj<AltFieldTextarea>

export const Playground: Story = { args: {} }
