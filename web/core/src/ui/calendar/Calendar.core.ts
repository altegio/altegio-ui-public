import type { PropertyValues } from 'lit'
import { html, css, unsafeCSS } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { repeat } from 'lit/directives/repeat.js'
import { capitalize } from 'radash'
import { type Dayjs } from 'dayjs'

import { parseDate, formatDate, FORMAT_YEAR, FORMAT_MONTH, getDefaultMinDate, getDefaultMaxDate } from '~shared/utils/dateTime'
import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { SelectEvent, RangeStartEvent, RangeEndEvent } from './models/types/events'
import {
  createCoreCalendarProps,
  type IYCoreCalendarProps,
} from '~core/ui/calendar/models/types'
import { getYearsList, getPrevMonthDays, getNextMonthDays, getCurrentMonthDays } from '~core/ui/calendar/utils/calendarLists'
import {
  YCoreCalendarTagName as tagName,
} from '~shared/constants'
import { yChevronLeft, yChevronRight, yChevronDown, yChevronUp } from '~shared/icons'

import '~core/ui/text'
import '~core/ui/dropdown'
import '~core/ui/dropdownList'
import '~core/ui/button'
import '~core/ui/iconButton'

import type { YCoreDropdown } from '~core/ui/dropdown'
import { EYCoreDropdownTrigger } from '~core/ui/dropdown/models/types'
import type { VisibleEvent, ClickOutsideEvent } from '~core/ui/dropdown/models/types/events'
import { EYCoreTextVariant, EYCoreTextSize } from '~core/ui/text/models/types/external'
import type { ItemClickEvent } from '~core/ui/dropdownList/models/types/events'
import { LocalizedElement } from '~core/i18n/LocalizedElement'

