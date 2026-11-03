<template>
  <alt-core-error v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/error'
  import {
    createVueErrorProps,
    type IAltVueErrorProps,
    type IAltVueCoreErrorProps,
  } from '~vue/ui/error/models/types'

  defineOptions({ name: 'AltError' })

  const props = withDefaults(
    defineProps<IAltVueErrorProps>(),
    createVueErrorProps(),
  ) satisfies IAltVueCoreErrorProps
</script>
