<template>
  <y-core-text v-bind="props">
    <slot />
  </y-core-text>
</template>

<script setup lang="ts">
  import '~core/ui/text'
  import {
    createVueTextProps,
    type IYVueTextProps,
    type IYVueCoreTextProps,
  } from '~vue/ui/text/models/types'

  defineOptions({ name: 'YText' })

  defineSlots<{
    default: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueTextProps>(),
    createVueTextProps(),
  ) satisfies IYVueCoreTextProps
</script>

