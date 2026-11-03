<template>
  <alt-core-color-icon v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/colorIcon'

  import {
    createVueColorIconProps,
    type IAltVueColorIconProps,
    type IAltVueCoreColorIconProps,
  } from '~vue/ui/colorIcon/models/types'

  defineOptions({ name: 'AltColorIcon' })

  const props = withDefaults(
    defineProps<IAltVueColorIconProps>(),
    createVueColorIconProps(),
  ) satisfies IAltVueCoreColorIconProps
</script>
