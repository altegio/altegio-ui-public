<template>
  <y-core-count-field
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
    type IYVueCountFieldProps,
    type IYVueCountFieldEmits,
    type IYVueCoreCountFieldProps,
  } from '~vue/ui/countField/models/types'
  import { DEFAULT_NUMBER_VALUE } from '~core/ui/countField/models/types'
  import type { ChangedValueEvent } from '~core/ui/countField/models/types'

  defineOptions({ name: 'YCountField' })

  defineSlots<{ default: () => unknown }>()

  const emit = defineEmits<IYVueCountFieldEmits>()

  const props = withDefaults(
    defineProps<IYVueCountFieldProps>(),
    createVueCountFieldProps(),
  ) satisfies IYVueCoreCountFieldProps

  const value = computed(() => String(props.modelValue))

  const handleChangedValueEvent = (event: ChangedValueEvent) => {
    const value = event.detail.value
    emit('update:modelValue', Number(value) || DEFAULT_NUMBER_VALUE)
  }
</script>
