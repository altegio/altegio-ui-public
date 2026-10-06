<template>
  <y-core-calendar
    v-bind="props"
    :date="modelValue"
    @select="$emit('update:modelValue', $event.detail.value)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/calendar'
  import {
    createVueCalendarProps,
    type IYVueCalendarProps,
    type IYVueCalendarEmits,
    type IYVueCoreCalendarProps,
  } from '~vue/ui/calendar/models/types'

  defineOptions({ name: 'YCalendar' })

  const props = withDefaults(
    defineProps<IYVueCalendarProps>(),
    createVueCalendarProps(),
  ) satisfies IYVueCoreCalendarProps

  defineEmits<IYVueCalendarEmits>()
</script>
