import type { Meta, StoryObj } from '@storybook/angular'
import { useArgs } from '@storybook/preview-api'
import { action } from '@storybook/addon-actions'
import { YFieldTextarea } from '~ng/ui/fieldTextarea'
import yCoreFieldTextareaStoryMeta from '~core/ui/fieldTextarea/stories/FieldTextarea.stories'
import { omit } from 'radash'
import {
  type InputEvent,
} from '~ng/ui/fieldTextarea/models/types'

/**
 * Angular-обертка над Core FieldTextarea
 */
const meta: Meta<YFieldTextarea> = {
  title: 'Inputs/Partials/🔍 FieldTextarea',
  id: 'fieldTextarea',
  parameters: { controls: { sort: 'alpha' } },
  component: YFieldTextarea,
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
        <YFieldTextarea
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
        ></YFieldTextarea>`,
    }
  },
  argTypes: { ...omit(yCoreFieldTextareaStoryMeta.argTypes ?? {}, ['readonly']) },
  args: { ...omit(yCoreFieldTextareaStoryMeta.args ?? {}, ['readonly', 'onInput', 'onFocus', 'onBlur', 'onKeydown', 'onRender']) },
} satisfies Meta<YFieldTextarea>

export default meta
type Story = StoryObj<YFieldTextarea>

export const Playground: Story = { args: {} }
