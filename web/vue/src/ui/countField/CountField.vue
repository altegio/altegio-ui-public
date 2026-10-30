<template>
  <alt-core-count-field
    v-bind="props"
    :value="value"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
    @keydown="$emit('keydown', $event)"
    @changed-value="handleChangedValueEvent"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import '~core/ui/countField'
  import {
    createVueCountFieldProps,
    type IAltVueCountFieldProps,
    type IAltVueCountFieldEmits,
    type IAltVueCoreCountFieldProps,
  } from '~vue/ui/countField/models/types'
  import { DEFAULT_NUMBER_VALUE } from '~core/ui/countField/models/types'
  import type { ChangedValueEvent } from '~core/ui/countField/models/types'

  defineOptions({ name: 'AltCountField' })

  defineSlots<{ default: () => unknown }>()

  const emit = defineEmits<IAltVueCountFieldEmits>()

  const props = withDefaults(
    defineProps<IAltVueCountFieldProps>(),
    createVueCountFieldProps(),
  ) satisfies IAltVueCoreCountFieldProps

  const value = computed(() => String(props.modelValue))

  const handleChangedValueEvent = (event: ChangedValueEvent) => {
    const value = event.detail.value
    emit('update:modelValue', Number(value) || DEFAULT_NUMBER_VALUE)
  }
</script>
