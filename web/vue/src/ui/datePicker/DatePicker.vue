<template>
  <y-core-date-picker
    v-bind="props"
    :date="modelValue"
    @pick="$emit('update:modelValue', $event.detail.value)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/datePicker'
  import {
    createVueDatePickerProps,
    type IYVueDatePickerProps,
    type IYVueDatePickerEmits,
    type IYVueCoreDatePickerProps,
  } from '~vue/ui/datePicker/models/types'

  defineOptions({ name: 'YDatePicker' })

  const props = withDefaults(
    defineProps<IYVueDatePickerProps>(),
    createVueDatePickerProps(),
  ) satisfies IYVueCoreDatePickerProps

  defineEmits<IYVueDatePickerEmits>()
</script>
