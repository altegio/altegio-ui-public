<template>
  <y-core-table-cell v-bind="props">
    <div
      v-if="Boolean($slots.default && $slots.default())"
      slot="cell"
    >
      <slot />
    </div>
  </y-core-table-cell>
</template>

<script setup lang="ts">
  import '~core/ui/tableCell'
  import {
    createVueTableCellProps,
    type IYVueTableCellProps,
    type IYVueCoreTableCellProps,
  } from '~vue/ui/tableCell/models/types'

  defineOptions({ name: 'YTableCell' })

  defineSlots<{
    default: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueTableCellProps>(),
    createVueTableCellProps(),
  ) satisfies IYVueCoreTableCellProps
</script>
