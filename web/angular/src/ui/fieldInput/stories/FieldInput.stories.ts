import type { Meta, StoryObj } from '@storybook/angular'
import { AltFieldInput } from '~ng/ui/fieldInput'
import altCoreFieldInputStoryMeta from '~core/ui/fieldInput/stories/FieldInput.stories'
import { omit } from 'radash'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'
import {
  type AltNgFieldInputInputEvent,
} from '~ng/ui/fieldInput/models/types'

/**
 * Angular wrapper for Core FieldInput
 */
const meta: Meta<AltFieldInput> = {
  title: 'Inputs/Partials/🔍 FieldInput',
  id: 'fieldInput',
  parameters: { controls: { sort: 'alpha' } },
  component: AltFieldInput,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()
    const handlers = {
      onInput: (event: AltNgFieldInputInputEvent) => {
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
      <AltFieldInput
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
      ></AltFieldInput>`,
    }
  },
  argTypes: { ...omit(altCoreFieldInputStoryMeta.argTypes ?? {}, ['readonly']) },
  args: { ...omit(altCoreFieldInputStoryMeta.args ?? {}, ['readonly']) },
} satisfies Meta<AltFieldInput>

export default meta
type Story = StoryObj<AltFieldInput>

export const Playground: Story = { args: {} }
