import { LitElement, html, css, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import {
  DateRangeChangeEvent,
  createCoreDateRangeProps,
  type IAltCoreDateRangeProps,
  type IAltCoreDateRangeValue,
} from '~core/ui/dateRange/models/types'
import type { IAltCoreDatePickerExternalProps, PickEvent } from '~core/ui/datePicker/models/types'
import { AltCoreDateRangeTagName as tagName } from '~shared/constants'
import { formatDate, parseDate } from '~shared/utils/dateTime'
import { booleanConverter } from '~core/utils/converters'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { withLocator } from '~core/utils/locator'

import '~core/ui/datePicker'

import AltCoreDateRangeVarsCss from '~core/ui/dateRange/css/DateRange.vars.css?inline'
import AltCoreDateRangeScopedCss from '~core/ui/dateRange/css/DateRange.scoped.css?inline'

const {
  from,
  to,
  name,
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
  labelTooltipText,
  labelDebounce,
  annotationText,
  calendarHeaderSelectors,
  locale,
} = createCoreDateRangeProps()

// The date picker reports typed dates as DD.MM.YYYY and calendar dates as YYYY-MM-DD
const toIsoDate = (date: string | undefined) => {
  if (!date) return null

  const parsedDate = parseDate(date)

  return parsedDate.isValid() ? formatDate(parsedDate) : null
}

/**
 * A field for a period: a masked `DD.MM.YYYY - DD.MM.YYYY` input with a range calendar.
 *
 * `from` and `to` are `YYYY-MM-DD` strings. The `change` event reports both as `YYYY-MM-DD` or `null`:
 * after both dates are picked or typed, and with two `null` values when the field is cleared.
 */
@customElement(tagName)
@withLocator(tagName)
export class AltCoreDateRange
  extends LitElement
  implements IAltCoreDateRangeProps {
  @property({ type: String }) from: IAltCoreDateRangeProps['from'] = from
  @property({ type: String }) to: IAltCoreDateRangeProps['to'] = to
  @property({ type: String }) name: IAltCoreDateRangeProps['name'] = name
  @property({ type: String }) placeholder: IAltCoreDateRangeProps['placeholder'] = placeholder
  @property({ type: Boolean, converter: booleanConverter }) required: IAltCoreDateRangeProps['required'] = required
  @property({ type: Boolean, converter: booleanConverter }) disabled: IAltCoreDateRangeProps['disabled'] = disabled
  @property({ type: Boolean, converter: booleanConverter }) readonly: IAltCoreDateRangeProps['readonly'] = readonly
  @property({ type: Boolean, converter: booleanConverter }) error: IAltCoreDateRangeProps['error'] = error
  @property({ type: Array }) errors: IAltCoreDateRangeProps['errors'] = errors
  @property({ type: String }) size: IAltCoreDateRangeProps['size'] = size
  @property({ type: String, attribute: 'min-date' }) minDate: IAltCoreDateRangeProps['minDate'] = minDate
  @property({ type: String, attribute: 'max-date' }) maxDate: IAltCoreDateRangeProps['maxDate'] = maxDate
  @property({ type: String, attribute: 'label-text' }) labelText: IAltCoreDateRangeProps['labelText'] = labelText
  @property({ type: String, attribute: 'label-tooltip-text' }) labelTooltipText: IAltCoreDateRangeProps['labelTooltipText'] = labelTooltipText
  @property({ type: Number, attribute: 'label-debounce' }) labelDebounce: IAltCoreDateRangeProps['labelDebounce'] = labelDebounce
  @property({ type: String, attribute: 'annotation-text' }) annotationText: IAltCoreDateRangeProps['annotationText'] = annotationText
  @property({ type: Boolean, attribute: 'calendar-header-selectors', converter: booleanConverter }) calendarHeaderSelectors: IAltCoreDateRangeProps['calendarHeaderSelectors'] = calendarHeaderSelectors
  @property({ type: Object, attribute: false }) locale: IAltCoreDateRangeProps['locale'] = locale

  // Recreated only when the range changes, so re-renders do not reset a range the user is picking
  @state() private pickerDate: IAltCoreDatePickerExternalProps['date'] = ''

  @bubblingEvent(DateRangeChangeEvent, { name: 'change' })
  protected _change!: TDispatcher<DateRangeChangeEvent>

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreDateRangeVarsCss)}
      ${unsafeCSS(AltCoreDateRangeScopedCss)}
    `,
  ]

  protected willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('from') || changedProperties.has('to')) {
      this.pickerDate = this.from && this.to ? [this.from, this.to] : ''
    }
  }

  private handlePick = (event: PickEvent) => {
    // The inner event would leak out of the shadow root next to `change`
    event.stopPropagation()

    const { value } = event.detail
    const [rangeFrom, rangeTo] = Array.isArray(value) ? value : []
    const detail: IAltCoreDateRangeValue = {
      from: toIsoDate(rangeFrom),
      to: toIsoDate(rangeTo),
    }

    this._change({ detail })
  }

  protected render() {
    return html`
      <alt-core-date-picker
        class=${this.baseClass}
        is-range
        .date=${this.pickerDate}
        .name=${this.name}
        .placeholder=${this.placeholder}
        .required=${this.required}
        .disabled=${this.disabled}
        .readonly=${this.readonly}
        .error=${this.error}
        .errors=${this.errors}
        .size=${this.size}
        .minDate=${this.minDate}
        .maxDate=${this.maxDate}
        .labelText=${this.labelText}
        .labelTooltipText=${this.labelTooltipText}
        .labelDebounce=${this.labelDebounce}
        .annotationText=${this.annotationText}
        .calendarHeaderSelectors=${this.calendarHeaderSelectors}
        .locale=${this.locale}
        .autofocus=${this.autofocus}
        @pick=${this.handlePick}
      ></alt-core-date-picker>
    `
  }
}
