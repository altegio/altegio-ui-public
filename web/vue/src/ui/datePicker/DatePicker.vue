<template>
  <alt-core-date-picker
    ref="coreDatePicker"
    v-bind="props"
    :date="modelValue"
    @pick="$emit('update:modelValue', $event.detail.value)"
  />
</template>

<script setup lang="ts">
  import { useTemplateRef } from 'vue'
  import '~core/ui/datePicker'
  import type { AltCoreDatePicker } from '~core/ui/datePicker'
  import {
    createVueDatePickerProps,
    type IAltVueDatePickerProps,
    type IAltVueDatePickerEmits,
    type IAltVueCoreDatePickerProps,
  } from '~vue/ui/datePicker/models/types'

  defineOptions({ name: 'AltDatePicker' })

  const props = withDefaults(
    defineProps<IAltVueDatePickerProps>(),
    createVueDatePickerProps(),
  ) satisfies IAltVueCoreDatePickerProps

  defineEmits<IAltVueDatePickerEmits>()

  const coreDatePicker = useTemplateRef<AltCoreDatePicker>('coreDatePicker')

  defineExpose({ focus: () => { coreDatePicker.value?.focus() } })
</script>
