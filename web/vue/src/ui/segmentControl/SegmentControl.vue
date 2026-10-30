<template>
  <alt-core-segment-control
    v-bind="props"
    :value="modelValue"
    @click="handleSegmentClick"
  />
</template>

<script setup lang="ts">
  import '~core/ui/segmentControl'
  import {
    createVueSegmentControlProps,
    type IAltVueSegmentControlEmits,
    type IAltVueSegmentControlProps,
  } from '~vue/ui/segmentControl/models/types'

  import type {
    ClickEvent,
  } from '~vue/ui/segmentControl/models/types'

  defineOptions({ name: 'AltSegmentControl' })

  const props = withDefaults(
    defineProps<IAltVueSegmentControlProps>(),
    createVueSegmentControlProps(),
  )

  const emit = defineEmits<IAltVueSegmentControlEmits>()

  const handleSegmentClick = (ev: ClickEvent) => {
    const value = ev.detail.value

    emit('update:modelValue', value)
    emit('click', value)
  }
</script>
