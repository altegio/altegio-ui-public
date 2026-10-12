<template>
  <y-core-icon-button v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/iconButton'
  import {
    createVueIconButtonProps,
    type IYVueIconButtonProps,
    type IYVueCoreIconButtonProps,
  } from '~vue/ui/iconButton/models/types'

  defineOptions({ name: 'YIconButton' })

  const props = withDefaults(
    defineProps<IYVueIconButtonProps>(),
    createVueIconButtonProps(),
  ) satisfies IYVueCoreIconButtonProps
</script>
