<template>
  <div class="container">
    <h3>Компонент работы с локализацией</h3>

    <div class="locale-info">
      <p>Текущая локализация: <strong>{{ localeName }}</strong></p>

      <p>Код языка: <strong>{{ localeCode }}</strong></p>
    </div>

    <div class="calendar-section">
      <h4>Календарь с текущей локализацией:</h4>

      <div class="calendar-wrapper">
        <YCalendar v-model="selectedDate" />
      </div>
    </div>

    <div class="buttons">
      <button
        class="primary-button"
        @click="toggleLocale"
      >
        Переключить язык
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { inject, computed, ref, onMounted } from 'vue'
  import type { Ref } from 'vue'
  import { ru, en } from '~core/i18n'
  import type { IGlobalContext } from '~core/ui/globalProvider/context'
  import type { ILocaleModule } from '~core/ui/globalProvider/context/modules'
  import { LOCALE_MODULE_ID } from '~core/ui/globalProvider/plugins/i18n'
  import { YCalendar } from '~vue/ui/calendar'

  // Получаем глобальный контекст через inject
  const globalContext = inject<Ref<IGlobalContext | undefined>>('globalContext')

  // Получаем модуль локализации
  const localeModule = computed(() => globalContext?.value?.getModule(LOCALE_MODULE_ID) as ILocaleModule | undefined)

  // Состояние локализации
  const localeName = computed(() => localeModule.value?.locale.name ?? 'Не указано')
  const localeCode = computed(() => localeModule.value?.locale.shortCode ?? 'ru')

  // Состояние календаря
  const selectedDate = ref(new Date().toISOString().split('T')[0])

  // Переключение языка
  const toggleLocale = () => {
    if (!localeModule.value) {
      return
    }

    const currentLocale = localeModule.value.locale

    localeModule.value.setLocale(currentLocale.shortCode === 'en' ? ru : en)
  }

  onMounted(() => {
    localeModule.value?.onUpdated(() => {
      console.info('[I18nConsumer][onMounted]:', localeModule.value)
    })
  })
</script>

<style scoped>
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
</style>
