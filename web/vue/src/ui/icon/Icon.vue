<template>
  <alt-core-icon v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/icon'
  import {
    createVueIconProps,
    type IAltVueIconProps,
    type IAltVueCoreIconProps,
  } from '~vue/ui/icon/models/types'

  defineOptions({ name: 'AltIcon' })

  const props = withDefaults(
    defineProps<IAltVueIconProps>(),
    createVueIconProps(),
  ) satisfies IAltVueCoreIconProps
</script>
