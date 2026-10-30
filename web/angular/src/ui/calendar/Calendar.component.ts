import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/calendar'
import {
  createNgCalendarProps,
  type IAltNgCalendarProps,
  type SelectEvent,
  type TAltNgCalendarEvents,
} from '~ng/ui/calendar/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const {
  date,
  isRange,
  minDate,
  maxDate,
  disabled,
  headerSelectors,
  locale,
} = createNgCalendarProps()

@Component({
  selector: 'AltCalendar',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-calendar
      [date]="date"
      [isRange]="isRange"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [disabled]="disabled"
      [locale]="locale"
      [headerSelectors]="headerSelectors"
      (select)="handleSelectEvent($event)"
    >
    </alt-core-calendar>
  `,
})

export class AltCalendar implements IAltNgCalendarProps {
  @Input() @DefaultValue(date) date: IAltNgCalendarProps['date'] = date
  @Input() @DefaultValue(isRange) isRange: IAltNgCalendarProps['isRange'] = isRange
  @Input() @DefaultValue(minDate) minDate: IAltNgCalendarProps['minDate'] = minDate
  @Input() @DefaultValue(maxDate) maxDate: IAltNgCalendarProps['maxDate'] = maxDate
  @Input() @DefaultValue(disabled) disabled: IAltNgCalendarProps['disabled'] = disabled
  @Input() @DefaultValue(headerSelectors) headerSelectors: IAltNgCalendarProps['headerSelectors'] = headerSelectors
  @Input() @DefaultValue(locale) locale: IAltNgCalendarProps['locale'] = locale

  @Output() select = new EventEmitter<TAltNgCalendarEvents['value']>()

  handleSelectEvent(e: Event) {
    const selectEvent = e as SelectEvent
    this.select.emit(selectEvent.detail.value)
  }
}
