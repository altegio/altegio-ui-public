<template>
  <alt-core-counter v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/counter'
  import {
    createVueCounterProps,
    type IAltVueCounterProps,
    type IAltVueCoreCounterProps,
  } from '~vue/ui/counter/models/types'

  defineOptions({ name: 'AltCounter' })

  const props = withDefaults(
    defineProps<IAltVueCounterProps>(),
    createVueCounterProps(),
  ) satisfies IAltVueCoreCounterProps
</script>
