import type { PropertyValues } from 'lit'
import { html, css, unsafeCSS } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { capitalize } from 'radash'
import { type Dayjs } from 'dayjs'

import { parseDate, formatDate, FORMAT_YEAR, FORMAT_MONTH, getDefaultMinDate, getDefaultMaxDate } from '~shared/utils/dateTime'
import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { SelectEvent, RangeStartEvent, RangeEndEvent } from './models/types/events'
import {
  createCoreCalendarProps,
  type IAltCoreCalendarProps,
} from '~core/ui/calendar/models/types'
import { getYearsList, getPrevMonthDays, getNextMonthDays } from '~core/ui/calendar/utils/calendarLists'
import {
  AltCoreCalendarTagName as tagName,
} from '~shared/constants'
import { altChevronLeft, altChevronRight, altChevronDown, altChevronUp } from '~shared/icons'

import '~core/ui/text'
import '~core/ui/dropdown'
import '~core/ui/dropdownList'
import '~core/ui/button'
import '~core/ui/iconButton'

import type { AltCoreDropdown } from '~core/ui/dropdown'
import { EAltCoreDropdownTrigger } from '~core/ui/dropdown/models/types'
import type { VisibleEvent, ClickOutsideEvent } from '~core/ui/dropdown/models/types/events'
import { EAltCoreTextVariant, EAltCoreTextSize } from '~core/ui/text/models/types/external'
import type { ItemClickEvent } from '~core/ui/dropdownList/models/types/events'
import { LocalizedElement } from '~core/i18n/LocalizedElement'

import AltCalendarVarsCss from '~core/ui/calendar/css/Calendar.vars.css?inline'
import AltCalendarScopedCss from '~core/ui/calendar/css/Calendar.scoped.css?inline'
import { withLocator } from '~core/utils/locator'
import { getLocaleMessage } from '~core/i18n/messages'
import { isRtl } from '~core/utils/a11y/direction'

interface ICalendarCell {
  date: Dayjs
  inMonth: boolean
}

