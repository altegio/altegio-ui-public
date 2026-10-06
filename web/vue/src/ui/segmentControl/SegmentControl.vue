<template>
  <y-core-segment-control
    v-bind="props"
    :value="modelValue"
    @click="handleSegmentClick"
  />
</template>

<script setup lang="ts">
  import '~core/ui/segmentControl'
  import {
    createVueSegmentControlProps,
    type IYVueSegmentControlEmits,
    type IYVueSegmentControlProps,
  } from '~vue/ui/segmentControl/models/types'

  import type {
    ClickEvent,
  } from '~vue/ui/segmentControl/models/types'

  defineOptions({ name: 'YSegmentControl' })

  const props = withDefaults(
    defineProps<IYVueSegmentControlProps>(),
    createVueSegmentControlProps(),
  )

  const emit = defineEmits<IYVueSegmentControlEmits>()

  const handleSegmentClick = (ev: ClickEvent) => {
    const value = ev.detail.value

    emit('update:modelValue', value)
    emit('click', value)
  }
</script>
