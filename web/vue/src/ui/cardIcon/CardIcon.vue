<template>
  <alt-core-card-icon v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/cardIcon'
  import {
    createVueCardIconProps,
    type IAltVueCardIconProps,
    type IAltVueCoreCardIconProps,
  } from '~vue/ui/cardIcon/models/types'

  defineOptions({ name: 'AltCardIcon' })

  const props = withDefaults(
    defineProps<IAltVueCardIconProps>(),
    createVueCardIconProps(),
  ) satisfies IAltVueCoreCardIconProps
</script>
