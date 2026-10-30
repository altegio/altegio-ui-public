<template>
  <alt-core-table-cell v-bind="props">
    <div
      v-if="Boolean($slots.default && $slots.default())"
      slot="cell"
    >
      <slot />
    </div>
  </alt-core-table-cell>
</template>

<script setup lang="ts">
  import '~core/ui/tableCell'
  import {
    createVueTableCellProps,
    type IAltVueTableCellProps,
    type IAltVueCoreTableCellProps,
  } from '~vue/ui/tableCell/models/types'

  defineOptions({ name: 'AltTableCell' })

  defineSlots<{
    default: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueTableCellProps>(),
    createVueTableCellProps(),
  ) satisfies IAltVueCoreTableCellProps
</script>
