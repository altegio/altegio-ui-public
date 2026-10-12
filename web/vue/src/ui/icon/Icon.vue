<template>
  <y-core-icon v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/icon'
  import {
    createVueIconProps,
    type IYVueIconProps,
    type IYVueCoreIconProps,
  } from '~vue/ui/icon/models/types'

  defineOptions({ name: 'YIcon' })

  const props = withDefaults(
    defineProps<IYVueIconProps>(),
    createVueIconProps(),
  ) satisfies IYVueCoreIconProps
</script>
