<template>
  <alt-core-list-item v-bind="props">
    <div
      v-if="$slots.start"
      slot="start"
      style="display: contents;"
    >
      <slot name="start" />
    </div>

    <slot />

    <div
      v-if="$slots.caption"
      slot="caption"
      style="display: contents;"
    >
      <slot name="caption" />
    </div>

    <div
      v-if="$slots.end"
      slot="end"
      style="display: contents;"
    >
      <slot name="end" />
    </div>
  </alt-core-list-item>
</template>

<script lang="ts" setup>
  import '~core/ui/listItem'
  import type { IAltCoreListItemProps } from '~core/ui/listItem/models/types'
  import {
    createVueListItemProps,
    type IAltVueListItemProps,
  } from '~vue/ui/listItem/models/types'

  defineOptions({ name: 'AltListItem' })

  defineSlots<{
    default?: () => unknown
    start?: () => unknown
    caption?: () => unknown
    end?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueListItemProps>(),
    createVueListItemProps(),
  ) satisfies Partial<IAltCoreListItemProps>
</script>
