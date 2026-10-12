<template>
  <y-core-table-head-cell
    v-bind="props"
    @sort="$emit('sort', $event)"
  >
    <div
      v-if="Boolean($slots.cell && $slots.cell())"
      slot="cell"
    >
      <slot name="cell" />
    </div>

    <div
      v-if="Boolean($slots.hint && $slots.hint())"
      slot="hint"
    >
      <slot name="hint" />
    </div>
  </y-core-table-head-cell>
</template>

<script setup lang="ts">
  import '~core/ui/tableHeadCell'
  import {
    createVueTableHeadCellProps,
    type IYVueTableHeadCellProps,
    type IYVueTableHeadCellEmits,
    type IYVueCoreTableHeadCellProps,
  } from '~vue/ui/tableHeadCell/models/types'

  defineOptions({ name: 'YTableHeadCell' })

  defineSlots<{
    cell: () => unknown
    hint: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueTableHeadCellProps>(),
    createVueTableHeadCellProps(),
  ) satisfies IYVueCoreTableHeadCellProps

  defineEmits<IYVueTableHeadCellEmits>()
</script>
