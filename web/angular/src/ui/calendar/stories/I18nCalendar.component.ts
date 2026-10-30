import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AltCalendar } from '~ng/ui/calendar/Calendar.component'

@Component({
  selector: 'I18nCalendar',
  standalone: true,
  imports: [CommonModule, AltCalendar],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: ' <AltCalendar [date]="selectedDate" (selectEvent)="onDateSelect($event)"></AltCalendar> ',
})
export class I18nCalendar {
  // Date selected in the calendar
  selectedDate = new Date().toISOString().split('T')[0]

  onDateSelect(event: Event) {
    this.selectedDate = event as unknown as string
  }
}
