<template>
  <alt-core-calendar
    v-bind="props"
    :date="modelValue"
    @select="$emit('update:modelValue', $event.detail.value)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/calendar'
  import {
    createVueCalendarProps,
    type IAltVueCalendarProps,
    type IAltVueCalendarEmits,
    type IAltVueCoreCalendarProps,
  } from '~vue/ui/calendar/models/types'

  defineOptions({ name: 'AltCalendar' })

  const props = withDefaults(
    defineProps<IAltVueCalendarProps>(),
    createVueCalendarProps(),
  ) satisfies IAltVueCoreCalendarProps

  defineEmits<IAltVueCalendarEmits>()
</script>
