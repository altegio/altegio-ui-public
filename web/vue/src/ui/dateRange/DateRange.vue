<template>
  <alt-core-date-range
    ref="coreDateRange"
    v-bind="coreProps"
    :from="props.modelValue?.from ?? undefined"
    :to="props.modelValue?.to ?? undefined"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
  import { omit } from 'radash'
  import { computed, useTemplateRef } from 'vue'
  import '~core/ui/dateRange'
  import type { AltCoreDateRange } from '~core/ui/dateRange'
  import type { DateRangeChangeEvent } from '~core/ui/dateRange/models/types'
  import {
    createVueDateRangeProps,
    type IAltVueDateRangeEmits,
    type IAltVueDateRangeProps,
  } from '~vue/ui/dateRange/models/types'

  defineOptions({ name: 'AltDateRange' })

  const props = withDefaults(
    defineProps<IAltVueDateRangeProps>(),
    createVueDateRangeProps(),
  )

  const emit = defineEmits<IAltVueDateRangeEmits>()

  const coreProps = computed(() => omit(props, ['modelValue']))

  const handleChange = (event: Event) => {
    // The component event replaces the native one, which would otherwise also reach ancestor `change` listeners
    event.stopPropagation()
    emit('update:modelValue', { ...(event as DateRangeChangeEvent).detail })
  }

  const coreDateRange = useTemplateRef<AltCoreDateRange>('coreDateRange')

  defineExpose({ focus: () => { coreDateRange.value?.focus() } })
</script>
