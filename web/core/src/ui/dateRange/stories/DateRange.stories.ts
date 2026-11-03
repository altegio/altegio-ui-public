import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { action } from 'storybook/actions'
import dayjs from 'dayjs'

import {
  createCoreDateRangeProps,
  type IAltCoreDateRangeProps,
  type TAltCoreDateRangeEvents,
} from '~core/ui/dateRange/models/types'
import { AltCoreDateRangeTagName as tagName } from '~shared/constants'
import {
  getComponentContentTable,
  getComponentEmitsTable,
  getComponentStateTable,
} from '~shared/.storybook/tables'
import {
  error as errorArgType,
  errors as errorsArgType,
  size as sizeArgType,
} from '~shared/.storybook/argTypes'
import { EAltSizes } from '~shared/types/global'
import { formatDate } from '~shared/utils/dateTime'

import '~core/ui/dateRange'

type TAltCoreDateRangeStoryMeta = IAltCoreDateRangeProps & TAltCoreDateRangeEvents

const {
  from,
  to,
  placeholder,
  required,
  disabled,
  readonly,
  error,
  errors,
  size,
  minDate,
  maxDate,
  labelText,
  annotationText,
  calendarHeaderSelectors,
} = createCoreDateRangeProps()

const today = formatDate(dayjs())

/**
 * ## Core DateRange
 * A field for a period: a masked `DD.MM.YYYY - DD.MM.YYYY` input with a range calendar.
 *
 * - `from` and `to` are `YYYY-MM-DD` strings.
 * - `change` reports `{ from, to }` as `YYYY-MM-DD` strings after both dates are picked or typed, and `{ from: null, to: null }` when the field is cleared.
 * - The field does not keep the value by itself: write `detail.from` and `detail.to` back to `from` and `to`.
 * - Limit the period with `min-date` and `max-date`; validate it in the form and show messages through `errors`.
 */
const meta: Meta<TAltCoreDateRangeStoryMeta> = {
  title: 'Inputs/✅ DateRange',
  id: 'dateRange',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: (args) => html`
    <div style="max-width: 320px; padding-bottom: 360px;">
      <alt-core-date-range
        .from=${args.from}
        .to=${args.to}
        .placeholder=${args.placeholder}
        .required=${args.required}
        .disabled=${args.disabled}
        .readonly=${args.readonly}
        .error=${args.error}
        .errors=${args.errors}
        .size=${args.size}
        .minDate=${args.minDate}
        .maxDate=${args.maxDate}
        .labelText=${args.labelText}
        .annotationText=${args.annotationText}
        .calendarHeaderSelectors=${args.calendarHeaderSelectors}
        @change=${action('change')}
      ></alt-core-date-range>
    </div>
  `,
  argTypes: {
    from: {
      type: 'string',
      description: 'Start of the period, `YYYY-MM-DD`',
      ...getComponentContentTable(from),
    },
    to: {
      type: 'string',
      description: 'End of the period, `YYYY-MM-DD`',
      ...getComponentContentTable(to),
    },
    labelText: {
      type: 'string',
      description: 'Field label',
      ...getComponentContentTable(labelText),
    },
    annotationText: {
      type: 'string',
      description: 'Hint under the field',
      ...getComponentContentTable(annotationText),
    },
    placeholder: {
      type: 'string',
      description: 'Placeholder of the empty field',
      ...getComponentContentTable(placeholder),
    },
    minDate: {
      type: 'string',
      description: 'Earliest date that can be picked, `YYYY-MM-DD`',
      ...getComponentContentTable(minDate),
    },
    maxDate: {
      type: 'string',
      description: 'Latest date that can be picked, `YYYY-MM-DD`',
      ...getComponentContentTable(maxDate),
    },
    required: {
      control: { type: 'boolean' },
      description: 'Marks the label as required',
      ...getComponentStateTable(required),
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      ...getComponentStateTable(disabled),
    },
    readonly: {
      control: { type: 'boolean' },
      description: 'Read-only state',
      ...getComponentStateTable(readonly),
    },
    error: {
      ...errorArgType,
      ...getComponentStateTable(error),
    },
    errors: {
      ...errorsArgType,
      ...getComponentContentTable(errors),
    },
    size: {
      ...sizeArgType([
        EAltSizes.SMALL,
        EAltSizes.MEDIUM,
        EAltSizes.LARGE,
      ]),
      ...getComponentStateTable(size),
    },
    calendarHeaderSelectors: {
      control: { type: 'boolean' },
      description: 'Shows the month and year selectors in the calendar header',
      ...getComponentStateTable(calendarHeaderSelectors),
    },
    onChange: {
      type: 'function',
      description: 'Emitted with `{ from, to }` when both dates are set or the field is cleared',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    from,
    to,
    placeholder,
    required,
    disabled,
    readonly,
    error,
    errors,
    size,
    minDate,
    maxDate,
    labelText: 'Period',
    annotationText,
    calendarHeaderSelectors,
  },
} satisfies Meta<TAltCoreDateRangeStoryMeta>

export default meta
type Story = StoryObj<TAltCoreDateRangeStoryMeta>

export const Playground: Story = {}

export const PastPeriod: Story = {
  parameters: { docs: { description: { story: 'A report period that cannot end in the future.' } } },
  args: {
    labelText: 'Report period',
    from: formatDate(dayjs().subtract(7, 'day')),
    to: today,
    maxDate: today,
  },
}

export const WithErrors: Story = {
  parameters: { docs: { description: { story: 'Validation messages from the form.' } } },
  args: {
    labelText: 'Vacation',
    required: true,
    error: true,
    errors: ['Choose a period of up to 14 days'],
  },
}
