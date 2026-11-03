import type { Meta, StoryObj } from '@storybook/angular'
import { omit } from 'radash'
import { AltDateRange } from '~ng/ui/dateRange'
import altCoreDateRangeStoryMeta from '~core/ui/dateRange/stories/DateRange.stories'
import { getComponentEmitsTable } from '~shared/.storybook/tables'

/**
 * Angular wrapper for Core DateRange.
 *
 * Bind `[(value)]` or use it as a form control (`ngModel`, `formControl`). The value is `{ from, to }`:
 * `YYYY-MM-DD` strings, or `null` while the field is empty.
 */
const meta: Meta<AltDateRange> = {
  title: 'Inputs/✅ DateRange',
  id: 'dateRange',
  parameters: { controls: { sort: 'alpha' } },
  component: AltDateRange,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <div style="max-width: 320px; padding-bottom: 360px;">
        <AltDateRange
          [(value)]="value"
          [placeholder]="placeholder"
          [required]="required"
          [disabled]="disabled"
          [readonly]="readonly"
          [error]="error"
          [errors]="errors"
          [size]="size"
          [minDate]="minDate"
          [maxDate]="maxDate"
          [labelText]="labelText"
          [annotationText]="annotationText"
          [calendarHeaderSelectors]="calendarHeaderSelectors"
        ></AltDateRange>
      </div>
    `,
  }),
  argTypes: {
    ...omit(altCoreDateRangeStoryMeta.argTypes ?? {}, ['from', 'to', 'onChange']),
    value: {
      control: { type: 'object' },
      description: 'Period `{ from, to }`, `YYYY-MM-DD` strings or `null`',
    },
    valueChange: {
      type: 'function',
      description: 'Emitted with `{ from, to }` when both dates are set or the field is cleared',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...omit(altCoreDateRangeStoryMeta.args ?? {}, ['from', 'to']),
    value: { from: null, to: null },
  },
}

export default meta
type Story = StoryObj<AltDateRange>

export const Playground: Story = { args: {} }
