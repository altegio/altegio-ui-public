<template>
  <y-core-link v-bind="props">
    <slot />
  </y-core-link>
</template>

<script setup lang="ts">
  import '~core/ui/link'
  import {
    createVueLinkProps,
    type IYVueLinkProps,
    type IYVueCoreLinkProps,
  } from '~vue/ui/link/models/types'

  defineOptions({ name: 'YLink' })

  const props = withDefaults(
    defineProps<IYVueLinkProps>(),
    createVueLinkProps(),
  ) satisfies IYVueCoreLinkProps
</script>