import YCalendarVarsCss from '~core/ui/calendar/css/Calendar.vars.css?inline'
import YCalendarScopedCss from '~core/ui/calendar/css/Calendar.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { date, isRange, minDate, maxDate, disabled, headerSelectors } = createCoreCalendarProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreCalendar
  extends LocalizedElement
  implements IYCoreCalendarProps {
  @property() date: IYCoreCalendarProps['date'] = date
  @property({ type: Boolean }) disabled: IYCoreCalendarProps['disabled'] = disabled
  @property({ type: Boolean, attribute: 'is-range' }) isRange: IYCoreCalendarProps['isRange'] = isRange
  @property({ type: String, attribute: 'min-date' }) minDate: IYCoreCalendarProps['minDate'] = minDate
  @property({ type: String, attribute: 'max-date' }) maxDate: IYCoreCalendarProps['maxDate'] = maxDate
  @property({ type: Boolean, attribute: 'header-selectors' }) headerSelectors: IYCoreCalendarProps['headerSelectors'] = headerSelectors

  @state() private isMonthDropdownVisible = false
  @state() private isYearDropdownVisible = false

  @query('y-core-dropdown:first-of-type') private monthDropdown?: YCoreDropdown
  @query('y-core-dropdown:last-of-type') private yearDropdown?: YCoreDropdown

  @bubblingEvent(
    SelectEvent,
    { name: 'select' },
  )
  _select!: TDispatcher<SelectEvent>

  @bubblingEvent(
    RangeStartEvent,
    { name: 'range-start' },
  )
  _rangeStart!: TDispatcher<RangeStartEvent>

  @bubblingEvent(
    RangeEndEvent,
    { name: 'range-end' },
  )
  _rangeEnd!: TDispatcher<RangeEndEvent>

  private readonly baseClass = tagName

  private get minListDate() {
    const minYear = this.yearsList[this.yearsList.length - 1]?.id ?? getDefaultMinDate().year()
    return `${minYear}-01-01`
  }

  private get maxListDate() {
    const maxYear = this.yearsList[0]?.id ?? getDefaultMaxDate().year()
    return `${maxYear}-12-31`
  }

  private get isDisabledPrevButton() {
    const isDisabledPrevButton = this.currentDate.isSameOrBefore(parseDate(this.minListDate), 'month')
    return isDisabledPrevButton
  }

  private get isDisabledNextButton() {
    const isDisabledNextButton = this.currentDate.isSameOrAfter(parseDate(this.maxListDate), 'month')
    return isDisabledNextButton
  }

  private get yearsList() {
    return getYearsList(
      this.minDate,
      this.maxDate,
    )
  }

  private handleMonthSelect = (itemEvent: ItemClickEvent) => {
    this.monthDropdown?.close()
    const month = parseInt(String(itemEvent.detail.item.id), 10)
    this.currentDate = this.currentDate.month(month)
  }

  private handleYearSelect = (itemEvent: ItemClickEvent) => {
    this.yearDropdown?.close()
    const year = parseInt(String(itemEvent.detail.item.id), 10)
    this.currentDate = this.currentDate.year(year)
  }

  private handleClickOutside = (event: ClickOutsideEvent) => {
    event.stopPropagation()
  }

  private handleMonthDropdownClick = () => {
    this.isMonthDropdownVisible = !this.isMonthDropdownVisible
    this.isYearDropdownVisible = false
  }

  private handleYearDropdownClick = () => {
    this.isYearDropdownVisible = !this.isYearDropdownVisible
    this.isMonthDropdownVisible = false
  }

  private handleMonthDropdownVisibleChange = (event: VisibleEvent) => {
    this.isMonthDropdownVisible = event.detail.value
  }

  private handleYearDropdownVisibleChange = (event: VisibleEvent) => {
    this.isYearDropdownVisible = event.detail.value
  }

  private isDateDisabled(date: Dayjs) {
    return Boolean(this.disabled ||
      this.maxDate && date.isAfter(parseDate(this.maxDate), 'day') ||
      this.minDate && date.isBefore(parseDate(this.minDate), 'day'))
  }

  private getRangeClasses(date: Dayjs) {
    if (!this.isRange || !Array.isArray(this.date)) return {}

    const [
      startDate,
      endDate,
    ] = this.date
    if (!startDate) return {}

    const startDateParsed = parseDate(startDate)
    const endDateParsed = endDate ? parseDate(endDate) : startDateParsed

    return {
      [`${this.baseClass}__day_in-range`]: date.isBetween(startDateParsed, endDateParsed, 'day'),
      [`${this.baseClass}__day_range-start`]: date.isSame(startDateParsed, 'day'),
      [`${this.baseClass}__day_range-end`]: date.isSame(endDateParsed, 'day'),
    }
  }

  private changeMonth = (delta: number) => {
    this.currentDate = this.currentDate.add(delta, 'month')
  }

  private toPrevMonth = () => {
    this.changeMonth(-1)
    this.resetDropdowns()
  }

  private toNextMonth = () => {
    this.changeMonth(1)
    this.resetDropdowns()
  }

  private handleRangeClick(date: Dayjs) {
    if (!Array.isArray(this.date)) {
      this.date = [
        formatDate(date),
        '',
      ]

      this._rangeStart({ detail: { value: this.date[0] } })

      return
    }

    const [
      startDate,
      endDate,
    ] = this.date

    if (startDate && endDate) {
      this.date = [
        formatDate(date),
        '',
      ]

      this._rangeStart({ detail: { value: this.date[0] } })

      return
    }

    if (startDate && date.isBefore(parseDate(startDate), 'day')) {
      this.date = [
        formatDate(date),
        startDate,
      ]


      this._rangeEnd({ detail: { value: this.date[0] } })
      this._select({ detail: { value: this.date } })

      return
    }

    this.date = [
      this.date[0],
      formatDate(date),
    ]

    this._rangeEnd({ detail: { value: this.date[1] } })
    this._select({ detail: { value: this.date } })
  }

  private handleDayClick(event: Event, date: Dayjs) {
    event.stopPropagation()

    if (this.disabled || this.isDateDisabled(date)) return

    if (!this.isRange) {
      this.date = formatDate(date)

      this._select({ detail: { value: formatDate(date) } })

      return
    }

    this.handleRangeClick(date)
  }

  private handleDatePropChange(): void {
    this.currentDate = this.date ? parseDate(Array.isArray(this.date) ? this.date[0] : this.date) : parseDate()
  }

  public updateDate(value: IYCoreCalendarProps['date']): void {
    this.date = value
  }

  private resetDropdowns(): void {
    // Сброс состояния
    this.isMonthDropdownVisible = false
    this.isYearDropdownVisible = false
  }

  updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties)

    if (changedProperties.has('date')) {
      this.handleDatePropChange()
    }
  }

  static readonly styles = [
    css`
      ${unsafeCSS(YCalendarVarsCss)}
      ${unsafeCSS(YCalendarScopedCss)}
    `,
  ]

  disconnectedCallback() {
    super.disconnectedCallback()

    this.resetDropdowns()
  }

  protected renderHeaderDate() {
    return this.headerSelectors
      ? html`
        <y-core-dropdown
          .trigger=${EYCoreDropdownTrigger.MANUAL}
          .isOpen=${this.isMonthDropdownVisible}
          class="${this.baseClass}__header-dropdown"
          @click-outside=${this.handleClickOutside}
          @change-visible=${this.handleMonthDropdownVisibleChange}
        >
          <y-core-button
            class="${this.baseClass}__month-button"
            label=${capitalize(this.currentDate.format(FORMAT_MONTH))}
            variant="text"
            size="small"
            .iconRight=${this.isMonthDropdownVisible ? yChevronUp : yChevronDown}
            slot="activator"
            @click=${this.handleMonthDropdownClick}
          >
          </y-core-button>

          <y-core-dropdown-list
            slot="content"
            .items=${this.getLocaleService()?.getMonths('long') || []}
            @item-click=${this.handleMonthSelect}
          >
          </y-core-dropdown-list>
        </y-core-dropdown>

        <y-core-dropdown
          .trigger=${EYCoreDropdownTrigger.MANUAL}
          .isOpen=${this.isYearDropdownVisible}
          class="${this.baseClass}__header-dropdown"
          @click-outside=${this.handleClickOutside}
          @change-visible=${this.handleYearDropdownVisibleChange}
        >
          <y-core-button
            class="${this.baseClass}__year-button"
            label=${this.currentDate.format(FORMAT_YEAR)}
            variant="text"
            size="small"
            .iconRight=${this.isYearDropdownVisible ? yChevronUp : yChevronDown}
            slot="activator"
            @click=${this.handleYearDropdownClick}
          >
          </y-core-button>

          <y-core-dropdown-list
            slot="content"
            .items=${this.yearsList}
            @item-click=${this.handleYearSelect}
          >
          </y-core-dropdown-list>
        </y-core-dropdown>
      `
      : html`
        <y-core-text
          size=${EYCoreTextSize.A2_MEDIUM}
          variant=${EYCoreTextVariant.PRIMARY}
          >${capitalize(this.currentDate.format(FORMAT_MONTH))} ${this.currentDate.format(FORMAT_YEAR)}
        </y-core-text>
      `
  }

  protected renderWeekDays() {
    return (this.getLocaleService()?.getWeekDays('short') || []).map((day) => html`
      <y-core-text
        size=${EYCoreTextSize.A2_REGULAR}
        variant=${EYCoreTextVariant.SECONDARY}
        class="${this.baseClass}__week-day"
      >${day}</y-core-text>
    `)
  }

  protected renderPrevMonthDays() {
    return repeat(
      getPrevMonthDays(this.currentDate),
      (day) => day,
      (day) => html`
        <y-core-text
          size=${EYCoreTextSize.A2_MEDIUM}
        variant=${this.disabled ? EYCoreTextVariant.TERTIARY : EYCoreTextVariant.SECONDARY}
        class="${this.baseClass}__day ${this.baseClass}__day_out-of-month"
        >${day}</y-core-text>
      `,
    )
  }

  protected renderNextMonthDays() {
    return repeat(
      getNextMonthDays(this.currentDate),
      (day) => day,
      (day) => html`
        <y-core-text
          size=${EYCoreTextSize.A2_MEDIUM}
        variant=${this.disabled ? EYCoreTextVariant.TERTIARY : EYCoreTextVariant.SECONDARY}
        class="${this.baseClass}__day ${this.baseClass}__day_out-of-month"
        >${day}</y-core-text>
      `,
    )
  }

  protected renderCurrentMonthDays() {
    const year = this.currentDate.year()
    const month = this.currentDate.month()

    return repeat(
      getCurrentMonthDays(this.currentDate),
      (day) => day,
      (day) => {
        const date = parseDate(new Date(
          year,
          month,
          day,
        ))

        const isSelected = Boolean(this.date && typeof this.date === 'string' && parseDate(this.date).isSame(date, 'day'))
        const isDisabled = this.isDateDisabled(date)

        const dayClasses = {
          [`${this.baseClass}__day`]: true,
          [`${this.baseClass}__day_disabled`]: isDisabled,
          [`${this.baseClass}__day_today`]: date.isToday(),
          [`${this.baseClass}__day_selected`]: isSelected,
          ...this.getRangeClasses(date),
        }


        return html`
          <y-core-text
            size=${EYCoreTextSize.A2_MEDIUM}
            variant=${isDisabled ? EYCoreTextVariant.TERTIARY : EYCoreTextVariant.PRIMARY}
            class=${classMap(dayClasses)}
            data-value=${day}
            @click=${(event: Event) => {
              event.stopPropagation()

              this.handleDayClick(event, date)
            }}
          >${day}</y-core-text>
        `
      },
    )
  }

  protected renderMonthDays() {
    return html`
      ${this.renderPrevMonthDays()}
      ${this.renderCurrentMonthDays()}
      ${this.renderNextMonthDays()}
    `
  }

  protected render() {
    return html`
      <div class=${this.baseClass}>
        <div class="${this.baseClass}__header">
          <y-core-icon-button
            .disabled=${this.isDisabledPrevButton}
            .icon=${yChevronLeft}
            variant="text"
            @click=${this.toPrevMonth}
          >
          </y-core-icon-button>

          <div class="${this.baseClass}__header-date">
            ${this.renderHeaderDate()}
          </div>

          <y-core-icon-button
            .disabled=${this.isDisabledNextButton}
            .icon=${yChevronRight}
            variant="text"
            @click=${this.toNextMonth}
          >
          </y-core-icon-button>
        </div>

        <div class="${this.baseClass}__grid">
          ${this.renderWeekDays()}
          ${this.renderMonthDays()}
        </div>
      </div>
    `
  }
}
