import type { Meta, StoryObj } from '@storybook/angular'
import { YFieldInput } from '~ng/ui/fieldInput'
import yCoreFieldInputStoryMeta from '~core/ui/fieldInput/stories/FieldInput.stories'
import { omit } from 'radash'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'
import {
  type YNgFieldInputInputEvent,
} from '~ng/ui/fieldInput/models/types'

/**
 * Angular wrapper for Core FieldInput
 */
const meta: Meta<YFieldInput> = {
  title: 'Inputs/Partials/🔍 FieldInput',
  id: 'fieldInput',
  parameters: { controls: { sort: 'alpha' } },
  component: YFieldInput,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()
    const handlers = {
      onInput: (event: YNgFieldInputInputEvent) => {
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
      <YFieldInput
        [disabled]="disabled"
        [size]="size"
        [readonly]="readonly"
        [value]="value"
        [name]="name"
        [type]="type"
        [placeholder]="placeholder"
        [required]="required"
        [maxlength]="maxlength"
        [autofocus]="autofocus"
        [hideSpaceLeft]="hideSpaceLeft"
        [hideSpaceRight]="hideSpaceRight"
        (input)="onInput($event)"
        (focus)="onFocus($event)"
        (blur)="onBlur($event)"
        (keydown)="onKeydown($event)"
        (render)="onRender($event)"
        style="border: 1px dashed;display: inline-flex;"
      ></YFieldInput>`,
    }
  },
  argTypes: { ...omit(yCoreFieldInputStoryMeta.argTypes ?? {}, ['readonly']) },
  args: { ...omit(yCoreFieldInputStoryMeta.args ?? {}, ['readonly']) },
} satisfies Meta<YFieldInput>

export default meta
type Story = StoryObj<YFieldInput>

export const Playground: Story = { args: {} }
