import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/calendar'
import {
  createNgCalendarProps,
  type IYNgCalendarProps,
  type SelectEvent,
  type TYNgCalendarEvents,
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
  selector: 'YCalendar',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-calendar
      [date]="date"
      [isRange]="isRange"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [disabled]="disabled"
      [locale]="locale"
      [headerSelectors]="headerSelectors"
      (select)="handleSelectEvent($event)"
    >
    </y-core-calendar>
  `,
})

export class YCalendar implements IYNgCalendarProps {
  @Input() @DefaultValue(date) date: IYNgCalendarProps['date'] = date
  @Input() @DefaultValue(isRange) isRange: IYNgCalendarProps['isRange'] = isRange
  @Input() @DefaultValue(minDate) minDate: IYNgCalendarProps['minDate'] = minDate
  @Input() @DefaultValue(maxDate) maxDate: IYNgCalendarProps['maxDate'] = maxDate
  @Input() @DefaultValue(disabled) disabled: IYNgCalendarProps['disabled'] = disabled
  @Input() @DefaultValue(headerSelectors) headerSelectors: IYNgCalendarProps['headerSelectors'] = headerSelectors
  @Input() @DefaultValue(locale) locale: IYNgCalendarProps['locale'] = locale

  @Output() select = new EventEmitter<TYNgCalendarEvents['value']>()

  handleSelectEvent(e: Event) {
    const selectEvent = e as SelectEvent
    this.select.emit(selectEvent.detail.value)
  }
}
