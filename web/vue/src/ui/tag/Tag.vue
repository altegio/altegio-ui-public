<template>
  <alt-core-tag v-bind="props">
    <slot />
  </alt-core-tag>
</template>

<script setup lang="ts">
  import '~core/ui/tag'
  import {
    createVueTagProps,
    type IAltVueTagProps,
    type IAltVueCoreTagProps,
  } from '~vue/ui/tag/models/types'

  defineOptions({ name: 'AltTag' })

  defineSlots<{
    default: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueTagProps>(),
    createVueTagProps(),
  ) satisfies IAltVueCoreTagProps
</script>
