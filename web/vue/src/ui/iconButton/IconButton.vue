<template>
  <alt-core-icon-button v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/iconButton'
  import {
    createVueIconButtonProps,
    type IAltVueIconButtonProps,
    type IAltVueCoreIconButtonProps,
  } from '~vue/ui/iconButton/models/types'

  defineOptions({ name: 'AltIconButton' })

  const props = withDefaults(
    defineProps<IAltVueIconButtonProps>(),
    createVueIconButtonProps(),
  ) satisfies IAltVueCoreIconButtonProps
</script>
