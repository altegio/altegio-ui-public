<template>
  <alt-core-breadcrumbs v-bind="props">
    <slot />
  </alt-core-breadcrumbs>
</template>

<script lang="ts" setup>
  import '~core/ui/breadcrumbs'
  import type { IAltCoreBreadcrumbsProps } from '~core/ui/breadcrumbs/models/types'
  import {
    createVueBreadcrumbsProps,
    type IAltVueBreadcrumbsProps,
  } from '~vue/ui/breadcrumbs/models/types'

  defineOptions({ name: 'AltBreadcrumbs' })

  defineSlots<{
    default?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueBreadcrumbsProps>(),
    createVueBreadcrumbsProps(),
  ) satisfies Partial<IAltCoreBreadcrumbsProps>
</script>
