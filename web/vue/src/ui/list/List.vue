<template>
  <alt-core-list v-bind="props">
    <slot />
  </alt-core-list>
</template>

<script lang="ts" setup>
  import '~core/ui/list'
  import type { IAltCoreListProps } from '~core/ui/list/models/types'
  import {
    createVueListProps,
    type IAltVueListProps,
  } from '~vue/ui/list/models/types'

  defineOptions({ name: 'AltList' })

  defineSlots<{
    default?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueListProps>(),
    createVueListProps(),
  ) satisfies Partial<IAltCoreListProps>
</script>
