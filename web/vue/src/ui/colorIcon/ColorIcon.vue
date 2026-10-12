<template>
  <y-core-color-icon v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/colorIcon'

  import {
    createVueColorIconProps,
    type IYVueColorIconProps,
    type IYVueCoreColorIconProps,
  } from '~vue/ui/colorIcon/models/types'

  defineOptions({ name: 'YColorIcon' })

  const props = withDefaults(
    defineProps<IYVueColorIconProps>(),
    createVueColorIconProps(),
  ) satisfies IYVueCoreColorIconProps
</script>
