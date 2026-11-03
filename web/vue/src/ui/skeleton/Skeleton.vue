<template>
  <alt-core-skeleton v-bind="props" />
</template>

<script lang="ts" setup>
  import '~core/ui/skeleton'
  import type { IAltCoreSkeletonProps } from '~core/ui/skeleton/models/types'
  import {
    createVueSkeletonProps,
    type IAltVueSkeletonProps,
  } from '~vue/ui/skeleton/models/types'

  defineOptions({ name: 'AltSkeleton' })

  const props = withDefaults(
    defineProps<IAltVueSkeletonProps>(),
    createVueSkeletonProps(),
  ) satisfies Partial<IAltCoreSkeletonProps>
</script>
