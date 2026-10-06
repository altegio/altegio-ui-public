<template>
  <y-core-loader v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/loader'

  import {
    createVueLoaderProps,
    type IYVueLoaderProps,
    type IYVueCoreLoaderProps,
  } from '~web/vue/src/ui/loader/models/types'

  defineOptions({ name: 'YLoader' })

  const props = withDefaults(
    defineProps<IYVueLoaderProps>(),
    createVueLoaderProps(),
  ) satisfies IYVueCoreLoaderProps
</script>
