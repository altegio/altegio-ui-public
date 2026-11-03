<template>
  <alt-core-link v-bind="props">
    <slot />
  </alt-core-link>
</template>

<script setup lang="ts">
  import '~core/ui/link'
  import {
    createVueLinkProps,
    type IAltVueLinkProps,
    type IAltVueCoreLinkProps,
  } from '~vue/ui/link/models/types'

  defineOptions({ name: 'AltLink' })

  const props = withDefaults(
    defineProps<IAltVueLinkProps>(),
    createVueLinkProps(),
  ) satisfies IAltVueCoreLinkProps
</script>
