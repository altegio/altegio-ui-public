<template>
  <y-core-error v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/error'
  import {
    createVueErrorProps,
    type IYVueErrorProps,
    type IYVueCoreErrorProps,
  } from '~vue/ui/error/models/types'

  defineOptions({ name: 'YError' })

  const props = withDefaults(
    defineProps<IYVueErrorProps>(),
    createVueErrorProps(),
  ) satisfies IYVueCoreErrorProps
</script>
