import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { YCalendar } from '~ng/ui/calendar/Calendar.component'

@Component({
  selector: 'I18nCalendar',
  standalone: true,
  imports: [CommonModule, YCalendar],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: ' <YCalendar [date]="selectedDate" (selectEvent)="onDateSelect($event)"></YCalendar> ',
})
export class I18nCalendar {
  // Выбранная дата для календаря
  selectedDate = new Date().toISOString().split('T')[0]

  onDateSelect(event: Event) {
    this.selectedDate = event as unknown as string
  }
}
