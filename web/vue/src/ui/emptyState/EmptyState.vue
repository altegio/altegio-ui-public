<template>
  <alt-core-empty-state v-bind="props">
    <div
      v-if="$slots.actions"
      slot="actions"
    >
      <slot name="actions" />
    </div>
  </alt-core-empty-state>
</template>

<script lang="ts" setup>
  import '~core/ui/emptyState'
  import {
    createVueEmptyStateProps,
    type IAltVueEmptyStateProps,
    type IAltVueCoreEmptyStateProps,
  } from '~vue/ui/emptyState/models/types'

  defineOptions({ name: 'AltEmptyState' })

  defineSlots<{
    actions?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueEmptyStateProps>(),
    createVueEmptyStateProps(),
  ) satisfies IAltVueCoreEmptyStateProps
</script>
