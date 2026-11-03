<template>
  <alt-core-text v-bind="props">
    <slot />
  </alt-core-text>
</template>

<script setup lang="ts">
  import '~core/ui/text'
  import {
    createVueTextProps,
    type IAltVueTextProps,
    type IAltVueCoreTextProps,
  } from '~vue/ui/text/models/types'

  defineOptions({ name: 'AltText' })

  defineSlots<{
    default: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueTextProps>(),
    createVueTextProps(),
  ) satisfies IAltVueCoreTextProps
</script>

