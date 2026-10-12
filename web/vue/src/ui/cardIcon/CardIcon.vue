<template>
  <y-core-card-icon v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/cardIcon'
  import {
    createVueCardIconProps,
    type IYVueCardIconProps,
    type IYVueCoreCardIconProps,
  } from '~vue/ui/cardIcon/models/types'

  defineOptions({ name: 'YCardIcon' })

  const props = withDefaults(
    defineProps<IYVueCardIconProps>(),
    createVueCardIconProps(),
  ) satisfies IYVueCoreCardIconProps
</script>
