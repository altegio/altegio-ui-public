<template>
  <y-core-field-icon v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/fieldIcon'
  import {
    createVueFieldIconProps,
    type IYVueFieldIconProps,
    type IYVueCoreFieldIconProps,
  } from '~vue/ui/fieldIcon/models/types'

  defineOptions({ name: 'YFieldIcon' })

  const props = withDefaults(
    defineProps<IYVueFieldIconProps>(),
    createVueFieldIconProps(),
  ) satisfies IYVueCoreFieldIconProps
</script>
