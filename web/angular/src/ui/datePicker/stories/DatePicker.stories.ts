import type { Meta, StoryObj } from '@storybook/angular'

import { AltDatePicker } from '~ng/ui/datePicker'
import altCoreDatePickerStoryMeta, { type IAltCoreDatePickerStoryProps } from '~core/ui/datePicker/stories/DatePicker.stories'
import { omit } from 'radash'
import type { IAltNgDatePickerProps } from '~ng/ui/datePicker/models/types'
import { action } from 'storybook/actions'
import {
  type PickEvent,
} from '~ng/ui/datePicker/models/types'

type TAngularDatePickerMeta = IAltNgDatePickerProps & IAltCoreDatePickerStoryProps

/**
 * Angular wrapper for DatePicker
 */
const meta: Meta<TAngularDatePickerMeta> = {
  title: 'Inputs/🔍 DatePicker',
  id: 'datePicker',
  parameters: { controls: { sort: 'alpha' } },
  component: AltDatePicker,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const handlers = {
      onPick: (event: PickEvent) => {
        action('pick')(event)
      },
    }

    return {
      props: {
        ...args,
        ...handlers,
        computedErrors: args.errors ?? args.showErrors,
      },
      template: `
        <div style="padding: 50px 50px 350px; margin: 20px; border: 1px dashed black; border-radius: 8px;">
          <div style="max-width: 300px; padding: 10px; overflow: hidden">
            <AltDatePicker
              [date]="date"
              [isRange]="isRange"
              [minDate]="minDate"
              [maxDate]="maxDate"
              [disabled]="disabled"
              [calendarHeaderSelectors]="calendarHeaderSelectors"
              [annotationText]="annotationText"
              [name]="name"
              [placeholder]="placeholder"
              [required]="required"
              [readonly]="readonly"
              [autofocus]="autofocus"
              [size]="size"
              [labelText]="labelText"
              [labelTooltipText]="labelTooltipText"
              [labelDebounce]="labelDebounce"
              [error]="error"
              [errors]="computedErrors"
              [locale]="localeData"
              (pick)="onPick($event)"
            >
            </AltDatePicker>
          </div>
        </div>`,
    }
  },
  argTypes: { ...omit(altCoreDatePickerStoryMeta.argTypes ?? {}, ['readonly']) },
  args: { ...omit(altCoreDatePickerStoryMeta.args ?? {}, ['readonly']) },
} satisfies Meta<TAngularDatePickerMeta>

export default meta
type Story = StoryObj<TAngularDatePickerMeta>

export const Playground: Story = { args: {} }
