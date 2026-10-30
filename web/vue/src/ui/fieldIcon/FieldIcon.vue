<template>
  <alt-core-field-icon v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/fieldIcon'
  import {
    createVueFieldIconProps,
    type IAltVueFieldIconProps,
    type IAltVueCoreFieldIconProps,
  } from '~vue/ui/fieldIcon/models/types'

  defineOptions({ name: 'AltFieldIcon' })

  const props = withDefaults(
    defineProps<IAltVueFieldIconProps>(),
    createVueFieldIconProps(),
  ) satisfies IAltVueCoreFieldIconProps
</script>
