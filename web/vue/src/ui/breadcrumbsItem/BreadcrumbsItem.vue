<template>
  <alt-core-breadcrumbs-item v-bind="props">
    <slot />
  </alt-core-breadcrumbs-item>
</template>

<script lang="ts" setup>
  import '~core/ui/breadcrumbsItem'
  import type { IAltCoreBreadcrumbsItemExternalProps } from '~core/ui/breadcrumbsItem/models/types'
  import {
    createVueBreadcrumbsItemProps,
    type IAltVueBreadcrumbsItemProps,
  } from '~vue/ui/breadcrumbsItem/models/types'

  defineOptions({ name: 'AltBreadcrumbsItem' })

  defineSlots<{
    default?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueBreadcrumbsItemProps>(),
    createVueBreadcrumbsItemProps(),
  ) satisfies Partial<IAltCoreBreadcrumbsItemExternalProps>
</script>
