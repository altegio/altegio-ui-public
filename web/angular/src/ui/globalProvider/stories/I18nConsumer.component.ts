import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ru, en } from '~core/i18n'
import { LOCALE_MODULE_ID } from '~core/ui/globalProvider/plugins/i18n'
import type { ILocaleModule } from '~core/ui/globalProvider/context/modules'
import { YCalendar } from '~ng/ui/calendar'
import { GlobalContextService } from '../classes/GlobalContext.service'

@Component({
  selector: 'I18nConsumer',
  standalone: true,
  imports: [
    CommonModule,
    YCalendar,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="container">
      <h3>Компонент работы с локализацией</h3>

      <div class="locale-info">
        <p>Текущая локализация: <strong>{{ localeName() }}</strong></p>

        <p>Код языка: <strong>{{ localeCode() }}</strong></p>
      </div>

      <div class="calendar-section">
        <h4>Календарь с текущей локализацией:</h4>

        <div class="calendar-wrapper">
          <YCalendar
            [date]="selectedDate"
            (selectEvent)="onDateSelect($event)"
          ></YCalendar>
        </div>
      </div>

      <div class="buttons">
        <button
          class="primary-button"
          (click)="toggleLocale()"
        >
          Переключить язык
        </button>
      </div>
    </div>
  `,
  styles: [
    `
    .container {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      background-color: #f8f8f8;
      max-width: 600px;
    }

    .locale-info, .calendar-section {
      margin: 16px 0;
      padding: 12px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      background-color: white;
    }

    .calendar-section h4 {
      margin-top: 0;
      color: #333;
    }

    .calendar-wrapper {
      margin: 16px 0;
    }

    .selected-date {
      margin-top: 12px;
      font-size: 14px;
    }

    .buttons {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 16px;
    }

    .primary-button {
      background-color: #4CAF50;
      border: none;
      color: white;
      padding: 8px 16px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 14px;
      margin: 8px 0;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .primary-button:hover {
      background-color: #45a049;
    }
  `,
  ],
})
export class I18nConsumer {
  // Выбранная дата для календаря
  selectedDate = new Date().toISOString().split('T')[0]

  // Используем inject для получения контекста
  private globalContext = inject(GlobalContextService).getContext()
  private localeToggler = signal(false)
  localeName = signal('')
  localeCode = signal('')

  // Получаем модуль локализации
  localeModule = computed(() => {
    return this.globalContext()?.getModule(LOCALE_MODULE_ID) as ILocaleModule | undefined
  })

  constructor() {
    effect(() => {
      this.localeToggler() // Для триггера
      const module = this.localeModule()
      this.localeName.set(module?.locale.name ?? 'Не указано')
      this.localeCode.set(module?.locale.shortCode ?? 'ru')
    })
  }

  /**
   * Обработчик выбора даты в календаре
   */
  onDateSelect(event: Event) {
    this.selectedDate = event as unknown as string
  }

  /**
   * Переключает языковую локализацию
   */
  toggleLocale() {
    const localeModule = this.localeModule()
    if (!localeModule) {
      return
    }

    // Переключаем между русским и английским языком
    const currentLocale = localeModule.locale
    localeModule.setLocale(currentLocale.shortCode === 'en' ? ru : en)
    this.localeToggler.set(!this.localeToggler())
  }
}
