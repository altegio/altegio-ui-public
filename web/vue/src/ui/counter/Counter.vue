<template>
  <y-core-counter v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/counter'
  import {
    createVueCounterProps,
    type IYVueCounterProps,
    type IYVueCoreCounterProps,
  } from '~vue/ui/counter/models/types'

  defineOptions({ name: 'YCounter' })

  const props = withDefaults(
    defineProps<IYVueCounterProps>(),
    createVueCounterProps(),
  ) satisfies IYVueCoreCounterProps
</script>
