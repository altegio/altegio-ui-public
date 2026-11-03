<template>
  <alt-core-loader v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/loader'

  import {
    createVueLoaderProps,
    type IAltVueLoaderProps,
    type IAltVueCoreLoaderProps,
  } from '~web/vue/src/ui/loader/models/types'

  defineOptions({ name: 'AltLoader' })

  const props = withDefaults(
    defineProps<IAltVueLoaderProps>(),
    createVueLoaderProps(),
  ) satisfies IAltVueCoreLoaderProps
</script>