const { date, isRange, minDate, maxDate, disabled, headerSelectors } = createCoreCalendarProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreCalendar
  extends LocalizedElement
  implements IAltCoreCalendarProps {
  @property() date: IAltCoreCalendarProps['date'] = date
  @property({ type: Boolean }) disabled: IAltCoreCalendarProps['disabled'] = disabled
  @property({ type: Boolean, attribute: 'is-range' }) isRange: IAltCoreCalendarProps['isRange'] = isRange
  @property({ type: String, attribute: 'min-date' }) minDate: IAltCoreCalendarProps['minDate'] = minDate
  @property({ type: String, attribute: 'max-date' }) maxDate: IAltCoreCalendarProps['maxDate'] = maxDate
  @property({ type: Boolean, attribute: 'header-selectors' }) headerSelectors: IAltCoreCalendarProps['headerSelectors'] = headerSelectors

  @state() private isMonthDropdownVisible = false
  @state() private isYearDropdownVisible = false

  /** Day that has keyboard focus in the grid */
  @state() private focusedDate?: Dayjs

  @query(`.${tagName}__day[tabindex="0"]`) private activeDayCell?: HTMLElement

  @query('alt-core-dropdown:first-of-type') private monthDropdown?: AltCoreDropdown
  @query('alt-core-dropdown:last-of-type') private yearDropdown?: AltCoreDropdown

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

  public updateDate(value: IAltCoreCalendarProps['date']): void {
    this.date = value
  }

  private resetDropdowns(): void {
    // Close both dropdowns
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
      ${unsafeCSS(AltCalendarVarsCss)}
      ${unsafeCSS(AltCalendarScopedCss)}
    `,
  ]

  disconnectedCallback() {
    super.disconnectedCallback()

    this.resetDropdowns()
  }

  protected renderHeaderDate() {
    return this.headerSelectors
      ? html`
        <alt-core-dropdown
          .trigger=${EAltCoreDropdownTrigger.MANUAL}
          .isOpen=${this.isMonthDropdownVisible}
          class="${this.baseClass}__header-dropdown"
          @click-outside=${this.handleClickOutside}
          @change-visible=${this.handleMonthDropdownVisibleChange}
        >
          <alt-core-button
            class="${this.baseClass}__month-button"
            label=${capitalize(this.currentDate.format(FORMAT_MONTH))}
            variant="text"
            size="small"
            .iconRight=${this.isMonthDropdownVisible ? altChevronUp : altChevronDown}
            slot="activator"
            @click=${this.handleMonthDropdownClick}
          >
          </alt-core-button>

          <alt-core-dropdown-list
            slot="content"
            .items=${this.getLocaleService()?.getMonths('long') || []}
            @item-click=${this.handleMonthSelect}
          >
          </alt-core-dropdown-list>
        </alt-core-dropdown>

        <alt-core-dropdown
          .trigger=${EAltCoreDropdownTrigger.MANUAL}
          .isOpen=${this.isYearDropdownVisible}
          class="${this.baseClass}__header-dropdown"
          @click-outside=${this.handleClickOutside}
          @change-visible=${this.handleYearDropdownVisibleChange}
        >
          <alt-core-button
            class="${this.baseClass}__year-button"
            label=${this.currentDate.format(FORMAT_YEAR)}
            variant="text"
            size="small"
            .iconRight=${this.isYearDropdownVisible ? altChevronUp : altChevronDown}
            slot="activator"
            @click=${this.handleYearDropdownClick}
          >
          </alt-core-button>

          <alt-core-dropdown-list
            slot="content"
            .items=${this.yearsList}
            @item-click=${this.handleYearSelect}
          >
          </alt-core-dropdown-list>
        </alt-core-dropdown>
      `
      : html`
        <alt-core-text
          size=${EAltCoreTextSize.A2_MEDIUM}
          variant=${EAltCoreTextVariant.PRIMARY}
          >${capitalize(this.currentDate.format(FORMAT_MONTH))} ${this.currentDate.format(FORMAT_YEAR)}
        </alt-core-text>
      `
  }

  /** First day of the week in the locale: the grid columns start with it */
  private get firstDayOfWeek() {
    return this.getLocaleService()?.getFirstDayOfWeek() ?? 1
  }

  private get selectedDate() {
    const value = Array.isArray(this.date) ? this.date[0] : this.date

    return value ? parseDate(value) : undefined
  }

  /** The day in the tab order of the grid: the focused one, otherwise the selected one, today or the first day of the month */
  private get activeDate(): Dayjs {
    const candidates = [this.focusedDate, this.selectedDate, parseDate()]

    return candidates.find((date) => date?.isSame(this.currentDate, 'month')) ?? this.currentDate.startOf('month')
  }

  private get weeks(): ICalendarCell[][] {
    const firstDate = this.currentDate.startOf('month')
    const leading = getPrevMonthDays(this.currentDate, this.firstDayOfWeek).length
    const count = leading + this.currentDate.daysInMonth() + getNextMonthDays(this.currentDate, this.firstDayOfWeek).length
    const cells = Array.from({ length: count }, (_, index) => {
      const date = firstDate.add(index - leading, 'day')

      return { date, inMonth: date.isSame(firstDate, 'month') }
    })

    return Array.from({ length: count / 7 }, (_, week) => cells.slice(week * 7, week * 7 + 7))
  }

  private isDateSelected(date: Dayjs) {
    if (!Array.isArray(this.date)) return Boolean(this.selectedDate?.isSame(date, 'day'))

    const rangeClasses: Record<string, boolean> = this.getRangeClasses(date)

    return Object.values(rangeClasses).some(Boolean)
  }

  private getWeekdayIndex(date: Dayjs) {
    return (date.day() - this.firstDayOfWeek + 7) % 7
  }

  /** ArrowRight moves to the next day, or to the previous one in a right-to-left layout */
  private get inlineStep() {
    return isRtl(this) ? -1 : 1
  }

  /** Keys of the date grid: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/ */
  private readonly gridKeyMoves: Partial<Record<string, (date: Dayjs, event: KeyboardEvent) => Dayjs>> = {
    ArrowRight: (date) => date.add(this.inlineStep, 'day'),
    ArrowLeft: (date) => date.subtract(this.inlineStep, 'day'),
    ArrowDown: (date) => date.add(7, 'day'),
    ArrowUp: (date) => date.subtract(7, 'day'),
    Home: (date) => date.subtract(this.getWeekdayIndex(date), 'day'),
    End: (date) => date.add(6 - this.getWeekdayIndex(date), 'day'),
    PageUp: (date, event) => date.subtract(1, event.shiftKey ? 'year' : 'month'),
    PageDown: (date, event) => date.add(1, event.shiftKey ? 'year' : 'month'),
  }

  private handleGridKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.handleDayClick(event, this.activeDate)

      return
    }

    const move = this.gridKeyMoves[event.key]
    if (!move) return

    event.preventDefault()
    this.moveFocus(move(this.activeDate, event))
  }

  /** Keeps a day within the years the header offers */
  private clampToList(date: Dayjs) {
    const min = parseDate(this.minListDate)
    const max = parseDate(this.maxListDate)
    if (date.isBefore(min, 'day')) return min

    return date.isAfter(max, 'day') ? max : date
  }

  private moveFocus(date: Dayjs) {
    const target = this.clampToList(date)

    this.focusedDate = target
    if (!target.isSame(this.currentDate, 'month')) this.currentDate = target

    void this.updateComplete.then(() => { this.focusDate() })
  }

  /** Moves focus into the date grid, to the day in its tab order, for example when a date picker opens it from the keyboard */
  public focusDate(): void {
    this.activeDayCell?.focus()
  }

  private formatDay(date: Dayjs, format: 'long' | 'monthYear') {
    return this.getLocaleService()?.formatDate(date.toDate(), format) ?? formatDate(date)
  }

  protected renderWeekDays() {
    const longDays = this.getLocaleService()?.getWeekDays('long') ?? []
    const headers = (this.getLocaleService()?.getWeekDays('short') || []).map((day, index) => html`
      <alt-core-text
        role="columnheader"
        aria-label=${ifDefined(longDays[index])}
        size=${EAltCoreTextSize.A2_REGULAR}
        variant=${EAltCoreTextVariant.SECONDARY}
        class="${this.baseClass}__week-day"
      >${day}</alt-core-text>
    `)

    return html`<div role="row" class="${this.baseClass}__row">${headers}</div>`
  }

  /** A day of the previous or next month fills its week visually, and is an empty cell for screen readers */
  protected renderOutOfMonthDay(date: Dayjs) {
    return html`
      <alt-core-text
        role="gridcell"
        size=${EAltCoreTextSize.A2_MEDIUM}
        variant=${this.disabled ? EAltCoreTextVariant.TERTIARY : EAltCoreTextVariant.SECONDARY}
        class="${this.baseClass}__day ${this.baseClass}__day_out-of-month"
      ><span aria-hidden="true">${date.date()}</span></alt-core-text>
    `
  }

  private getDayClasses(date: Dayjs, isSelected: boolean, isDisabled: boolean) {
    return {
      [`${this.baseClass}__day`]: true,
      [`${this.baseClass}__day_disabled`]: isDisabled,
      [`${this.baseClass}__day_today`]: date.isToday(),
      [`${this.baseClass}__day_selected`]: !Array.isArray(this.date) && isSelected,
      ...this.getRangeClasses(date),
    }
  }

  /** Grid cell state of a day: in the tab order, selected, disabled, today */
  private getDayAria(date: Dayjs, isSelected: boolean, isDisabled: boolean) {
    return {
      tabindex: date.isSame(this.activeDate, 'day') ? 0 : -1,
      selected: isSelected ? 'true' as const : 'false' as const,
      disabled: isDisabled ? 'true' as const : undefined,
      current: date.isToday() ? 'date' as const : undefined,
    }
  }

  protected renderDay(date: Dayjs) {
    const isSelected = this.isDateSelected(date)
    const isDisabled = this.isDateDisabled(date)
    const aria = this.getDayAria(date, isSelected, isDisabled)

    return html`
      <alt-core-text
        role="gridcell"
        tabindex=${aria.tabindex}
        aria-label=${this.formatDay(date, 'long')}
        aria-selected=${aria.selected}
        aria-disabled=${ifDefined(aria.disabled)}
        aria-current=${ifDefined(aria.current)}
        size=${EAltCoreTextSize.A2_MEDIUM}
        variant=${isDisabled ? EAltCoreTextVariant.TERTIARY : EAltCoreTextVariant.PRIMARY}
        class=${classMap(this.getDayClasses(date, isSelected, isDisabled))}
        data-value=${date.date()}
        @click=${(event: Event) => {
          event.stopPropagation()

          this.focusedDate = date
          this.handleDayClick(event, date)
        }}
      >${date.date()}</alt-core-text>
    `
  }

  protected renderWeek(week: ICalendarCell[]) {
    const cells = week.map(({ date, inMonth }) => inMonth ? this.renderDay(date) : this.renderOutOfMonthDay(date))

    return html`<div role="row" class="${this.baseClass}__row">${cells}</div>`
  }

  protected renderMonthDays() {
    return this.weeks.map((week) => this.renderWeek(week))
  }

  protected render() {
    return html`
      <div class=${this.baseClass}>
        <div class="${this.baseClass}__header">
          <alt-core-icon-button
            .disabled=${this.isDisabledPrevButton}
            .accessibleName=${getLocaleMessage('previousMonth', this.getLocale())}
            .icon=${altChevronLeft}
            variant="text"
            @click=${this.toPrevMonth}
          >
          </alt-core-icon-button>

          <div class="${this.baseClass}__header-date" aria-live="polite">
            ${this.renderHeaderDate()}
          </div>

          <alt-core-icon-button
            .disabled=${this.isDisabledNextButton}
            .accessibleName=${getLocaleMessage('nextMonth', this.getLocale())}
            .icon=${altChevronRight}
            variant="text"
            @click=${this.toNextMonth}
          >
          </alt-core-icon-button>
        </div>

        <div
          class="${this.baseClass}__grid"
          role="grid"
          aria-label=${this.formatDay(this.currentDate, 'monthYear')}
          @keydown=${this.handleGridKeydown}
        >
          ${this.renderWeekDays()}
          ${this.renderMonthDays()}
        </div>
      </div>
    `
  }
}
