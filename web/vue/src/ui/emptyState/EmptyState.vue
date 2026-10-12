<template>
  <y-core-empty-state v-bind="props">
    <div
      v-if="$slots.actions"
      slot="actions"
    >
      <slot name="actions" />
    </div>
  </y-core-empty-state>
</template>

<script lang="ts" setup>
  import '~core/ui/emptyState'
  import {
    createVueEmptyStateProps,
    type IYVueEmptyStateProps,
    type IYVueCoreEmptyStateProps,
  } from '~vue/ui/emptyState/models/types'

  defineOptions({ name: 'YEmptyState' })

  defineSlots<{
    actions?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueEmptyStateProps>(),
    createVueEmptyStateProps(),
  ) satisfies IYVueCoreEmptyStateProps
</script>
