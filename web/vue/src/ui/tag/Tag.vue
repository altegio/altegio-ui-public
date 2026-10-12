<template>
  <y-core-tag v-bind="props">
    <slot />
  </y-core-tag>
</template>

<script setup lang="ts">
  import '~core/ui/tag'
  import {
    createVueTagProps,
    type IYVueTagProps,
    type IYVueCoreTagProps,
  } from '~vue/ui/tag/models/types'

  defineOptions({ name: 'YTag' })

  defineSlots<{
    default: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueTagProps>(),
    createVueTagProps(),
  ) satisfies IYVueCoreTagProps
</script>
