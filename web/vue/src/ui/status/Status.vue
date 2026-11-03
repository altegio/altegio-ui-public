<template>
  <alt-core-status v-bind="props">
    <slot />
  </alt-core-status>
</template>

<script lang="ts" setup>
  import '~core/ui/status'
  import type { IAltCoreStatusProps } from '~core/ui/status/models/types'
  import {
    createVueStatusProps,
    type IAltVueStatusProps,
  } from '~vue/ui/status/models/types'

  defineOptions({ name: 'AltStatus' })

  defineSlots<{
    default?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueStatusProps>(),
    createVueStatusProps(),
  ) satisfies Partial<IAltCoreStatusProps>
</script>
